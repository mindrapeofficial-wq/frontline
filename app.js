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
// Las campañas con mode "command" se juegan en el puesto de mando en tiempo pausable (command.js).
function isCommand(campaign=getCampaign()){return campaign.mode==="command";}
function scenarioOf(campaign=getCampaign()){return window.FRONTLINE_SCENARIOS?.[campaign.scenario];}

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
  if(isCommand(campaign)){
    return{chapter,mode:"command",stage:"dossier",cmd:FrontlineCommand.newGame(scenarioOf(campaign)),encyclopedia:{unlocked:[],unread:[]}};
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
function nextChapter(){
  const list=FRONTLINE_DATA.chapters;
  const i=list.findIndex(c=>c.id===state.chapter);
  const next=list[i+1];
  return next&&next.status==="available"&&FRONTLINE_DATA.campaigns[next.id]?next:null;
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
    // Una partida guardada con otro formato (versiones anteriores del capítulo) se reinicia conservando la enciclopedia.
    if(isCommand(getCampaign(saved.chapter))&&(saved.mode!=="command"||saved.cmd?.version!==1)){
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
  if(isCommand()){
    renderSources();
    renderChapters();
    renderArmory();
    renderEncyclopedia();
    renderStage();
    saveGame();
    return;
  }
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
      '<small>'+f.position+'</small>'+
      '<div class="formation-bars">'+
        '<div><small>PREPARACIÓN '+clamp(f.readiness)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.readiness)+'%"></i></div></div>'+
        '<div><small>SUMINISTRO '+clamp(f.supply)+'%</small><div class="mini-bar"><i style="width:'+clamp(f.supply)+'%"></i></div></div>'+
      '</div>'+
    '</article>'
  ).join("");
}
function renderStaff(){
  $("#staff-list").innerHTML=getCampaign().staff.map(s=>{
    let note=s.note;
    if(state.resources.cohesion<72&&s.id==="ia")note="Las diferencias de ritmo entre las columnas empiezan a preocupar a Operaciones. Keller pide reducir órdenes simultáneas.";
    if(state.resources.reconnaissance>60&&s.id==="ic")note="La imagen táctica está mejorando. Weber recuerda que un informe correcto hace treinta minutos puede ser falso ahora.";
    if(state.resources.fuel<72&&s.id==="qu")note="La situación de combustible sigue siendo utilizable, pero Hartmann exige evitar movimientos sin objetivo operativo claro.";
    return '<article class="staff-card"><span>'+s.rank+' · '+s.role+'</span><strong>'+s.name+(s.fictional?' <small>· ficticio</small>':'')+'</strong><p>'+note+'</p><div class="staff-trust">Confianza profesional: '+s.trust+'/100</div></article>';
  }).join("");
}
function renderIntel(){
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
  const scene=campaign.scenes?.[state?.sceneId];
  const source=isCommand(campaign)?campaign.startDate:scene?.date||campaign.startDate||"1938";
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
  if(isCommand(campaign)){
    parts.push(...(campaign.dossier||[]));
    (campaign.formations||[]).forEach(f=>parts.push(f.name,f.commander,f.role));
    (campaign.staff||[]).filter(s=>!s.fictional).forEach(s=>parts.push(s.name,s.rank,s.role));
    if(state.cmd&&state.stage!=="dossier"){
      const scn=scenarioOf(campaign);
      state.cmd.messages.filter(m=>m.delivered).slice(-40).forEach(m=>parts.push(m.text));
      Object.values(state.cmd.contacts).forEach(c=>parts.push(c.name));
      state.cmd.firedEvents.forEach(id=>{const ev=scn.events.find(e=>e.id===id);if(ev)parts.push(...(ev.text||[]),...(ev.historical||[]))});
    }
    return parts.filter(Boolean).join(" ");
  }
  if(state.stage==="dossier"){
    parts.push(...(campaign.dossier||[]));
    (campaign.formations||[]).forEach(f=>parts.push(f.name,f.commander,f.role,f.position));
    (campaign.staff||[]).filter(s=>!s.fictional).forEach(s=>parts.push(s.name,s.rank,s.role));
  }else{
    const scene=campaign.scenes?.[state.sceneId];
    if(scene){
      parts.push(scene.title,scene.from,scene.urgency,scene.classification,scene.intel);
      parts.push(...(scene.body||[]),...(scene.historical||[]));
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
  const command=isCommand()&&state.stage==="command";
  $(".war-room").classList.toggle("hidden",command);
  $("#command-shell").classList.toggle("hidden",!command);
  if(command){FrontlineCommandUI.show();return}
  FrontlineCommandUI.hide();
  $("#start-chapter").textContent=isCommand()?"ABRIR EL PUESTO DE MANDO":"ABRIR PRIMER PARTE DE SITUACIÓN";
  const dossier=$("#dossier-panel"),situation=$("#situation-panel");
  if(state.stage==="dossier"){
    dossier.classList.remove("hidden");
    situation.classList.add("hidden");
    const campaign=getCampaign();
    $("#dossier-text").innerHTML=campaign.dossier.map(p=>"<p>"+p+"</p>").join("");
    $("#scene-date").textContent=campaign.startDate;
    $("#scene-time").textContent=campaign.startTime;
    renderDossierVisuals();
    $("#skip-to-war").classList.toggle("hidden",state.chapter!=="ch0");
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
    const next=nextChapter();
    choices.innerHTML='<div class="decision-result"><strong>'+(state.chapter==="ch0"?"FIN DEL PRÓLOGO":"FIN DEL CAPÍTULO")+'</strong><br>'+String(scene.endText||"Capítulo completado.").replace(/\n/g,"<br>")+
      (next?'<button class="continue-button" data-next-chapter="'+next.id+'">CONTINUAR · '+next.year+' · '+next.title+'</button>':"")+'</div>';
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


$("#login-tab").addEventListener("click",()=>setAuthMode("login"));
$("#register-tab").addEventListener("click",()=>setAuthMode("register"));
$("#auth-form").addEventListener("submit",handleAuth);
$("#start-chapter").addEventListener("click",()=>{state.stage=isCommand()?"command":"scene";renderGame();window.scrollTo({top:0,behavior:"smooth"});});
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
// Paso de un capítulo al siguiente (final del prólogo o atajo desde su dossier).
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-next-chapter]");
  if(b&&state)switchChapter(b.dataset.nextChapter);
});
$("#logout-button").addEventListener("click",()=>{FrontlineCommandUI.hide();setSession(null);currentUser=null;state=null;showAuth()});

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