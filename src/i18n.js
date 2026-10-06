import {lessons, terms, techniques, sources, phrases, examples, questions, fingers, numerals, describe} from './data.js';
import {lessonCopy, termCopy, phraseCopy, sourceCopy} from './content.en.js';

export const LANGUAGE_KEY = 'guqin-reader.language';
let language = 'zh';
try { if (globalThis.localStorage?.getItem(LANGUAGE_KEY) === 'en') language = 'en'; } catch { /* Session preference still works. */ }
export const getLanguage = () => language;
export function setLanguage(value) {
  language = value === 'en' ? 'en' : 'zh';
  try { globalThis.localStorage?.setItem(LANGUAGE_KEY, language); } catch { /* Do not touch learning records. */ }
}

// Source-language keys let the original Chinese copy remain readable in the templates.
// Only displayed text/accessible labels are localized; IDs, answer values and notation encodings are never changed.
const copy = new Map(Object.entries({
  '今日':'Today', '课程':'Lessons', '练习':'Practice', '字典':'Dictionary', '进度':'Progress',
  '设置':'Settings', '谱字字典':'Notation explorer', '学习进度':'Your progress', '短句读谱':'Phrase reader',
  '主导航':'Main navigation', '移动导航':'Mobile navigation', '跳到内容':'Skip to content',
  '读谱，也是一种练习。':'Reading is practice, too.', '一字一音':'One symbol, one sound', '循序渐进':'One step at a time',
  '设置与备份':'Settings & backup', '资料与方法':'Sources & method', '资料与方法 ↗':'Sources & method ↗',
  '进度仅存于此浏览器':'Progress stays in this browser', '减字谱学习手记':'Jianzipu study notes', '读谱伴侣':'Reading companion',
  '拼音 / EN':'Pinyin / glosses', '拼音 / EN 已开':'Pinyin / glosses on',
  '阅读辅助':'Reading aids', '辅助已开':'Aids on', '辅助':'Aids',
  '切换到英文':'Switch to English', '切换到中文':'Switch to Chinese',
  '界面语言':'Language', '中文与英文可随时切换。谱字保留原样，学习进度共用。':'Switch between Chinese and English at any time. Notation stays in its original form, and both languages share your progress.',
  '默认中文。需要时显示拼音和英文；点击字典中的任何词条都能查看读音。':'Show extra pinyin and English glosses when needed. Open any dictionary entry to see its pronunciation.',
  '关闭拼音 / English':'Hide extra pinyin / glosses', '开启拼音 / English':'Show extra pinyin / glosses',
  '备份与恢复':'Backup & recovery', '琴读 · 为你的古琴课，留一点课后的练习。':'Guqin Reader · A little practice between lessons.',
  '参考资料':'Sources', '参考':'Sources',
  '你的读谱时光 · A LITTLE, OFTEN':'A LITTLE, OFTEN', '读懂一字，':'Read a symbol.', '奏出一声。':'Find its sound.',
  '把复杂的谱字，慢慢读成指尖熟悉的动作。':'Turn unfamiliar symbols into actions your fingers know.',
  '今日一字':'Today’s symbol', '按音':'Stopped tone', '散音':'Open string', '泛音':'Harmonic',
  '拆解今日谱字：名九勾五':'Explore today’s symbol: 名九勾五', '由字入琴':'From symbol to sound',
  '左手名指 · 九徽 · 右手勾 · 五弦':'Left ring finger · hui 9 · gou · string 5', '拆开看看':'Explore the parts',
  '接下来，学一点':'Your next step', '温故':'Review', '知新':'Learn',
  '开始针对练习':'Practice this concept', '开始这一课':'Start this lesson', '独立回忆 · 即时反馈':'Recall first · get feedback',
  '已读课程':'Lessons read', '待复习概念':'Due for review', '独立答对率':'Unaided accuracy',
  '从字，到句':'From symbols to phrases', '全部课程':'All lessons', '带着前文，继续读':'Carry the context forward',
  '读一小段，让谱字连起来。':'Read a phrase, connect the symbols.', '三组原创短句 · 可切换自测模式':'Three original exercises · with self-test mode',
  '六堂小课 · THE FOUNDATIONS':'SIX SHORT LESSONS', '循序读谱':'Build your reading skills',
  '可从头学习，也可直接进入老师课上遇到的内容。':'Start at the beginning, or jump to something from your guqin lesson.',
  '课程已读不等于熟练。独立答题表现会决定你的复习建议；课程始终可以自由访问。':'Reading a lesson does not mean mastering it. Unaided answers guide your review suggestions; every lesson remains freely accessible.',
  '课程目录':'All lessons', '学习步骤':'Lesson steps', '下一步':'Next step', '读完了，试一试':'Try what you learned',
  '随课拆解 · 点击下面的部件':'Explore the example · tap a component',
  '一字一解 · NOTATION EXPLORER':'NOTATION EXPLORER', '拆开一个谱字':'Take a symbol apart',
  '认出全字，再看它在减字谱里的样子。':'Connect a full character with its reduced form in tablature.',
  '查指法字典 ↓':'Find a technique ↓', '选择谱字':'Choose a symbol',
  '教学字形示例；实际谱本可能有异写或省略。':'Teaching examples. Actual scores may use variant forms or omit components.',
  '随手查字':'QUICK LOOKUP', '指法小字典':'Technique dictionary', '搜索指法':'Search techniques',
  '搜汉字、拼音或含义':'Character, pinyin or meaning', '全部':'All', '右手':'Right hand', '左手':'Left hand', '音色':'Tone', '走手':'Movement', '收藏':'Saved',
  '没有找到。试试「猱」、nao 或「中指」。':'No match. Try 猱, nao or “middle finger”.', '关闭':'Close',
  '上方用「散音、五弦」组合展示该指法。':'This example shows the technique on open string 5.',
  '取消收藏':'Remove bookmark', '加入收藏':'Bookmark',
  '主动回忆 · DAILY PRACTICE':'DAILY PRACTICE', '把看懂，变成记得。':'Turn recognition into recall.',
  '先自己判断，再看解释。每一次练习，都让下一次更有针对性。':'Try an answer before reading the explanation. Each attempt helps guide your next practice.',
  '八题，一小步':'Eight questions. One small step.', '根据已读课程与答题记录选题，穿插薄弱概念。':'Questions draw on your lessons and practice history, with extra attention to weaker concepts.',
  '没有倒计时，慢慢读。':'No countdown. Take your time.', '开始今日练习':'Start today’s practice',
  '做过的题会在之后安排复习':'Completed questions return for spaced review', '已有基础？':'Already know the basics?',
  '跨六课做一次混合自测，找出需要巩固的地方。':'Try a mixed review across all six lessons to find what needs work.',
  '混合自测 →':'Mixed review →', '把字连成句':'Connect the symbols',
  '练习保留前文的手指、弦序与音色信息。':'Practice carrying finger, string and tone information forward.', '进入短句练习 →':'Open the phrase reader →',
  '练习完成 · WELL PRACTICED':'PRACTICE COMPLETE', '今天，又读懂了一点。':'A little more familiar today.',
  '独立答对':'Correct without hints', '下一次，我们会再看看这些概念。':'We will revisit these concepts in future practice.',
  '本轮表现不错。间隔一段时间再回忆，让记忆更稳。':'Good work this round. Recall it again after a break to strengthen your memory.',
  '查看学习记录':'View your progress', '再练一组':'Practice again',
  '提示后的正确答案记作辅助练习，不计入独立答对。':'Correct answers after a hint count as assisted practice, not unaided recall.',
  '暂停练习':'Pause practice', '混合自测':'Mixed review', '独立辨读':'RECALL WITHOUT HINTS',
  '已使用提示':'Hint used', '需要一点提示？':'Need a hint?', '提示后答对 · 再独立读一次':'Correct with a hint · try unaided next time',
  '读对了':'Correct', '再看一眼这个部件':'Take another look', '查看本轮小结':'View summary', '下一题':'Next question',
  '弦序跟右手指法一起读。不要把左手旁的徽位数字当作弦序。':'Read the string number with the right-hand technique. Do not confuse it with the hui number beside the left-hand component.',
  '先看左手部件：名是无名指，大是大指。':'Look at the left-hand component: 名 means ring finger; 大 means thumb.',
  '先找左手指法，再读它旁边的位置数字。七六在本课中可能是七徽六分。':'Find the left-hand finger, then the nearby position. In this course, 七六 can mean hui 7.6.',
  '散表示空弦；泛表示轻触取泛音。普通按音字会标手指与徽位。':'散 means open string; 泛 means a light touch for harmonics. An ordinary stopped-tone symbol gives a finger and hui position.',
  '回忆课程中的结构与前文信息，再比较选项。':'Recall the structure and preceding context from the lessons, then compare the choices.',
  '连字成句 · PHRASE READER':'PHRASE READER', '前一字，也在下一字里。':'Carry each symbol forward.',
  '原创读谱练习，未指定节奏；在你的琴课中应用这些读谱方法。':'Original notation drills without a fixed rhythm. Apply these reading skills in your guqin lessons.',
  '切换到自测':'Self-test mode', '切换到学习':'Study mode',
  '本页按从左到右阅读 · 古谱也常见自上而下、由右至左的列式排版':'Read left to right here. Historical scores also commonly use columns read top to bottom, from right to left.',
  '左右滑动看谱字，或用下方「下一字」。':'Swipe through the symbols, or use “Next” below.', '短句谱字':'Phrase symbols',
  '先在心里说出这个动作。':'Say the action to yourself first.',
  '它使用哪根弦？前面的音色或手指信息是否仍有效？':'Which string is it? Do the previous tone or finger instructions still apply?',
  '揭示解释，自行核对':'Reveal and check', '← 前一字':'← Previous', '回到第一字 ↺':'Back to first ↺', '下一字 →':'Next →',
  '本页的揭示与自查不计为客观答题成绩。想记录掌握情况，请做「前后文」练习。':'Revealing an explanation is a self-check, not a scored answer. Use the context practice to record your progress.',
  '练习前后文 →':'Practice context →',
  '学习留下的痕迹 · YOUR PROGRESS':'YOUR PROGRESS', '让薄弱处，有迹可循。':'See what needs another look.',
  '独立回答、辅助练习与复习时间分开记录。掌握程度只是练习估计。':'Unaided answers, assisted practice and review dates are tracked separately. Familiarity is only a practice estimate.',
  '累计作答':'Total answers', '较稳固的概念':'Steadier concepts', '使用提示':'Hints used', '建议下一步':'SUGGESTED NEXT STEP',
  '针对练习 →':'Targeted practice →', '继续课程 →':'Continue learning →', '概念地图':'Concept map', '按需巩固 · 点击即可练习':'Tap a concept to practice',
  '尚未练习':'Not practiced yet', '未开始':'New', '待复习':'Due', '较稳固':'Steady', '巩固中':'Learning',
  '先留下一次练习。':'Start with one practice session.', '你的概念地图会从真实答题记录开始，不预设分数。':'Your concept map starts with real answers, not assumed scores.',
  '开始混合自测':'Start a mixed review', '给下一堂琴课留个问题':'A question for your next lesson',
  '记录谱本异写、老师的说法，或自己卡住的地方。仅作个人笔记，不参与自动排课。':'Note a variant spelling, your teacher’s explanation or something you find difficult. These personal notes do not affect the practice schedule.',
  '例如：老师的谱里，擘写作劈；下次问一下这个走手的处理。':'For example: my teacher’s score writes 擘 as 劈. Ask about this movement next time.',
  '保存笔记':'Save notes', '此处留存 · SETTINGS':'SETTINGS', '简单，也安心。':'Simple, and yours.',
  '无需登录。课程、练习记录与笔记只保存在此浏览器。':'No sign-in. Your lesson progress, practice history and notes stay in this browser.',
  '给进度留一份备份':'Keep a progress backup',
  '清理浏览器数据、隐私模式或更换网址可能让记录不可用。导出文件可手动迁移到另一台设备。':'Clearing browser data, private browsing or changing the site address can make records unavailable. Export a file to move your progress to another device.',
  '导出进度':'Export progress', '导入备份':'Import backup', '导出无法读取的原始记录':'Export the unreadable original data',
  '导入前会显示记录数量，并由你选择是否合并。网站不会上传文件。':'You will see the record count and choose whether to merge before importing. Your file is not uploaded.',
  '查看课程的来源、字体授权，以及复习建议如何产生。':'Read about lesson sources, the font license and how review suggestions work.', '查看参考资料 →':'View sources →',
  '有据可查 · SOURCES & METHOD':'SOURCES & METHOD', '读谱有出处，学习有方法。':'Sources behind the symbols.',
  '教学文字与练习由本站编写；资料链接便于你与老师核对。':'The site’s teaching copy and exercises are original. Follow the sources to compare them with your teacher.',
  '复习如何调整？':'How does review adapt?',
  '每题只把结果归到它真正检查的概念。答错或使用提示，会让该概念优先出现；独立答对后，复习间隔逐步延长为 1、3、7、14、30 天。答错后的到期时间是 10 分钟，提示后答对是 1 小时；你也可以随时主动练习。':'Each answer affects only the concept it tests. A mistake or a hint raises its review priority. Unaided correct answers extend the interval through 1, 3, 7, 14 and 30 days. A wrong answer is due again in 10 minutes; a correct answer with a hint in one hour. You can also practice at any time.',
  '初始顺序依据课程；已有练习记录后，系统优先处理到期与薄弱概念，并尽量穿插不同题型。独立答对增加熟悉度，连续答对和题目覆盖共同决定「较稳固」标记。这是透明的学习辅助估计，不是古琴水平考试。':'The initial sequence follows the lessons. After you have practiced, due and weaker concepts take priority, with a mix of question types. Unaided correct answers increase familiarity; a correct streak and coverage across questions determine the “Steady” label. This is a transparent study estimate, not a guqin proficiency exam.',
  '内容边界':'Scope of the material',
  '本站练习现代常见减字谱的基本读法。不同谱本与流派的用字、指法细节、徽位写法可能不同。遇到差异，请以所学谱本的说明及老师指导为准。原创短句用于识谱，没有声称复原某首古曲，也没有为传统谱字编造唯一的节奏。':'The site teaches basic readings of common modern jianzipu. Characters, technique details and hui conventions may differ by score and tradition. Follow your score’s notes and your teacher when they differ. The original phrase drills teach reading; they do not reconstruct a historical composition or assign a single rhythm to traditional notation.',
  '字体致谢':'Font credit', 'JianZiPu © Nancy Liang / Nellodee LLC，基于 TW-Kai。使用未修改字体，遵循 SIL Open Font License 1.1。':'JianZiPu © Nancy Liang / Nellodee LLC, based on TW-Kai. The unmodified font is used under SIL Open Font License 1.1.', '查看完整字体许可 ↗':'Read the full font license ↗',
  '合并这份学习记录？':'Merge this practice history?', '取消':'Cancel', '合并记录':'Merge records', '已合并学习记录。':'Practice history merged.',
  '已保存，留到下一堂琴课。':'Saved for your next guqin lesson.', '备份已导出。':'Backup exported.',
  '备份过大，最大支持 5 MB。':'This backup is too large. The limit is 5 MB.', '无法读取备份。原有记录没有改变。':'Could not read this backup. Existing records are unchanged.',
  '浏览器拒绝读取原始记录。':'The browser denied access to the original data.', '另一个窗口的进度格式不受支持。':'The progress format in another window is not supported.',
  '无法读取已有进度。原记录未覆盖；可先导出原始记录，再导入有效备份。':'Existing progress could not be read. It has not been overwritten. Export the original data before importing a valid backup.',
  '浏览器无法保存进度。当前练习仍可继续，请在「设置」中导出备份。':'The browser cannot save progress. You can keep practicing; export a backup in Settings.',
  '不是有效的琴读备份，或备份版本不受支持。':'This is not a valid Guqin Reader backup, or its version is not supported.',
  '备份包含无效练习记录，未导入。':'The backup contains invalid practice records and was not imported.', '备份内容不完整。':'The backup is incomplete.', '备份设置无效。':'The backup settings are invalid.',
  '已到复习时间':'Time to review', '曾使用提示，试着独立辨认':'You used a hint before. Try recognizing it unaided.',
  '这个概念还需要巩固':'This concept needs more practice', '循序学习，再用短练习巩固':'Learn step by step, then try a short practice', '基础已走过，试试连读短句':'You have read the basics. Try reading a phrase.',
  '谱字结构':'Symbol structure', '弦序':'String number', '徽位':'Hui position', '左手指法':'Left-hand fingers', '弹弦方向':'Plucking direction', '散・按・泛':'Open · stopped · harmonic', '前后文':'Context',
  '名指':'Ring finger (名)', '大指':'Thumb (大)', '中指':'Middle finger (中)', '食指':'Index finger (食)', '向内':'Inward (toward you)', '向外':'Outward (away from you)', '不按弦':'No stopping',
  '琴面位置示意 · 一弦在远侧，七弦在近侧 · 非音准标尺':'Position guide · string 1 is farthest from you, string 7 nearest · not a tuning scale',
  '龙龈':'Longyin', '岳山':'Yueshan', '散音没有左手按弦位置。':'An open string has no left-hand stopping position.', '「散」表示空弦，左手不按弦。':'散 means an open string: do not stop it with the left hand.',
  '减字谱示例':'Jianzipu example', '上下文谱字':'Notation in context', '待辨读谱字':'Symbol to identify', '待辨读指法':'Technique to identify',
  '这个谱字要弹第几弦？':'Which string should you pluck?', '左手用哪根手指？':'Which left-hand finger is used?', '左手的位置是？':'What is the left-hand position?',
  '这个完整谱字表示哪种取音？':'Which type of tone does this symbol indicate?', '这个指法用右手哪根手指？':'Which right-hand finger plays this technique?',
  '谱字中的走手指示是什么意思？':'What does this movement sign mean?',
  '先想它与哪个指法成对，再想那一对的方向。':'Recall its paired technique, then compare their directions.',
  '散表示空弦，左手不按弦。':'散 indicates an open string: the left hand does not stop it.',
  '这里有泛音标记：左手轻触，而不是按实。':'A harmonic mark is present: touch lightly with the left hand rather than stopping firmly.',
  '本例没有泛音段落标记；左手按所示徽位取音。':'There is no harmonic-passage mark in this example. Stop the string at the indicated hui position.',
  '减字谱主要直接告诉你什么？':'What does jianzipu primarily tell you directly?',
  '双手的演奏动作':'The playing actions of both hands', '每个音的固定时值':'A fixed duration for every note', '唯一的演奏速度':'One exact tempo', '歌词的读音':'How to pronounce the lyrics',
  '减字谱用动作、弦序和位置记录音乐；节奏常需结合传授与版本。':'Jianzipu records music through actions, string numbers and positions. Rhythm often depends on teaching and the score edition.',
  '「名九勾五」之后的「上七」，七指什么？':'After 名九勾五, what does the seven in 上七 refer to?',
  '目标位置：七徽':'The destination: hui 7', '改弹七弦':'Switch to string 7', '连弹七次':'Pluck seven times', '右手第七种指法':'The seventh right-hand technique',
  '沿用前文的五弦与名指，左手上移至七徽。':'Keep the preceding string 5 and ring finger; slide the left hand up to hui 7.',
  '泛起之后、泛止之前，这个没有再写「泛」的谱字怎样读？':'Between 泛起 and 泛止, how do you read a symbol without a repeated harmonic mark?',
  '仍按泛音读':'Still as a harmonic', '一定是按音':'It must be a stopped tone', '一定是散音':'It must be an open string', '没有办法判断':'There is no way to know',
  '段落标记仍在生效。要带着前文一起读。':'The passage instruction still applies. Carry the earlier context forward.',
  '只有这些谱字，能否确定唯一的节奏？':'Do these symbols alone determine one exact rhythm?',
  '不能，还需版本或示范':'No; consult an edition or demonstration', '能，每字恰好一拍':'Yes; every symbol lasts one beat', '能，所有音等长':'Yes; all tones have equal duration', '能，按字的大小判断':'Yes; the size of each symbol tells you',
  '读出动作不等于还原唯一时值。学习老师所授版本的句法与节奏。':'Reading the action does not determine a unique duration. Learn the phrasing and rhythm of the version your teacher uses.',
  '泛起':'Begin harmonics · 泛起', '泛止':'End harmonics · 泛止', '上七':'Slide to hui 7 · 上七', '下九':'Slide to hui 9 · 下九',
}));
const put = (zh, en) => { if (zh && en) copy.set(zh, en); };
const fingerNames = {s:'ring finger', v:'thumb', d:'middle finger', f:'index finger'};
const fingerName = value => fingerNames[Object.keys(fingers).find(k => fingers[k] === value)] || value;
const techLabel = tech => `${tech.name} (${tech.pinyin})`;
for (const lesson of lessons) {
  const en = lessonCopy[lesson.id];
  put(lesson.title, en.title); put(lesson.subtitle, en.subtitle);
  lesson.steps.forEach((step, i) => step.forEach((part, j) => put(part, en.steps[i][j])));
}
for (const term of terms) {
  if (term.category === '右手') {
    put(term.definition, `Pluck ${term.direction === '向内' ? 'inward' : 'outward'} with the right ${fingerName(term.finger)}.`);
    put(term.detail, term.id === 'pi' ? 'Some scores write 劈 instead. Pronunciation and spelling vary between teaching materials; use your teacher’s terminology.' : `Learn it with its counterpart ${term.detail.match(/与(.*?)成对/)[1]}: the same finger, the opposite direction.`);
    put(`${term.name} · ${term.finger}`, `${term.name} · ${fingerName(term.finger)}`);
    put(`${term.name} · 右手`, `${techLabel(term)} · right hand`);
  } else {
    put(term.definition, termCopy[term.id][0]); put(term.detail, termCopy[term.id][1]);
    if (term.category === '走手') put(`${term.name} · 走手`, `${techLabel(term)} · movement`);
  }
}
for (const source of sources) {
  const en = sourceCopy[source.id];
  [source.name, source.title, source.note].forEach((s, i) => put(s, en[i]));
}
for (const phrase of phrases) {
  const en = phraseCopy[phrase.id];
  put(phrase.title, en[0]); put(phrase.subtitle, en[1]);
  phrase.notes.forEach((note, i) => put(note.explanation, en[2][i]));
}
for (const e of examples) {
  const tech = techniques.find(t => t.id === e.tech);
  const action = e.mode === '散音' ? 'Leave the string open' : `${e.mode === '泛音' ? 'Lightly touch' : 'Stop'} string ${e.string} at hui ${e.hui} with your left ${fingerNames[e.left]}`;
  put(describe(e), `${action}, then pluck string ${e.string} with ${techLabel(tech)}.`);
  put(`弦序与右手指法一起读：${tech.name}${numerals[e.string]}弦。`, `Read the string number with the right-hand technique: ${techLabel(tech)} on string ${e.string}.`);
  if (e.left) {
    put(`左手部件是「${fingers[e.left].replace('指','')}」，对应${fingers[e.left]}。`, `The left-hand component ${fingers[e.left].replace('指','')} indicates the ${fingerNames[e.left]}.`);
    put(`「${fingers[e.left].replace('指','')}」告诉你左手用${fingers[e.left]}${e.mode==='泛音'?'轻触':'按弦'}。`, `${fingers[e.left].replace('指','')} indicates the left ${fingerNames[e.left]}: ${e.mode === '泛音' ? 'touch lightly for a harmonic' : 'stop the string'}.`);
  }
}
for (const tech of techniques) {
  const direction = tech.direction === '向内' ? 'inward' : 'outward';
  put(`「${tech.name}」的弹弦方向是？`, `In which direction do you pluck with ${techLabel(tech)}?`);
  put(`${tech.name}：${tech.finger}${tech.direction}。`, `${techLabel(tech)}: ${fingerName(tech.finger)}, ${direction}.`);
  put(`${tech.name}用${tech.finger}${tech.direction}；内指向自己，外指离开自己。`, `${techLabel(tech)} uses the ${fingerName(tech.finger)} ${direction}. Inward means toward you; outward means away from you.`);
  put(`先把减字形还原为「${tech.name}」。`, `First identify the full character: ${techLabel(tech)}.`);
  put(`${tech.name}：右手${tech.finger}${tech.direction}弹弦。`, `${techLabel(tech)}: pluck ${direction} with your right ${fingerName(tech.finger)}.`);
}
for (const term of terms.filter(t => t.category === '走手')) {
  put(`${term.name}（${term.pinyin}）：${term.definition} ${term.detail}`, `${techLabel(term)}: ${copy.get(term.definition)} ${copy.get(term.detail)}`);
  put(`这个部件的全字是「${term.name}」。`, `The full character is ${techLabel(term)}.`);
}

const patterns = [
  [/^(\d+) 分钟( · 已读)?$/, (_, n, read) => `${n} min${read ? ' · read' : ''}`],
  [/^(\d+) 分钟 · 一个示例，再试一试$/, (_, n) => `${n} min · explore an example, then try it`],
  [/^第 (\d+) 课 · (\d+) 分钟$/, (_, n, min) => `LESSON ${n} · ${min} MIN`],
  [/^第 (\d+) \/ (\d+) 题$/, (_, n, total) => `Question ${n} / ${total}`],
  [/^(\d+) 个概念已到复习时间$/, (_, n) => `${n} concept${n === '1' ? '' : 's'} due for review`],
  [/^(\d+) 次独立答对 \/ (\d+) 次尝试$/, (_, n, total) => `${n} unaided correct / ${total} attempts`],
  [/^(\d+) 弦$/, (_, n) => `String ${n}`], [/^([\d.]+) 徽$/, (_, n) => `Hui ${n}`],
  [/^([一二三四五六七])弦$/, (_, n) => `String ${numerals.indexOf(n)}`],
  [/^(\d\d) (左手|徽位|右手|弦序)$/, (_, n, part) => `${n} ${copy.get(part)}`],
  [/^这个数字组合指 ([\d.]+) 徽(，不是两个弦序)?。$/, (_, n, fraction) => `This number combination means hui ${n}${fraction ? ', not two string numbers' : ''}.`],
  [/^位置是 ([\d.]+) 徽(；小数部分对应本课使用的徽分写法)?。$/, (_, n, fraction) => `The position is hui ${n}${fraction ? '. The decimal follows the hui-and-fen notation used in this course' : ''}.`],
  [/^([一二三四五六七])是弦序，指第 (\d+) 根弦，不是徽位。$/, (_, zh, n) => `${zh} means string ${n}, not a hui position.`],
  [/^(右手|左手|音色|走手) · 全字与谱形$/, (_, category) => `${copy.get(category)} · character & notation`],
  [/^(右手|左手|音色|走手) · (.+)$/, (_, category, pinyin) => `${copy.get(category)} · ${pinyin}`],
  [/^第 (\d+) 个谱字$/, (_, n) => `Symbol ${n}`], [/^谱字 (\d+)$/, (_, n) => `Symbol ${n}`],
  [/^琴面示意：(.*)；岳山在右，龙龈在左。$/, (_, position) => `Qin position guide: ${position.replace(/([\d.]+)弦/g, 'string $1').replace(/([\d.]+)徽/g, 'hui $1').replace('，', ', ')}; yueshan on the right, longyin on the left.`],
  [/^备份含 (\d+) 次作答、(\d+) 堂已读课程。重复记录只保留一次。现有笔记保留；若现有笔记为空，则使用备份笔记。$/, (_, n, lessons) => `This backup contains ${n} answers and ${lessons} read lessons. Duplicate records are kept once. Existing notes are retained; backup notes are used only if your current notes are empty.`],
];
export function translate(text, locale = language) {
  if (locale !== 'en' || !text) return text;
  const value = text.trim();
  let result = copy.get(value);
  if (result === undefined) {
    for (const [pattern, replacement] of patterns) {
      if (pattern.test(value)) { result = value.replace(pattern, replacement); break; }
    }
  }
  // Source titles may have a link arrow appended by the template.
  if (result === undefined && value.endsWith(' ↗') && copy.has(value.slice(0, -2))) result = copy.get(value.slice(0, -2)) + ' ↗';
  return result === undefined ? text : text.replace(value, result);
}
const originalText = new WeakMap(), originalAttributes = new WeakMap();
const preserved = '.glyph, textarea, script, style, [translate="no"], .term-char, .term-dialog h2, .hero-caption h2, .explorer-plain, .phrase-note small';
export function localize(root, {reportMissing = false} = {}) {
  const missing = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest(preserved)) continue;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    if (reportMissing && missingTranslation(original)) missing.push(original.trim());
    node.nodeValue = translate(original);
  }
  for (const element of root.querySelectorAll('[aria-label], [placeholder], [title]')) {
    let attributes = originalAttributes.get(element);
    if (!attributes) {
      attributes = Object.fromEntries(['aria-label', 'placeholder', 'title'].filter(a => element.hasAttribute(a)).map(a => [a, element.getAttribute(a)]));
      originalAttributes.set(element, attributes);
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (reportMissing && missingTranslation(value)) missing.push(value);
      element.setAttribute(key, translate(value));
    }
  }
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hans';
  document.documentElement.dataset.language = language;
  return [...new Set(missing)];
}
// Coverage checks use this to allow intentional study characters, not untranslated prose.
export const studyText = new Set(['琴','读','琴读','句','习','谱','知','中文', ...numerals, ...terms.map(t=>t.name), ...examples.map(e=>e.text), ...phrases.flatMap(p=>p.notes.map(n=>n.label).filter(Boolean)), ...[0,2,4,6].map(i=>`${techniques[i].name} / ${techniques[i+1].name}`)]);
export function missingTranslation(text) { return /\p{Script=Han}/u.test(text) && translate(text, 'en') === text && !studyText.has(text.trim()); }
