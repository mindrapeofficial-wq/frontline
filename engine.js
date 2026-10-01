"use strict";
// Motor narrativo de FRONTLINE: condiciones, efectos, reloj, incertidumbre y evaluación.
// No toca el DOM: la interfaz (app.js) solo lee el estado y llama a estas funciones.

const FrontlineEngine=(()=>{
  const RES_MAX={command:9};
  const RES_LABELS={command:"Mando",communications:"Comunicaciones",fuel:"Combustible",ammunition:"Munición",movement:"Ritmo",cohesion:"Cohesión",reconnaissance:"Reconocimiento",fatigue:"Fatiga"};

  const clone=v=>JSON.parse(JSON.stringify(v));
  const clampRes=(k,v)=>Math.max(0,Math.min(RES_MAX[k]??100,Math.round(v)));
  const clamp=(v,min=0,max=100)=>Math.max(min,Math.min(max,Math.round(Number(v)||0)));

  // Azar determinista por partida: la misma partida da siempre el mismo resultado para la misma clave.
  function roll(state,key){
    let h=state.seed>>>0;
    for(const ch of key)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
    h=Math.imul(h^h>>>15,h|1);h^=h+Math.imul(h^h>>>7,h|61);
    return((h^h>>>14)>>>0)/4294967296;
  }

  function newRun(chapter){
    const state={
      version:5,
      chapter:chapter.id,
      stage:"dossier",
      sceneId:chapter.start,
      clock:chapter.startClock,
      resources:clone(chapter.resources),
      formations:clone(chapter.formations),
      trust:Object.fromEntries(chapter.staff.map(s=>[s.id,s.trust])),
      progress:0,
      losses:{men:0,vehicles:0},
      flags:[],
      hidden:{},
      memo:{},
      entered:[],
      log:[],
      path:[],
      decisionResult:null,
      nextScene:null,
      pendingScene:null,
      turnMinutes:0,
      turnReport:null,
      units:Object.fromEntries((chapter.map?.units||[]).map(u=>[u.id,{pos:0,order:"advance",known:{pos:0,clock:chapter.startClock}}])),
      enemies:Object.fromEntries((chapter.map?.enemies||[]).map(e=>[e.id,{cleared:false,engaged:false}])),
      contacts:{},
      seed:(Math.random()*4294967296)>>>0
    };
    // La verdad oculta del escenario se decide al empezar y el jugador solo la descubre por informes.
    for(const [key,options] of Object.entries(chapter.hidden||{})){
      let r=roll(state,"hidden:"+key),acc=0;
      for(const [value,weight] of Object.entries(options)){
        acc+=weight;
        if(r<acc){state.hidden[key]=value;break}
      }
      state.hidden[key]??=Object.keys(options).pop();
    }
    enterScene(chapter,state,chapter.start);
    return state;
  }

  function cmp(v,c){
    if(c===null||typeof c!=="object")return v===c;
    return(c.lt==null||v<c.lt)&&(c.lte==null||v<=c.lte)&&(c.gt==null||v>c.gt)&&(c.gte==null||v>=c.gte);
  }

  // Un informe es exacto con probabilidad igual al reconocimiento en el momento de recibirlo.
  function reportAccurate(state,key){
    const k="report:"+key;
    if(!(k in state.memo))state.memo[k]=roll(state,k)<state.resources.reconnaissance/100;
    return state.memo[k];
  }

  function test(cond,state){
    if(!cond)return true;
    if(cond.all&&!cond.all.every(c=>test(c,state)))return false;
    if(cond.any&&!cond.any.some(c=>test(c,state)))return false;
    if(cond.not&&test(cond.not,state))return false;
    if(cond.flag&&!state.flags.includes(cond.flag))return false;
    if(cond.noFlag&&state.flags.includes(cond.noFlag))return false;
    if(cond.res&&!Object.entries(cond.res).every(([k,c])=>cmp(state.resources[k],c)))return false;
    if(cond.hidden&&!Object.entries(cond.hidden).every(([k,v])=>state.hidden[k]===v))return false;
    if(cond.losses&&!Object.entries(cond.losses).every(([k,c])=>cmp(state.losses[k],c)))return false;
    if(cond.progress&&!cmp(state.progress,cond.progress))return false;
    if(cond.unit&&!Object.entries(cond.unit).every(([id,c])=>cmp(unitPos(state,id),c)))return false;
    if(cond.clock&&!cmp(state.clock,cond.clock))return false;
    if(cond.accurate&&!reportAccurate(state,cond.accurate))return false;
    if(cond.inaccurate&&reportAccurate(state,cond.inaccurate))return false;
    return true;
  }

  // Listas de texto con párrafos condicionales: "texto" o {if:{...}, text:"..."}.
  function texts(list,state){
    return(list||[]).filter(x=>typeof x==="string"||test(x.if,state)).map(x=>typeof x==="string"?x:x.text);
  }

  function applyEffects(e,state,chapter){
    if(!e)return;
    for(const [k,v] of Object.entries(e.res||{}))if(k in state.resources)state.resources[k]=clampRes(k,state.resources[k]+v);
    for(const f of e.flags||[])if(!state.flags.includes(f))state.flags.push(f);
    if(e.progress)setUnitPos(chapter,state,"3pz",state.progress+e.progress);
    if(e.minutes)state.clock+=e.minutes;
    if(e.losses){state.losses.men+=e.losses.men||0;state.losses.vehicles+=e.losses.vehicles||0}
    for(const [id,ch] of Object.entries(e.formations||{})){
      const f=state.formations.find(x=>x.id===id);
      if(!f)continue;
      if(ch.readiness)f.readiness=clamp(f.readiness+ch.readiness);
      if(ch.supply)f.supply=clamp(f.supply+ch.supply);
      if(ch.position)f.position=ch.position;
    }
    for(const [id,v] of Object.entries(e.trust||{}))if(id in state.trust)state.trust[id]=clamp(state.trust[id]+v);
  }

  function enterScene(chapter,state,id){
    const scene=chapter.scenes[id];
    state.sceneId=id;
    if(!scene)return;
    if(scene.at!=null)state.clock=Math.max(state.clock,scene.at);
    if(!state.entered.includes(id)){
      state.entered.push(id);
      for(const ev of scene.onEnter||[])if(test(ev.if,state))applyEffects(ev.effects,state,chapter);
    }
  }

  function choiceView(choice,state){
    return{
      ...choice,
      available:test(choice.requires,state),
      blockedText:choice.blockedText||"No disponible con la situación actual."
    };
  }
  function choicesFor(scene,state){
    return(scene.choices||[]).filter(c=>test(c.visibleIf,state)).map(c=>choiceView(c,state));
  }

  function resolveNext(next,state){
    if(!next)return null;
    if(typeof next==="string")return next;
    const hit=next.find(n=>test(n.if,state));
    return hit?hit.to:null;
  }

  // Ejecuta una orden: efectos base + el primer desenlace cuyas condiciones se cumplan.
  function choose(chapter,state,choiceId){
    const scene=chapter.scenes[state.sceneId];
    const choice=(scene.choices||[]).find(c=>c.id===choiceId);
    if(!choice||!test(choice.visibleIf,state)||!test(choice.requires,state))return null;
    const before={res:clone(state.resources),progress:state.progress,losses:clone(state.losses),clock:state.clock};
    const outcome=(choice.outcomes||[]).find(o=>test(o.if,state));
    applyEffects(choice.effects,state,chapter);
    if(outcome)applyEffects(outcome.effects,state,chapter);
    const summary=describe(before,state);
    const result=(outcome&&outcome.result)||choice.result;
    let next=resolveNext(choice.next||scene.next,state);
    const failure=(chapter.failures||[]).find(f=>test(f.if,state));
    if(failure&&!scene.ending)next=failure.to;
    state.path.push({scene:scene.id,choice:choice.id});
    state.log.push({date:formatDate(before.clock),time:formatTime(before.clock),title:choice.title,effects:summary});
    state.decisionResult={text:result,effects:summary};
    state.nextScene=next;
    return state;
  }

  // Pasa a la siguiente escena. Si entre la hora actual y la del siguiente parte hay tiempo,
  // el jugador da antes órdenes a sus divisiones sobre el mapa (turno operacional).
  function advance(chapter,state){
    if(state.stage==="turnReport"){
      const id=state.pendingScene;
      state.turnReport=null;
      state.pendingScene=null;
      goTo(chapter,state,id,false);
      return;
    }
    if(!state.nextScene)return;
    const id=state.nextScene;
    state.nextScene=null;
    state.decisionResult=null;
    goTo(chapter,state,id,true);
  }
  function goTo(chapter,state,id,allowTurn){
    for(let guard=0;guard<10&&id;guard++){
      const scene=chapter.scenes[id];
      if(scene&&scene.skipIf&&test(scene.skipIf,state)){id=resolveNext(scene.next,state);allowTurn=true;continue}
      const gap=scene&&scene.at!=null?scene.at-state.clock:0;
      // Antes de la hora del ataque no hay operaciones que ordenar.
      if(allowTurn&&chapter.map&&gap>=45&&state.clock>=(chapter.map.turnsFrom??-Infinity)){
        state.stage="orders";
        state.pendingScene=id;
        state.turnMinutes=gap;
        return;
      }
      state.stage="scene";
      enterScene(chapter,state,id);
      return;
    }
  }

  /* ---------- Operaciones sobre el mapa ---------- */

  const ORDERS={
    advance:{label:"AVANZAR",desc:"Moverse por el eje a máxima velocidad. Si hay un enemigo no detectado delante, puede ser una emboscada.",speed:5,fuel:1,fatigue:1},
    attack:{label:"ATACAR",desc:"Avanzar desplegado y atacar el contacto que bloquea el eje. Gasta munición.",speed:2,fuel:.6,ammo:1.6,fatigue:.8},
    recon:{label:"RECONOCER",desc:"Explorar por delante. Mejora la detección de contactos y el reconocimiento del cuerpo.",speed:2,fuel:.4,recon:2.5,fatigue:.5},
    hold:{label:"MANTENER",desc:"Detenerse, reorganizarse y descansar. Recupera cohesión y reduce la fatiga.",speed:0,cohesion:1.2,fatigue:-1.2},
    resupply:{label:"REABASTECER",desc:"Esperar a los convoyes. Recupera combustible, munición y preparación.",speed:0,resupply:true,fatigue:-.6}
  };
  const CROSSED=["bridgehead","bridgehead_small","bridgehead_costly"];

  function unitPos(state,id){return id==="3pz"?state.progress:(state.units?.[id]?.pos??0)}
  function routeEnd(chapter,id){const p=chapter.map.routes[id].points;return p[p.length-1].u}

  function enemyCleared(def,state){return!!state.enemies?.[def.id]?.cleared||(def.clearedBy||[]).some(f=>state.flags.includes(f))}
  function enemyBlocks(def,state){return!!def.route&&!enemyCleared(def,state)&&!(def.bypassBy||[]).some(f=>state.flags.includes(f))}
  function enemyStrength(def,state){return def.strengthBy?def.strengthBy.map[state.hidden[def.strengthBy.hidden]]:def.strength}
  function firstBlock(chapter,state,id,pos){
    return chapter.map.enemies.filter(e=>e.route===id&&e.u>pos+.5&&enemyBlocks(e,state)).sort((a,b)=>a.u-b.u)[0];
  }
  // Ninguna orden ni escena lleva a una división más allá de un enemigo que bloquea su eje.
  function setUnitPos(chapter,state,id,value){
    const pos=unitPos(state,id);
    let cap=chapter&&chapter.map?routeEnd(chapter,id):130;
    if(id==="3pz"&&!CROSSED.some(f=>state.flags.includes(f)))cap=Math.min(cap,70);
    const block=chapter&&chapter.map?firstBlock(chapter,state,id,pos):null;
    if(block)cap=Math.min(cap,block.u-1);
    const v=Math.max(0,Math.min(Math.max(cap,Math.min(pos,value)),value));
    if(id==="3pz")state.progress=Math.round(v);
    else if(state.units[id])state.units[id].pos=Math.round(v*10)/10;
    return block&&value>=block.u-1?block:null;
  }

  function mapPoint(route,u){
    const pts=route.points;
    if(u<=pts[0].u)return{x:pts[0].x,y:pts[0].y};
    for(let i=1;i<pts.length;i++){
      const a=pts[i-1],b=pts[i];
      if(u<=b.u){const t=(u-a.u)/(b.u-a.u);return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}}
    }
    const l=pts[pts.length-1];return{x:l.x,y:l.y};
  }
  function enemyPoint(chapter,def,state){
    if(def.route)return mapPoint(chapter.map.routes[def.route],def.u);
    if(def.placeBy)return def.placeBy.map[state.hidden[def.placeBy.hidden]];
    return{x:def.x,y:def.y};
  }
  function enemyVisible(state,id){return state.contacts?.[id]||null}

  function runTurn(chapter,state,orders){
    if(state.stage!=="orders")return null;
    const map=chapter.map,r=state.resources;
    const minutes=state.turnMinutes,h=minutes/60,key="turn"+state.clock;
    const before={res:clone(r),progress:state.progress,losses:clone(state.losses),clock:state.clock};
    const lines=[];
    const acc={fuel:0,ammunition:0,fatigue:0,cohesion:0,reconnaissance:0};
    const hq=state.flags.includes("hq_forward")?"forward":state.flags.includes("hq_rear")?"rear":"mobile";
    const night=state.clock>=1140;

    let mod=1;
    if(r.cohesion<55)mod*=.75;
    if(r.fatigue>=30)mod*=.85;
    if(r.fuel<25)mod*=.5;
    if(r.fuel<8)mod=0;
    if(night)mod*=.6;
    if(night)lines.push({type:"info",text:"Es de noche: las columnas avanzan más despacio y con más errores."});

    for(const def of map.units){
      const unit=state.units[def.id],f=state.formations.find(x=>x.id===def.id);
      const wanted=orders[def.id]||unit.order;

      // Una orden no equivale a un resultado: primero tiene que llegar.
      let p=r.communications/100+.25;
      if(hq==="forward")p+=def.id==="3pz"?1:-.2;
      if(hq==="rear")p+=.1;
      if(wanted!==unit.order&&roll(state,key+":order:"+def.id)>=p){
        lines.push({type:"warn",text:def.short+": la orden no llega a tiempo. Sigue ejecutando la anterior ("+ORDERS[unit.order].label.toLowerCase()+")."});
      }else unit.order=wanted;
      const o=ORDERS[unit.order],route=map.routes[def.id],pos=unitPos(state,def.id);

      let dist=o.speed*h*mod*(def.speed||1);
      if((route.forest||[]).some(([a,b])=>pos>=a&&pos<b))dist*=.55;
      const block=setUnitPos(chapter,state,def.id,pos+dist);
      const moved=unitPos(state,def.id)-pos;

      acc.fuel-=o.fuel?o.fuel*def.fuelRate*h:0;
      acc.ammunition-=(o.ammo||0)*h;
      acc.fatigue+=o.fatigue*h*.6;
      acc.cohesion+=(o.cohesion||0)*h*.6;
      acc.reconnaissance+=(o.recon||0)*h;
      if(o.speed&&f)f.supply=clamp(f.supply-o.fuel*h*3);
      if(o.resupply){
        acc.fuel+=2.2*h;acc.ammunition+=1.8*h;
        if(f){f.supply=clamp(f.supply+6*h);f.readiness=clamp(f.readiness+2*h)}
      }
      if(moved>=1)lines.push({type:"info",text:def.short+": "+ORDERS[unit.order].label.toLowerCase()+", avanza hasta "+placeName(route,unitPos(state,def.id))+"."});
      else if(o.speed===0)lines.push({type:"info",text:def.short+": "+(unit.order==="hold"?"se reorganiza y descansa.":"recibe convoyes y repara vehículos.")});

      if(block&&o.speed>0){
        const es=state.enemies[block.id];
        const s=enemyStrength(block,state);
        const known=state.contacts[block.id]?.level==="confirmed";
        state.contacts[block.id]={level:"confirmed",clock:state.clock+minutes,label:block.name};
        if(block.scripted){
          lines.push({type:"info",text:def.short+": "+block.reachText});
        }else if(unit.order==="attack"){
          const power=(f?f.readiness/100:.8)*(r.ammunition>=40?1:.6)*(.5+r.cohesion/200)+(known?.15:0);
          const chance=Math.max(.1,Math.min(.9,power-(s-1)*.3));
          if(roll(state,key+":combat:"+block.id)<chance){
            es.cleared=true;
            state.losses.men+=35*s;state.losses.vehicles+=s;acc.ammunition-=3*s;
            for(const fl of block.onClear||[])if(!state.flags.includes(fl))state.flags.push(fl);
            delete state.contacts[block.id];
            lines.push({type:"good",text:def.short+": "+block.clearText});
          }else{
            state.losses.men+=90*s;state.losses.vehicles+=2*s;acc.ammunition-=4*s;acc.cohesion-=3;
            if(f)f.readiness=clamp(f.readiness-5*s);
            lines.push({type:"bad",text:def.short+": el ataque contra "+block.name.toLowerCase()+" fracasa. Bajas y desorden; el eje sigue bloqueado."});
          }
        }else if(!known&&!es.engaged){
          state.losses.men+=70*s;state.losses.vehicles+=2*s;acc.cohesion-=3;
          if(f)f.readiness=clamp(f.readiness-6);
          lines.push({type:"bad",text:def.short+": choca sin aviso con "+block.name.toLowerCase()+". Emboscada: la columna se detiene bajo fuego."});
        }else{
          lines.push({type:"warn",text:def.short+": detenida ante "+block.name.toLowerCase()+". Para despejar el eje hay que ordenar ATACAR."});
        }
        es.engaged=true;
      }
    }

    // Un cuerpo que avanza a velocidades muy distintas pierde cohesión.
    const others=map.units.filter(u=>u.id!=="3pz").map(u=>unitPos(state,u.id));
    if(others.length&&state.progress-Math.min(...others)>35){
      acc.cohesion-=1*h;
      lines.push({type:"warn",text:"El cuerpo se estira: la 3. Panzer-Division se separa demasiado de la infantería motorizada."});
    }

    for(const [k,v] of Object.entries(acc))r[k]=clampRes(k,r[k]+v);
    state.clock+=minutes;
    detectContacts(chapter,state,key,lines);
    updateKnownPositions(chapter,state,key,hq,lines);

    const failure=(chapter.failures||[]).find(fl=>test(fl.if,state));
    if(failure)state.pendingScene=failure.to;
    state.log.push({date:formatDate(before.clock),time:formatTime(before.clock),title:"ÓRDENES DE PERIODO ("+formatDuration(minutes)+")",effects:describe(before,state)});
    state.turnReport={lines,effects:describe(before,state),minutes};
    state.stage="turnReport";
    return state;
  }

  function placeName(route,u){
    let name=route.points[0].label;
    for(const p of route.points)if(u>=p.u-2&&p.label)name=p.label;
    return name;
  }

  // Los contactos se detectan según el reconocimiento; lo que no se confirma queda como estimación.
  function detectContacts(chapter,state,key,lines){
    const map=chapter.map,recon=state.resources.reconnaissance/100;
    const pts=map.units.map(u=>({id:u.id,order:state.units[u.id].order,...mapPoint(map.routes[u.id],unitPos(state,u.id))}));
    for(const def of map.enemies){
      if(enemyCleared(def,state)){delete state.contacts[def.id];continue}
      const ep=enemyPoint(chapter,def,state);
      if(!ep)continue;
      const near=pts.map(p=>({...p,d:Math.hypot(p.x-ep.x,p.y-ep.y)})).sort((a,b)=>a.d-b.d)[0];
      if(!near||near.d>(def.detectRange||150))continue;
      const bonus=pts.some(p=>p.order==="recon"&&Math.hypot(p.x-ep.x,p.y-ep.y)<180)?.3:0;
      const prev=state.contacts[def.id];
      if(roll(state,key+":detect:"+def.id)<recon+bonus){
        if(!prev||prev.level!=="confirmed")lines.push({type:"intel",text:"Contacto confirmado: "+def.name+"."});
        state.contacts[def.id]={level:"confirmed",clock:state.clock,label:def.name};
      }else if(!prev||prev.level!=="confirmed"){
        if(!prev)lines.push({type:"intel",text:"Contacto sin confirmar cerca de "+(def.area||"el eje")+": "+(def.misreport||"fuerza desconocida")+"."});
        state.contacts[def.id]={level:"estimated",clock:state.clock,label:def.misreport||"Contacto sin identificar"};
      }
    }
  }

  // El mapa solo muestra la última posición comunicada de cada división.
  function updateKnownPositions(chapter,state,key,hq,lines){
    for(const def of chapter.map.units){
      const unit=state.units[def.id];
      let p=state.resources.communications/100+.3;
      if(hq==="forward")p+=def.id==="3pz"?1:-.15;
      if(hq==="rear")p+=.1;
      if(roll(state,key+":report:"+def.id)<p)unit.known={pos:unitPos(state,def.id),clock:state.clock};
      else lines.push({type:"warn",text:"Sin parte reciente de la "+def.short+". El mapa muestra su posición de las "+formatTime(unit.known.clock)+"."});
    }
  }

  function describe(before,state){
    const parts=[];
    const mins=state.clock-before.clock;
    if(mins>0)parts.push("Tiempo +"+formatDuration(mins));
    const dp=state.progress-before.progress;
    if(dp)parts.push("Avance "+(dp>0?"+":"")+dp);
    for(const [k,label] of Object.entries(RES_LABELS)){
      const d=state.resources[k]-before.res[k];
      if(d)parts.push(label+" "+(d>0?"+":"")+d);
    }
    const men=state.losses.men-before.losses.men,veh=state.losses.vehicles-before.losses.vehicles;
    if(men)parts.push("Bajas ≈"+men);
    if(veh)parts.push("Vehículos perdidos ≈"+veh);
    return parts.join(" · ");
  }

  function evaluate(chapter,state){
    const scene=chapter.scenes[state.sceneId]||{};
    const cfg=chapter.evaluation;
    let score=0;
    const rows=cfg.criteria.map(c=>{
      const level=c.levels.find(l=>test(l.if,state))||c.levels[c.levels.length-1];
      score+=level.points;
      return{label:c.label,text:level.text,points:level.points,max:c.max};
    });
    const verdict=scene.verdict||cfg.verdicts.find(v=>score>=v.min)||cfg.verdicts[cfg.verdicts.length-1];
    return{score,rows,verdict,history:texts(cfg.history,state)};
  }

  // El reloj cuenta minutos desde las 00:00 del 1 de septiembre de 1939.
  const DAYS=["31 AGO 1939","1 SEP 1939","2 SEP 1939","3 SEP 1939"];
  function formatDate(clock){return DAYS[Math.floor(clock/1440)+1]||DAYS[DAYS.length-1]}
  function formatTime(clock){
    const m=((clock%1440)+1440)%1440;
    return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
  }
  function formatDuration(m){
    const h=Math.floor(m/60),r=m%60;
    return(h?h+" h":"")+(h&&r?" ":"")+(r?r+" min":"")||"0 min";
  }
  function reliabilityLabel(recon){return recon<40?"RUMOR":recon<70?"PROBABLE":"CONFIRMADO"}

  return{newRun,test,texts,choicesFor,choose,advance,runTurn,unitPos,mapPoint,enemyPoint,enemyCleared,placeName,ORDERS,evaluate,formatDate,formatTime,formatDuration,reliabilityLabel,reportAccurate,clamp};
})();
