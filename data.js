const FRONTLINE_DATA = {
  "build": "0.6.0",
  "assetBase": "https://commons.wikimedia.org/wiki/Special:Redirect/file/",
  "armory": [
    {"id":"mp40","name":"MP 40","type":"Subfusil","kind":"weapon","year":1940,"ammo":"9×19 mm Parabellum","file":"Maschinenpistole_MP40.jpg","note":"Posterior a la campaña de 1938; se desbloquea cronológicamente."},
    {"id":"p08","name":"Luger P08","type":"Pistola","kind":"weapon","year":1908,"ammo":"9×19 mm Parabellum","file":"Luger P08 1908 9mm Germany .png","note":"Arma corta ya presente en inventarios del Heer."},
    {"id":"p38","name":"Walther P38","type":"Pistola","kind":"weapon","year":1938,"ammo":"9×19 mm Parabellum","file":"Walther-p38.jpg","note":"Modelo adoptado en 1938; su presencia inicial es limitada."},
    {"id":"c96","name":"Mauser C96","type":"Pistola","kind":"weapon","year":1896,"ammo":"Según variante","file":"Pistolet Mauser C96.jpg","note":"Material heredado y no uniforme, útil para representar stocks antiguos."},
    {"id":"kar98k","name":"Karabiner 98k","type":"Fusil de cerrojo","kind":"weapon","year":1935,"ammo":"7,92×57 mm Mauser","file":"Kar 98K - AM.021488.jpg","note":"Fusil estándar del Heer en la campaña de 1938."},
    {"id":"g43","name":"Gewehr 43 / Karabiner 43","type":"Fusil semiautomático","kind":"weapon","year":1943,"ammo":"7,92×57 mm Mauser","file":"Gewehr43Rifle.jpg","note":"Posterior a 1938."},
    {"id":"fg42","name":"FG 42","type":"Fusil automático","kind":"weapon","year":1942,"ammo":"7,92×57 mm Mauser","file":"Rifle FG42 model 2.jpg","note":"Posterior a 1938; asociado a tropas aerotransportadas."},
    {"id":"stg44","name":"StG 44 / MP 44","type":"Fusil de asalto","kind":"weapon","year":1944,"ammo":"7,92×33 mm Kurz","file":"Sturmgewehr 44.jpg","note":"Muy posterior a la primera campaña."},
    {"id":"mg13","name":"MG 13","type":"Ametralladora","kind":"weapon","year":1930,"ammo":"7,92×57 mm Mauser","file":"MG-13-machine gun.jpg","note":"Modelo anterior todavía relevante para reservas y unidades de segunda línea."},
    {"id":"mg34","name":"MG 34","type":"Ametralladora de propósito general","kind":"weapon","year":1934,"ammo":"7,92×57 mm Mauser","file":"MG34.jpg","note":"Clave para la estandarización del apoyo de infantería."},
    {"id":"mg42","name":"MG 42","type":"Ametralladora de propósito general","kind":"weapon","year":1942,"ammo":"7,92×57 mm Mauser","file":"MG42 1 noBG.jpg","note":"Posterior a 1938."},
    {"id":"pzb39","name":"Panzerbüchse 39","type":"Fusil anticarro","kind":"weapon","year":1939,"ammo":"7,92×94 mm Patrone 318","file":"D. 112-1, Panzerabwehrbüchse 39.png","note":"Aparece después de la campaña de 1938."},
    {"id":"panzerfaust","name":"Panzerfaust","type":"Arma anticarro desechable","kind":"weapon","year":1943,"ammo":"Carga hueca","file":"Panzerfaust.jpg","note":"Posterior a 1938."},
    {"id":"panzerschreck","name":"Panzerschreck","type":"Lanzacohetes anticarro","kind":"weapon","year":1943,"ammo":"Cohete RPzB de 88 mm","file":"Panzerschreck.jpg","note":"Posterior a 1938."},
    {"id":"stiel24","name":"Stielhandgranate 24","type":"Granada de mano","kind":"weapon","year":1924,"ammo":"Carga explosiva integrada","file":"Stielhandgranate24 noBG.png","note":"Granada reglamentaria disponible."},
    {"id":"eih39","name":"Eihandgranate 39","type":"Granada de mano","kind":"weapon","year":1939,"ammo":"Carga explosiva integrada","file":"Eihandgranate.jpg","note":"Posterior a la campaña de 1938."},
    {"id":"legrw36","name":"5 cm leGrW 36","type":"Mortero ligero","kind":"weapon","year":1936,"ammo":"Granada de mortero de 50 mm","file":"Bundesarchiv Bild 183-2007-1005-501, Soldaten am leichten Granatwerfer.jpg","note":"Apoyo orgánico ligero disponible en 1938."},
    {"id":"grw34","name":"8 cm GrW 34","type":"Mortero medio","kind":"weapon","year":1934,"ammo":"Granada de mortero de 81 mm","file":"8 cm Schwerer Granatwerfer 34 01.JPG","note":"Pieza de apoyo de infantería disponible."},
    {"id":"grw42","name":"12 cm GrW 42","type":"Mortero pesado","kind":"weapon","year":1942,"ammo":"Granada de mortero de 120 mm","file":"Granatwerfer 42 an der Ostfront.jpg","note":"Posterior a 1938."},
    {"id":"pak36","name":"3,7 cm Pak 35/36","type":"Cañón anticarro","kind":"weapon","year":1936,"ammo":"37 mm","file":"3.7 cm Pak.jpg","note":"Principal referencia anticarro de la campaña inicial."},
    {"id":"pak38","name":"5 cm Pak 38","type":"Cañón anticarro","kind":"weapon","year":1940,"ammo":"50 mm","file":"D. 72, Hs. 5 mit 5 cm Pak 38.png","note":"Posterior a 1938."},
    {"id":"pak40","name":"7,5 cm Pak 40","type":"Cañón anticarro","kind":"weapon","year":1942,"ammo":"75 mm","file":"7.5cm Pak 40 L46.jpg","note":"Posterior a 1938."},
    {"id":"leig18","name":"7,5 cm leIG 18","type":"Cañón ligero de infantería","kind":"weapon","year":1932,"ammo":"75 mm","file":"7.5 cm leichtes Infanteriegeschütz 18.jpg","note":"Apoyo directo de infantería disponible."},
    {"id":"lefh18","name":"10,5 cm leFH 18","type":"Obús de campaña","kind":"weapon","year":1935,"ammo":"105 mm","file":"Artilleriestellung Baltikum 1943-1 by-RaBoe.jpg","note":"Pieza de artillería de campaña disponible; la foto es archivo posterior."},
    {"id":"sfh18","name":"15 cm sFH 18","type":"Obús pesado","kind":"weapon","year":1934,"ammo":"150 mm","file":"15 cm sFH 18 Sapun M 2009 G1.jpg","note":"Artillería pesada disponible."},
    {"id":"sig33","name":"15 cm sIG 33","type":"Cañón pesado de infantería","kind":"weapon","year":1936,"ammo":"150 mm","file":"Schweres Infanteriegeschütz 33 at Wehrtechnische Studiensammlung Koblenz.jpg","note":"Apoyo pesado de infantería disponible."},
    {"id":"flak88","name":"8,8 cm FlaK 18/36/37","type":"Cañón antiaéreo","kind":"weapon","year":1936,"ammo":"88 mm","file":"8.8 cm Flak.jpg","note":"Disponible en 1938; su empleo anticarro sistemático se desarrollará después."},
    {"id":"flak38","name":"2 cm FlaK 38","type":"Cañón antiaéreo ligero","kind":"weapon","year":1940,"ammo":"20 mm","file":"2-cm-Flak 38 Gatow.JPG","note":"Posterior a 1938."},
    {"id":"nebel41","name":"15 cm Nebelwerfer 41","type":"Lanzacohetes múltiple","kind":"weapon","year":1941,"ammo":"Cohete de 150 mm","file":"German Nebelwerfer 41 rocket launcher front view.jpg","note":"Posterior a 1938."},
    {"id":"ammo9","name":"9×19 mm Parabellum","type":"Munición de arma corta/subfusil","kind":"ammo","year":1902,"ammo":"P08, P38, MP38/MP40","file":"9 × 19 mm Parabellum.jpg","note":"Calibre ya disponible en 1938."},
    {"id":"ammo79257","name":"7,92×57 mm Mauser","type":"Munición de fusil/ametralladora","kind":"ammo","year":1905,"ammo":"Kar98k, MG13, MG34 y otros","file":"German 7.92x57mm Ammunition from WW2.JPG","note":"Calibre central de la estandarización logística."},
    {"id":"ammo79233","name":"7,92×33 mm Kurz","type":"Munición intermedia","kind":"ammo","year":1942,"ammo":"StG 44 / MP43-44","file":"7.92×33mm Kurz.jpg","note":"Posterior a 1938."},
    {"id":"ammo50pak","name":"5 cm Pak 38 — munición","type":"Munición anticarro","kind":"ammo","year":1940,"ammo":"Pak 38","file":"D 435-1 Die Munition der deutschen Geschtütze und Werfer, 5 cm Pak 38.png","note":"Posterior a 1938."},
    {"id":"ammo75pak","name":"7,5 cm Pak 40 — proyectiles","type":"Munición anticarro","kind":"ammo","year":1942,"ammo":"Pak 40","file":"Pak40 helsinki shells.jpg","note":"Posterior a 1938."},
    {"id":"ammo88","name":"8,8 cm Pzgr. 39","type":"Proyectil perforante","kind":"ammo","year":1940,"ammo":"Familia 8,8 cm","file":"8,8 cm Panzergranatpatrone 39 Kw.K. 36.JPG","note":"La familia de 88 mm ya existe, pero esta referencia concreta es posterior."},
    {"id":"ammosig33","name":"15 cm sIG 33 — munición","type":"Munición de apoyo pesado","kind":"ammo","year":1936,"ammo":"sIG 33","file":"Munition 15cm sIG 33 Image 02.jpg","note":"Disponible en la campaña de 1938."},
    {"id":"ammonebel","name":"15 cm Nebelwerfer 41 — cohete","type":"Cohete de artillería","kind":"ammo","year":1941,"ammo":"Nebelwerfer 41","file":"15 cm Nebelwerfer rocket Hämeenlinna.JPG","note":"Posterior a 1938."}
  ],
  "chapters": [
    {
      "id": "ch0",
      "number": "0",
      "year": "1938",
      "title": "REORGANIZACIÓN",
      "subtitle": "Prólogo · mando, Anschluss y Sudetes",
      "status": "available"
    },
    {
      "id": "ch1",
      "number": "I",
      "year": "1939",
      "title": "FALL WEISS",
      "subtitle": "Polonia",
      "status": "available"
    },
    {
      "id": "ch2",
      "number": "II",
      "year": "1940",
      "title": "WESERÜBUNG",
      "subtitle": "Dinamarca y Noruega",
      "status": "locked"
    },
    {
      "id": "ch3",
      "number": "III",
      "year": "1940",
      "title": "FALL GELB",
      "subtitle": "Francia y Países Bajos",
      "status": "locked"
    },
    {
      "id": "ch4",
      "number": "IV",
      "year": "1941",
      "title": "BARBAROSSA",
      "subtitle": "Unión Soviética",
      "status": "locked"
    },
    {
      "id": "ch5",
      "number": "V",
      "year": "1942",
      "title": "EL ESTE",
      "subtitle": "Profundidad y desgaste",
      "status": "locked"
    },
    {
      "id": "ch6",
      "number": "VI",
      "year": "1943",
      "title": "PÉRDIDA DE INICIATIVA",
      "subtitle": "Defensa y retirada",
      "status": "locked"
    },
    {
      "id": "ch7",
      "number": "VII",
      "year": "1944",
      "title": "FRONTLINE 1944",
      "subtitle": "Normandía y colapso del frente",
      "status": "locked"
    }
  ],
  "campaigns": {
    "ch0": {
      "title": "CAPÍTULO I · REORGANIZACIÓN",
      "subtitle": "Alemania · febrero-diciembre de 1938",
      "protagonist": "Generaloberst Walther von Brauchitsch",
      "command": "Oberbefehlshaber des Heeres · OKH",
      "startDate": "4 FEB 1938",
      "startTime": "12:00",
      "dossier": [
        "En 1938 todavía no hay una guerra europea abierta, pero el aparato militar alemán cambia con rapidez. La crisis Blomberg-Fritsch altera la cúpula de mando y el Heer entra en una nueva relación con el poder político.",
        "Este capítulo no trata de conquistar un mapa. Trata de construir una máquina militar: organización, entrenamiento, movilidad, comunicaciones, coordinación interarmas y logística.",
        "Las decisiones del jugador pueden modificar la preparación del Heer, pero los grandes acontecimientos históricos de 1938 siguen una cronología documentada. Cuando una fotografía procede de una fecha posterior, el juego la etiqueta como archivo retrospectivo."
      ],
      "resources": {
        "command": 7,
        "communications": 58,
        "fuel": 70,
        "ammunition": 72,
        "movement": 62,
        "cohesion": 66,
        "reconnaissance": 48,
        "fatigue": 10
      },
      "formations": [
        {
          "id": "staff",
          "name": "Generalstab des Heeres",
          "commander": "OKH",
          "role": "Planificación y doctrina",
          "readiness": 78,
          "supply": 74,
          "position": "Berlín"
        },
        {
          "id": "mobile",
          "name": "Tropas móviles y reconocimiento",
          "commander": "Inspecciones del Heer",
          "role": "Movilidad y reconocimiento",
          "readiness": 68,
          "supply": 63,
          "position": "Distritos militares"
        },
        {
          "id": "signals",
          "name": "Nachrichtentruppen",
          "commander": "Arma de transmisiones",
          "role": "Mando y comunicaciones",
          "readiness": 64,
          "supply": 69,
          "position": "Red de guarniciones"
        }
      ],
      "staff": [
        {
          "id": "ia",
          "rank": "Oberst i.G.",
          "name": "Friedrich Keller",
          "role": "Operaciones",
          "fictional": true,
          "trust": 70,
          "note": "Quiere convertir cada movimiento de 1938 en una lección de Estado Mayor."
        },
        {
          "id": "ic",
          "rank": "Major i.G.",
          "name": "Ernst Weber",
          "role": "Inteligencia",
          "fictional": true,
          "trust": 65,
          "note": "Insiste en separar lo confirmado, lo probable y lo que solo parece convincente en un mapa."
        },
        {
          "id": "qu",
          "rank": "Oberstleutnant",
          "name": "Otto Hartmann",
          "role": "Logística",
          "fictional": true,
          "trust": 72,
          "note": "Recuerda que una fuerza que crece más rápido que sus camiones, talleres y radios solo crece sobre el papel."
        }
      ],
      "startScene": "command_change",
      "assets": {
        "heroFile": "Bundesarchiv Bild 183-H03527, Berlin, Kriegsakademie.jpg",
        "campaignMapFile": "BlankMap-World-1938march.png",
        "staffFile": "Bundesarchiv Bild 183-H03528, Berlin, Kriegsakademie.jpg"
      },
      "scenes": {
        "command_change": {
          "id": "command_change",
          "date": "4 FEB 1938",
          "time": "12:00",
          "urgency": "ORDEN DE REORGANIZACIÓN",
          "from": "Oberkommando des Heeres",
          "title": "El mando cambia de manos",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN DE MANDO",
          "body": [
            "La crisis en la cúpula militar termina con una reorganización profunda. Adolf Hitler asume directamente las funciones del Ministerio de Guerra, se crea el OKW y Walther von Brauchitsch pasa a dirigir el Heer.",
            "Tu primera tarea no es mover divisiones en un mapa: es decidir cómo conservar capacidad profesional de planificación dentro de una cadena de mando que acaba de cambiar."
          ],
          "historical": [
            "La crisis Blomberg-Fritsch permitió una reestructuración de la cúpula militar alemana a comienzos de 1938.",
            "Walther von Brauchitsch sustituyó a Werner von Fritsch al frente del Ejército."
          ],
          "intel": "La información es política y organizativa, no táctica. La incertidumbre reside en cómo funcionará la nueva cadena de mando.",
          "visuals": [
            {
              "file": "1938 portrait photograph of Adolf Hitler.jpg",
              "caption": "Retrato de Adolf Hitler, 1938.",
              "usage": "Presenta al actor político que concentra la autoridad suprema sobre las fuerzas armadas.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-2004-1202-504, Berlin, Adolf Hitler und Hermann Göring.jpg",
              "caption": "Hitler y Hermann Göring.",
              "usage": "Introduce la relación entre dirección política, Heer y Luftwaffe.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H03527, Berlin, Kriegsakademie.jpg",
              "caption": "Kriegsakademie en Berlín.",
              "usage": "Sitúa el peso del Estado Mayor profesional que el jugador debe reorganizar.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "protect_staff",
              "title": "PRESERVAR AUTONOMÍA TÉCNICA",
              "tag": "ESTADO MAYOR",
              "desc": "Blindar procedimientos profesionales y exigir canales escritos.",
              "effects": {
                "command": 1,
                "communications": 4,
                "cohesion": 5,
                "movement": -2
              },
              "next": "architecture",
              "result": "El Estado Mayor gana claridad procedimental, aunque cada decisión tarda algo más en atravesar la nueva jerarquía."
            },
            {
              "id": "centralize_fast",
              "title": "CENTRALIZAR DECISIONES",
              "tag": "VELOCIDAD",
              "desc": "Adaptar el OKH a la nueva cadena y reducir escalones de consulta.",
              "effects": {
                "command": 2,
                "communications": -2,
                "movement": 4,
                "cohesion": -3
              },
              "next": "architecture",
              "result": "Las órdenes salen con rapidez, pero aumenta la dependencia de un número menor de nodos de decisión."
            }
          ]
        },
        "architecture": {
          "id": "architecture",
          "date": "10 FEB 1938",
          "time": "09:15",
          "urgency": "DENKSCHRIFT",
          "from": "Generalstab des Heeres",
          "title": "Una nueva arquitectura militar",
          "classification": "HECHO HISTÓRICO + RECONSTRUCCIÓN ORGANIZATIVA",
          "body": [
            "La reorganización no puede quedarse en nombres. Hay que revisar cuadros, tablas de organización, formación de oficiales y procedimientos para movilizar un ejército que crece deprisa.",
            "Sobre la mesa aparecen KStN, planes de instrucción y una pregunta incómoda: qué debe estandarizarse primero."
          ],
          "historical": [
            "El Heer se encontraba en una fase acelerada de expansión y profesionalización durante 1938.",
            "Las tablas KStN definían organización y dotación teórica de unidades alemanas."
          ],
          "intel": "La información sobre plantillas es fiable; la capacidad real de muchas unidades para alcanzar esas plantillas no lo es.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-H03528, Berlin, Kriegsakademie.jpg",
              "caption": "Kriegsakademie, Berlín.",
              "usage": "Sirve de dossier sobre formación de oficiales y doctrina.",
              "chronology": "contemporary"
            },
            {
              "file": "Kstn131b1937.jpg",
              "caption": "Tabla KStN de preguerra.",
              "usage": "Se usa como documento de organización que condiciona la decisión del jugador.",
              "chronology": "contemporary"
            },
            {
              "file": "1938 Lehmann & Wundenberg Abdruck auf Ledergurt zur Aluminiumschnalle Heer der Wehrmacht.jpg",
              "caption": "Hebilla/equipamiento del Heer, 1938.",
              "usage": "Funciona como ficha de estandarización material y uniformidad.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "standardize",
              "title": "ESTANDARIZAR PLANTILLAS",
              "tag": "ORGANIZACIÓN",
              "desc": "Priorizar tablas comunes y procedimientos repetibles.",
              "effects": {
                "cohesion": 7,
                "communications": 2,
                "movement": -2
              },
              "next": "armament_review",
              "result": "La estructura gana coherencia y facilita movilizaciones futuras."
            },
            {
              "id": "expand_first",
              "title": "EXPANDIR CUADROS PRIMERO",
              "tag": "PERSONAL",
              "desc": "Aumentar mandos y efectivos aunque existan diferencias entre unidades.",
              "effects": {
                "movement": 3,
                "cohesion": -4,
                "command": 1,
                "fatigue": 2
              },
              "next": "armament_review",
              "result": "La expansión acelera, pero aparecen más excepciones locales y cargas de coordinación."
            }
          ]
        },
        "armament_review": {
      "id": "armament_review",
      "date": "18 FEB 1938",
      "time": "08:30",
      "urgency": "RÜSTUNGSBESPRECHUNG",
      "from": "OKH · Inspección de Infantería y Waffenamt",
      "title": "Un ejército no combate con porcentajes",
      "classification": "CONTEXTO HISTÓRICO + SIMULACIÓN DE ABASTECIMIENTO",
      "body": [
        "Las nuevas plantillas exigen algo más incómodo que dibujar divisiones sobre un organigrama: hay que decidir qué armas reciben realmente las unidades y qué calibres deben sostener los depósitos.",
        "Sobre la mesa aparecen el Karabiner 98k, la MG 34, existencias antiguas de MG 13 y pistolas de distintos lotes. Cada excepción parece pequeña hasta que se multiplica por cientos de miles de hombres.",
        "El problema no es elegir el arma más impresionante. Es conseguir que cada compañía pueda recibir repuestos, cargadores, munición y personal entrenado cuando la movilización deje de ser un ejercicio."
      ],
      "historical": [
        "El Karabiner 98k había sido adoptado como fusil estándar del Heer en 1935.",
        "La MG 34 fue la ametralladora de propósito general de referencia antes de la aparición de la MG 42.",
        "El calibre 7,92×57 mm Mauser permitía compartir una familia logística entre fusiles y ametralladoras, aunque seguían existiendo armas y stocks heredados."
      ],
      "intel": "Los inventarios nominales son fiables; la disponibilidad real de repuestos, munición y personal entrenado varía mucho entre depósitos y unidades.",
      "visuals": [
        {"file":"Kar 98K - AM.021488.jpg","caption":"Karabiner 98k.","usage":"Arma estándar que permite discutir uniformidad de fusil y munición.","chronology":"contemporary"},
        {"file":"MG34.jpg","caption":"MG 34.","usage":"Representa la estandarización del apoyo automático de infantería.","chronology":"contemporary"},
        {"file":"German 7.92x57mm Ammunition from WW2.JPG","caption":"Munición 7,92×57 mm.","usage":"Convierte el calibre en una decisión logística, no en un dato decorativo.","chronology":"reference-archive"}
      ],
      "choices": [
        {
          "id":"standardize_792",
          "title":"ESTANDARIZAR 7,92 MM",
          "tag":"LOGÍSTICA",
          "desc":"Priorizar Kar98k y MG34, retirar gradualmente material heredado y simplificar depósitos.",
          "effects":{"ammunition":7,"cohesion":5,"communications":1,"movement":-2},
          "next":"antitank_review",
          "result":"La transición consume tiempo y exige inventariar material antiguo, pero las unidades empiezan a compartir una cadena de munición y repuestos más predecible."
        },
        {
          "id":"keep_mixed_stocks",
          "title":"CONSERVAR STOCKS MIXTOS",
          "tag":"CANTIDAD",
          "desc":"Mantener en servicio todo lo utilizable para acelerar la expansión de unidades.",
          "effects":{"movement":4,"ammunition":-5,"cohesion":-4,"command":1},
          "next":"antitank_review",
          "result":"La expansión inmediata resulta más fácil, pero los depósitos acumulan excepciones y las unidades dependen más de saber exactamente qué lote llevan."
        }
      ]
    },
    "antitank_review": {
      "id": "antitank_review",
      "date": "24 FEB 1938",
      "time": "16:10",
      "urgency": "WAFFENAMT · PRÜFBERICHT",
      "from": "Heereswaffenamt · Artillería e Infantería",
      "title": "El cañón adecuado para la guerra equivocada",
      "classification": "CONTEXTO HISTÓRICO + SIMULACIÓN DOCTRINAL",
      "body": [
        "El 3,7 cm Pak 35/36 es móvil, numeroso y encaja en las unidades que el Heer está construyendo. Pero los informes extranjeros insisten en que el blindaje de los carros aumenta.",
        "Al mismo tiempo, morteros de 5 y 8 cm y piezas de infantería de 7,5 y 15 cm compiten por tractores, munición, instrucción y espacio en las columnas.",
        "No puedes fabricar en febrero de 1938 las armas que existirán años después. Sí puedes decidir qué problema estudiar antes de que la experiencia de combate obligue a hacerlo."
      ],
      "historical": [
        "El 3,7 cm Pak 35/36 era el cañón anticarro estándar alemán de preguerra.",
        "El 5 cm leGrW 36, el 8 cm GrW 34 y los cañones de infantería formaban parte del sistema de apoyo terrestre de la época.",
        "Pak 38, Pak 40, Panzerschreck, Panzerfaust y otros sistemas del catálogo pertenecen a fases posteriores y permanecen bloqueados por fecha."
      ],
      "intel": "La amenaza futura de blindados más pesados es plausible, pero no existe una imagen perfecta de qué enfrentará el Heer ni cuándo.",
      "visuals": [
        {"file":"3.7 cm Pak.jpg","caption":"3,7 cm Pak 35/36.","usage":"Muestra la capacidad anticarro disponible en 1938.","chronology":"contemporary"},
        {"file":"8 cm Schwerer Granatwerfer 34 01.JPG","caption":"8 cm GrW 34.","usage":"Representa el fuego de apoyo orgánico de infantería.","chronology":"contemporary"},
        {"file":"7.5 cm leichtes Infanteriegeschütz 18.jpg","caption":"7,5 cm leIG 18.","usage":"Introduce el coste logístico de mantener distintas familias de apoyo.","chronology":"reference-archive"}
      ],
      "choices": [
        {
          "id":"train_antitank_depth",
          "title":"ENTRENAR DEFENSA ANTICARRO EN PROFUNDIDAD",
          "tag":"DOCTRINA",
          "desc":"Compensar las limitaciones del Pak 35/36 con reconocimiento, emplazamientos y fuego coordinado.",
          "effects":{"reconnaissance":6,"cohesion":3,"ammunition":-2,"fatigue":2},
          "next":"luftwaffe_day",
          "result":"No aparece mágicamente un cañón mejor. Lo que mejora es la forma de detectar, canalizar y enfrentar blindados con el material realmente disponible."
        },
        {
          "id":"support_fire_priority",
          "title":"PRIORIZAR FUEGO DE APOYO",
          "tag":"ARTILLERÍA",
          "desc":"Dedicar más instrucción y munición a morteros y piezas de infantería para sostener el avance.",
          "effects":{"ammunition":-4,"cohesion":5,"movement":2,"reconnaissance":-1},
          "next":"luftwaffe_day",
          "result":"Las unidades practican un apoyo de fuego más denso, pero consumen reservas y horas de instrucción que no pueden emplearse en otros problemas."
        }
      ]
    },
    "luftwaffe_day": {
          "id": "luftwaffe_day",
          "date": "1 MAR 1938",
          "time": "11:00",
          "urgency": "ENLACE INTERARMAS",
          "from": "OKH · Enlace Luftwaffe",
          "title": "El otro brazo del poder militar",
          "classification": "DOCUMENTACIÓN DE ÉPOCA + SIMULACIÓN INTERARMAS",
          "body": [
            "Berlín exhibe la Luftwaffe. Para el Heer, el desfile no es solo ceremonia: recuerda que reconocimiento, enlace, transporte y apoyo aéreo dependerán de mecanismos de coordinación que todavía están madurando.",
            "Debes decidir cuánto esfuerzo de Estado Mayor dedicar ya a procedimientos conjuntos."
          ],
          "historical": [
            "El Día de la Luftwaffe de marzo de 1938 dejó abundante documentación fotográfica de la fuerza aérea alemana.",
            "La coordinación aire-tierra sería un problema central de las operaciones posteriores."
          ],
          "intel": "El potencial aéreo es visible; su integración cotidiana con mandos terrestres sigue siendo menos clara.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-H01704, Berlin, Parade am Tag der Luftwaffe.jpg",
              "caption": "Parada del Día de la Luftwaffe, Berlín.",
              "usage": "Abre el bloque de coordinación interarmas.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H02734, Berlin, Parade am Tag der Luftwaffe.jpg",
              "caption": "Parada de la Luftwaffe, 1938.",
              "usage": "Sirve para identificar escala, ceremonial y presencia institucional.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H02755, Berlin, Parade zum Tag der Luftwaffe.jpg",
              "caption": "Parada del Día de la Luftwaffe.",
              "usage": "Cierra el dossier visual antes de la decisión conjunta.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "joint_cells",
              "title": "CREAR CÉLULAS DE ENLACE",
              "tag": "INTERARMAS",
              "desc": "Reservar oficiales para procedimientos comunes Heer-Luftwaffe.",
              "effects": {
                "communications": 7,
                "reconnaissance": 4,
                "command": -1
              },
              "next": "austria_planning",
              "result": "La coordinación mejora, a costa de distraer cuadros escasos."
            },
            {
              "id": "army_priority",
              "title": "PRIORIZAR EL HEER",
              "tag": "TIERRA",
              "desc": "Mantener la coordinación aérea en un nivel mínimo y concentrar cuadros en fuerzas terrestres.",
              "effects": {
                "cohesion": 3,
                "communications": -3,
                "reconnaissance": -2
              },
              "next": "austria_planning",
              "result": "El Heer conserva personal, pero la cooperación futura dependerá más de improvisación."
            }
          ]
        },
        "austria_planning": {
          "id": "austria_planning",
          "date": "10 MAR 1938",
          "time": "20:40",
          "urgency": "VORBEREITUNGSBEFEHL",
          "from": "OKH · Operaciones",
          "title": "Austria: preparar un movimiento sin campaña",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN LOGÍSTICA",
          "body": [
            "La presión política sobre Austria se convierte en una necesidad militar inmediata. Las unidades deben moverse con rapidez, pero no se espera una campaña convencional.",
            "Las carreteras, el combustible y la disciplina de marcha pueden convertirse en el verdadero enemigo."
          ],
          "historical": [
            "La crisis austríaca culminó con la entrada de fuerzas alemanas el 12 de marzo de 1938.",
            "La incorporación de Austria exigió movimientos rápidos y posterior integración administrativa y militar."
          ],
          "intel": "No se espera resistencia organizada, pero los datos de tráfico, puentes y disponibilidad mecánica son incompletos.",
          "visuals": [
            {
              "file": "BlankMap-World-1938march.png",
              "caption": "Mapa mundial de marzo de 1938.",
              "usage": "Fija el contexto geopolítico previo al Anschluss.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 137-049270, Anschluss Österreich.jpg",
              "caption": "Anschluss de Austria.",
              "usage": "Se usa como avance de inteligencia visual sobre el teatro.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 137-049271, Anschluss Österreich.jpg",
              "caption": "Anschluss de Austria.",
              "usage": "Apoya la planificación de rutas y concentración.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "road_discipline",
              "title": "DISCIPLINA DE ITINERARIOS",
              "tag": "LOGÍSTICA",
              "desc": "Asignar ventanas de marcha y prioridades de carretera.",
              "effects": {
                "movement": -2,
                "fuel": 5,
                "cohesion": 7,
                "communications": 3
              },
              "next": "border_crossing",
              "result": "La marcha inicial será menos espectacular, pero más controlada."
            },
            {
              "id": "speed_columns",
              "title": "MÁXIMA VELOCIDAD",
              "tag": "RITMO",
              "desc": "Lanzar columnas tan pronto estén disponibles.",
              "effects": {
                "movement": 7,
                "fuel": -6,
                "cohesion": -5,
                "fatigue": 3
              },
              "next": "border_crossing",
              "result": "Las primeras columnas ganan tiempo, mientras la retaguardia empieza a comprimirse."
            }
          ]
        },
        "border_crossing": {
          "id": "border_crossing",
          "date": "12 MAR 1938",
          "time": "06:10",
          "urgency": "MARSCHMELDUNG",
          "from": "Unidades de vanguardia",
          "title": "Cruzar sin combatir no significa avanzar sin problemas",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN DE MARCHA",
          "body": [
            "Las tropas cruzan la frontera. No hay una batalla convencional, pero sí tráfico, fallos mecánicos, multitudes y una red viaria que no fue diseñada para columnas militares continuas.",
            "El Estado Mayor debe decidir si protege el horario o la cohesión."
          ],
          "historical": [
            "Las tropas alemanas entraron en Austria el 12 de marzo de 1938 sin encontrar resistencia militar organizada.",
            "El movimiento proporcionó lecciones prácticas sobre movilidad y sostenimiento."
          ],
          "intel": "El enemigo no es una formación hostil; son los cuellos de botella y la información desfasada sobre las propias columnas.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 137-049278, Anschluss Österreich.jpg",
              "caption": "Movimiento durante el Anschluss.",
              "usage": "Ilustra la marcha terrestre y el entorno civil.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-1987-0922-503, Wien, Einmarsch deutscher Truppen, Spähpanzer.jpg",
              "caption": "Entrada de tropas y vehículo de reconocimiento en Viena.",
              "usage": "Se utiliza para discutir reconocimiento, circulación y visibilidad de las columnas.",
              "chronology": "contemporary"
            },
            {
              "file": "State of Austria within Germany 1938.png",
              "caption": "Austria incorporada a Alemania, 1938.",
              "usage": "Actualiza el mapa estratégico tras la entrada.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "repair_nodes",
              "title": "CREAR NODOS DE REPARACIÓN",
              "tag": "SOSTENIMIENTO",
              "desc": "Detener recursos móviles para recuperar vehículos averiados.",
              "effects": {
                "movement": -3,
                "fuel": 3,
                "cohesion": 5,
                "fatigue": -2
              },
              "next": "vienna",
              "result": "La columna pierde tiempo pero reduce averías acumuladas."
            },
            {
              "id": "keep_schedule",
              "title": "MANTENER EL HORARIO",
              "tag": "IMPULSO",
              "desc": "Apartar averiados y continuar con las unidades disponibles.",
              "effects": {
                "movement": 5,
                "fuel": -3,
                "cohesion": -4,
                "fatigue": 4
              },
              "next": "vienna",
              "result": "El calendario se mantiene a costa de dejar una estela logística más difícil de recomponer."
            }
          ]
        },
        "vienna": {
          "id": "vienna",
          "date": "15 MAR 1938",
          "time": "17:30",
          "urgency": "LAGEBERICHT WIEN",
          "from": "OKH · Sección de integración",
          "title": "Viena y la integración del nuevo territorio",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN ADMINISTRATIVA",
          "body": [
            "La fase de movimiento deja paso a otra clase de trabajo: depósitos, mandos, personal, cuarteles, comunicaciones y formaciones austríacas deben encajar en una estructura alemana.",
            "El problema es menos visible que una columna en marcha, pero condicionará todo lo que venga después."
          ],
          "historical": [
            "La anexión fue formalizada el 13 de marzo y Hitler entró en Viena el 15 de marzo.",
            "La incorporación territorial implicó integración de instituciones y fuerzas."
          ],
          "intel": "Los inventarios llegan en formatos distintos y con niveles de fiabilidad desiguales.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 146-1972-028-14, Anschluss Österreich.jpg",
              "caption": "Austria durante el Anschluss.",
              "usage": "Contextualiza la transición de ocupación a integración.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 146-1985-083-10, Anschluss Österreich, Wien.jpg",
              "caption": "Viena durante el Anschluss.",
              "usage": "Se emplea como fondo documental del informe urbano.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 119-5243, Wien, Arthur Seyß-Inquart, Adolf Hitler.jpg",
              "caption": "Seyß-Inquart y Hitler en Viena.",
              "usage": "Identifica a la dirección política implicada en la anexión.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "audit_first",
              "title": "AUDITAR ANTES DE ABSORBER",
              "tag": "CONTROL",
              "desc": "Inventariar personal, depósitos y material antes de reasignarlos.",
              "effects": {
                "communications": 4,
                "cohesion": 6,
                "movement": -3
              },
              "next": "lessons",
              "result": "La integración es más lenta pero genera una imagen logística más fiable."
            },
            {
              "id": "absorb_fast",
              "title": "ABSORCIÓN INMEDIATA",
              "tag": "EXPANSIÓN",
              "desc": "Distribuir recursos y personal con rapidez.",
              "effects": {
                "movement": 4,
                "cohesion": -3,
                "command": 1
              },
              "next": "lessons",
              "result": "El Heer crece antes, aunque con más excepciones y datos incompletos."
            }
          ]
        },
        "lessons": {
          "id": "lessons",
          "date": "28 MAR 1938",
          "time": "10:20",
          "urgency": "NACHBESPRECHUNG",
          "from": "Generalstab des Heeres",
          "title": "Lecciones del Anschluss",
          "classification": "ANÁLISIS DE EXPERIENCIA + SIMULACIÓN",
          "body": [
            "La operación no produjo una batalla, pero sí una montaña de partes. Fallos de marcha, coordinación, mantenimiento y comunicaciones pueden convertirse en doctrina si se estudian ahora.",
            "El jugador decide qué problema recibe prioridad institucional."
          ],
          "historical": [
            "Las maniobras y movimientos de preguerra alimentaron revisiones doctrinales y logísticas.",
            "La motorización alemana coexistía todavía con grandes diferencias de movilidad entre formaciones."
          ],
          "intel": "Los partes propios son abundantes, pero tienden a describir síntomas más que causas.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 101I-001-0283-02, Wehrmachtsoldaten bei Ausbildung.jpg",
              "caption": "Soldados de la Wehrmacht durante instrucción.",
              "usage": "Convierte las lecciones de marcha en necesidades de entrenamiento.",
              "chronology": "archive-reference"
            },
            {
              "file": "Bundesarchiv Bild 101I-001-0283-03, Wehrmachtsoldaten bei Ausbildung.jpg",
              "caption": "Instrucción de soldados alemanes.",
              "usage": "Apoya el módulo de estandarización de procedimientos.",
              "chronology": "archive-reference"
            },
            {
              "file": "Bundesarchiv Bild 183-H03417, Berlin, Hitler nach Anschluß Österreichs.jpg",
              "caption": "Hitler tras el Anschluss.",
              "usage": "Sirve como cierre político del bloque y presión contextual sobre el mando.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "maintenance_doctrine",
              "title": "MANTENIMIENTO Y MARCHA",
              "tag": "LOGÍSTICA",
              "desc": "Convertir averías y tráfico en un programa de instrucción.",
              "effects": {
                "fuel": 6,
                "movement": 3,
                "cohesion": 3
              },
              "next": "mobility",
              "result": "Las unidades reciben procedimientos más claros para marchas largas."
            },
            {
              "id": "command_drills",
              "title": "MANDO Y ENLACES",
              "tag": "MANDO",
              "desc": "Priorizar ejercicios de puestos de mando y transmisión.",
              "effects": {
                "communications": 7,
                "command": 1,
                "fuel": -1
              },
              "next": "mobility",
              "result": "El mando gana disciplina en el flujo de órdenes."
            }
          ]
        },
        "mobility": {
          "id": "mobility",
          "date": "30 APR 1938",
          "time": "14:00",
          "urgency": "AUSBILDUNGSBEFEHL",
          "from": "Inspección de tropas móviles",
          "title": "Movilidad no significa solo tanques",
          "classification": "DOCTRINA + DOCUMENTACIÓN TÉCNICA",
          "body": [
            "Motorizadas, parcialmente motorizadas y ciclistas ofrecen velocidades, huellas logísticas y necesidades de carretera muy distintas.",
            "El diseño de una fuerza útil exige aceptar que no todas las unidades pueden moverse al ritmo de la vanguardia."
          ],
          "historical": [
            "El Heer combinaba unidades motorizadas, parcialmente motorizadas, ciclistas y a pie.",
            "La movilidad operacional dependía tanto de la organización como del vehículo individual."
          ],
          "intel": "Los rendimientos de ejercicios son comparables solo de forma aproximada: terreno y mantenimiento alteran los resultados.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 101I-001-0283-05, Wehrmachtsoldaten bei Ausbildung.jpg",
              "caption": "Instrucción de la Wehrmacht.",
              "usage": "Se usa para representar preparación práctica.",
              "chronology": "archive-reference"
            },
            {
              "file": "Aufklärungs-Abteilung (mot.) (Wehrmacht) 1.png",
              "caption": "Esquema de unidad de reconocimiento motorizada.",
              "usage": "Sirve como documento de composición de unidad.",
              "chronology": "contemporary"
            },
            {
              "file": "Aufklärungsabteilung (teilmot) (Wehrmacht).jpg",
              "caption": "Esquema de reconocimiento parcialmente motorizado.",
              "usage": "Permite comparar estructuras de movilidad.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "motor_core",
              "title": "NÚCLEOS MOTORIZADOS",
              "tag": "SCHWERPUNKT",
              "desc": "Concentrar vehículos en elementos de reconocimiento y ruptura.",
              "effects": {
                "movement": 7,
                "fuel": -6,
                "reconnaissance": 5
              },
              "next": "mixed_mobility",
              "result": "La fuerza móvil gana velocidad y ojos, pero consume más combustible."
            },
            {
              "id": "balanced_pool",
              "title": "PARQUE EQUILIBRADO",
              "tag": "SOSTENIBILIDAD",
              "desc": "Distribuir vehículos para reducir diferencias de velocidad.",
              "effects": {
                "movement": 3,
                "fuel": -2,
                "cohesion": 5
              },
              "next": "mixed_mobility",
              "result": "La formación completa se mueve con mayor regularidad."
            }
          ]
        },
        "mixed_mobility": {
          "id": "mixed_mobility",
          "date": "31 MAY 1938",
          "time": "08:40",
          "urgency": "ÜBUNGSPLAN",
          "from": "OKH · Instrucción",
          "title": "La columna real es heterogénea",
          "classification": "SIMULACIÓN ORGANIZATIVA",
          "body": [
            "Una orden que funciona para una unidad motorizada puede ser absurda para una unidad ciclista o parcialmente motorizada.",
            "El Estado Mayor debe diseñar horarios y reservas con velocidades diferentes."
          ],
          "historical": [
            "Las divisiones alemanas de preguerra dependían de combinaciones muy distintas de transporte.",
            "La bicicleta siguió siendo un recurso militar relevante en unidades de reconocimiento e infantería."
          ],
          "intel": "Los cuadros de velocidad nominal son fiables; la velocidad sostenida de una columna completa no.",
          "visuals": [
            {
              "file": "Radfahr-Abteilung 1 (Wehrmacht) 1.png",
              "caption": "Esquema de unidad ciclista.",
              "usage": "Se usa para calcular ritmo y consumo de carretera.",
              "chronology": "contemporary"
            },
            {
              "file": "Radfahr-Abteilung 1 (Wehrmacht) 2.png",
              "caption": "Segundo esquema de unidad ciclista.",
              "usage": "Permite comparar variantes de organización.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 101I-001-0283-06, Wehrmachtsoldaten bei Ausbildung.jpg",
              "caption": "Soldados en instrucción.",
              "usage": "Representa el entrenamiento necesario para coordinar unidades heterogéneas.",
              "chronology": "archive-reference"
            }
          ],
          "choices": [
            {
              "id": "separate_march",
              "title": "COLUMNAS POR VELOCIDAD",
              "tag": "TRÁFICO",
              "desc": "Separar itinerarios y horarios según movilidad.",
              "effects": {
                "movement": 4,
                "cohesion": 4,
                "communications": 2
              },
              "next": "signals",
              "result": "Se reducen adelantamientos y bloqueos entre unidades."
            },
            {
              "id": "combined_march",
              "title": "COLUMNAS COMBINADAS",
              "tag": "CONTROL",
              "desc": "Mantener agrupaciones tácticas completas aunque sean más lentas.",
              "effects": {
                "movement": -3,
                "cohesion": 7,
                "reconnaissance": -1
              },
              "next": "signals",
              "result": "Las unidades llegan más juntas, pero con menor ritmo."
            }
          ]
        },
        "signals": {
          "id": "signals",
          "date": "30 JUN 1938",
          "time": "16:10",
          "urgency": "NACHRICHTENLAGE",
          "from": "Nachrichtentruppen",
          "title": "La guerra que viaja por cable y radio",
          "classification": "DOCUMENTACIÓN TÉCNICA + SIMULACIÓN",
          "body": [
            "El Heer puede crecer más rápido que su capacidad para transmitir órdenes. Radio, cable, mensajeros y procedimientos de cifrado forman una red frágil.",
            "El jugador debe decidir si prioriza alcance o redundancia."
          ],
          "historical": [
            "Las tropas de transmisiones eran esenciales para el mando de unidades móviles.",
            "Las redes militares combinaban radio, telefonía de campaña y enlaces físicos."
          ],
          "intel": "Las pruebas técnicas son buenas; la saturación real en una gran operación solo puede estimarse.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-2006-1211-500, Wehrmacht, Fahrbare Funkstation.jpg",
              "caption": "Estación de radio móvil de la Wehrmacht.",
              "usage": "Se convierte en recurso funcional del sistema de comunicaciones.",
              "chronology": "archive-reference"
            },
            {
              "file": "Bundesarchiv Bild 183-2006-1211-501, Nachrichtentruppen, Funkstation.jpg",
              "caption": "Tropas de señales y estación de radio.",
              "usage": "Representa capacidad y vulnerabilidad de la red.",
              "chronology": "archive-reference"
            },
            {
              "file": "Bundesarchiv Bild 141-2141, Funkstelle V Fliegerkorps.jpg",
              "caption": "Puesto de radio de un cuerpo aéreo.",
              "usage": "Se usa como dossier técnico de enlace interarmas.",
              "chronology": "retrospective-archive"
            }
          ],
          "choices": [
            {
              "id": "redundancy",
              "title": "REDUNDANCIA DE RED",
              "tag": "RESILIENCIA",
              "desc": "Duplicar enlaces críticos aunque consuma personal.",
              "effects": {
                "communications": 9,
                "command": -1,
                "cohesion": 2
              },
              "next": "air_coord",
              "result": "La red tolera mejor fallos locales."
            },
            {
              "id": "long_range",
              "title": "RADIO DE LARGO ALCANCE",
              "tag": "VELOCIDAD",
              "desc": "Concentrar equipos en enlaces de mando de mayor distancia.",
              "effects": {
                "communications": 5,
                "movement": 3,
                "cohesion": -2
              },
              "next": "air_coord",
              "result": "Las órdenes viajan más lejos con rapidez, pero hay menos respaldo local."
            }
          ]
        },
        "air_coord": {
          "id": "air_coord",
          "date": "15 JUL 1938",
          "time": "13:30",
          "urgency": "BESPRECHUNG",
          "from": "OKH / RLM",
          "title": "Coordinar dos cadenas de mando",
          "classification": "HECHO INSTITUCIONAL + ARCHIVO TÉCNICO",
          "body": [
            "La Luftwaffe no pertenece al Heer. Cualquier apoyo requiere solicitudes, prioridades y enlaces entre organizaciones con culturas distintas.",
            "El ejercicio de Estado Mayor obliga a definir qué información debe compartir cada servicio."
          ],
          "historical": [
            "La Luftwaffe dependía de su propia cadena de mando y ministerio.",
            "La cooperación aire-tierra requería enlaces y procedimientos específicos."
          ],
          "intel": "El Estado Mayor conoce sus propias necesidades mejor que las limitaciones internas de la Luftwaffe.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-H08192, Hermann Göring und Ernst Udet.jpg",
              "caption": "Hermann Göring y Ernst Udet.",
              "usage": "Identifica actores clave del desarrollo de la Luftwaffe.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H27413, Berlin, Reichsluftfahrtministerium.jpg",
              "caption": "Reichsluftfahrtministerium, Berlín.",
              "usage": "Sitúa institucionalmente la cadena aérea.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 101I-643-4752-30A, Rudermarkierungen.jpg",
              "caption": "Marcas de control en aeronave.",
              "usage": "Se usa como archivo técnico posterior para ilustrar estandarización y reconocimiento visual.",
              "chronology": "retrospective-archive"
            }
          ],
          "choices": [
            {
              "id": "shared_picture",
              "title": "IMAGEN DE SITUACIÓN COMPARTIDA",
              "tag": "INTELIGENCIA",
              "desc": "Establecer formatos comunes de informes.",
              "effects": {
                "communications": 6,
                "reconnaissance": 7,
                "command": -1
              },
              "next": "air_archive",
              "result": "La información aérea se vuelve más utilizable por mandos terrestres."
            },
            {
              "id": "request_channels",
              "title": "CANALES DE SOLICITUD",
              "tag": "CONTROL",
              "desc": "Priorizar un procedimiento claro para pedir apoyo.",
              "effects": {
                "communications": 5,
                "cohesion": 4,
                "reconnaissance": 2
              },
              "next": "air_archive",
              "result": "La cooperación es menos flexible pero más predecible."
            }
          ]
        },
        "air_archive": {
          "id": "air_archive",
          "date": "5 AUG 1938",
          "time": "10:00",
          "urgency": "ARCHIVMAPPE",
          "from": "OKH · Evaluación interarmas",
          "title": "Lo que todavía no existe, pero hay que prever",
          "classification": "ARCHIVO RETROSPECTIVO CLARAMENTE MARCADO",
          "body": [
            "Algunos documentos visuales conservados son posteriores a 1938. Aquí no se presentan como fotografías del ejercicio actual, sino como archivo técnico que muestra en qué desembocarán ciertas prácticas.",
            "La escena convierte esas imágenes en previsión doctrinal, no en falsa cronología."
          ],
          "historical": [
            "El material retrospectivo puede ilustrar desarrollos posteriores sin atribuirlos falsamente a 1938.",
            "La separación entre fuente contemporánea y archivo posterior forma parte del sistema documental del juego."
          ],
          "intel": "La cronología de cada imagen está marcada para evitar que el jugador confunda evidencia contemporánea con retrospectiva.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-2008-0909-500, Wien, Göring ehrt Gefallene des Weltkrieges.jpg",
              "caption": "Göring en Viena.",
              "usage": "Se usa como documento ceremonial vinculado a la presencia de la Luftwaffe en Austria.",
              "chronology": "archive-reference"
            },
            {
              "file": "Bundesarchiv Bild 146-1978-013-19, Luftwaffen-Helfer, Übungsalarm.jpg",
              "caption": "Personal auxiliar de la Luftwaffe durante alarma de ejercicio.",
              "usage": "Archivo posterior usado para anticipar exigencias de defensa y personal.",
              "chronology": "retrospective-archive"
            },
            {
              "file": "Aukflärungs-Abteilung (teilmot.) (Wehrmacht).png",
              "caption": "Esquema alternativo de unidad de reconocimiento.",
              "usage": "Se usa para cerrar la comparación de estructuras de reconocimiento.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "archive_discipline",
              "title": "CATALOGAR POR FECHA Y FUNCIÓN",
              "tag": "DOCUMENTACIÓN",
              "desc": "Exigir que todo archivo indique cronología y uso.",
              "effects": {
                "reconnaissance": 4,
                "communications": 2
              },
              "next": "naval_program",
              "result": "El sistema documental gana fiabilidad."
            },
            {
              "id": "practical_archive",
              "title": "CATALOGAR POR UTILIDAD",
              "tag": "OPERACIONES",
              "desc": "Priorizar lo que enseña cada documento sobre su fecha exacta.",
              "effects": {
                "movement": 2,
                "reconnaissance": 2
              },
              "next": "naval_program",
              "result": "El archivo es más ágil, pero exige más cuidado al interpretar cronologías."
            }
          ]
        },
        "naval_program": {
          "id": "naval_program",
          "date": "22 AUG 1938",
          "time": "15:20",
          "urgency": "RÜSTUNGSBESPRECHUNG",
          "from": "OKW · Reparto de recursos",
          "title": "El acero también se va al mar",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN DE RECURSOS",
          "body": [
            "La botadura del Prinz Eugen simboliza una expansión naval que compite por acero, mano de obra, combustible y capacidad industrial.",
            "Desde el Heer no mandas la Kriegsmarine, pero sí sufres las consecuencias del reparto de recursos."
          ],
          "historical": [
            "El crucero pesado Prinz Eugen fue botado en 1938.",
            "El rearme alemán exigía asignar recursos entre Ejército, Luftwaffe y Kriegsmarine."
          ],
          "intel": "Los programas industriales son conocidos; su coste de oportunidad para el Heer es más difícil de cuantificar.",
          "visuals": [
            {
              "file": "Besuch vom ungar. Staatsoberhaupt Miklos von Horthy und Reichskanzler Adolf Hitler zum Stapellauf des Schweren Kreuzers PRINZ EUGEN (Kiel 53.179).jpg",
              "caption": "Botadura del Prinz Eugen con Hitler y Horthy.",
              "usage": "Ancla la escena en el programa naval de 1938.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv DVM 10 Bild-23-63-06, Panzerschiff \"Admiral Graf Spee\".jpg",
              "caption": "Admiral Graf Spee.",
              "usage": "Representa la flota existente que absorbe recursos y planificación.",
              "chronology": "contemporary"
            },
            {
              "file": "Admiral Graf Spee-A01.jpg",
              "caption": "Admiral Graf Spee.",
              "usage": "Complementa el dossier sobre capacidad naval de preguerra.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "army_industry",
              "title": "PRESIONAR POR PRIORIDAD TERRESTRE",
              "tag": "RECURSOS",
              "desc": "Solicitar más camiones, radios y repuestos para el Heer.",
              "effects": {
                "fuel": 4,
                "communications": 3,
                "movement": 4,
                "command": -1
              },
              "next": "nuremberg",
              "result": "El Ejército mejora su preparación material, pero la negociación interarmas se endurece."
            },
            {
              "id": "joint_balance",
              "title": "ACEPTAR REPARTO INTERARMAS",
              "tag": "EQUILIBRIO",
              "desc": "Mantener una distribución más uniforme.",
              "effects": {
                "cohesion": 3,
                "command": 1,
                "movement": -1
              },
              "next": "nuremberg",
              "result": "La relación interarmas es más estable, aunque el Heer recibe menos margen."
            }
          ]
        },
        "nuremberg": {
          "id": "nuremberg",
          "date": "10 SEP 1938",
          "time": "12:30",
          "urgency": "LAGE UND DARSTELLUNG",
          "from": "OKH · Inspección",
          "title": "La imagen pública del poder militar",
          "classification": "DOCUMENTACIÓN DE ÉPOCA + CONTEXTO",
          "body": [
            "El despliegue ceremonial muestra banderas, uniformes y formaciones. Para el juego, la escena sirve para distinguir símbolo, organización real y capacidad efectiva.",
            "Tu Estado Mayor debe evitar confundir apariencia de fuerza con preparación operacional."
          ],
          "historical": [
            "El régimen utilizaba grandes concentraciones y ceremonias para exhibir poder militar y político.",
            "Las banderas y estandartes tenían funciones de identificación y ceremonial."
          ],
          "intel": "La imagen pública es abundante; la disponibilidad real de unidades y recursos sigue siendo información separada.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-H12262, Nürnberg, Reichsparteitag, Tag der Wehrmacht.jpg",
              "caption": "Núremberg, Día de la Wehrmacht.",
              "usage": "Documenta la exhibición pública de fuerzas.",
              "chronology": "contemporary"
            },
            {
              "file": "Die Wehrmacht - Fahnen Flaggen u Standarten der deutschen Wehrmacht - Reichskriegsflagge Infanterie Kavalerie Kriegsmarine Luftwaffe Soldatenbund - Nazi Germany Armed forces Flags Colours swastika poster ca. 1936-38 No known copyright.jpg",
              "caption": "Lámina histórica de banderas y estandartes.",
              "usage": "Se usa como ficha de identificación histórica, no como decoración.",
              "chronology": "contemporary"
            },
            {
              "file": "Reibert Der Dienstunterricht im Heere Kanonier 1938 (0169) KOMMANDO- UND STABSFLAGGEN DER KRIGSMARINE DER LUFTWAFFE Wehrmacht handbook Nazi Germany Navy Air force command post staff flags standards No copyright Low-res scan.jpg",
              "caption": "Lámina de banderas de mando y Estado Mayor.",
              "usage": "Permite al jugador interpretar señales visuales en documentos de época.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "readiness_audit",
              "title": "AUDITAR PREPARACIÓN REAL",
              "tag": "REALISMO",
              "desc": "Comparar exhibición con estados de disponibilidad.",
              "effects": {
                "reconnaissance": 6,
                "cohesion": 3,
                "movement": -1
              },
              "next": "sudeten_map",
              "result": "El Estado Mayor separa mejor propaganda y capacidad operativa."
            },
            {
              "id": "mobilization_signal",
              "title": "USAR EL EVENTO COMO ENSAYO",
              "tag": "MOVILIZACIÓN",
              "desc": "Aprovechar concentraciones para probar movimientos y enlaces.",
              "effects": {
                "movement": 4,
                "communications": 4,
                "fatigue": 2
              },
              "next": "sudeten_map",
              "result": "La ceremonia deja también datos útiles de movilización."
            }
          ]
        },
        "sudeten_map": {
          "id": "sudeten_map",
          "date": "15 SEP 1938",
          "time": "19:10",
          "urgency": "KARTENLAGE",
          "from": "Generalstab des Heeres",
          "title": "Los Sudetes sobre el mapa",
          "classification": "HECHO HISTÓRICO + PLANIFICACIÓN CONTINGENTE",
          "body": [
            "La crisis checoslovaca obliga a convertir fronteras, carreteras y fortificaciones en preguntas operacionales. Todavía puede haber acuerdo diplomático o guerra.",
            "El Estado Mayor debe preparar opciones sin saber cuál será necesaria."
          ],
          "historical": [
            "La crisis de los Sudetes elevó el riesgo de una guerra europea en septiembre de 1938.",
            "Las fortificaciones fronterizas checoslovacas formaban parte esencial del problema militar."
          ],
          "intel": "Los mapas son buenos a gran escala, pero los detalles sobre fortificaciones y reacción enemiga son incompletos.",
          "visuals": [
            {
              "file": "German Map Sudeten.PNG",
              "caption": "Mapa alemán de los Sudetes.",
              "usage": "Es la pieza central de la planificación geográfica.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H13158, Anschluss sudetendeutscher Gebiete.jpg",
              "caption": "Incorporación de zonas sudetoalemanas.",
              "usage": "Se usa como referencia visual del territorio que pronto será ocupado.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H12951, Münchener Abkommen, Hitler nach erster Besprechnung.jpg",
              "caption": "Hitler durante la crisis de Múnich.",
              "usage": "Introduce la presión política que condiciona la planificación.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "fortification_intel",
              "title": "PRIORIZAR FORTIFICACIONES",
              "tag": "INTELIGENCIA",
              "desc": "Concentrar reconocimiento sobre posiciones defensivas.",
              "effects": {
                "reconnaissance": 9,
                "movement": -2
              },
              "next": "munich",
              "result": "Mejora la imagen de las defensas, a costa de otros sectores."
            },
            {
              "id": "routes_supply",
              "title": "PRIORIZAR RUTAS Y SUMINISTRO",
              "tag": "LOGÍSTICA",
              "desc": "Estudiar carreteras, ferrocarriles y pasos fronterizos.",
              "effects": {
                "movement": 6,
                "fuel": 3,
                "reconnaissance": 3
              },
              "next": "munich",
              "result": "La planificación de movimiento gana robustez."
            }
          ]
        },
        "munich": {
          "id": "munich",
          "date": "29 SEP 1938",
          "time": "22:15",
          "urgency": "POLITISCHE LAGE",
          "from": "OKW / OKH",
          "title": "Múnich: el plan militar queda suspendido por la política",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN DE ALERTA",
          "body": [
            "Mientras los líderes políticos negocian, el Heer debe permanecer preparado para resultados incompatibles entre sí: desmovilización parcial, ocupación pactada o guerra.",
            "La dificultad es sostener alerta sin desgastar innecesariamente a las fuerzas."
          ],
          "historical": [
            "Alemania, Italia, Gran Bretaña y Francia alcanzaron el Acuerdo de Múnich el 29-30 de septiembre de 1938.",
            "Checoslovaquia no participó en las negociaciones que decidieron la cesión del territorio sudeto."
          ],
          "intel": "La información diplomática llega en fragmentos. Las órdenes militares no pueden adelantarse demasiado a una decisión política.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 183-R69173, Münchener Abkommen, Staatschefs.jpg",
              "caption": "Jefes de gobierno durante el Acuerdo de Múnich.",
              "usage": "Documenta a los participantes de la conferencia.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 146-1976-033-06, Münchener Abkommen, Unterschrift Adolf Hitler.jpg",
              "caption": "Firma vinculada al Acuerdo de Múnich.",
              "usage": "Marca el momento documental del acuerdo.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-H13039, Münchener Abkommen, Rückkehr Hitler.jpg",
              "caption": "Regreso tras Múnich.",
              "usage": "Se utiliza como transición del riesgo de guerra a la ocupación pactada.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "alert_hold",
              "title": "MANTENER ALERTA ALTA",
              "tag": "PRUDENCIA",
              "desc": "No relajar preparación hasta recibir órdenes firmes.",
              "effects": {
                "cohesion": 3,
                "fatigue": 5,
                "fuel": -2
              },
              "next": "occupation",
              "result": "Las fuerzas están listas para moverse, pero el coste humano aumenta."
            },
            {
              "id": "staged_release",
              "title": "LIBERAR ESCALONES",
              "tag": "SOSTENIBILIDAD",
              "desc": "Reducir alerta en unidades no esenciales.",
              "effects": {
                "fatigue": -4,
                "fuel": 3,
                "movement": -2
              },
              "next": "occupation",
              "result": "Se recupera capacidad, con algo menos de rapidez inmediata."
            }
          ]
        },
        "occupation": {
          "id": "occupation",
          "date": "1 OCT 1938",
          "time": "07:00",
          "urgency": "EINMARSCHBEFEHL",
          "from": "OKH · Operaciones",
          "title": "Ocupar los Sudetes sin convertirlo en una batalla",
          "classification": "HECHO HISTÓRICO + SIMULACIÓN DE MOVIMIENTO",
          "body": [
            "El acuerdo transforma una posible campaña en una ocupación escalonada. El problema operativo ahora es mover fuerzas por zonas asignadas, evitar congestión y tomar control de infraestructura.",
            "La ausencia de batalla no elimina la necesidad de disciplina."
          ],
          "historical": [
            "Las tropas alemanas ocuparon las regiones sudetas entre el 1 y el 10 de octubre de 1938.",
            "La cesión incluyó importantes posiciones defensivas fronterizas checoslovacas."
          ],
          "intel": "La resistencia militar prevista ha desaparecido, pero el detalle local de carreteras, instalaciones y fortificaciones sigue variando.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 146-2006-0015, Einmarsch Sudetenland, Leitmeritz.jpg",
              "caption": "Entrada de tropas en Leitmeritz.",
              "usage": "Ilustra la ocupación escalonada.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 146-1972-061-34, Anschluss sudetendeutscher Gebiete.jpg",
              "caption": "Incorporación de zonas sudetas.",
              "usage": "Funciona como parte fotográfico de avance.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 146-1991-075-00, Reichenau, Einmarsch deutscher Truppen.jpg",
              "caption": "Entrada de tropas alemanas en Reichenau.",
              "usage": "Se usa para comparar ritmos de entrada y control local.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "phase_zones",
              "title": "ENTRADA POR FASES",
              "tag": "CONTROL",
              "desc": "Respetar estrictamente zonas y horarios.",
              "effects": {
                "cohesion": 6,
                "movement": -2,
                "communications": 3
              },
              "next": "fortifications",
              "result": "La ocupación es ordenada y fácil de documentar."
            },
            {
              "id": "rapid_control",
              "title": "CONTROL RÁPIDO DE NODOS",
              "tag": "VELOCIDAD",
              "desc": "Priorizar carreteras, puentes y centros de mando.",
              "effects": {
                "movement": 6,
                "fuel": -3,
                "reconnaissance": 3
              },
              "next": "fortifications",
              "result": "Los nodos clave quedan bajo control antes, con más dispersión entre unidades."
            }
          ]
        },
        "fortifications": {
          "id": "fortifications",
          "date": "10 OCT 1938",
          "time": "15:45",
          "urgency": "TECHNISCHER BERICHT",
          "from": "Inspección de fortificaciones",
          "title": "Lo que habría costado atacar",
          "classification": "HECHO HISTÓRICO + ANÁLISIS TÉCNICO",
          "body": [
            "Con la ocupación completada, los ingenieros pueden examinar posiciones que días antes habrían sido objetivos de guerra.",
            "La escena obliga al jugador a convertir una fortificación capturada sin combate en conocimiento para futuras operaciones."
          ],
          "historical": [
            "Las defensas fronterizas checoslovacas formaban parte de la zona cedida.",
            "La ocupación permitió a Alemania estudiar instalaciones y posiciones defensivas."
          ],
          "intel": "La inspección física ofrece información de alta confianza, aunque no reproduce cómo habría funcionado la defensa bajo combate.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 146-2003-0038, Besetzung Sudetenland, Panzerwerk.jpg",
              "caption": "Fortificación en los Sudetes ocupados.",
              "usage": "Se convierte en dossier técnico de ingeniería.",
              "chronology": "contemporary"
            },
            {
              "file": "De1938~w.png",
              "caption": "Mapa/diagrama de Alemania en 1938.",
              "usage": "Actualiza la imagen territorial tras las anexiones.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "engineer_study",
              "title": "ESTUDIO DE INGENIERÍA",
              "tag": "FORTIFICACIÓN",
              "desc": "Catalogar soluciones constructivas y vulnerabilidades.",
              "effects": {
                "reconnaissance": 6,
                "ammunition": 3
              },
              "next": "graf_zeppelin",
              "result": "El Heer obtiene un archivo técnico de defensas modernas."
            },
            {
              "id": "mobility_study",
              "title": "ESTUDIO DE ACCESOS",
              "tag": "MOVILIDAD",
              "desc": "Centrarse en rutas, obstáculos y aproximaciones.",
              "effects": {
                "movement": 5,
                "reconnaissance": 4
              },
              "next": "graf_zeppelin",
              "result": "Las lecciones se traducen en mejores planes de aproximación."
            }
          ]
        },
        "graf_zeppelin": {
          "id": "graf_zeppelin",
          "date": "8 DEC 1938",
          "time": "14:30",
          "urgency": "RÜSTUNGSSTAND",
          "from": "OKW · Informe industrial",
          "title": "Graf Zeppelin: otra promesa del rearme",
          "classification": "HECHO HISTÓRICO + CONTEXTO INTERARMAS",
          "body": [
            "La botadura del portaaviones Graf Zeppelin cierra el año con otra demostración de ambición industrial.",
            "Para el Heer, la pregunta sigue siendo la misma: cuánto poder potencial puede financiarse al mismo tiempo sin vaciar logística y producción terrestre."
          ],
          "historical": [
            "El portaaviones Graf Zeppelin fue botado en diciembre de 1938.",
            "El programa naval competía por capacidad industrial con otras ramas de las fuerzas armadas."
          ],
          "intel": "Los calendarios de construcción son públicos dentro del aparato militar; su utilidad futura sigue siendo incierta.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 146-1984-097-36, Flugzeugträger \"Graf Zeppelin\" nach Stapellauf.jpg",
              "caption": "Graf Zeppelin tras su botadura.",
              "usage": "Documenta el hito naval de diciembre de 1938.",
              "chronology": "contemporary"
            },
            {
              "file": "Bundesarchiv Bild 183-2006-0810-500, Flugzeugträger \"Graf Zeppelin\", Hitler bei Stapellauf.jpg",
              "caption": "Hitler durante la botadura del Graf Zeppelin.",
              "usage": "Sitúa la dimensión política e industrial del programa.",
              "chronology": "contemporary"
            }
          ],
          "choices": [
            {
              "id": "land_readiness",
              "title": "CIERRE CON PRIORIDAD TERRESTRE",
              "tag": "HEER",
              "desc": "Solicitar que 1939 se enfoque en preparación terrestre.",
              "effects": {
                "movement": 4,
                "fuel": 4,
                "communications": 2
              },
              "next": "year_end_archive",
              "result": "El Heer entra en 1939 con una orientación más clara hacia movilidad y sostenimiento."
            },
            {
              "id": "balanced_rearm",
              "title": "CIERRE INTERARMAS",
              "tag": "OKW",
              "desc": "Mantener equilibrio de programas.",
              "effects": {
                "command": 1,
                "cohesion": 4,
                "movement": -1
              },
              "next": "year_end_archive",
              "result": "El reparto sigue siendo amplio, con menor margen específico para el Ejército."
            }
          ]
        },
        "year_end_archive": {
          "id": "year_end_archive",
          "date": "31 DEC 1938",
          "time": "18:00",
          "urgency": "JAHRESABSCHLUSS",
          "from": "Archiv des Generalstabs",
          "title": "1938 termina, la siguiente campaña ya se insinúa",
          "classification": "ARCHIVO RETROSPECTIVO · NO CONTEMPORÁNEO",
          "body": [
            "El archivo incorpora una fotografía posterior del Lützow como consecuencia del programa naval en marcha. No representa un hecho de 1938 y el juego lo marca de forma explícita.",
            "El Capítulo I termina con una idea: la reorganización del mando, la expansión territorial y las pruebas logísticas de 1938 han creado las condiciones de la campaña que comenzará en 1939."
          ],
          "historical": [
            "El Lützow pertenece a una fase posterior del programa naval y se muestra únicamente como archivo retrospectivo.",
            "El siguiente capítulo del juego será Fall Weiss, Polonia, septiembre de 1939."
          ],
          "intel": "El balance anual es retrospectivo y separa de forma visible hechos de 1938 de material posterior.",
          "visuals": [
            {
              "file": "Bundesarchiv Bild 101II-MN-1038-06, Kiel, Schwerer Kreuzer \"Lützow\".jpg",
              "caption": "Crucero Lützow en archivo posterior.",
              "usage": "Muestra el resultado posterior de decisiones industriales iniciadas antes; nunca se presenta como fotografía de 1938.",
              "chronology": "retrospective-archive"
            }
          ],
          "choices": [],
          "endText": "FIN DEL CAPÍTULO I · 1938\nSiguiente: FALL WEISS · Polonia, septiembre de 1939."
        }
      },
      "sources": [
        {
          "short": "USHMM · Ejército y régimen",
          "title": "Timeline of the German Military and the Nazi Regime",
          "publisher": "United States Holocaust Memorial Museum",
          "url": "https://encyclopedia.ushmm.org/content/en/article/timeline-of-the-german-military-and-the-nazi-regime"
        },
        {
          "short": "USHMM · Austria",
          "title": "German Annexation of Austria",
          "publisher": "United States Holocaust Memorial Museum",
          "url": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1933-1938/german-annexation-of-austria"
        },
        {
          "short": "USHMM · Múnich",
          "title": "Munich Agreement",
          "publisher": "United States Holocaust Memorial Museum",
          "url": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1933-1938/munich-agreement"
        },
        {
          "short": "Archivo visual",
          "title": "Recursos de Bundesarchiv y Wikimedia Commons usados en la campaña",
          "publisher": "Wikimedia Commons / Bundesarchiv",
          "url": "https://commons.wikimedia.org/"
        }
      ]
    },
    "ch1": {
      "engine": true,
      "title": "CAPÍTULO I · FALL WEISS",
      "subtitle": "Polonia · 1 de septiembre de 1939",
      "protagonist": "General der Panzertruppe Heinz Guderian",
      "command": "XIX. Armeekorps (mot.) · 4. Armee · Heeresgruppe Nord",
      "startDate": "31 AGO 1939",
      "startTime": "23:35",
      "startScene": "briefing",
      "assets": {
        "heroUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/Bundesarchiv_Bild_101I-012-0035-11A%2C_Polen%2C_Panzer_I_und_Infanterie.jpg",
        "campaignMapUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Poland1939_GermanPlanMap.jpg",
        "staffUrl": "https://upload.wikimedia.org/wikipedia/commons/9/99/Bundesarchiv_Bild_101I-001-0256-31%2C_Warschau%2C_Generale_v._Weichs%2C_Blaskowitz.jpg"
      },
      "objective": "Llevar el cuerpo hasta el río Brda antes del anochecer sin desarticularlo.",
      "dossier": [
        "Alemania invade Polonia en la madrugada del 1 de septiembre de 1939. El ataque no es una respuesta defensiva: la justificación propagandística alemana se apoya, entre otros elementos, en un ataque fingido contra la emisora de Gleiwitz.",
        "Tu mando es el XIX. Armeekorps motorizado. Su función inicial dentro del 4.º Ejército es contribuir a cortar el Corredor Polaco y avanzar hacia el Vístula.",
        "Bajo el cuerpo se encuentran la 3. Panzer-Division, la 2. Infanterie-Division (mot.) y la 20. Infanterie-Division (mot.). La velocidad importa, pero también el combustible, los puentes, las carreteras, la niebla, el tráfico y la cohesión entre columnas.",
        "<b>Tu objetivo para el primer día:</b> alcanzar el río Brda con la vanguardia y llegar con un cuerpo capaz de seguir combatiendo. Cada orden consume tiempo. Los informes pueden ser falsos. Puedes fracasar."
      ],
      "start": "briefing",
      "startClock": -25,
      "resources": {
        "command": 8,
        "communications": 78,
        "fuel": 86,
        "ammunition": 88,
        "movement": 82,
        "cohesion": 84,
        "reconnaissance": 49,
        "fatigue": 8
      },
      "hidden": {
        "chojnice": {
          "fuerte": 0.6,
          "debil": 0.4
        },
        "bridge": {
          "intacto": 0.35,
          "volado": 0.65
        },
        "cavalry": {
          "flanco": 0.7,
          "lejos": 0.3
        }
      },
      "formations": [
        {
          "id": "3pz",
          "name": "3. Panzer-Division",
          "commander": "Generalleutnant Leo Geyr von Schweppenburg",
          "role": "Schwerpunkt blindado",
          "readiness": 90,
          "supply": 89,
          "position": "Frontera de Pomerania"
        },
        {
          "id": "2mot",
          "name": "2. Infanterie-Division (mot.)",
          "commander": "Generalleutnant Paul Bader",
          "role": "Infantería motorizada",
          "readiness": 86,
          "supply": 91,
          "position": "Centro del dispositivo"
        },
        {
          "id": "20mot",
          "name": "20. Infanterie-Division (mot.)",
          "commander": "Generalleutnant Mauritz von Wiktorin",
          "role": "Ala septentrional",
          "readiness": 84,
          "supply": 88,
          "position": "Norte del dispositivo"
        }
      ],
      "staff": [
        {
          "id": "ia",
          "rank": "Oberst i.G.",
          "name": "Friedrich Keller",
          "role": "Ia · Operaciones",
          "fictional": true,
          "trust": 70,
          "notes": [
            {
              "if": {
                "res": {
                  "cohesion": {
                    "lt": 60
                  }
                }
              },
              "text": "Keller está alarmado: las columnas se mezclan y las órdenes llegan a unidades que ya no están donde creemos. Pide consolidar antes de exigir más."
            },
            {
              "if": {
                "res": {
                  "cohesion": {
                    "lt": 72
                  }
                }
              },
              "text": "Las diferencias de ritmo entre las columnas empiezan a preocupar a Operaciones. Keller pide reducir órdenes simultáneas."
            },
            {
              "if": {
                "progress": {
                  "gte": 60
                }
              },
              "text": "Keller ve el Brda al alcance. Recuerda que llegar al río no sirve de nada si la división llega sin munición para cruzarlo."
            },
            {
              "text": "Insiste en preservar el ritmo de marcha y evitar que las columnas se mezclen en los cruces."
            }
          ]
        },
        {
          "id": "ic",
          "rank": "Major i.G.",
          "name": "Ernst Weber",
          "role": "Ic · Inteligencia",
          "fictional": true,
          "trust": 65,
          "notes": [
            {
              "if": {
                "res": {
                  "reconnaissance": {
                    "lt": 40
                  }
                }
              },
              "text": "Weber admite que trabaja casi a ciegas. Sus estimaciones son poco más que suposiciones: trátalas como rumores."
            },
            {
              "if": {
                "res": {
                  "reconnaissance": {
                    "gt": 65
                  }
                }
              },
              "text": "La imagen táctica está mejorando. Weber recuerda que un informe correcto hace treinta minutos puede ser falso ahora."
            },
            {
              "text": "La información sobre las posiciones polacas al otro lado de la frontera es incompleta y envejece rápido."
            }
          ]
        },
        {
          "id": "qu",
          "rank": "Oberstleutnant",
          "name": "Otto Hartmann",
          "role": "Qu · Logística",
          "fictional": true,
          "trust": 72,
          "notes": [
            {
              "if": {
                "res": {
                  "fuel": {
                    "lt": 45
                  }
                }
              },
              "text": "Hartmann es tajante: si la vanguardia sigue consumiendo a este ritmo, mañana los Panzer serán cañones fijos."
            },
            {
              "if": {
                "res": {
                  "fuel": {
                    "lt": 66
                  }
                }
              },
              "text": "La situación de combustible sigue siendo utilizable, pero Hartmann exige evitar movimientos sin objetivo operativo claro."
            },
            {
              "if": {
                "res": {
                  "ammunition": {
                    "lt": 55
                  }
                }
              },
              "text": "Hartmann advierte que la munición de artillería no llegará a la vanguardia hasta la noche."
            },
            {
              "text": "Advierte que velocidad y combustible no son lo mismo: una columna detenida también consume tiempo y capacidad de transporte."
            }
          ]
        }
      ],
      "map": {
        "width": 1000,
        "height": 560,
        "turnsFrom": 285,
        "units": [
          {
            "id": "3pz",
            "short": "3. Pz.Div.",
            "symbol": "3 Pz",
            "fuelRate": 1.8,
            "speed": 1
          },
          {
            "id": "2mot",
            "short": "2. ID (mot.)",
            "symbol": "2 mot",
            "fuelRate": 0.8,
            "speed": 1
          },
          {
            "id": "20mot",
            "short": "20. ID (mot.)",
            "symbol": "20 mot",
            "fuelRate": 0.8,
            "speed": 1
          }
        ],
        "routes": {
          "3pz": {
            "points": [
              {
                "u": 0,
                "x": 90,
                "y": 430,
                "label": "la frontera"
              },
              {
                "u": 22,
                "x": 230,
                "y": 440,
                "label": "Sępólno (Zempelburg)"
              },
              {
                "u": 45,
                "x": 360,
                "y": 420,
                "label": "los caminos hacia el Brda"
              },
              {
                "u": 70,
                "x": 500,
                "y": 400,
                "label": "el Brda"
              },
              {
                "u": 85,
                "x": 600,
                "y": 410,
                "label": "la orilla este del Brda"
              },
              {
                "u": 130,
                "x": 900,
                "y": 380,
                "label": "el camino al Vístula"
              }
            ]
          },
          "2mot": {
            "points": [
              {
                "u": 0,
                "x": 90,
                "y": 290,
                "label": "la frontera"
              },
              {
                "u": 15,
                "x": 210,
                "y": 285,
                "label": "el borde del bosque"
              },
              {
                "u": 32,
                "x": 330,
                "y": 280,
                "label": "los bosques de Tuchola"
              },
              {
                "u": 50,
                "x": 470,
                "y": 270,
                "label": "el Brda (norte)"
              },
              {
                "u": 65,
                "x": 600,
                "y": 250,
                "label": "Tuchola"
              }
            ],
            "forest": [
              [
                12,
                50
              ]
            ]
          },
          "20mot": {
            "points": [
              {
                "u": 0,
                "x": 90,
                "y": 150,
                "label": "la frontera"
              },
              {
                "u": 20,
                "x": 240,
                "y": 140,
                "label": "Chojnice (Konitz)"
              },
              {
                "u": 35,
                "x": 360,
                "y": 110,
                "label": "el sector de Krojanty"
              },
              {
                "u": 55,
                "x": 465,
                "y": 130,
                "label": "el Brda (norte)"
              }
            ]
          }
        },
        "places": [
          {
            "x": 240,
            "y": 140,
            "name": "Chojnice"
          },
          {
            "x": 385,
            "y": 92,
            "name": "Krojanty"
          },
          {
            "x": 230,
            "y": 440,
            "name": "Sępólno"
          },
          {
            "x": 600,
            "y": 250,
            "name": "Tuchola"
          },
          {
            "x": 910,
            "y": 362,
            "name": "Świecie"
          }
        ],
        "forests": [
          {
            "x": 200,
            "y": 200,
            "w": 290,
            "h": 150,
            "label": "Bosques de Tuchola"
          }
        ],
        "rivers": [
          {
            "name": "Brda",
            "d": "M470 20 C 478 120 455 220 480 300 S 515 470 530 560",
            "lx": 490,
            "ly": 200
          },
          {
            "name": "Vístula",
            "d": "M930 20 C 915 160 940 300 925 420 S 940 520 935 560",
            "lx": 945,
            "ly": 120
          }
        ],
        "border": "M150 20 L 150 560",
        "enemies": [
          {
            "id": "cover3",
            "name": "Destacamento de cobertura polaco",
            "area": "el eje de la 3. Pz.Div.",
            "route": "3pz",
            "u": 34,
            "strength": 1,
            "misreport": "posible posición anticarro",
            "clearText": "despeja el destacamento de cobertura y reanuda la marcha."
          },
          {
            "id": "chojnice",
            "name": "Defensa de Chojnice",
            "area": "Chojnice",
            "route": "20mot",
            "u": 20,
            "strengthBy": {
              "hidden": "chojnice",
              "map": {
                "fuerte": 3,
                "debil": 1
              }
            },
            "clearedBy": [
              "chojnice_taken"
            ],
            "bypassBy": [
              "chojnice_contained"
            ],
            "onClear": [
              "chojnice_taken"
            ],
            "misreport": "guarnición de fuerza desconocida",
            "clearText": "toma Chojnice. La carretera queda libre."
          },
          {
            "id": "forest",
            "name": "Grupo polaco en los bosques",
            "area": "los bosques de Tuchola",
            "route": "2mot",
            "u": 28,
            "strength": 2,
            "clearedBy": [
              "forest_cleared"
            ],
            "onClear": [
              "forest_cleared"
            ],
            "misreport": "movimientos en el bosque",
            "clearText": "limpia el sector forestal y abre los caminos."
          },
          {
            "id": "tuchola",
            "name": "Posiciones ante Tuchola",
            "area": "Tuchola",
            "route": "2mot",
            "u": 58,
            "strength": 2,
            "misreport": "posiciones defensivas",
            "clearText": "rompe las posiciones ante Tuchola."
          },
          {
            "id": "brda",
            "name": "Defensa del Brda",
            "area": "el Brda",
            "route": "3pz",
            "u": 71,
            "scripted": true,
            "clearedBy": [
              "bridgehead",
              "bridgehead_small",
              "bridgehead_costly"
            ],
            "misreport": "posiciones en la orilla este",
            "reachText": "alcanza el Brda. El cruce del río exige una decisión de mando."
          },
          {
            "id": "cavalry",
            "name": "Brigada de Caballería Pomorska",
            "area": "el flanco norte",
            "placeBy": {
              "hidden": "cavalry",
              "map": {
                "flanco": {
                  "x": 400,
                  "y": 70
                },
                "lejos": {
                  "x": 560,
                  "y": 50
                }
              }
            },
            "detectRange": 190,
            "misreport": "jinetes en número desconocido"
          }
        ]
      },
      "failures": [
        {
          "if": {
            "res": {
              "cohesion": {
                "lt": 35
              }
            }
          },
          "to": "collapse"
        },
        {
          "if": {
            "res": {
              "fuel": {
                "lt": 15
              }
            }
          },
          "to": "stalled"
        }
      ],
      "evaluation": {
        "criteria": [
          {
            "label": "Objetivo: río Brda",
            "max": 40,
            "levels": [
              {
                "if": {
                  "flag": "bridgehead"
                },
                "points": 40,
                "text": "Cabeza de puente al otro lado del Brda."
              },
              {
                "if": {
                  "any": [
                    {
                      "flag": "bridgehead_small"
                    },
                    {
                      "flag": "bridgehead_costly"
                    }
                  ]
                },
                "points": 35,
                "text": "Una cabeza de puente precaria al otro lado del río."
              },
              {
                "if": {
                  "progress": {
                    "gte": 70
                  }
                },
                "points": 30,
                "text": "La vanguardia alcanza el Brda."
              },
              {
                "if": {
                  "progress": {
                    "gte": 50
                  }
                },
                "points": 15,
                "text": "La vanguardia queda a distancia del río."
              },
              {
                "points": 5,
                "text": "El avance se queda corto."
              }
            ]
          },
          {
            "label": "Conservación de fuerzas",
            "max": 15,
            "levels": [
              {
                "if": {
                  "losses": {
                    "men": {
                      "lt": 400
                    }
                  }
                },
                "points": 15,
                "text": "Pérdidas ligeras."
              },
              {
                "if": {
                  "losses": {
                    "men": {
                      "lt": 800
                    }
                  }
                },
                "points": 10,
                "text": "Pérdidas moderadas."
              },
              {
                "if": {
                  "losses": {
                    "men": {
                      "lt": 1250
                    }
                  }
                },
                "points": 5,
                "text": "Pérdidas serias."
              },
              {
                "points": 0,
                "text": "Pérdidas graves para un solo día."
              }
            ]
          },
          {
            "label": "Cohesión del cuerpo",
            "max": 10,
            "levels": [
              {
                "if": {
                  "res": {
                    "cohesion": {
                      "gte": 75
                    }
                  }
                },
                "points": 10,
                "text": "Las divisiones siguen coordinadas."
              },
              {
                "if": {
                  "res": {
                    "cohesion": {
                      "gte": 55
                    }
                  }
                },
                "points": 6,
                "text": "Cohesión aceptable, con fricción."
              },
              {
                "points": 2,
                "text": "El cuerpo llega desordenado."
              }
            ]
          },
          {
            "label": "Logística para el día 2",
            "max": 10,
            "levels": [
              {
                "if": {
                  "all": [
                    {
                      "res": {
                        "fuel": {
                          "gte": 50
                        }
                      }
                    },
                    {
                      "res": {
                        "ammunition": {
                          "gte": 50
                        }
                      }
                    }
                  ]
                },
                "points": 10,
                "text": "Combustible y munición para continuar."
              },
              {
                "if": {
                  "all": [
                    {
                      "res": {
                        "fuel": {
                          "gte": 30
                        }
                      }
                    },
                    {
                      "res": {
                        "ammunition": {
                          "gte": 30
                        }
                      }
                    }
                  ]
                },
                "points": 6,
                "text": "Suficiente para una mañana de operaciones."
              },
              {
                "points": 1,
                "text": "El día 2 empieza esperando a los convoyes."
              }
            ]
          },
          {
            "label": "Divisiones de infantería motorizada",
            "max": 15,
            "levels": [
              {
                "if": {
                  "all": [
                    {
                      "unit": {
                        "2mot": {
                          "gte": 35
                        }
                      }
                    },
                    {
                      "unit": {
                        "20mot": {
                          "gte": 25
                        }
                      }
                    }
                  ]
                },
                "points": 15,
                "text": "La 2. y la 20. ID (mot.) acompañan el avance."
              },
              {
                "if": {
                  "any": [
                    {
                      "unit": {
                        "2mot": {
                          "gte": 35
                        }
                      }
                    },
                    {
                      "unit": {
                        "20mot": {
                          "gte": 25
                        }
                      }
                    }
                  ]
                },
                "points": 7,
                "text": "Una de las divisiones motorizadas se ha quedado atrás."
              },
              {
                "points": 0,
                "text": "La infantería motorizada se ha quedado muy atrás."
              }
            ]
          },
          {
            "label": "Flanco septentrional",
            "max": 10,
            "levels": [
              {
                "if": {
                  "noFlag": "rear_panic"
                },
                "points": 10,
                "text": "El flanco aguantó sin pánico."
              },
              {
                "if": {
                  "flag": "general_present"
                },
                "points": 6,
                "text": "Hubo alarma, pero el mando la contuvo."
              },
              {
                "points": 0,
                "text": "La alarma en el flanco quedó sin resolver."
              }
            ]
          }
        ],
        "verdicts": [
          {
            "min": 88,
            "title": "MÁS ALLÁ DE LO HISTÓRICO",
            "text": "El cuerpo termina la jornada en mejor situación que la registrada históricamente. La 4. Armee anota la velocidad del XIX. Armeekorps; el riesgo asumido no te ha pasado factura todavía."
          },
          {
            "min": 72,
            "title": "RITMO HISTÓRICO",
            "text": "El cuerpo cumple el objetivo del primer día con un coste asumible. Es aproximadamente lo que ocurrió: el Brda alcanzado y el paso pendiente para los días siguientes."
          },
          {
            "min": 52,
            "title": "AVANCE CONTENIDO",
            "text": "El cuerpo avanza, pero por debajo de lo esperado. Mañana tendrás que recuperar tiempo con menos margen."
          },
          {
            "min": 0,
            "title": "JORNADA FALLIDA",
            "text": "El primer día deja al cuerpo lejos del objetivo y debilitado. El mando superior empezará a preguntar qué ha fallado."
          }
        ],
        "history": [
          "Según las memorias de Guderian, al final del 1 de septiembre la 3. Panzer-Division había alcanzado el Brda; el paso del río y la consolidación al otro lado ocuparon los días siguientes.",
          "Al anochecer del 1 de septiembre, el 18.º Regimiento de Ulanos polaco cargó cerca de Krojanty contra infantería alemana. La carga fue detenida por vehículos blindados y fuego de ametralladora; su comandante, el coronel Kazimierz Mastalerz, murió en la acción.",
          "Los combates en los bosques de Tuchola se prolongaron durante los primeros días de septiembre, hasta el cierre del Corredor Polaco."
        ]
      },
      "scenes": {
        "briefing": {
          "id": "briefing",
          "at": -25,
          "urgency": "GEHEIME KOMMANDOSACHE",
          "from": "4. Armee · Estado Mayor",
          "title": "La orden entra en vigor",
          "classification": "HECHO HISTÓRICO + RECONSTRUCCIÓN NARRATIVA",
          "body": [
            "Las órdenes están confirmadas. El ataque comenzará a las 04:45. La misión del 4.º Ejército es romper el Corredor Polaco y establecer la conexión operativa hacia Prusia Oriental.",
            "Tu cuerpo motorizado debe mantener velocidad y cohesión. Las carreteras son limitadas y el movimiento simultáneo de blindados, infantería motorizada, artillería y trenes logísticos puede crear sus propios atascos.",
            "Antes de que amanezca debes decidir desde dónde vas a mandar. Esa decisión determinará qué ves, qué tarde te llega y qué riesgos corres tú mismo."
          ],
          "historical": [
            "Alemania atacó Polonia el 1 de septiembre de 1939, iniciando la Segunda Guerra Mundial en Europa.",
            "El XIX Cuerpo motorizado de Guderian estaba subordinado al 4.º Ejército del Grupo de Ejércitos Norte y participó en el ataque para cortar el Corredor Polaco.",
            "La hora de ataque fijada para el 1 de septiembre fue las 04:45."
          ],
          "intel": [
            "La información disponible antes del cruce de frontera es incompleta y pierde valor rápidamente con el movimiento."
          ],
          "choices": [
            {
              "id": "forward_hq",
              "title": "PUESTO DE MANDO JUNTO A LA VANGUARDIA",
              "tag": "VER CON TUS OJOS",
              "desc": "Acompañar a la 3. Panzer-Division. Verás antes, pero el resto del cuerpo te oirá peor.",
              "effects": {
                "res": {
                  "command": -1,
                  "reconnaissance": 6,
                  "communications": -6,
                  "fatigue": 5
                },
                "flags": [
                  "hq_forward"
                ]
              },
              "next": "fog",
              "result": "Trasladas el puesto de mando hacia delante. La imagen de la vanguardia será inmediata; la de las otras dos divisiones dependerá de la radio."
            },
            {
              "id": "mobile_hq",
              "title": "MANDO MÓVIL ESCALONADO",
              "tag": "COMPROMISO",
              "desc": "Puesto móvil detrás de la vanguardia, con oficiales de enlace adelantados.",
              "effects": {
                "res": {
                  "communications": 2,
                  "cohesion": 3,
                  "fatigue": 2
                },
                "flags": [
                  "hq_mobile"
                ]
              },
              "next": "fog",
              "result": "El Estado Mayor avanzará por saltos. Pierdes algo de inmediatez a cambio de una red de mando más estable."
            },
            {
              "id": "rear_hq",
              "title": "PUESTO DE MANDO EN RETAGUARDIA",
              "tag": "RED DE MANDO",
              "desc": "Priorizar comunicaciones y control de tráfico por encima del contacto directo.",
              "effects": {
                "res": {
                  "communications": 8,
                  "cohesion": 4,
                  "reconnaissance": -5
                },
                "flags": [
                  "hq_rear"
                ]
              },
              "next": "fog",
              "result": "El mando conserva una red de comunicaciones ordenada, pero los informes de vanguardia llegarán tarde y filtrados."
            }
          ]
        },
        "fog": {
          "id": "fog",
          "at": 320,
          "urgency": "PARTE DE VANGUARDIA",
          "from": "3. Panzer-Division",
          "title": "Niebla, columnas y fuego propio",
          "classification": "HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
          "onEnter": [
            {
              "if": {
                "flag": "hq_forward"
              },
              "effects": {
                "res": {
                  "command": -1,
                  "fatigue": 4
                },
                "trust": {
                  "ia": -4
                }
              }
            }
          ],
          "body": [
            "La madrugada está cubierta de niebla. La vanguardia informa de visibilidad reducida, caminos congestionados y contacto irregular con unidades polacas.",
            {
              "if": {
                "flag": "hq_forward"
              },
              "text": "<b>Tu propio grupo de mando está bajo los proyectiles.</b> La artillería pesada del cuerpo dispara a ciegas dentro de la niebla: un impacto cae delante de tu vehículo, el siguiente detrás. Pierdes media hora y la calma de tu escolta."
            },
            {
              "if": {
                "noFlag": "hq_forward"
              },
              "text": "Llega un parte confuso: una batería propia ha abierto fuego demasiado cerca de elementos adelantados. El incidente revela el riesgo de que las columnas más rápidas se adelanten a la coordinación artillera."
            },
            "El ritmo de la operación aún no está roto, pero cada parada se propaga hacia atrás por kilómetros de carretera."
          ],
          "historical": [
            "Las operaciones comenzaron el 1 de septiembre. Guderian acompañó personalmente a elementos de la 3. Panzer-Division durante el avance inicial.",
            "En sus memorias, Guderian relata que su vehículo quedó bajo fuego de la artillería pesada de su propio cuerpo en medio de la niebla.",
            "El XIX Cuerpo estaba compuesto por la 3. Panzer-Division y las 2.ª y 20.ª divisiones de infantería motorizada."
          ],
          "intel": [
            "La niebla reduce la observación directa. Partes de vanguardia y radio no llegan siempre en el mismo orden en que ocurrieron los hechos."
          ],
          "choices": [
            {
              "id": "push_armor",
              "title": "MANTENER EL RITMO BLINDADO",
              "tag": "VELOCIDAD",
              "desc": "Ordenar a la 3. Panzer-Division que preserve el impulso y resolver los atascos detrás.",
              "effects": {
                "minutes": 60,
                "progress": 30,
                "res": {
                  "movement": 6,
                  "fuel": -10,
                  "cohesion": -9,
                  "communications": -3,
                  "fatigue": 5
                },
                "formations": {
                  "3pz": {
                    "readiness": -3,
                    "supply": -7,
                    "position": "Vanguardia adelantada"
                  }
                }
              },
              "next": "chojnice",
              "result": "Los blindados mantienen el ritmo. Ganas tiempo operativo, pero la cola logística se estira y las unidades de apoyo pierden contacto temporalmente."
            },
            {
              "id": "traffic_control",
              "title": "REORDENAR COLUMNAS",
              "tag": "CONTROL",
              "desc": "Detener brevemente sectores de la marcha para separar artillería, blindados y trenes logísticos.",
              "effects": {
                "minutes": 90,
                "progress": 18,
                "res": {
                  "movement": -4,
                  "cohesion": 8,
                  "communications": 4,
                  "fuel": -3,
                  "fatigue": 1
                },
                "formations": {
                  "3pz": {
                    "readiness": 2
                  },
                  "2mot": {
                    "readiness": 2
                  },
                  "20mot": {
                    "readiness": 2
                  }
                }
              },
              "next": "chojnice",
              "result": "La marcha pierde tiempo, pero los itinerarios quedan más limpios. La artillería y el suministro recuperan enlaces con las formaciones de cabeza."
            },
            {
              "id": "recon_first",
              "title": "RECONOCIMIENTO ANTES DE ACELERAR",
              "tag": "INFORMACIÓN",
              "desc": "Usar los elementos de reconocimiento para aclarar cruces y resistencia antes de forzar el paso.",
              "effects": {
                "minutes": 75,
                "progress": 20,
                "res": {
                  "movement": -2,
                  "reconnaissance": 14,
                  "cohesion": 3,
                  "fuel": -4
                },
                "formations": {
                  "3pz": {
                    "position": "Avance con reconocimiento reforzado"
                  }
                }
              },
              "next": "chojnice",
              "result": "El avance se hace algo más lento, pero las siguientes órdenes se emitirán con una imagen táctica menos borrosa."
            }
          ]
        },
        "chojnice": {
          "id": "chojnice",
          "at": 480,
          "urgency": "SITUATIONSMELDUNG",
          "from": "20. Infanterie-Division (mot.)",
          "title": "Konitz no cae",
          "skipIf": {
            "flag": "chojnice_taken"
          },
          "next": "tuchola",
          "classification": "HECHO HISTÓRICO + INFORME INCIERTO",
          "body": [
            "La 20. Infanterie-Division (mot.) informa de que la resistencia polaca en Chojnice (Konitz) detiene su avance. La carretera que atraviesa la ciudad es necesaria para el flujo del cuerpo hacia el este.",
            {
              "if": {
                "any": [
                  {
                    "all": [
                      {
                        "hidden": {
                          "chojnice": "fuerte"
                        }
                      },
                      {
                        "accurate": "chojnice"
                      }
                    ]
                  },
                  {
                    "all": [
                      {
                        "hidden": {
                          "chojnice": "debil"
                        }
                      },
                      {
                        "inaccurate": "chojnice"
                      }
                    ]
                  }
                ]
              },
              "text": "<b>Valoración del Ic:</b> Weber estima posiciones preparadas y fuego bien organizado. No es una retaguardia: tomar la ciudad de frente costará tiempo y hombres."
            },
            {
              "if": {
                "any": [
                  {
                    "all": [
                      {
                        "hidden": {
                          "chojnice": "debil"
                        }
                      },
                      {
                        "accurate": "chojnice"
                      }
                    ]
                  },
                  {
                    "all": [
                      {
                        "hidden": {
                          "chojnice": "fuerte"
                        }
                      },
                      {
                        "inaccurate": "chojnice"
                      }
                    ]
                  }
                ]
              },
              "text": "<b>Valoración del Ic:</b> Weber estima que es una cortina de retaguardia. Con presión decidida, los defensores deberían replegarse."
            },
            "Tu reconocimiento determina cuánto puedes fiarte de esa valoración. Mira el mapa y el panel de inteligencia antes de decidir."
          ],
          "historical": [
            "Chojnice (Konitz) fue escenario de combates el 1 de septiembre de 1939, en el inicio de la ofensiva alemana contra el Corredor Polaco.",
            "El 4.º Ejército había alcanzado la línea Konitz-Nakel al final del 1 de septiembre según un estudio histórico estadounidense de la campaña."
          ],
          "intel": [
            "El frente se mueve con rapidez. La valoración del Ic sobre Chojnice es una estimación, no un hecho: puede estar equivocada."
          ],
          "choices": [
            {
              "id": "assault_chojnice",
              "title": "ASALTO DIRECTO CON LA 20. ID (MOT.)",
              "tag": "DESPEJAR LA CARRETERA",
              "desc": "Tomar la ciudad ahora para liberar el eje. Si la defensa es fuerte, será caro.",
              "effects": {
                "minutes": 120,
                "res": {
                  "ammunition": -8
                }
              },
              "outcomes": [
                {
                  "if": {
                    "hidden": {
                      "chojnice": "debil"
                    }
                  },
                  "effects": {
                    "progress": 6,
                    "res": {
                      "cohesion": 2
                    },
                    "losses": {
                      "men": 120
                    },
                    "flags": [
                      "chojnice_taken"
                    ],
                    "formations": {
                      "20mot": {
                        "readiness": -3,
                        "position": "Chojnice"
                      }
                    }
                  },
                  "result": "La defensa cede tras un asalto corto. La carretera queda libre antes del mediodía y el cuerpo puede seguir fluyendo hacia el este."
                },
                {
                  "if": {
                    "all": [
                      {
                        "res": {
                          "ammunition": {
                            "gte": 72
                          }
                        }
                      },
                      {
                        "res": {
                          "cohesion": {
                            "gte": 72
                          }
                        }
                      }
                    ]
                  },
                  "effects": {
                    "progress": 4,
                    "res": {
                      "ammunition": -6,
                      "cohesion": -4
                    },
                    "losses": {
                      "men": 380,
                      "vehicles": 3
                    },
                    "flags": [
                      "chojnice_taken"
                    ],
                    "formations": {
                      "20mot": {
                        "readiness": -9,
                        "position": "Chojnice"
                      }
                    }
                  },
                  "result": "La ciudad cae, pero la defensa era sólida. El asalto consume munición de artillería y deja a la 20. ID (mot.) con bajas serias."
                },
                {
                  "effects": {
                    "res": {
                      "ammunition": -6,
                      "cohesion": -8
                    },
                    "losses": {
                      "men": 450,
                      "vehicles": 4
                    },
                    "flags": [
                      "chojnice_failed",
                      "flank_exposed"
                    ],
                    "formations": {
                      "20mot": {
                        "readiness": -14,
                        "position": "Ante Chojnice"
                      }
                    }
                  },
                  "result": "El asalto se estrella contra posiciones preparadas. La 20. ID (mot.) queda detenida, con bajas y desordenada, y la ciudad sigue cortando la carretera."
                }
              ],
              "next": "tuchola"
            },
            {
              "id": "contain_chojnice",
              "title": "CONTENER LA CIUDAD Y SEGUIR",
              "tag": "TIEMPO",
              "desc": "Fijar a los defensores con una parte de la división y desviar el tráfico por caminos secundarios.",
              "effects": {
                "minutes": 30,
                "progress": 8,
                "flags": [
                  "chojnice_contained",
                  "flank_exposed"
                ],
                "formations": {
                  "20mot": {
                    "position": "Conteniendo Chojnice"
                  }
                }
              },
              "outcomes": [
                {
                  "if": {
                    "hidden": {
                      "chojnice": "fuerte"
                    }
                  },
                  "effects": {
                    "res": {
                      "communications": -4,
                      "cohesion": -3,
                      "movement": -2
                    }
                  },
                  "result": "El cuerpo sigue adelante, pero Chojnice resiste y bloquea la mejor carretera. El tráfico secundario se atasca y la 20. ID (mot.) queda atada a la ciudad."
                },
                {
                  "effects": {
                    "res": {
                      "movement": 2
                    }
                  },
                  "result": "El cuerpo sigue adelante. La guarnición de Chojnice no tiene fuerza para inquietar a las columnas que la rodean."
                }
              ],
              "next": "tuchola"
            },
            {
              "id": "divert_3pz",
              "title": "DESVIAR UN KAMPFGRUPPE DE LA 3. PANZER",
              "tag": "POTENCIA",
              "desc": "Cortar Chojnice por la retaguardia con blindados. Resuelve el problema, pero frena al Schwerpunkt.",
              "requires": {
                "res": {
                  "fuel": {
                    "gte": 45
                  }
                }
              },
              "blockedText": "Combustible insuficiente en vanguardia para desviar blindados.",
              "effects": {
                "minutes": 90,
                "progress": -4,
                "res": {
                  "fuel": -6,
                  "ammunition": -4
                },
                "losses": {
                  "men": 150,
                  "vehicles": 5
                },
                "flags": [
                  "chojnice_taken"
                ],
                "formations": {
                  "3pz": {
                    "readiness": -4,
                    "supply": -5
                  },
                  "20mot": {
                    "position": "Chojnice"
                  }
                }
              },
              "next": "tuchola",
              "result": "El Kampfgruppe envuelve la ciudad y la defensa se derrumba. La carretera queda libre, pero la 3. Panzer-Division ha perdido horas y combustible en una tarea secundaria."
            }
          ]
        },
        "tuchola": {
          "id": "tuchola",
          "at": 660,
          "urgency": "PARTE DE SITUACIÓN",
          "from": "2. Infanterie-Division (mot.)",
          "title": "Los bosques de Tuchola",
          "classification": "HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
          "skipIf": {
            "flag": "forest_cleared"
          },
          "next": [
            {
              "if": {
                "res": {
                  "fuel": {
                    "lt": 66
                  }
                }
              },
              "to": "fuel"
            },
            {
              "to": "cavalry"
            }
          ],
          "onEnter": [
            {
              "if": {
                "flag": "hq_forward"
              },
              "effects": {
                "res": {
                  "communications": -4,
                  "cohesion": -3
                }
              }
            }
          ],
          "body": [
            "La 2. Infanterie-Division (mot.) entra en la masa forestal de Tuchola: caminos estrechos, visibilidad de pocos metros y unidades polacas que aparecen y desaparecen entre los árboles.",
            {
              "if": {
                "flag": "hq_forward"
              },
              "text": "Desde la vanguardia oyes poco de la 2. ID (mot.). Sus partes te llegan tarde y por radio, sin el detalle que te daría estar allí."
            },
            {
              "if": {
                "flag": "flank_exposed"
              },
              "text": "Con Chojnice sin resolver, el tráfico del cuerpo se concentra en menos caminos. Un atasco dentro del bosque sería difícil de deshacer."
            },
            "Una división motorizada es rápida en carretera y vulnerable en el bosque. La pregunta es cuánto riesgo aceptas para no quedarte atrás."
          ],
          "historical": [
            "La batalla de los bosques de Tuchola (Bory Tucholskie) se libró en los primeros días de septiembre de 1939 y fue uno de los combates principales del cierre del Corredor Polaco.",
            "Las fuerzas polacas del Ejército Pomorze defendían el corredor con divisiones de infantería y la Brigada de Caballería Pomorska."
          ],
          "intel": [
            {
              "if": {
                "res": {
                  "reconnaissance": {
                    "lt": 55
                  }
                }
              },
              "text": "El reconocimiento dentro del bosque es pobre. No sabes si los caminos están libres o si hay posiciones polacas esperando."
            },
            {
              "if": {
                "res": {
                  "reconnaissance": {
                    "gte": 55
                  }
                }
              },
              "text": "El reconocimiento ha identificado los caminos principales y algunas posiciones polacas aisladas."
            }
          ],
          "choices": [
            {
              "id": "forest_roads",
              "title": "EMPUJAR POR LOS CAMINOS",
              "tag": "VELOCIDAD",
              "desc": "La 2. ID (mot.) avanza en columna por los caminos forestales, sin limpiar el bosque.",
              "effects": {
                "minutes": 60,
                "progress": 12,
                "res": {
                  "fuel": -4
                }
              },
              "outcomes": [
                {
                  "if": {
                    "res": {
                      "reconnaissance": {
                        "lt": 60
                      }
                    }
                  },
                  "effects": {
                    "res": {
                      "cohesion": -10,
                      "ammunition": -5
                    },
                    "losses": {
                      "men": 260,
                      "vehicles": 7
                    },
                    "flags": [
                      "ambushed"
                    ],
                    "formations": {
                      "2mot": {
                        "readiness": -10,
                        "position": "Emboscada en los bosques"
                      }
                    }
                  },
                  "result": "La columna cae en una emboscada en un camino estrecho. Los vehículos de cabeza arden y el resto queda atascado bajo fuego. El avance continúa, pero la división ha pagado su ceguera."
                },
                {
                  "effects": {
                    "res": {
                      "cohesion": -2
                    },
                    "losses": {
                      "men": 60
                    },
                    "formations": {
                      "2mot": {
                        "readiness": -3,
                        "position": "Bosques de Tuchola"
                      }
                    }
                  },
                  "result": "Gracias al reconocimiento previo, la columna esquiva las posiciones conocidas. Hay tiroteos aislados, pero la división atraviesa el sector."
                }
              ],
              "next": [
                {
                  "if": {
                    "res": {
                      "fuel": {
                        "lt": 66
                      }
                    }
                  },
                  "to": "fuel"
                },
                {
                  "to": "cavalry"
                }
              ]
            },
            {
              "id": "clear_forest",
              "title": "LIMPIAR EL BOSQUE CON MÉTODO",
              "tag": "SEGURIDAD",
              "desc": "Avanzar por saltos, con infantería desmontada a los lados del camino.",
              "effects": {
                "minutes": 150,
                "progress": 4,
                "res": {
                  "cohesion": 5,
                  "ammunition": -5,
                  "fatigue": 6
                },
                "losses": {
                  "men": 70
                },
                "flags": [
                  "forest_cleared"
                ],
                "formations": {
                  "2mot": {
                    "readiness": -2,
                    "position": "Bosques de Tuchola (asegurados)"
                  }
                }
              },
              "next": [
                {
                  "if": {
                    "res": {
                      "fuel": {
                        "lt": 66
                      }
                    }
                  },
                  "to": "fuel"
                },
                {
                  "to": "cavalry"
                }
              ],
              "result": "El avance es lento pero firme. Los polacos se retiran más hondo en el bosque y la división no se deja sorprender."
            },
            {
              "id": "flank_guard",
              "title": "USAR LA 2. ID (MOT.) COMO GUARDIA DE FLANCO",
              "tag": "FLANCO",
              "desc": "No entrar a fondo en el bosque: la división cubre el flanco septentrional del avance blindado.",
              "effects": {
                "minutes": 30,
                "progress": 6,
                "res": {
                  "reconnaissance": 4
                },
                "flags": [
                  "flank_guarded"
                ],
                "formations": {
                  "2mot": {
                    "position": "Cubriendo el flanco norte"
                  }
                }
              },
              "next": [
                {
                  "if": {
                    "res": {
                      "fuel": {
                        "lt": 66
                      }
                    }
                  },
                  "to": "fuel"
                },
                {
                  "to": "cavalry"
                }
              ],
              "result": "La 2. ID (mot.) se despliega mirando al norte. El avance blindado queda protegido, pero el bosque sigue en manos polacas."
            }
          ]
        },
        "fuel": {
          "id": "fuel",
          "at": 810,
          "urgency": "URGENTE",
          "from": "Qu · XIX. Armeekorps",
          "title": "Los Panzer piden combustible",
          "classification": "SIMULACIÓN LOGÍSTICA",
          "body": [
            "Hartmann entra en el puesto de mando con un parte de la 3. Panzer-Division: la vanguardia está consumiendo más de lo previsto. Los camiones cisterna existen, pero están atascados detrás de la artillería y de la infantería motorizada.",
            "<i>«La división tiene combustible en el sistema logístico, pero no en sus vehículos de cabeza»</i>, resume Hartmann.",
            {
              "if": {
                "flag": "flank_exposed"
              },
              "text": "El bloqueo de Chojnice obliga a los convoyes a dar un rodeo por caminos secundarios."
            }
          ],
          "historical": [
            "La dependencia del combustible y del transporte por carretera fue una limitación constante de las divisiones motorizadas alemanas en 1939."
          ],
          "intel": [
            "El problema no es enemigo: es de tráfico. Ninguna información nueva sobre las fuerzas polacas mientras se resuelve."
          ],
          "choices": [
            {
              "id": "halt_refuel",
              "title": "DETENER LA VANGUARDIA Y REPOSTAR",
              "tag": "LOGÍSTICA",
              "desc": "Dos horas de pausa para que los convoyes alcancen a los Panzer.",
              "effects": {
                "minutes": 120,
                "res": {
                  "fuel": 22,
                  "fatigue": -4,
                  "cohesion": 3
                },
                "formations": {
                  "3pz": {
                    "supply": 12
                  }
                },
                "trust": {
                  "qu": 5
                }
              },
              "next": "cavalry",
              "result": "Los convoyes alcanzan la vanguardia y los Panzer repostan. Has perdido dos horas de luz."
            },
            {
              "id": "siphon",
              "title": "TRASVASAR DE LA INFANTERÍA MOTORIZADA",
              "tag": "SACRIFICIO",
              "desc": "Quitar combustible a los camiones de las divisiones motorizadas para la vanguardia.",
              "effects": {
                "minutes": 45,
                "progress": 4,
                "res": {
                  "fuel": 12,
                  "cohesion": -5
                },
                "formations": {
                  "2mot": {
                    "supply": -15
                  },
                  "20mot": {
                    "supply": -10
                  },
                  "3pz": {
                    "supply": 10
                  }
                },
                "trust": {
                  "qu": -8
                }
              },
              "next": "cavalry",
              "result": "Los Panzer siguen adelante. Detrás, las divisiones motorizadas se quedan con depósitos medio vacíos y Hartmann no oculta su desacuerdo."
            },
            {
              "id": "push_on",
              "title": "CONTINUAR CON LO QUE QUEDA",
              "tag": "APUESTA",
              "desc": "No detenerse: llegar lo más lejos posible antes de que se agote el combustible.",
              "effects": {
                "progress": 12,
                "res": {
                  "fuel": -24,
                  "cohesion": -3
                },
                "flags": [
                  "fuel_gamble"
                ],
                "trust": {
                  "qu": -5
                }
              },
              "next": "cavalry",
              "result": "La vanguardia sigue rodando con los depósitos bajando. Si la apuesta sale mal, la noche encontrará a los Panzer inmóviles."
            }
          ]
        },
        "cavalry": {
          "id": "cavalry",
          "at": 900,
          "urgency": "INFORME DE CONTACTO",
          "from": "Ic · XIX. Armeekorps",
          "title": "Caballería en el flanco",
          "classification": "INFORME INCIERTO + DECISIÓN DEL JUGADOR",
          "body": [
            "Llegan varios partes de la 20. ID (mot.) y de patrullas de reconocimiento: caballería polaca en el sector septentrional, cerca del flanco del cuerpo.",
            {
              "if": {
                "any": [
                  {
                    "all": [
                      {
                        "hidden": {
                          "cavalry": "flanco"
                        }
                      },
                      {
                        "accurate": "cavalry"
                      }
                    ]
                  },
                  {
                    "all": [
                      {
                        "hidden": {
                          "cavalry": "lejos"
                        }
                      },
                      {
                        "inaccurate": "cavalry"
                      }
                    ]
                  }
                ]
              },
              "text": "<b>Valoración del Ic:</b> Weber cree que son elementos de la Brigada de Caballería Pomorska maniobrando para golpear la infantería alemana en marcha."
            },
            {
              "if": {
                "any": [
                  {
                    "all": [
                      {
                        "hidden": {
                          "cavalry": "lejos"
                        }
                      },
                      {
                        "accurate": "cavalry"
                      }
                    ]
                  },
                  {
                    "all": [
                      {
                        "hidden": {
                          "cavalry": "flanco"
                        }
                      },
                      {
                        "inaccurate": "cavalry"
                      }
                    ]
                  }
                ]
              },
              "text": "<b>Valoración del Ic:</b> Weber cree que son patrullas dispersas. Las tropas en marcha tienden a ver un regimiento detrás de cada jinete."
            },
            {
              "if": {
                "flag": "flank_guarded"
              },
              "text": "La 2. ID (mot.) ya está desplegada mirando al norte."
            },
            "El Brda está cada vez más cerca. Cada unidad que mandes al flanco es una unidad que no empuja hacia el río."
          ],
          "historical": [
            "La Brigada de Caballería Pomorska formaba parte de las fuerzas polacas que defendían el Corredor."
          ],
          "intel": [
            "Los informes sobre caballería son fragmentarios y contradictorios. La exactitud de la valoración depende de tu reconocimiento."
          ],
          "choices": [
            {
              "id": "reinforce_flank",
              "title": "REFORZAR EL FLANCO NORTE",
              "tag": "SEGURIDAD",
              "desc": "Enviar anticarros, ametralladoras y vehículos blindados de reconocimiento al sector de la 20. ID (mot.).",
              "effects": {
                "minutes": 60,
                "res": {
                  "ammunition": -3
                },
                "flags": [
                  "flank_guarded"
                ],
                "formations": {
                  "20mot": {
                    "readiness": 3
                  }
                }
              },
              "next": "brda",
              "result": "El flanco recibe refuerzos. Si la amenaza era real, estará preparado; si no, has gastado una hora de luz."
            },
            {
              "id": "push_brda",
              "title": "IGNORAR EL FLANCO Y EMPUJAR AL BRDA",
              "tag": "VELOCIDAD",
              "desc": "La caballería no puede detener un cuerpo motorizado. Todo hacia el río.",
              "requires": {
                "res": {
                  "fuel": {
                    "gte": 20
                  }
                }
              },
              "blockedText": "Sin combustible suficiente para un nuevo salto.",
              "effects": {
                "minutes": 30,
                "progress": 16,
                "res": {
                  "fuel": -6,
                  "fatigue": 4
                },
                "flags": [
                  "pushed_brda"
                ]
              },
              "next": "brda",
              "result": "La vanguardia se lanza hacia el Brda. El flanco queda en manos de lo que ya esté allí."
            },
            {
              "id": "recon_flank",
              "title": "ENVIAR RECONOCIMIENTO AL NORTE",
              "tag": "INFORMACIÓN",
              "desc": "Aclarar la amenaza antes de mover tropas.",
              "effects": {
                "minutes": 90,
                "progress": 4,
                "res": {
                  "reconnaissance": 10
                }
              },
              "outcomes": [
                {
                  "if": {
                    "hidden": {
                      "cavalry": "flanco"
                    }
                  },
                  "effects": {
                    "flags": [
                      "flank_guarded",
                      "flank_scouted"
                    ]
                  },
                  "result": "El reconocimiento localiza escuadrones polacos reuniéndose cerca de Krojanty. Ahora sabes dónde mirar y el flanco puede prepararse."
                },
                {
                  "effects": {
                    "flags": [
                      "flank_scouted"
                    ]
                  },
                  "result": "El reconocimiento solo encuentra patrullas. La amenaza era menor de lo que decían los partes."
                }
              ],
              "next": "brda"
            }
          ]
        },
        "brda": {
          "id": "brda",
          "at": 1050,
          "urgency": "PARTE DE VANGUARDIA",
          "from": "3. Panzer-Division",
          "title": "El río Brda",
          "classification": "HECHO HISTÓRICO + DECISIÓN DEL JUGADOR",
          "onEnter": [
            {
              "if": {
                "res": {
                  "fatigue": {
                    "gte": 30
                  }
                }
              },
              "effects": {
                "res": {
                  "cohesion": -6,
                  "movement": -6
                }
              }
            }
          ],
          "body": [
            {
              "if": {
                "progress": {
                  "gte": 70
                }
              },
              "text": "La vanguardia de la 3. Panzer-Division alcanza el Brda. Al otro lado, posiciones polacas; delante, el agua y los puentes que tal vez sigan en pie."
            },
            {
              "if": {
                "progress": {
                  "lt": 70
                }
              },
              "text": "La vanguardia aún no ha llegado al Brda. Quedan kilómetros de caminos y la luz empieza a caer."
            },
            {
              "if": {
                "res": {
                  "fuel": {
                    "lt": 30
                  }
                }
              },
              "text": "Los depósitos de los Panzer están casi vacíos."
            },
            {
              "if": {
                "res": {
                  "fatigue": {
                    "gte": 30
                  }
                }
              },
              "text": "Las tripulaciones llevan casi veinte horas en marcha. Los errores de conducción y de comunicación se multiplican."
            },
            {
              "if": {
                "clock": {
                  "gte": 1140
                }
              },
              "text": "Ya es de noche. Cualquier operación ahora se hará a oscuras, con unidades cansadas y comunicaciones peores."
            },
            {
              "if": {
                "all": [
                  {
                    "progress": {
                      "gte": 70
                    }
                  },
                  {
                    "accurate": "bridge"
                  },
                  {
                    "hidden": {
                      "bridge": "intacto"
                    }
                  }
                ]
              },
              "text": "<b>Reconocimiento:</b> un puente parece intacto y poco defendido."
            },
            {
              "if": {
                "all": [
                  {
                    "progress": {
                      "gte": 70
                    }
                  },
                  {
                    "inaccurate": "bridge"
                  },
                  {
                    "hidden": {
                      "bridge": "volado"
                    }
                  }
                ]
              },
              "text": "<b>Reconocimiento:</b> un puente parece intacto y poco defendido."
            },
            {
              "if": {
                "all": [
                  {
                    "progress": {
                      "gte": 70
                    }
                  },
                  {
                    "accurate": "bridge"
                  },
                  {
                    "hidden": {
                      "bridge": "volado"
                    }
                  }
                ]
              },
              "text": "<b>Reconocimiento:</b> los puentes de este sector parecen preparados para volar o ya destruidos."
            },
            {
              "if": {
                "all": [
                  {
                    "progress": {
                      "gte": 70
                    }
                  },
                  {
                    "inaccurate": "bridge"
                  },
                  {
                    "hidden": {
                      "bridge": "intacto"
                    }
                  }
                ]
              },
              "text": "<b>Reconocimiento:</b> los puentes de este sector parecen preparados para volar o ya destruidos."
            }
          ],
          "historical": [
            "Según las memorias de Guderian, la 3. Panzer-Division alcanzó el Brda al final del primer día."
          ],
          "intel": [
            "El estado de los puentes del Brda es incierto. Un puente intacto puede volar en el momento en que tus tanques lo pisen."
          ],
          "choices": [
            {
              "id": "force_crossing",
              "title": "FORZAR EL CRUCE AHORA",
              "tag": "INICIATIVA",
              "desc": "Atacar a través del río antes de que los polacos se organicen.",
              "visibleIf": {
                "progress": {
                  "gte": 70
                }
              },
              "requires": {
                "all": [
                  {
                    "res": {
                      "ammunition": {
                        "gte": 40
                      }
                    }
                  },
                  {
                    "res": {
                      "cohesion": {
                        "gte": 45
                      }
                    }
                  }
                ]
              },
              "blockedText": "Munición o cohesión insuficientes para un cruce de río.",
              "effects": {
                "minutes": 120,
                "res": {
                  "fuel": -5,
                  "ammunition": -10,
                  "fatigue": 6
                }
              },
              "outcomes": [
                {
                  "if": {
                    "all": [
                      {
                        "hidden": {
                          "bridge": "intacto"
                        }
                      },
                      {
                        "res": {
                          "reconnaissance": {
                            "gte": 55
                          }
                        }
                      },
                      {
                        "clock": {
                          "lt": 1140
                        }
                      }
                    ]
                  },
                  "effects": {
                    "progress": 15,
                    "losses": {
                      "men": 90,
                      "vehicles": 2
                    },
                    "flags": [
                      "bridgehead"
                    ],
                    "formations": {
                      "3pz": {
                        "position": "Cabeza de puente sobre el Brda"
                      }
                    }
                  },
                  "result": "Un golpe de mano captura el puente antes de que vuele. La 3. Panzer-Division tiene una cabeza de puente al otro lado del Brda."
                },
                {
                  "if": {
                    "hidden": {
                      "bridge": "intacto"
                    }
                  },
                  "effects": {
                    "progress": 8,
                    "losses": {
                      "men": 260,
                      "vehicles": 8
                    },
                    "flags": [
                      "bridgehead_costly"
                    ],
                    "formations": {
                      "3pz": {
                        "readiness": -8,
                        "position": "Cabeza de puente precaria"
                      }
                    }
                  },
                  "result": "El puente vuela cuando la cabeza de la columna ya está encima. Una parte cruza; el resto queda bajo fuego en la orilla. Tienes una cabeza de puente, pagada cara."
                },
                {
                  "if": {
                    "all": [
                      {
                        "res": {
                          "cohesion": {
                            "gte": 60
                          }
                        }
                      },
                      {
                        "res": {
                          "fatigue": {
                            "lt": 35
                          }
                        }
                      }
                    ]
                  },
                  "effects": {
                    "progress": 6,
                    "losses": {
                      "men": 220,
                      "vehicles": 3
                    },
                    "flags": [
                      "bridgehead_small"
                    ],
                    "formations": {
                      "3pz": {
                        "readiness": -6,
                        "position": "Pequeña cabeza de puente"
                      }
                    }
                  },
                  "result": "Sin puentes, la infantería cruza en botes de asalto. Al anochecer hay una pequeña cabeza de puente, pero los blindados siguen en la orilla occidental."
                },
                {
                  "effects": {
                    "losses": {
                      "men": 300,
                      "vehicles": 4
                    },
                    "res": {
                      "cohesion": -10
                    },
                    "formations": {
                      "3pz": {
                        "readiness": -12
                      }
                    }
                  },
                  "result": "El cruce fracasa. Las unidades llegan desordenadas, los botes no están donde deberían y el fuego polaco barre la orilla."
                }
              ],
              "next": "krojanty"
            },
            {
              "id": "hold_bank",
              "title": "ASEGURAR LA ORILLA Y CRUZAR AL ALBA",
              "tag": "CONSOLIDAR",
              "desc": "Dejar que lleguen los convoyes y la artillería. El río seguirá ahí mañana.",
              "visibleIf": {
                "progress": {
                  "gte": 70
                }
              },
              "effects": {
                "minutes": 60,
                "res": {
                  "fatigue": -6,
                  "fuel": 6,
                  "cohesion": 6,
                  "ammunition": 4
                },
                "flags": [
                  "hold_brda"
                ],
                "formations": {
                  "3pz": {
                    "position": "Orilla occidental del Brda"
                  }
                }
              },
              "next": "krojanty",
              "result": "El cuerpo se cierra sobre el río. Los convoyes alcanzan la vanguardia y la artillería se despliega para el cruce del día siguiente."
            },
            {
              "id": "recon_crossings",
              "title": "RECONOCER PUENTES Y VADOS",
              "tag": "INFORMACIÓN",
              "desc": "Explorar la orilla durante la noche para elegir el punto de cruce.",
              "visibleIf": {
                "progress": {
                  "gte": 70
                }
              },
              "effects": {
                "minutes": 90,
                "res": {
                  "reconnaissance": 12,
                  "fatigue": 3
                },
                "flags": [
                  "crossings_scouted"
                ]
              },
              "next": "krojanty",
              "result": "Las patrullas recorren la orilla. Mañana sabrás dónde cruzar, pero los polacos también habrán tenido la noche para prepararse."
            },
            {
              "id": "night_march",
              "title": "MARCHA NOCTURNA HASTA EL RÍO",
              "tag": "VELOCIDAD",
              "desc": "Seguir avanzando de noche para llegar al Brda a cualquier precio.",
              "visibleIf": {
                "progress": {
                  "lt": 70
                }
              },
              "requires": {
                "res": {
                  "fuel": {
                    "gte": 25
                  }
                }
              },
              "blockedText": "No queda combustible para una marcha nocturna.",
              "effects": {
                "minutes": 180,
                "progress": 20,
                "res": {
                  "fatigue": 12,
                  "cohesion": -10,
                  "fuel": -8
                },
                "losses": {
                  "vehicles": 5
                },
                "flags": [
                  "night_march"
                ]
              },
              "next": "krojanty",
              "result": "Las columnas avanzan a oscuras. Hay vehículos en las cunetas y unidades perdidas, pero la vanguardia se acerca al río."
            },
            {
              "id": "halt_night",
              "title": "DETENERSE Y CONSOLIDAR",
              "tag": "CONSOLIDAR",
              "desc": "Aceptar que el Brda no se alcanzará hoy y preparar el día siguiente.",
              "visibleIf": {
                "progress": {
                  "lt": 70
                }
              },
              "effects": {
                "minutes": 30,
                "res": {
                  "fatigue": -8,
                  "cohesion": 6,
                  "fuel": 6
                }
              },
              "next": "krojanty",
              "result": "El cuerpo se detiene. Las tropas descansan y los convoyes alcanzan a la vanguardia, pero el río sigue lejos."
            }
          ]
        },
        "krojanty": {
          "id": "krojanty",
          "at": 1140,
          "urgency": "URGENTE · SECTOR NORTE",
          "from": "20. Infanterie-Division (mot.)",
          "title": "Carga en Krojanty",
          "classification": "HECHO HISTÓRICO + CONSECUENCIA",
          "onEnter": [
            {
              "if": {
                "all": [
                  {
                    "hidden": {
                      "cavalry": "flanco"
                    }
                  },
                  {
                    "noFlag": "flank_guarded"
                  }
                ]
              },
              "effects": {
                "losses": {
                  "men": 150
                },
                "res": {
                  "cohesion": -8
                },
                "flags": [
                  "rear_panic"
                ],
                "formations": {
                  "20mot": {
                    "readiness": -8
                  }
                }
              }
            },
            {
              "if": {
                "all": [
                  {
                    "hidden": {
                      "cavalry": "flanco"
                    }
                  },
                  {
                    "flag": "flank_guarded"
                  }
                ]
              },
              "effects": {
                "losses": {
                  "men": 30
                }
              }
            }
          ],
          "body": [
            "Al anochecer, ulanos polacos cargan contra infantería de la 20. ID (mot.) que descansaba en campo abierto cerca de Krojanty.",
            {
              "if": {
                "all": [
                  {
                    "hidden": {
                      "cavalry": "flanco"
                    }
                  },
                  {
                    "flag": "flank_guarded"
                  }
                ]
              },
              "text": "Esta vez el flanco estaba preparado. Las ametralladoras y los vehículos blindados que enviaste detienen la carga en minutos. Las bajas alemanas son escasas."
            },
            {
              "if": {
                "all": [
                  {
                    "hidden": {
                      "cavalry": "flanco"
                    }
                  },
                  {
                    "noFlag": "flank_guarded"
                  }
                ]
              },
              "text": "<b>La carga dispersa a la infantería.</b> Solo la llegada de vehículos blindados la detiene. En la retaguardia empiezan a circular rumores exagerados de caballería polaca por todas partes."
            },
            {
              "if": {
                "hidden": {
                  "cavalry": "lejos"
                }
              },
              "text": "La acción es local: la caballería choca con elementos de seguridad y se retira. No hay amenaza seria para el cuerpo, pero los rumores corren igualmente."
            }
          ],
          "historical": [
            "Al anochecer del 1 de septiembre de 1939, el 18.º Regimiento de Ulanos de Pomerania cargó contra infantería alemana cerca de Krojanty. La carga fue detenida por vehículos blindados y ametralladoras; el coronel Kazimierz Mastalerz murió en la acción.",
            "La propaganda alemana deformó después este episodio en el mito de la caballería polaca cargando contra tanques."
          ],
          "intel": [
            "Los partes nocturnos del sector norte exageran. Tu Estado Mayor no sabe aún cuánto de lo que se cuenta es cierto."
          ],
          "choices": [
            {
              "id": "go_personally",
              "title": "IR PERSONALMENTE AL SECTOR AMENAZADO",
              "tag": "PRESENCIA",
              "desc": "Presentarte ante los mandos de la 20. ID (mot.) para cortar el pánico.",
              "requires": {
                "res": {
                  "command": {
                    "gte": 2
                  }
                }
              },
              "blockedText": "Capacidad de mando agotada.",
              "effects": {
                "minutes": 120,
                "res": {
                  "command": -2,
                  "cohesion": 8,
                  "fatigue": 5
                },
                "flags": [
                  "general_present"
                ],
                "trust": {
                  "ia": 5
                }
              },
              "next": "evaluation",
              "result": "Recorres el sector de noche. Tu presencia calma a los oficiales y los rumores pierden fuerza, aunque pasas horas lejos del Brda."
            },
            {
              "id": "radio_order",
              "title": "ORDEN POR RADIO: MANTENER POSICIONES",
              "tag": "RED DE MANDO",
              "desc": "Confiar en las comunicaciones y en los mandos de división.",
              "effects": {
                "minutes": 30
              },
              "outcomes": [
                {
                  "if": {
                    "res": {
                      "communications": {
                        "gte": 60
                      }
                    }
                  },
                  "effects": {
                    "res": {
                      "cohesion": 4
                    },
                    "flags": [
                      "general_present"
                    ]
                  },
                  "result": "La orden llega clara y a tiempo. Los mandos de división recuperan el control del sector."
                },
                {
                  "effects": {
                    "res": {
                      "cohesion": -4
                    }
                  },
                  "result": "La orden llega tarde y entrecortada. Cuando por fin se entiende, ya circula otra versión de los hechos."
                }
              ],
              "next": "evaluation"
            },
            {
              "id": "ignore_report",
              "title": "PRIORIDAD AL BRDA",
              "tag": "FOCO",
              "desc": "La caballería no cambia la situación operacional. No distraer al mando.",
              "effects": {
                "res": {
                  "fatigue": -2
                }
              },
              "outcomes": [
                {
                  "if": {
                    "flag": "rear_panic"
                  },
                  "effects": {
                    "res": {
                      "cohesion": -6
                    },
                    "trust": {
                      "ia": -6
                    }
                  },
                  "result": "Keller no oculta su inquietud. Sin una mano firme, la alarma en el flanco norte crece durante la noche."
                },
                {
                  "result": "El sector norte se calma por sí solo. Mantienes la atención donde importa."
                }
              ],
              "next": "evaluation"
            }
          ]
        },
        "evaluation": {
          "id": "evaluation",
          "at": 1320,
          "ending": true,
          "urgency": "FIN DE JORNADA",
          "from": "Estado Mayor del XIX. Armeekorps",
          "title": "Balance del 1 de septiembre",
          "classification": "RESULTADO DEL JUGADOR + COMPARACIÓN HISTÓRICA",
          "body": [
            "La noche cae sobre Pomerania. Tu Estado Mayor prepara el balance para la 4. Armee: no basta con medir kilómetros. Importa qué divisiones siguen cohesionadas, cuánto combustible queda en vanguardia y cuántos hombres ha costado.",
            {
              "if": {
                "flag": "bridgehead"
              },
              "text": "Al otro lado del Brda, la 3. Panzer-Division mantiene su cabeza de puente."
            },
            {
              "if": {
                "flag": "ambushed"
              },
              "text": "En los bosques de Tuchola, la 2. ID (mot.) recoge a sus muertos de la emboscada."
            },
            {
              "if": {
                "flag": "chojnice_failed"
              },
              "text": "Chojnice sigue en manos polacas."
            }
          ],
          "historical": [],
          "intel": [
            "El balance de la jornada se basa en partes que aún llegan. Algunas cifras de bajas se corregirán mañana."
          ],
          "choices": []
        },
        "collapse": {
          "id": "collapse",
          "ending": true,
          "urgency": "SITUACIÓN CRÍTICA",
          "from": "Ia · XIX. Armeekorps",
          "title": "El cuerpo se desarticula",
          "classification": "RESULTADO DEL JUGADOR",
          "verdict": {
            "title": "CUERPO DESARTICULADO",
            "text": "Las divisiones han perdido el enlace entre sí. Columnas mezcladas, órdenes contradictorias y unidades que no saben dónde está su mando. La 4. Armee detiene tu avance para reorganizar el cuerpo."
          },
          "body": [
            "Keller pone sobre la mesa los partes de la última hora: ninguna de las tres divisiones está donde el mapa dice. La cohesión del cuerpo se ha roto antes de alcanzar el objetivo."
          ],
          "historical": [],
          "intel": [
            "Ya no hay imagen de conjunto: solo partes sueltos de unidades aisladas."
          ],
          "choices": []
        },
        "stalled": {
          "id": "stalled",
          "ending": true,
          "urgency": "SITUACIÓN CRÍTICA",
          "from": "Qu · XIX. Armeekorps",
          "title": "Panzer sin combustible",
          "classification": "RESULTADO DEL JUGADOR",
          "verdict": {
            "title": "VANGUARDIA INMÓVIL",
            "text": "La 3. Panzer-Division se ha quedado sin combustible en plena marcha. Los blindados esperan a los convoyes como blancos fijos y el avance del cuerpo se detiene."
          },
          "body": [
            "Hartmann no necesita decir nada: el mapa muestra a la vanguardia detenida y a los camiones cisterna a decenas de kilómetros, atrapados en el tráfico."
          ],
          "historical": [],
          "intel": [
            "Sin movimiento no hay reconocimiento. La imagen del enemigo envejece hora a hora."
          ],
          "choices": []
        }
      },
      "sources": [
        {
          "short": "USHMM · Invasión de Polonia",
          "title": "Invasión de Polonia, otoño de 1939",
          "publisher": "United States Holocaust Memorial Museum",
          "url": "https://encyclopedia.ushmm.org/content/es/article/invasion-of-poland-fall-1939"
        },
        {
          "short": "U.S. military study",
          "title": "The German Campaign in Poland, September 1939",
          "publisher": "Historical study preserved by HyperWar/ibiblio",
          "url": "https://www.ibiblio.org/hyperwar/NHC/NewPDFs/GERMANY/GER%20German%20Campaign%20in%20Poland%20September%201939%2C%20Sept%201%20to%20Oct.%205.pdf"
        },
        {
          "short": "German Army OOB · 1 Sep 1939",
          "title": "German Army, 1 September 1939",
          "publisher": "General Staff / Nafziger Collection",
          "url": "https://www.generalstaff.org/NAF/Pt_I_1939-1940/939giaa.pdf"
        },
        {
          "short": "USMA map · Poland 1939",
          "title": "German plan of invasion of Poland, August 1939",
          "publisher": "United States Military Academy via Wikimedia Commons",
          "url": "https://commons.wikimedia.org/wiki/File:Poland1939_GermanPlanMap.jpg"
        },
        {
          "short": "Bundesarchiv · Panzer I",
          "title": "Polen, Panzer I und Infanterie",
          "publisher": "Bundesarchiv via Wikimedia Commons · CC BY-SA 3.0 DE",
          "url": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_101I-012-0035-11A,_Polen,_Panzer_I_und_Infanterie.jpg"
        },
        {
          "short": "Bundesarchiv · Stabsoffiziere",
          "title": "Warschau, Generale v. Weichs, Blaskowitz",
          "publisher": "Bundesarchiv via Wikimedia Commons · CC BY-SA 3.0 DE",
          "url": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_101I-001-0256-31,_Warschau,_Generale_v._Weichs,_Blaskowitz.jpg"
        }
      ],
      "id": "ch1"
    }
  }
};
