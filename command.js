"use strict";
// Simulación de mando en tiempo continuo (minuto a minuto). Sin acceso al DOM.
// El jugador da órdenes desde su puesto de mando; tardan en llegar, las divisiones
// se preparan, se mueven por la red de caminos, gastan combustible y munición,
// combaten, detectan al enemigo e informan con retraso. El mapa del jugador solo
// muestra lo que esos partes le han contado.

const FrontlineCommand=(()=>{
  const clone=v=>JSON.parse(JSON.stringify(v));
  const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));

  /* ---------- azar determinista por partida ---------- */
  function roll(state,key){
    let h=state.seed>>>0;
    for(const ch of key)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
    h=Math.imul(h^h>>>15,h|1);h^=h+Math.imul(h^h>>>7,h|61);
    return((h^h>>>14)>>>0)/4294967296;
  }
  function pick(state,key,options){
    let r=roll(state,key),acc=0;
    for(const [v,w] of Object.entries(options)){acc+=w;if(r<acc)return v}
    return Object.keys(options).pop();
  }

  /* ---------- tiempo ---------- */
  const DAYS=["31 AGO 1939","1 SEP 1939","2 SEP 1939"];
  const fmtDate=t=>DAYS[Math.floor(t/1440)+1]||DAYS[2];
  const fmtTime=t=>{const m=((Math.floor(t)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0")};
  const fmtDur=m=>{m=Math.round(m);const h=Math.floor(m/60),r=m%60;return(h?h+" h":"")+(h&&r?" ":"")+(r||!h?r+" min":"")};

  /* ---------- red de caminos ---------- */
  function graph(scn){
    if(scn._graph)return scn._graph;
    const adj={};
    for(const id of Object.keys(scn.nodes))adj[id]=[];
    for(const [a,b,km,type,river] of scn.edges){
      adj[a].push({to:b,km,type,river});
      adj[b].push({to:a,km,type,river});
    }
    Object.defineProperty(scn,"_graph",{value:adj,enumerable:false});
    return adj;
  }
  function edge(scn,a,b){return graph(scn)[a].find(e=>e.to===b)}

  // Ruta más corta en tiempo para una unidad. avoidForest penaliza los caminos forestales.
  function route(scn,state,unit,from,to,opts={}){
    const g=graph(scn),dist={},prev={},done=new Set();
    for(const k in g)dist[k]=Infinity;
    dist[from]=0;
    while(true){
      let u=null,best=Infinity;
      for(const k in dist)if(!done.has(k)&&dist[k]<best){best=dist[k];u=k}
      if(u===null||u===to)break;
      done.add(u);
      for(const e of g[u]){
        let cost=e.km/(unit?unit.speed[e.type]:16);
        if(opts.avoidForest&&e.type==="forest")cost*=3;
        if(e.river&&state.bridges[e.river]==="blown")cost*=4;
        if(dist[u]+cost<dist[e.to]){dist[e.to]=dist[u]+cost;prev[e.to]=u}
      }
    }
    if(dist[to]===Infinity)return null;
    const path=[to];let c=to;
    while(c!==from){c=prev[c];path.unshift(c)}
    let km=0;
    for(let i=1;i<path.length;i++)km+=edge(scn,path[i-1],path[i]).km;
    return{path,km,hours:dist[to]};
  }
  function distKm(scn,state,a,b){
    if(a===b)return 0;
    const r=route(scn,state,null,a,b);
    return r?r.km:999;
  }

  /* ---------- estado inicial ---------- */
  function newGame(scn,seed){
    const state={
      version:1,
      seed:seed??((Math.random()*4294967296)>>>0),
      clock:scn.start,
      started:false,
      ended:false,
      hidden:{},
      bridges:{north:"intact",south:"intact"},
      knownBridges:{},
      hq:{node:scn.hq.node,edge:null,path:[],disruptedUntil:0},
      artillery:{busyUntil:0,supporting:null},
      units:{},known:{},
      enemies:{},contacts:{},
      orders:[],
      messages:[],
      firedEvents:[],
      flags:[],
      losses:{men:0,tanks:0},
      nextMsg:1
    };
    for(const [k,o] of Object.entries(scn.hidden))state.hidden[k]=pick(state,"hidden:"+k,o);
    for(const u of scn.units){
      state.units[u.id]={id:u.id,node:u.node,edge:null,path:[],order:null,status:"idle",
        men:u.men,tanks:u.tanks,fuel:100,ammo:100,fatigue:8,readiness:90,stance:"normal",
        engagement:null,lastReport:scn.start-60,km:0};
      state.known[u.id]={node:u.node,edge:null,clock:scn.start,status:"idle",fuel:100,ammo:100,men:u.men};
    }
    for(const e of scn.enemies){
      const node=e.nodeBy?e.nodeBy.map[state.hidden[e.nodeBy.hidden]]:e.node;
      const men=e.menBy?e.menBy.map[state.hidden[e.menBy.hidden]]:e.men;
      state.enemies[e.id]={id:e.id,node,men,menStart:men,status:"hold",moving:null,engagedBy:null};
    }
    message(state,{from:"Ia · Oberst i.G. Keller (ficticio)",kind:"staff",text:"Herr General, el cuerpo está en sus zonas de reunión. El ataque empieza a las 04:45. Propongo: la 3. Panzer-Division sobre Sępólno con apoyo de la artillería del cuerpo, la 2. (mot.) hacia Kamień y la 20. (mot.) contra Chojnice. Puede aceptar la propuesta o dar sus propias órdenes.",proposal:true});
    message(state,{from:"Ic · Major i.G. Weber (ficticio)",kind:"staff",text:"Al otro lado de la frontera solo tenemos estimaciones. Sabemos que Chojnice está defendida y que hay caballería polaca en el sector norte. Lo demás tendremos que descubrirlo."});
    return state;
  }

  /* ---------- mensajes ---------- */
  function message(state,m){
    const msg={id:state.nextMsg++,sentAt:m.sentAt??state.clock,deliverAt:m.deliverAt??state.clock,from:m.from,text:m.text,kind:m.kind||"report",
      pause:!!m.pause,delivered:false,read:false,proposal:!!m.proposal,event:m.event||null,apply:m.apply||null};
    // Lo que ocurre en el propio puesto de mando se conoce al instante.
    if(!msg.apply&&msg.deliverAt<=state.clock&&!msg.pause)msg.delivered=true;
    state.messages.push(msg);
    return msg;
  }

  /* ---------- posición y comunicaciones ---------- */
  function unitNode(u){
    if(!u.edge)return u.node;
    return u.edge.done>=u.edge.km/2?u.edge.to:u.node;
  }
  function hqNode(state){return state.hq.edge?(state.hq.edge.done>=state.hq.edge.km/2?state.hq.edge.to:state.hq.node):state.hq.node}
  function isNight(scn,t){return t>=scn.nightFrom||t<scn.hHour-60}
  function isFog(scn,t){return t>=scn.hHour&&t<scn.fogUntil}

  // Retraso de transmisión entre el puesto de mando y una división.
  function linkDelay(scn,state,unitId,key){
    const u=state.units[unitId];
    const d=distKm(scn,state,hqNode(state),unitNode(u));
    let radio=.85-d/160;
    if(isNight(scn,state.clock))radio-=.1;
    if(state.hq.edge)radio-=.15;
    if(state.clock<state.hq.disruptedUntil)radio-=.3;
    const byRadio=roll(state,key)<radio;
    let delay=byRadio?4+d*.15:12+d/30*60;
    if(state.clock<state.hq.disruptedUntil)delay+=state.hq.disruptedUntil-state.clock;
    return{delay:Math.round(delay),byRadio,km:Math.round(d)};
  }

  /* ---------- órdenes ---------- */
  const ORDER_TYPES={
    move:{label:"MARCHAR",prep:15,needsTarget:true,desc:"Moverse hasta el objetivo por la ruta elegida. Si encuentra al enemigo, combatirá en columna."},
    attack:{label:"ATACAR",prep:45,needsTarget:true,desc:"Avanzar desplegado y atacar el objetivo. Más lento, pero combate con toda su fuerza."},
    recon:{label:"RECONOCER",prep:10,needsTarget:true,desc:"Explorar hacia el objetivo. Detecta mucho mejor y se detiene ante el primer contacto."},
    defend:{label:"DEFENDER",prep:20,needsTarget:false,desc:"Detenerse y organizar la defensa. Resiste mejor y se recupera de la fatiga."},
    resupply:{label:"REABASTECER",prep:0,needsTarget:false,desc:"Detenerse y esperar a los convoyes. Recupera combustible y munición más deprisa."}
  };
  const STANCES={
    cautious:{label:"PRUDENTE",speed:.75,power:.9,detect:.15,prep:1.3},
    normal:{label:"NORMAL",speed:1,power:1,detect:0,prep:1},
    fast:{label:"RÁPIDA",speed:1.25,power:1.05,detect:-.1,prep:.6}
  };

  // Lo que el Estado Mayor calcula antes de transmitir una orden.
  function estimate(scn,state,draft){
    const u=state.known[draft.unit],def=scn.units.find(x=>x.id===draft.unit);
    const t=ORDER_TYPES[draft.type],st=STANCES[draft.stance||"normal"];
    const link=linkDelay(scn,state,draft.unit,"est:"+draft.unit+":"+Math.floor(state.clock/30));
    const prep=Math.round(t.prep*st.prep);
    const startAt=Math.max(state.clock+link.delay+prep,draft.startAt||0);
    const out={delay:link.delay,byRadio:link.byRadio,prep,startAt,warnings:[]};
    if(t.needsTarget){
      const r=route(scn,state,def,unitNode(u),draft.target,{avoidForest:draft.avoidForest});
      if(!r){out.warnings.push("No hay ruta hasta el objetivo.");return out}
      out.route=r;
      const speedK=st.speed*(draft.type==="attack"?.7:draft.type==="recon"?.75:1);
      out.travel=Math.round(r.hours*60/speedK);
      out.eta=startAt+out.travel;
      out.fuel=Math.round(r.km*def.fuelPerKm*(draft.stance==="fast"?1.2:1));
      if(out.fuel>u.fuel)out.warnings.push("Combustible insuficiente para llegar ("+out.fuel+" % necesario, "+Math.round(u.fuel)+" % disponible).");
      else if(u.fuel-out.fuel<20)out.warnings.push("Llegaría con los depósitos casi vacíos.");
      if(r.path.some((n,i)=>i&&edge(scn,r.path[i-1],n).type==="forest"))out.warnings.push("La ruta atraviesa bosque: lento y propicio a emboscadas.");
      if(out.eta>=scn.nightFrom)out.warnings.push("Llegaría de noche.");
    }
    if(draft.artillery){
      if(state.artillery.busyUntil>state.clock)out.warnings.push("La artillería del cuerpo está ocupada hasta las "+fmtTime(state.artillery.busyUntil)+".");
      else if(draft.target&&distKm(scn,state,hqNode(state),draft.target)>scn.artillery.rangeKm)out.warnings.push("El objetivo queda fuera del alcance de la artillería desde el puesto de mando actual.");
    }
    if(u.status==="combat")out.warnings.push("La división está en combate: cambiar de orden ahora es arriesgado.");
    return out;
  }

  function issueOrder(scn,state,draft){
    const est=estimate(scn,state,draft);
    if(ORDER_TYPES[draft.type].needsTarget&&!est.route)return null;
    const order={id:"o"+state.nextMsg,...draft,stance:draft.stance||"normal",issuedAt:state.clock,deliverAt:state.clock+est.delay,
      byRadio:est.byRadio,startAt:draft.startAt||0,status:"transit"};
    if(draft.artillery&&(state.artillery.busyUntil>state.clock||(draft.target&&distKm(scn,state,hqNode(state),draft.target)>scn.artillery.rangeKm)))order.artillery=false;
    state.orders.push(order);
    const def=scn.units.find(x=>x.id===draft.unit);
    message(state,{from:"Puesto de mando",kind:"order",text:"Orden a la "+def.short+": "+ORDER_TYPES[draft.type].label+(draft.target?" → "+scn.nodes[draft.target].name:"")+". Enviada "+(est.byRadio?"por radio":"por enlace motorizado")+"; llegada estimada "+fmtTime(order.deliverAt)+"."});
    return order;
  }
  function moveHQ(scn,state,target){
    const r=route(scn,state,{speed:{road:scn.hq.speed,track:scn.hq.speed*.6,forest:scn.hq.speed*.35}},hqNode(state),target);
    if(!r||r.path.length<2)return false;
    state.hq.node=r.path[0];state.hq.path=r.path.slice(1);state.hq.edge=null;
    message(state,{from:"Puesto de mando",kind:"order",text:"El puesto de mando se traslada a "+scn.nodes[target].name+". Durante el traslado las comunicaciones empeoran."});
    return true;
  }

  // La orden llega a la división: empieza a prepararla.
  function deliverOrder(scn,state,o){
    const u=state.units[o.unit],def=scn.units.find(x=>x.id===o.unit);
    o.status="received";
    if(u.engagement){disengage(scn,state,u);if(u.edge)u.edge=null}
    u.order=o;u.stance=o.stance;
    u.status="preparing";
    u.readyAt=Math.max(state.clock+Math.round(ORDER_TYPES[o.type].prep*STANCES[o.stance].prep),o.startAt||0);
    if(o.artillery&&state.artillery.busyUntil<=state.clock){state.artillery.supporting=o.unit;state.artillery.busyUntil=state.clock+600}
    else if(o.artillery){o.artillery=false}
    sendReport(scn,state,u,def.short+": orden recibida ("+ORDER_TYPES[o.type].label.toLowerCase()+"). "+(ORDER_TYPES[o.type].needsTarget?"En marcha a las ":"Ejecución a las ")+fmtTime(Math.max(u.readyAt,scn.hHour))+".",{kind:"order"});
  }

  function startExecution(scn,state,u){
    const o=u.order,def=scn.units.find(x=>x.id===u.id);
    if(!o){u.status="idle";return}
    if(o.type==="defend"){u.status="defend";return}
    if(o.type==="resupply"){u.status="resupply";return}
    const r=route(scn,state,def,unitNode(u),o.target,{avoidForest:o.avoidForest});
    if(!r){u.status="idle";sendReport(scn,state,u,def.short+": no encuentra ruta hacia "+scn.nodes[o.target].name+".",{pause:true});return}
    if(u.edge){u.node=unitNode(u);u.edge=null}
    u.path=r.path.slice(1);
    u.status=u.path.length?"moving":"idle";
  }

  /* ---------- informes de las divisiones ---------- */
  function sendReport(scn,state,u,text,opts={}){
    const link=linkDelay(scn,state,u.id,"rep:"+u.id+":"+state.clock+":"+(opts.kind||""));
    const snap={node:u.node,edge:u.edge?{...u.edge}:null,clock:state.clock,status:u.status,fuel:Math.round(u.fuel),ammo:Math.round(u.ammo),men:Math.round(u.men),fatigue:Math.round(u.fatigue)};
    const def=scn.units.find(x=>x.id===u.id);
    const msg=message(state,{from:def.name,kind:opts.kind||"report",text,sentAt:state.clock,deliverAt:state.clock+link.delay,pause:!!opts.pause,apply:{known:u.id,snap,contact:opts.contact||null,bridge:opts.bridge||null}});
    u.lastReport=state.clock;
    return msg;
  }
  function statusText(scn,u){
    const where=u.edge?"entre "+scn.nodes[u.node].name+" y "+scn.nodes[u.edge.to].name:"en "+scn.nodes[u.node].name;
    const what={idle:"detenida",preparing:"preparando la orden",moving:"en marcha",combat:"en combate",defend:"en defensa",resupply:"reabasteciéndose",stalled:"detenida tras el combate",nofuel:"inmovilizada sin combustible"}[u.status]||u.status;
    return what+" "+where;
  }

  /* ---------- detección del enemigo ---------- */
  function sizeLabel(men){return men<650?"≈ compañía":men<1600?"≈ batallón":men<3500?"≈ regimiento o brigada":"fuerza importante"}
  function detect(scn,state,u){
    const def=scn.units.find(x=>x.id===u.id);
    const here=unitNode(u);
    for(const e of scn.enemies){
      const es=state.enemies[e.id];
      if(es.status==="gone"||es.moving)continue;
      const d=distKm(scn,state,here,es.node);
      const range=u.order?.type==="recon"&&u.status==="moving"?14:u.status==="defend"?7:10;
      if(d>range)continue;
      let p=.3+(u.order?.type==="recon"?.35:0)+STANCES[u.stance].detect-(d/range)*.15;
      if(isFog(scn,state.clock))p*=.5;
      if(isNight(scn,state.clock))p*=.5;
      if(es.reportedAt!=null&&state.clock-es.reportedAt<60)continue;
      if(roll(state,"det:"+u.id+":"+e.id+":"+Math.floor(state.clock/10))>=p)continue;
      const prev=state.contacts[e.id];
      const quality=.5+(u.order?.type==="recon"?.3:0);
      const accurate=roll(state,"idq:"+e.id+":"+Math.floor(state.clock/60))<quality;
      // Los partes tienden a exagerar al enemigo.
      const label=e.cavalry?(accurate?"Caballería polaca, "+sizeLabel(es.men):"Caballería, número desconocido"):
        (accurate?sizeLabel(es.men):sizeLabel(es.men*2.2))+" polaco";
      const contact={node:es.node,label,level:accurate?"confirmed":"estimated",clock:state.clock,name:accurate?e.name:"Contacto sin identificar"};
      es.reportedAt=state.clock;
      sendReport(scn,state,u,def.short+": contacto en "+scn.nodes[es.node].name+" · "+label+(accurate?"":" (sin confirmar)")+".",{kind:"contact",pause:!prev,contact:{id:e.id,...contact}});
    }
  }

  /* ---------- combate ---------- */
  const TERRAIN_DEF={town:2.2,village:1.6,forest:2,bridge:2.3,open:1.2,assembly:1};
  function germanPower(scn,state,u,attacking){
    const def=scn.units.find(x=>x.id===u.id);
    const node=scn.nodes[u.engagement?.node||unitNode(u)];
    let p=u.men/1000*(u.readiness/100);
    if(def.kind==="panzer")p*=node.terrain==="forest"?.9:node.terrain==="town"?1.3:1.8;
    p*=u.ammo<10?.3:u.ammo<30?.7:1;
    p*=1-u.fatigue/220;
    p*=STANCES[u.stance].power;
    if(attacking&&u.order?.type!=="attack")p*=.7;
    if(state.artillery.supporting===u.id&&state.artillery.busyUntil>state.clock)p*=1.5;
    if(u.engagement?.crossing)p*=def.kind==="panzer"?.35:.6;
    return p;
  }
  function engage(scn,state,u,enemyId,surprise){
    const es=state.enemies[enemyId],e=scn.enemies.find(x=>x.id===enemyId);
    u.engagement={enemy:enemyId,node:es.node,start:state.clock,menStart:u.men,surprise:!!surprise,crossing:false};
    u.status="combat";
    es.engagedBy=u.id;
    const def=scn.units.find(x=>x.id===u.id);
    const rep=sendReport(scn,state,u,def.short+(surprise?": ¡emboscada! Fuego inesperado en ":": combate abierto en ")+scn.nodes[es.node].name+" contra "+(state.contacts[enemyId]?.level==="confirmed"?e.name.toLowerCase():"fuerzas polacas de entidad desconocida")+".",{kind:"combat",pause:true,contact:{id:enemyId,node:es.node,label:sizeLabel(es.men)+" polaco",level:"confirmed",clock:state.clock,name:e.name}});
    fireEvent(scn,state,"engage:"+es.node,rep.deliverAt);
    // Puentes: si estaban preparados para volar, vuelan al empezar el combate.
    if(e.blowsBridge&&state.bridges[e.blowsBridge]==="intact"){
      const key=e.blowsBridge==="south"?"bridgeSouth":"bridgeNorth";
      if(state.hidden[key]==="volado")blowBridge(scn,state,e.blowsBridge,u);
    }
  }
  function blowBridge(scn,state,which,u){
    if(state.bridges[which]!=="intact")return;
    state.bridges[which]="blown";
    const def=scn.units.find(x=>x.id===u.id);
    sendReport(scn,state,u,def.short+": los polacos vuelan el puente "+(which==="south"?"sur":"norte")+" del Brda. Cruzar exigirá botes de asalto y tiempo.",{kind:"combat",pause:true,bridge:{which,state:"blown"}});
  }
  function disengage(scn,state,u,why){
    const es=u.engagement&&state.enemies[u.engagement.enemy];
    if(es)es.engagedBy=null;
    u.engagement=null;
    if(state.artillery.supporting===u.id){state.artillery.supporting=null;state.artillery.busyUntil=state.clock+scn.artillery.redeploy}
  }
  function combatTick(scn,state,u){
    const g=u.engagement,es=state.enemies[g.enemy],e=scn.enemies.find(x=>x.id===g.enemy);
    const def=scn.units.find(x=>x.id===u.id);
    const node=scn.nodes[g.node];
    let P=germanPower(scn,state,u,true);
    if(g.surprise&&state.clock-g.start<15)P*=.5;
    let D=es.men/1000*(TERRAIN_DEF[node.terrain]||1.2)*(e.prepared?1.25:1);
    if(isNight(scn,state.clock))D*=1.2;
    const r=P/Math.max(.05,D);
    const defLoss=Math.min(.01,.0016*r)*es.men;
    const attLoss=Math.min(.003,.0007/r)*u.men;
    es.men-=defLoss;
    u.men-=attLoss;state.losses.men+=attLoss;
    if(def.tanks&&r<2.5&&roll(state,"tank:"+u.id+":"+state.clock)<.08){u.tanks--;state.losses.tanks++}
    u.ammo=clamp(u.ammo-.22);
    u.fatigue=clamp(u.fatigue+.14);
    u.readiness=clamp(Math.min(u.readiness,95*(u.men/def.men)-u.fatigue/8),5,95);
    const elapsed=state.clock-g.start;
    // Un puente intacto se pierde si el combate se alarga.
    if(e.blowsBridge&&state.bridges[e.blowsBridge]==="intact"&&elapsed>25)blowBridge(scn,state,e.blowsBridge,u);
    if(es.men<es.menStart*.4){
      const where=e.retreatTo&&state.enemies[e.id];
      es.status="retreat";
      if(e.retreatTo&&e.retreatTo!==es.node&&!es.retreated&&es.men>150){es.moving={to:e.retreatTo,arrive:state.clock+90};}
      else es.status="gone";
      state.contacts[e.id]&&delete state.contacts[e.id];
      disengage(scn,state,u);
      if(e.blowsBridge&&state.bridges[e.blowsBridge]==="intact"){
        sendReport(scn,state,u,def.short+": ¡el puente "+(e.blowsBridge==="south"?"sur":"norte")+" del Brda cae intacto en nuestras manos!",{kind:"combat",pause:true,bridge:{which:e.blowsBridge,state:"captured"}});
        state.flags.push("bridge_captured_"+e.blowsBridge);
      }
      sendReport(scn,state,u,def.short+": "+scn.nodes[g.node].name+" despejado. El enemigo "+(es.moving?"se repliega hacia "+scn.nodes[e.retreatTo].name:"se dispersa")+". Bajas propias en el combate ≈ "+Math.round(g.menStart-u.men)+".",{kind:"combat",pause:true,contact:{id:e.id,remove:true}});
      if(g.node==="chojnice")state.flags.push("chojnice_taken");
      // Sigue con su orden: si el objetivo estaba más allá, continúa la marcha.
      u.node=g.node;u.edge=null;
      if(u.order&&u.order.target&&u.order.target!==g.node){startExecution(scn,state,u)}
      else{u.status="idle";u.path=[]}
      return;
    }
    const lostShare=(g.menStart-u.men)/g.menStart;
    if((elapsed>40&&r<.8)||lostShare>.1||u.ammo<5){
      disengage(scn,state,u);
      u.status="stalled";u.path=[];
      if(u.edge){u.edge=null}
      sendReport(scn,state,u,def.short+": el ataque sobre "+scn.nodes[g.node].name+" queda detenido. Bajas ≈ "+Math.round(g.menStart-u.men)+". "+(u.ammo<15?"Munición agotada. ":"")+"Esperamos órdenes.",{kind:"combat",pause:true});
    }
  }

  /* ---------- movimiento ---------- */
  function enemyAt(state,node){
    return Object.values(state.enemies).find(es=>es.node===node&&es.status!=="gone"&&!es.moving);
  }
  function moveTick(scn,state,u){
    const def=scn.units.find(x=>x.id===u.id);
    if(!u.edge){
      const next=u.path[0];
      if(!next){u.status="idle";arrive(scn,state,u);return}
      const e=edge(scn,u.node,next);
      const enemy=enemyAt(state,next);
      // El reconocimiento se detiene ante un contacto conocido.
      if(enemy&&u.order?.type==="recon"&&state.contacts[enemy.id]){
        u.status="idle";u.path=[];
        sendReport(scn,state,u,def.short+": el reconocimiento se detiene ante "+scn.nodes[next].name+", donde hay enemigo. La división queda en "+scn.nodes[u.node].name+".",{kind:"report",pause:true});
        return;
      }
      u.edge={to:next,km:e.km,done:0,type:e.type,river:e.river||null};
    }
    const ed=u.edge;
    let v=def.speed[ed.type]*STANCES[u.stance].speed;
    if(u.order?.type==="attack")v*=.7;
    if(u.order?.type==="recon")v*=.75;
    if(isFog(scn,state.clock))v*=.75;
    if(isNight(scn,state.clock))v*=.6;
    if(u.fatigue>60)v*=.8;
    if(ed.river&&state.bridges[ed.river]==="blown")v=Math.min(v,ed.km/150*60);
    if(u.fuel<=0){u.status="nofuel";sendReport(scn,state,u,def.short+": ¡sin combustible! La división queda inmovilizada en "+(u.edge?"plena marcha":scn.nodes[u.node].name)+".",{kind:"logistics",pause:true});return}
    const step=v/60;
    // Antes de entrar en un nodo ocupado por el enemigo, se combate.
    const enemy=enemyAt(state,ed.to);
    if(enemy&&ed.done+step>=ed.km-.5){
      ed.done=Math.max(ed.done,ed.km-.5);
      const known=state.contacts[enemy.id];
      engage(scn,state,u,enemy.id,!known&&u.order?.type!=="attack");
      if(ed.river&&state.bridges[ed.river]==="blown")u.engagement.crossing=true;
      return;
    }
    ed.done+=step;
    u.km+=step;
    u.fuel=clamp(u.fuel-step*def.fuelPerKm*(u.stance==="fast"?1.2:1));
    u.fatigue=clamp(u.fatigue+(u.stance==="fast"?.09:.065));
    if(ed.done>=ed.km){
      u.node=ed.to;u.edge=null;u.path.shift();
      if(ed.river&&state.bridges[ed.river]==="blown")u.readiness=clamp(u.readiness-4,5,95);
      if(["rytel","brdas","easts"].includes(u.node)){const m=sendReport(scn,state,u,def.short+": la vanguardia alcanza "+scn.nodes[u.node].name+".",{kind:"report"});fireEvent(scn,state,"reach:brda",m.deliverAt)}
      if(!u.path.length){u.status="idle";arrive(scn,state,u)}
    }
  }
  function arrive(scn,state,u){
    const def=scn.units.find(x=>x.id===u.id);
    if(u.order&&u.order.status!=="done"){
      u.order.status="done";
      sendReport(scn,state,u,def.short+": llegada a "+scn.nodes[u.node].name+". Combustible "+Math.round(u.fuel)+" %, munición "+Math.round(u.ammo)+" %.",{kind:"report",pause:true});
    }
  }

  /* ---------- logística ---------- */
  function supplyTick(scn,state,u){
    const halted=["idle","defend","resupply","stalled","nofuel"].includes(u.status);
    if(!halted){return}
    const def=scn.units.find(x=>x.id===u.id);
    const home=def.node;
    const d=distKm(scn,state,home,unitNode(u));
    let rate=(u.status==="resupply"?11:3)*Math.max(.2,1-d/80);
    // Mientras Chojnice resista, la carretera principal no sirve y los convoyes dan rodeos.
    if(!state.flags.includes("chojnice_taken"))rate*=.75;
    if(isNight(scn,state.clock))rate*=.8;
    u.fuel=clamp(u.fuel+rate/60);
    u.ammo=clamp(u.ammo+rate*.8/60);
    u.fatigue=clamp(u.fatigue-(u.status==="resupply"||u.status==="defend"?5:3)/60);
    if(u.status==="nofuel"&&u.fuel>8){u.status="idle";sendReport(scn,state,u,def.short+": llegan los convoyes; la división puede volver a moverse.",{kind:"logistics"})}
  }

  /* ---------- enemigo ---------- */
  function enemyTick(scn,state){
    for(const e of scn.enemies){
      const es=state.enemies[e.id];
      if(es.moving&&state.clock>=es.moving.arrive){
        const occupied=Object.values(state.units).some(u=>unitNode(u)===es.moving.to&&!u.edge);
        if(occupied||enemyAt(state,es.moving.to)){es.status="gone";es.moving=null;continue}
        es.node=es.moving.to;es.moving=null;es.status="hold";es.retreated=true;es.menStart=es.men/.7;
      }
      if(e.cavalry&&e.raidAt&&!es.raided&&state.clock>=e.raidAt&&es.status==="hold")cavalryRaid(scn,state,e,es);
    }
  }
  function cavalryRaid(scn,state,e,es){
    es.raided=true;
    // Busca infantería alemana cercana; si la caballería estaba lejos, la acción es menor.
    const targets=Object.values(state.units).filter(u=>!u.engagement).map(u=>({u,d:distKm(scn,state,es.node,unitNode(u))})).filter(x=>x.d<=30).sort((a,b)=>a.d-b.d);
    if(!targets.length)return;
    const {u}=targets[0];
    const def=scn.units.find(x=>x.id===u.id);
    const prepared=u.status==="defend"||!!state.contacts[e.id]&&state.clock-state.contacts[e.id].clock<240;
    const panzer=def.kind==="panzer";
    let menLoss,readiness,panic=false;
    if(state.hidden.cavalry!=="flanco"){menLoss=40;readiness=2}
    else if(prepared||panzer){menLoss=60;readiness=3}
    else{menLoss=220;readiness=12;panic=true}
    u.men-=menLoss;state.losses.men+=menLoss;
    u.readiness=clamp(u.readiness-readiness,5,95);
    u.fatigue=clamp(u.fatigue+6);
    es.men*=prepared||panzer?.55:.75;
    es.raided=true;es.status="retreat";es.moving={to:e.retreatTo,arrive:state.clock+120};
    if(panic)state.flags.push("rear_panic");
    const m=sendReport(scn,state,u,def.short+(panic?": ¡la caballería polaca dispersa a la infantería en campo abierto! Solo los vehículos blindados detienen la carga. Corren rumores de caballería por todas partes.":prepared||panzer?": carga de caballería polaca rechazada con fuego de ametralladoras. Bajas propias escasas.":": choque con jinetes polacos; se retiran sin consecuencias serias."),{kind:"combat",pause:true});
    fireEvent(scn,state,"raid",m.deliverAt);
  }

  /* ---------- eventos narrativos ---------- */
  function fireEvent(scn,state,trigger,deliverAt){
    for(const ev of scn.events){
      if(state.firedEvents.includes(ev.id))continue;
      if(ev.on!==trigger)continue;
      state.firedEvents.push(ev.id);
      message(state,{from:ev.from,kind:"event",text:ev.title,pause:ev.pause!==false,event:ev.id,deliverAt:deliverAt??state.clock});
    }
  }
  function timedEvents(scn,state){
    for(const ev of scn.events){
      if(ev.at==null||state.firedEvents.includes(ev.id)||state.clock<ev.at)continue;
      state.firedEvents.push(ev.id);
      if(ev.if==="hqNear3pz"){
        const d=distKm(scn,state,hqNode(state),unitNode(state.units["3pz"]));
        if(d>8)continue;
      }
      if(ev.effect==="hqDisrupted")state.hq.disruptedUntil=state.clock+30;
      message(state,{from:ev.from,kind:"event",text:ev.title,pause:ev.pause!==false,event:ev.id});
    }
  }

  /* ---------- paso de simulación: un minuto ---------- */
  function step(scn,state){
    if(state.ended)return{pause:true};
    state.clock+=1;
    timedEvents(scn,state);
    // Órdenes que llegan a su destino.
    for(const o of state.orders)if(o.status==="transit"&&state.clock>=o.deliverAt)deliverOrder(scn,state,o);
    // Puesto de mando en traslado.
    hqTick(scn,state);
    for(const u of Object.values(state.units)){
      if(state.clock<scn.hHour&&u.status!=="preparing")continue;
      if(u.status==="preparing"&&state.clock>=u.readyAt&&state.clock>=scn.hHour)startExecution(scn,state,u);
      if(u.status==="moving")moveTick(scn,state,u);
      else if(u.status==="combat"&&u.engagement)combatTick(scn,state,u);
      supplyTick(scn,state,u);
      if(state.clock%10===0&&state.clock>=scn.hHour)detect(scn,state,u);
      if(state.clock-u.lastReport>=60&&state.clock>=scn.hHour){
        const def=scn.units.find(x=>x.id===u.id);
        sendReport(scn,state,u,def.short+": "+statusText(scn,u)+". Combustible "+Math.round(u.fuel)+" %, munición "+Math.round(u.ammo)+" %.");
      }
      if(u.fuel<35&&!state.flags.includes("fuel_warn_"+u.id)){
        state.flags.push("fuel_warn_"+u.id);
        const def=scn.units.find(x=>x.id===u.id);
        message(state,{from:"Qu · Oberstleutnant Hartmann (ficticio)",kind:"logistics",pause:true,text:"La "+def.short+" informa de combustible por debajo del 35 %. Hay combustible en el sistema logístico, pero no en sus vehículos de cabeza: necesita detenerse (REABASTECER) o se quedará seca."});
      }
    }
    enemyTick(scn,state);
    // Mensajes que llegan al puesto de mando.
    let pause=false;
    for(const m of state.messages){
      if(m.delivered||state.clock<m.deliverAt)continue;
      m.delivered=true;
      if(m.apply)applyReport(state,m.apply);
      if(m.pause)pause=true;
    }
    if(state.clock>=scn.end){state.ended=true;pause=true}
    return{pause};
  }
  function hqTick(scn,state){
    const hq=state.hq;
    if(!hq.edge&&hq.path.length){const e=edge(scn,hq.node,hq.path[0]);hq.edge={to:hq.path[0],km:e.km,done:0,type:e.type}}
    if(!hq.edge)return;
    const v=hq.edge.type==="road"?scn.hq.speed:hq.edge.type==="track"?scn.hq.speed*.6:scn.hq.speed*.35;
    hq.edge.done+=v/60*(isNight(scn,state.clock)?.6:1);
    if(hq.edge.done>=hq.edge.km){hq.node=hq.edge.to;hq.edge=null;hq.path.shift()}
  }
  function applyReport(state,a){
    if(a.bridge){state.knownBridges=state.knownBridges||{};state.knownBridges[a.bridge.which]=a.bridge.state}
    if(a.known&&a.snap){
      const k=state.known[a.known];
      if(!k||a.snap.clock>=k.clock)state.known[a.known]=a.snap;
    }
    if(a.contact){
      if(a.contact.remove)delete state.contacts[a.contact.id];
      else{
        const prev=state.contacts[a.contact.id];
        if(!prev||a.contact.clock>=prev.clock&&!(prev.level==="confirmed"&&a.contact.level==="estimated"&&a.contact.clock-prev.clock<120))
          state.contacts[a.contact.id]={...a.contact};
      }
    }
  }

  function endDay(scn,state){
    if(state.clock<scn.endEarliest)return false;
    state.ended=true;
    return true;
  }

  /* ---------- balance de la jornada ---------- */
  function evaluate(scn,state){
    const units=Object.values(state.units);
    const at=n=>units.some(u=>!u.edge&&u.node===n);
    const rows=[];
    let brda;
    if(at(scn.objectives.brdaFar))brda={p:40,t:"Una división propia al otro lado del Brda."};
    else if(scn.objectives.brdaBanks.some(at))brda={p:30,t:"El cuerpo alcanza el Brda."};
    else{
      const best=Math.min(...units.map(u=>Math.min(...scn.objectives.brdaBanks.map(b=>distKm(scn,state,unitNode(u),b)))));
      brda=best<=15?{p:12,t:"La vanguardia queda a "+Math.round(best)+" km del Brda."}:{p:3,t:"El avance se queda lejos del Brda."};
    }
    rows.push({label:"Objetivo: río Brda",points:brda.p,max:40,text:brda.t});
    rows.push(state.flags.includes("chojnice_taken")?{label:"Chojnice",points:15,max:15,text:"Tomada: la carretera principal queda libre."}:{label:"Chojnice",points:0,max:15,text:"Sigue en manos polacas y estrangula el suministro."});
    const men=Math.round(state.losses.men);
    rows.push({label:"Conservación de fuerzas",max:15,points:men<700?15:men<1400?10:men<2300?5:0,text:"Bajas ≈ "+men.toLocaleString("es-ES")+" hombres, "+state.losses.tanks+" carros."});
    const fuel=units.reduce((a,u)=>a+u.fuel,0)/units.length,ammo=units.reduce((a,u)=>a+u.ammo,0)/units.length;
    rows.push({label:"Logística para el día 2",max:10,points:fuel>=40&&ammo>=40?10:fuel>=20&&ammo>=20?5:0,text:"Combustible medio "+Math.round(fuel)+" %, munición "+Math.round(ammo)+" %."});
    const ready=units.reduce((a,u)=>a+u.readiness,0)/units.length;
    rows.push({label:"Estado de las divisiones",max:5,points:ready>=70?5:ready>=50?2:0,text:"Preparación media "+Math.round(ready)+" %."});
    rows.push(state.flags.includes("rear_panic")?{label:"Flanco septentrional",max:15,points:0,text:"La caballería polaca sorprendió a la infantería."}:{label:"Flanco septentrional",max:15,points:15,text:"El flanco no fue sorprendido."});
    const score=rows.reduce((a,r)=>a+r.points,0);
    const verdict=score>=86?{title:"MÁS ALLÁ DE LO HISTÓRICO",text:"El cuerpo termina la jornada en mejor situación que la registrada históricamente."}:
      score>=68?{title:"RITMO HISTÓRICO",text:"El cuerpo cumple el objetivo del primer día con un coste asumible, aproximadamente como ocurrió."}:
      score>=50?{title:"AVANCE CONTENIDO",text:"El cuerpo avanza por debajo de lo esperado. Mañana habrá que recuperar tiempo con menos margen."}:
      {title:"JORNADA FALLIDA",text:"El primer día deja al cuerpo lejos del objetivo y debilitado."};
    return{score,rows,verdict,history:scn.evaluation.history};
  }

  // Posición en el mapa de un nodo o de un punto de un tramo.
  function point(scn,node,edgeState){
    const a=scn.nodes[node];
    if(!edgeState)return{x:a.x,y:a.y};
    const b=scn.nodes[edgeState.to],t=Math.min(1,edgeState.done/edgeState.km);
    return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
  }

  return{newGame,step,endDay,issueOrder,estimate,moveHQ,evaluate,route,point,unitNode,hqNode,distKm,statusText,
    ORDER_TYPES,STANCES,fmtDate,fmtTime,fmtDur,isNight,isFog};
})();
if(typeof module!=="undefined")module.exports=FrontlineCommand;
