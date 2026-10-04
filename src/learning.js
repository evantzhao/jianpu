import {questions,questionMap,concepts,lessons} from './data.js';
export const STORAGE_KEY='guqin-reader.v1';
export const emptyState=()=>({version:1,attempts:[],completed:[],bookmarks:[],notes:'',support:false});
export function validateState(raw){
 if(!raw||raw.version!==1||!Array.isArray(raw.attempts)||raw.attempts.length>20000)throw Error('不是有效的琴读备份，或备份版本不受支持。');
 const out=emptyState();const ids=new Set();
 for(const a of raw.attempts){
  if(!a||typeof a.id!=='string'||a.id.length>100||!Object.hasOwn(questionMap,a.question)||typeof a.correct!=='boolean'||typeof a.assisted!=='boolean'||!Number.isFinite(a.at)||a.at<0||a.at>Date.now()+86400000)throw Error('备份包含无效练习记录，未导入。');
  if(!ids.has(a.id)){out.attempts.push({id:a.id,question:a.question,correct:a.correct,assisted:a.assisted,at:a.at});ids.add(a.id);}
 }
 out.attempts.sort((a,b)=>a.at-b.at);
 for(const key of ['completed','bookmarks']){if(!Array.isArray(raw[key])||raw[key].some(x=>typeof x!=='string'))throw Error('备份内容不完整。');out[key]=[...new Set(raw[key])];}
 out.completed=out.completed.filter(id=>lessons.some(l=>l.id===id));
 if(typeof raw.notes!=='string'||raw.notes.length>5000||typeof raw.support!=='boolean')throw Error('备份设置无效。');
 out.notes=raw.notes;out.support=raw.support;return out;
}
export function mergeState(a,b){return validateState({...a,attempts:[...new Map([...a.attempts,...b.attempts].map(x=>[x.id,x])).values()].slice(-20000),completed:[...new Set([...a.completed,...b.completed])],bookmarks:[...new Set([...a.bookmarks,...b.bookmarks])]});}
export function stats(state,now=Date.now()){
 const result=Object.fromEntries(Object.keys(concepts).map(id=>[id,{id,attempts:0,correct:0,assisted:0,streak:0,score:0,due:0,last:0,distinct:0}]));
 const seen={};
 for(const a of state.attempts){const q=questionMap[a.question];if(!q)continue;const s=result[q.concept];s.attempts++;s.last=a.at;
  if(a.assisted)s.assisted++;
  if(a.correct&&!a.assisted){s.correct++;s.streak++;s.score=Math.min(100,s.score+22);s.due=a.at+[1,3,7,14,30][Math.min(s.streak-1,4)]*86400000;(seen[q.concept]??=new Set()).add(q.id);}
  else {s.streak=0;s.score=Math.max(0,s.score-(a.correct?5:25));s.due=a.at+(a.correct?3600000:600000);}
 }
 for(const [id,s] of Object.entries(result)){s.distinct=seen[id]?.size||0;s.dueNow=!!s.attempts&&s.due<=now;s.mastered=s.score>=80&&s.streak>=3&&s.distinct>=Math.min(2,questions.filter(q=>q.concept===id).length);}
 return result;
}
export function recommendation(state,now=Date.now()){
 const all=stats(state,now),weak=Object.values(all).filter(s=>s.attempts&&(!s.mastered||s.dueNow)).sort((a,b)=>Number(b.dueNow)-Number(a.dueNow)||a.score-b.score||a.last-b.last);
 const next=lessons.find(l=>!state.completed.includes(l.id));
 if(weak.length)return {type:'review',concept:weak[0].id,lesson:lessons.find(l=>l.concepts.includes(weak[0].id)).id,reason:weak[0].dueNow?'已到复习时间':weak[0].assisted?'有提示时能认出，再独立试一次':'这个概念还需要巩固'};
 return {type:'lesson',lesson:next?.id||'context',reason:next?'循序学习，再用短练习巩固':'基础已走过，试试连读短句'};
}
export function shuffle(arr,rng=Math.random){const out=[...arr];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
export function makeSession(state,{lesson=null,concept=null,diagnostic=false,now=Date.now(),rng=Math.random,length=8}={}){
 const s=stats(state,now),next=lessons.find(l=>!state.completed.includes(l.id))?.id||'context';
 let pool=questions.filter(q=>lesson?q.lesson===lesson:concept?q.concept===concept:diagnostic||state.completed.includes(q.lesson)||q.lesson===next||s[q.concept].attempts>0);
 const lastByQuestion=Object.fromEntries(state.attempts.map(a=>[a.question,a]));
 const ranked=shuffle(pool,rng).map(q=>({q,priority:(s[q.concept].dueNow?80:0)+(s[q.concept].attempts?100-s[q.concept].score:35)-(lastByQuestion[q.id]&&now-lastByQuestion[q.id].at<600000?110:0)})).sort((a,b)=>b.priority-a.priority);
 const chosen=[],counts={};
 // Spread a short session across concepts before filling its remaining slots.
 for(const {q}of ranked)if(!counts[q.concept]&&chosen.length<length){chosen.push(q);counts[q.concept]=1;}
 for(const {q}of ranked)if(!chosen.includes(q)&&chosen.length<length)chosen.push(q);
 return chosen.map(q=>({...q,options:shuffle(q.options,rng)}));
}
export function record(state,question,correct,assisted,now=Date.now()){
 if(!questionMap[question])throw Error('Unknown question');
 const id=globalThis.crypto?.randomUUID?.()||`${now}-${Math.random().toString(36).slice(2)}`;
 return {...state,attempts:[...state.attempts,{id,question,correct:!!correct,assisted:!!assisted,at:now}].slice(-20000)};
}
