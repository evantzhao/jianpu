# Verification — 2026-10-04

## Passed

- All nine Node learning/content tests, plus static build.
- Vercel production deployment and live site loading at https://jianpu-three.vercel.app/.
- Composite jianzipu glyph rendering (including uncommon-character dictionary forms).
- First lesson navigation through all three steps into an eight-question practice session.
- Hint display, answer locking and feedback, and separate assisted-answer accounting.
- Wrong answer recorded only against the tested concept; corresponding recommendation appears on the dashboard.
- Progress and lesson completion survive a full browser reload.
- Pinyin dictionary search: `nao` locates 猱; modal shows pronunciation, meaning and source.
- Example selector displays 7.6-hui position with the correct string/action breakdown.
- Lesson note save confirmation.
- Phrase reader learning/self-test toggle and reveal behavior.
- Desktop screenshot reviewed, no horizontal overflow in the observed 1363px viewport.

## Verification limits

- Local Chrome cannot launch because the execution environment denies its required socket operation. The optional Playwright smoke script was therefore not completed locally.
- Live UI checks used cloud Chrome. Physical iPhone/Safari and the scripted narrow-viewport matrix are not verified.
- Backup schemas, round-trip data and deduplication pass unit tests. The live export button confirmed export, but the cloud browser download event timed out, so browser-level export/import round-trip is not claimed as tested.
- Browser logs observed during the check contained an extension metadata error from `chrome-extension://...`, not an application error.

`preview.jpg` shows synthetic test progress from the dedicated verification browser, not the user's learning records.
