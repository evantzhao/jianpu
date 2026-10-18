# 琴读 · Guqin Reader

Chinese/English guqin **减字谱 / jianzipu** reading practice for a learner already taking lessons. This teaches guqin tablature, not numbered jianpu notation.

## Features

- A persistent 中文 / English toggle translates navigation, all six lessons, all 76 questions, feedback, dictionary definitions, phrase explanations and settings. Chinese notation remains visible.

- Six source-linked lessons: composite structure, right-hand techniques, string/hui numerals, open/stopped/harmonic tones, movement symbols, and phrase context.
- 15 composite notation examples, component explanations, and a guqin position diagram.
- 21 dictionary entries with pinyin, English glosses, uncommon characters and bookmarks.
- 76 authored questions; adaptive sessions prioritize due and weak concepts while maintaining a course sequence.
- Three original phrase-reading exercises with learning/self-test modes. These are drills, not historical score editions.
- Per-concept practice history, independent/assisted distinctions, local lesson notes, and validated JSON backup/import.
- Responsive ivory-and-ink interface, mobile navigation, keyboard focus states, and reduced-motion support.

No account, database, analytics or runtime AI service. Progress is stored in browser localStorage under `guqin-reader.v1`; clearing browser data or changing origin can make progress unavailable. Export backups before moving devices/domains. Import merges records by ID, preserving current notes unless empty.

## Development

Node.js 22+; no production or build dependencies.

```sh
npm run dev   # http://localhost:3000
npm test      # Node's test runner
npm run build # static output in dist/
npm start     # serve dist/
```

The app uses ES modules and hash navigation. `vercel.json` builds and serves `dist/` with a restrictive Content Security Policy. No environment variables are needed. Vercel should link to `evantzhao/jianpu`, production branch `main`, repository root, framework Other.

Browser verification (development dependency only):

```sh
npm ci
npx playwright install --with-deps chromium webkit
npm run build
npm run test:browser
BROWSER_ENGINE=webkit npm run test:browser
```

Pull requests run both engines in GitHub Actions. Checks exercise touch navigation, lesson → answer → persistence, hint tracking, notes, backup/import, dictionary, phrase reveal, and responsive layouts from 320–1440px. Screenshots are uploaded as workflow artifacts and also written locally to `/tmp/guqin-qa/<engine>`. Browser emulation does not replace testing on a physical iPhone. `BROWSER_EXECUTABLE` optionally selects a locally installed browser. If the environment cannot launch browser processes, use the PR checks.

Phone layouts stack reading cards and answer choices, use larger touch targets and input text, and reserve space for the bottom navigation and safe areas. The explorer includes a direct dictionary-search shortcut; phrase notation scrolls horizontally so glyphs remain legible.

## Languages

Chinese remains the default. Use the language button in the header or Settings to switch at any time. The device preference is stored separately under `guqin-reader.language`; it is not part of progress backups. Existing v1 backups continue to work. Switching keeps the current lesson step, question, answer order, hint/feedback state and unsaved lesson notes. Both languages use the same question IDs and answer values.

`src/content.en.js` contains English teaching copy keyed by curriculum IDs; `src/i18n.js` contains interface copy and numeric formatting. The presentation layer translates text and accessible labels, never notation encodings, answer values, search input or personal notes. Chinese study characters are intentionally retained. Dictionary search accepts Chinese, pinyin and English definitions. Translation coverage tests check the complete curriculum; browser checks exercise both languages and switching.

## Learning model

Each answer updates only its tested concept. Hinted answers never count as independent correct recall. Correct independent answers extend intervals through 1, 3, 7, 14, and 30 days. Wrong answers reset the interval to 10 minutes; assisted correct answers use one hour. Manual practice is always available. A heuristic score and multiple independent responses establish the tentative `较稳固` label; it is not a validated measure of guqin proficiency.

The system adjusts exercise selection and recommends lessons from a fixed, source-linked curriculum. It does not invent new teaching content. Phrase reveals are self-checks and do not count as objectively correct responses.

## Research and content boundaries

See [RESEARCH.md](RESEARCH.md) and the in-app sources page. Original explanations and exercises adapt retrieval practice and distributed practice principles to notation reading. They are not a substitute for the learner's teacher, and the app does not assess physical playing technique. Version-specific ornaments and timing should be learned from the relevant score and teacher.

## Font

Unmodified JianZiPu font by Nancy Liang / Nellodee LLC, based on TW-Kai, SIL Open Font License 1.1. Bundled from `neuralfirings/JianZiPu`, commit `3bc8a1112aba6444cf5464b74cf4b87d25720fc0`, `builder/tests/JianZiPu.ttf`. Complete license: `public/assets/LICENSE.font.txt`.
