"use strict";
// Interfaz del puesto de mando en tiempo pausable. Lee el estado de command.js y lo dibuja;
// las únicas acciones del jugador son controlar el tiempo, transmitir órdenes y trasladar el puesto de mando.
// Depende de globales de app.js: state, saveGame, renderGame, freshState, scenarioOf.

const FrontlineCommandUI=(()=>{
  const C=FrontlineCommand;
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=v=>String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

  let mounted=false,visible=false,raf=null,lastTs=null,acc=0,lastRender=0;
  let speed=0,pauseReason="Reloj detenido: da tus órdenes iniciales y pulsa ×1, ×5 o ×15 para empezar.";
  const ui={selected:null,draft:null,picking:null,onlyImportant:false,shownEvents:new Set(),lastSave:0};

  const scn=()=>scenarioOf();
  const cs=()=>state.cmd;
  const unitDef=id=>scn().units.find(u=>u.id===id);

  /* ---------- ciclo de vida ---------- */
  function show(){
    if(!mounted)mount();
    visible=true;
    // Al cargar una partida, los eventos ya recibidos no se vuelven a abrir.
    if(ui.loadedFor!==cs()){ui.loadedFor=cs();for(const m of cs().messages)if(m.delivered&&m.event)ui.shownEvents.add(m.id)}
    render();
    if(!raf){lastTs=null;raf=requestAnimationFrame(frame)}
    if(cs().ended)openEvaluation();
  }
  function hide(){
    visible=false;speed=0;
    if(raf){cancelAnimationFrame(raf);raf=null}
  }
  function mount(){
    mounted=true;
    q("#command-shell").addEventListener("click",onClick);
    q("#cmd-only-important").addEventListener("change",e=>{ui.onlyImportant=e.target.checked;renderMessages()});
    q("#event-close").addEventListener("click",()=>q("#event-dialog").close());
    q("#evaluation-dialog").addEventListener("click",e=>{
      if(e.target.closest("[data-restart]"))restart();
      else if(e.target.closest("[data-eval-close]"))q("#evaluation-dialog").close();
    });
    document.addEventListener("keydown",e=>{
      if(!visible||e.code!=="Space"||/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement?.tagName||""))return;
      e.preventDefault();
      setSpeed(speed?0:5);
    });
  }

  /* ---------- tiempo ---------- */
  function setSpeed(v){
    if(cs().ended)v=0;
    speed=v;
    if(v>0)pauseReason="";
    renderTimebar();
  }
  function frame(ts){
    raf=requestAnimationFrame(frame);
    if(!visible)return;
    if(lastTs==null){lastTs=ts;return}
    const dt=Math.min(.25,(ts-lastTs)/1000);lastTs=ts;
    let changed=false;
    if(speed>0&&!cs().ended){
      acc+=dt*speed;
      let n=Math.floor(acc);acc-=n;
      while(n-->0){
        const r=C.step(scn(),cs());
        changed=true;
        if(r.pause){acc=0;onPause();break}
      }
    }
    if(changed&&ts-lastRender>110){render(false);lastRender=ts}
    if(cs().clock-ui.lastSave>=60){ui.lastSave=cs().clock;saveGame()}
  }
  function onPause(){
    speed=0;
    const s=cs();
    if(s.ended){pauseReason="Fin de la jornada.";render();saveGame();openEvaluation();return}
    const fresh=s.messages.filter(m=>m.delivered&&m.pause&&!m.ack);
    fresh.forEach(m=>m.ack=true);
    const last=fresh[fresh.length-1];
    pauseReason=last?"Pausa · "+(last.kind==="event"||last.apply?"":last.from+": ")+last.text+(last.deliverAt-last.sentAt>=15?" (parte enviado a las "+C.fmtTime(last.sentAt)+")":""):"Pausa.";
    renderGame();
    const ev=fresh.find(m=>m.event&&!ui.shownEvents.has(m.id));
    if(ev){ui.shownEvents.add(ev.id);openEvent(ev)}
    saveGame();
  }

  /* ---------- clics ---------- */
  function onClick(e){
    const t=e.target;
    const sp=t.closest("[data-speed]");if(sp){setSpeed(+sp.dataset.speed);return}
    if(t.closest("#cmd-end-day")){if(C.endDay(scn(),cs())){speed=0;onPause()}return}
    const unit=t.closest("[data-unit]");if(unit&&!ui.picking){select(unit.dataset.unit);return}
    if(t.closest("[data-hq]")&&!ui.picking){select("hq");return}
    const node=t.closest("[data-node]");if(node&&ui.picking){pickNode(node.dataset.node);return}
    // Al elegir un destino basta con hacer clic cerca del lugar.
    if(ui.picking&&t.closest("#cmd-map svg")){const n=nearestNode(e,t.closest("svg"));if(n){pickNode(n);return}}
    if(unit&&ui.picking){const n=C.unitNode(cs().known[unit.dataset.unit]||{});if(n)pickNode(n);return}
    const ot=t.closest("[data-otype]");if(ot){setDraft({type:ot.dataset.otype});if(C.ORDER_TYPES[ot.dataset.otype].needsTarget&&!ui.draft.target)ui.picking="target";renderOrder();renderMap();return}
    const st=t.closest("[data-stance]");if(st){setDraft({stance:st.dataset.stance});renderOrder();return}
    const rt=t.closest("[data-route]");if(rt){setDraft({avoidForest:rt.dataset.route==="avoid"});renderOrder();renderMap();return}
    const sa=t.closest("[data-start]");if(sa){setDraft({startOffset:+sa.dataset.start});renderOrder();return}
    if(t.closest("[data-artillery]")){setDraft({artillery:!ui.draft.artillery});renderOrder();return}
    if(t.closest("[data-pick]")){ui.picking=ui.selected==="hq"?"hq":"target";renderOrder();renderMap();return}
    if(t.closest("[data-send]")){sendOrder();return}
    if(t.closest("[data-cancel]")){ui.selected=null;ui.draft=null;ui.picking=null;render();return}
    if(t.closest("[data-accept-proposal]")){acceptProposal(+t.closest("[data-accept-proposal]").dataset.acceptProposal);return}
  }
  function nearestNode(e,svg){
    const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;
    const p=pt.matrixTransform(svg.getScreenCTM().inverse());
    let best=null,bd=45;
    for(const [id,n] of Object.entries(scn().nodes)){const d=Math.hypot(n.x-p.x,n.y-p.y);if(d<bd){bd=d;best=id}}
    return best;
  }
  function select(id){
    ui.selected=id;ui.picking=null;
    ui.draft=id==="hq"?null:{unit:id,type:null,target:null,stance:"normal",avoidForest:false,startOffset:0,artillery:false};
    render();
  }
  function setDraft(p){
    Object.assign(ui.draft,p);
    if(p.type&&!C.ORDER_TYPES[p.type].needsTarget){ui.draft.target=null;ui.picking=null}
    if(p.type&&p.type!=="attack")ui.draft.artillery=false;
  }
  function pickNode(n){
    if(ui.picking==="hq"){
      if(C.moveHQ(scn(),cs(),n)){ui.picking=null;ui.selected=null;renderGame()}
      return;
    }
    ui.draft.target=n;ui.picking=null;
    renderOrder();renderMap();
  }
  function draftOrder(){
    const d=ui.draft;
    return{unit:d.unit,type:d.type,target:d.target,stance:d.stance,avoidForest:d.avoidForest,artillery:d.artillery,
      startAt:d.startOffset?Math.max(cs().clock,scn().hHour)+d.startOffset:0};
  }
  function sendOrder(){
    const d=ui.draft;
    if(!d||!d.type||(C.ORDER_TYPES[d.type].needsTarget&&!d.target))return;
    C.issueOrder(scn(),cs(),draftOrder());
    ui.selected=null;ui.draft=null;ui.picking=null;
    saveGame();renderGame();
  }
  function acceptProposal(msgId){
    const m=cs().messages.find(x=>x.id===msgId);
    if(!m||m.accepted)return;
    m.accepted=true;
    for(const p of scn().proposal)C.issueOrder(scn(),cs(),p);
    saveGame();renderGame();
  }
  function restart(){
    q("#evaluation-dialog").close();
    const enc=state.encyclopedia;
    state=freshState(state.chapter);
    state.encyclopedia=enc;state.stage="command";ui.loadedFor=state.cmd;
    ui.selected=null;ui.draft=null;ui.picking=null;ui.shownEvents=new Set();ui.lastSave=0;
    speed=0;pauseReason="Reloj detenido: da tus órdenes iniciales y pulsa ×1, ×5 o ×15 para empezar.";
    renderGame();
  }

  /* ---------- dibujo ---------- */
  function render(full=true){
    renderTimebar();
    renderUnits();
    renderMap();
    renderMessages();
    if(full)renderOrder();
  }
  function renderTimebar(){
    const s=cs(),sc=scn();
    q("#cmd-date").textContent=C.fmtDate(s.clock);
    q("#cmd-time").textContent=C.fmtTime(s.clock);
    q("#scene-date").textContent=C.fmtDate(s.clock);
    q("#scene-time").textContent=C.fmtTime(s.clock);
    q("#cmd-phase").textContent=s.clock<sc.hHour?"ANTES DEL ATAQUE":C.isFog(sc,s.clock)?"NIEBLA":C.isNight(sc,s.clock)?"NOCHE":"DÍA";
    qa("[data-speed]").forEach(b=>b.classList.toggle("active",+b.dataset.speed===speed));
    q("#cmd-pause-reason").textContent=speed?"":pauseReason;
    q("#cmd-pause-reason").classList.toggle("hidden",!!speed||!pauseReason);
    const endBtn=q("#cmd-end-day");
    endBtn.disabled=s.clock<sc.endEarliest||s.ended;
    endBtn.title=s.clock<sc.endEarliest?"Disponible a partir de las "+C.fmtTime(sc.endEarliest):"";
  }

  function knownUnit(id){
    const k=cs().known[id];
    return{node:k.node,edge:k.edge,status:k.status};
  }
  function ago(t){const m=cs().clock-t;return m<5?"ahora":m<60?"hace "+Math.round(m)+" min":"hace "+C.fmtDur(m)}
  function lastOrder(id){return[...cs().orders].reverse().find(o=>o.unit===id)}
  function orderLine(o){
    if(!o)return"Sin órdenes desde el inicio.";
    const t=C.ORDER_TYPES[o.type].label+(o.target?" → "+scn().nodes[o.target].name:"");
    return o.status==="transit"&&cs().clock<o.deliverAt?"Orden en camino ("+t+"), llega ≈ "+C.fmtTime(o.deliverAt)+".":"Última orden: "+t+" (enviada "+C.fmtTime(o.issuedAt)+").";
  }
  function bar(label,v,warn){return'<div class="cmd-bar'+(warn?" warn":"")+'"><small>'+label+" "+Math.round(v)+' %</small><i style="width:'+Math.max(0,Math.min(100,v))+'%"></i></div>'}

  function renderUnits(){
    const s=cs(),sc=scn();
    const cards=sc.units.map(def=>{
      const k=s.known[def.id];
      const status=C.statusText(sc,knownUnit(def.id));
      return'<button class="cmd-unit'+(ui.selected===def.id?" selected":"")+'" data-unit="'+def.id+'">'+
        '<strong>'+esc(def.name)+'</strong>'+
        '<span class="cmd-status">'+esc(status)+'</span>'+
        '<small>Parte de las '+C.fmtTime(k.clock)+' · '+ago(k.clock)+'</small>'+
        '<div class="cmd-bars">'+bar("COMBUSTIBLE",k.fuel,k.fuel<35)+bar("MUNICIÓN",k.ammo,k.ammo<35)+'</div>'+
        '<small>Efectivos ≈ '+Math.round(k.men).toLocaleString("es-ES")+(k.fatigue!=null?' · fatiga '+k.fatigue+' %':'')+'</small>'+
        '<small class="cmd-orderline">'+esc(orderLine(lastOrder(def.id)))+'</small>'+
      '</button>';
    });
    const hq=s.hq,art=s.artillery;
    cards.push('<button class="cmd-unit cmd-hq'+(ui.selected==="hq"?" selected":"")+'" data-hq="1"><strong>'+esc(sc.hq.name)+'</strong><span class="cmd-status">'+
      (hq.edge||hq.path.length?"Trasladándose hacia "+esc(sc.nodes[hq.path[hq.path.length-1]||hq.edge.to].name):"En "+esc(sc.nodes[hq.node].name))+'</span>'+
      '<small>'+(art.busyUntil>s.clock?"Artillería del cuerpo ocupada hasta las "+C.fmtTime(art.busyUntil):"Artillería del cuerpo disponible")+'</small></button>');
    q("#cmd-units").innerHTML=cards.join("");
  }

  function renderOrder(){
    const host=q("#cmd-order"),sc=scn(),s=cs();
    if(!ui.selected){
      q("#cmd-order-unit").textContent="—";
      host.innerHTML='<p class="cmd-help">Selecciona una división en la lista o en el mapa para darle una orden. Selecciona el puesto de mando para trasladarlo.</p>'+
        '<p class="cmd-help">Las órdenes no son instantáneas: tardan en llegar (más cuanto más lejos esté la división del puesto de mando) y la división necesita tiempo para prepararlas.</p>';
      return;
    }
    if(ui.selected==="hq"){
      q("#cmd-order-unit").textContent="PUESTO DE MANDO";
      host.innerHTML='<p class="cmd-help">Cerca de una división, tus órdenes le llegan antes y sus partes también. Lejos de las demás, todo tarda más. Durante el traslado la radio funciona peor.</p>'+
        (ui.picking==="hq"?'<p class="cmd-pick">Haz clic en el mapa sobre el lugar de destino.</p>':'<button class="primary cmd-wide" data-pick>TRASLADAR EL PUESTO DE MANDO</button>')+
        '<button class="ghost cmd-wide" data-cancel>CERRAR</button>';
      return;
    }
    const def=unitDef(ui.selected),d=ui.draft,k=s.known[def.id];
    q("#cmd-order-unit").textContent=def.short.toUpperCase();
    const types=Object.entries(C.ORDER_TYPES).map(([id,t])=>'<button class="cmd-opt'+(d.type===id?" selected":"")+'" data-otype="'+id+'">'+t.label+'</button>').join("");
    let html='<p class="cmd-unit-line">'+esc(C.statusText(sc,knownUnit(def.id)))+' · parte de las '+C.fmtTime(k.clock)+'</p>'+
      '<div class="cmd-opts cmd-types">'+types+'</div>';
    if(d.type){
      const t=C.ORDER_TYPES[d.type];
      html+='<p class="cmd-help">'+t.desc+'</p>';
      if(t.needsTarget){
        html+='<div class="cmd-row"><span>OBJETIVO</span>'+(ui.picking==="target"?'<em class="cmd-pick">Haz clic en el mapa sobre el objetivo</em>':
          (d.target?'<b>'+esc(sc.nodes[d.target].name)+'</b> <button class="ghost cmd-mini" data-pick>CAMBIAR</button>':'<button class="ghost cmd-mini" data-pick>ELEGIR EN EL MAPA</button>'))+'</div>';
        html+='<div class="cmd-row"><span>RUTA</span><div class="cmd-opts"><button class="cmd-opt'+(!d.avoidForest?" selected":"")+'" data-route="fast">MÁS RÁPIDA</button><button class="cmd-opt'+(d.avoidForest?" selected":"")+'" data-route="avoid">EVITAR BOSQUES</button></div></div>';
      }
      html+='<div class="cmd-row"><span>POSTURA</span><div class="cmd-opts">'+Object.entries(C.STANCES).map(([id,x])=>'<button class="cmd-opt'+(d.stance===id?" selected":"")+'" data-stance="'+id+'">'+x.label+'</button>').join("")+'</div></div>';
      html+='<div class="cmd-row"><span>INICIO</span><div class="cmd-opts">'+[[0,"AL RECIBIRLA"],[30,"+30 MIN"],[60,"+1 H"],[120,"+2 H"]].map(([v,l])=>'<button class="cmd-opt'+(d.startOffset===v?" selected":"")+'" data-start="'+v+'">'+l+'</button>').join("")+'</div></div>';
      if(d.type==="attack"){
        const busy=s.artillery.busyUntil>s.clock;
        html+='<div class="cmd-row"><span>APOYO</span><div class="cmd-opts"><button class="cmd-opt'+(d.artillery?" selected":"")+'" data-artillery'+(busy?" disabled":"")+'>'+(busy?"ARTILLERÍA OCUPADA":d.artillery?"ARTILLERÍA DEL CUERPO ✓":"PEDIR ARTILLERÍA DEL CUERPO")+'</button></div></div>';
      }
      const ready=!t.needsTarget||d.target;
      if(ready){
        const est=C.estimate(sc,s,draftOrder());
        html+='<div class="cmd-estimate"><span class="eyebrow">CÁLCULO DEL ESTADO MAYOR</span><ul>'+
          '<li>Transmisión ≈ '+C.fmtDur(est.delay)+' ('+(est.byRadio?"radio":"enlace motorizado")+')</li>'+
          '<li>Preparación ≈ '+C.fmtDur(est.prep)+'</li>'+
          '<li>Inicio ≈ '+C.fmtTime(Math.max(est.startAt,sc.hHour))+'</li>'+
          (est.route?'<li>Ruta: '+Math.round(est.route.km)+' km · llegada ≈ '+C.fmtTime(Math.max(est.startAt,sc.hHour)+est.travel)+'</li><li>Combustible necesario ≈ '+est.fuel+' %</li>':'')+
          '</ul>'+(est.warnings.length?'<div class="cmd-warnings">'+est.warnings.map(w=>"<p>⚠ "+esc(w)+"</p>").join("")+'</div>':"")+
          '<p class="cmd-note">Cálculo con la información disponible. La realidad decidirá.</p></div>';
        html+='<button class="primary cmd-wide" data-send>TRANSMITIR ORDEN</button>';
      }
    }
    html+='<button class="ghost cmd-wide" data-cancel>CANCELAR</button>';
    host.innerHTML=html;
  }

  function renderMessages(){
    const s=cs();
    const list=s.messages.filter(m=>m.delivered&&(!ui.onlyImportant||m.pause||m.kind==="staff"||m.proposal)).sort((a,b)=>b.deliverAt-a.deliverAt||b.id-a.id);
    const unread=s.messages.filter(m=>m.delivered&&!m.seen).length;
    q("#cmd-unread").textContent=unread?unread+" NUEVOS":"";
    q("#cmd-messages").innerHTML=list.slice(0,80).map(m=>{
      const late=m.deliverAt-m.sentAt>=5;
      const ev=m.event&&scn().events.find(e=>e.id===m.event);
      return'<article class="cmd-msg '+m.kind+(m.seen?"":" unread")+'">'+
        '<header><b>'+C.fmtTime(m.deliverAt)+'</b><span>'+esc(m.from)+'</span></header>'+
        (late?'<small class="cmd-late">Enviado a las '+C.fmtTime(m.sentAt)+'</small>':"")+
        '<p>'+esc(ev?ev.title+". "+ev.text.join(" "):m.text)+'</p>'+
        (m.proposal&&!m.accepted&&s.clock<scn().hHour+120?'<button class="primary cmd-mini" data-accept-proposal="'+m.id+'">ACEPTAR LA PROPUESTA DEL IA</button>':"")+
        (m.proposal&&m.accepted?'<small>Propuesta aceptada: órdenes transmitidas.</small>':"")+
      '</article>';
    }).join("");
    if(visible&&unread&&!ui.seenTimer)ui.seenTimer=setTimeout(()=>{ui.seenTimer=null;for(const m of cs().messages)if(m.delivered)m.seen=true;renderMessages()},2500);
  }

  /* ---------- mapa ---------- */
  function renderMap(){
    const sc=scn(),s=cs(),m=sc.map,P=[];
    P.push('<rect class="m-bg" x="0" y="0" width="'+m.width+'" height="'+m.height+'"/>');
    for(const f of m.forests)P.push('<path class="m-forest" d="'+f.d+'"/><text class="m-forest-label" x="'+f.lx+'" y="'+f.ly+'" text-anchor="middle">'+esc(f.label)+'</text>');
    P.push('<path class="m-border" d="'+m.border+'"/><text class="m-border-label" x="158" y="584">FRONTERA DE 1939</text>');
    for(const r of m.rivers)P.push('<path class="m-river" d="'+r.d+'"/><text class="m-river-label" x="'+r.lx+'" y="'+r.ly+'">'+esc(r.name)+'</text>');
    for(const [a,b,km,type] of sc.edges){
      const A=sc.nodes[a],B=sc.nodes[b];
      P.push('<line class="m-edge '+type+'" x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'"/>');
    }
    // Ruta prevista de la orden en preparación.
    const d=ui.draft;
    if(d&&d.target&&d.type){
      const from=C.unitNode(knownUnit(d.unit));
      const r=C.route(sc,s,unitDef(d.unit),from,d.target,{avoidForest:d.avoidForest});
      if(r)P.push('<polyline class="m-plan" points="'+r.path.map(n=>sc.nodes[n].x+","+sc.nodes[n].y).join(" ")+'"/>');
    }
    // Intenciones del mando: última orden de cada división.
    for(const def of sc.units){
      const o=lastOrder(def.id);
      if(!o||!o.target||o.status==="done")continue;
      const p=C.point(sc,s.known[def.id].node,s.known[def.id].edge),T=sc.nodes[o.target];
      P.push('<line class="m-intent" x1="'+p.x+'" y1="'+p.y+'" x2="'+T.x+'" y2="'+T.y+'"/>');
    }
    for(const [id,n] of Object.entries(sc.nodes)){
      const pick=ui.picking?" pickable":"";
      const bridge=n.bridge?s.knownBridges?.[n.bridge]:null;
      P.push('<g class="m-node '+n.terrain+pick+'" data-node="'+id+'"><circle cx="'+n.x+'" cy="'+n.y+'" r="'+(ui.picking?11:6)+'"/>'+
        (n.terrain==="assembly"&&!ui.picking?"":'<text x="'+(n.x+9)+'" y="'+(n.y+18)+'">'+esc(n.name)+(bridge==="blown"?" · puente volado":bridge==="captured"?" · puente tomado":"")+'</text>')+'</g>');
    }
    for(const [id,c] of Object.entries(s.contacts)){
      const n=sc.nodes[c.node];if(!n)continue;
      const age=s.clock-c.clock;
      P.push('<g class="m-enemy '+(c.level==="confirmed"?"confirmed":"estimated")+'"><path d="M'+n.x+' '+(n.y-13)+' L'+(n.x+13)+' '+n.y+' L'+n.x+' '+(n.y+13)+' L'+(n.x-13)+' '+n.y+' Z"/>'+
        '<text x="'+n.x+'" y="'+(n.y-19)+'" text-anchor="middle">'+esc((c.level==="confirmed"?"":"¿")+c.label+(c.level==="confirmed"?"":"?"))+(age>=60?" · "+C.fmtDur(age):"")+'</text></g>');
    }
    // Órdenes viajando hacia las divisiones.
    const hqP=C.point(sc,s.hq.node,s.hq.edge);
    for(const o of s.orders){
      if(o.status!=="transit"||s.clock>=o.deliverAt)continue;
      const k=s.known[o.unit],p=C.point(sc,k.node,k.edge);
      const f=Math.min(1,(s.clock-o.issuedAt)/Math.max(1,o.deliverAt-o.issuedAt));
      P.push('<line class="m-transit" x1="'+hqP.x+'" y1="'+hqP.y+'" x2="'+p.x+'" y2="'+p.y+'"/><circle class="m-envelope" cx="'+(hqP.x+(p.x-hqP.x)*f)+'" cy="'+(hqP.y+(p.y-hqP.y)*f)+'" r="5"/>');
    }
    for(const def of sc.units){
      const k=s.known[def.id],p=C.point(sc,k.node,k.edge);
      const stale=s.clock-k.clock>=45;
      const sel=ui.selected===def.id;
      const sym=def.kind==="panzer"?'<rect class="m-sym" x="-14" y="-7" width="28" height="14" rx="7"/>':'<path class="m-sym" d="M-21 -13 L21 13 M21 -13 L-21 13"/>';
      P.push('<g class="m-unit'+(stale?" stale":"")+(sel?" selected":"")+(k.status==="combat"?" combat":"")+'" data-unit="'+def.id+'" transform="translate('+p.x.toFixed(1)+' '+p.y.toFixed(1)+')">'+
        '<rect class="m-box" x="-22" y="-14" width="44" height="28"/>'+sym+
        '<text class="m-unit-name" y="30" text-anchor="middle">'+esc(def.short)+'</text>'+
        (stale?'<text class="m-unit-age" y="42" text-anchor="middle">parte '+C.fmtTime(k.clock)+'</text>':"")+'</g>');
    }
    P.push('<g class="m-hq'+(ui.selected==="hq"?" selected":"")+'" data-hq="1" transform="translate('+hqP.x.toFixed(1)+' '+(hqP.y-34).toFixed(1)+')"><path d="M0 22 L0 -6"/><path class="m-flag" d="M0 -6 L18 -1 L0 4 Z"/><text y="-10" text-anchor="middle">PUESTO DE MANDO</text></g>');
    q("#cmd-map").innerHTML='<svg viewBox="0 0 '+m.width+' '+m.height+'" role="img" aria-label="Croquis operacional con las divisiones del cuerpo según sus últimos partes y los contactos conocidos">'+P.join("")+'</svg>';
    q("#cmd-map").classList.toggle("picking",!!ui.picking);
    q("#cmd-map-hint").textContent=ui.picking==="target"?"ELIGE EL OBJETIVO":ui.picking==="hq"?"ELIGE EL DESTINO DEL PUESTO DE MANDO":C.fmtTime(s.clock);
  }

  /* ---------- eventos y balance ---------- */
  function openEvent(m){
    const ev=scn().events.find(e=>e.id===m.event);
    if(!ev)return;
    q("#event-from").textContent=ev.from;
    q("#event-title").textContent=ev.title;
    q("#event-time").textContent=C.fmtDate(m.deliverAt)+" · "+C.fmtTime(m.deliverAt);
    q("#event-body").innerHTML=(ev.text||[]).map(p=>"<p>"+p+"</p>").join("");
    q("#event-history").innerHTML=(ev.historical||[]).map(p=>"<p>"+p+"</p>").join("");
    q("#event-dialog .historical-box").classList.toggle("hidden",!(ev.historical||[]).length);
    if(!q("#event-dialog").open)q("#event-dialog").showModal();
  }
  function openEvaluation(){
    const ev=C.evaluate(scn(),cs());
    q("#evaluation-content").innerHTML='<div class="evaluation">'+
      '<div class="evaluation-head"><span class="eyebrow">BALANCE PARA LA 4. ARMEE · '+C.fmtTime(cs().clock)+'</span><h3>'+ev.verdict.title+'</h3><div class="evaluation-score"><strong>'+ev.score+'</strong><small>/ 100</small></div></div>'+
      '<p class="evaluation-verdict">'+ev.verdict.text+'</p>'+
      '<div class="evaluation-rows">'+ev.rows.map(r=>'<div class="evaluation-row"><div><strong>'+r.label+'</strong><small>'+esc(r.text)+'</small></div><b>'+r.points+'/'+r.max+'</b></div>').join("")+'</div>'+
      '<div class="evaluation-history"><span class="eyebrow">LO QUE OCURRIÓ EN LA HISTORIA</span>'+ev.history.map(h=>"<p>"+h+"</p>").join("")+'</div>'+
      '<p class="evaluation-hint">Cada partida decide en secreto la fuerza de Chojnice, el estado de los puentes del Brda y dónde está la caballería polaca.</p>'+
      '<div class="evaluation-actions"><button class="ghost" data-eval-close>VER EL MAPA</button><button class="primary" data-restart>JUGAR DE NUEVO EL 1 DE SEPTIEMBRE</button></div></div>';
    if(!q("#evaluation-dialog").open)q("#evaluation-dialog").showModal();
  }

  return{show,hide};
})();
