// Escenario de mando en tiempo continuo: XIX. Armeekorps (mot.), 1 de septiembre de 1939.
// Croquis esquemático, no a escala: las posiciones son relativas y las distancias, aproximadas.
// Efectivos y fuerzas polacas son estimaciones de juego, no cifras documentadas exactas.

window.FRONTLINE_SCENARIOS = window.FRONTLINE_SCENARIOS || {};
window.FRONTLINE_SCENARIOS.fallweiss = {
  id:"fallweiss",
  title:"FALL WEISS · 1 de septiembre de 1939",
  // Minutos desde las 00:00 del 1 SEP 1939.
  start:270,            // 04:30, órdenes iniciales con el reloj parado
  hHour:285,            // 04:45, hora del ataque
  fogUntil:450,         // niebla matinal hasta las 07:30
  nightFrom:1170,       // anochecer hacia las 19:30
  end:1260,             // 21:00, balance de la jornada
  endEarliest:1080,     // a partir de las 18:00 se puede cerrar la jornada

  map:{
    width:1000,height:600,
    border:"M150 10 L150 590",
    rivers:[
      {name:"Brda",d:"M470 10 C 478 110 452 210 470 260 S 512 420 528 590",lx:486,ly:120},
      {name:"Vístula",d:"M930 10 C 915 160 940 300 925 420 S 940 520 935 590",lx:944,ly:120}
    ],
    forests:[{d:"M285 215 C 330 175 430 190 455 235 C 470 300 450 380 400 395 C 340 410 290 370 280 320 Z",label:"Bosques de Tuchola",lx:368,ly:378}]
  },

  nodes:{
    a20:{name:"Reunión · 20. ID (mot.)",x:80,y:150,terrain:"assembly",german:true},
    a2:{name:"Reunión · 2. ID (mot.)",x:80,y:300,terrain:"assembly",german:true},
    a3:{name:"Reunión · 3. Pz.Div.",x:80,y:460,terrain:"assembly",german:true},
    chojnice:{name:"Chojnice (Konitz)",x:240,y:140,terrain:"town"},
    krojanty:{name:"Krojanty",x:378,y:82,terrain:"village"},
    kamien:{name:"Kamień Krajeński",x:245,y:300,terrain:"village"},
    sepolno:{name:"Sępólno (Zempelburg)",x:230,y:455,terrain:"town"},
    forest:{name:"Cruce del bosque",x:350,y:290,terrain:"forest"},
    roadb:{name:"Camino al Brda",x:362,y:455,terrain:"open"},
    rytel:{name:"Rytel · puente norte",x:462,y:200,terrain:"bridge",bridge:"north"},
    brdas:{name:"Puente sur del Brda",x:500,y:440,terrain:"bridge",bridge:"south"},
    easts:{name:"Orilla este (sur)",x:585,y:450,terrain:"open"},
    tuchola:{name:"Tuchola",x:600,y:250,terrain:"town"},
    swiecie:{name:"Hacia Świecie y el Vístula",x:895,y:380,terrain:"town"}
  },

  // km aproximados; type: road | track | forest. "river" marca el paso de un puente.
  edges:[
    ["a20","chojnice",14,"road"],["a2","kamien",14,"road"],["a3","sepolno",13,"road"],
    ["a2","a20",18,"road"],["a2","a3",18,"road"],
    ["sepolno","kamien",15,"road"],["kamien","chojnice",18,"road"],
    ["chojnice","krojanty",9,"track"],["chojnice","rytel",16,"road"],["krojanty","rytel",13,"track"],
    ["kamien","forest",14,"forest"],["forest","rytel",16,"forest"],["forest","brdas",18,"forest"],
    ["sepolno","roadb",15,"road"],["roadb","brdas",14,"road"],
    ["brdas","easts",4,"road","south"],["rytel","tuchola",14,"road","north"],
    ["easts","tuchola",22,"road"],["easts","swiecie",45,"road"],["tuchola","swiecie",48,"road"]
  ],

  hq:{name:"Puesto de mando del XIX. AK",node:"a2",speed:24},
  artillery:{name:"Artillería del cuerpo",rangeKm:30,redeploy:60},

  units:[
    {id:"3pz",name:"3. Panzer-Division",short:"3. Pz.",kind:"panzer",node:"a3",men:11800,tanks:390,
      fuelPerKm:.55,speed:{road:16,track:10,forest:6},
      note:"En torno a 390 carros, en su mayoría Panzer I y II (estimación)."},
    {id:"2mot",name:"2. Infanterie-Division (mot.)",short:"2. mot.",kind:"motinf",node:"a2",men:14500,tanks:0,
      fuelPerKm:.35,speed:{road:18,track:11,forest:6}},
    {id:"20mot",name:"20. Infanterie-Division (mot.)",short:"20. mot.",kind:"motinf",node:"a20",men:14500,tanks:0,
      fuelPerKm:.35,speed:{road:18,track:11,forest:6}}
  ],

  hidden:{
    chojnice:{fuerte:.6,debil:.4},
    bridgeSouth:{intacto:.35,volado:.65},
    bridgeNorth:{intacto:.5,volado:.5},
    cavalry:{flanco:.7,lejos:.3}
  },

  enemies:[
    {id:"p_cover",name:"Cobertura polaca de Sępólno",node:"sepolno",men:400,retreatTo:"roadb"},
    {id:"p_choj",name:"Defensa de Chojnice",node:"chojnice",menBy:{hidden:"chojnice",map:{fuerte:2400,debil:800}},retreatTo:"rytel",prepared:true},
    {id:"p_forest",name:"Destacamento en los bosques",node:"forest",men:900,retreatTo:"rytel"},
    {id:"p_rytel",name:"Guardia del puente de Rytel",node:"rytel",men:500,blowsBridge:"north",retreatTo:"tuchola"},
    {id:"p_brdas",name:"Defensa del Brda (sur)",node:"brdas",men:1500,blowsBridge:"south",retreatTo:"tuchola",prepared:true},
    {id:"p_easts",name:"Reserva polaca en la orilla este",node:"easts",men:1600,prepared:true},
    {id:"p_tuchola",name:"Guarnición de Tuchola",node:"tuchola",men:1200,prepared:true},
    {id:"p_cav",name:"Brigada de Caballería Pomorska (elementos)",node:"krojanty",nodeBy:{hidden:"cavalry",map:{flanco:"krojanty",lejos:"tuchola"}},
      men:2500,cavalry:true,raidAt:1080,retreatTo:"tuchola"}
  ],

  // Plan que el Ia propone al empezar. El jugador puede aceptarlo, cambiarlo o ignorarlo.
  proposal:[
    {unit:"3pz",type:"attack",target:"sepolno",stance:"normal",artillery:true},
    {unit:"2mot",type:"move",target:"kamien",stance:"normal"},
    {unit:"20mot",type:"attack",target:"chojnice",stance:"normal"}
  ],

  events:[
    {id:"hhour",at:285,pause:false,from:"4. Armee",title:"04:45 · Comienza el ataque",
      text:["Las divisiones cruzan la frontera. A partir de ahora el tiempo corre: los partes llegarán con retraso y en desorden."],
      historical:["La hora de ataque fijada para el 1 de septiembre de 1939 fue las 04:45."]},
    {id:"fog",at:300,from:"Ic · XIX. AK",title:"Niebla sobre Pomerania",
      text:["La madrugada está cubierta de niebla. La observación directa casi no existe: las columnas avanzan más despacio y el reconocimiento ve la mitad. Durará hasta media mañana."],
      historical:["Las operaciones del 1 de septiembre comenzaron con niebla en el sector del Corredor."]},
    {id:"friendly_fire",at:330,if:"hqNear3pz",from:"Escolta del puesto de mando",title:"Fuego propio en la niebla",
      text:["La artillería pesada del cuerpo dispara a ciegas dentro de la niebla. Un proyectil cae delante de tu vehículo, el siguiente detrás. El puesto de mando pierde media hora reorganizándose."],
      historical:["En sus memorias, Guderian relata que su vehículo quedó bajo fuego de la artillería pesada de su propio cuerpo en medio de la niebla."],
      effect:"hqDisrupted"},
    {id:"chojnice",on:"engage:chojnice",from:"20. ID (mot.)",title:"Combate por Chojnice",
      text:["La 20. ID (mot.) choca con la defensa de Chojnice (Konitz). La ciudad controla la carretera principal hacia el este: mientras resista, el suministro del cuerpo tendrá que dar rodeos."],
      historical:["Chojnice (Konitz) fue escenario de combates el 1 de septiembre de 1939."]},
    {id:"brda",on:"reach:brda",from:"Vanguardia",title:"El Brda a la vista",
      text:["Una división propia ha llegado al Brda. Al otro lado hay posiciones polacas; delante, el agua y unos puentes que tal vez sigan en pie."],
      historical:["Según las memorias de Guderian, la 3. Panzer-Division alcanzó el Brda al final del primer día; el paso y la consolidación ocuparon los días siguientes."]},
    {id:"krojanty",on:"raid",from:"20. ID (mot.)",title:"Carga en Krojanty",
      text:["Ulanos polacos cargan contra infantería alemana en campo abierto. Lo que ocurra depende de si el flanco estaba preparado."],
      historical:["Al anochecer del 1 de septiembre, el 18.º Regimiento de Ulanos de Pomerania cargó contra infantería alemana cerca de Krojanty. La carga fue detenida por vehículos blindados y ametralladoras; el coronel Kazimierz Mastalerz murió en la acción.",
        "La propaganda alemana deformó después el episodio en el mito de la caballería polaca cargando contra tanques."]},
    {id:"dusk",at:1170,from:"Ia · XIX. AK",title:"Anochece",
      text:["La luz se va. Moverse de noche es más lento y las órdenes llegan peor. Decide qué divisiones siguen y cuáles se cierran para la noche."]}
  ],

  objectives:{
    brdaFar:"easts", brdaBanks:["brdas","rytel"], chojnice:"chojnice"
  },

  evaluation:{
    history:[
      "Según las memorias de Guderian, al final del 1 de septiembre la 3. Panzer-Division había alcanzado el Brda; el paso del río y la consolidación al otro lado ocuparon los días siguientes.",
      "Al anochecer, la carga del 18.º Regimiento de Ulanos cerca de Krojanty fue rechazada por vehículos blindados y ametralladoras.",
      "Los combates en los bosques de Tuchola se prolongaron durante los primeros días de septiembre, hasta el cierre del Corredor Polaco."
    ]
  }
};
