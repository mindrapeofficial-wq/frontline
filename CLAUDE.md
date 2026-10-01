# CLAUDE.md — FRONTLINE 1944

> Documento maestro de diseño y desarrollo.
> Claude debe leer este archivo completo antes de modificar el proyecto.
> Este archivo actúa como fuente de verdad del producto mientras no exista una instrucción posterior y explícita del propietario del proyecto que lo sustituya.

---

# 1. IDENTIDAD DEL PROYECTO

**Nombre:** FRONTLINE 1944  
**Tipo:** juego de estrategia narrativa histórica para navegador.  
**Periodo:** Segunda Guerra Mundial, con recorrido cronológico desde la preguerra inmediata y las primeras campañas alemanas hasta 1944-45.  
**Perspectiva principal:** mando militar alemán, especialmente Heer, desde puestos de mando y no desde una cámara omnisciente.

FRONTLINE 1944 no debe sentirse como un RTS tradicional, un juego de construir bases ni un clon de Supremacy / Call of War.

La fantasía central del jugador es:

> **Interpretar información incompleta, ejercer mando y asumir las consecuencias.**

El jugador no debe ganar por hacer clic más rápido. Debe ganar o perder por comprender la situación, priorizar, coordinar, arriesgar, conservar recursos y emitir órdenes mejores que las alternativas disponibles.

---

# 2. PILARES NO NEGOCIABLES

## 2.1 Realismo histórico extremo

El juego debe buscar una fidelidad histórica alta en:

- fechas;
- unidades;
- mandos;
- organización militar;
- armamento;
- munición;
- movilidad;
- comunicaciones;
- logística;
- terreno;
- clima;
- doctrina;
- tiempos de marcha;
- disponibilidad de vehículos;
- desgaste;
- averías;
- combustible;
- bajas;
- capacidad de reemplazo;
- órdenes de batalla;
- objetivos operacionales.

No introducir equipamiento, formaciones o capacidades anacrónicas solo por comodidad jugable.

Cuando el dato histórico sea incierto, debe representarse como estimación, rango o reconstrucción, no como certeza falsa.

## 2.2 Profundidad táctica y operacional

Las decisiones deben producir efectos sistémicos y diferidos.

Ejemplos:

- avanzar más deprisa puede romper la cohesión;
- concentrar blindados puede dejar flancos peor cubiertos;
- una pausa puede perder tiempo pero recuperar combustible, munición y mantenimiento;
- una orden perfecta puede llegar demasiado tarde;
- una unidad intacta puede quedar neutralizada por falta de combustible;
- una línea defensiva puede ser fuerte tácticamente pero imposible de abastecer;
- reconocimiento mejor no significa información perfecta;
- el terreno debe modificar movilidad, visibilidad, combate y logística.

## 2.3 Información imperfecta

El jugador nunca debe tener una visión divina del campo de batalla.

La información debe llegar mediante:

- partes;
- radio;
- mensajeros;
- reconocimiento;
- mapas;
- fotografías;
- informes del Estado Mayor;
- unidades subordinadas;
- inteligencia incompleta o desactualizada.

Los informes pueden:

- llegar con retraso;
- ser contradictorios;
- quedar obsoletos;
- exagerar;
- omitir pérdidas;
- identificar mal fuerzas enemigas.

La incertidumbre es una mecánica, no un elemento decorativo.

## 2.4 Perspectiva limitada del mando

El jugador controla lo que razonablemente podría controlar un comandante de su nivel.

No debe micromanejar cada soldado.

La cadena aproximada de representación jugable es:

- grupo de ejércitos / ejército en escenarios estratégicos;
- cuerpo;
- división;
- regimiento;
- batallón cuando la profundidad del escenario lo requiera.

El nivel de detalle debe depender del rango y escenario.

## 2.5 Consecuencias persistentes

Las decisiones anteriores deben afectar escenas y operaciones posteriores.

Persistir, según el modo:

- combustible;
- munición;
- bajas;
- fatiga;
- cohesión;
- moral;
- confianza de subordinados;
- estado de comunicaciones;
- material perdido;
- reputación de mando;
- información conocida;
- objetivos cumplidos o fallidos.

No reiniciar mágicamente las fuerzas entre escenas salvo que el salto temporal o refuerzos históricos lo justifiquen.

---

# 3. REPARTO DE LA EXPERIENCIA

Referencia de diseño:

- **70 % narrativa + simulación de mando**
- **20 % interfaz estratégica + mapas**
- **10 % material visual histórico**

Esto no significa porcentajes rígidos de pantalla, sino prioridad de diseño.

FRONTLINE 1944 debe sentirse como estar dentro de un **puesto de mando vivo**, no como observar unidades bonitas moverse sobre un mapa.

El mapa sirve para pensar.

Los documentos sirven para entender.

Las decisiones sirven para mandar.

---

# 4. ESTRUCTURA GENERAL DEL JUEGO

El proyecto puede contener dos experiencias compatibles, sin convertirlas en el mismo sistema.

## 4.1 Campaña histórica narrativa

Es el modo principal para recorrer cronológicamente la historia.

El jugador asume un puesto de mando alemán y atraviesa operaciones históricas mediante:

1. dossier;
2. situación;
3. información disponible;
4. consultas al Estado Mayor;
5. órdenes;
6. paso del tiempo;
7. consecuencias;
8. nuevos informes;
9. evaluación;
10. continuidad hacia la siguiente fase.

### Cronología base

La progresión prevista es:

0. **1938 — Reorganización / preparación militar**  
   Prólogo histórico previo a la guerra. Debe introducir estructura militar, rearme, organización, doctrina, tensiones de mando y preparación operativa.

1. **1939 — FALL WEISS / Polonia**
2. **1940 — WESERÜBUNG / Dinamarca y Noruega**
3. **1940 — FALL GELB / Francia y Países Bajos**
4. **1941 — BARBAROSSA / Unión Soviética**
5. **1942 — Frente Oriental / profundidad y desgaste**
6. **1943 — pérdida de iniciativa / defensa y retirada**
7. **1944 — FRONTLINE 1944 / Normandía y colapso progresivo del frente**
8. **1944-45 — fases finales cuando corresponda**

El contenido debe avanzar por capítulos y subcapítulos fechados.

### Estado actual de prototipo

El repositorio ya contiene una versión jugable de **FALL WEISS** centrada en Heinz Guderian y el XIX. Armeekorps (mot.).

No destruir ese trabajo.

La campaña de 1938 se añade como prólogo anterior, salvo orden posterior del propietario.

## 4.2 Modo de frente multijugador

La visión multijugador NO consiste en controlar países completos.

Cada jugador controla una fuerza, formación o responsabilidad dentro de un frente compartido.

Principios:

- línea de frente dinámica;
- cadena de mando real entre jugadores;
- unidades organizadas por formaciones;
- logística compartida;
- información imperfecta;
- objetivos operacionales;
- comunicación y coordinación humana;
- resultado emergente.

### Referencia de escala

Objetivo de diseño: **hasta 100 jugadores** en un gran escenario.

Referencia inicial para Normandía:

- 50 comandantes por bando;
- sectores asignados;
- jerarquía de mando;
- responsabilidades diferentes según rango;
- mapa operacional compartido;
- información distinta para cada jugador.

Un comandante superior no debe poseer automáticamente toda la información de sus subordinados.

La comunicación debe importar.

---

# 5. LO QUE FRONTLINE 1944 NO ES

Claude no debe derivar el proyecto hacia:

- RTS de acción rápida;
- construcción de bases;
- producción masiva arcade;
- mapa global de conquista estilo grand strategy genérica;
- control de un país entero como núcleo jugable;
- combate resuelto por barras simplistas sin contexto;
- unidades que obedecen de forma instantánea a cualquier distancia;
- visión total del enemigo;
- iconos moviéndose sin narrativa ni contexto;
- espectáculo gráfico por encima de la simulación;
- juego puramente textual sin mapa, datos o sistemas;
- colección superficial de fotografías históricas;
- propaganda política.

El jugador debe sentirse comandante, no administrador de una nación ni operador de un tablero arcade.

---

# 6. SISTEMAS DE MANDO

Las órdenes son el corazón del juego.

Cada orden debería poder definir, según contexto:

- unidad destinataria;
- objetivo;
- eje;
- prioridad;
- tiempo;
- postura;
- nivel de riesgo;
- apoyo requerido;
- condiciones de cancelación;
- reserva;
- logística asociada.

Una orden no equivale a un resultado.

Entre orden y resultado deben existir:

- tiempo de transmisión;
- recepción;
- interpretación;
- ejecución;
- fricción;
- reacción enemiga;
- terreno;
- clima;
- moral;
- disponibilidad real;
- comunicaciones;
- capacidad logística.

---

# 7. CADENA DE MANDO

La cadena de mando debe ser visible y jugable.

Cada formación puede tener:

- comandante;
- subordinados;
- unidad superior;
- misión;
- estado;
- posición;
- capacidad de comunicación;
- confianza;
- autonomía;
- último informe.

En multijugador, la estructura de mando debe permitir que varios jugadores dependan unos de otros.

No convertir a todos los jugadores en generales omnipotentes equivalentes.

Diferentes rangos deben implicar diferente:

- escala;
- información;
- capacidad de ordenar;
- responsabilidad;
- presión temporal.

---

# 8. LOGÍSTICA

La logística debe ser una de las mecánicas decisivas del juego.

Modelar progresivamente:

- combustible;
- munición;
- alimentos cuando sea relevante;
- repuestos;
- recuperación de vehículos;
- mantenimiento;
- transporte;
- carreteras;
- ferrocarril;
- puentes;
- depósitos;
- distancia a retaguardia;
- congestión;
- capacidad de los convoyes;
- interdicción;
- pérdidas de transporte.

La logística no debe ser una barra abstracta que simplemente baja.

Debe tener una causa comprensible y consecuencias operacionales.

Ejemplo:

> La división tiene combustible en el sistema logístico, pero no necesariamente en sus vehículos de vanguardia.

---

# 9. COMBATE

El combate debe resolverse mediante una simulación suficientemente profunda para producir resultados plausibles.

Variables posibles:

- fuerza efectiva;
- organización;
- moral;
- experiencia;
- fatiga;
- armamento;
- munición;
- apoyo artillero;
- blindaje;
- penetración;
- distancia;
- terreno;
- fortificación;
- visibilidad;
- clima;
- sorpresa;
- reconocimiento;
- comunicaciones;
- flancos;
- reservas;
- logística;
- liderazgo.

No usar una única estadística de "poder" como sistema principal.

Las pérdidas deben distinguir, cuando el nivel de detalle lo permita:

- muertos;
- heridos;
- desaparecidos;
- prisioneros;
- vehículos destruidos;
- vehículos averiados;
- material recuperable;
- material abandonado.

---

# 10. UNIDADES Y ARMAMENTO

Las unidades deben basarse en organizaciones históricas documentadas.

La base de datos futura debe poder representar:

- hombres;
- armas individuales;
- ametralladoras;
- morteros;
- artillería;
- cañones anticarro;
- blindados;
- vehículos;
- transporte;
- radios;
- munición;
- combustible.

No crear un "tanque alemán genérico" si el contexto permite identificar el modelo real.

Las armas y vehículos deben tener propiedades históricamente razonables, no estadísticas fantasiosas.

---

# 11. TERRENO, CLIMA Y MOVIMIENTO

El mapa no es un fondo.

Debe influir en:

- velocidad;
- visibilidad;
- detección;
- combate;
- abastecimiento;
- congestión;
- fatiga;
- consumo;
- posibilidad de maniobra.

Tipos relevantes:

- carretera;
- camino;
- bosque;
- campo abierto;
- ciudad;
- pueblo;
- río;
- puente;
- colina;
- costa;
- terreno embarrado;
- nieve;
- posiciones fortificadas.

Los ríos y puentes deben poder convertirse en problemas operacionales reales.

---

# 12. MAPA

## 12.1 Campaña narrativa

Usar mapas 2D claros, preferentemente SVG u otra solución web eficiente.

El mapa debe mostrar solo lo que el comandante conoce razonablemente.

Capas posibles:

- fuerzas propias;
- contactos enemigos confirmados;
- contactos estimados;
- objetivos;
- líneas de fase;
- ejes de avance;
- rutas logísticas;
- puentes;
- terreno;
- alcance de comunicaciones;
- informes recientes.

## 12.2 Multijugador 100 jugadores

La referencia inicial es un teatro de Normandía dividido en sectores operacionales.

Se puede utilizar una estructura de hexágonos o sectores equivalentes si mejora la simulación.

Debe existir como mínimo:

- capa estratégica;
- capa operacional;
- vista de formación;
- informes de batalla.

No llenar el mapa con cientos de iconos minúsculos sin jerarquía.

---

# 13. INTERFAZ

La interfaz debe evocar un **puesto de mando militar histórico** sin sacrificar claridad moderna.

Composición conceptual:

### Zona central
- mapa;
- documento principal;
- informe activo;
- decisión actual.

### Lateral izquierdo
- cadena de mando;
- unidades;
- Estado Mayor;
- navegación contextual.

### Lateral derecho
- inteligencia;
- mensajes;
- situación;
- alertas;
- incertidumbre.

### Parte inferior
- órdenes;
- logística;
- recursos;
- controles de tiempo cuando proceda.

Elementos visuales:

- documentos;
- mapas;
- telegramas;
- fotografías;
- fichas;
- sellos;
- tipografía inspirada en material militar de época;
- animaciones mínimas y funcionales.

Evitar efectos visuales que hagan parecer el juego un shooter, un RTS moderno o una interfaz de ciencia ficción.

La interfaz debe permanecer centrada, equilibrada y usable en diferentes resoluciones.

---

# 14. LOGO E IDENTIDAD VISUAL

El archivo actual **logo-official.svg** es el logo oficial del proyecto.

Reglas:

- usar el logo oficial en los lugares donde corresponda;
- no sustituirlo por un logo temporal;
- no rediseñarlo sin una orden explícita;
- mantener proporciones correctas;
- no deformarlo;
- cuidar centrado y espaciado;
- mantener consistencia entre login, portada y juego.

---

# 15. MATERIAL HISTÓRICO VISUAL

Las fotografías y mapas históricos deben formar parte del diseño jugable.

No usarlos como simple decoración.

Cada recurso debería poder cumplir una función como:

- dossier;
- escena;
- informe;
- transición;
- ficha de unidad;
- reconocimiento;
- documento;
- evento;
- comparación;
- contexto geográfico.

### Campaña 1938

Existe la intención de disponer de **al menos 50 recursos históricos** para la campaña/prólogo de 1938.

Deben integrarse progresivamente como contenido, no como una galería aislada.

Mantener:

- autor;
- institución;
- fecha cuando se conozca;
- licencia;
- URL de origen;
- descripción;
- contexto.

---

# 16. USO DE SÍMBOLOS Y MATERIAL DE LA ALEMANIA NAZI

El juego representa un periodo histórico desde la perspectiva de mandos alemanes.

Los símbolos, uniformes, documentos, fotografías y figuras políticas de la Alemania nazi pueden aparecer cuando tengan una función histórica, documental o narrativa.

Reglas:

- no convertir el juego en propaganda;
- no glorificar ideología, crímenes ni persecución;
- no borrar contexto histórico relevante;
- diferenciar documentación histórica de ficción;
- usar el material como elemento de ambientación y comprensión del periodo.

La perspectiva del personaje no implica que el juego adopte su ideología.

---

# 17. HECHO HISTÓRICO, RECONSTRUCCIÓN Y UCRONÍA

Toda escena importante debe distinguir conceptualmente tres capas:

### HECHO HISTÓRICO
Datos documentados.

### RECONSTRUCCIÓN NARRATIVA
Diálogos, detalles y escenas plausibles creados para dar continuidad cuando no existe registro literal.

### DIVERGENCIA DEL JUGADOR
Consecuencias que se separan de la historia real por decisiones tomadas durante la partida.

No presentar una reconstrucción inventada como una cita o hecho real.

Los personajes ficticios deben estar marcados como ficticios.

### Compatibilidad con la inmersión (ver §32.6)

Las tres capas son obligatorias **en los datos** y en el archivo documental, pero no tienen por qué etiquetarse en cada parte o telegrama que lee el jugador durante la partida:

- todo contenido en `data.js` y futuros generadores debe indicar internamente su capa (hecho, reconstrucción, divergencia);
- los bloques `historical` existentes, la enciclopedia, el archivo de fuentes y la crónica final sí muestran la distinción;
- un parte en la escena puede llegar sin sello de "histórico" o "alternativo" cuando la inmersión lo pida;
- nunca se atribuye una cita inventada a una persona real ni se presenta una divergencia como hecho documentado en el archivo, la enciclopedia o la crónica final.

---

# 18. FUENTES

El juego debe mantener archivo de fuentes.

Priorizar:

- archivos militares;
- museos;
- Bundesarchiv;
- USHMM;
- documentación gubernamental;
- estudios históricos militares;
- bibliografía académica;
- Wikimedia Commons cuando sea el repositorio de una fuente identificada.

Las fuentes deben poder vincularse a:

- capítulos;
- unidades;
- fechas;
- imágenes;
- afirmaciones concretas.

No copiar afirmaciones dudosas de páginas sin trazabilidad.

---

# 19. CAMPAÑA FALL WEISS EXISTENTE

La versión actual incluye como protagonista histórico:

**General der Panzertruppe Heinz Guderian**  
**XIX. Armeekorps (mot.) · 4. Armee · Heeresgruppe Nord**

Formaciones principales ya representadas:

- 3. Panzer-Division;
- 2. Infanterie-Division (mot.);
- 20. Infanterie-Division (mot.).

Recursos actualmente modelados:

- mando;
- comunicaciones;
- combustible;
- munición;
- ritmo de marcha;
- cohesión;
- reconocimiento;
- fatiga.

Mantener y profundizar estos sistemas.

Siguientes materias previstas para FALL WEISS:

- bosques de Tuchola;
- cierre del Corredor Polaco;
- cruces del Brda y Vístula;
- pérdidas;
- averías;
- combustible;
- retrasos de radio;
- órdenes de división y regimiento;
- consecuencias diferidas.

---

# 20. ESTADO MAYOR

El Estado Mayor debe funcionar como interfaz humana de los sistemas.

Los oficiales pueden:

- aconsejar;
- discrepar;
- interpretar datos;
- advertir riesgos;
- equivocarse;
- ganar o perder confianza.

Los personajes históricos deben ser exactos.

Los personajes creados para el juego deben indicar que son ficticios.

La confianza del Estado Mayor puede ser una variable persistente, pero nunca debe reemplazar la lógica militar real.

---

# 21. RECURSOS PRINCIPALES DE SIMULACIÓN

Mantener como mínimo:

- mando;
- comunicaciones;
- combustible;
- munición;
- movimiento / capacidad de marcha;
- cohesión;
- reconocimiento;
- fatiga.

Ampliaciones recomendadas cuando el sistema madure:

- moral;
- mantenimiento;
- reemplazos;
- transporte;
- capacidad de reparación;
- presión de mando;
- disponibilidad de artillería;
- reservas;
- inteligencia;
- clima;
- control de carreteras.

No añadir veinte barras a la interfaz si el jugador no puede comprender la relación entre ellas.

La profundidad debe estar en el sistema, no en el ruido visual.

---

# 22. TIEMPO

El tiempo es un recurso.

Toda acción debe poder consumir:

- minutos;
- horas;
- días;
- ventanas operacionales.

Una pausa logística puede ser la decisión correcta aunque entregue iniciativa.

Un ataque rápido puede llegar antes pero peor preparado.

El reloj histórico debe reaccionar a las decisiones.

---

# 23. DISEÑO DE DECISIONES

Evitar decisiones falsas de tipo:

- opción buena;
- opción mala;
- opción obviamente absurda.

Las mejores decisiones deben presentar intercambios reales.

Ejemplo:

- velocidad frente a cohesión;
- seguridad frente a iniciativa;
- reconocimiento frente a tiempo;
- concentración frente a cobertura;
- avance frente a reabastecimiento.

El juego debe poder castigar una decisión razonable por información incorrecta o circunstancias imprevistas, siempre que el resultado sea explicable.

---

# 24. SESIONES Y RITMO

Aunque la simulación sea profunda, el jugador debe poder entrar y comprender rápidamente:

- qué está ocurriendo;
- qué debe decidir;
- qué está en riesgo;
- qué información falta.

No obligar a navegar diez pantallas para emitir una orden sencilla.

Profundidad no equivale a fricción de interfaz.

---

# 25. AUTENTICACIÓN Y USUARIOS

El prototipo actual incluye:

- usuario;
- contraseña;
- registro;
- persistencia local.

Actualmente es una solución de prototipo en navegador.

Para producción:

- reemplazar por backend real;
- no almacenar contraseñas de forma insegura;
- persistir campaña y perfil en servidor;
- preparar arquitectura para multijugador.

No romper el acceso local funcional antes de que exista una alternativa real y probada.

---

# 26. ARQUITECTURA DE SOFTWARE

Estado actual:

- HTML;
- CSS;
- JavaScript;
- datos de campaña separados en `data.js`;
- motor narrativo en `engine.js` (condiciones, efectos, reloj, verdad oculta, fiabilidad de informes, fracasos y evaluación), sin acceso al DOM;
- interfaz en `app.js`, que solo lee el estado y llama al motor;
- aplicación web estática.

Formato de escenas en `data.js` para campañas con `"engine": true` en `FRONTLINE_DATA.campaigns` (hoy, `ch1` · FALL WEISS); el prólogo `ch0` mantiene el formato lineal anterior:

- `at`: hora mínima de la escena en minutos desde las 00:00 del 1 SEP 1939;
- `body`, `intel`, `historical`: listas de texto; cada elemento puede ser `{if:{...}, text:"..."}`;
- `onEnter`: efectos que se aplican una sola vez al entrar;
- `choices[]`: `effects`, `outcomes` (primer desenlace cuyas condiciones se cumplan), `requires` + `blockedText`, `visibleIf`, `next` (texto o lista `{if, to}`);
- condiciones: `flag`, `noFlag`, `res`, `hidden`, `progress`, `clock`, `losses`, `accurate`/`inaccurate` (informe exacto según el reconocimiento), `all`, `any`, `not`;
- `hidden` del capítulo: verdad del escenario sorteada al empezar cada partida;
- `failures` del capítulo: condiciones que terminan la jornada antes de tiempo;
- `evaluation` del capítulo: criterios puntuados, veredictos y comparación histórica.
- `skipIf` de escena: si se cumple al llegar, la escena se salta y se sigue su `next` (p. ej. Chojnice ya tomada en un turno);
- condición `unit`: posición de una división en su eje (`{unit:{"2mot":{gte:35}}}`).

Mapa y turnos (campo `map` de la campaña):

- croquis esquemático en SVG, no a escala; no presentarlo como cartografía exacta;
- `units` y `routes`: cada división avanza por su eje en unidades de avance; la 3. Panzer-Division usa `progress` (el Brda está en 70);
- `enemies`: fuerzas polacas ocultas en el eje (`route`, `u`) o fuera de él (`placeBy`); bloquean el avance hasta ser despejadas (`clearedBy`, `onClear`) o rodeadas (`bypassBy`); `scripted` bloquea y deja la resolución a una escena;
- entre dos partes con 45 min o más de diferencia hay un turno: el jugador da a cada división AVANZAR, ATACAR, RECONOCER, MANTENER o REABASTECER;
- una orden puede no llegar y una división puede no informar (comunicaciones y posición del puesto de mando); el mapa muestra la última posición comunicada;
- los contactos se detectan según el reconocimiento: confirmados o estimados, y pueden estar mal identificados;
- `turnsFrom`: no hay turnos antes de la hora del ataque.

Principios técnicos:

1. Preferir arquitectura data-driven.
2. Separar contenido histórico de lógica de interfaz.
3. Separar simulación de presentación.
4. No hardcodear cada escena dentro de funciones gigantes si puede vivir como datos.
5. Mantener módulos comprensibles.
6. Evitar dependencias pesadas sin necesidad real.
7. La web debe cargar rápido.
8. Mantener accesibilidad básica.
9. Mantener responsive design.
10. Preservar compatibilidad del prototipo mientras se evoluciona.

Cuando el multiplayer lo requiera, migrar los sistemas necesarios a backend sin reescribir innecesariamente toda la experiencia narrativa.

---

# 27. REGLAS DE TRABAJO PARA CLAUDE

Antes de modificar código:

1. leer este archivo (y `claude2` si la tarea toca narrativa, persistencia o finales);
2. inspeccionar el repositorio;
3. entender la implementación existente;
4. identificar qué archivos afecta la tarea;
5. conservar funcionalidades que ya funcionan.

Durante una tarea:

- implementar, no limitarse a describir;
- evitar placeholders cuando puede hacerse una versión funcional;
- no borrar sistemas existentes para simplificar;
- no cambiar la dirección artística por iniciativa propia;
- no sustituir el logo;
- no alterar hechos históricos sin comprobarlos;
- no inventar unidades o datos históricos como si fueran reales;
- reutilizar componentes y datos existentes;
- mantener el proyecto ejecutable;
- no introducir secretos o claves en el repositorio.

Después de una tarea:

- verificar que la web carga;
- comprobar errores de consola si es posible;
- probar navegación principal;
- probar al menos el flujo modificado;
- revisar responsive;
- revisar que no se rompió login;
- revisar que el logo sigue correcto;
- actualizar documentación cuando el cambio sea estructural.

Si una instrucción nueva del propietario contradice este archivo:

> prevalece la instrucción nueva y explícita.

Después, actualizar CLAUDE.md para que la nueva decisión quede registrada.

---

# 28. REGLA DE CALIDAD

No confundir "más contenido" con "más profundidad".

Cada sistema nuevo debe responder a una pregunta:

> ¿Hace que el jugador tenga que pensar más como un comandante real?

Si la respuesta es no, reconsiderarlo.

---

# 29. ORDEN DE PRIORIDAD DEL DESARROLLO

## Prioridad 1 — Consolidar la experiencia narrativa

- añadir prólogo/campaña 1938;
- integrar recursos históricos;
- mejorar presentación del puesto de mando;
- profundizar FALL WEISS;
- añadir consecuencias persistentes;
- mejorar informes y retrasos;
- ampliar logística y unidades.

## Prioridad 2 — Motor de simulación

- formaciones;
- órdenes;
- tiempo;
- logística;
- combate;
- terreno;
- clima;
- reconocimiento;
- comunicaciones;
- bajas;
- mantenimiento.

## Prioridad 3 — Mapa operacional

- capas;
- sectores;
- líneas;
- objetivos;
- rutas;
- inteligencia imperfecta;
- historial de cambios.

## Prioridad 4 — Backend y persistencia

- cuentas reales;
- partidas;
- perfiles;
- estado de campaña;
- API;
- seguridad.

## Prioridad 5 — Multijugador de frente

- jerarquías;
- 100 jugadores;
- 50 por bando como referencia para Normandía;
- comunicación;
- permisos por rango;
- sincronización;
- niebla de guerra por jugador;
- logística compartida.

No construir infraestructura multijugador compleja antes de que el bucle de mando sea divertido y sólido.

---

# 30. PRÓXIMO OBJETIVO FUNCIONAL

A falta de una instrucción más reciente, Claude debe considerar como siguiente dirección general:

1. preservar la versión actual de FALL WEISS;
2. incorporar el prólogo de **1938 — reorganización militar**;
3. diseñarlo con el mismo estándar de decisiones y simulación;
4. integrar los recursos históricos como elementos jugables;
5. mejorar la interfaz para que parezca un puesto de mando;
6. preparar los datos y componentes para que futuras campañas reutilicen el sistema;
7. no intentar convertir todavía el prototipo en un RTS.

---

# 31. MANTRA DEL PROYECTO

**FRONTLINE 1944 no trata de mover fichas.**

Trata de recibir un informe incompleto a las 05:20, mirar un mapa que quizá ya esté desactualizado, comprobar que una división está perdiendo combustible, escuchar a dos oficiales que recomiendan cosas opuestas y decidir si ordenar el avance antes de que la oportunidad desaparezca.

Ese es el juego.

---

# 32. NARRATIVA PERSISTENTE, CRÓNICA E HISTORIA EMERGENTE

> Resumen normativo de `claude2`. El archivo `claude2` sigue siendo el documento ampliado de diseño narrativo; leerlo antes de cambios estructurales en narrativa, persistencia o finales. Si ambos discrepan, prevalece este CLAUDE.md.

## 32.1 Principio rector

> **No juegas una historia. Generas una crónica militar única dentro de una Segunda Guerra Mundial que recuerda todo lo que haces.**

El juego empieza casi documental (1938) y puede separarse de la historia real solo mediante cadenas de causalidad. Nunca mediante un botón de "cambiar la historia".

## 32.2 Motor conceptual: CAUSE → CONSEQUENCE → MEMORY → STORY

1. **CAUSE** — el jugador da una orden.
2. **CONSEQUENCE** — la simulación calcula qué ocurre realmente.
3. **MEMORY** — la crónica registra qué, cuándo, dónde, quién, por qué, qué sabe cada actor y qué queda abierto.
4. **STORY** — el motor narrativo convierte eso en informes, problemas, oportunidades y personajes.

Flujo obligatorio:

ORDEN → SIMULACIÓN → WORLD STATE → WORLD CHRONICLE → FILTRO DE CONOCIMIENTO → INTERPRETACIÓN NARRATIVA → INFORME AL JUGADOR → CONSECUENCIAS FUTURAS

**La narrativa nunca sobrescribe la simulación.** Ningún texto puede afirmar un resultado que contradiga el estado real del mundo.

## 32.3 WORLD CHRONICLE y WORLD STATE

- Debe existir un registro estructurado de acontecimientos (órdenes, pérdidas, unidades salvadas o destruidas, oficiales, ciudades, puentes, logística, inteligencia errónea, desobediencias, relaciones de mando).
- Cada entrada debe ser un dato (fecha de juego, actores, lugar, causa, consecuencias abiertas, quién lo sabe), no solo una frase.
- Cada campaña es una ventana sobre un estado del mundo persistente. Un puente destruido en 1939 no reaparece intacto en 1940 sin una causa (reparación, tiempo, ingenieros).
- Implementación progresiva: empezar por lo que ya persiste en el estado de partida (recursos, flags, pérdidas) y extenderlo; no construir un sistema genérico vacío sin contenido que lo use.

## 32.4 Decisiones orgánicas

- Prohibidas las decisiones de destino ("¿Atacas Moscú? Sí / No").
- Las grandes consecuencias nacen de decisiones militares concretas: reparto de combustible, prioridad de una carretera, momento de una pausa, a quién se escucha en el Estado Mayor.
- El jugador decide sobre problemas reales; la historia emerge de las consecuencias.

## 32.5 Divergencia histórica

- Variable interna `HISTORICAL DIVERGENCE` (no tiene por qué mostrarse).
- Con divergencia baja, la historia real es el marco: escenas históricas, órdenes de batalla y fechas reales.
- Con divergencia alta, el motor deja de preguntar "¿qué ocurrió?" y pregunta "¿qué ocurriría lógicamente ahora?", usando lógica militar, logística, industrial, política y diplomática.
- **Sin railroading invisible:** no forzar el regreso a la cronología real cuando la simulación ya se ha separado.
- **Coherencia contrafactual:** lo generado debe ser plausible con los medios, la doctrina y la tecnología disponibles en esa fecha. La divergencia no autoriza anacronismos (§2.1).

## 32.6 Inmersión

Durante la partida, los acontecimientos no se etiquetan continuamente como "histórico" o "alternativo". El jugador debe sentir que vive dentro de la historia. La trazabilidad se conserva según §17 (datos, archivo, enciclopedia, crónica final).

## 32.7 Personajes persistentes

- Los oficiales son personas, no bonificaciones: historial, confianza, opinión del jugador, rivalidades, heridas, memoria de decisiones.
- Un oficial que acompaña al jugador desde 1939 debe poder recordar desacuerdos, ser herido, ascender o desaparecer.
- Personajes ficticios siempre marcados como tales en sus fichas (§17, §20). Personajes históricos: no inventar su destino real como hecho; su destino divergente solo existe dentro de la partida.

## 32.8 Objetivo y carrera del jugador

> **Sobrevivir a la historia y dejar una huella en ella.**

El personaje puede ascender, ser relevado, herido, trasladado, capturado o morir. Una derrota no es automáticamente una mala partida. El éxito se mide también por conservación de fuerzas, reputación, cumplimiento de objetivos, supervivencia y legado.

## 32.9 Finales y crónica de guerra

- Los finales son **estados del mundo**, no escenas fijas (familias: victoria del Eje, victoria aliada aproximadamente histórica, colapso interno, armisticio, guerra prolongada, Europa fragmentada, etc.).
- Ningún final debe glorificar la ideología ni los crímenes del régimen (§16). Representar consecuencias, no celebrar.
- Al terminar, el juego debe poder generar una **CRÓNICA DE GUERRA**: cronología, decisiones decisivas, unidades, oficiales, bajas, divergencias respecto a la historia real y destino del personaje. Es el lugar donde se revela qué fue histórico y qué no.

## 32.10 Tono

Militar, documental, sobrio, tenso, burocrático cuando corresponda. Los grandes momentos llegan por telegramas, partes, mapas, memorandos, partes de bajas y cartas, no por escenas cinematográficas exageradas.

## 32.11 Mundo fuera del jugador

Otros actores (mandos vecinos, enemigo, Alto Mando) deben tomar decisiones aunque el jugador no mire. El jugador puede no conocer nunca la causa real de algunos acontecimientos.

---

# 33. CONVENCIONES TÉCNICAS DEL REPOSITORIO

## 33.1 Mapa de archivos

| Archivo | Función |
|---|---|
| `index.html` | estructura de pantallas y carga de scripts |
| `styles.css`, `campaign-1938.css` | estilo general y del prólogo |
| `data.js` | `FRONTLINE_DATA`: campañas, escenas, arsenal, órdenes de batalla |
| `engine.js` | motor narrativo sin DOM |
| `app.js` | interfaz, autenticación local, guardado, enciclopedia |
| `encyclopedia.js` | fichas curadas |
| `logo.js` | puede definir `window.FRONTLINE_OFFICIAL_LOGO`; si está vacío se usa `logo-official.svg` |
| `assets/historical/manifest.json` | catálogo trazable de recursos históricos |
| `docs/GDD.md`, `docs/CAMPAIGN_1938_ASSETS.md` | diseño resumido y mapa de recursos por escena |
| `claude2` | diseño narrativo ampliado (§32) |
| `render.yaml` | despliegue estático en Render |

## 33.2 Reglas

- **Sin paso de build.** Es una web estática: no introducir bundlers, frameworks ni `npm` obligatorio para jugar sin orden explícita.
- **Orden de carga:** `logo.js` → `data.js` → `encyclopedia.js` → `engine.js` → `app.js`. No crear dependencias circulares ni hacer que `data.js` o `engine.js` dependan del DOM.
- **Caché:** al cambiar CSS o JS, subir el parámetro `?v=` de todas las referencias en `index.html` de forma coherente.
- **Guardados:** las claves de `localStorage` (`frontline_accounts_v1`, `frontline_session_v1`, `frontline_campaign_v05_<usuario>`) no se renombran a la ligera. Si cambia la forma del estado del motor, subir `ENGINE_STATE_VERSION` en `app.js` y mantener una ruta segura para partidas antiguas (reiniciar el capítulo afectado sin borrar cuentas ni descubrimientos de enciclopedia).
- **Contenido como datos:** escenas, unidades, armamento y fichas nuevas van en `data.js` / `encyclopedia.js`; la lógica general va en `engine.js`; nada de escenas codificadas en `app.js`.
- **Recursos históricos:** toda imagen nueva se registra en `assets/historical/manifest.json` con autor, institución, fecha, licencia y URL de origen. No enlazar imágenes sin procedencia.
- **Idioma:** textos de juego y documentación en español; términos militares alemanes en su forma original (Heer, Panzer-Division, Armeekorps (mot.), Ic) cuando sean históricos.
- **Secretos:** no subir claves, tokens ni credenciales; el despliegue en Render no los necesita.

## 33.3 Verificación mínima antes de entregar

1. `node --check` sobre cada `.js` modificado.
2. Cargar `index.html` en navegador (Chromium headless disponible) y revisar la consola: cero errores.
3. Probar login / registro locales, entrada al prólogo 1938 y a FALL WEISS.
4. Probar el flujo modificado de principio a fin, incluido al menos un turno del mapa si se toca el motor.
5. Revisar ancho móvil (~390 px) sin scroll horizontal.
6. Comprobar que el logo se ve centrado y sin deformar.

Si algo no pudo verificarse, decirlo explícitamente en el resumen de la tarea.

## 33.4 Documentación sincronizada

- Cambio estructural (nuevo sistema, formato de datos, campo nuevo de escena) → actualizar §26 o §33 de este archivo.
- Cambio visible para el jugador → actualizar `README.md` (estado y versión).
- Cambio de diseño → actualizar `docs/GDD.md` y, si afecta a la narrativa persistente, `claude2`.

---

# 34. PREGUNTAS DE CONTROL PARA CUALQUIER FUNCIÓN NUEVA

Además de la regla de calidad (§28), antes de dar por buena una función:

1. ¿Produce decisiones reales con intercambios (§23)?
2. ¿Genera consecuencias, inmediatas o diferidas?
3. ¿El mundo las recuerda y pueden reaparecer más adelante?
4. ¿Respeta el estado real de la simulación?
5. ¿Respeta solo la información que el personaje puede conocer?
6. ¿Puede contribuir a una historia distinta en otra partida?
7. ¿Mantiene el ultrarrealismo sin obligar al general a microgestionar?
8. ¿Sigue funcionando si la cronología ya se ha separado de la historia real?
9. ¿Mantiene trazable qué es hecho, reconstrucción y divergencia?
10. ¿Hace que el mundo parezca existir cuando el jugador no mira?

Si alguna respuesta es no, rediseñar o justificar la excepción.

---

Última consolidación de reglas: **1 de octubre de 2026**.


---

# ENCICLOPEDIA DE CAMPAÑA · REGLA PERMANENTE

FRONTLINE 1944 incluye una enciclopedia histórica progresiva y persistente.

Reglas obligatorias para cualquier contenido nuevo:

1. Toda **persona real, arma, vehículo, munición, organización, documento, doctrina, lugar, infraestructura o acontecimiento histórico relevante** que aparezca en la experiencia del jugador debe poder tener una ficha de enciclopedia.
2. La ficha **no se muestra antes de que el jugador descubra el elemento** dentro de su campaña. El desbloqueo debe producirse al aparecer en un dossier, parte, escena, unidad, documento o registro conocido por el jugador.
3. Las entradas no descubiertas pueden existir como registros clasificados, pero no deben revelar nombre, especificaciones ni información que el personaje aún no conoce.
4. Las fichas deben separar, cuando proceda:
   - descripción;
   - especificaciones técnicas;
   - variante/modelo y fecha;
   - contexto histórico;
   - función militar;
   - relación con la campaña;
   - advertencias de cronología o incertidumbre.
5. No mezclar especificaciones de variantes de años distintos. Si un arma cambia de blindaje, motor, cañón, munición, peso o prestaciones, indicar la variante y la fecha.
6. El archivo material de `FRONTLINE_DATA.armory` se incorpora automáticamente a la enciclopedia. Añadir una nueva referencia de armamento al arsenal debe hacerla disponible para el sistema de descubrimiento sin rediseñar la interfaz.
7. Los comandantes históricos presentes en los órdenes de batalla se incorporan automáticamente como fichas básicas. Las figuras principales deben recibir fichas curadas más completas en `encyclopedia.js`.
8. Los desbloqueos pertenecen al progreso global del usuario y deben sobrevivir al cambio entre campañas disponibles.
9. La enciclopedia nunca sustituye el sistema de fuentes: una ficha puede resumir, pero los hechos históricos del capítulo deben seguir respaldándose en el archivo documental.
10. El archivo principal de esta función es `encyclopedia.js`. La interfaz está en `index.html`, la lógica de descubrimiento/persistencia en `app.js` y el estilo en `styles.css`.

Objetivo de diseño: que al terminar una campaña el jugador no solo recuerde qué decisiones tomó, sino que haya construido de manera orgánica un archivo técnico e histórico de todo lo que realmente fue encontrando.
