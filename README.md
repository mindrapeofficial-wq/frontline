# FRONTLINE 1944

Juego de estrategia narrativa histórica para navegador, centrado en la guerra terrestre de la Segunda Guerra Mundial desde puestos de mando del Heer.

## Versión 0.5.0

Mapa operacional con turnos sobre la jornada del 1 de septiembre:

- croquis del Corredor Polaco con las tres divisiones del cuerpo, el Brda, los bosques de Tuchola y los contactos conocidos;
- entre parte y parte das una orden a cada división: avanzar, atacar, reconocer, mantener o reabastecer;
- las órdenes pueden no llegar y las divisiones pueden no informar: el mapa muestra lo que tu Estado Mayor sabe, no la verdad;
- fuerzas polacas ocultas que bloquean los ejes, emboscan a columnas ciegas y solo se descubren con reconocimiento;
- las escenas narrativas reaccionan al mapa (si tomas Chojnice en un turno, el parte de Chojnice ya no llega).

## Versión 0.4.0

El 1 de septiembre de 1939 es ahora una jornada jugable con consecuencias reales:

- reloj de campaña: cada orden consume tiempo y la luz se acaba;
- objetivo medible (alcanzar el Brda) con avance, bajas y vehículos perdidos;
- verdad oculta sorteada en cada partida (Chojnice, puentes del Brda, caballería polaca) e informes del Ic que pueden ser falsos según tu reconocimiento;
- órdenes bloqueadas cuando faltan combustible, munición, cohesión o mando;
- fracasos posibles (cuerpo desarticulado, Panzer sin combustible);
- balance final puntuado y comparado con lo que ocurrió en la historia.

## Versión 0.3.0

La campaña ya no comienza en 1944. El recorrido histórico empieza en **Polonia, septiembre de 1939**, y avanzará capítulo a capítulo por las principales campañas terrestres hasta 1944-45.

### Capítulo I · FALL WEISS

Primer rol histórico del prototipo:

**General der Panzertruppe Heinz Guderian**  
**XIX. Armeekorps (mot.) · 4. Armee · Heeresgruppe Nord**

Incluye:

- dossier histórico inicial;
- escenas narrativas fechadas y documentadas;
- decisiones operacionales ramificadas;
- 3. Panzer-Division, 2. Infanterie-Division (mot.) y 20. Infanterie-Division (mot.);
- mando, comunicaciones, combustible, munición, ritmo de marcha, cohesión, reconocimiento y fatiga;
- Estado Mayor con personajes ficticios marcados como tales;
- memoria de decisiones por usuario;
- fotografías y cartografía histórica con atribución;
- archivo de fuentes dentro del juego.

## Acceso

La versión 0.3 añade página de entrada con usuario, contraseña y registro.

Por ahora las cuentas son **locales al navegador** y la contraseña se guarda como hash SHA-256 en localStorage. Esto sirve para el prototipo de un jugador, no sustituye a un backend de autenticación para producción.

## Principios

1. Realismo histórico, militar y armamentístico.
2. Profundidad táctica y operacional.
3. Perspectiva limitada del mando alemán.
4. Información imperfecta.
5. Separación visible entre hecho histórico, reconstrucción narrativa y divergencia del jugador.

## Recursos visuales

El juego incorpora cartografía pública del United States Military Academy y fotografías del Bundesarchiv distribuidas por Wikimedia Commons, manteniendo la atribución y licencia de cada recurso.

## Próximo tramo

El siguiente desarrollo del Capítulo I cubrirá:

- bosques de Tuchola;
- cierre del Corredor Polaco;
- cruces del Brda/Vístula;
- pérdidas, averías y combustible con magnitudes documentadas;
- informes de radio con retrasos;
- órdenes de división y regimiento;
- consecuencias diferidas.
