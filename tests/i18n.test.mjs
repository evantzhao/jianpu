import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons, terms, questions, sources, phrases, examples, describe} from '../src/data.js';
import {translate, missingTranslation, setLanguage, getLanguage} from '../src/i18n.js';

test('all authored lessons, dictionary definitions, source notes and phrase explanations have English copy', () => {
  const texts = [
    ...lessons.flatMap(l => [l.title, l.subtitle, ...l.steps.flat()]),
    ...terms.flatMap(t => [t.definition, t.detail]),
    ...sources.flatMap(s => [s.name, s.title, s.note]),
    ...phrases.flatMap(p => [p.title, p.subtitle, ...p.notes.map(n => n.explanation).filter(Boolean)]),
    ...examples.map(describe),
  ];
  assert.deepEqual(texts.filter(missingTranslation), []);
});

test('all 76 questions, answer choices, feedback and explicit hints are translated without changing canonical answers', () => {
  const original = JSON.stringify(questions);
  const texts = questions.flatMap(q => [q.prompt, q.answer, ...q.options, q.explanation, q.hint].filter(Boolean));
  assert.deepEqual([...new Set(texts.filter(missingTranslation))], []);
  assert.equal(JSON.stringify(questions), original);
});

test('dynamic quantities and diagram descriptions translate while notation stays recognizable', () => {
  assert.equal(translate('第 2 / 8 题', 'en'), 'Question 2 / 8');
  assert.equal(translate('位置是 7.6 徽；小数部分对应本课使用的徽分写法。', 'en'), 'The position is hui 7.6. The decimal follows the hui-and-fen notation used in this course.');
  assert.equal(translate('琴面示意：5弦，9徽；岳山在右，龙龈在左。', 'en'), 'Qin position guide: string 5, hui 9; yueshan on the right, longyin on the left.');
  assert.equal(translate('名九勾五', 'en'), '名九勾五');
});

test('language switching is reversible and Chinese remains the default fallback', () => {
  setLanguage('en'); assert.equal(getLanguage(), 'en'); assert.equal(translate('保存笔记'), 'Save notes');
  setLanguage('zh'); assert.equal(translate('保存笔记'), '保存笔记');
  setLanguage('unsupported'); assert.equal(getLanguage(), 'zh');
});
