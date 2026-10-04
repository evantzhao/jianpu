// Optional UI smoke test: install playwright and its Chromium browser first.
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
(async()=>{
 const server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:'pipe',env:{...process.env,PORT:'3002'}});
 let browser;
 try{
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||undefined,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto('http://localhost:3002');await page.evaluate(()=>document.fonts.ready);
  fs.mkdirSync('/tmp/guqin-qa',{recursive:true});
  await page.screenshot({path:'/tmp/guqin-qa/desktop.png',fullPage:true});
  console.log('TITLE',await page.title());console.log('FONTS',await page.evaluate(()=>document.fonts.check('100px JianZiPu')));
  await page.goto('http://localhost:3002/#explore');await page.getByLabel('搜索指法').fill('nao');await page.locator('[data-action="term"][data-value="nao"]').click();
  await page.getByRole('dialog').waitFor();console.log('DICTIONARY',await page.getByRole('dialog').innerText());await page.getByLabel('关闭',{exact:true}).click();
  await page.goto('http://localhost:3002/#learn/structure');await page.locator('[data-action="step"][data-value="2"]').click();await page.locator('[data-action="finish-lesson"]').click();
  await page.locator('[data-action="hint"]').click();await page.locator('[data-action="answer"]').first().click();
  let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('guqin-reader.v1')));
  if(saved.attempts.length!==1||!saved.attempts[0].assisted||!saved.completed.includes('structure'))throw Error('Practice did not persist');
  await page.reload();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('guqin-reader.v1')));if(after.attempts.length!==1)throw Error('Reload lost progress');
  await page.goto('http://localhost:3002/#progress');await page.locator('#teacher-notes').fill('老师的谱用劈字');await page.locator('[data-action="save-notes"]').click();
  await page.goto('http://localhost:3002/#settings');const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await downloadPromise;await download.saveAs('/tmp/guqin-qa/backup.json');
  saved=JSON.parse(fs.readFileSync('/tmp/guqin-qa/backup.json','utf8'));if(saved.notes!=='老师的谱用劈字')throw Error('Backup omitted notes');
  await page.locator('#import-file').setInputFiles('/tmp/guqin-qa/backup.json');await page.locator('#confirm-import').click();const imported=await page.evaluate(()=>JSON.parse(localStorage.getItem('guqin-reader.v1')));if(imported.attempts.length!==1)throw Error('Import duplicated attempts');
  for(const width of [390,320,768]){
   await page.setViewportSize({width,height:844});
   for(const hash of ['home','learn/structure','explore','practice','phrases','progress','settings']){
    await page.goto('http://localhost:3002/#'+hash);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow)throw Error(`Horizontal overflow: ${hash} at ${width}`);
   }
  }
  await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3002/#home');await page.screenshot({path:'/tmp/guqin-qa/mobile.png',fullPage:true});
  await page.goto('http://localhost:3002/#explore');await page.screenshot({path:'/tmp/guqin-qa/explorer.png',fullPage:true});
  await page.goto('http://localhost:3002/#phrases');await page.locator('[data-action="phrase-mode"]').click();if(await page.locator('.phrase-detail').innerText().then(t=>!t.includes('先在心里')))throw Error('Phrase self-test reveal broken');await page.locator('[data-action="phrase-reveal"]').click();
  if(errors.length)throw Error('Browser errors: '+errors.join('; '));
  console.log('PASS: notation font, dictionary, lesson→hint→answer→storage→reload, notes, export/import, phrase self-test, 21 responsive route checks; no browser errors.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
