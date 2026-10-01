const FRONTLINE_DATA = {
  build: "0.5.0",

  assets: {
    heroPhoto: "https://upload.wikimedia.org/wikipedia/commons/d/df/Bundesarchiv_Bild_101I-012-0035-11A%2C_Polen%2C_Panzer_I_und_Infanterie.jpg",
    campaignMap: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Poland1939_GermanPlanMap.jpg",
    staffPhoto: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bundesarchiv_Bild_101I-001-0256-31%2C_Warschau%2C_Generale_v._Weichs%2C_Blaskowitz.jpg"
  },

  chapters: [
    {id:"ch1",number:"I",year:"1939",title:"FALL WEISS",subtitle:"Polonia",status:"available"},
    {id:"ch2",number:"II",year:"1940",title:"WESERÜBUNG",subtitle:"Dinamarca y Noruega",status:"locked"},
    {id:"ch3",number:"III",year:"1940",title:"FALL GELB",subtitle:"Francia y Países Bajos",status:"locked"},
    {id:"ch4",number:"IV",year:"1941",title:"BARBAROSSA",subtitle:"Unión Soviética",status:"locked"},
    {id:"ch5",number:"V",year:"1942",title:"EL ESTE",subtitle:"Desgaste y profundidad",status:"locked"},
    {id:"ch6",number:"VI",year:"1943",title:"LA INICIATIVA",subtitle:"Defensa y retirada",status:"locked"},
    {id:"ch7",number:"VII",year:"1944",title:"FRONTLINE 1944",subtitle:"Normandía y colapso del frente",status:"locked"}
  ],

  chapter1: {
    id:"ch1",
    title:"CAPÍTULO I · FALL WEISS",
    subtitle:"Polonia · 1 de septiembre de 1939",
    protagonist:"General der Panzertruppe Heinz Guderian",
    command:"XIX. Armeekorps (mot.) · 4. Armee · Heeresgruppe Nord",
    objective:"Llevar el cuerpo hasta el río Brda antes del anochecer sin desarticularlo.",
    dossier:[
      "Alemania invade Polonia en la madrugada del 1 de septiembre de 1939. El ataque no es una respuesta defensiva: la justificación propagandística alemana se apoya, entre otros elementos, en un ataque fingido contra la emisora de Gleiwitz.",
      "Tu mando es el XIX. Armeekorps motorizado. Su función inicial dentro del 4.º Ejército es contribuir a cortar el Corredor Polaco y avanzar hacia el Vístula.",
      "Bajo el cuerpo se encuentran la 3. Panzer-Division, la 2. Infanterie-Division (mot.) y la 20. Infanterie-Division (mot.). La velocidad importa, pero también el combustible, los puentes, las carreteras, la niebla, el tráfico y la cohesión entre columnas.",
      "<b>Tu objetivo para el primer día:</b> alcanzar el río Brda con la vanguardia y llegar con un cuerpo capaz de seguir combatiendo. Cada orden consume tiempo. Los informes pueden ser falsos. Puedes fracasar."
    ],
    start:"briefing",
    startClock:-25,
    resources:{
      command:8,
      communications:78,
      fuel:86,
      ammunition:88,
      movement:82,
      cohesion:84,
      reconnaissance:49,
      fatigue:8
    },
    // Verdad del escenario, decidida al azar al empezar. El jugador solo la conoce a través de informes.
    hidden:{
      chojnice:{fuerte:0.6,debil:0.4},
      bridge:{intacto:0.35,volado:0.65},
      cavalry:{flanco:0.7,lejos:0.3}
    },
    formations:[
      {id:"3pz",name:"3. Panzer-Division",commander:"Generalleutnant Leo Geyr von Schweppenburg",role:"Schwerpunkt blindado",readiness:90,supply:89,position:"Frontera de Pomerania"},
      {id:"2mot",name:"2. Infanterie-Division (mot.)",commander:"Generalleutnant Paul Bader",role:"Infantería motorizada",readiness:86,supply:91,position:"Centro del dispositivo"},
      {id:"20mot",name:"20. Infanterie-Division (mot.)",commander:"Generalleutnant Mauritz von Wiktorin",role:"Ala septentrional",readiness:84,supply:88,position:"Norte del dispositivo"}
    ],
    staff:[
      {id:"ia",rank:"Oberst i.G.",name:"Friedrich Keller",role:"Ia · Operaciones",fictional:true,trust:70,notes:[
        {if:{res:{cohesion:{lt:60}}},text:"Keller está alarmado: las columnas se mezclan y las órdenes llegan a unidades que ya no están donde creemos. Pide consolidar antes de exigir más."},
        {if:{res:{cohesion:{lt:72}}},text:"Las diferencias de ritmo entre las columnas empiezan a preocupar a Operaciones. Keller pide reducir órdenes simultáneas."},
        {if:{progress:{gte:60}},text:"Keller ve el Brda al alcance. Recuerda que llegar al río no sirve de nada si la división llega sin munición para cruzarlo."},
        {text:"Insiste en preservar el ritmo de marcha y evitar que las columnas se mezclen en los cruces."}
      ]},
      {id:"ic",rank:"Major i.G.",name:"Ernst Weber",role:"Ic · Inteligencia",fictional:true,trust:65,notes:[
        {if:{res:{reconnaissance:{lt:40}}},text:"Weber admite que trabaja casi a ciegas. Sus estimaciones son poco más que suposiciones: trátalas como rumores."},
        {if:{res:{reconnaissance:{gt:65}}},text:"La imagen táctica está mejorando. Weber recuerda que un informe correcto hace treinta minutos puede ser falso ahora."},
        {text:"La información sobre las posiciones polacas al otro lado de la frontera es incompleta y envejece rápido."}
      ]},
      {id:"qu",rank:"Oberstleutnant",name:"Otto Hartmann",role:"Qu · Logística",fictional:true,trust:72,notes:[
        {if:{res:{fuel:{lt:45}}},text:"Hartmann es tajante: si la vanguardia sigue consumiendo a este ritmo, mañana los Panzer serán cañones fijos."},
        {if:{res:{fuel:{lt:66}}},text:"La situación de combustible sigue siendo utilizable, pero Hartmann exige evitar movimientos sin objetivo operativo claro."},
        {if:{res:{ammunition:{lt:55}}},text:"Hartmann advierte que la munición de artillería no llegará a la vanguardia hasta la noche."},
        {text:"Advierte que velocidad y combustible no son lo mismo: una columna detenida también consume tiempo y capacidad de transporte."}
      ]}
    ],

    // Croquis operacional esquemático (no a escala). Posiciones relativas, no cartografía exacta.
    map:{
      width:1000,height:560,
      turnsFrom:285,
      units:[
        {id:"3pz",short:"3. Pz.Div.",symbol:"3 Pz",fuelRate:1.8,speed:1},
        {id:"2mot",short:"2. ID (mot.)",symbol:"2 mot",fuelRate:.8,speed:1},
        {id:"20mot",short:"20. ID (mot.)",symbol:"20 mot",fuelRate:.8,speed:1}
      ],
      routes:{
        "3pz":{points:[{u:0,x:90,y:430,label:"la frontera"},{u:22,x:230,y:440,label:"Sępólno (Zempelburg)"},{u:45,x:360,y:420,label:"los caminos hacia el Brda"},{u:70,x:500,y:400,label:"el Brda"},{u:85,x:600,y:410,label:"la orilla este del Brda"},{u:130,x:900,y:380,label:"el camino al Vístula"}]},
        "2mot":{points:[{u:0,x:90,y:290,label:"la frontera"},{u:15,x:210,y:285,label:"el borde del bosque"},{u:32,x:330,y:280,label:"los bosques de Tuchola"},{u:50,x:470,y:270,label:"el Brda (norte)"},{u:65,x:600,y:250,label:"Tuchola"}],forest:[[12,50]]},
        "20mot":{points:[{u:0,x:90,y:150,label:"la frontera"},{u:20,x:240,y:140,label:"Chojnice (Konitz)"},{u:35,x:360,y:110,label:"el sector de Krojanty"},{u:55,x:465,y:130,label:"el Brda (norte)"}]}
      },
      places:[
        {x:240,y:140,name:"Chojnice"},{x:385,y:92,name:"Krojanty"},{x:230,y:440,name:"Sępólno"},
        {x:600,y:250,name:"Tuchola"},{x:910,y:362,name:"Świecie"}
      ],
      forests:[{x:200,y:200,w:290,h:150,label:"Bosques de Tuchola"}],
      rivers:[
        {name:"Brda",d:"M470 20 C 478 120 455 220 480 300 S 515 470 530 560",lx:490,ly:200},
        {name:"Vístula",d:"M930 20 C 915 160 940 300 925 420 S 940 520 935 560",lx:945,ly:120}
      ],
      border:"M150 20 L 150 560",
      enemies:[
        {id:"cover3",name:"Destacamento de cobertura polaco",area:"el eje de la 3. Pz.Div.",route:"3pz",u:34,strength:1,misreport:"posible posición anticarro",clearText:"despeja el destacamento de cobertura y reanuda la marcha."},
        {id:"chojnice",name:"Defensa de Chojnice",area:"Chojnice",route:"20mot",u:20,strengthBy:{hidden:"chojnice",map:{fuerte:3,debil:1}},clearedBy:["chojnice_taken"],bypassBy:["chojnice_contained"],onClear:["chojnice_taken"],misreport:"guarnición de fuerza desconocida",clearText:"toma Chojnice. La carretera queda libre."},
        {id:"forest",name:"Grupo polaco en los bosques",area:"los bosques de Tuchola",route:"2mot",u:28,strength:2,clearedBy:["forest_cleared"],onClear:["forest_cleared"],misreport:"movimientos en el bosque",clearText:"limpia el sector forestal y abre los caminos."},
        {id:"tuchola",name:"Posiciones ante Tuchola",area:"Tuchola",route:"2mot",u:58,strength:2,misreport:"posiciones defensivas",clearText:"rompe las posiciones ante Tuchola."},
        {id:"brda",name:"Defensa del Brda",area:"el Brda",route:"3pz",u:71,scripted:true,clearedBy:["bridgehead","bridgehead_small","bridgehead_costly"],misreport:"posiciones en la orilla este",reachText:"alcanza el Brda. El cruce del río exige una decisión de mando."},
        {id:"cavalry",name:"Brigada de Caballería Pomorska",area:"el flanco norte",placeBy:{hidden:"cavalry",map:{flanco:{x:400,y:70},lejos:{x:560,y:50}}},detectRange:190,misreport:"jinetes en número desconocido"}
      ]
    },

    // Si el cuerpo se desarticula o se queda seco, la jornada termina antes de tiempo.
    failures:[
      {if:{res:{cohesion:{lt:35}}},to:"collapse"},
      {if:{res:{fuel:{lt:15}}},to:"stalled"}
    ],

    evaluation:{
      criteria:[
        {label:"Objetivo: río Brda",max:40,levels:[
          {if:{flag:"bridgehead"},points:40,text:"Cabeza de puente al otro lado del Brda."},
          {if:{any:[{flag:"bridgehead_small"},{flag:"bridgehead_costly"}]},points:35,text:"Una cabeza de puente precaria al otro lado del río."},
          {if:{progress:{gte:70}},points:30,text:"La vanguardia alcanza el Brda."},
          {if:{progress:{gte:50}},points:15,text:"La vanguardia queda a distancia del río."},
          {points:5,text:"El avance se queda corto."}
        ]},
        {label:"Conservación de fuerzas",max:15,levels:[
          {if:{losses:{men:{lt:400}}},points:15,text:"Pérdidas ligeras."},
          {if:{losses:{men:{lt:800}}},points:10,text:"Pérdidas moderadas."},
          {if:{losses:{men:{lt:1250}}},points:5,text:"Pérdidas serias."},
          {points:0,text:"Pérdidas graves para un solo día."}
        ]},
        {label:"Cohesión del cuerpo",max:10,levels:[
          {if:{res:{cohesion:{gte:75}}},points:10,text:"Las divisiones siguen coordinadas."},
          {if:{res:{cohesion:{gte:55}}},points:6,text:"Cohesión aceptable, con fricción."},
          {points:2,text:"El cuerpo llega desordenado."}
        ]},
        {label:"Logística para el día 2",max:10,levels:[
          {if:{all:[{res:{fuel:{gte:50}}},{res:{ammunition:{gte:50}}}]},points:10,text:"Combustible y munición para continuar."},
          {if:{all:[{res:{fuel:{gte:30}}},{res:{ammunition:{gte:30}}}]},points:6,text:"Suficiente para una mañana de operaciones."},
          {points:1,text:"El día 2 empieza esperando a los convoyes."}
        ]},
        {label:"Divisiones de infantería motorizada",max:15,levels:[
          {if:{all:[{unit:{"2mot":{gte:35}}},{unit:{"20mot":{gte:25}}}]},points:15,text:"La 2. y la 20. ID (mot.) acompañan el avance."},
          {if:{any:[{unit:{"2mot":{gte:35}}},{unit:{"20mot":{gte:25}}}]},points:7,text:"Una de las divisiones motorizadas se ha quedado atrás."},
          {points:0,text:"La infantería motorizada se ha quedado muy atrás."}
        ]},
        {label:"Flanco septentrional",max:10,levels:[
          {if:{noFlag:"rear_panic"},points:10,text:"El flanco aguantó sin pánico."},
          {if:{flag:"general_present"},points:6,text:"Hubo alarma, pero el mando la contuvo."},
          {points:0,text:"La alarma en el flanco quedó sin resolver."}
        ]}
      ],
      verdicts:[
        {min:88,title:"MÁS ALLÁ DE LO HISTÓRICO",text:"El cuerpo termina la jornada en mejor situación que la registrada históricamente. La 4. Armee anota la velocidad del XIX. Armeekorps; el riesgo asumido no te ha pasado factura todavía."},
        {min:72,title:"RITMO HISTÓRICO",text:"El cuerpo cumple el objetivo del primer día con un coste asumible. Es aproximadamente lo que ocurrió: el Brda alcanzado y el paso pendiente para los días siguientes."},
        {min:52,title:"AVANCE CONTENIDO",text:"El cuerpo avanza, pero por debajo de lo esperado. Mañana tendrás que recuperar tiempo con menos margen."},
        {min:0,title:"JORNADA FALLIDA",text:"El primer día deja al cuerpo lejos del objetivo y debilitado. El mando superior empezará a preguntar qué ha fallado."}
      ],
      history:[
        "Según las memorias de Guderian, al final del 1 de septiembre la 3. Panzer-Division había alcanzado el Brda; el paso del río y la consolidación al otro lado ocuparon los días siguientes.",
        "Al anochecer del 1 de septiembre, el 18.º Regimiento de Ulanos polaco cargó cerca de Krojanty contra infantería alemana. La carga fue detenida por vehículos blindados y fuego de ametralladora; su comandante, el coronel Kazimierz Mastalerz, murió en la acción.",
        "Los combates en los bosques de Tuchola se prolongaron durante los primeros días de septiembre, hasta el cierre del Corredor Polaco."
      ]
    }
  },

  scenes:{
    briefing:{
      id:"briefing",
      at:-25,
      urgency:"GEHEIME KOMMANDOSACHE",
      from:"4. Armee · Estado Mayor",
      title:"La orden entra en vigor",
      classification:"HECHO HISTÓRICO + RECONSTRUCCIÓN NARRATIVA",
      body:[
        "Las órdenes están confirmadas. El ataque comenzará a las 04:45. La misión del 4.º Ejército es romper el Corredor Polaco y establecer la conexión operativa hacia Prusia Oriental.",
        "Tu cuerpo motorizado debe mantener velocidad y cohesión. Las carreteras son limitadas y el movimiento simultáneo de blindados, infantería motorizada, artillería y trenes logísticos puede crear sus propios atascos.",
        "Antes de que amanezca debes decidir desde dónde vas a mandar. Esa decisión determinará qué ves, qué tarde te llega y qué riesgos corres tú mismo."
      ],
      historical:[
        "Alemania atacó Polonia el 1 de septiembre de 1939, iniciando la Segunda Guerra Mundial en Europa.",
        "El XIX Cuerpo motorizado de Guderian estaba subordinado al 4.º Ejército del Grupo de Ejércitos Norte y participó en el ataque para cortar el Corredor Polaco.",
        "La hora de ataque fijada para el 1 de septiembre fue las 04:45."
      ],
      intel:["La información disponible antes del cruce de frontera es incompleta y pierde valor rápidamente con el movimiento."],
      choices:[
        {id:"forward_hq",title:"PUESTO DE MANDO JUNTO A LA VANGUARDIA",tag:"VER CON TUS OJOS",desc:"Acompañar a la 3. Panzer-Division. Verás antes, pero el resto del cuerpo te oirá peor.",effects:{res:{command:-1,reconnaissance:+6,communications:-6,fatigue:+5},flags:["hq_forward"]},next:"fog",result:"Trasladas el puesto de mando hacia delante. La imagen de la vanguardia será inmediata; la de las otras dos divisiones dependerá de la radio."},
        {id:"mobile_hq",title:"MANDO MÓVIL ESCALONADO",tag:"COMPROMISO",desc:"Puesto móvil detrás de la vanguardia, con oficiales de enlace adelantados.",effects:{res:{communications:+2,cohesion:+3,fatigue:+2},flags:["hq_mobile"]},next:"fog",result:"El Estado Mayor avanzará por saltos. Pierdes algo de inmediatez a cambio de una red de mando más estable."},
        {id:"rear_hq",title:"PUESTO DE MANDO EN RETAGUARDIA",tag:"RED DE MANDO",desc:"Priorizar comunicaciones y control de tráfico por encima del contacto directo.",effects:{res:{communications:+8,cohesion:+4,reconnaissance:-5},flags:["hq_rear"]},next:"fog",result:"El mando conserva una red de comunicaciones ordenada, pero los informes de vanguardia llegarán tarde y filtrados."}
      ]
    },

    fog:{
      id:"fog",
      at:320,
      urgency:"PARTE DE VANGUARDIA",
      from:"3. Panzer-Division",
      title:"Niebla, columnas y fuego propio",
      classification:"HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
      onEnter:[
        {if:{flag:"hq_forward"},effects:{res:{command:-1,fatigue:+4},trust:{ia:-4}}}
      ],
      body:[
        "La madrugada está cubierta de niebla. La vanguardia informa de visibilidad reducida, caminos congestionados y contacto irregular con unidades polacas.",
        {if:{flag:"hq_forward"},text:"<b>Tu propio grupo de mando está bajo los proyectiles.</b> La artillería pesada del cuerpo dispara a ciegas dentro de la niebla: un impacto cae delante de tu vehículo, el siguiente detrás. Pierdes media hora y la calma de tu escolta."},
        {if:{noFlag:"hq_forward"},text:"Llega un parte confuso: una batería propia ha abierto fuego demasiado cerca de elementos adelantados. El incidente revela el riesgo de que las columnas más rápidas se adelanten a la coordinación artillera."},
        "El ritmo de la operación aún no está roto, pero cada parada se propaga hacia atrás por kilómetros de carretera."
      ],
      historical:[
        "Las operaciones comenzaron el 1 de septiembre. Guderian acompañó personalmente a elementos de la 3. Panzer-Division durante el avance inicial.",
        "En sus memorias, Guderian relata que su vehículo quedó bajo fuego de la artillería pesada de su propio cuerpo en medio de la niebla.",
        "El XIX Cuerpo estaba compuesto por la 3. Panzer-Division y las 2.ª y 20.ª divisiones de infantería motorizada."
      ],
      intel:["La niebla reduce la observación directa. Partes de vanguardia y radio no llegan siempre en el mismo orden en que ocurrieron los hechos."],
      choices:[
        {id:"push_armor",title:"MANTENER EL RITMO BLINDADO",tag:"VELOCIDAD",desc:"Ordenar a la 3. Panzer-Division que preserve el impulso y resolver los atascos detrás.",effects:{minutes:60,progress:30,res:{movement:+6,fuel:-10,cohesion:-9,communications:-3,fatigue:+5},formations:{"3pz":{readiness:-3,supply:-7,position:"Vanguardia adelantada"}}},next:"chojnice",result:"Los blindados mantienen el ritmo. Ganas tiempo operativo, pero la cola logística se estira y las unidades de apoyo pierden contacto temporalmente."},
        {id:"traffic_control",title:"REORDENAR COLUMNAS",tag:"CONTROL",desc:"Detener brevemente sectores de la marcha para separar artillería, blindados y trenes logísticos.",effects:{minutes:90,progress:18,res:{movement:-4,cohesion:+8,communications:+4,fuel:-3,fatigue:+1},formations:{"3pz":{readiness:+2},"2mot":{readiness:+2},"20mot":{readiness:+2}}},next:"chojnice",result:"La marcha pierde tiempo, pero los itinerarios quedan más limpios. La artillería y el suministro recuperan enlaces con las formaciones de cabeza."},
        {id:"recon_first",title:"RECONOCIMIENTO ANTES DE ACELERAR",tag:"INFORMACIÓN",desc:"Usar los elementos de reconocimiento para aclarar cruces y resistencia antes de forzar el paso.",effects:{minutes:75,progress:20,res:{movement:-2,reconnaissance:+14,cohesion:+3,fuel:-4},formations:{"3pz":{position:"Avance con reconocimiento reforzado"}}},next:"chojnice",result:"El avance se hace algo más lento, pero las siguientes órdenes se emitirán con una imagen táctica menos borrosa."}
      ]
    },

    chojnice:{
      id:"chojnice",
      at:480,
      urgency:"SITUATIONSMELDUNG",
      from:"20. Infanterie-Division (mot.)",
      title:"Konitz no cae",
      skipIf:{flag:"chojnice_taken"},
      next:"tuchola",
      classification:"HECHO HISTÓRICO + INFORME INCIERTO",
      body:[
        "La 20. Infanterie-Division (mot.) informa de que la resistencia polaca en Chojnice (Konitz) detiene su avance. La carretera que atraviesa la ciudad es necesaria para el flujo del cuerpo hacia el este.",
        {if:{any:[{all:[{hidden:{chojnice:"fuerte"}},{accurate:"chojnice"}]},{all:[{hidden:{chojnice:"debil"}},{inaccurate:"chojnice"}]}]},text:"<b>Valoración del Ic:</b> Weber estima posiciones preparadas y fuego bien organizado. No es una retaguardia: tomar la ciudad de frente costará tiempo y hombres."},
        {if:{any:[{all:[{hidden:{chojnice:"debil"}},{accurate:"chojnice"}]},{all:[{hidden:{chojnice:"fuerte"}},{inaccurate:"chojnice"}]}]},text:"<b>Valoración del Ic:</b> Weber estima que es una cortina de retaguardia. Con presión decidida, los defensores deberían replegarse."},
        "Tu reconocimiento determina cuánto puedes fiarte de esa valoración. Mira el mapa y el panel de inteligencia antes de decidir."
      ],
      historical:[
        "Chojnice (Konitz) fue escenario de combates el 1 de septiembre de 1939, en el inicio de la ofensiva alemana contra el Corredor Polaco.",
        "El 4.º Ejército había alcanzado la línea Konitz-Nakel al final del 1 de septiembre según un estudio histórico estadounidense de la campaña."
      ],
      intel:["El frente se mueve con rapidez. La valoración del Ic sobre Chojnice es una estimación, no un hecho: puede estar equivocada."],
      choices:[
        {id:"assault_chojnice",title:"ASALTO DIRECTO CON LA 20. ID (MOT.)",tag:"DESPEJAR LA CARRETERA",desc:"Tomar la ciudad ahora para liberar el eje. Si la defensa es fuerte, será caro.",effects:{minutes:120,res:{ammunition:-8}},
          outcomes:[
            {if:{hidden:{chojnice:"debil"}},effects:{progress:6,res:{cohesion:+2},losses:{men:120},flags:["chojnice_taken"],formations:{"20mot":{readiness:-3,position:"Chojnice"}}},result:"La defensa cede tras un asalto corto. La carretera queda libre antes del mediodía y el cuerpo puede seguir fluyendo hacia el este."},
            {if:{all:[{res:{ammunition:{gte:72}}},{res:{cohesion:{gte:72}}}]},effects:{progress:4,res:{ammunition:-6,cohesion:-4},losses:{men:380,vehicles:3},flags:["chojnice_taken"],formations:{"20mot":{readiness:-9,position:"Chojnice"}}},result:"La ciudad cae, pero la defensa era sólida. El asalto consume munición de artillería y deja a la 20. ID (mot.) con bajas serias."},
            {effects:{res:{ammunition:-6,cohesion:-8},losses:{men:450,vehicles:4},flags:["chojnice_failed","flank_exposed"],formations:{"20mot":{readiness:-14,position:"Ante Chojnice"}}},result:"El asalto se estrella contra posiciones preparadas. La 20. ID (mot.) queda detenida, con bajas y desordenada, y la ciudad sigue cortando la carretera."}
          ],next:"tuchola"},
        {id:"contain_chojnice",title:"CONTENER LA CIUDAD Y SEGUIR",tag:"TIEMPO",desc:"Fijar a los defensores con una parte de la división y desviar el tráfico por caminos secundarios.",effects:{minutes:30,progress:8,flags:["chojnice_contained","flank_exposed"],formations:{"20mot":{position:"Conteniendo Chojnice"}}},
          outcomes:[
            {if:{hidden:{chojnice:"fuerte"}},effects:{res:{communications:-4,cohesion:-3,movement:-2}},result:"El cuerpo sigue adelante, pero Chojnice resiste y bloquea la mejor carretera. El tráfico secundario se atasca y la 20. ID (mot.) queda atada a la ciudad."},
            {effects:{res:{movement:+2}},result:"El cuerpo sigue adelante. La guarnición de Chojnice no tiene fuerza para inquietar a las columnas que la rodean."}
          ],next:"tuchola"},
        {id:"divert_3pz",title:"DESVIAR UN KAMPFGRUPPE DE LA 3. PANZER",tag:"POTENCIA",desc:"Cortar Chojnice por la retaguardia con blindados. Resuelve el problema, pero frena al Schwerpunkt.",requires:{res:{fuel:{gte:45}}},blockedText:"Combustible insuficiente en vanguardia para desviar blindados.",effects:{minutes:90,progress:-4,res:{fuel:-6,ammunition:-4},losses:{men:150,vehicles:5},flags:["chojnice_taken"],formations:{"3pz":{readiness:-4,supply:-5},"20mot":{position:"Chojnice"}}},next:"tuchola",result:"El Kampfgruppe envuelve la ciudad y la defensa se derrumba. La carretera queda libre, pero la 3. Panzer-Division ha perdido horas y combustible en una tarea secundaria."}
      ]
    },

    tuchola:{
      id:"tuchola",
      at:660,
      urgency:"PARTE DE SITUACIÓN",
      from:"2. Infanterie-Division (mot.)",
      title:"Los bosques de Tuchola",
      classification:"HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
      skipIf:{flag:"forest_cleared"},
      next:[{if:{res:{fuel:{lt:66}}},to:"fuel"},{to:"cavalry"}],
      onEnter:[
        {if:{flag:"hq_forward"},effects:{res:{communications:-4,cohesion:-3}}}
      ],
      body:[
        "La 2. Infanterie-Division (mot.) entra en la masa forestal de Tuchola: caminos estrechos, visibilidad de pocos metros y unidades polacas que aparecen y desaparecen entre los árboles.",
        {if:{flag:"hq_forward"},text:"Desde la vanguardia oyes poco de la 2. ID (mot.). Sus partes te llegan tarde y por radio, sin el detalle que te daría estar allí."},
        {if:{flag:"flank_exposed"},text:"Con Chojnice sin resolver, el tráfico del cuerpo se concentra en menos caminos. Un atasco dentro del bosque sería difícil de deshacer."},
        "Una división motorizada es rápida en carretera y vulnerable en el bosque. La pregunta es cuánto riesgo aceptas para no quedarte atrás."
      ],
      historical:[
        "La batalla de los bosques de Tuchola (Bory Tucholskie) se libró en los primeros días de septiembre de 1939 y fue uno de los combates principales del cierre del Corredor Polaco.",
        "Las fuerzas polacas del Ejército Pomorze defendían el corredor con divisiones de infantería y la Brigada de Caballería Pomorska."
      ],
      intel:[
        {if:{res:{reconnaissance:{lt:55}}},text:"El reconocimiento dentro del bosque es pobre. No sabes si los caminos están libres o si hay posiciones polacas esperando."},
        {if:{res:{reconnaissance:{gte:55}}},text:"El reconocimiento ha identificado los caminos principales y algunas posiciones polacas aisladas."}
      ],
      choices:[
        {id:"forest_roads",title:"EMPUJAR POR LOS CAMINOS",tag:"VELOCIDAD",desc:"La 2. ID (mot.) avanza en columna por los caminos forestales, sin limpiar el bosque.",effects:{minutes:60,progress:12,res:{fuel:-4}},
          outcomes:[
            {if:{res:{reconnaissance:{lt:60}}},effects:{res:{cohesion:-10,ammunition:-5},losses:{men:260,vehicles:7},flags:["ambushed"],formations:{"2mot":{readiness:-10,position:"Emboscada en los bosques"}}},result:"La columna cae en una emboscada en un camino estrecho. Los vehículos de cabeza arden y el resto queda atascado bajo fuego. El avance continúa, pero la división ha pagado su ceguera."},
            {effects:{res:{cohesion:-2},losses:{men:60},formations:{"2mot":{readiness:-3,position:"Bosques de Tuchola"}}},result:"Gracias al reconocimiento previo, la columna esquiva las posiciones conocidas. Hay tiroteos aislados, pero la división atraviesa el sector."}
          ],next:[{if:{res:{fuel:{lt:66}}},to:"fuel"},{to:"cavalry"}]},
        {id:"clear_forest",title:"LIMPIAR EL BOSQUE CON MÉTODO",tag:"SEGURIDAD",desc:"Avanzar por saltos, con infantería desmontada a los lados del camino.",effects:{minutes:150,progress:4,res:{cohesion:+5,ammunition:-5,fatigue:+6},losses:{men:70},flags:["forest_cleared"],formations:{"2mot":{readiness:-2,position:"Bosques de Tuchola (asegurados)"}}},next:[{if:{res:{fuel:{lt:66}}},to:"fuel"},{to:"cavalry"}],result:"El avance es lento pero firme. Los polacos se retiran más hondo en el bosque y la división no se deja sorprender."},
        {id:"flank_guard",title:"USAR LA 2. ID (MOT.) COMO GUARDIA DE FLANCO",tag:"FLANCO",desc:"No entrar a fondo en el bosque: la división cubre el flanco septentrional del avance blindado.",effects:{minutes:30,progress:6,res:{reconnaissance:+4},flags:["flank_guarded"],formations:{"2mot":{position:"Cubriendo el flanco norte"}}},next:[{if:{res:{fuel:{lt:66}}},to:"fuel"},{to:"cavalry"}],result:"La 2. ID (mot.) se despliega mirando al norte. El avance blindado queda protegido, pero el bosque sigue en manos polacas."}
      ]
    },

    fuel:{
      id:"fuel",
      at:810,
      urgency:"URGENTE",
      from:"Qu · XIX. Armeekorps",
      title:"Los Panzer piden combustible",
      classification:"SIMULACIÓN LOGÍSTICA",
      body:[
        "Hartmann entra en el puesto de mando con un parte de la 3. Panzer-Division: la vanguardia está consumiendo más de lo previsto. Los camiones cisterna existen, pero están atascados detrás de la artillería y de la infantería motorizada.",
        "<i>«La división tiene combustible en el sistema logístico, pero no en sus vehículos de cabeza»</i>, resume Hartmann.",
        {if:{flag:"flank_exposed"},text:"El bloqueo de Chojnice obliga a los convoyes a dar un rodeo por caminos secundarios."}
      ],
      historical:["La dependencia del combustible y del transporte por carretera fue una limitación constante de las divisiones motorizadas alemanas en 1939."],
      intel:["El problema no es enemigo: es de tráfico. Ninguna información nueva sobre las fuerzas polacas mientras se resuelve."],
      choices:[
        {id:"halt_refuel",title:"DETENER LA VANGUARDIA Y REPOSTAR",tag:"LOGÍSTICA",desc:"Dos horas de pausa para que los convoyes alcancen a los Panzer.",effects:{minutes:120,res:{fuel:+22,fatigue:-4,cohesion:+3},formations:{"3pz":{supply:+12}},trust:{qu:+5}},next:"cavalry",result:"Los convoyes alcanzan la vanguardia y los Panzer repostan. Has perdido dos horas de luz."},
        {id:"siphon",title:"TRASVASAR DE LA INFANTERÍA MOTORIZADA",tag:"SACRIFICIO",desc:"Quitar combustible a los camiones de las divisiones motorizadas para la vanguardia.",effects:{minutes:45,progress:4,res:{fuel:+12,cohesion:-5},formations:{"2mot":{supply:-15},"20mot":{supply:-10},"3pz":{supply:+10}},trust:{qu:-8}},next:"cavalry",result:"Los Panzer siguen adelante. Detrás, las divisiones motorizadas se quedan con depósitos medio vacíos y Hartmann no oculta su desacuerdo."},
        {id:"push_on",title:"CONTINUAR CON LO QUE QUEDA",tag:"APUESTA",desc:"No detenerse: llegar lo más lejos posible antes de que se agote el combustible.",effects:{progress:12,res:{fuel:-24,cohesion:-3},flags:["fuel_gamble"],trust:{qu:-5}},next:"cavalry",result:"La vanguardia sigue rodando con los depósitos bajando. Si la apuesta sale mal, la noche encontrará a los Panzer inmóviles."}
      ]
    },

    cavalry:{
      id:"cavalry",
      at:900,
      urgency:"INFORME DE CONTACTO",
      from:"Ic · XIX. Armeekorps",
      title:"Caballería en el flanco",
      classification:"INFORME INCIERTO + DECISIÓN DEL JUGADOR",
      body:[
        "Llegan varios partes de la 20. ID (mot.) y de patrullas de reconocimiento: caballería polaca en el sector septentrional, cerca del flanco del cuerpo.",
        {if:{any:[{all:[{hidden:{cavalry:"flanco"}},{accurate:"cavalry"}]},{all:[{hidden:{cavalry:"lejos"}},{inaccurate:"cavalry"}]}]},text:"<b>Valoración del Ic:</b> Weber cree que son elementos de la Brigada de Caballería Pomorska maniobrando para golpear la infantería alemana en marcha."},
        {if:{any:[{all:[{hidden:{cavalry:"lejos"}},{accurate:"cavalry"}]},{all:[{hidden:{cavalry:"flanco"}},{inaccurate:"cavalry"}]}]},text:"<b>Valoración del Ic:</b> Weber cree que son patrullas dispersas. Las tropas en marcha tienden a ver un regimiento detrás de cada jinete."},
        {if:{flag:"flank_guarded"},text:"La 2. ID (mot.) ya está desplegada mirando al norte."},
        "El Brda está cada vez más cerca. Cada unidad que mandes al flanco es una unidad que no empuja hacia el río."
      ],
      historical:["La Brigada de Caballería Pomorska formaba parte de las fuerzas polacas que defendían el Corredor."],
      intel:["Los informes sobre caballería son fragmentarios y contradictorios. La exactitud de la valoración depende de tu reconocimiento."],
      choices:[
        {id:"reinforce_flank",title:"REFORZAR EL FLANCO NORTE",tag:"SEGURIDAD",desc:"Enviar anticarros, ametralladoras y vehículos blindados de reconocimiento al sector de la 20. ID (mot.).",effects:{minutes:60,res:{ammunition:-3},flags:["flank_guarded"],formations:{"20mot":{readiness:+3}}},next:"brda",result:"El flanco recibe refuerzos. Si la amenaza era real, estará preparado; si no, has gastado una hora de luz."},
        {id:"push_brda",title:"IGNORAR EL FLANCO Y EMPUJAR AL BRDA",tag:"VELOCIDAD",desc:"La caballería no puede detener un cuerpo motorizado. Todo hacia el río.",requires:{res:{fuel:{gte:20}}},blockedText:"Sin combustible suficiente para un nuevo salto.",effects:{minutes:30,progress:16,res:{fuel:-6,fatigue:+4},flags:["pushed_brda"]},next:"brda",result:"La vanguardia se lanza hacia el Brda. El flanco queda en manos de lo que ya esté allí."},
        {id:"recon_flank",title:"ENVIAR RECONOCIMIENTO AL NORTE",tag:"INFORMACIÓN",desc:"Aclarar la amenaza antes de mover tropas.",effects:{minutes:90,progress:4,res:{reconnaissance:+10}},
          outcomes:[
            {if:{hidden:{cavalry:"flanco"}},effects:{flags:["flank_guarded","flank_scouted"]},result:"El reconocimiento localiza escuadrones polacos reuniéndose cerca de Krojanty. Ahora sabes dónde mirar y el flanco puede prepararse."},
            {effects:{flags:["flank_scouted"]},result:"El reconocimiento solo encuentra patrullas. La amenaza era menor de lo que decían los partes."}
          ],next:"brda"}
      ]
    },

    brda:{
      id:"brda",
      at:1050,
      urgency:"PARTE DE VANGUARDIA",
      from:"3. Panzer-Division",
      title:"El río Brda",
      classification:"HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
      onEnter:[
        {if:{res:{fatigue:{gte:30}}},effects:{res:{cohesion:-6,movement:-6}}}
      ],
      body:[
        {if:{progress:{gte:70}},text:"La vanguardia de la 3. Panzer-Division alcanza el Brda. Al otro lado, posiciones polacas; delante, el agua y los puentes que tal vez sigan en pie."},
        {if:{progress:{lt:70}},text:"La vanguardia aún no ha llegado al Brda. Quedan kilómetros de caminos y la luz empieza a caer."},
        {if:{res:{fuel:{lt:30}}},text:"Los depósitos de los Panzer están casi vacíos."},
        {if:{res:{fatigue:{gte:30}}},text:"Las tripulaciones llevan casi veinte horas en marcha. Los errores de conducción y de comunicación se multiplican."},
        {if:{clock:{gte:1140}},text:"Ya es de noche. Cualquier operación ahora se hará a oscuras, con unidades cansadas y comunicaciones peores."},
        {if:{all:[{progress:{gte:70}},{accurate:"bridge"},{hidden:{bridge:"intacto"}}]},text:"<b>Reconocimiento:</b> un puente parece intacto y poco defendido."},
        {if:{all:[{progress:{gte:70}},{inaccurate:"bridge"},{hidden:{bridge:"volado"}}]},text:"<b>Reconocimiento:</b> un puente parece intacto y poco defendido."},
        {if:{all:[{progress:{gte:70}},{accurate:"bridge"},{hidden:{bridge:"volado"}}]},text:"<b>Reconocimiento:</b> los puentes de este sector parecen preparados para volar o ya destruidos."},
        {if:{all:[{progress:{gte:70}},{inaccurate:"bridge"},{hidden:{bridge:"intacto"}}]},text:"<b>Reconocimiento:</b> los puentes de este sector parecen preparados para volar o ya destruidos."}
      ],
      historical:["Según las memorias de Guderian, la 3. Panzer-Division alcanzó el Brda al final del primer día."],
      intel:["El estado de los puentes del Brda es incierto. Un puente intacto puede volar en el momento en que tus tanques lo pisen."],
      choices:[
        {id:"force_crossing",title:"FORZAR EL CRUCE AHORA",tag:"INICIATIVA",desc:"Atacar a través del río antes de que los polacos se organicen.",visibleIf:{progress:{gte:70}},requires:{all:[{res:{ammunition:{gte:40}}},{res:{cohesion:{gte:45}}}]},blockedText:"Munición o cohesión insuficientes para un cruce de río.",effects:{minutes:120,res:{fuel:-5,ammunition:-10,fatigue:+6}},
          outcomes:[
            {if:{all:[{hidden:{bridge:"intacto"}},{res:{reconnaissance:{gte:55}}},{clock:{lt:1140}}]},effects:{progress:15,losses:{men:90,vehicles:2},flags:["bridgehead"],formations:{"3pz":{position:"Cabeza de puente sobre el Brda"}}},result:"Un golpe de mano captura el puente antes de que vuele. La 3. Panzer-Division tiene una cabeza de puente al otro lado del Brda."},
            {if:{hidden:{bridge:"intacto"}},effects:{progress:8,losses:{men:260,vehicles:8},flags:["bridgehead_costly"],formations:{"3pz":{readiness:-8,position:"Cabeza de puente precaria"}}},result:"El puente vuela cuando la cabeza de la columna ya está encima. Una parte cruza; el resto queda bajo fuego en la orilla. Tienes una cabeza de puente, pagada cara."},
            {if:{all:[{res:{cohesion:{gte:60}}},{res:{fatigue:{lt:35}}}]},effects:{progress:6,losses:{men:220,vehicles:3},flags:["bridgehead_small"],formations:{"3pz":{readiness:-6,position:"Pequeña cabeza de puente"}}},result:"Sin puentes, la infantería cruza en botes de asalto. Al anochecer hay una pequeña cabeza de puente, pero los blindados siguen en la orilla occidental."},
            {effects:{losses:{men:300,vehicles:4},res:{cohesion:-10},formations:{"3pz":{readiness:-12}}},result:"El cruce fracasa. Las unidades llegan desordenadas, los botes no están donde deberían y el fuego polaco barre la orilla."}
          ],next:"krojanty"},
        {id:"hold_bank",title:"ASEGURAR LA ORILLA Y CRUZAR AL ALBA",tag:"CONSOLIDAR",desc:"Dejar que lleguen los convoyes y la artillería. El río seguirá ahí mañana.",visibleIf:{progress:{gte:70}},effects:{minutes:60,res:{fatigue:-6,fuel:+6,cohesion:+6,ammunition:+4},flags:["hold_brda"],formations:{"3pz":{position:"Orilla occidental del Brda"}}},next:"krojanty",result:"El cuerpo se cierra sobre el río. Los convoyes alcanzan la vanguardia y la artillería se despliega para el cruce del día siguiente."},
        {id:"recon_crossings",title:"RECONOCER PUENTES Y VADOS",tag:"INFORMACIÓN",desc:"Explorar la orilla durante la noche para elegir el punto de cruce.",visibleIf:{progress:{gte:70}},effects:{minutes:90,res:{reconnaissance:+12,fatigue:+3},flags:["crossings_scouted"]},next:"krojanty",result:"Las patrullas recorren la orilla. Mañana sabrás dónde cruzar, pero los polacos también habrán tenido la noche para prepararse."},
        {id:"night_march",title:"MARCHA NOCTURNA HASTA EL RÍO",tag:"VELOCIDAD",desc:"Seguir avanzando de noche para llegar al Brda a cualquier precio.",visibleIf:{progress:{lt:70}},requires:{res:{fuel:{gte:25}}},blockedText:"No queda combustible para una marcha nocturna.",effects:{minutes:180,progress:20,res:{fatigue:+12,cohesion:-10,fuel:-8},losses:{vehicles:5},flags:["night_march"]},next:"krojanty",result:"Las columnas avanzan a oscuras. Hay vehículos en las cunetas y unidades perdidas, pero la vanguardia se acerca al río."},
        {id:"halt_night",title:"DETENERSE Y CONSOLIDAR",tag:"CONSOLIDAR",desc:"Aceptar que el Brda no se alcanzará hoy y preparar el día siguiente.",visibleIf:{progress:{lt:70}},effects:{minutes:30,res:{fatigue:-8,cohesion:+6,fuel:+6}},next:"krojanty",result:"El cuerpo se detiene. Las tropas descansan y los convoyes alcanzan a la vanguardia, pero el río sigue lejos."}
      ]
    },

    krojanty:{
      id:"krojanty",
      at:1140,
      urgency:"URGENTE · SECTOR NORTE",
      from:"20. Infanterie-Division (mot.)",
      title:"Carga en Krojanty",
      classification:"HECHO HISTÓRICO + CONSECUENCIA",
      onEnter:[
        {if:{all:[{hidden:{cavalry:"flanco"}},{noFlag:"flank_guarded"}]},effects:{losses:{men:150},res:{cohesion:-8},flags:["rear_panic"],formations:{"20mot":{readiness:-8}}}},
        {if:{all:[{hidden:{cavalry:"flanco"}},{flag:"flank_guarded"}]},effects:{losses:{men:30}}}
      ],
      body:[
        "Al anochecer, ulanos polacos cargan contra infantería de la 20. ID (mot.) que descansaba en campo abierto cerca de Krojanty.",
        {if:{all:[{hidden:{cavalry:"flanco"}},{flag:"flank_guarded"}]},text:"Esta vez el flanco estaba preparado. Las ametralladoras y los vehículos blindados que enviaste detienen la carga en minutos. Las bajas alemanas son escasas."},
        {if:{all:[{hidden:{cavalry:"flanco"}},{noFlag:"flank_guarded"}]},text:"<b>La carga dispersa a la infantería.</b> Solo la llegada de vehículos blindados la detiene. En la retaguardia empiezan a circular rumores exagerados de caballería polaca por todas partes."},
        {if:{hidden:{cavalry:"lejos"}},text:"La acción es local: la caballería choca con elementos de seguridad y se retira. No hay amenaza seria para el cuerpo, pero los rumores corren igualmente."}
      ],
      historical:[
        "Al anochecer del 1 de septiembre de 1939, el 18.º Regimiento de Ulanos de Pomerania cargó contra infantería alemana cerca de Krojanty. La carga fue detenida por vehículos blindados y ametralladoras; el coronel Kazimierz Mastalerz murió en la acción.",
        "La propaganda alemana deformó después este episodio en el mito de la caballería polaca cargando contra tanques."
      ],
      intel:["Los partes nocturnos del sector norte exageran. Tu Estado Mayor no sabe aún cuánto de lo que se cuenta es cierto."],
      choices:[
        {id:"go_personally",title:"IR PERSONALMENTE AL SECTOR AMENAZADO",tag:"PRESENCIA",desc:"Presentarte ante los mandos de la 20. ID (mot.) para cortar el pánico.",requires:{res:{command:{gte:2}}},blockedText:"Capacidad de mando agotada.",effects:{minutes:120,res:{command:-2,cohesion:+8,fatigue:+5},flags:["general_present"],trust:{ia:+5}},next:"evaluation",result:"Recorres el sector de noche. Tu presencia calma a los oficiales y los rumores pierden fuerza, aunque pasas horas lejos del Brda."},
        {id:"radio_order",title:"ORDEN POR RADIO: MANTENER POSICIONES",tag:"RED DE MANDO",desc:"Confiar en las comunicaciones y en los mandos de división.",effects:{minutes:30},
          outcomes:[
            {if:{res:{communications:{gte:60}}},effects:{res:{cohesion:+4},flags:["general_present"]},result:"La orden llega clara y a tiempo. Los mandos de división recuperan el control del sector."},
            {effects:{res:{cohesion:-4}},result:"La orden llega tarde y entrecortada. Cuando por fin se entiende, ya circula otra versión de los hechos."}
          ],next:"evaluation"},
        {id:"ignore_report",title:"PRIORIDAD AL BRDA",tag:"FOCO",desc:"La caballería no cambia la situación operacional. No distraer al mando.",effects:{res:{fatigue:-2}},
          outcomes:[
            {if:{flag:"rear_panic"},effects:{res:{cohesion:-6},trust:{ia:-6}},result:"Keller no oculta su inquietud. Sin una mano firme, la alarma en el flanco norte crece durante la noche."},
            {result:"El sector norte se calma por sí solo. Mantienes la atención donde importa."}
          ],next:"evaluation"}
      ]
    },

    evaluation:{
      id:"evaluation",
      at:1320,
      ending:true,
      urgency:"FIN DE JORNADA",
      from:"Estado Mayor del XIX. Armeekorps",
      title:"Balance del 1 de septiembre",
      classification:"RESULTADO DEL JUGADOR + COMPARACIÓN HISTÓRICA",
      body:[
        "La noche cae sobre Pomerania. Tu Estado Mayor prepara el balance para la 4. Armee: no basta con medir kilómetros. Importa qué divisiones siguen cohesionadas, cuánto combustible queda en vanguardia y cuántos hombres ha costado.",
        {if:{flag:"bridgehead"},text:"Al otro lado del Brda, la 3. Panzer-Division mantiene su cabeza de puente."},
        {if:{flag:"ambushed"},text:"En los bosques de Tuchola, la 2. ID (mot.) recoge a sus muertos de la emboscada."},
        {if:{flag:"chojnice_failed"},text:"Chojnice sigue en manos polacas."}
      ],
      historical:[],
      intel:["El balance de la jornada se basa en partes que aún llegan. Algunas cifras de bajas se corregirán mañana."],
      choices:[]
    },

    collapse:{
      id:"collapse",
      ending:true,
      urgency:"SITUACIÓN CRÍTICA",
      from:"Ia · XIX. Armeekorps",
      title:"El cuerpo se desarticula",
      classification:"RESULTADO DEL JUGADOR",
      verdict:{title:"CUERPO DESARTICULADO",text:"Las divisiones han perdido el enlace entre sí. Columnas mezcladas, órdenes contradictorias y unidades que no saben dónde está su mando. La 4. Armee detiene tu avance para reorganizar el cuerpo."},
      body:["Keller pone sobre la mesa los partes de la última hora: ninguna de las tres divisiones está donde el mapa dice. La cohesión del cuerpo se ha roto antes de alcanzar el objetivo."],
      historical:[],
      intel:["Ya no hay imagen de conjunto: solo partes sueltos de unidades aisladas."],
      choices:[]
    },

    stalled:{
      id:"stalled",
      ending:true,
      urgency:"SITUACIÓN CRÍTICA",
      from:"Qu · XIX. Armeekorps",
      title:"Panzer sin combustible",
      classification:"RESULTADO DEL JUGADOR",
      verdict:{title:"VANGUARDIA INMÓVIL",text:"La 3. Panzer-Division se ha quedado sin combustible en plena marcha. Los blindados esperan a los convoyes como blancos fijos y el avance del cuerpo se detiene."},
      body:["Hartmann no necesita decir nada: el mapa muestra a la vanguardia detenida y a los camiones cisterna a decenas de kilómetros, atrapados en el tráfico."],
      historical:[],
      intel:["Sin movimiento no hay reconocimiento. La imagen del enemigo envejece hora a hora."],
      choices:[]
    }
  },

  sources:[
    {short:"USHMM · Invasión de Polonia",title:"Invasión de Polonia, otoño de 1939",publisher:"United States Holocaust Memorial Museum",url:"https://encyclopedia.ushmm.org/content/es/article/invasion-of-poland-fall-1939"},
    {short:"U.S. military study",title:"The German Campaign in Poland, September 1939",publisher:"Historical study preserved by HyperWar/ibiblio",url:"https://www.ibiblio.org/hyperwar/NHC/NewPDFs/GERMANY/GER%20German%20Campaign%20in%20Poland%20September%201939%2C%20Sept%201%20to%20Oct.%205.pdf"},
    {short:"German Army OOB · 1 Sep 1939",title:"German Army, 1 September 1939",publisher:"General Staff / Nafziger Collection",url:"https://www.generalstaff.org/NAF/Pt_I_1939-1940/939giaa.pdf"},
    {short:"USMA map · Poland 1939",title:"German plan of invasion of Poland, August 1939",publisher:"United States Military Academy via Wikimedia Commons",url:"https://commons.wikimedia.org/wiki/File:Poland1939_GermanPlanMap.jpg"},
    {short:"Bundesarchiv · Panzer I",title:"Polen, Panzer I und Infanterie",publisher:"Bundesarchiv via Wikimedia Commons · CC BY-SA 3.0 DE",url:"https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_101I-012-0035-11A,_Polen,_Panzer_I_und_Infanterie.jpg"},
    {short:"Bundesarchiv · Stabsoffiziere",title:"Warschau, Generale v. Weichs, Blaskowitz",publisher:"Bundesarchiv via Wikimedia Commons · CC BY-SA 3.0 DE",url:"https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_101I-001-0256-31,_Warschau,_Generale_v._Weichs,_Blaskowitz.jpg"}
  ]
};