"use strict";

const FRONTLINE_ENCYCLOPEDIA = {
  version: 1,
  categories: [
    ["person","PERSONAS"],
    ["organization","ORGANIZACIONES"],
    ["event","EVENTOS"],
    ["vehicle","VEHÍCULOS Y ARMAMENTO"],
    ["document","DOCUMENTOS Y DOCTRINA"],
    ["place","LUGARES E INFRAESTRUCTURA"]
  ],
  entries: [
    {
      id:"walther-von-brauchitsch",category:"person",name:"Walther von Brauchitsch",period:"1881–1948",
      aliases:["Walther von Brauchitsch","von Brauchitsch","Brauchitsch"],
      summary:"Oficial profesional alemán y comandante en jefe del Heer entre 1938 y 1941.",
      specs:{"Cargo en 1938":"Oberbefehlshaber des Heeres","Rama":"Heer","Nombramiento":"4 de febrero de 1938"},
      details:["Sustituyó a Werner von Fritsch durante la reorganización de la cúpula militar de 1938.","Como jefe del Ejército dirigía el OKH, aunque la autoridad política y estratégica superior estaba cada vez más concentrada en Hitler y el OKW."],
      context:"Su posición permite al juego mostrar la tensión entre planificación profesional, cadena de mando y dirección política."
    },
    {
      id:"adolf-hitler",category:"person",name:"Adolf Hitler",period:"1889–1945",
      aliases:["Adolf Hitler","Hitler"],
      summary:"Dictador de la Alemania nazi. En 1938 concentró aún más control directo sobre las fuerzas armadas.",
      specs:{"Cargo":"Führer y canciller del Reich","Papel militar desde 1938":"Autoridad suprema sobre la Wehrmacht"},
      details:["Tras la crisis Blomberg-Fritsch, Hitler abolió el Ministerio de Guerra y reforzó el control personal sobre la estructura militar.","La enciclopedia lo trata como actor histórico y político, no como personaje heroico."],
      context:"Sus decisiones condicionan el marco político dentro del que opera el mando militar del jugador."
    },
    {
      id:"werner-von-fritsch",category:"person",name:"Werner von Fritsch",period:"1880–1939",
      aliases:["Werner von Fritsch","von Fritsch","Fritsch"],
      summary:"Comandante en jefe del Ejército alemán hasta febrero de 1938.",
      specs:{"Cargo hasta 1938":"Oberbefehlshaber des Heeres","Sustituto":"Walther von Brauchitsch"},
      details:["Fue apartado durante la crisis Blomberg-Fritsch.","Su salida formó parte de una remodelación que redujo la autonomía institucional de la cúpula militar."],
      context:"Su relevo abre el prólogo de 1938."
    },
    {
      id:"heinz-guderian",category:"person",name:"Heinz Guderian",period:"1888–1954",
      aliases:["Heinz Guderian","Guderian"],
      summary:"General alemán asociado al desarrollo y empleo de fuerzas blindadas y motorizadas.",
      specs:{"Mando en Polonia 1939":"XIX. Armeekorps (mot.)","Rama":"Heer"},
      details:["Durante la invasión de Polonia mandó el XIX Cuerpo motorizado.","Su papel en el juego sirve para explorar velocidad operacional, coordinación, combustible, comunicaciones y congestión."],
      context:"Es el protagonista militar del capítulo de Fall Weiss."
    },
    {
      id:"leo-geyr",category:"person",name:"Leo Geyr von Schweppenburg",period:"1886–1974",
      aliases:["Leo Geyr von Schweppenburg","Geyr von Schweppenburg"],
      summary:"General alemán que mandó la 3. Panzer-Division durante la campaña de Polonia.",
      specs:{"Unidad":"3. Panzer-Division","Campaña":"Polonia, 1939"},
      details:["Su división formó parte del XIX Cuerpo motorizado de Guderian.","La ficha aparece cuando su formación entra en la información disponible para el jugador."],
      context:"Relaciona una unidad del mapa con un mando histórico real."
    },
    {
      id:"paul-bader",category:"person",name:"Paul Bader",period:"1883–1971",
      aliases:["Paul Bader"],
      summary:"General alemán que mandó la 2. Infanterie-Division (mot.) en 1939.",
      specs:{"Unidad":"2. Infanterie-Division (mot.)","Tipo":"Infantería motorizada"},
      details:["La motorización permitía mayor movilidad operativa, pero seguía dependiendo de carreteras, mantenimiento y combustible."],
      context:"Ayuda a diferenciar una división motorizada de una división blindada."
    },
    {
      id:"heer",category:"organization",name:"Heer",period:"1935–1945",
      aliases:["Heer","Ejército alemán","Ejército"],
      summary:"Componente terrestre de la Wehrmacht.",
      specs:{"Ámbito":"Fuerzas terrestres","Mando superior":"OKH"},
      details:["Incluía infantería, tropas blindadas, artillería, ingenieros, transmisiones, reconocimiento y numerosos servicios de apoyo.","El juego se centra principalmente en su cadena de mando y logística."],
      context:"Es la organización principal desde cuya perspectiva se desarrolla FRONTLINE 1944."
    },
    {
      id:"okh",category:"organization",name:"Oberkommando des Heeres (OKH)",period:"1935–1945",
      aliases:["Oberkommando des Heeres","OKH"],
      summary:"Alto Mando del Ejército alemán.",
      specs:{"Abreviatura":"OKH","Función":"Dirección superior del Heer"},
      details:["Coordinaba planificación, organización y conducción del Ejército.","Su relación con el OKW y con Hitler cambió durante la guerra."],
      context:"Es un nodo fundamental de la cadena de mando del juego."
    },
    {
      id:"okw",category:"organization",name:"Oberkommando der Wehrmacht (OKW)",period:"1938–1945",
      aliases:["Oberkommando der Wehrmacht","OKW"],
      summary:"Alto Mando de las Fuerzas Armadas creado en febrero de 1938.",
      specs:{"Creación":"4 de febrero de 1938","Ámbito":"Coordinación superior de la Wehrmacht"},
      details:["Sustituyó al Ministerio de Guerra como estructura central bajo la autoridad directa de Hitler.","No eliminó los altos mandos separados del Ejército, Marina y Fuerza Aérea."],
      context:"Su creación es uno de los cambios estructurales del prólogo de 1938."
    },
    {
      id:"generalstab",category:"organization",name:"Generalstab des Heeres",period:"Época de preguerra y guerra",
      aliases:["Generalstab des Heeres","Generalstab","Estado Mayor"],
      summary:"Estado Mayor General del Ejército, responsable de buena parte del trabajo profesional de planificación.",
      specs:{"Funciones":"Operaciones, planificación, organización y procedimientos","Sede principal":"Berlín"},
      details:["El sistema de Estado Mayor dependía de oficiales formados para convertir objetivos superiores en planes, órdenes y coordinación.","FRONTLINE representa esa labor mediante partes, informes, incertidumbre y decisiones."],
      context:"Es el cerebro técnico que transforma información incompleta en órdenes."
    },
    {
      id:"kstn",category:"document",name:"Kriegsstärkenachweisung (KStN)",period:"Sistema de plantillas militares",
      aliases:["KStN","Kriegsstärkenachweisung"],
      summary:"Tabla oficial que definía la organización y dotación teórica de una unidad.",
      specs:{"Contenido":"Personal, armas, vehículos y puestos autorizados","Uso":"Organización y movilización"},
      details:["Una KStN describe una plantilla teórica, no garantiza que una unidad disponga realmente de todo lo autorizado.","Por eso el juego diferencia plantilla, preparación y disponibilidad efectiva."],
      context:"Permite explicar por qué una división en el papel puede ser distinta de la fuerza realmente disponible."
    },
    {
      id:"blomberg-fritsch",category:"event",name:"Crisis Blomberg-Fritsch",period:"Enero–febrero de 1938",
      aliases:["crisis Blomberg-Fritsch","Blomberg-Fritsch"],
      summary:"Crisis política y militar que provocó la salida de Werner von Blomberg y Werner von Fritsch y facilitó una reorganización de la cúpula militar.",
      specs:{"Fecha clave":"4 de febrero de 1938","Consecuencia institucional":"Creación del OKW y remodelación del mando"},
      details:["La crisis permitió a Hitler aumentar su control directo sobre las fuerzas armadas.","El juego la utiliza como punto de partida de la campaña de 1938."],
      context:"No es una batalla, sino un cambio de arquitectura de poder con consecuencias militares."
    },
    {
      id:"anschluss",category:"event",name:"Anschluss de Austria",period:"Marzo de 1938",
      aliases:["Anschluss","Austria"],
      summary:"Anexión de Austria por la Alemania nazi en marzo de 1938.",
      specs:{"Entrada de tropas":"12 de marzo de 1938","Anexión formal":"Marzo de 1938"},
      details:["La operación expuso problemas reales de movilidad, tráfico y averías a pesar de la ausencia de una campaña convencional.","En el juego sirve para convertir un acontecimiento político en una prueba logística."],
      context:"Desbloquea lecciones sobre movimiento de columnas y capacidad real frente a capacidad teórica."
    },
    {
      id:"munich",category:"event",name:"Acuerdo de Múnich",period:"29–30 de septiembre de 1938",
      aliases:["Acuerdo de Múnich","Munich Agreement","Múnich"],
      summary:"Acuerdo entre Alemania, Reino Unido, Francia e Italia que permitió la cesión de los Sudetes a Alemania sin participación checoslovaca en la negociación final.",
      specs:{"Fecha":"29–30 septiembre 1938","Efecto inmediato":"Cesión de los Sudetes"},
      details:["La posterior ocupación alemana se realizó por fases.","El juego diferencia el hecho histórico de las decisiones operativas simuladas del jugador."],
      context:"Transforma una posible campaña militar en una ocupación planificada."
    },
    {
      id:"sudetenland",category:"place",name:"Sudetes",period:"Europa Central, 1938",
      aliases:["Sudetes","Sudetenland","regiones sudetas","zonas sudetas"],
      summary:"Regiones fronterizas de Checoslovaquia con importante población germanoparlante y extensas defensas fronterizas.",
      specs:{"Ocupación alemana":"1–10 octubre 1938","Importancia militar":"Frontera fortificada e infraestructura estratégica"},
      details:["La cesión incluyó numerosas posiciones defensivas checoslovacas.","Su inspección posterior ofreció al Ejército alemán información sobre fortificación moderna."],
      context:"En el juego funciona simultáneamente como territorio, problema logístico y fuente de inteligencia técnica."
    },
    {
      id:"czech-fortifications",category:"place",name:"Fortificaciones fronterizas checoslovacas",period:"Década de 1930",
      aliases:["fortificaciones","fortificación","defensas fronterizas checoslovacas","posiciones defensivas"],
      summary:"Sistema de defensas permanentes construido por Checoslovaquia antes de la guerra.",
      specs:{"Tipo":"Búnkeres, obstáculos y posiciones fortificadas","Función":"Defensa de accesos fronterizos"},
      details:["La eficacia real de una fortificación depende de guarnición, fuego, obstáculos, comunicaciones y apoyo, no solo del hormigón.","Tras la ocupación de los Sudetes, instalaciones capturadas pudieron ser estudiadas físicamente."],
      context:"La enciclopedia separa la descripción técnica del análisis contrafactual de cómo habrían rendido en combate."
    },
    {
      id:"graf-zeppelin",category:"vehicle",name:"Graf Zeppelin",period:"Portaaviones alemán",
      aliases:["Graf Zeppelin"],
      summary:"Primer portaaviones alemán, botado en diciembre de 1938 y nunca completado para servicio operativo.",
      specs:{"Tipo":"Portaaviones","Botadura":"8 diciembre 1938","Estado final":"No completado operacionalmente"},
      details:["El programa representaba una gran inversión industrial y tecnológica para la Kriegsmarine.","En el juego sirve para mostrar competencia por recursos industriales entre ramas."],
      context:"Su valor enciclopédico es industrial y estratégico, no solo naval."
    },
    {
      id:"luetzow",category:"vehicle",name:"Lützow",period:"Crucero pesado",
      aliases:["Lützow","Lutzow"],
      summary:"Nombre recibido por el crucero pesado Deutschland en 1940; aparece en el prólogo solo como archivo retrospectivo cuando así se etiqueta.",
      specs:{"Tipo":"Crucero pesado","Uso en el juego":"Archivo posterior, no evidencia contemporánea de 1938"},
      details:["La interfaz marca explícitamente fotografías posteriores para evitar mezclarlas con documentación contemporánea."],
      context:"Es también una demostración del sistema de cronología documental de FRONTLINE."
    },
    {
      id:"fall-weiss",category:"event",name:"Fall Weiss",period:"Septiembre de 1939",
      aliases:["Fall Weiss","invasión de Polonia","Polonia"],
      summary:"Nombre del plan alemán para la invasión de Polonia iniciada el 1 de septiembre de 1939.",
      specs:{"Inicio":"1 septiembre 1939","Teatro":"Polonia"},
      details:["La campaña combinó fuerzas terrestres y aéreas, movimientos rápidos y combates intensos, pero no debe reducirse al mito de una mecanización total.","Una parte importante del Ejército alemán seguía dependiendo de infantería y tracción no motorizada."],
      context:"Es el primer gran capítulo de guerra abierta del juego."
    },
    {
      id:"gleiwitz",category:"event",name:"Incidente de Gleiwitz",period:"31 de agosto de 1939",
      aliases:["Gleiwitz","emisora de Gleiwitz","ataque fingido"],
      summary:"Operación de bandera falsa organizada por la Alemania nazi contra una emisora alemana y utilizada dentro de la propaganda previa a la invasión de Polonia.",
      specs:{"Fecha":"31 agosto 1939","Naturaleza":"Operación de bandera falsa"},
      details:["No constituyó una agresión polaca real contra Alemania.","El juego lo presenta como parte del contexto propagandístico y no como justificación válida de la invasión."],
      context:"Ayuda a separar propaganda de hechos documentados."
    },
    {
      id:"panzer-i",category:"vehicle",name:"Panzerkampfwagen I",period:"Carro ligero",
      aliases:["Panzer I","Pz.Kpfw. I","Panzerkampfwagen I"],
      summary:"Carro ligero alemán concebido inicialmente en un contexto de entrenamiento y expansión de las fuerzas blindadas.",
      specs:{"Tripulación":"2","Armamento principal":"2 ametralladoras MG 13","Peso aproximado":"5–6 t según versión"},
      details:["Su protección y armamento eran limitados frente a carros más modernos.","En 1939 todavía estaba presente en unidades panzer por la rápida expansión de la fuerza blindada."],
      context:"La ficha distingue disponibilidad histórica de capacidad táctica real."
    },
    {
      id:"panzer-ii",category:"vehicle",name:"Panzerkampfwagen II",period:"Carro ligero",
      aliases:["Panzer II","Pz.Kpfw. II","Panzerkampfwagen II"],
      summary:"Carro ligero alemán empleado ampliamente al comienzo de la guerra.",
      specs:{"Tripulación":"3","Armamento principal":"Cañón automático de 20 mm","Peso aproximado":"8–10 t según versión"},
      details:["Ofrecía mejor capacidad antiblindaje que el Panzer I, pero seguía siendo un carro ligero.","Las variantes y modificaciones hacen que cifras como blindaje o peso dependan del modelo concreto."],
      context:"Su entrada enciclopédica permite comparar versiones sin convertir una etiqueta de unidad en una estadística única."
    },
    {
      id:"panzer-iii",category:"vehicle",name:"Panzerkampfwagen III",period:"Carro medio",
      aliases:["Panzer III","Pz.Kpfw. III","Panzerkampfwagen III"],
      summary:"Carro medio diseñado para combatir otros carros y convertirse en una pieza central de las divisiones panzer.",
      specs:{"Tripulación":"5","Armamento inicial común":"Cañón de 37 mm en primeras series","Evolución":"Versiones posteriores recibieron cañones de 50 mm"},
      details:["Su torre de tres hombres favorecía la división de tareas entre comandante, artillero y cargador.","Sus especificaciones cambiaron sustancialmente entre variantes."],
      context:"El juego puede enlazar cada variante futura a una ficha técnica específica."
    },
    {
      id:"panzer-iv",category:"vehicle",name:"Panzerkampfwagen IV",period:"Carro medio",
      aliases:["Panzer IV","Pz.Kpfw. IV","Panzerkampfwagen IV"],
      summary:"Carro medio alemán originalmente orientado al apoyo con un cañón corto de 75 mm y desarrollado durante toda la guerra.",
      specs:{"Tripulación":"5","Armamento temprano":"Cañón corto de 75 mm","Evolución":"Blindaje y armamento aumentaron en versiones posteriores"},
      details:["Fue una plataforma muy longeva, por lo que cualquier ficha técnica debe indicar la variante y fecha.","FRONTLINE evita mezclar especificaciones de modelos tardíos con campañas tempranas."],
      context:"Sirve como ejemplo del sistema de fichas por variante y cronología."
    },
    {
      id:"mg34",category:"vehicle",name:"MG 34",period:"Ametralladora",
      aliases:["MG 34","MG34"],
      summary:"Ametralladora alemana de propósito general empleada como arma ligera, pesada sobre trípode y armamento de vehículos.",
      specs:{"Calibre":"7,92×57 mm","Alimentación":"Cinta o tambor según configuración","Rol":"Ametralladora de propósito general"},
      details:["Su flexibilidad permitió integrarla en distintos niveles de unidad y plataformas.","El rendimiento práctico dependía de montaje, munición, mantenimiento y misión."],
      context:"Las fichas de armamento describen función y características sin sustituir la simulación logística."
    },
    {
      id:"kar98k",category:"vehicle",name:"Karabiner 98k",period:"Fusil de cerrojo",
      aliases:["Karabiner 98k","Kar 98k","K98k"],
      summary:"Fusil de cerrojo estándar ampliamente utilizado por el Ejército alemán.",
      specs:{"Calibre":"7,92×57 mm","Acción":"Cerrojo","Capacidad":"5 cartuchos en depósito interno"},
      details:["Era un arma individual estándar, pero la potencia de fuego de una escuadra dependía especialmente de su ametralladora y del suministro de munición."],
      context:"La enciclopedia enlaza armas individuales con la organización de la unidad."
    },
    {
      id:"pak36",category:"vehicle",name:"3,7 cm Pak 36",period:"Cañón anticarro",
      aliases:["Pak 36","3,7 cm Pak 36","3.7 cm Pak 36"],
      summary:"Cañón anticarro ligero alemán de 37 mm usado ampliamente al comienzo de la guerra.",
      specs:{"Calibre":"37 mm","Tipo":"Cañón anticarro remolcado","Época principal":"Primeras campañas de la guerra"},
      details:["Su bajo peso facilitaba el movimiento, pero su capacidad contra blindajes más pesados se volvió insuficiente a medida que avanzó la guerra."],
      context:"La ficha permite que la eficacia dependa del objetivo, distancia y munición dentro de la simulación, no de una cifra abstracta."
    }
  ]
};

function frontlineNormalizeText(value){
  return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}

function frontlineEntryMatches(entry,text){
  const haystack=frontlineNormalizeText(text);
  return (entry.aliases||[entry.name]).some(alias=>haystack.includes(frontlineNormalizeText(alias)));
}

function frontlineDiscoverEntries(text){
  return FRONTLINE_ENCYCLOPEDIA.entries.filter(entry=>frontlineEntryMatches(entry,text)).map(entry=>entry.id);
}

function frontlineEncyclopediaEntry(id){
  return FRONTLINE_ENCYCLOPEDIA.entries.find(entry=>entry.id===id)||null;
}


function frontlineExpandEncyclopediaCatalog(){
  const names=new Set(FRONTLINE_ENCYCLOPEDIA.entries.map(entry=>frontlineNormalizeText(entry.name)));

  const add=entry=>{
    const key=frontlineNormalizeText(entry.name);
    if(!key||names.has(key))return;
    if(entry.category==="person"){
      const duplicate=FRONTLINE_ENCYCLOPEDIA.entries.some(existing=>{
        if(existing.category!=="person")return false;
        const variants=[existing.name,...(existing.aliases||[])].map(frontlineNormalizeText).filter(Boolean);
        return variants.some(v=>key===v||key.includes(v)||v.includes(key));
      });
      if(duplicate)return;
    }
    names.add(key);
    FRONTLINE_ENCYCLOPEDIA.entries.push(entry);
  };

  (FRONTLINE_DATA.armory||[]).forEach(item=>{
    add({
      id:"armory-"+frontlineNormalizeText(item.name).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
      category:"vehicle",
      name:item.name,
      period:"Introducción / referencia: "+item.year,
      aliases:[item.name],
      summary:item.note||("Referencia material de "+item.type+"."),
      specs:{
        "Tipo":item.type||"Material militar",
        "Año de referencia":String(item.year||"No especificado"),
        "Munición / sistema":item.ammo||"Consultar variante"
      },
      details:[
        "Esta ficha se genera desde el archivo material del juego para que cualquier arma o munición incorporada al arsenal pueda formar parte también de la enciclopedia.",
        "Cuando existan variantes con diferencias relevantes de peso, blindaje, munición o prestaciones, FRONTLINE debe tratarlas como fichas separadas o indicar expresamente la variante."
      ],
      context:"Se desbloquea cuando esta referencia material aparece en la narración, un parte, una unidad o un documento de campaña."
    });
  });

  Object.values(FRONTLINE_DATA.campaigns||{}).forEach(campaign=>{
    if(campaign.protagonist){
      add({
        id:"person-"+frontlineNormalizeText(campaign.protagonist).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
        category:"person",
        name:campaign.protagonist,
        period:campaign.startDate||"Registro de campaña",
        aliases:[campaign.protagonist],
        summary:"Mando histórico representado en "+campaign.title+".",
        specs:{"Mando":campaign.command||"No especificado","Campaña":campaign.title||"Campaña histórica"},
        details:["La ficha se genera desde el orden de batalla de la campaña. Las biografías especialmente relevantes pueden sustituirse por una entrada curada más completa."],
        context:"Vincula el personaje histórico con la cadena de mando que el jugador está viendo en ese momento."
      });
    }

    (campaign.formations||[]).forEach(formation=>{
      const commander=String(formation.commander||"").trim();
      if(!commander||/^(OKH|inspecciones|arma de|estado mayor|mando|desconocido)/i.test(commander))return;
      add({
        id:"person-"+frontlineNormalizeText(commander).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
        category:"person",
        name:commander,
        period:campaign.startDate||"Registro de campaña",
        aliases:[commander],
        summary:"Comandante histórico asociado a "+formation.name+".",
        specs:{
          "Unidad":formation.name||"No especificada",
          "Función":formation.role||"Mando de formación",
          "Posición inicial":formation.position||"No especificada",
          "Campaña":campaign.title||"Campaña histórica"
        },
        details:["Esta entrada se genera directamente desde el orden de batalla histórico cargado por la campaña.","Puede ampliarse con una biografía curada sin cambiar el sistema de descubrimiento."],
        context:"Permite pasar de la ficha de una unidad a la persona histórica que la mandaba."
      });
    });
  });
}

frontlineExpandEncyclopediaCatalog();
