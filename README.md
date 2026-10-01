# FRONTLINE 1944

Juego de estrategia narrativa histórica para navegador centrado en la Segunda Guerra Mundial desde puestos de mando del Heer.

## Estado actual · 0.4.0

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

Incluye 3. Panzer-Division, 2. Infanterie-Division (mot.) y 20. Infanterie-Division (mot.), con decisiones sobre ritmo de marcha, combustible, munición, cohesión, reconocimiento y comunicaciones.

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

