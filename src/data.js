export const sources = [
 {id:'hkm',name:'香港记忆 · 香江琴缘',title:'彈奏技巧',url:'https://www.hkmemory.hk/tc/collections-qin_story-on_the_qin-basic_techniques.html',note:'右手八法与吟、猱、绰、注的基本意义。采用该馆所述的常见指法方向。'},
 {id:'notes',name:'Yuting Chao · 古琴笔记',title:'減字譜的構造與讀譜',url:'https://guqinnotes.com/tablature-of-guqin/',note:'结构拆解、数字辨读及左右手元素的教学顺序。'},
 {id:'silk',name:'John Thompson · Silkqin',title:'Videos for learning guqin',url:'https://www.silkqin.com/07play/videosforlearning.htm',note:'读谱与演奏的区别；节奏、句法和师承版本。'},
 {id:'font',name:'Nancy Liang · JianZiPu',title:'JianZiPu font & notation encoding',url:'https://guqintabs.com/jianzipu/',note:'减字谱字形及组合排版。字体按 SIL Open Font License 1.1 使用。编码规范不是演奏教程。'},
 {id:'learning',name:'Dunlosky et al. · 2013',title:'Improving Students’ Learning With Effective Learning Techniques',url:'https://doi.org/10.1177/1529100612453266',note:'主动回忆与分散练习的研究综述。本网站的排程是这些原则的应用，尚未经过古琴学习实验验证。'},
 {id:'tor',name:'Juni Lefeuille Yeung · Toronto Guqin Society',title:'Standards of the Guqin',url:'https://torguqin.wordpress.com/guqin/textbook/',note:'可延伸阅读的指法、调弦及打谱教材；本网站没有复制其曲谱或录音。'}
];
export const techniques = [
 ['gou','勾','gōu','k','中指','向内','Middle finger · inward'],
 ['ti','剔','tī','i','中指','向外','Middle finger · outward'],
 ['mo','抹','mǒ','j','食指','向内','Index finger · inward'],
 ['tiao','挑','tiǎo','u','食指','向外','Index finger · outward'],
 ['tuo','托','tuō','h','大指','向外','Thumb · outward'],
 ['pi','擘','bò / pī','n','大指','向内','Thumb · inward'],
 ['da','打','dǎ','l','名指','向内','Ring finger · inward'],
 ['zhai','摘','zhāi','o','名指','向外','Ring finger · outward']
].map(([id,name,pinyin,code,finger,direction,en])=>({id,name,pinyin,code,finger,direction,en,category:'右手',source:'hkm',definition:`右手${finger}${direction}弹弦。`,detail:id==='pi'?'有的谱本写作「劈」。擘的读音、用字会随教材而异，请沿用老师的称呼。':`与${({gou:'剔',ti:'勾',mo:'挑',tiao:'抹',tuo:'擘',da:'摘',zhai:'打'})[id]}成对辨认：同一手指，不同方向。`}));
export const terms=[...techniques,
 {id:'ming',name:'名',pinyin:'míng',code:'s',category:'左手',definition:'左手无名指。',detail:'谱中的「名」是手指名，不是音名。与「大、食、中」一起辨认。',en:'Left ring finger',source:'font'},
 {id:'da-left',name:'大',pinyin:'dà',code:'v',category:'左手',definition:'左手大指。',detail:'先确认左手手指，再读它附近的徽位数字。',en:'Left thumb',source:'font'},
 {id:'zhong',name:'中',pinyin:'zhōng',code:'d',category:'左手',definition:'左手中指。',detail:'不要和右手的「勾」混淆；两者都可能用中指，但分属左右手。',en:'Left middle finger',source:'font'},
 {id:'shi',name:'食',pinyin:'shí',code:'f',category:'左手',definition:'左手食指。',detail:'按弦手指应依谱本及老师指导。',en:'Left index finger',source:'font'},
 {id:'san',name:'散',pinyin:'sǎn',code:'0',category:'音色',definition:'散音：左手不按弦，右手弹空弦。',detail:'「散」不是第零徽，而是空弦的提示。',en:'Open string',source:'font'},
 {id:'fan',name:'泛音',pinyin:'fàn yīn',code:':泛起',category:'音色',definition:'左手在泛音节点轻触弦，配合右手弹弦。',detail:'「泛起」开始泛音段；「泛止」结束。段落标记需要结合后续谱字一起读。',en:'Harmonic',source:'font'},
 {id:'an',name:'按音',pinyin:'àn yīn',code:'s9k5',category:'音色',definition:'左手按弦取音，右手弹弦。',detail:'普通按音谱字通常直接给出左手指法和徽位，不必另写「按」字。',en:'Stopped tone',source:'notes'},
 {id:'yin',name:'吟',pinyin:'yín',code:':吟',category:'走手',definition:'按弦后较小幅度的往复运动。',detail:'节奏、幅度和次数应依谱本与老师示范，不由一个字统一规定。',en:'Narrower oscillation',source:'hkm'},
 {id:'nao',name:'猱',pinyin:'náo',code:':猱',category:'走手',definition:'通常较大幅度、带节奏的往复运动。',detail:'与吟对比记忆；不同流派的具体奏法存在差异。',en:'Broader rhythmic oscillation',source:'hkm'},
 {id:'chuo',name:'绰',pinyin:'chuò',code:'s9/k5',category:'走手',definition:'由较低音滑向目标音。',detail:'也写作「綽」。这是上滑音，不是把手抬离琴弦。',en:'Approach from below',source:'hkm'},
 {id:'zhu',name:'注',pinyin:'zhù',code:'s9\\k5',category:'走手',definition:'由较高音滑向目标音。',detail:'与绰相对，表示下滑音。',en:'Approach from above',source:'hkm'},
 {id:'shang',name:'上',pinyin:'shàng',code:':上七',category:'走手',definition:'按弦移向较高的音，通常向岳山一侧移动。',detail:'上七：移动至七徽。并非另弹一根「七弦」。',en:'Slide up to the indicated position',source:'silk'},
 {id:'xia',name:'下',pinyin:'xià',code:':下九',category:'走手',definition:'按弦移向较低的音，通常向龙龈一侧移动。',detail:'下九：移动至九徽。结合前一个谱字判断弦和手指。',en:'Slide down to the indicated position',source:'silk'}
];
export const concepts={structure:'谱字结构',string:'弦序',hui:'徽位',left:'左手指法',direction:'弹弦方向',mode:'散・按・泛',context:'前后文',...Object.fromEntries(techniques.map(t=>[t.id,`${t.name} · 右手`])),...Object.fromEntries(terms.filter(t=>t.category==='走手').map(t=>[t.id,`${t.name} · 走手`]))};
export const numerals=['〇','一','二','三','四','五','六','七','八','九','十','十一','十二','十三'];
export const fingers={s:'名指',v:'大指',d:'中指',f:'食指'};
export const examples=[
 {id:'ming9gou5',code:'s9k5',left:'s',hui:9,tech:'gou',string:5,mode:'按音',text:'名九勾五'},
 {id:'san-gou3',code:'0k3',left:null,hui:null,tech:'gou',string:3,mode:'散音',text:'散勾三'},
 {id:'san-tiao7',code:'0u7',left:null,hui:null,tech:'tiao',string:7,mode:'散音',text:'散挑七'},
 {id:'da7tiao6',code:'v7u6',left:'v',hui:7,tech:'tiao',string:6,mode:'按音',text:'大七挑六'},
 {id:'ming9mo4',code:'s9j4',left:'s',hui:9,tech:'mo',string:4,mode:'按音',text:'名九抹四'},
 {id:'da7ti5',code:'v7i5',left:'v',hui:7,tech:'ti',string:5,mode:'按音',text:'大七剔五'},
 {id:'zhong8gou4',code:'d8k4',left:'d',hui:8,tech:'gou',string:4,mode:'按音',text:'中八勾四'},
 {id:'ming7tuo7',code:'s7h7',left:'s',hui:7,tech:'tuo',string:7,mode:'按音',text:'名七托七'},
 {id:'san-pi6',code:'0n6',left:null,hui:null,tech:'pi',string:6,mode:'散音',text:'散擘六'},
 {id:'san-da2',code:'0l2',left:null,hui:null,tech:'da',string:2,mode:'散音',text:'散打二'},
 {id:'san-zhai1',code:'0o1',left:null,hui:null,tech:'zhai',string:1,mode:'散音',text:'散摘一'},
 {id:'ming76gou6',code:'s7.6k6',left:'s',hui:7.6,tech:'gou',string:6,mode:'按音',text:'名七徽六分勾六'},
 {id:'da85tiao5',code:'v8.5u5',left:'v',hui:8.5,tech:'tiao',string:5,mode:'按音',text:'大八徽半挑五'},
 {id:'fan7gou5',code:'fys7k5',left:'s',hui:7,tech:'gou',string:5,mode:'泛音',text:'泛音名七勾五'},
 {id:'fan9tiao6',code:'fys9u6',left:'s',hui:9,tech:'tiao',string:6,mode:'泛音',text:'泛音名九挑六'}
];
export const describe=e=>`${e.mode==='散音'?'左手不按弦':`左手${fingers[e.left]}${e.mode==='泛音'?'轻触':'按'}${e.hui}徽处`}，右手${techniques.find(t=>t.id===e.tech).name}${numerals[e.string]}弦。`;
export const lessons=[
 {id:'structure',number:'01',title:'一字之中，两手之间',subtitle:'从完整谱字看懂四个基本信息',concepts:['structure','string','left','hui'],example:'ming9gou5',time:'4 分钟',source:['notes','font'],steps:[
 ['先读结构，不急着认音','常见按音谱字把左手手指、徽位、右手指法和弦序组合在一起。减字谱首先告诉你「怎样弹」。'],
 ['拆开这个谱字','上部的「名、九」指左手名指与九徽；下部「勾、五」指右手勾五弦。不同组合的排法会改变，不能只凭数字大小猜它的作用。'],
 ['把谱字说成一句动作','左手名指按五弦九徽处，右手中指向内勾弦。先在心里说出来，再对照老师的示范。']
 ]},
 {id:'right',number:'02',title:'八法，成对记',subtitle:'同一手指，辨清内外两个方向',concepts:['gou','ti','mo','tiao','tuo','pi','da','zhai','direction'],example:'san-gou3',time:'5 分钟',source:['hkm'],steps:[
 ['先认手指','勾剔用中指，抹挑用食指，擘托用大指，打摘用名指。练习时先判断是哪根手指，再辨方向。'],
 ['再比较一进一出','本课以朝自己为「内」、离开自己为「外」。向内：擘、抹、勾、打；向外：托、挑、剔、摘。'],
 ['把全字和减字形连起来','谱中常只留汉字的一部分。对照字形时保留全字名称；遇到擘／劈等异写，用你的教材习惯。']
 ]},
 {id:'position',number:'03',title:'读数字，也读位置',subtitle:'分清第几弦与几徽几分',concepts:['string','hui','left'],example:'ming76gou6',time:'4 分钟',source:['font','notes'],steps:[
 ['七弦不是七徽','弦序只有一至七；徽位沿琴弦长度标示。数字依附哪个部件，比它单独长什么样更重要。'],
 ['「七六」可能是一处位置','本课按现代徽分习惯：七徽六分记作 7.6。示例是名指在七徽六分，右手勾六弦；两个「六」的作用不同。'],
 ['半与分','八徽半在本课记为 8.5。徽间分位不是十二平均律的半音编号；本网站的琴面图只帮助定位，不代替听音校准。古谱位置写法应另查该谱说明。']
 ]},
 {id:'tone',number:'04',title:'同一根弦，三种取音',subtitle:'读出散音、按音与泛音',concepts:['mode'],example:'fan7gou5',time:'3 分钟',source:['notes','font'],steps:[
 ['散：让弦自由发声','见「散」，左手不按弦。它不是一个徽位数字。'],
 ['按与泛：压力不同','按音需要按弦；泛音在节点轻触。谱上的泛音标记会改变取音方式，手指与位置仍要一起看。'],
 ['从一个字读到一个段落','「泛起」至「泛止」之间可连续按泛音理解。不能假定每个泛音前都重复标记；请连着上下文读。']
 ]},
 {id:'movement',number:'05',title:'声未尽，手仍行',subtitle:'认识吟、猱、绰、注与走手',concepts:['yin','nao','chuo','zhu','shang','xia'],example:'da7tiao6',time:'5 分钟',source:['hkm','silk'],steps:[
 ['吟与猱：比较着记','吟通常较小；猱通常幅度较大且带节奏。这里只练识字与含义，具体动作沿用老师的要求。'],
 ['绰与注：向目标音靠近','绰是上滑，注是下滑；比较它们接近目标音的方向。不要把音高方向和页面上的上下方混为一谈。'],
 ['上、下：接住前面的音','走手字通常要结合前面的弦、手指和位置。上七、下九中的七和九是目标徽位，不是要换的弦。']
 ]},
 {id:'context',number:'06',title:'从一字，到一句',subtitle:'保留前文信息，逐步撤去提示',concepts:['context','mode','hui'],example:'ming9gou5',time:'5 分钟',source:['silk','font'],steps:[
 ['别在每个字重新开始','遇到后续走手或段落音色标记，带着刚读过的信息继续。读谱的单位逐渐从「字」扩大到「句」。'],
 ['先拆解，再遮住说明','在短句练习里，先逐字查看释义，再切换到自测模式。读出动作后，打开解释核对，避免只凭熟悉感。'],
 ['谱字不等于完整的演奏','这些是原创读谱练习，不是某首曲子的传谱。未写出的时值和句法应结合老师、版本或录音学习；网站不自动添加所谓唯一正确的节奏。']
 ]}
];
export const phrases=[
 {id:'open',title:'散音 · 指法交替',subtitle:'把注意力放在右手与弦序',source:['hkm','font'],notes:[{example:'san-gou3'},{example:'san-tiao7'},{example:'san-pi6'},{example:'san-da2'}]},
 {id:'slide',title:'按音 · 接着前文读',subtitle:'走手字沿用前一个谱字的弦与手指',source:['silk','font'],notes:[{example:'ming9gou5'},{code:':上七',label:'上七',explanation:'左手名指仍按五弦，移动至七徽；这个走手字没有要求右手再弹。',hui:7,string:5},{code:':吟',label:'吟',explanation:'在刚到达的位置做吟；具体幅度、节奏依老师示范。',hui:7,string:5},{code:':下九',label:'下九',explanation:'仍在五弦，以左手名指移至九徽。',hui:9,string:5}]},
 {id:'harmonic',title:'泛音 · 段落的边界',subtitle:'标记的作用不只限于旁边一个字',source:['font'],notes:[{code:':泛起',label:'泛起',explanation:'从这里开始，后续谱字按泛音段理解。'},{...examples.find(e=>e.id==='fan7gou5'),code:'s7k5',explanation:'泛起仍有效：名指轻触五弦七徽，右手勾弦。'},{...examples.find(e=>e.id==='fan9tiao6'),code:'s9u6',explanation:'仍在泛音段：名指轻触六弦九徽，右手挑弦。'},{code:':泛止',label:'泛止',explanation:'泛音段到此结束。下一字应按其具体标记解读。'}]}
];
const qs=[];
const add=(id,concept,lesson,prompt,answer,options,explanation,extra={})=>qs.push({id,concept,lesson,prompt,answer,options:[...new Set([answer,...options])],explanation,...extra});
for(const e of examples){
 add(`${e.id}-string`,'string',e.hui>7&&e.hui%1?'position':'structure','这个谱字要弹第几弦？',`${e.string} 弦`,[1,3,5,7].filter(n=>n!==e.string).slice(0,3).map(n=>`${n} 弦`),`弦序与右手指法一起读：${techniques.find(t=>t.id===e.tech).name}${numerals[e.string]}弦。`,{example:e.id});
 if(e.left){add(`${e.id}-left`,'left','structure','左手用哪根手指？',fingers[e.left],Object.values(fingers),`左手部件是「${fingers[e.left].replace('指','')}」，对应${fingers[e.left]}。`,{example:e.id});add(`${e.id}-hui`,'hui','position','左手的位置是？',`${e.hui} 徽`,[7,7.6,8.5,9].filter(n=>n!==e.hui).slice(0,3).map(n=>`${n} 徽`),`这个数字组合指 ${e.hui} 徽${e.hui%1?'，不是两个弦序':''}。`,{example:e.id});}
 add(`${e.id}-mode`,'mode','tone','这个完整谱字表示哪种取音？',e.mode,['散音','按音','泛音'],e.mode==='散音'?'散表示空弦，左手不按弦。':e.mode==='泛音'?'这里有泛音标记：左手轻触，而不是按实。':'本例没有泛音段落标记；左手按所示徽位取音。',{example:e.id});
}
for(const t of techniques){
 add(`${t.id}-finger`,t.id,'right','这个指法用右手哪根手指？',t.finger,Object.values(fingers),`${t.name}：${t.finger}${t.direction}。`,{code:`0${t.code}5`,hint:`先把减字形还原为「${t.name}」。`});
 add(`${t.id}-direction`,'direction','right',`「${t.name}」的弹弦方向是？`,t.direction,['向内','向外'],`${t.name}用${t.finger}${t.direction}；内指向自己，外指离开自己。`,{code:`0${t.code}5`,hint:'先想它与哪个指法成对，再想那一对的方向。'});
}
for(const t of terms.filter(t=>t.category==='走手'))add(`${t.id}-meaning`,t.id,'movement','谱字中的走手指示是什么意思？',t.definition,terms.filter(x=>x.category==='走手'&&x.id!==t.id).slice(0,3).map(x=>x.definition),`${t.name}（${t.pinyin}）：${t.definition} ${t.detail}`,{code:t.code,hint:`这个部件的全字是「${t.name}」。`});
add('structure-action','structure','structure','减字谱主要直接告诉你什么？','双手的演奏动作',['每个音的固定时值','唯一的演奏速度','歌词的读音'],'减字谱用动作、弦序和位置记录音乐；节奏常需结合传授与版本。');
add('context-slide','context','context','「名九勾五」之后的「上七」，七指什么？','目标位置：七徽',['改弹七弦','连弹七次','右手第七种指法'],'沿用前文的五弦与名指，左手上移至七徽。',{codes:['s9k5',':上七']});
add('context-harmonic','context','context','泛起之后、泛止之前，这个没有再写「泛」的谱字怎样读？','仍按泛音读',['一定是按音','一定是散音','没有办法判断'],'段落标记仍在生效。要带着前文一起读。',{codes:[':泛起','s7k5','s9u6']});
add('context-rhythm','context','context','只有这些谱字，能否确定唯一的节奏？','不能，还需版本或示范',['能，每字恰好一拍','能，所有音等长','能，按字的大小判断'],'读出动作不等于还原唯一时值。学习老师所授版本的句法与节奏。',{codes:['0k3','0u7']});
export const questions=qs;
export const questionMap=Object.fromEntries(qs.map(q=>[q.id,q]));
