# FRONTLINE 1944

Juego de estrategia narrativa histórica para navegador centrado en la Segunda Guerra Mundial desde puestos de mando del Heer.

## Estado actual · 0.7.0

El proyecto ya contiene dos campañas jugables de forma independiente:

- **Prólogo 1938 · REORGANIZACIÓN** — mando, reorganización militar, Anschluss, preparación del Heer, coordinación interarmas, Múnich, Sudetes y rearme.
- **1939 · FALL WEISS** — campaña de Polonia desde el XIX. Armeekorps (mot.) de Heinz Guderian.

El juego está diseñado como simulación narrativa de mando: el jugador recibe información incompleta, consulta a su Estado Mayor, administra recursos, emite órdenes y vive consecuencias persistentes. No pretende ser un RTS convencional ni un clon de Supremacy / Call of War.

## Pilares

1. Realismo histórico, militar y armamentístico extremo.
2. Profundidad táctica, operacional y logística.
3. Perspectiva limitada del comandante.
4. Información imperfecta y retrasos de comunicaciones.
5. Persistencia de decisiones y consecuencias.
6. Separación visible entre hecho histórico, reconstrucción narrativa y divergencia del jugador.
7. Historia alternativa emergente, nunca seleccionada mediante un simple botón.

## Campaña 1938

La campaña de 1938 está integrada en el juego y utiliza **56 referencias visuales históricas**, cada una asociada a una función narrativa o documental.

Variables principales:

- mando;
- comunicaciones;
- combustible;
- munición;
- movilidad;
- cohesión;
- reconocimiento;
- fatiga.

El contenido recorre la reorganización del mando, el Anschluss, entrenamiento y movilidad, transmisiones, coordinación con la Luftwaffe, programas navales, Núremberg, la crisis de los Sudetes, Múnich, la ocupación y el cierre del año.

## FALL WEISS

Primer mando de campaña:

**General der Panzertruppe Heinz Guderian**  
**XIX. Armeekorps (mot.) · 4. Armee · Heeresgruppe Nord**

Incluye 3. Panzer-Division, 2. Infanterie-Division (mot.) y 20. Infanterie-Division (mot.).

El 1 de septiembre de 1939 se juega desde el **puesto de mando del cuerpo, en tiempo real con pausa** (`scenario-fallweiss.js`, `command.js`, `command-ui.js`):

- el reloj corre desde las 04:30 (pausa, ×1, ×5, ×15, ×60) y se detiene cuando llega un parte importante;
- compones las órdenes tú: seleccionas una división, eliges qué debe hacer (marchar, atacar, reconocer, defender, reabastecer), marcas el objetivo en el mapa y decides ruta, postura, hora de inicio y apoyo de la artillería del cuerpo;
- las órdenes tardan en llegar (radio o enlace motorizado, según la distancia a tu puesto de mando) y las divisiones tardan en prepararlas; puedes trasladar el puesto de mando;
- el mapa solo muestra lo que te han contado: la última posición comunicada de cada división y los contactos detectados, que pueden estar mal identificados o exagerados; los partes llegan con retraso y a veces en desorden;
- cada división gasta su propio combustible y munición, se fatiga y solo se reabastece detenida; mientras Chojnice resista, el suministro da rodeos;
- fuerzas polacas ocultas, puentes del Brda que pueden volar, la caballería de Krojanty y la niebla de la mañana; cada partida sortea en secreto la situación;
- los episodios históricos aparecen como eventos con su registro documental, y la jornada termina con un balance comparado con la historia.

Al terminar el prólogo de 1938 se pasa directamente a FALL WEISS, y desde el dossier del prólogo se puede saltar a 1939.

## Enciclopedia de campaña

La interfaz incluye una **enciclopedia histórica progresiva**. Sus fichas no se entregan como un wiki completo desde el inicio: se desbloquean cuando el jugador encuentra realmente una persona, arma, organización, documento, lugar o acontecimiento durante la campaña.

El sistema guarda los descubrimientos entre campañas, muestra registros todavía clasificados sin revelar su contenido y combina fichas curadas con entradas automáticas procedentes del archivo de armamento y de los órdenes de batalla históricos.

Las entradas técnicas deben indicar variante y cronología cuando las especificaciones cambian a lo largo de la guerra.

## Narrativa persistente

El archivo `claude2` define la evolución del proyecto hacia un sistema de crónica persistente denominado conceptualmente **WORLD CHRONICLE**.

El objetivo es que el mundo recuerde órdenes, pérdidas, oficiales, ciudades, logística, relaciones de mando, inteligencia, errores y divergencias. Una decisión tomada mucho antes puede alterar campañas posteriores.

La Segunda Guerra Mundial comienza muy cerca de la historia real y puede separarse progresivamente de ella mediante cadenas de causalidad plausibles.

## Multijugador futuro

La visión multijugador no consiste en controlar países completos.

Cada jugador controlará fuerzas dentro de un frente compartido, con:

- línea de frente dinámica;
- cadena de mando entre jugadores;
- jerarquías y permisos por rango;
- logística compartida;
- niebla de guerra individual;
- información imperfecta;
- campañas históricas limitadas;
- referencia de escala de hasta **100 jugadores**, 50 por bando en un escenario grande como Normandía.

## Interfaz

La interfaz debe sentirse como un puesto de mando histórico:

- informes;
- mapas operacionales;
- fotografías;
- telegramas;
- fichas de unidades;
- inteligencia;
- Estado Mayor;
- órdenes y logística.

La narrativa y la simulación tienen prioridad sobre el espectáculo gráfico.

## Logo

`logo-official.svg` es el logo oficial del proyecto y debe usarse en login, portada y superficies principales sin deformarlo ni sustituirlo.

## Acceso

El prototipo actual incluye usuario, contraseña y registro locales al navegador. Es una solución temporal de prototipo y deberá sustituirse por autenticación y persistencia de servidor antes del multijugador real.

## Documentación para agentes

- `CLAUDE.md` — constitución general del proyecto y reglas de desarrollo.
- `claude2` — diseño narrativo, persistencia, ultrarrealismo, historia alternativa y finales.
- `docs/GDD.md` — documento de diseño resumido.

Cualquier agente que trabaje en el repositorio debe leer **CLAUDE.md y claude2 antes de realizar cambios estructurales**.

## Despliegue

El proyecto es actualmente una web estática HTML/CSS/JavaScript preparada para desplegarse directamente en Render.

