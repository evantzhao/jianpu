# Mobile PR verification — 2026-10-06

[PR #1](https://github.com/evantzhao/jianpu/pull/1) changes phone and portrait-tablet layouts. Production remains on `main` until the owner merges the PR.

## Passed in GitHub Actions

Both Chromium and WebKit passed against the built static app in [run 37408492052](https://github.com/evantzhao/jianpu/actions/runs/37408492052), commit `62b99d09f9c15ac3208b119e8b8d25203c149a68`:

- Nine learning/content tests and static build.
- 84 route/width combinations per engine: all six lessons and all main routes at 320, 390, 430, 768, 1024 and 1440px, without page-level horizontal overflow.
- Phone touch flow: direct dictionary search → pinyin lookup → term dialog; search input uses 16px text.
- Lesson → hint → answer → stored progress → reload, plus note saving.
- Browser download/export → import/merge, preserving notes without duplicate attempts.
- All 15 example selections; primary phone navigation, filters and anatomy controls meet 44×44px targets.
- All phrase selections remain visible as Next moves through the horizontally scrolling strip; self-test and reveal work.
- A landscape phone dialog fits the viewport.
- No application console or page errors.

Workflow artifacts contain desktop and phone screenshots and a synthetic test backup. Chromium screenshots were visually inspected for notation rendering, layout, dictionary, lessons, practice and phrases. CI is configured to repeat on each PR update; consult the latest check for its exact commit.

## Preview and remaining limits

The branch Vercel deployment reached `READY`. Its live preview requires Vercel sign-in. The automatic approval review rejected creating a temporary share link because that would expand access; no preview access settings were changed. Visual verification used the same built source in CI instead of claiming a signed-in live-preview check.

These are emulated browser checks, not a physical iPhone/Safari test. Actual keyboard behavior, device safe-area insets and VoiceOver remain manual checks. Progress remains local to each browser/origin; preview progress does not sync to production.

---

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
