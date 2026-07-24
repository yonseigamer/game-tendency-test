const $ = (id) => document.getElementById(id);
const screens = [$("start-screen"), $("question-screen"), $("result-screen")];
const dimensionOrder = ["action", "social", "mastery", "achievement", "immersion", "creativity"];
let currentQuestionId = testData.startQuestion;
let scores = {};
let history = [];
let playerName = "";
let lastResultData = null;

function freshScores(){ return Object.fromEntries(dimensionOrder.map(k=>[k,0])); }
function showScreen(target){ screens.forEach(s=>s.classList.add("hidden")); target.classList.remove("hidden"); window.scrollTo({top:0,behavior:"smooth"}); }
function resetTest(){ currentQuestionId=testData.startQuestion; scores=freshScores(); history=[]; }
function renderQuestion(){
  const q=testData.questions[currentQuestionId], step=history.length+1, total=Object.keys(testData.questions).length;
  $("progress-text").textContent=`${String(step).padStart(2,"0")} / ${String(total).padStart(2,"0")}`;
  $("progress-fill").style.width=`${((step-1)/total)*100}%`;
  $("question-label").textContent=q.label; $("question-title").textContent=q.question;
  $("back-button").disabled=history.length===0;
  const list=$("answer-list"); list.innerHTML="";
  q.answers.forEach((a,i)=>{ const b=document.createElement("button"); b.className="answer-button"; b.innerHTML=`<span class="answer-index">${String(i+1).padStart(2,"0")}</span><span>${a.text}</span>`; b.addEventListener("click",()=>chooseAnswer(a)); list.appendChild(b); });
}
function chooseAnswer(a){ history.push({questionId:currentQuestionId,scores:{...a.scores}}); Object.entries(a.scores).forEach(([k,v])=>scores[k]+=v); if(a.next){currentQuestionId=a.next;renderQuestion();}else renderResult(); }
function goBack(){ const prev=history.pop(); if(!prev)return; Object.entries(prev.scores).forEach(([k,v])=>scores[k]-=v); currentQuestionId=prev.questionId; renderQuestion(); }
function rankedScores(){ return dimensionOrder.map(k=>[k,scores[k]]).sort((a,b)=>b[1]-a[1] || dimensionOrder.indexOf(a[0])-dimensionOrder.indexOf(b[0])); }
function comboKey(a,b){ return dimensionOrder.indexOf(a)<dimensionOrder.indexOf(b)?`${a}-${b}`:`${b}-${a}`; }
function normalizedScores(){ const max=Math.max(...dimensionOrder.map(k=>scores[k]),1); return Object.fromEntries(dimensionOrder.map(k=>[k,Math.round((scores[k]/max)*100)])); }

function polygonPoints(values,cx,cy,r){ return values.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/3;const rr=r*(v/100);return `${cx+Math.cos(a)*rr},${cy+Math.sin(a)*rr}`;}).join(" "); }
function renderRadar(norm){
  const svg=$("radar-chart"), cx=210,cy=210,r=138;
  let html="";
  [20,40,60,80,100].forEach(level=>{html+=`<polygon class="radar-grid" points="${polygonPoints(Array(6).fill(level),cx,cy,r)}"></polygon>`});
  dimensionOrder.forEach((k,i)=>{const a=-Math.PI/2+i*Math.PI/3,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;html+=`<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"></line>`});
  html+=`<polygon class="radar-value" points="${polygonPoints(dimensionOrder.map(k=>norm[k]),cx,cy,r)}"></polygon>`;
  dimensionOrder.forEach((k,i)=>{const a=-Math.PI/2+i*Math.PI/3,x=cx+Math.cos(a)*(r+38),y=cy+Math.sin(a)*(r+38);html+=`<text class="radar-label" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${testData.dimensions[k]} ${norm[k]}</text>`});
  svg.innerHTML=html;
}
function renderResult(){
  const ranking=rankedScores(), [primary]=ranking[0], [secondary]=ranking[1], key=comboKey(primary,secondary), combo=testData.combinations[key], norm=normalizedScores();
  $("result-player-name").textContent=`${playerName}님의 게임 동기 프로필`;
  $("result-code").textContent=`${testData.dimensions[primary]} × ${testData.dimensions[secondary]} · ${combo.game}`;
  $("result-title").textContent=combo.title;
  $("matched-character").textContent=`MATCHED CHARACTER · ${combo.character}`;
  $("result-summary").textContent=combo.description;
  $("top-motivation-copy").textContent=`${testData.dimensions[primary]} 성향과 ${testData.dimensions[secondary]} 성향이 가장 강하게 나타났습니다. ${testData.dimensionDescriptions[primary]}와 ${testData.dimensionDescriptions[secondary]}를 함께 추구하는 플레이어입니다.`;
  const kw=$("result-keywords");kw.innerHTML="";combo.keywords.forEach(x=>{const s=document.createElement("span");s.className="keyword";s.textContent=`#${x}`;kw.appendChild(s)});
  const grid=$("score-grid");grid.innerHTML="";dimensionOrder.forEach(k=>{const d=document.createElement("div");d.className="score-card panel";d.innerHTML=`<span>${testData.dimensions[k]}</span><strong>${norm[k]}</strong><div class="mini-track"><i style="width:${norm[k]}%"></i></div><small>${testData.dimensionDescriptions[k]}</small>`;grid.appendChild(d)});
  renderRadar(norm); lastResultData={ranking,primary,secondary,combo,norm}; $("save-status").textContent=""; showScreen($("result-screen"));
}

$("start-button").addEventListener("click",()=>{const v=$("nickname-input").value.trim();if(!v){$("input-message").textContent="닉네임을 입력해 주세요.";$("nickname-input").focus();return;}playerName=v;$("input-message").textContent="";resetTest();showScreen($("question-screen"));renderQuestion();});
$("restart-button").addEventListener("click",()=>{resetTest();showScreen($("start-screen"));$("nickname-input").focus();});
$("back-button").addEventListener("click",goBack);$("nickname-input").addEventListener("keydown",e=>{if(e.key==="Enter")$("start-button").click();});

function rr(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke()}}
function wrap(ctx,text,x,y,max,lineH,maxLines=99){let line="",lines=[];for(const ch of [...text]){const t=line+ch;if(ctx.measureText(t).width>max&&line){lines.push(line);line=ch;if(lines.length>=maxLines)break}else line=t}if(line&&lines.length<maxLines)lines.push(line);lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineH));return y+lines.length*lineH}
function drawRadarCanvas(ctx,norm,cx,cy,r){
  const vals=dimensionOrder.map(k=>norm[k]);
  const pts=(arr)=>arr.map((v,i)=>{const a=-Math.PI/2+i*Math.PI/3,rr=r*v/100;return [cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]});
  [20,40,60,80,100].forEach(l=>{const p=pts(Array(6).fill(l));ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.strokeStyle="#474250";ctx.lineWidth=2;ctx.stroke()});
  const p=pts(vals);ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle="rgba(227,255,98,.24)";ctx.fill();ctx.strokeStyle="#e3ff62";ctx.lineWidth=5;ctx.stroke();
  dimensionOrder.forEach((k,i)=>{const a=-Math.PI/2+i*Math.PI/3,x=cx+Math.cos(a)*(r+58),y=cy+Math.sin(a)*(r+58);ctx.fillStyle="#f6f3fa";ctx.font="700 24px system-ui";ctx.textAlign="center";ctx.fillText(`${testData.dimensions[k]} ${norm[k]}`,x,y)});
}
async function createResultCanvas(){
  const {primary,secondary,combo,norm}=lastResultData;const c=document.createElement("canvas");c.width=1080;c.height=1350;const ctx=c.getContext("2d");
  const g=ctx.createLinearGradient(0,0,1080,1350);g.addColorStop(0,"#17141f");g.addColorStop(1,"#0d0c11");ctx.fillStyle=g;ctx.fillRect(0,0,1080,1350);rr(ctx,52,52,976,1246,34,"#1b1922","#3a3544");
  ctx.textAlign="left";ctx.fillStyle="#e3ff62";ctx.font="800 24px system-ui";ctx.fillText("PLAYER STATUS · SAVE FILE 001",92,105);ctx.textAlign="right";ctx.fillStyle="#aaa4b5";ctx.fillText(playerName,988,105);
  drawRadarCanvas(ctx,norm,350,430,190);
  ctx.textAlign="left";ctx.fillStyle="#e3ff62";ctx.font="800 22px system-ui";ctx.fillText(`${testData.dimensions[primary]} × ${testData.dimensions[secondary]}`,620,225);ctx.fillStyle="#f6f3fa";ctx.font="900 50px system-ui";let y=wrap(ctx,combo.title,620,295,330,62,3);ctx.fillStyle="#aaa4b5";ctx.font="700 23px system-ui";ctx.fillText(`MATCHED · ${combo.character}`,620,y+24);ctx.fillStyle="#f6f3fa";ctx.font="500 24px system-ui";wrap(ctx,combo.description,620,y+82,335,39,7);
  ctx.strokeStyle="#3a3544";ctx.beginPath();ctx.moveTo(92,720);ctx.lineTo(988,720);ctx.stroke();
  ctx.fillStyle="#e3ff62";ctx.font="800 20px system-ui";ctx.fillText("MOTIVATION STATUS",92,770);
  dimensionOrder.forEach((k,i)=>{const x=92+(i%2)*455,yy=825+Math.floor(i/2)*130;ctx.fillStyle="#f6f3fa";ctx.font="700 23px system-ui";ctx.fillText(testData.dimensions[k],x,yy);ctx.textAlign="right";ctx.fillText(norm[k],x+395,yy);ctx.textAlign="left";rr(ctx,x,yy+20,395,14,7,"#3d3845");rr(ctx,x,yy+20,395*norm[k]/100,14,7,"#e3ff62")});
  ctx.textAlign="center";ctx.fillStyle="#aaa4b5";ctx.font="600 20px system-ui";ctx.fillText(combo.keywords.map(k=>`#${k}`).join("   "),540,1240);ctx.fillStyle="#777180";ctx.font="500 16px system-ui";ctx.fillText("본 결과는 팝업 체험을 위한 게임 동기 콘텐츠입니다.",540,1280);return c;
}
$("save-image-button").addEventListener("click",async()=>{const b=$("save-image-button"),s=$("save-status");b.disabled=true;b.textContent="이미지 생성 중…";try{const c=await createResultCanvas(),blob=await new Promise(r=>c.toBlob(r,"image/png")),safe=playerName.replace(/[\\/:*?\"<>|]/g,"_"),name=`${safe}-플레이어-스테이터스.png`,file=new File([blob],name,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({title:`${playerName}님의 플레이어 스테이터스`,files:[file]});s.textContent="결과 이미지를 공유했습니다.";return}catch(e){if(e.name==="AbortError")return}}const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);s.textContent="PNG 결과 이미지를 저장했습니다."}catch(e){console.error(e);s.textContent="이미지를 생성하지 못했습니다."}finally{b.disabled=false;b.textContent="결과 이미지 저장하기"}});
