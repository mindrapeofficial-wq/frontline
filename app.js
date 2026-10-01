"use strict";

const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const ACCOUNTS_KEY="frontline_accounts_v1";
const SESSION_KEY="frontline_session_v1";
let authMode="login";
let currentUser=null;
let state=null;
let armoryFilter="all";
let encyclopediaSelected=null;

function clone(v){return JSON.parse(JSON.stringify(v));}
function clamp(v,min=0,max=100){return Math.max(min,Math.min(max,Math.round(Number(v)||0)));}
function normalizeUser(v){return String(v||"").trim().toLowerCase().replace(/[^a-z0-9._-]/g,"");}
function stateKey(user){return "frontline_campaign_v05_"+normalizeUser(user);}
function getCampaign(id=state?.chapter||"ch0"){return FRONTLINE_DATA.campaigns[id]||FRONTLINE_DATA.campaigns.ch0;}
const E=FrontlineEngine;
// Las campañas con "engine" usan engine.js: reloj, verdad oculta, mapa y turnos.
function isEngine(campaign=getCampaign()){return !!campaign.engine;}
const ENGINE_STATE_VERSION=5;

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

function freshState(chapter="ch0"){
  const campaign=getCampaign(chapter);
  if(isEngine(campaign)){
    const s=E.newRun(campaign);
    s.chapter=chapter;
    s.encyclopedia={unlocked:[],unread:[]};
    return s;
  }
  return{
    chapter,
    stage:"dossier",
    sceneId:campaign.startScene,
    resources:clone(campaign.resources),
    formations:clone(campaign.formations),
    log:[],
    decisionResult:null,
    nextScene:null,
    path:[],
    encyclopedia:{unlocked:[],unread:[]}
  };
}
function switchChapter(chapter){
  const meta=FRONTLINE_DATA.chapters.find(c=>c.id===chapter);
  if(!meta||meta.status!=="available"||!FRONTLINE_DATA.campaigns[chapter])return;
  const encyclopedia=clone(state?.encyclopedia||{unlocked:[],unread:[]});
  state=freshState(chapter);
  state.encyclopedia=encyclopedia;
  encyclopediaSelected=null;
  $("#chapters-dialog")?.close();
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}
function loadGame(user){
  try{
    const saved=JSON.parse(localStorage.getItem(stateKey(user)))||freshState();
    if(!FRONTLINE_DATA.campaigns[saved.chapter])return freshState();
    // Las partidas del capítulo I anteriores al motor no tienen reloj ni mapa: se reinician conservando la enciclopedia.
    if(isEngine(getCampaign(saved.chapter))&&(saved.version!==ENGINE_STATE_VERSION||!getCampaign(saved.chapter).scenes[saved.sceneId])){
      const fresh=freshState(saved.chapter);
      if(saved.encyclopedia)fresh.encyclopedia=saved.encyclopedia;
      return fresh;
    }
    if(!saved.encyclopedia)saved.encyclopedia={unlocked:[],unread:[]};
    if(!Array.isArray(saved.encyclopedia.unlocked))saved.encyclopedia.unlocked=[];
    if(!Array.isArray(saved.encyclopedia.unread))saved.encyclopedia.unread=[];
    return saved;
  }catch{return freshState()}
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

function ensureCampaignStyles(){
  if(document.querySelector('link[data-frontline-campaign-styles]'))return;
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href="campaign-1938.css?v=0.5.0";
  link.dataset.frontlineCampaignStyles="true";
  document.head.appendChild(link);
}
function assetUrl(file){return FRONTLINE_DATA.assetBase+encodeURIComponent(file);}
function visualSrc(v){return v.url||assetUrl(v.file);}
function campaignAsset(campaign,key){
  return campaign.assets?.[key+"Url"]||assetUrl(campaign.assets?.[key+"File"]||"");
}
function applyAssets(){
  const campaign=getCampaign(state?.chapter||"ch0");
  $(".auth-photo").style.backgroundImage='url("'+campaignAsset(getCampaign("ch0"),"hero")+'")';
  $("#dossier-map").src=campaignAsset(campaign,"campaignMap");

  const logo=window.FRONTLINE_OFFICIAL_LOGO;
  if(logo){
    $$("[data-official-logo]").forEach(img=>{img.src=logo;});
    const favicon=$("#game-favicon");
    if(favicon)favicon.href=logo;
  }
}

function renderVisualList(visuals){
  const panel=$(".archive-visuals");
  const grid=$("#archive-grid");
  if(!panel||!grid)return;
  if(!visuals?.length){panel.classList.add("hidden");grid.innerHTML="";return;}
  panel.classList.remove("hidden");
  grid.innerHTML=visuals.map(v=>{
    const badge=v.chronology&&v.chronology!=="contemporary"
      ? '<span class="archive-badge">'+(v.chronology==="retrospective-archive"?"ARCHIVO POSTERIOR":"ARCHIVO DE REFERENCIA")+'</span>'
      : '<span class="archive-badge">DOCUMENTO DE ÉPOCA</span>';
    return '<figure>'+badge+
      '<img loading="lazy" src="'+visualSrc(v)+'" alt="'+v.caption.replace(/"/g,"&quot;")+'">'+
      '<figcaption><strong>'+v.caption+'</strong><span>'+v.usage+'</span></figcaption></figure>';
  }).join("");
}
function renderSceneVisuals(scene){renderVisualList(scene.visuals||[]);}
function renderDossierVisuals(){
  const campaign=getCampaign();
  if(state.chapter==="ch0"){
    renderVisualList([
      {file:campaign.assets.heroFile,caption:"Kriegsakademie, Berlín.",usage:"Introduce la formación del Estado Mayor y la reorganización de 1938.",chronology:"contemporary"},
      {file:campaign.assets.staffFile,caption:"Kriegsakademie, Berlín.",usage:"Segundo documento de referencia para el dossier inicial.",chronology:"contemporary"}
    ]);
  }else{
    renderVisualList([
      {url:campaign.assets.heroUrl,caption:"Panzer I e infantería alemana en Polonia.",usage:"Documento visual de apertura de FALL WEISS.",chronology:"contemporary"},
      {url:campaign.assets.staffUrl,caption:"Oficiales alemanes ante un mapa de situación.",usage:"Dossier visual del Estado Mayor durante la campaña de 1939.",chronology:"contemporary"}
    ]);
  }
}

function renderGame(){
  discoverCurrentEncyclopedia();
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
  renderArmory();
  renderEncyclopedia();
  renderStage();
  saveGame();
}
function renderChapterChrome(){
  const c=getCampaign();
  $("#chapter-title").textContent=c.title;
  $("#chapter-subtitle").textContent=c.subtitle;
  $("#chapter-header").textContent=c.title;
  $("#commander-name").textContent=c.protagonist;
  $("#commander-command").textContent=c.command;
  $(".command-seal strong").textContent=state.chapter==="ch0"?"OKH":"4. ARMEE";
  $(".command-seal small").textContent=state.chapter==="ch0"?"HEER · 1938":"HEERESGRUPPE NORD";
  $(".formations-panel .panel-title span").textContent=state.chapter==="ch0"?"ÁREAS DE REORGANIZACIÓN":"FORMACIONES DEL CUERPO";
  $(".formations-panel .panel-title b").textContent=state.chapter==="ch0"?"1938":"1 SEP 1939";
  $(".staff-panel .panel-title b").textContent=state.chapter==="ch0"?"OKH":"XIX AK";
  $(".dossier-stamp").innerHTML=state.chapter==="ch0"?"HEER<br>1938":"FALL WEISS<br>1939";
  $(".dossier-content h2").textContent=state.chapter==="ch0"?"Un ejército en transformación":"Europa entra en guerra";
  $("#dossier-map").src=campaignAsset(c,"campaignMap");
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
      '<small>'+formationPosition(f)+'</small>'+
      '<div class="formation-bars">'+
        '<div><small>PREPARACIÓN '+clamp(f.readiness)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.readiness)+'%"></i></div></div>'+
        '<div><small>SUMINISTRO '+clamp(f.supply)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.supply)+'%"></i></div></div>'+
      '</div>'+
    '</article>'
  ).join("");
}
function renderStaff(){
  if(isEngine()){
    $("#staff-list").innerHTML=getCampaign().staff.map(s=>{
      const note=E.texts(s.notes,state)[0]||"";
      const trust=state.trust?.[s.id]??s.trust;
      return '<article class="staff-card"><span>'+s.rank+' · '+s.role+'</span><strong>'+s.name+(s.fictional?' <small>· ficticio</small>':'')+'</strong><p>'+note+'</p><div class="staff-trust">Confianza profesional: '+trust+'/100</div></article>';
    }).join("");
    return;
  }
  $("#staff-list").innerHTML=getCampaign().staff.map(s=>{
    let note=s.note;
    if(state.resources.cohesion<72&&s.id==="ia")note="Las diferencias de ritmo entre las columnas empiezan a preocupar a Operaciones. Keller pide reducir órdenes simultáneas.";
    if(state.resources.reconnaissance>60&&s.id==="ic")note="La imagen táctica está mejorando. Weber recuerda que un informe correcto hace treinta minutos puede ser falso ahora.";
    if(state.resources.fuel<72&&s.id==="qu")note="La situación de combustible sigue siendo utilizable, pero Hartmann exige evitar movimientos sin objetivo operativo claro.";
    return '<article class="staff-card"><span>'+s.rank+' · '+s.role+'</span><strong>'+s.name+(s.fictional?' <small>· ficticio</small>':'')+'</strong><p>'+note+'</p><div class="staff-trust">Confianza profesional: '+s.trust+'/100</div></article>';
  }).join("");
}
function renderIntel(){
  if(isEngine()){renderEngineIntel();return}
  $$(".confidence-scale span").forEach(s=>s.classList.remove("active"));
  const v=clamp(state.resources.reconnaissance);
  $("#intel-reliability").textContent=v+"%";
  const scene=getCampaign().scenes[state.sceneId];
  $("#intel-text").textContent=scene?.intel||"El Estado Mayor trabaja con información incompleta, de calidad desigual y con retrasos.";
}
function renderJournal(){
  const host=$("#decision-log");
  if(!state.log.length){host.innerHTML='<div class="log-entry">Todavía no has emitido ninguna decisión operacional.</div>';return}
  host.innerHTML=state.log.slice().reverse().map(x=>
    '<div class="log-entry"><b>'+x.date+' · '+x.time+'</b><br>'+x.title+'<span class="effects">'+x.effects+'</span></div>'
  ).join("");
}
function renderSources(){
  $("#sources-list").innerHTML=getCampaign().sources.map(s=>
    '<a class="source-card" href="'+s.url+'" target="_blank" rel="noopener noreferrer"><strong>'+s.short+'</strong><small>'+s.title+' · '+s.publisher+'</small></a>'
  ).join("");
}
function currentCampaignYear(){
  const campaign=getCampaign();
  const scene=campaign.scenes[state?.sceneId];
  const source=isEngine(campaign)?E.formatDate(state.clock):scene?.date||campaign.startDate||"1938";
  const match=String(source).match(/(19\d{2})/);
  return match?Number(match[1]):1938;
}
function renderArmory(){
  const grid=$("#armory-grid"),summary=$("#armory-summary");
  if(!grid||!summary||!FRONTLINE_DATA.armory)return;
  const year=currentCampaignYear();
  const all=FRONTLINE_DATA.armory;
  const current=all.filter(x=>x.year<=year);
  const future=all.filter(x=>x.year>year);
  let items=all;
  if(armoryFilter==="current")items=current;
  if(armoryFilter==="future")items=future;
  if(armoryFilter==="ammo")items=all.filter(x=>x.kind==="ammo");
  summary.innerHTML="<strong>"+current.length+"</strong> referencias disponibles en "+year+
    " · <strong>"+future.length+"</strong> bloqueadas por cronología · <strong>"+all.filter(x=>x.kind==="ammo").length+"</strong> fichas de munición";
  grid.innerHTML=items.map(item=>{
    const available=item.year<=year;
    const status=available?"DISPONIBLE · "+item.year:"BLOQUEADO · "+item.year;
    return '<article class="armory-card '+(available?"available":"locked")+' '+(item.kind==="ammo"?"ammo":"")+'">'+
      '<div class="armory-image"><img loading="lazy" src="'+assetUrl(item.file)+'" alt="'+item.name.replace(/"/g,"&quot;")+'"><span>'+status+'</span></div>'+
      '<div class="armory-copy"><small>'+item.type+'</small><strong>'+item.name+'</strong><p><b>Munición / sistema:</b> '+item.ammo+'</p><p>'+item.note+'</p></div>'+
    '</article>';
  }).join("");
  $$(".armory-filter").forEach(b=>b.classList.toggle("active",b.dataset.armoryFilter===armoryFilter));
}
function ensureEncyclopediaState(){
  if(!state)return {unlocked:[],unread:[]};
  if(!state.encyclopedia)state.encyclopedia={unlocked:[],unread:[]};
  if(!Array.isArray(state.encyclopedia.unlocked))state.encyclopedia.unlocked=[];
  if(!Array.isArray(state.encyclopedia.unread))state.encyclopedia.unread=[];
  return state.encyclopedia;
}
function encyclopediaCategoryLabel(category){
  const pair=FRONTLINE_ENCYCLOPEDIA?.categories?.find(x=>x[0]===category);
  return pair?pair[1]:String(category||"ARCHIVO").toUpperCase();
}
function currentDiscoveryText(){
  const campaign=getCampaign();
  const parts=[campaign.title,campaign.subtitle,campaign.protagonist,campaign.command];
  if(state.stage==="dossier"){
    parts.push(...(campaign.dossier||[]));
    (campaign.formations||[]).forEach(f=>parts.push(f.name,f.commander,f.role,f.position));
    (campaign.staff||[]).filter(s=>!s.fictional).forEach(s=>parts.push(s.name,s.rank,s.role));
  }else{
    const scene=campaign.scenes?.[state.sceneId];
    if(scene){
      if(isEngine()){
        parts.push(scene.title,scene.from,scene.urgency,scene.classification);
        parts.push(...E.texts(scene.intel,state),...E.texts(scene.body,state),...E.texts(scene.historical,state));
      }else{
        parts.push(scene.title,scene.from,scene.urgency,scene.classification,scene.intel);
        parts.push(...(scene.body||[]),...(scene.historical||[]));
      }
      (scene.visuals||[]).forEach(v=>parts.push(v.caption,v.usage));
    }
  }
  return parts.filter(Boolean).join(" ");
}
function discoverCurrentEncyclopedia(){
  if(!state||typeof frontlineDiscoverEntries!=="function")return;
  const archive=ensureEncyclopediaState();
  frontlineDiscoverEntries(currentDiscoveryText()).forEach(id=>{
    if(!archive.unlocked.includes(id)){
      archive.unlocked.push(id);
      if(!archive.unread.includes(id))archive.unread.push(id);
    }
  });
}
function renderEncyclopedia(){
  const list=$("#encyclopedia-list"),detail=$("#encyclopedia-detail");
  if(!list||!detail||typeof FRONTLINE_ENCYCLOPEDIA==="undefined")return;
  const archive=ensureEncyclopediaState();
  const unlocked=new Set(archive.unlocked);
  const query=frontlineNormalizeText($("#encyclopedia-search")?.value||"");
  const category=$("#encyclopedia-category")?.value||"all";
  const entries=FRONTLINE_ENCYCLOPEDIA.entries.filter(entry=>{
    if(category!=="all"&&entry.category!==category)return false;
    if(!query)return true;
    if(!unlocked.has(entry.id))return false;
    return frontlineNormalizeText([entry.name,entry.summary,entry.period,encyclopediaCategoryLabel(entry.category)].join(" ")).includes(query);
  });
  $("#encyclopedia-count").textContent=archive.unlocked.length+" / "+FRONTLINE_ENCYCLOPEDIA.entries.length;
  const badge=$("#encyclopedia-badge");
  if(badge){
    badge.textContent=archive.unread.length;
    badge.classList.toggle("hidden",archive.unread.length===0);
  }
  if(!entries.length){
    list.innerHTML='<div class="encyclopedia-empty">No hay registros que coincidan con este filtro.</div>';
  }else{
    list.innerHTML=entries.map(entry=>{
      const open=unlocked.has(entry.id);
      if(!open)return '<article class="encyclopedia-card locked"><span>'+encyclopediaCategoryLabel(entry.category)+'</span><strong>REGISTRO NO DESCUBIERTO</strong><small>Continúa la campaña para revelar esta ficha.</small></article>';
      const unread=archive.unread.includes(entry.id);
      return '<button class="encyclopedia-card unlocked'+(unread?' unread':'')+'" data-encyclopedia-id="'+entry.id+'"><span>'+encyclopediaCategoryLabel(entry.category)+(unread?' · NUEVO':'')+'</span><strong>'+entry.name+'</strong><small>'+entry.period+'</small></button>';
    }).join("");
    $$(".encyclopedia-card.unlocked",list).forEach(card=>card.addEventListener("click",()=>{
      encyclopediaSelected=card.dataset.encyclopediaId;
      renderEncyclopediaDetail(encyclopediaSelected);
      card.classList.remove("unread");
    }));
  }
  if(encyclopediaSelected&&!unlocked.has(encyclopediaSelected))encyclopediaSelected=null;
  if(encyclopediaSelected)renderEncyclopediaDetail(encyclopediaSelected);
}
function renderEncyclopediaDetail(id){
  const host=$("#encyclopedia-detail");
  const entry=typeof frontlineEncyclopediaEntry==="function"?frontlineEncyclopediaEntry(id):null;
  if(!host||!entry||!ensureEncyclopediaState().unlocked.includes(id))return;
  const specs=Object.entries(entry.specs||{}).map(([key,value])=>'<div><span>'+key+'</span><strong>'+value+'</strong></div>').join("");
  const details=(entry.details||[]).map(x=>"<p>"+x+"</p>").join("");
  host.innerHTML='<header><span>'+encyclopediaCategoryLabel(entry.category)+'</span><h3>'+entry.name+'</h3><small>'+entry.period+'</small></header>'+
    '<p class="encyclopedia-summary">'+entry.summary+'</p>'+
    (specs?'<section class="encyclopedia-specs"><h4>FICHA TÉCNICA</h4>'+specs+'</section>':"")+
    '<section class="encyclopedia-notes"><h4>CONTEXTO HISTÓRICO</h4>'+details+'</section>'+
    '<aside><b>EN FRONTLINE 1944</b><p>'+entry.context+'</p></aside>';
}
function openEncyclopedia(){
  const archive=ensureEncyclopediaState();
  archive.unread=[];
  if(!encyclopediaSelected)encyclopediaSelected=archive.unlocked[0]||null;
  renderEncyclopedia();
  if(encyclopediaSelected)renderEncyclopediaDetail(encyclopediaSelected);
  $("#encyclopedia-dialog").showModal();
  saveGame();
}

function renderChapters(){
  $("#chapters-list").innerHTML=FRONTLINE_DATA.chapters.map(c=>
    '<article class="chapter-card '+(c.status==="locked"?"locked":"")+(state.chapter===c.id?" active":"")+'" data-chapter="'+c.id+'"><div class="number">'+c.number+'</div><div><strong>'+c.year+' · '+c.title+'</strong><small>'+c.subtitle+'</small></div><em>'+(state.chapter===c.id?"EN CURSO":c.status==="available"?"JUGAR":"EN DESARROLLO")+'</em></article>'
  ).join("");
  $$(".chapter-card[data-chapter]").forEach(card=>card.addEventListener("click",()=>switchChapter(card.dataset.chapter)));
}

function renderStage(){
  if(isEngine()){renderEngineStage();return}
  $("#map-panel").classList.add("hidden");
  $("#orders-panel").classList.add("hidden");
  $("#evaluation").classList.add("hidden");
  $(".historical-box").classList.remove("hidden");
  const dossier=$("#dossier-panel"),situation=$("#situation-panel");
  if(state.stage==="dossier"){
    dossier.classList.remove("hidden");
    situation.classList.add("hidden");
    const campaign=getCampaign();
    $("#dossier-text").innerHTML=campaign.dossier.map(p=>"<p>"+p+"</p>").join("");
    $("#scene-date").textContent=campaign.startDate;
    $("#scene-time").textContent=campaign.startTime;
    renderDossierVisuals();
    return;
  }
  dossier.classList.add("hidden");
  situation.classList.remove("hidden");
  renderScene();
}

function renderScene(){
  const scene=getCampaign().scenes[state.sceneId];
  if(!scene)return;
  $("#scene-date").textContent=scene.date;
  $("#scene-time").textContent=scene.time;
  $("#dispatch-date").textContent=scene.date;
  $("#dispatch-time").textContent=scene.time;
  $("#scene-title").textContent=scene.title;
  $("#scene-from").textContent=scene.from;
  $("#scene-urgency").textContent=scene.urgency;
  $("#scene-classification").textContent=scene.classification;
  $("#scene-body").innerHTML=scene.body.map(p=>"<p>"+p+"</p>").join("");
  $("#historical-facts").innerHTML=scene.historical.map(p=>"<p>"+p+"</p>").join("");
  renderSceneVisuals(scene);

  const choices=$("#choices"),result=$("#decision-result");
  if(state.decisionResult){
    choices.innerHTML="";
    result.classList.remove("hidden");
    result.innerHTML="<strong>ORDEN REGISTRADA</strong><br>"+state.decisionResult+(state.nextScene?'<button id="continue-button" class="continue-button">CONTINUAR</button>':"");
    $("#continue-button")?.addEventListener("click",continueScene);
    return;
  }

  result.classList.add("hidden");
  result.innerHTML="";
  if(!scene.choices.length){
    choices.innerHTML='<div class="decision-result"><strong>FIN DEL CAPÍTULO I</strong><br>'+String(scene.endText||"Capítulo completado.").replace(/\n/g,"<br>")+'</div>';
  }else{
    choices.innerHTML=scene.choices.map(c=>
      '<button class="choice" data-choice="'+c.id+'"><div><strong>'+c.title+'</strong><p>'+c.desc+'</p></div><em>'+c.tag+'</em></button>'
    ).join("");
    $$(".choice").forEach(b=>b.addEventListener("click",()=>choose(b.dataset.choice)));
  }
}

function choose(id){
  const scene=getCampaign().scenes[state.sceneId];
  const choice=scene.choices.find(c=>c.id===id);
  if(!choice)return;
  const before=clone(state.resources);
  for(const [key,value] of Object.entries(choice.effects||{})){
    if(!(key in state.resources))continue;
    const max=key==="command"?9:100;
    state.resources[key]=clamp(state.resources[key]+value,0,max);
  }
  applyFormationEffects(id);
  const effects=describeEffects(before,state.resources);
  state.path.push({scene:scene.id,choice:id,date:scene.date,time:scene.time});
  state.log.push({date:scene.date,time:scene.time,title:choice.title,effects});
  state.decisionResult=choice.result+(effects?'<span class="effects">'+effects+'</span>':"");
  state.nextScene=choice.next||null;
  renderGame();
}
function continueScene(){
  if(!state.nextScene)return;
  state.sceneId=state.nextScene;
  state.nextScene=null;
  state.decisionResult=null;
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}
function applyFormationEffects(id){
  const byId=x=>state.formations.find(f=>f.id===x);
  if(id==="push_armor"){const f=byId("3pz");if(f){f.readiness=clamp(f.readiness-4);f.supply=clamp(f.supply-7);f.position="Vanguardia adelantada";}}
  if(id==="traffic_control"){state.formations.forEach(f=>f.readiness=clamp(f.readiness+2));}
  if(id==="recon_first"){const f=byId("3pz");if(f)f.position="Avance con reconocimiento reforzado";}
  if(id==="concentrate"){const f=byId("3pz");if(f)f.readiness=clamp(f.readiness+3);}
  if(id==="broad_front"){state.formations.forEach(f=>f.readiness=clamp(f.readiness+1));}
  if(id==="pause_support"){state.formations.forEach(f=>{f.supply=clamp(f.supply+5);f.readiness=clamp(f.readiness+2);});}
}
function describeEffects(before,after){
  const labels={command:"Mando",communications:"Comunicaciones",fuel:"Combustible",ammunition:"Munición",movement:"Ritmo",cohesion:"Cohesión",reconnaissance:"Reconocimiento",fatigue:"Fatiga"};
  const parts=[];
  for(const [key,label] of Object.entries(labels)){
    const d=Math.round(after[key]-before[key]);
    if(d)parts.push(label+" "+(d>0?"+":"")+d);
  }
  return parts.join(" · ");
}


/* ---------- Campañas con motor (engine.js): reloj, mapa, turnos y balance ---------- */

function renderClock(){
  if(!isEngine())return;
  const date=E.formatDate(state.clock),time=E.formatTime(state.clock);
  $("#scene-date").textContent=date;
  $("#scene-time").textContent=time;
  $("#dispatch-date").textContent=date;
  $("#dispatch-time").textContent=time;
}
function renderObjective(){
  $(".objective-panel").classList.toggle("hidden",!isEngine());
  if(!isEngine())return;
  const reach=70;
  const pct=Math.min(100,Math.round(state.progress/reach*100));
  const crossed=["bridgehead","bridgehead_small","bridgehead_costly"].some(f=>state.flags.includes(f));
  $("#objective-text").textContent=getCampaign().objective;
  $("#objective-fill").style.width=pct+"%";
  $("#objective-progress").textContent=pct+"%";
  $("#objective-state").textContent=crossed?"CABEZA DE PUENTE":pct>=100?"BRDA ALCANZADO":"EN CURSO";
  $("#losses-men").textContent=state.losses.men.toLocaleString("es-ES");
  $("#losses-vehicles").textContent=state.losses.vehicles;
}
// Con mapa, la posición es la última comunicada; la situación de la escena se añade como nota.
function formationPosition(f){
  const u=state.units&&state.units[f.id];
  if(!u||!getCampaign().map)return f.position;
  const place=E.placeName(getCampaign().map.routes[f.id],u.known.pos);
  return "Posición: "+place+(state.clock-u.known.clock>=30?" (parte de las "+E.formatTime(u.known.clock)+")":"");
}
function renderEngineIntel(){
  const v=clamp(state.resources.reconnaissance);
  const level=E.reliabilityLabel(v);
  $("#intel-reliability").textContent=v+"% · "+level;
  const scene=getCampaign().scenes[state.sceneId];
  const txt=state.stage==="orders"||state.stage==="turnReport"?"Los contactos del mapa son lo que tu Estado Mayor cree saber. Los estimados pueden estar mal identificados y los antiguos pueden haberse movido.":state.stage==="dossier"?"La información disponible antes del cruce de frontera es incompleta y pierde valor rápidamente con el movimiento.":E.texts(scene&&scene.intel,state).join(" ");
  $("#intel-text").textContent=txt+" Fiabilidad de los informes ahora: "+level.toLowerCase()+".";
  $$(".confidence-scale span").forEach(s=>s.classList.toggle("active",s.dataset.level===level));
}
function renderEngineStage(){
  const stage=state.stage;
  $("#dossier-panel").classList.toggle("hidden",stage!=="dossier");
  $("#map-panel").classList.toggle("hidden",stage==="dossier");
  $("#situation-panel").classList.toggle("hidden",stage!=="scene");
  $("#orders-panel").classList.toggle("hidden",stage!=="orders"&&stage!=="turnReport");
  if(stage==="dossier"){
    $("#dossier-text").innerHTML=getCampaign().dossier.map(p=>"<p>"+p+"</p>").join("");
    renderDossierVisuals();
    return;
  }
  renderMap();
  if(stage==="scene")renderEngineScene();
  else renderOrders();
}

/* ---------- Mapa operacional ---------- */

const SVG_NS="http://www.w3.org/2000/svg";
function esc(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function renderMap(){
  const map=getCampaign().map;
  const parts=[];
  parts.push('<rect class="m-bg" x="0" y="0" width="'+map.width+'" height="'+map.height+'"/>');
  for(const f of map.forests)parts.push('<rect class="m-forest" x="'+f.x+'" y="'+f.y+'" width="'+f.w+'" height="'+f.h+'" rx="40"/><text class="m-forest-label" x="'+(f.x+f.w/2)+'" y="'+(f.y+f.h-12)+'" text-anchor="middle">'+esc(f.label)+'</text>');
  parts.push('<path class="m-border" d="'+map.border+'"/><text class="m-border-label" x="158" y="545">FRONTERA DE 1939</text>');
  for(const r of map.rivers)parts.push('<path class="m-river" d="'+r.d+'"/><text class="m-river-label" x="'+r.lx+'" y="'+r.ly+'">'+esc(r.name)+'</text>');
  for(const def of map.units){
    const pts=map.routes[def.id].points.map(p=>p.x+","+p.y).join(" ");
    parts.push('<polyline class="m-axis" points="'+pts+'"/>');
  }
  for(const p of map.places)parts.push('<rect class="m-place" x="'+(p.x-3)+'" y="'+(p.y-3)+'" width="6" height="6"/><text class="m-place-label" x="'+(p.x+8)+'" y="'+(p.y+17)+'">'+esc(p.name)+'</text>');
  const goal=E.mapPoint(map.routes["3pz"],70);
  parts.push('<g class="m-goal"><circle cx="'+goal.x+'" cy="'+goal.y+'" r="15"/><text x="'+goal.x+'" y="'+(goal.y+32)+'" text-anchor="middle">OBJETIVO</text></g>');

  for(const def of map.enemies){
    const c=state.contacts[def.id];
    if(!c||E.enemyCleared(def,state))continue;
    const p=E.enemyPoint(getCampaign(),def,state);
    if(!p)continue;
    const age=state.clock-c.clock;
    const cls=c.level==="confirmed"?"m-enemy confirmed":"m-enemy estimated";
    const label=(c.level==="confirmed"?c.label:"¿"+c.label+"?")+(age>=60?" · hace "+E.formatDuration(age):"");
    parts.push('<g class="'+cls+'"><path d="M'+p.x+' '+(p.y-12)+' L'+(p.x+12)+' '+p.y+' L'+p.x+' '+(p.y+12)+' L'+(p.x-12)+' '+p.y+' Z"/>'+
      '<text x="'+p.x+'" y="'+(p.y-18)+'" text-anchor="middle">'+esc(label)+'</text></g>');
  }

  for(const def of map.units){
    const u=state.units[def.id];
    const known=u.known||{pos:0,clock:state.clock};
    const p=E.mapPoint(map.routes[def.id],known.pos);
    const stale=state.clock-known.clock>=30;
    const armor=def.id==="3pz";
    const order=E.ORDERS[u.order]?E.ORDERS[u.order].label:"";
    parts.push('<g class="m-unit'+(stale?" stale":"")+'" transform="translate('+p.x+' '+p.y+')">'+
      '<rect x="-22" y="-14" width="44" height="28"/>'+
      (armor?'<rect class="m-sym" x="-14" y="-7" width="28" height="14" rx="7"/>':'<path class="m-sym" d="M-22 -14 L22 14 M22 -14 L-22 14"/>')+
      '<text class="m-unit-name" x="0" y="30" text-anchor="middle">'+esc(def.short)+'</text>'+
      '<text class="m-unit-order" x="0" y="43" text-anchor="middle">'+esc(order)+(stale?" · parte "+E.formatTime(known.clock):"")+'</text>'+
    '</g>');
  }
  $("#map-host").innerHTML='<svg viewBox="0 0 '+map.width+' '+map.height+'" role="img" aria-label="Croquis operacional del Corredor Polaco con las divisiones del cuerpo y los contactos conocidos">'+parts.join("")+'</svg>';
  $("#map-clock").textContent=E.formatDate(state.clock)+" · "+E.formatTime(state.clock);
}

/* ---------- Órdenes por turno ---------- */

function renderOrders(){
  const map=getCampaign().map,report=state.stage==="turnReport";
  const next=getCampaign().scenes[state.pendingScene];
  $("#orders-duration").textContent=E.formatDuration(state.turnMinutes||0);
  $("#orders-title").textContent=report?"Partes del periodo":"Órdenes para el periodo";
  $("#orders-intro").textContent=report?
    "Esto es lo que tu Estado Mayor sabe al final del periodo. Algunas divisiones pueden no haber informado.":
    "Hasta el siguiente parte"+(next&&next.at!=null?" (≈ "+E.formatTime(next.at)+")":"")+" tus divisiones ejecutarán estas órdenes. Una orden puede no llegar si las comunicaciones fallan.";
  $("#orders-list").classList.toggle("hidden",report);
  $("#execute-turn").classList.toggle("hidden",report);
  const host=$("#turn-report");
  host.classList.toggle("hidden",!report);
  if(report){
    const r=state.turnReport;
    host.innerHTML=r.lines.map(l=>'<p class="tr-line '+l.type+'">'+l.text+'</p>').join("")+
      (r.effects?'<span class="effects">'+r.effects+'</span>':"")+
      '<button id="turn-continue" class="continue-button">RECIBIR EL SIGUIENTE PARTE</button>';
    return;
  }
  state.draftOrders=state.draftOrders||{};
  $("#orders-list").innerHTML=map.units.map(def=>{
    const u=state.units[def.id];
    const chosen=state.draftOrders[def.id]||u.order;
    const pos=E.unitPos(state,def.id);
    const ahead=map.enemies.filter(e=>e.route===def.id&&!E.enemyCleared(e,state)&&e.u>pos&&state.contacts[e.id]).sort((a,b)=>a.u-b.u)[0];
    const c=ahead&&state.contacts[ahead.id];
    const aheadText=c?(c.level==="confirmed"?"Por delante: "+c.label+" (confirmado).":"Por delante: ¿"+c.label+"? (sin confirmar)."):"Sin contactos conocidos por delante.";
    const f=state.formations.find(x=>x.id===def.id);
    return '<article class="order-card">'+
      '<div class="order-head"><strong>'+f.name+'</strong><small>'+E.placeName(map.routes[def.id],u.known.pos)+(state.clock-u.known.clock>=30?" · último parte "+E.formatTime(u.known.clock):"")+' · preparación '+f.readiness+'%</small><small class="order-ahead">'+aheadText+'</small></div>'+
      '<div class="order-options" role="radiogroup" aria-label="Orden para '+esc(f.name)+'">'+Object.entries(E.ORDERS).map(([id,o])=>
        '<button class="order-option'+(id===chosen?" selected":"")+'" data-unit="'+def.id+'" data-order="'+id+'" role="radio" aria-checked="'+(id===chosen)+'" title="'+esc(o.desc)+'">'+o.label+'</button>'
      ).join("")+'</div>'+
      '<p class="order-desc">'+E.ORDERS[chosen].desc+'</p>'+
    '</article>';
  }).join("");
}
function executeTurn(){
  const orders={};
  for(const def of getCampaign().map.units)orders[def.id]=(state.draftOrders&&state.draftOrders[def.id])||state.units[def.id].order;
  state.draftOrders=null;
  E.runTurn(getCampaign(),state,orders);
  renderGame();
}
function continueTurn(){
  E.advance(getCampaign(),state);
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderEngineScene(){
  const scene=getCampaign().scenes[state.sceneId];
  if(!scene)return;
  $("#scene-title").textContent=scene.title;
  $("#scene-from").textContent=scene.from;
  $("#scene-urgency").textContent=scene.urgency;
  $("#scene-classification").textContent=scene.classification;
  $("#scene-body").innerHTML=E.texts(scene.body,state).map(p=>"<p>"+p+"</p>").join("");
  renderSceneVisuals(scene);
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
  const ev=E.evaluate(getCampaign(),state);
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
  if(!E.choose(getCampaign(),state,id))return;
  renderGame();
}
function continueEngineScene(){
  if(!state.nextScene)return;
  E.advance(getCampaign(),state);
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}
function restartChapter(){
  if(!confirm("¿Empezar de nuevo el capítulo? Se perderán tus decisiones y el estado actual."))return;
  const encyclopedia=state.encyclopedia;
  state=freshState(state.chapter);
  state.encyclopedia=encyclopedia;
  renderGame();
  window.scrollTo({top:0,behavior:"smooth"});
}

$("#login-tab").addEventListener("click",()=>setAuthMode("login"));
$("#register-tab").addEventListener("click",()=>setAuthMode("register"));
$("#auth-form").addEventListener("submit",handleAuth);
$("#start-chapter").addEventListener("click",()=>{state.stage="scene";renderGame();window.scrollTo({top:0,behavior:"smooth"});});
// Las escenas del motor usan delegación; las del prólogo conservan sus propios manejadores.
$("#situation-panel").addEventListener("click",e=>{
  if(!isEngine())return;
  const choice=e.target.closest("[data-choice]");
  if(choice&&!choice.disabled){chooseOrder(choice.dataset.choice);return}
  if(e.target.closest("#continue-button")){continueEngineScene();return}
  if(e.target.closest("#restart-button"))restartChapter();
});
$("#orders-panel").addEventListener("click",e=>{
  const opt=e.target.closest("[data-order]");
  if(opt){state.draftOrders=state.draftOrders||{};state.draftOrders[opt.dataset.unit]=opt.dataset.order;renderOrders();saveGame();return}
  if(e.target.closest("#execute-turn")){executeTurn();return}
  if(e.target.closest("#turn-continue"))continueTurn();
});
$("#encyclopedia-button").addEventListener("click",openEncyclopedia);
$("#close-encyclopedia").addEventListener("click",()=>$("#encyclopedia-dialog").close());
$("#encyclopedia-dialog").addEventListener("click",e=>{if(e.target===$("#encyclopedia-dialog"))$("#encyclopedia-dialog").close()});
$("#encyclopedia-search").addEventListener("input",renderEncyclopedia);
$("#encyclopedia-category").addEventListener("change",renderEncyclopedia);
$("#armory-button").addEventListener("click",()=>{$("#armory-dialog").showModal();renderArmory();});
$("#close-armory").addEventListener("click",()=>$("#armory-dialog").close());
$("#armory-dialog").addEventListener("click",e=>{if(e.target===$("#armory-dialog"))$("#armory-dialog").close()});
$$(".armory-filter").forEach(b=>b.addEventListener("click",()=>{armoryFilter=b.dataset.armoryFilter;renderArmory();}));
$("#sources-button").addEventListener("click",()=>$("#sources-dialog").showModal());
$("#close-sources").addEventListener("click",()=>$("#sources-dialog").close());
$("#chapters-button").addEventListener("click",()=>$("#chapters-dialog").showModal());
$("#close-chapters").addEventListener("click",()=>$("#chapters-dialog").close());
$("#sources-dialog").addEventListener("click",e=>{if(e.target===$("#sources-dialog"))$("#sources-dialog").close()});
$("#chapters-dialog").addEventListener("click",e=>{if(e.target===$("#chapters-dialog"))$("#chapters-dialog").close()});
$("#logout-button").addEventListener("click",()=>{setSession(null);currentUser=null;state=null;showAuth()});

ensureCampaignStyles();
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