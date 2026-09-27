/* ============================================================================
   noticias-respaldo.js — GENERADO AUTOMÁTICAMENTE, NO EDITAR A MANO

   Copia de noticias.json para que el catálogo funcione también al abrir las
   páginas con doble clic, cuando el navegador bloquea fetch() por el origen
   opaco del protocolo file://.

   Para regenerarlo:  python assets/data/generar-respaldo.py
   Editar siempre:    assets/data/noticias.json
   ========================================================================== */

window.PD_NOTICIAS_RESPALDO = [
  {
    "id": "n-001",
    "titulo": "Los modelos de lenguaje abiertos ganan terreno en la industria colombiana",
    "resumen": "Cada vez más equipos de producto reemplazan servicios cerrados por modelos que pueden auditar y ejecutar en su propia infraestructura.",
    "contenido": "Hace dos años, montar un asistente conversacional en producción significaba, casi inevitablemente, firmar con un proveedor externo. Hoy la conversación en los comités técnicos ha empezado a cambiar.\n\nLa razón principal no es el precio, aunque también pese. Es el control: los equipos quieren saber con qué datos se entrenó el modelo que responde a sus clientes, poder auditar sus respuestas y garantizar que la información sensible no sale de su propia red.\n\nEl cambio no es gratuito. Ejecutar un modelo propio exige infraestructura, monitoreo y un equipo que sepa medir la calidad de las respuestas, algo que las empresas medianas no siempre tienen. Varios de los responsables consultados coinciden en que el punto de equilibrio aparece cuando el volumen de consultas se vuelve constante.\n\nQueda una pregunta abierta, y es la que más se repite en los pasillos: qué pasa con el talento. Los perfiles capaces de afinar y sostener estos sistemas siguen siendo escasos, y la competencia por ellos ya no es solo local.\n\nEn los próximos meses se sabrá si la tendencia se consolida o si fue solo un movimiento de los equipos más grandes. Por ahora, la decisión dejó de ser obvia en una sola dirección, y eso ya es una novedad.",
    "categoria": "Inteligencia Artificial",
    "autor": "Ana Rivera",
    "fecha": "2026-09-13",
    "imagen": "assets/img/noticias/n-001.jpg",
    "destacada": true,
    "tiempoLectura": 6,
    "fuente": "",
    "credito": {
      "titulo": "Centaur server room",
      "autor": "viagallery.com",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/15932083@N05/2293424530",
      "busqueda": "server room"
    }
  },
  {
    "id": "n-002",
    "titulo": "Un laboratorio de Medellín entrena el primer modelo de voz en lenguas nativas",
    "resumen": "El proyecto reúne a lingüistas y desarrolladores para documentar y sintetizar seis lenguas en riesgo.",
    "contenido": "El equipo lleva dieciocho meses grabando hablantes en zonas rurales. No buscan un producto comercial: quieren que dentro de veinte años alguien pueda escuchar cómo sonaban esas lenguas.\n\nEl trabajo empezó por donde suele empezar todo proyecto de voz, que es el más lento: recolectar y transcribir horas de audio limpio. Con seis lenguas y comunidades dispersas, la fase de campo consumió más tiempo que el entrenamiento del modelo.\n\nLa parte técnica trajo su propia sorpresa. Los modelos preentrenados en español no sirvieron de base tan bien como esperaban, porque la fonética no coincide en varios puntos críticos. Terminaron construyendo el inventario de sonidos desde cero.\n\nEl resultado se publicará con licencia abierta y los audios quedarán en custodia de las comunidades que los aportaron. Esa condición, explican, se negoció antes de grabar la primera palabra.",
    "categoria": "Inteligencia Artificial",
    "autor": "Camilo Arboleda",
    "fecha": "2026-09-12",
    "imagen": "assets/img/noticias/n-002.jpg",
    "destacada": true,
    "tiempoLectura": 4,
    "fuente": "",
    "credito": {
      "titulo": "professional-retro-microphone--dj-headphones-",
      "autor": "www.ilmicrofono.it",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/115089924@N02/12212276953",
      "busqueda": "recording studio microphone"
    }
  },
  {
    "id": "n-003",
    "titulo": "Cómo evaluar un asistente antes de ponerlo frente a los clientes",
    "resumen": "Tres criterios que separan una demostración vistosa de un sistema que aguanta el uso real.",
    "contenido": "La demostración siempre sale bien. El problema aparece el martes siguiente, cuando entran mil consultas que nadie previó.\n\nEl primer criterio es tener un conjunto de preguntas reales, tomadas del histórico de atención, no inventadas por el equipo que construyó el asistente. Quien escribe las preguntas conoce las respuestas, y eso contamina cualquier medición.\n\nEl segundo es medir el fracaso, no solo el acierto. Importa menos el porcentaje de respuestas correctas que lo que ocurre con las incorrectas: si el sistema inventa con seguridad o si reconoce que no sabe y deriva a una persona.\n\nEl tercero es repetir la medición cada vez que algo cambie. Un cambio de modelo, de instrucciones o de fuente de datos puede mejorar un tipo de consulta y estropear otro sin que nadie lo note hasta que un cliente reclama.",
    "categoria": "Inteligencia Artificial",
    "autor": "Ana Rivera",
    "fecha": "2026-09-06",
    "imagen": "assets/img/noticias/n-003.jpg",
    "destacada": false,
    "tiempoLectura": 9,
    "fuente": "",
    "credito": {
      "titulo": "Todo List",
      "autor": "Freestocks.org",
      "licencia": "CC0 1.0",
      "url": "https://stocksnap.io/photo/todo-list-TVEUBLIOSK",
      "busqueda": "checklist paper pen"
    }
  },
  {
    "id": "n-004",
    "titulo": "Las universidades del país acuerdan un marco común para el uso de IA",
    "resumen": "El documento no prohíbe: exige declarar el uso y mantener la capacidad de defender el trabajo entregado.",
    "contenido": "El acuerdo llega después de dos semestres de reglas distintas en cada facultad, y a veces en cada asignatura.\n\nEl punto central no es la prohibición sino la declaración. Quien use una herramienta de asistencia debe decirlo y, sobre todo, debe poder explicar y sostener lo que entrega. La evaluación se desplaza así hacia la sustentación oral en varias asignaturas.\n\nLos docentes consultados señalan la parte difícil: verificar. No existe una forma fiable de detectar el uso de estas herramientas, y las que se anuncian como tales fallan en ambas direcciones, señalando trabajos propios y dejando pasar otros.\n\nPor eso el marco insiste en rediseñar las actividades antes que en vigilarlas. Un trabajo que pide decisiones justificadas y defendidas en clase resiste mejor que uno que pide un texto terminado.",
    "categoria": "Inteligencia Artificial",
    "autor": "Lucía Ferrer",
    "fecha": "2026-09-03",
    "imagen": "assets/img/noticias/n-004.jpg",
    "destacada": false,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "Ohio University Lecture Hall",
      "autor": "Garden Sprite",
      "licencia": "CC0 1.0",
      "url": "https://commons.wikimedia.org/w/index.php?curid=149049984",
      "busqueda": "university lecture hall"
    }
  },
  {
    "id": "n-005",
    "titulo": "La inversión semilla regional se reactiva tras dos años de ajuste",
    "resumen": "Los fondos vuelven a abrir cheques tempranos, pero exigen métricas de ingreso desde el primer año.",
    "contenido": "El dinero volvió, pero con otras condiciones. Quien levantó capital en 2021 con una presentación y un equipo reconocerá poco del proceso actual.\n\nLa diferencia está en el momento de la conversación en que aparece la pregunta por los ingresos. Antes llegaba en la tercera reunión; ahora abre la primera. Los fondos quieren ver cobros reales, aunque sean modestos, antes de comprometer una ronda.\n\nEso cambia el tipo de empresa que consigue financiación. Los proyectos que necesitan años de desarrollo antes de facturar lo tienen más difícil, mientras que los que pueden cobrar desde el primer mes encuentran puertas abiertas.\n\nVarios fundadores lo describen como un regreso a la normalidad más que como una crisis. La discusión, dicen, dejó de ser sobre cuánto se puede crecer y volvió a ser sobre qué problema se resuelve y quién paga por ello.",
    "categoria": "Startups",
    "autor": "Daniel Osorio",
    "fecha": "2026-09-11",
    "imagen": "assets/img/noticias/n-005.jpg",
    "destacada": true,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "Team Meeting",
      "autor": "Startup Stock Photos",
      "licencia": "CC0 1.0",
      "url": "https://stocksnap.io/photo/team-meeting-JBW2PXDOL6",
      "busqueda": "startup office meeting"
    }
  },
  {
    "id": "n-006",
    "titulo": "Tres fundadoras cuentan cómo levantaron su primera ronda sin salir del país",
    "resumen": "Coinciden en algo poco glamuroso: la ronda se cerró con una hoja de cálculo, no con una presentación.",
    "contenido": "Las tres partieron de sectores distintos y llegaron a la misma conclusión sobre lo que convenció a sus inversionistas.\n\nNinguna menciona la presentación como el momento decisivo. Las tres describen una hoja de cálculo abierta en pantalla compartida, respondiendo preguntas incómodas sobre costos de adquisición y márgenes, línea por línea.\n\nCoinciden también en el error que más les costó: buscar primero al fondo grande. Las tres terminaron cerrando con inversionistas locales que entendían el mercado y que hicieron preguntas más duras, pero más útiles.\n\nSobre el hecho de ser mujeres en un sector donde siguen siendo minoría, las respuestas se separan. Dos lo consideran un factor que pesó; la tercera sostiene que lo que pesó fue no tener contactos previos en el sector financiero.",
    "categoria": "Startups",
    "autor": "Daniel Osorio",
    "fecha": "2026-09-02",
    "imagen": "assets/img/noticias/n-006.jpg",
    "destacada": false,
    "tiempoLectura": 7,
    "fuente": "",
    "credito": {
      "titulo": "Writing Drawing",
      "autor": "Green Chameleon",
      "licencia": "CC0 1.0",
      "url": "https://stocksnap.io/photo/writing-drawing-8Y0EDX4VP9",
      "busqueda": "notebook pen coffee desk"
    }
  },
  {
    "id": "n-007",
    "titulo": "El modelo de suscripción llega a los talleres de barrio",
    "resumen": "Mantenimiento de moto por cuota mensual: un ensayo que ya funciona en tres ciudades intermedias.",
    "contenido": "La idea no nació en una incubadora sino en un taller de Bucaramanga, cuando un mecánico se cansó de que sus clientes solo aparecieran cuando algo ya estaba roto.\n\nLa cuota mensual cubre revisiones periódicas, cambio de aceite y ajustes menores. Las reparaciones mayores se cobran aparte, pero llegan menos, que es exactamente el punto: el taller gana estabilidad y el cliente evita la avería costosa.\n\nEl obstáculo no fue técnico sino de confianza. Convencer a alguien de pagar por algo que todavía no se ha roto exige un historial, y ese historial se construye taller por taller.\n\nTres talleres en ciudades distintas ensayan ahora el mismo esquema con una aplicación compartida para llevar el registro de cada moto. Es software modesto resolviendo un problema concreto, que suele ser el que funciona.",
    "categoria": "Startups",
    "autor": "Paula Nieto",
    "fecha": "2026-08-29",
    "imagen": "assets/img/noticias/n-007.jpg",
    "destacada": false,
    "tiempoLectura": 4,
    "fuente": "",
    "credito": {
      "titulo": "Carroll Gardens Motorcycle repair shop",
      "autor": "postopp1",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/20683116@N02/3658782200",
      "busqueda": "motorcycle repair shop"
    }
  },
  {
    "id": "n-008",
    "titulo": "Guía práctica para reemplazar tus contraseñas por llaves de acceso",
    "resumen": "Qué es una passkey, en qué servicios ya funciona y cómo migrar sin quedarte por fuera de tu cuenta.",
    "contenido": "Una llave de acceso sustituye la contraseña por algo que ya tienes: el desbloqueo de tu propio dispositivo. No hay nada que recordar ni nada que se pueda robar por engaño.\n\nTécnicamente son un par de claves criptográficas. La privada no sale nunca de tu teléfono o computador; el servicio solo guarda la pública, que por sí sola no sirve para entrar. Por eso una filtración del servidor no compromete tu cuenta.\n\nLa migración tiene una trampa que conviene conocer antes de empezar: si activas la llave de acceso y pierdes el dispositivo sin haber configurado un segundo método, te quedas fuera. Configura siempre un respaldo antes de eliminar la contraseña anterior.\n\nEl soporte ya es amplio en correo, banca y redes sociales, aunque desigual. Lo razonable es migrar primero las cuentas críticas y dejar las demás para cuando el servicio lo permita sin fricción.",
    "categoria": "Ciberseguridad",
    "autor": "Sofía Cárdenas",
    "fecha": "2026-09-10",
    "imagen": "assets/img/noticias/n-008.jpg",
    "destacada": true,
    "tiempoLectura": 7,
    "fuente": "",
    "credito": {
      "titulo": "Antivirus",
      "autor": "Infosec Images",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/136770128@N07/41397204425",
      "busqueda": "padlock laptop security"
    }
  },
  {
    "id": "n-009",
    "titulo": "Qué hacer en las primeras dos horas tras una filtración de datos",
    "resumen": "El orden de las decisiones importa más que la velocidad, y casi siempre se invierte.",
    "contenido": "El primer impulso suele ser el equivocado: apagar todo. Apagar borra evidencia y deja al equipo sin saber qué ocurrió ni por dónde entró.\n\nLo primero es aislar sin destruir. Desconectar de la red el sistema afectado conserva el estado de la máquina y corta el acceso del atacante al mismo tiempo. La copia forense se hace antes de cualquier limpieza.\n\nLo segundo es determinar el alcance, y aquí es donde se pierde más tiempo: qué datos salieron, de cuántas personas y desde cuándo. Sin esa respuesta no se puede notificar a nadie con precisión, y notificar mal es casi peor que tardar.\n\nLo tercero es comunicar. La normativa fija plazos, pero más allá del plazo legal está el criterio: las personas afectadas necesitan saber qué dato suyo está expuesto y qué deben hacer, en ese orden y sin rodeos.",
    "categoria": "Ciberseguridad",
    "autor": "Jorge Betancur",
    "fecha": "2026-09-05",
    "imagen": "assets/img/noticias/n-009.jpg",
    "destacada": false,
    "tiempoLectura": 6,
    "fuente": "",
    "credito": {
      "titulo": "Computer Data Hacker",
      "autor": "Visual Content",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/143601516@N03/29402709463",
      "busqueda": "cyber security screen"
    }
  },
  {
    "id": "n-010",
    "titulo": "Las estafas por mensaje de voz clonada llegan a las pymes",
    "resumen": "Bastan unos segundos de audio público para imitar una voz y pedir una transferencia urgente.",
    "contenido": "El esquema es viejo y la herramienta nueva. Alguien llama o deja un mensaje de voz haciéndose pasar por el gerente, con su voz, pidiendo una transferencia que no puede esperar.\n\nEl material de partida es sorprendentemente accesible: un video corporativo, una entrevista, un saludo en redes. Con pocos segundos limpios alcanza para producir un audio que engaña a quien conoce esa voz.\n\nLa defensa no es tecnológica sino de procedimiento. Las empresas que no han caído comparten una regla simple: ninguna transferencia se aprueba por un canal distinto del habitual, sin importar quién la pida ni cuánta urgencia transmita.\n\nConviene además acordar en frío una palabra de verificación para pagos fuera de lo normal. Suena rudimentario, pero funciona precisamente porque no depende de detectar la falsificación.",
    "categoria": "Ciberseguridad",
    "autor": "Sofía Cárdenas",
    "fecha": "2026-08-31",
    "imagen": "assets/img/noticias/n-010.jpg",
    "destacada": false,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "Project 365 #25: 250109 It's Good to Talk!",
      "autor": "comedy_nose",
      "licencia": "Dominio público",
      "url": "https://www.flickr.com/photos/23408922@N07/3224694069",
      "busqueda": "telephone office call"
    }
  },
  {
    "id": "n-011",
    "titulo": "Los portátiles con procesador ARM ya compiten de igual a igual en autonomía",
    "resumen": "Probamos cuatro equipos durante un mes de trabajo real para medir rendimiento y compatibilidad.",
    "contenido": "La autonomía dejó de ser el argumento a discutir. Los cuatro equipos superaron la jornada completa sin cargador, algo que hace tres años solo lograba uno.\n\nEl terreno donde todavía se pierde es la compatibilidad. La ofimática, el navegador y los editores de código funcionan sin distinguirse; los problemas aparecen en herramientas especializadas y en controladores de periféricos antiguos, que a veces sencillamente no existen.\n\nEn rendimiento sostenido la diferencia se nota menos de lo esperado, salvo en tareas largas de compilación, donde los equipos con ventilación activa mantienen mejor la frecuencia.\n\nLa conclusión depende del uso. Para trabajo de oficina y desarrollo web la decisión ya no es arriesgada; para quien dependa de un programa concreto, la pregunta previa sigue siendo si ese programa corre.",
    "categoria": "Hardware",
    "autor": "Marcela Peña",
    "fecha": "2026-09-09",
    "imagen": "assets/img/noticias/n-011.jpg",
    "destacada": false,
    "tiempoLectura": 8,
    "fuente": "",
    "credito": {
      "titulo": "Children's learner typing on the laptop keyboard closeup",
      "autor": "Shixart1985",
      "licencia": "CC BY 2.0",
      "url": "https://commons.wikimedia.org/w/index.php?curid=194440259",
      "busqueda": "laptop keyboard closeup"
    }
  },
  {
    "id": "n-012",
    "titulo": "Reparar en lugar de reemplazar: el auge de los talleres de electrónica",
    "resumen": "Cambiar una batería o una pantalla vuelve a ser rentable, y aparecen oficios que parecían perdidos.",
    "contenido": "Durante una década la respuesta a un aparato averiado fue comprar otro. El cálculo está cambiando, y no solo por conciencia ambiental.\n\nEl precio de los equipos nuevos subió, y al mismo tiempo se ampliaron el acceso a repuestos y la información de reparación. Un cambio de batería que antes exigía un centro autorizado hoy lo resuelve un taller de barrio en una hora.\n\nEl oficio, sin embargo, escasea. Soldar componentes pequeños y diagnosticar una placa requiere formación y práctica, y hay pocos lugares donde aprenderlo de manera formal.\n\nAlgunos talleres empezaron a formar aprendices por su cuenta. Es una respuesta lenta a un problema inmediato, pero es la única que aparece cuando la demanda crece más rápido que la oferta de gente capacitada.",
    "categoria": "Hardware",
    "autor": "Jorge Betancur",
    "fecha": "2026-09-01",
    "imagen": "assets/img/noticias/n-012.jpg",
    "destacada": false,
    "tiempoLectura": 6,
    "fuente": "",
    "credito": {
      "titulo": "Fixed Headphones",
      "autor": "Andrew Mason",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/34754790@N00/3188058264",
      "busqueda": "electronics repair soldering"
    }
  },
  {
    "id": "n-013",
    "titulo": "Sensores de bajo costo para medir la calidad del aire en los barrios",
    "resumen": "Un colectivo instala estaciones caseras donde la red oficial no llega y publica los datos abiertos.",
    "contenido": "La red oficial de monitoreo tiene pocas estaciones y están donde están. Entre una y otra puede haber kilómetros y realidades muy distintas.\n\nEl colectivo construye estaciones con sensores comerciales de bajo costo, una placa pequeña y una carcasa impresa en tres dimensiones. Cada unidad cuesta una fracción de un equipo certificado y se instala en una ventana o una azotea.\n\nLa precisión es el punto débil, y ellos lo admiten sin rodeos: estos sensores no sustituyen a los oficiales ni sirven como prueba legal. Lo que aportan es densidad y continuidad, que permiten ver patrones que una estación lejana no capta.\n\nTodos los datos se publican abiertos y con su margen de error declarado. Varios colegios los usan ya como material de clase, que no era el objetivo inicial pero terminó siendo el uso más constante.",
    "categoria": "Hardware",
    "autor": "Lucía Ferrer",
    "fecha": "2026-08-27",
    "imagen": "assets/img/noticias/n-013.jpg",
    "destacada": false,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "Beijing smog",
      "autor": "kevin dooley",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/12836528@N00/386198516",
      "busqueda": "air pollution city smog"
    }
  },
  {
    "id": "n-014",
    "titulo": "Por qué cada vez más equipos abandonan las reuniones diarias de seguimiento",
    "resumen": "Tres empresas cuentan qué reemplazaron y cómo miden ahora el avance del trabajo.",
    "contenido": "La reunión diaria se defendía sola: quince minutos para saber en qué anda cada quien. En la práctica, en varios equipos se había convertido en un informe en voz alta que nadie escuchaba.\n\nLas tres empresas consultadas la sustituyeron por un resumen escrito asíncrono. Cada persona anota en qué avanzó y dónde está bloqueada, y quien necesita ese contexto lo lee cuando le sirve, no a las nueve en punto.\n\nEl efecto que más destacan no es el tiempo ahorrado sino el bloqueo detectado antes. Escrito, un obstáculo queda registrado y alguien lo ve; dicho en voz alta entre otras diez frases, se pierde.\n\nNinguna eliminó las reuniones del todo. Conservaron una semanal, más larga y con un propósito distinto: decidir, no informar. La diferencia entre ambas cosas es lo que estaba fallando.",
    "categoria": "Software",
    "autor": "Marcela Peña",
    "fecha": "2026-09-08",
    "imagen": "assets/img/noticias/n-014.jpg",
    "destacada": false,
    "tiempoLectura": 6,
    "fuente": "",
    "credito": {
      "titulo": "101 Current Projects",
      "autor": "mandiberg",
      "licencia": "CC BY-SA 2.0",
      "url": "https://www.flickr.com/photos/42586873@N00/3839086705",
      "busqueda": "team meeting whiteboard"
    }
  },
  {
    "id": "n-015",
    "titulo": "El regreso del software de escritorio en las empresas medianas",
    "resumen": "Sin conexión permanente y sin cuota mensual: razones prácticas detrás de un movimiento discreto.",
    "contenido": "No es nostalgia. Es que en varios contextos la aplicación de escritorio resuelve mejor el problema que la versión en el navegador.\n\nLa primera razón es la conexión. En operaciones fuera de las grandes ciudades, depender de internet permanente para facturar o registrar inventario significa detenerse cada vez que el enlace falla.\n\nLa segunda es el costo acumulado. Una cuota mensual por usuario resulta cómoda al empezar y pesada cuando el equipo crece, sobre todo si el uso real es de unas horas al día.\n\nLa tercera es el control de los datos. Guardar la información en la propia máquina simplifica auditorías y evita conversaciones incómodas sobre dónde residen los datos. El precio a pagar es asumir las copias de seguridad, que es justamente donde estas empresas suelen fallar.",
    "categoria": "Software",
    "autor": "Camilo Arboleda",
    "fecha": "2026-09-04",
    "imagen": "assets/img/noticias/n-015.jpg",
    "destacada": false,
    "tiempoLectura": 7,
    "fuente": "",
    "credito": {
      "titulo": "Desktop 8/2012",
      "autor": "Jiri Brozovsky",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/7958754@N03/7833087424",
      "busqueda": "desktop computer office"
    }
  },
  {
    "id": "n-016",
    "titulo": "Documentar el código dejó de ser opcional en los equipos que crecen",
    "resumen": "El costo de no escribir aparece cuando entra la cuarta persona al proyecto, no antes.",
    "contenido": "Con dos personas, la documentación es una conversación. Con ocho, esa conversación hay que repetirla cada vez y nunca sale igual.\n\nEl punto de quiebre que describen varios equipos llega alrededor de la cuarta o quinta incorporación. Antes, el conocimiento cabe en la cabeza de quien escribió el código; después, empieza a perderse en cada rotación.\n\nLo que funciona no es el documento extenso que nadie actualiza, sino la nota corta junto al código que explica por qué se tomó una decisión. El qué se lee en el código; el porqué se pierde si no se escribe.\n\nAlgunos equipos incorporaron una regla sencilla: ninguna decisión de arquitectura se aprueba sin un párrafo que explique qué alternativas se descartaron. Un párrafo, no un informe.",
    "categoria": "Software",
    "autor": "Paula Nieto",
    "fecha": "2026-08-28",
    "imagen": "assets/img/noticias/n-016.jpg",
    "destacada": false,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "Jon Satrom - QTzrk (2011) http://Jonsatrom.com/ & Videogramo - olympic Games (2010) http://www.videogramo.8bitpeoples.co",
      "autor": "Rosa Menkman",
      "licencia": "CC BY 2.0",
      "url": "https://www.flickr.com/photos/68716054@N00/5486667090",
      "busqueda": "programming code screen"
    }
  },
  {
    "id": "n-017",
    "titulo": "Un bus escolar eléctrico diseñado y ensamblado en el Valle del Cauca",
    "resumen": "El prototipo recorre 220 kilómetros por carga y sus piezas críticas se fabrican en la región.",
    "contenido": "El proyecto empezó por una necesidad concreta: las rutas escolares rurales son cortas, repetitivas y previsibles, que es el escenario donde un vehículo eléctrico rinde mejor.\n\nEl prototipo recorre 220 kilómetros por carga, más del doble de lo que exige una jornada escolar típica en la zona. El margen es deliberado, porque la recarga depende de una red que todavía es irregular.\n\nLo más relevante no es el vehículo sino dónde se fabrica. El chasis, el sistema de suspensión y buena parte del ensamblaje son regionales; se importan las celdas de batería y la electrónica de control.\n\nQueda por resolver el mantenimiento. Un bus eléctrico necesita técnicos formados en alta tensión, y ese oficio apenas existe fuera de las capitales. El equipo trabaja con dos instituciones técnicas para abrir el programa.",
    "categoria": "Innovación",
    "autor": "Sofía Cárdenas",
    "fecha": "2026-09-07",
    "imagen": "assets/img/noticias/n-017.jpg",
    "destacada": false,
    "tiempoLectura": 5,
    "fuente": "",
    "credito": {
      "titulo": "2013 in Bonn. BYD ebus (electrical bus). Bus facing left 1. Spielvogel",
      "autor": "For a gallery of some more of my uploaded pictures see: here.",
      "licencia": "CC0 1.0",
      "url": "https://commons.wikimedia.org/w/index.php?curid=29583408",
      "busqueda": "electric bus"
    }
  },
  {
    "id": "n-018",
    "titulo": "Huertas urbanas conectadas: sensores caseros para cultivos en azotea",
    "resumen": "Humedad, temperatura y luz medidas con componentes de bajo costo y un panel que cualquiera puede leer.",
    "contenido": "Cultivar en una azotea tiene un problema que no tiene cultivar en tierra: el sustrato es poco y se seca rápido, y el error se paga en días.\n\nEl montaje que propone el colectivo es deliberadamente simple: un sensor de humedad de suelo, uno de temperatura y luz, una placa pequeña y una conexión a la red doméstica. El presupuesto cabe en lo que cuesta una bandeja de plántulas.\n\nEl panel de lectura evita los tecnicismos a propósito. No muestra curvas ni unidades: muestra si hay que regar hoy, si la planta está recibiendo poca luz y si la temperatura nocturna bajó demasiado.\n\nEsa decisión de diseño es la que más discuten dentro del grupo. Simplificar ayuda a quien empieza y estorba a quien ya sabe, y todavía no encuentran la forma de servir a ambos sin duplicar la interfaz.",
    "categoria": "Innovación",
    "autor": "Lucía Ferrer",
    "fecha": "2026-08-26",
    "imagen": "assets/img/noticias/n-018.jpg",
    "destacada": false,
    "tiempoLectura": 4,
    "fuente": "",
    "credito": {
      "titulo": "5685473534_678435312b_o",
      "autor": "USDAgov",
      "licencia": "Dominio público",
      "url": "https://www.flickr.com/photos/41284017@N08/6302442363",
      "busqueda": "rooftop vegetable garden"
    }
  }
];
