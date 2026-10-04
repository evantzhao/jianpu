import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyState,record,stats,validateState,makeSession,mergeState,recommendation} from '../src/learning.js';
import {questions,concepts,lessons,examples,techniques} from '../src/data.js';
const now=Date.now()-1000;
const q=questions.find(q=>q.concept==='string');
test('independent success schedules spaced retrieval; hints do not count as independent success',()=>{
 let s=record(emptyState(),q.id,true,false,now);assert.equal(stats(s,now).string.correct,1);assert.equal(stats(s,now).string.due,now+86400000);
 s=record(s,q.id,true,true,now+1);const st=stats(s,now).string;assert.equal(st.correct,1);assert.equal(st.assisted,1);assert.equal(st.streak,0);assert.equal(st.due,now+1+3600000);
});
test('a wrong answer updates only its tested concept and becomes due',()=>{
 const s=record(emptyState(),q.id,false,false,now),st=stats(s,now+600001);assert.equal(st.string.dueNow,true);assert.equal(st.hui.attempts,0);assert.equal(recommendation(s,now+600001).concept,'string');
});
test('repeated memorization of one item cannot establish multi-item mastery',()=>{
 let s=emptyState();for(let i=0;i<6;i++)s=record(s,q.id,true,false,now-i*1000);assert.equal(stats(s).string.mastered,false);
 const second=questions.find(x=>x.concept==='string'&&x.id!==q.id);s=record(s,second.id,true,false,now);assert.equal(stats(s).string.mastered,true);
});
test('backup round trip preserves progress, notes, completion and bookmarks',()=>{
 let s=record(emptyState(),q.id,false,true,now);s.completed=['right'];s.notes='老师：擘又写作劈';s.bookmarks=['nao'];assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);assert.equal(mergeState(s,s).attempts.length,1);
});
test('bad imports rejected without mutating state',()=>{
 const s=emptyState();for(const bad of [{}, {...s,version:2},{...s,attempts:[{question:'evil'}]},{...s,notes:'x'.repeat(5001)},{...s,attempts:[{id:'x',question:'__proto__',correct:true,assisted:false,at:now}]}])assert.throws(()=>validateState(bad));assert.equal(s.attempts.length,0);
});
test('initial practice stays within introductory curriculum; diagnostic spans wider concepts',()=>{
 const session=makeSession(emptyState());assert.equal(session.length,8);assert.ok(session.every(q=>q.lesson==='structure'));assert.equal(new Set(session.map(q=>q.id)).size,8);
 const diag=makeSession(emptyState(),{diagnostic:true});assert.ok(new Set(diag.map(q=>q.lesson)).size>=2);
});
test('targeted practice focuses on the selected weak concept',()=>{
 const s=record(emptyState(),q.id,false,false,now-1000000),session=makeSession(s,{concept:'string',now});assert.ok(session.every(q=>q.concept==='string'));assert.ok(makeSession(s,{now}).some(x=>x.concept==='string'));
});
test('all exercises have a valid source lesson, concept, answer and unique id',()=>{
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);for(const q of questions){assert.ok(concepts[q.concept]);assert.ok(lessons.some(l=>l.id===q.lesson));assert.ok(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.options.length>=2);if(q.example)assert.ok(examples.some(e=>e.id===q.example));}
});
test('basic notation data uses only valid strings and finger/action combinations',()=>{for(const e of examples){assert.ok(e.string>=1&&e.string<=7);assert.ok(techniques.some(t=>t.id===e.tech));if(e.mode==='散音'){assert.equal(e.left,null);assert.equal(e.hui,null);}else assert.ok(e.hui>=1&&e.hui<=13);}});
