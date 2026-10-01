# FRONTLINE 1944 · Game Design Document 0.4

## Concepto

FRONTLINE 1944 es un juego de estrategia narrativa histórica para navegador. La experiencia coloca al jugador dentro de un puesto de mando alemán y convierte información incompleta, logística, comunicaciones, doctrina y tiempo en decisiones.

**No controlas la guerra. La diriges con lo que sabes en ese momento.**

El proyecto debe permanecer alejado del RTS arcade y del grand strategy basado en controlar una nación completa.

## Experiencia principal

Referencia de diseño:

- 70 % narrativa y simulación de mando;
- 20 % mapas e interfaz estratégica;
- 10 % material visual histórico.

El mapa sirve para pensar. Los informes sirven para comprender. Las órdenes sirven para actuar.

## Campañas actuales

### Capítulo I · REORGANIZACIÓN · 1938

Prólogo jugable desde el mando del Heer. Recorre reorganización de la cúpula militar, Anschluss, preparación y movilidad, transmisiones, coordinación interarmas, programas navales, Núremberg, crisis de los Sudetes, Múnich, ocupación y cierre de 1938.

La campaña integra 56 referencias visuales históricas con una función concreta dentro de sus escenas.

### Capítulo II · FALL WEISS · 1939

Campaña de Polonia desde el XIX. Armeekorps (mot.) de Heinz Guderian. Se preserva como campaña jugable independiente.

### Progresión prevista

Weserübung, Fall Gelb, Barbarossa, Frente Oriental 1942-43 y FRONTLINE 1944 / Normandía, con expansión posterior hacia 1945.

## Bucle de juego

1. Recibir un parte o situación.
2. Consultar mapa, unidades y recursos.
3. Escuchar valoraciones del Estado Mayor.
4. Distinguir hechos, estimaciones y lagunas.
5. Emitir una orden.
6. Dejar que pase tiempo real de simulación.
7. Resolver transmisión, interpretación, fricción y reacción enemiga.
8. Aplicar consecuencias inmediatas y diferidas.
9. Registrar los hechos relevantes en la memoria del mundo.
10. Continuar desde el nuevo estado, no desde un guion reiniciado.

## Sistemas

El prototipo ya trabaja con mando, comunicaciones, combustible, munición, movilidad, cohesión, reconocimiento y fatiga.

La simulación debe evolucionar hacia mantenimiento, transporte, reemplazos, moral, reservas, artillería, carreteras, ferrocarriles, puentes, terreno, clima, bajas y antigüedad de la inteligencia.

## Información imperfecta

El jugador solo conoce lo que razonablemente podría conocer su puesto de mando.

Los informes pueden ser:

- correctos;
- incompletos;
- retrasados;
- contradictorios;
- erróneos;
- obsoletos.

Un marcador enemigo en el mapa representa una creencia del Estado Mayor, no una verdad omnisciente.

## WORLD CHRONICLE

La dirección narrativa definida en `claude2` introduce una memoria histórica persistente del mundo.

WORLD CHRONICLE debe recordar órdenes, batallas, unidades salvadas o destruidas, oficiales, ciudades, puentes, pérdidas, inteligencia, reputación, relaciones de mando, logística y desviaciones respecto a la historia real.

Una consecuencia puede reaparecer muchos capítulos después.

## Historia y contrafactual

Cada escena debe distinguir entre:

- **HECHO HISTÓRICO**;
- **RECONSTRUCCIÓN NARRATIVA**;
- **DIVERGENCIA DEL JUGADOR**.

La campaña comienza anclada en la historia documentada. La ucronía emerge de cadenas causales plausibles y puede aumentar con el tiempo. No existe un botón de “cambiar la historia”.

## Finales

No debe existir únicamente un final binario victoria/derrota.

La crónica completa puede terminar según el estado del mundo, la supervivencia de fuerzas, reputación, carrera del comandante, decisiones acumuladas y resultado militar. Los finales deben ser consecuencia de la simulación y no elecciones aisladas de último minuto.

## Estado Mayor

Los asesores son una interfaz humana de la simulación. Pueden interpretar, discrepar y equivocarse. Los personajes históricos deben ser documentados; los personajes ficticios deben quedar marcados como tales.

## Multijugador

La dirección futura contempla escenarios de frente compartido de hasta 100 jugadores.

Cada jugador controla fuerzas dentro de una jerarquía y no un país completo. El diseño debe soportar:

- cadena de mando;
- permisos por rango;
- línea de frente dinámica;
- comunicaciones humanas;
- logística compartida;
- inteligencia diferente para cada jugador;
- objetivos operacionales.

Normandía es el escenario de referencia para una gran partida de aproximadamente 50 jugadores por bando.

## Presentación

La interfaz representa un cuartel general mediante mapas, fotografías, partes de situación, fichas de formación, telegramas, archivos, inteligencia y controles de órdenes.

El material de la Alemania nazi se utiliza con función histórica y documental, sin tratamiento propagandístico o celebratorio.

## Persistencia técnica

El prototipo mantiene cuentas y progreso localmente en el navegador. Una versión multijugador requerirá backend, autenticación real y persistencia de servidor.

## Documentos canónicos

- `CLAUDE.md`: reglas maestras del proyecto.
- `claude2`: narrativa persistente, WORLD CHRONICLE, ultrarrealismo e historia alternativa.
- este documento: resumen funcional del diseño vigente.
