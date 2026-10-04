# Research and instructional decisions

Research reviewed 2026-10-04. The learner takes guqin lessons, reads Chinese comfortably, and needs help with occasional uncommon terms. Approved experience: quiet ivory/ink, Chinese-first with optional pinyin/English, local progress, adaptive review without accounts or synchronization.

| Source | Application |
|---|---|
| [Hong Kong Memory — Playing techniques](https://www.hkmemory.hk/tc/collections-qin_story-on_the_qin-basic_techniques.html) | Basic right-hand finger/direction mappings and comparison of yin, nao, chuo, zhu. The inward/outward convention follows this source, explicitly defined relative to the player. |
| [Guqin Notes — Tablature](https://guqinnotes.com/tablature-of-guqin/) | Teach component structure, numeral distinctions, hand elements, then sound production modes. |
| [John Thompson — Videos for learning](https://www.silkqin.com/07play/videosforlearning.htm) | Distinguish reading instructions from executing a teacher's interpretation, particularly rhythm and phrasing. |
| [JianZiPu font documentation](https://guqintabs.com/jianzipu/) | Composite rendering, encoding examples, hui decimals, and context markers. Used as a typesetting reference, not as sole evidence for physical technique. |
| [Dunlosky et al. (2013)](https://doi.org/10.1177/1529100612453266) | Active retrieval and spaced practice. The particular scheduler and score are implementation heuristics, not experimentally validated for guqin. |
| [Toronto Guqin Society textbook](https://torguqin.wordpress.com/guqin/textbook/) | Further reading for the learner and teacher; no textbook scores, recordings or passages reproduced. |

## Content model

`src/data.js` contains independently authored lessons, structured notation examples, dictionary explanations, source references, three original teaching phrases, and the question bank. `src/learning.js` handles validation, scheduling and per-concept observations. `src/ui.js` handles rendering. Adding content requires a valid lesson, concept, answer, plausible alternatives, explanation, and source review.

Mistake attribution is deliberately narrow: a wrong string-number answer does not imply that the learner misunderstood the entire composite symbol. Component questions, action discrimination, and phrase context test different aspects. Assisted answers remain valuable practice but do not establish independent recall.

Curriculum is available for free navigation because an existing learner may be following a teacher's own sequence. All lessons remain accessible; recommendations adjust practice priority rather than lock the learner out.

## Notation limits

The modern examples teach common forms. Ancient scores and schools can differ. Hui decimals describe the teaching convention, not equal-tempered semitone counts. The diagram interpolates positions only as an orientation aid. It must never be presented as an exact intonation guide.

No copyrighted score scans or audio are bundled. Phrase examples are short original drills with no imposed rhythm. Broader historical repertoire or playback should be a separate content decision with an identified edition and licensed performance.

## Validation

Nine unit/content checks verify correct/assisted scoring, due dates, narrow concept attribution, repeated-item mastery safeguards, JSON round-trip and deduplication, malformed import rejection, introductory eligibility, targeted sessions, and content integrity. The browser smoke script additionally tests real interactions and layout once a browser-capable environment is available.
