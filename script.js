const quiz = [
  {
    q:"試合中、一番テンションが上がるのは？",
    options:[
      ["強烈なショットで一気にポイントを取ったとき","attacker"],
      ["相手の動きを読んで、狙い通りにポイントを取ったとき","strategist"],
      ["どんなボールも拾って、粘り勝ちしたとき","fighter"],
      ["ダブルスでパートナーと息の合ったプレーができたとき","team"],
      ["勝ち負けより、気持ちよくラリーが続いたとき","enjoy"]
    ]
  },
  {
    q:"あなたのプレーに一番近いのは？",
    options:[
      ["相手を見ながらコースや組み立てを考える","strategist"],
      ["自分のペースで楽しくプレーするのが一番！","enjoy"],
      ["チャンスがあれば積極的に攻める！","attacker"],
      ["周りと声を掛け合いながらプレーするのが好き","team"],
      ["とにかく最後まで諦めずにボールを追う","fighter"]
    ]
  },
  {
    q:"コーチから褒められるなら、どれが一番うれしい？",
    options:[
      ["「よくそこまで拾った！」","fighter"],
      ["「ナイスショット！すごいボール！」","attacker"],
      ["「本当に楽しそうにテニスするね！」","enjoy"],
      ["「今の組み立て、上手かった！」","strategist"],
      ["「周りをよく見てプレーできてる！」","team"]
    ]
  },
  {
    q:"もし1つだけ能力を伸ばせるなら？",
    options:[
      ["ダブルスで最高の連携ができる力","team"],
      ["相手を打ち抜くショット力","attacker"],
      ["いつまでも楽しくテニスを続けられる力","enjoy"],
      ["何時間でも動けるスタミナと守備力","fighter"],
      ["相手の弱点を見抜くゲームメイク力","strategist"]
    ]
  },
  {
    q:"あなたにとって「最高のテニスの一日」は？",
    options:[
      ["仲間と盛り上がりながらプレーできた日","team"],
      ["自分の狙い通りに試合を組み立てられた日","strategist"],
      ["たくさん打って、笑って、いい汗をかけた日","enjoy"],
      ["接戦を最後まで諦めずに戦えた日","fighter"],
      ["自分のショットが絶好調だった日","attacker"]
    ]
  }
];

const results = {
  attacker:{
    emoji:"🔥",
    title:"攻めるのが大好き！アタッカータイプ",
    desc:"チャンスを見つけたら積極的に攻めたいあなた。思い切ったショットやナイスプレーが決まった瞬間が、テニスの醍醐味！",
    strength:"積極性・決断力・攻撃力",
    recommend:"ショット強化／サーブ強化／個別レッスン"
  },
  strategist:{
    emoji:"🧠",
    title:"コート上の司令塔！ストラテジストタイプ",
    desc:"相手を観察しながら「どうポイントを取るか」を考えるのが得意な頭脳派。ゲームを組み立てる面白さを楽しめるタイプです。",
    strength:"観察力・戦術・ゲームメイク",
    recommend:"ゲーム形式／戦術レッスン／試合分析"
  },
  fighter:{
    emoji:"🛡️",
    title:"最後まで諦めない！ファイタータイプ",
    desc:"簡単にはポイントを渡さない粘り強さがあなたの武器。長いラリーや接戦になるほど力を発揮するタイプです。",
    strength:"粘り強さ・集中力・運動量",
    recommend:"ラリー強化／フットワーク／試合・ゲームイベント"
  },
  team:{
    emoji:"🤝",
    title:"仲間と楽しむほど強くなる！チームプレイヤータイプ",
    desc:"仲間との声掛けや一体感もテニスの楽しみのひとつ。周囲を盛り上げながら楽しめるタイプです。",
    strength:"協調性・コミュニケーション・チームワーク",
    recommend:"ダブルス／チーム戦／肉肉カップ／交流イベント"
  },
  enjoy:{
    emoji:"☀️",
    title:"テニスは楽しんだ者勝ち！エンジョイプレイヤータイプ",
    desc:"勝敗や上達も大切だけど、一番大事なのは「今日も楽しかった！」と思えること。自分らしくテニスを楽しめるタイプです。",
    strength:"ポジティブさ・継続力・楽しむ力",
    recommend:"ゲームイベント／ピックルボール／交流企画"
  }
};

let current=0;
let scores={attacker:0,strategist:0,fighter:0,team:0,enjoy:0};
let answerLog=[];
let finalType=null;

const startBtn=document.getElementById("startBtn");
const quizSection=document.getElementById("quizSection");
const resultSection=document.getElementById("resultSection");
const surveySection=document.getElementById("surveySection");
const thanksSection=document.getElementById("thanksSection");
const questionText=document.getElementById("questionText");
const options=document.getElementById("options");
const questionNo=document.getElementById("questionNo");
const progressBar=document.getElementById("progressBar");

startBtn.addEventListener("click",()=>{
  document.querySelector(".hero").style.display="none";
  quizSection.classList.remove("hidden");
  renderQuestion();
  window.scrollTo({top:0,behavior:"smooth"});
});

function renderQuestion(){
  const item=quiz[current];
  questionNo.textContent=current+1;
  progressBar.style.width=((current+1)/quiz.length*100)+"%";
  questionText.textContent=item.q;
  options.innerHTML="";
  item.options.forEach(([label,type])=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="option";
    b.textContent=label;
    b.addEventListener("click",()=>choose(label,type));
    options.appendChild(b);
  });
}

function choose(label,type){
  scores[type]+=1;
  answerLog.push(label);
  current++;
  if(current<quiz.length){renderQuestion();}
  else{showResult();}
}

function showResult(){
  finalType=Object.keys(scores).sort((a,b)=>scores[b]-scores[a])[0];
  const r=results[finalType];
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  document.getElementById("resultVisual").textContent=r.emoji;
  document.getElementById("resultTitle").textContent=r.title;
  document.getElementById("resultDescription").textContent=r.desc;
  document.getElementById("resultStrength").textContent=r.strength;
  document.getElementById("resultRecommend").textContent=r.recommend;
  window.scrollTo({top:0,behavior:"smooth"});
}

document.getElementById("surveyBtn").addEventListener("click",()=>{
  resultSection.classList.add("hidden");
  surveySection.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});

document.getElementById("surveyForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  const purposes=[...document.querySelectorAll('input[name="purpose"]:checked')].map(x=>x.value);
  const interests=[...document.querySelectorAll('input[name="interest"]:checked')].map(x=>x.value);
  const priority=document.querySelector('input[name="priority"]:checked')?.value || "";
  const referral=document.querySelector('input[name="referral"]:checked')?.value || "";

  const payload={
    name:document.getElementById("name").value,
    result:finalType,
    q1:answerLog[0]||"",
    q2:answerLog[1]||"",
    q3:answerLog[2]||"",
    q4:answerLog[3]||"",
    q5:answerLog[4]||"",
    purpose:purposes.join(" / "),
    interests:interests.join(" / "),
    priority,
    referral,
    comment:document.getElementById("comment").value
  };

  console.log("HORIZON QUIZ RESULT",payload);

  // Googleスプレッドシート連携時は下記を使います。
  fetch("https://script.google.com/macros/s/AKfycbwkiblBVM9ZN8GMEwUqD1UaleHU79vaV43zPSfP0wFp2f4lkM82chFg7BJeAsN6QrBR/exec",{
    method:"POST",
    mode:"no-cors",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(payload)
  });

  surveySection.classList.add("hidden");
  thanksSection.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});
