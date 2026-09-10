const GAS_URL="https://script.google.com/macros/s/AKfycbwkiblBVM9ZN8GMEwUqD1UaleHU79vaV43zPSfP0wFp2f4lkM82chFg7BJeAsN6QrBR/exec";

function o(label,scores={},chars={}){return{label,scores,chars}}
const quiz=[
{tag:"GAME STYLE",q:"試合に出るなら、どっちがワクワクする？",options:[
o("1対1。自分の力で勝負したい！",{single:3,compete:1,stamina:1}),
o("ペアと力を合わせて勝ちたい！",{doubles:3,tactics:1,enjoy:1})]},
{tag:"ATTACK CHOICE",q:"相手から少し浅いボールが来た！どうする？",options:[
o("強いストロークを打ち込む",{stroke:2,attack:2,power:2},{stroker:2}),
o("前に入り、ボレーで仕留めにいく",{net:2,attack:2,speed:2},{volleyer:2}),
o("コースを狙って相手を動かす",{control:2,tactics:2,counter:1},{stroker:1}),
o("チャンスを見て頭上から一気に決めたい",{attack:2,power:2,speed:1},{smash:2})]},
{tag:"FAVORITE POINT",q:"自分で決めたら一番気持ちいいのは？",options:[
o("強烈なストロークがコートに突き刺さる！",{power:2,stroke:2},{stroker:3}),
o("サーブで相手を崩してポイント！",{power:2,control:1,attack:1},{server:3}),
o("素早く反応してボレーで決める！",{speed:2,net:2,control:1},{volleyer:3}),
o("高いボールを豪快にスマッシュ！",{power:2,attack:2},{smash:3})]},
{tag:"PRACTICE",q:"1つだけ重点的に練習するなら？",options:[
o("フォア・バックのストローク",{stroke:2,control:1},{stroker:3}),
o("サーブの威力とコース",{power:1,control:2},{server:3}),
o("ボレーとネットプレー",{net:2,speed:1},{volleyer:3}),
o("スマッシュとチャンスボール",{attack:2,power:1},{smash:3})]},
{tag:"UNDER PRESSURE",q:"相手がどんどん攻めてきたら？",options:[
o("負けずに強いボールで攻め返す",{attack:3,power:2},{stroker:1}),
o("走って拾ってチャンスまで粘る",{counter:3,stamina:3,speed:1}),
o("コースを変えて相手の勢いを利用する",{counter:2,control:2,tactics:2}),
o("タイミングを見て前へ出て流れを変える",{net:2,attack:1,speed:2,tactics:1},{volleyer:1})]},
{tag:"SERVE",q:"あなたが「いいサーブ！」と思うのは？",options:[
o("とにかく速くて威力がある",{power:3,attack:1},{server:2}),
o("狙ったコースへ正確に入る",{control:3,tactics:1},{server:2}),
o("サーブの次のショットまで考えられている",{tactics:3,control:1},{server:1}),
o("サーブそのものより、その後のラリーで勝負したい",{stroke:2,stamina:1},{stroker:1})]},
{tag:"DOUBLES ROLE",q:"ダブルスでやってみたい役割は？",options:[
o("後ろからストロークでゲームを作る",{stroke:2,control:1},{stroker:2}),
o("前衛で積極的にポーチする",{net:2,speed:2,attack:1},{volleyer:2}),
o("サーブから相手を崩して主導権を取る",{power:1,tactics:1,attack:1},{server:2}),
o("ロブを追ってきた相手の頭上から決める",{power:1,speed:1,attack:2},{smash:2})]},
{tag:"BIG POINT",q:"大事なポイント。あなたならどう戦う？",options:[
o("一番得意なショットで勝負する！",{attack:2,compete:2,power:1}),
o("ミスを減らして、相手にもう1球打たせる",{counter:2,control:2,stamina:1}),
o("相手の位置を見て、一番嫌なところを狙う",{tactics:3,control:2,compete:1}),
o("思い切って前へ出てプレッシャーをかける",{net:2,attack:2,speed:1})]},
{tag:"IDEAL ABILITY",q:"あなたが身につけたい理想の能力は？",options:[
o("相手を押し込むパワー",{power:3}),
o("どんなボールにも反応できるスピード",{speed:3}),
o("最後までプレーの質を落とさないスタミナ",{stamina:3}),
o("狙ったところへ打てるコントロール",{control:3})]},
{tag:"MATCH THINKING",q:"試合中、あなたが一番考えているのは？",options:[
o("どうやって自分からポイントを取るか",{attack:2,power:1,compete:1}),
o("相手は次にどこへ打ってくるか",{tactics:3,speed:1,counter:1}),
o("どこへ打てば相手が嫌がるか",{tactics:3,control:2}),
o("どうすればもっと楽しくプレーできるか",{enjoy:3})]}
];

const characters={
stroker:{name:"ストローカー",image:"stroker.png",catch:"ラリーの主導権は渡さない！",desc:"ベースラインからストロークを軸に、自分のリズムでポイントを組み立てるタイプ。打ち合いの中で相手を動かし、チャンスを作るプレーと相性があります。",strength:"フォアハンド／バックハンド／クロスラリー／ベースラインからの展開",growth:"深さとコースの使い分け／短いボールへの対応／攻守の切り替え",practice:"クロスラリー\n深さを狙うストローク\nストレート・クロスの打ち分け",training:"サイドステップ\n下半身・体幹\n持久系トレーニング",tip:"ラリーの安定感に『深さ』と『コース』が加わると、さらに自分から展開を作れるようになります。"},
server:{name:"サーバー",image:"server.png",catch:"最初の一球から、ゲームを支配する。",desc:"サーブを攻撃のスタートとして考え、自分から主導権を握りたいタイプ。威力だけでなく、コースや次の1球まで組み立てられると強みがさらに生きます。",strength:"サーブ／コースの打ち分け／サーブからの展開",growth:"セカンドサーブの安定／コース／サーブ後の1球目",practice:"ワイド・センターの打ち分け\n1st・2ndサーブの使い分け\nサーブ＋次球",training:"体幹回旋\n肩甲骨まわり\n下半身との連動",tip:"サーブは速さだけでなく『次の1球を有利にする』視点を持つと、大きな武器になります。"},
volleyer:{name:"ボレーヤー",image:"volleyer.png",catch:"一瞬のチャンスを、逃さない。",desc:"前へ出て相手から時間を奪い、テンポの速い展開を好むタイプ。素早い反応とポジショニングを磨くほどネットで存在感を発揮します。",strength:"ボレー／ポーチ／ネットプレー／反応",growth:"前へ出るタイミング／ファーストボレー／ロブへの対応",practice:"ボレーのコース打ち分け\nポーチ判断\nアプローチ→ファーストボレー",training:"スプリットステップ\n反応トレーニング\n前後左右のアジリティ",tip:"前へ出る勇気が武器。『いつ出るか』を磨けば、相手にさらにプレッシャーをかけられます。"},
smash:{name:"スマッシュ",image:"smash.png",catch:"チャンスボールは、決め切る！",desc:"チャンスを見つけると積極的に仕留めにいく、決定力志向のタイプ。高い打点での攻撃と、落下点へ素早く入る動きが強みにつながります。",strength:"スマッシュ／チャンスボール／高い打点からの攻撃",growth:"落下点への入り方／後方へのフットワーク／コースの打ち分け",practice:"ロブからのスマッシュ\n連続スマッシュ\nスマッシュのコース打ち分け",training:"後方へのフットワーク\n反応トレーニング\n体幹・下半身",tip:"強く打つだけでなく、早く落下点へ入って余裕を作ると、スマッシュの決定力がさらに高まります。"}
};

const A=["power","speed","stamina","control","tactics"], AL={power:"POWER",speed:"SPEED",stamina:"STAMINA",control:"CONTROL",tactics:"TACTICS"},
AJ={power:"パワー",speed:"スピード",stamina:"スタミナ",control:"コントロール",tactics:"戦術力"},
prefix={power:"豪腕の",speed:"電光石火の",stamina:"不屈の",control:"精密な",tactics:"頭脳派"};
let current=0,finalType=null,score={},charScore={},answerLog=[],$=id=>document.getElementById(id);

function reset(){
 current=0;answerLog=[];finalType=null;
 score={single:0,doubles:0,stroke:0,net:0,attack:0,counter:0,compete:0,enjoy:0,power:0,speed:0,stamina:0,control:0,tactics:0};
 charScore={stroker:0,server:0,volleyer:0,smash:0};
} reset();

$("startBtn").onclick=()=>{$("hero").style.display="none";$("quizSection").classList.remove("hidden");renderQ();scrollTo(0,0)};
function renderQ(){let x=quiz[current];$("questionNo").textContent=current+1;$("progressBar").style.width=((current+1)/10*100)+"%";$("questionTag").textContent=x.tag;$("questionText").textContent=x.q;$("options").innerHTML="";x.options.forEach(op=>{let b=document.createElement("button");b.className="option";b.type="button";b.textContent=op.label;b.onclick=()=>choose(op);$("options").appendChild(b)})}
function choose(op){for(const[k,v]of Object.entries(op.scores))score[k]+=v;for(const[k,v]of Object.entries(op.chars))charScore[k]+=v;answerLog.push(op.label);current++;current<10?renderQ():showResult()}
function win(obj,order=[]){let m=Math.max(...Object.values(obj)),t=Object.keys(obj).filter(k=>obj[k]===m);if(t.length===1)return t[0];for(const k of order)if(t.includes(k))return k;return t[0]}
function ability(){let vals=A.map(k=>score[k]),mn=Math.min(...vals),mx=Math.max(...vals),r={};A.forEach(k=>r[k]=mx===mn?70:Math.round(52+(score[k]-mn)/(mx-mn)*43));return r}
function axis(a,b){let t=score[a]+score[b];return t?Math.round(score[b]/t*100):50}
function tend(a,b,l,r){let p=axis(a,b);return p>=58?r:p<=42?l:`${l}×${r}`}
function dna(){
 let badges=[tend("single","doubles","シングルス派","ダブルス派"),tend("stroke","net","ストローク派","ネット派"),tend("attack","counter","アタック派","カウンター派"),tend("compete","enjoy","競技・上達派","エンジョイ派")];
 $("dnaBadges").innerHTML=badges.map(v=>`<span class="badge">${v}</span>`).join("");
 let axes=[["single","doubles","シングルス","ダブルス"],["stroke","net","ストローク","ネット"],["attack","counter","アタック","カウンター"],["compete","enjoy","競技・上達","エンジョイ"]];
 $("dnaRows").innerHTML=axes.map(([a,b,l,r])=>`<div class="dna-row"><div class="dna-side">${l}</div><div class="dna-track"><span class="dna-marker" style="left:${axis(a,b)}%"></span></div><div class="dna-side right">${r}</div></div>`).join("")
}
function renderAbility(ab){$("abilityBars").innerHTML=A.map(k=>`<div class="ability-row"><div class="ability-label">${AL[k]}</div><div class="ability-track"><div class="ability-fill" style="width:${ab[k]}%"></div></div><div class="ability-num">${ab[k]}</div></div>`).join("");radar(ab)}
function radar(ab){let c=$("radarChart"),ctx=c.getContext("2d"),cx=160,cy=160,R=104,n=5,ang=A.map((_,i)=>-Math.PI/2+i*2*Math.PI/n),pt=(r,i)=>[cx+Math.cos(ang[i])*r,cy+Math.sin(ang[i])*r];ctx.clearRect(0,0,320,320);ctx.strokeStyle="#d5e2ec";[.25,.5,.75,1].forEach(f=>{ctx.beginPath();A.forEach((_,i)=>{let[x,y]=pt(R*f,i);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();ctx.stroke()});A.forEach((_,i)=>{let[x,y]=pt(R,i);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.stroke()});ctx.beginPath();A.forEach((k,i)=>{let[x,y]=pt(R*ab[k]/100,i);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();ctx.fillStyle="rgba(40,120,183,.23)";ctx.fill();ctx.strokeStyle="#2878b7";ctx.lineWidth=3;ctx.stroke();ctx.fillStyle="#14365c";ctx.font="700 11px sans-serif";ctx.textAlign="center";A.forEach((k,i)=>{let[x,y]=pt(R+28,i);ctx.fillText(AL[k],x,y)})}
function showResult(){finalType=win(charScore,["stroker","server","volleyer","smash"]);let r=characters[finalType],ab=ability(),top=win(Object.fromEntries(A.map(k=>[k,ab[k]])),A),title=prefix[top]+r.name;$("quizSection").classList.add("hidden");$("resultSection").classList.remove("hidden");$("resultCharacter").src=r.image;$("resultTitle").textContent=title;$("resultCatch").textContent=r.catch;$("resultDescription").textContent=r.desc;$("resultStrength").textContent=r.strength;$("resultGrowth").textContent=r.growth;$("resultPractice").textContent=r.practice;$("resultTraining").textContent=r.training;$("coachTip").textContent=r.tip;$("shareTitle").textContent=`私は「${title}」タイプ！`;$("shareSubtitle").textContent=`HORIZONテニスタイプ診断 Ver.3｜${AJ[top]}が特徴`;dna();renderAbility(ab);window.__r={ab,top,title,character:r.name};scrollTo(0,0)}
$("copyBtn").onclick=async()=>{let t=`私は「${window.__r?.title||""}」タイプでした！\nHORIZONテニスタイプ診断 Ver.3`;try{await navigator.clipboard.writeText(t);$("copyBtn").textContent="コピーしました！";setTimeout(()=>$("copyBtn").textContent="診断結果をコピー",1500)}catch(e){alert(t)}};
$("retryBtn").onclick=()=>{reset();$("resultSection").classList.add("hidden");$("quizSection").classList.remove("hidden");renderQ();scrollTo(0,0)};
$("surveyBtn").onclick=()=>{$("resultSection").classList.add("hidden");$("surveySection").classList.remove("hidden");scrollTo(0,0)};
$("surveyForm").onsubmit=e=>{e.preventDefault();let purposes=[...document.querySelectorAll('[name=purpose]:checked')].map(x=>x.value),interests=[...document.querySelectorAll('[name=interest]:checked')].map(x=>x.value),priority=document.querySelector('[name=priority]:checked')?.value||"",referral=document.querySelector('[name=referral]:checked')?.value||"",rr=window.__r||{ab:{}};let payload={version:"3.0",name:$("name").value,result:rr.title||"",character:rr.character||"",topAbility:rr.top||"",power:rr.ab.power||0,speed:rr.ab.speed||0,stamina:rr.ab.stamina||0,control:rr.ab.control||0,tactics:rr.ab.tactics||0,singleScore:score.single,doublesScore:score.doubles,strokeScore:score.stroke,netScore:score.net,attackScore:score.attack,counterScore:score.counter,competeScore:score.compete,enjoyScore:score.enjoy,strokerScore:charScore.stroker,serverScore:charScore.server,volleyerScore:charScore.volleyer,smashScore:charScore.smash,purpose:purposes.join(" / "),interests:interests.join(" / "),priority,referral,comment:$("comment").value};answerLog.forEach((v,i)=>payload["q"+(i+1)]=v);fetch(GAS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});$("surveySection").classList.add("hidden");$("thanksSection").classList.remove("hidden");scrollTo(0,0)};