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
      version:4,
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
    if(cond.clock&&!cmp(state.clock,cond.clock))return false;
    if(cond.accurate&&!reportAccurate(state,cond.accurate))return false;
    if(cond.inaccurate&&reportAccurate(state,cond.inaccurate))return false;
    return true;
  }

  // Listas de texto con párrafos condicionales: "texto" o {if:{...}, text:"..."}.
  function texts(list,state){
    return(list||[]).filter(x=>typeof x==="string"||test(x.if,state)).map(x=>typeof x==="string"?x:x.text);
  }

  function applyEffects(e,state){
    if(!e)return;
    for(const [k,v] of Object.entries(e.res||{}))if(k in state.resources)state.resources[k]=clampRes(k,state.resources[k]+v);
    if(e.progress)state.progress=clamp(state.progress+e.progress,0,130);
    if(e.minutes)state.clock+=e.minutes;
    if(e.losses){state.losses.men+=e.losses.men||0;state.losses.vehicles+=e.losses.vehicles||0}
    for(const f of e.flags||[])if(!state.flags.includes(f))state.flags.push(f);
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
      for(const ev of scene.onEnter||[])if(test(ev.if,state))applyEffects(ev.effects,state);
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
    applyEffects(choice.effects,state);
    if(outcome)applyEffects(outcome.effects,state);
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

  function advance(chapter,state){
    if(!state.nextScene)return;
    const id=state.nextScene;
    state.nextScene=null;
    state.decisionResult=null;
    enterScene(chapter,state,id);
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

  return{newRun,test,texts,choicesFor,choose,advance,evaluate,formatDate,formatTime,formatDuration,reliabilityLabel,reportAccurate,clamp};
})();
