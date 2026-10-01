"use strict";

const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const ACCOUNTS_KEY="frontline_accounts_v1";
const SESSION_KEY="frontline_session_v1";
let authMode="login";
let currentUser=null;
let state=null;

function clamp(v,min=0,max=100){return Math.max(min,Math.min(max,Math.round(Number(v)||0)));}
function normalizeUser(v){return String(v||"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"");}
function stateKey(user){return "frontline_campaign_v04_"+normalizeUser(user);}

async function hashPassword(value){
  if(!(window.crypto&&crypto.subtle))throw new Error("crypto-unavailable");
  const data=new TextEncoder().encode(String(value));
  const digest=await crypto.subtle.digest("SHA-256",data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
function getAccounts(){try{return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||"{}")}catch{return{}}}
function saveAccounts(v){localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(v))}
function setSession(user){if(user)localStorage.setItem(SESSION_KEY,user);else localStorage.removeItem(SESSION_KEY)}
function getSession(){return localStorage.getItem(SESSION_KEY)}

const E=FrontlineEngine;
const CHAPTER={...FRONTLINE_DATA.chapter1,scenes:FRONTLINE_DATA.scenes};

function freshState(){return E.newRun(CHAPTER);}
// Las partidas de versiones anteriores no tienen reloj ni verdad oculta: se reinician.
function loadGame(user){
  try{
    const saved=JSON.parse(localStorage.getItem(stateKey(user)));
    if(saved&&saved.version===4&&CHAPTER.scenes[saved.sceneId])return saved;
  }catch{}
  return freshState();
}
function saveGame(){if(currentUser&&state)localStorage.setItem(stateKey(currentUser),JSON.stringify(state))}

function showAuth(){
  $("#game-shell").classList.add("hidden");
  $("#auth-shell").classList.remove("hidden");
  document.body.classList.remove("in-game");
}
function showGame(){
  $("#auth-shell").classList.add("hidden");
  $("#game-shell").classList.remove("hidden");
  document.body.classList.add("in-game");
  renderGame();
}

function setAuthMode(mode){
  authMode=mode;
  $("#login-tab").classList.toggle("active",mode==="login");
  $("#register-tab").classList.toggle("active",mode==="register");
  $("#confirm-wrap").classList.toggle("hidden",mode!=="register");
  $("#auth-submit").textContent=mode==="login"?"ENTRAR AL PUESTO DE MANDO":"CREAR CUENTA Y ENTRAR";
  $("#auth-password").autocomplete=mode==="login"?"current-password":"new-password";
  clearAuthNotice();
}
function setAuthNotice(message,success=false){
  const n=$("#auth-notice");
  n.textContent=message;
  n.classList.remove("hidden");
  n.classList.toggle("success",success);
}
function clearAuthNotice(){
  const n=$("#auth-notice");
  n.textContent="";
  n.classList.add("hidden");
  n.classList.remove("success");
}
async function handleAuth(event){
  event.preventDefault();
  clearAuthNotice();
  const rawUser=$("#auth-user").value;
  const user=normalizeUser(rawUser);
  const pass=$("#auth-password").value;
  const confirm=$("#auth-confirm").value;
  if(user.length<3){setAuthNotice("El usuario debe tener al menos 3 caracteres.");return}
  if(pass.length<4){setAuthNotice("La contraseña debe tener al menos 4 caracteres.");return}
  const accounts=getAccounts();
  try{await hashPassword("");}catch{setAuthNotice("Este navegador no permite cifrar contraseñas en una página no segura (usa HTTPS o localhost).");return}

  if(authMode==="register"){
    if(pass!==confirm){setAuthNotice("Las contraseñas no coinciden.");return}
    if(accounts[user]){setAuthNotice("Ese usuario ya existe en este navegador.");return}
    accounts[user]={display:rawUser.trim()||user,passwordHash:await hashPassword(pass),createdAt:Date.now()};
    saveAccounts(accounts);
    setAuthNotice("Cuenta local creada.",true);
  }else{
    if(!accounts[user]){setAuthNotice("Usuario no encontrado. Puedes crear una cuenta en REGISTRO.");return}
    const hash=await hashPassword(pass);
    if(hash!==accounts[user].passwordHash){setAuthNotice("Contraseña incorrecta.");return}
  }

  currentUser=user;
  setSession(user);
  state=loadGame(user);
  showGame();
}

function applyAssets(){
  $(".auth-photo").style.backgroundImage='url("'+FRONTLINE_DATA.assets.heroPhoto+'")';
  $("#dossier-map").src=FRONTLINE_DATA.assets.campaignMap;
  $("#archive-tank-photo").src=FRONTLINE_DATA.assets.heroPhoto;
  $("#archive-staff-photo").src=FRONTLINE_DATA.assets.staffPhoto;

  const logo=window.FRONTLINE_OFFICIAL_LOGO;
  if(logo){
    $$("[data-official-logo]").forEach(img=>{img.src=logo;});
    const favicon=$("#game-favicon");
    if(favicon)favicon.href=logo;
  }
}

function renderGame(){
  renderChapterChrome();
  renderClock();
  renderObjective();
  renderResources();
  renderFormations();
  renderStaff();
  renderIntel();
  renderJournal();
  renderSources();
  renderChapters();
  renderStage();
  saveGame();
}
function renderChapterChrome(){
  $("#chapter-title").textContent=CHAPTER.title;
  $("#chapter-subtitle").textContent=CHAPTER.subtitle;
  $("#commander-name").textContent=CHAPTER.protagonist;
  $("#commander-command").textContent=CHAPTER.command;
}
function renderClock(){
  const date=E.formatDate(state.clock),time=E.formatTime(state.clock);
  $("#scene-date").textContent=date;
  $("#scene-time").textContent=time;
  $("#dispatch-date").textContent=date;
  $("#dispatch-time").textContent=time;
}
function renderObjective(){
  const reach=70;
  const pct=Math.min(100,Math.round(state.progress/reach*100));
  const crossed=["bridgehead","bridgehead_small","bridgehead_costly"].some(f=>state.flags.includes(f));
  $("#objective-text").textContent=CHAPTER.objective;
  $("#objective-fill").style.width=pct+"%";
  $("#objective-progress").textContent=pct+"%";
  $("#objective-state").textContent=crossed?"CABEZA DE PUENTE":pct>=100?"BRDA ALCANZADO":"EN CURSO";
  $("#losses-men").textContent=state.losses.men.toLocaleString("es-ES");
  $("#losses-vehicles").textContent=state.losses.vehicles;
}
function renderResources(){
  const r=state.resources;
  const set=(id,v,warn)=>{const el=$(id);el.textContent=v;el.classList.toggle("warn",!!warn);};
  set("#res-command",clamp(r.command,0,9),r.command<=2);
  set("#res-communications",clamp(r.communications)+"%",r.communications<50);
  set("#res-fuel",clamp(r.fuel)+"%",r.fuel<40);
  set("#res-ammunition",clamp(r.ammunition)+"%",r.ammunition<45);
  set("#res-movement",clamp(r.movement)+"%",r.movement<50);
  set("#res-cohesion",clamp(r.cohesion)+"%",r.cohesion<55);
  set("#res-reconnaissance",clamp(r.reconnaissance)+"%",r.reconnaissance<40);
  set("#res-fatigue",clamp(r.fatigue)+"%",r.fatigue>=30);
}
function renderFormations(){
  $("#formations-list").innerHTML=state.formations.map(f=>
    '<article class="formation">'+
      '<strong>'+f.name+'</strong>'+
      '<span>'+f.role+'</span>'+
      '<small>'+f.commander+'</small>'+
      '<small>'+f.position+'</small>'+
      '<div class="formation-bars">'+
        '<div><small>PREPARACIÓN '+clamp(f.readiness)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.readiness)+'%"></i></div></div>'+
        '<div><small>SUMINISTRO '+clamp(f.supply)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.supply)+'%"></i></div></div>'+
      '</div>'+
    '</article>'
  ).join("");
}
function renderStaff(){
  $("#staff-list").innerHTML=CHAPTER.staff.map(s=>{
    const note=E.texts(s.notes,state)[0]||"";
    const trust=state.trust[s.id]??s.trust;
    return '<article class="staff-card"><span>'+s.rank+' · '+s.role+'</span><strong>'+s.name+(s.fictional?' <small>· ficticio</small>':'')+'</strong><p>'+note+'</p><div class="staff-trust">Confianza profesional: '+trust+'/100</div></article>';
  }).join("");
}
function renderIntel(){
  const v=clamp(state.resources.reconnaissance);
  const level=E.reliabilityLabel(v);
  $("#intel-reliability").textContent=v+"% · "+level;
  const scene=CHAPTER.scenes[state.sceneId];
  const txt=state.stage==="dossier"?"La información disponible antes del cruce de frontera es incompleta y pierde valor rápidamente con el movimiento.":E.texts(scene&&scene.intel,state).join(" ");
  $("#intel-text").textContent=txt+" Fiabilidad de los informes ahora: "+level.toLowerCase()+".";
  $$(".confidence-scale span").forEach(s=>s.classList.toggle("active",s.dataset.level===level));
}
function renderJournal(){
  const host=$("#decision-log");
  if(!state.log.length){host.innerHTML='<div class="log-entry">Todavía no has emitido ninguna decisión operacional.</div>';return}
  host.innerHTML=state.log.slice().reverse().map(x=>
    '<div class="log-entry"><b>'+x.date+' · '+x.time+'</b><br>'+x.title+'<span class="effects">'+x.effects+'</span></div>'
  ).join("");
}
function renderSources(){
  $("#sources-list").innerHTML=FRONTLINE_DATA.sources.map(s=>
    '<a class="source-card" href="'+s.url+'" target="_blank" rel="noopener noreferrer"><strong>'+s.short+'</strong><small>'+s.title+' · '+s.publisher+'</small></a>'
  ).join("");
}
function renderChapters(){
  $("#chapters-list").innerHTML=FRONTLINE_DATA.chapters.map(c=>
    '<article class="chapter-card '+(c.status==="locked"?"locked":"")+'"><div class="number">'+c.number+'</div><div><strong>'+c.year+' · '+c.title+'</strong><small>'+c.subtitle+'</small></div><em>'+(c.status==="available"?"DISPONIBLE":"EN DESARROLLO")+'</em></article>'
  ).join("");
}

function renderStage(){
  const dossier=$("#dossier-panel"),situation=$("#situation-panel");
  if(state.stage==="dossier"){
    dossier.classList.remove("hidden");
    situation.classList.add("hidden");
    $("#dossier-text").innerHTML=CHAPTER.dossier.map(p=>"<p>"+p+"</p>").join("");
    return;
  }
  dossier.classList.add("hidden");
  situation.classList.remove("hidden");
  renderScene();
}

function renderScene(){
  const scene=CHAPTER.scenes[state.sceneId];
  if(!scene)return;
  $("#scene-title").textContent=scene.title;
  $("#scene-from").textContent=scene.from;
  $("#scene-urgency").textContent=scene.urgency;
  $("#scene-classification").textContent=scene.classification;
  $("#scene-body").innerHTML=E.texts(scene.body,state).map(p=>"<p>"+p+"</p>").join("");
  const facts=E.texts(scene.historical,state);
  $(".historical-box").classList.toggle("hidden",!facts.length);
  $("#historical-facts").innerHTML=facts.map(p=>"<p>"+p+"</p>").join("");

  const choices=$("#choices"),result=$("#decision-result"),evaluation=$("#evaluation");
  evaluation.classList.add("hidden");
  evaluation.innerHTML="";

  if(state.decisionResult){
    choices.innerHTML="";
    result.classList.remove("hidden");
    const r=state.decisionResult;
    result.innerHTML="<strong>ORDEN REGISTRADA</strong><br>"+r.text+(r.effects?'<span class="effects">'+r.effects+'</span>':"")+(state.nextScene?'<button id="continue-button" class="continue-button">RECIBIR EL SIGUIENTE PARTE</button>':"");
    return;
  }
  result.classList.add("hidden");
  result.innerHTML="";

  if(scene.ending){
    choices.innerHTML="";
    renderEvaluation(evaluation);
    return;
  }
  choices.innerHTML=E.choicesFor(scene,state).map(c=>{
    const time=c.effects&&c.effects.minutes?"≈ "+E.formatDuration(c.effects.minutes):"inmediato";
    return '<button class="choice'+(c.available?"":" blocked")+'" data-choice="'+c.id+'"'+(c.available?"":" disabled")+'>'+
      '<div><strong>'+c.title+'</strong><p>'+c.desc+'</p>'+
      (c.available?"":'<p class="blocked-reason">'+c.blockedText+'</p>')+
      '</div><div class="choice-meta"><em>'+c.tag+'</em><small>'+time+'</small></div></button>';
  }).join("");
}

function renderEvaluation(host){
  const ev=E.evaluate(CHAPTER,state);
  host.classList.remove("hidden");
  host.innerHTML=
    '<div class="evaluation-head"><span class="eyebrow">BALANCE PARA LA 4. ARMEE</span><h3>'+ev.verdict.title+'</h3><div class="evaluation-score"><strong>'+ev.score+'</strong><small>/ 100</small></div></div>'+
    '<p class="evaluation-verdict">'+ev.verdict.text+'</p>'+
    '<div class="evaluation-rows">'+ev.rows.map(r=>
      '<div class="evaluation-row"><div><strong>'+r.label+'</strong><small>'+r.text+'</small></div><b>'+r.points+'/'+r.max+'</b></div>'
    ).join("")+'</div>'+
    '<div class="evaluation-history"><span class="eyebrow">LO QUE OCURRIÓ EN LA HISTORIA</span>'+ev.history.map(h=>"<p>"+h+"</p>").join("")+'</div>'+
    '<p class="evaluation-hint">Cada partida decide en secreto la fuerza de Chojnice, el estado de los puentes y la posición de la caballería polaca. Otra partida puede plantear una situación distinta.</p>'+
    '<button id="restart-button" class="continue-button">JUGAR DE NUEVO EL 1 DE SEPTIEMBRE</button>';
}

function chooseOrder(id){
  if(!E.choose(CHAPTER,state,id))return;
  renderGame();
}
function continueScene(){
  if(!state.nextScene)return;
  E.advance(CHAPTER,state);
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}
function restartChapter(){
  if(!confirm("¿Empezar de nuevo el capítulo? Se perderán tus decisiones y el estado actual."))return;
  state=freshState();
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}

$("#login-tab").addEventListener("click",()=>setAuthMode("login"));
$("#register-tab").addEventListener("click",()=>setAuthMode("register"));
$("#auth-form").addEventListener("submit",handleAuth);
$("#start-chapter").addEventListener("click",()=>{state.stage="scene";renderGame();window.scrollTo({top:0,behavior:"smooth"});});
$("#situation-panel").addEventListener("click",e=>{
  const choice=e.target.closest("[data-choice]");
  if(choice&&!choice.disabled){chooseOrder(choice.dataset.choice);return}
  if(e.target.closest("#continue-button")){continueScene();return}
  if(e.target.closest("#restart-button"))restartChapter();
});
$("#sources-button").addEventListener("click",()=>$("#sources-dialog").showModal());
$("#close-sources").addEventListener("click",()=>$("#sources-dialog").close());
$("#chapters-button").addEventListener("click",()=>$("#chapters-dialog").showModal());
$("#close-chapters").addEventListener("click",()=>$("#chapters-dialog").close());
$("#sources-dialog").addEventListener("click",e=>{if(e.target===$("#sources-dialog"))$("#sources-dialog").close()});
$("#chapters-dialog").addEventListener("click",e=>{if(e.target===$("#chapters-dialog"))$("#chapters-dialog").close()});
$("#logout-button").addEventListener("click",()=>{setSession(null);currentUser=null;state=null;showAuth()});

applyAssets();
setAuthMode("login");
const existing=getSession();
if(existing&&getAccounts()[existing]){
  currentUser=existing;
  state=loadGame(existing);
  showGame();
}else{
  showAuth();
}