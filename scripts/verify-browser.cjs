// Run after npm run build. CI installs both engines; BROWSER_ENGINE selects one.
const {chromium, webkit} = require('playwright');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const engine = process.env.BROWSER_ENGINE || 'chromium';
const output = `/tmp/guqin-qa/${engine}`;
const base = 'http://localhost:3002';

(async () => {
  const server = spawn(process.execPath, ['scripts/serve.mjs', 'dist'], {
    stdio: 'pipe', env: {...process.env, PORT: '3002'},
  });
  let browser, page;
  const errors = [];
  const observe = p => {
    p.on('pageerror', e => errors.push(e.message));
    p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  };
  const go = async hash => {
    await page.goto(`${base}/#${hash}`);
    await page.locator('main h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
  };
  const noOverflow = async label => {
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, label);
  };
  const screenshot = name => page.screenshot({path: `${output}/${name}.png`, fullPage: true});
  try {
    fs.mkdirSync(output, {recursive: true});
    await new Promise((resolve, reject) => {
      server.stdout.once('data', resolve);
      server.once('error', reject);
      server.once('exit', code => reject(Error(`Server exited: ${code}`)));
    });
    browser = await ({chromium, webkit}[engine]).launch({
      executablePath: process.env.BROWSER_EXECUTABLE || undefined,
    });
    page = await browser.newPage({viewport: {width: 1440, height: 1000}});
    observe(page);
    await go('home');
    assert.equal(await page.evaluate(() => document.fonts.check('100px JianZiPu')), true);
    await screenshot('desktop-home');
    await page.close();

    page = await browser.newPage({
      viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true, deviceScaleFactor: 1,
    });
    observe(page);
    await go('explore');
    await page.getByRole('button', {name: '查指法字典 ↓'}).tap();
    assert.equal(await page.getByLabel('搜索指法').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.getByLabel('搜索指法').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 16), true);
    await page.getByLabel('搜索指法').fill('nao');
    await page.locator('[data-action="term"][data-value="nao"]').tap();
    await page.getByRole('dialog').waitFor();
    assert.match(await page.getByRole('dialog').innerText(), /猱/);
    await noOverflow('dictionary modal');
    await screenshot('mobile-dictionary');
    await page.getByLabel('关闭', {exact: true}).tap();
    await page.getByLabel('搜索指法').fill('');

    await go('learn/structure');
    await page.locator('[data-action="step"][data-value="2"]').tap();
    await page.locator('[data-action="finish-lesson"]').tap();
    await page.locator('[data-action="hint"]').tap();
    await page.locator('[data-action="answer"]').first().tap();
    let saved = await page.evaluate(() => JSON.parse(localStorage.getItem('guqin-reader.v1')));
    assert.equal(saved.attempts.length, 1);
    assert.equal(saved.attempts[0].assisted, true);
    assert(saved.completed.includes('structure'));
    await noOverflow('answered question');
    await screenshot('mobile-practice');
    await page.reload();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('guqin-reader.v1')).attempts.length), 1);

    await go('progress');
    await page.locator('#teacher-notes').fill('老师的谱用劈字');
    await page.locator('[data-action="save-notes"]').tap();
    await go('settings');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('[data-action="export"]').tap();
    const download = await downloadPromise;
    await download.saveAs(`${output}/backup.json`);
    saved = JSON.parse(fs.readFileSync(`${output}/backup.json`, 'utf8'));
    assert.equal(saved.notes, '老师的谱用劈字');
    await page.locator('#import-file').setInputFiles(`${output}/backup.json`);
    await page.locator('#confirm-import').tap();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('guqin-reader.v1')).attempts.length), 1);

    // Every lesson, all main routes, small phones, portrait tablets and desktop.
    const {lessons, examples, phrases} = await import('../src/data.js');
    const routes = ['home', 'learn', ...lessons.map(l => `learn/${l.id}`), 'explore', 'practice', 'phrases', 'progress', 'settings', 'sources'];
    for (const width of [320, 390, 430, 768, 1024, 1440]) {
      await page.setViewportSize({width, height: 844});
      for (const hash of routes) {
        await go(hash);
        await noOverflow(`${hash} at ${width}px`);
      }
    }
    await page.setViewportSize({width: 390, height: 844});
    await go('home');
    await screenshot('mobile-home');
    const cards = await page.locator('.home-grid > *').evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON()));
    assert(cards[1].top >= cards[0].bottom, 'Home cards should stack');
    await go('learn/structure');
    await screenshot('mobile-lesson');
    await go('explore');
    const smallTargets = await page.locator('.part, .filter, .mobile-nav a, .settings-link').evaluateAll(els => els.filter(el => {
      const r = el.getBoundingClientRect(); return r.width < 44 || r.height < 44;
    }).map(el => el.textContent));
    assert.deepEqual(smallTargets, [], 'Primary phone targets should be at least 44×44');
    for (let i = 0; i < examples.length; i++) {
      await page.getByLabel('选择谱字').selectOption(String(i));
      await noOverflow(`example ${i}`);
    }
    await page.getByLabel('选择谱字').selectOption('0');
    await screenshot('mobile-explorer');

    await go('phrases');
    for (let phrase = 0; phrase < phrases.length; phrase++) {
      await page.locator(`[data-action="phrase"][data-value="${phrase}"]`).tap();
      for (let note = 0; note < phrases[phrase].notes.length; note++) {
        const visible = await page.locator('.phrase-note.selected').evaluate(el => {
          const rect = el.getBoundingClientRect(), strip = el.parentElement.getBoundingClientRect();
          return rect.left >= strip.left - 1 && rect.right <= strip.right + 1;
        });
        assert(visible, `Selected phrase ${phrase} note ${note} should be visible`);
        await page.locator('.phrase-controls .primary').tap();
      }
    }
    await page.locator('[data-action="phrase-mode"]').tap();
    assert.match(await page.locator('.phrase-detail').innerText(), /先在心里/);
    await page.locator('[data-action="phrase-reveal"]').tap();
    assert.doesNotMatch(await page.locator('.phrase-detail').innerText(), /先在心里/);
    await noOverflow('phrase reveal');
    await screenshot('mobile-phrases');

    await page.setViewportSize({width: 667, height: 375});
    await go('explore');
    await noOverflow('phone landscape');
    await page.getByRole('button', {name: '查指法字典 ↓'}).tap();
    await page.getByLabel('搜索指法').fill('nao');
    await page.locator('[data-action="term"][data-value="nao"]').tap();
    assert.equal(await page.getByRole('dialog').evaluate(el => el.getBoundingClientRect().height <= innerHeight), true);
    await page.getByLabel('关闭', {exact: true}).tap();
    assert.deepEqual(errors, [], 'No browser errors');
    console.log(`PASS ${engine}: touch dictionary, lesson → hint → answer → reload, notes, backup/import, all phrase selections/reveal, ${routes.length * 6} responsive routes, 15 examples, 44px targets and landscape dialog.`);
  } catch (error) {
    if (page && !page.isClosed()) await screenshot('failure').catch(() => {});
    throw error;
  } finally {
    await browser?.close();
    server.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
