const quiz = [
  {q:"ラリー中、チャンスボールが来たら？",options:[
    ["思い切って決めにいく","attacker"],["まずミスしないよう確実に返す","counter"],["コースを狙って相手を崩す","allround"],["ポイントを取り切ることを強く意識する","match"],["気持ちよくラリーが続くのも楽しい","enjoy"]]},
  {q:"あなたが一番「気持ちいい！」と感じる瞬間は？",options:[
    ["相手の強打を拾って逆転したとき","counter"],["強烈なショットが決まったとき","attacker"],["仲間とナイスラリーができたとき","enjoy"],["狙い通りの組み立てでポイントを取ったとき","allround"],["大事なポイントを取って試合に勝ったとき","match"]]},
  {q:"自分のテニスをもっと良くするなら？",options:[
    ["試合で勝てる力を身につけたい","match"],["攻守のバランスや戦術を磨きたい","allround"],["無理なく長くテニスを楽しみたい","enjoy"],["ミスを減らして安定感を高めたい","counter"],["サーブや決め球という「武器」が欲しい","attacker"]]},
  {q:"試合でリードされたときは？",options:[
    ["ここから逆転してやろうと燃える","match"],["相手を観察して戦い方を変える","allround"],["スコアを気にしすぎず自分のプレーをする","enjoy"],["とにかく粘って相手のミスを待つ","counter"],["攻めて流れを変えたい","attacker"]]},
  {q:"コーチから言われて一番うれしいのは？",options:[
    ["「プレーの幅が広がったね！」","allround"],["「試合運びがうまくなった！」","match"],["「本当に楽しそうにテニスするね！」","enjoy"],["「今日のショット、すごかった！」","attacker"],["「本当にミスが少なくなった！」","counter"]]}
];

const resultLabels={attacker:"攻撃力",counter:"粘り強さ",allround:"戦術力",match:"勝負魂",enjoy:"エンジョイ"};
const results={
 attacker:{emoji:"🔥",title:"電光石火のアタッカー",subtitle:"攻めるのが大好き！",desc:"チャンスを見つけたら、自分から仕掛けてポイントを取りにいく攻撃派。強いショットや思い切りの良さがあなたの魅力です。",strength:"積極性・決断力・攻撃力",recommend:"サーブ強化／決め球強化／ショット特化の個別レッスン"},
 counter:{emoji:"🛡️",title:"鉄壁のカウンター",subtitle:"粘って、拾って、最後に勝つ！",desc:"簡単にはポイントを渡さず、相手の攻撃を受け止めてチャンスを待つ守備派。長いラリーや接戦になるほど強さを発揮します。",strength:"安定感・粘り強さ・守備力",recommend:"ラリー強化／フットワーク／安定性アップレッスン"},
 allround:{emoji:"🧠",title:"変幻自在のオールラウンダー",subtitle:"状況を見て攻守を切り替える！",desc:"攻める・守るを一つに決めず、相手や状況に合わせてプレーを変えられるバランス型。考えてテニスをするのが得意です。",strength:"観察力・戦術・対応力",recommend:"戦術レッスン／ゲーム形式／弱点別テーマレッスン"},
 match:{emoji:"⚔️",title:"勝負師マッチプレイヤー",subtitle:"試合になるほど燃える！",desc:"ポイントやスコアがつくと集中力が上がる勝負派。プレッシャーのある場面でも、どうすれば勝てるかを考えるのが好きなタイプです。",strength:"勝負強さ・集中力・試合運び",recommend:"ゲーム練習／試合イベント／大会・マッチ練習"},
 enjoy:{emoji:"🎾",title:"コートのムードメーカー",subtitle:"テニスは楽しんだ者勝ち！",desc:"勝敗だけでなく、ラリー・仲間・運動そのものを楽しめるエンジョイ派。楽しいから続けられることが、あなたの最大の強みです。",strength:"ポジティブさ・継続力・コミュニケーション",recommend:"ゲームイベント／ダブルス／ピックルボール／交流企画"}
};

let current=0;
let scores={attacker:0,counter:0,allround:0,match:0,enjoy:0};
let answerLog=[]; let answerTypes=[]; let finalType=null;

const startBtn=document.getElementById("startBtn");
const quizSection=document.getElementById("quizSection");
const resultSection=document.getElementById("resultSection");
const surveySection=document.getElementById("surveySection");
const thanksSection=document.getElementById("thanksSection");
const questionText=document.getElementById("questionText");
const options=document.getElementById("options");
const questionNo=document.getElementById("questionNo");
const progressBar=document.getElementById("progressBar");

startBtn.addEventListener("click",()=>{document.querySelector(".hero").style.display="none";quizSection.classList.remove("hidden");renderQuestion();window.scrollTo({top:0,behavior:"smooth"});});
function renderQuestion(){const item=quiz[current];questionNo.textContent=current+1;progressBar.style.width=((current+1)/quiz.length*100)+"%";questionText.textContent=item.q;options.innerHTML="";item.options.forEach(([label,type])=>{const b=document.createElement("button");b.type="button";b.className="option";b.textContent=label;b.addEventListener("click",()=>choose(label,type));options.appendChild(b);});}
function choose(label,type){scores[type]+=1;answerLog.push(label);answerTypes.push(type);current++;if(current<quiz.length)renderQuestion();else showResult();}
function determineResult(){const maxScore=Math.max(...Object.values(scores));const tied=Object.keys(scores).filter(k=>scores[k]===maxScore);if(tied.length===1)return tied[0];for(const t of answerTypes){if(tied.includes(t))return t;}return tied[0];}
function renderScoreBars(){const container=document.getElementById("scoreBars");container.innerHTML="";const max=quiz.length;Object.keys(scores).forEach(key=>{const row=document.createElement("div");row.className="score-row";const label=document.createElement("div");label.className="score-label";label.textContent=resultLabels[key];const track=document.createElement("div");track.className="score-track";const fill=document.createElement("div");fill.className="score-fill";fill.style.width=(scores[key]/max*100)+"%";const num=document.createElement("div");num.className="score-num";num.textContent=scores[key]+"/"+max;track.appendChild(fill);row.appendChild(label);row.appendChild(track);row.appendChild(num);container.appendChild(row);});}
function showResult(){finalType=determineResult();const r=results[finalType];quizSection.classList.add("hidden");resultSection.classList.remove("hidden");document.getElementById("resultVisual").textContent=r.emoji;document.getElementById("resultTitle").textContent=r.title;document.getElementById("resultDescription").textContent=r.subtitle+"\n\n"+r.desc;document.getElementById("resultStrength").textContent=r.strength;document.getElementById("resultRecommend").textContent=r.recommend;renderScoreBars();window.scrollTo({top:0,behavior:"smooth"});}
document.getElementById("surveyBtn").addEventListener("click",()=>{resultSection.classList.add("hidden");surveySection.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});});
document.getElementById("surveyForm").addEventListener("submit",(e)=>{e.preventDefault();const purposes=[...document.querySelectorAll('input[name="purpose"]:checked')].map(x=>x.value);const interests=[...document.querySelectorAll('input[name="interest"]:checked')].map(x=>x.value);const priority=document.querySelector('input[name="priority"]:checked')?.value||"";const referral=document.querySelector('input[name="referral"]:checked')?.value||"";const payload={name:document.getElementById("name").value,result:results[finalType].title,resultCode:finalType,attackerScore:scores.attacker,counterScore:scores.counter,allroundScore:scores.allround,matchScore:scores.match,enjoyScore:scores.enjoy,q1:answerLog[0]||"",q2:answerLog[1]||"",q3:answerLog[2]||"",q4:answerLog[3]||"",q5:answerLog[4]||"",purpose:purposes.join(" / "),interests:interests.join(" / "),priority,referral,comment:document.getElementById("comment").value};fetch("https://script.google.com/macros/s/AKfycbwkiblBVM9ZN8GMEwUqD1UaleHU79vaV43zPSfP0wFp2f4lkM82chFg7BJeAsN6QrBR/exec",{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});surveySection.classList.add("hidden");thanksSection.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});});
