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

Formato de escenas en `data.js` (desde 0.4):

- `at`: hora mínima de la escena en minutos desde las 00:00 del 1 SEP 1939;
- `body`, `intel`, `historical`: listas de texto; cada elemento puede ser `{if:{...}, text:"..."}`;
- `onEnter`: efectos que se aplican una sola vez al entrar;
- `choices[]`: `effects`, `outcomes` (primer desenlace cuyas condiciones se cumplan), `requires` + `blockedText`, `visibleIf`, `next` (texto o lista `{if, to}`);
- condiciones: `flag`, `noFlag`, `res`, `hidden`, `progress`, `clock`, `losses`, `accurate`/`inaccurate` (informe exacto según el reconocimiento), `all`, `any`, `not`;
- `hidden` del capítulo: verdad del escenario sorteada al empezar cada partida;
- `failures` del capítulo: condiciones que terminan la jornada antes de tiempo;
- `evaluation` del capítulo: criterios puntuados, veredictos y comparación histórica.

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

1. leer este archivo;
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

Última consolidación de reglas: **1 de octubre de 2026**.
