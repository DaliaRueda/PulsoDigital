# Informe — Entrega 1: Maquetación

> **Cómo usar este borrador.** Copia el contenido a Word o Google Docs aplicando el formato APA 7
> descrito en `docs/recursos/referencias-apa.md` (Times New Roman 12 pt, interlineado doble,
> márgenes de 2,54 cm, sangría de primera línea de 1,27 cm, numeración desde la portada) y
> expórtalo a PDF. Reemplaza todo lo que aparece entre corchetes `[...]` e inserta las imágenes
> donde se indica «FIGURA». Los títulos marcados con `#` y `##` corresponden a los niveles 1 y 2
> de APA.

---

## PORTADA

*(Página independiente, todo centrado, sin número de sección)*

**Pulso Digital: maquetación de una plataforma web de noticias de tecnología e innovación**

Dalia Johanna Rueda Tangarife

Facultad de Ingeniería, Diseño e Innovación, Politécnico Grancolombiano

Ingeniería de Software

Virtual / Front End

Tutor: John Olarte

13 de septiembre de 2026

---

## TABLA DE CONTENIDO

*(Generar automáticamente en el procesador de texto a partir de los estilos de título)*

1. Introducción
2. Descripción del proyecto
3. Objetivos
3. Requerimientos del aplicativo
4. Arquitectura de información y mapa de navegación
5. Sistema de diseño
7. Maquetación de las vistas
8. Flujos de usuario
9. Cronograma de las entregas siguientes
10. Conclusiones
11. Referencias

---

# 1. Introducción

El presente documento corresponde a la primera entrega del módulo Desarrollo de Front-end y
contiene la propuesta de maquetación de *Pulso Digital*, una plataforma web de noticias de
tecnología e innovación. La entrega responde a la solicitud de elaborar los mockups de las
vistas principales del aplicativo y describir en detalle su funcionalidad y los elementos que
las integran.

Antes de escribir la primera línea de código conviene definir cómo se organizará la información
en pantalla. En ese sentido, los mockups cumplen una función análoga a la de los planos en
arquitectura: «Los mockups son bocetos en los que se presenta cómo se va a mostrar la información
en una página web o en una aplicación. En este sentido podríamos decir que es el equivalente a
los planos que elaboran los arquitectos a la hora de construir un edificio» (Linube, 2023).

El documento se organiza en tres bloques. El primero establece qué debe hacer el aplicativo
(objetivos y requerimientos). El segundo define cómo se estructura y cómo se ve (arquitectura de
información y sistema de diseño). El tercero presenta la maquetación de cada vista acompañada de
la descripción de sus elementos y de los flujos de usuario que conectan unas pantallas con otras.
La redacción, las citas y las referencias siguen el manual de la American Psychological
Association (2020) en su séptima edición.

---

# 2. Descripción del proyecto

*Pulso Digital* es una aplicación web tipo periódico digital, especializada en noticias de
tecnología e innovación. Permite a cualquier visitante explorar un catálogo de noticias
presentadas en tarjetas, consultar el contenido completo de cada una, guardar las que le
interesan en una lista personal, publicar y eliminar noticias, y comunicarse con la redacción
mediante un formulario de contacto.

El aplicativo está pensado para un lector general interesado en tecnología, sin conocimientos
técnicos previos. Una decisión central del proyecto es que **no requiere registro ni
autenticación**: toda la personalización —la lista de favoritos y las noticias creadas por el
usuario— se resuelve en el propio navegador mediante la API `localStorage`. Esta decisión
simplifica la experiencia y a la vez cumple el requisito del módulo de evidenciar el uso de
almacenamiento local del lado del cliente.

El proyecto se desarrolla en tres entregas sucesivas: la maquetación (este documento), un
prototipo funcional en HTML, CSS y JavaScript, y una versión final implementada en Angular y
desplegada en un servidor gratuito.

---

# 3. Objetivos

## 3.1 Objetivo general

Diseñar la maquetación completa de una plataforma web de noticias que permita visualizar un
catálogo, consultar el detalle de cada nota, gestionar una lista de favoritos, contactar a la
redacción y administrar el contenido, sirviendo como plano de construcción para las fases de
desarrollo posteriores.

## 3.2 Objetivos específicos

1. Identificar y documentar los requerimientos funcionales y no funcionales del aplicativo a
   partir de la guía del módulo.
2. Definir la arquitectura de información y el mapa de navegación del sitio.
3. Establecer un sistema de diseño coherente (color, tipografía, grilla y componentes) que guíe
   la implementación posterior.
4. Elaborar los mockups de alta fidelidad de las vistas principales, incluidos sus estados
   alternos (listado vacío, errores de validación y confirmaciones).
5. Describir en detalle los elementos y la funcionalidad de cada vista, de modo que el desarrollo
   de la Entrega 2 pueda ejecutarse sin ambigüedades.

---

# 4. Requerimientos del aplicativo

## 4.1 Requerimientos funcionales

La Tabla 1 recoge los quince requerimientos funcionales identificados y la vista
en la que se manifiesta cada uno.

**Tabla 1**

*Requerimientos funcionales del aplicativo*

| ID | Requerimiento | Vista |
|---|---|---|
| RF-01 | Mostrar un catálogo de noticias en tarjetas con imagen, título, descripción breve y botón «Ver más» | Home, Listado |
| RF-02 | Filtrar el catálogo por categoría | Listado |
| RF-03 | Buscar noticias por título o contenido | Listado |
| RF-04 | Mostrar el detalle de una noticia con su información completa e imagen representativa | Detalle |
| RF-05 | Agregar o quitar una noticia de favoritos desde la tarjeta y desde el detalle | Listado, Detalle |
| RF-06 | Mostrar la lista personalizada de favoritos | Favoritos |
| RF-07 | Conservar los favoritos entre sesiones mediante `localStorage` | Transversal |
| RF-08 | Presentar en el Home encabezado con navegación, bienvenida, noticias destacadas, llamados a la acción y pie de página | Home |
| RF-09 | Ofrecer un menú de navegación con un mínimo de cinco páginas | Transversal |
| RF-10 | Validar en el formulario de contacto los campos obligatorios y el formato del correo electrónico | Contacto |
| RF-11 | Mostrar un mensaje de confirmación tras un envío válido | Contacto |
| RF-12 | Crear nuevas noticias mediante un formulario | Publicar |
| RF-13 | Eliminar noticias existentes con confirmación previa | Publicar |
| RF-14 | Cargar las noticias base desde un archivo JSON local | Transversal |
| RF-15 | Mostrar un estado vacío informativo cuando no hay resultados o favoritos | Listado, Favoritos |

*Nota.* Elaboración propia a partir de las orientaciones del módulo.

## 4.2 Requerimientos no funcionales

La Tabla 2 reúne los requerimientos no funcionales, que condicionan cómo debe
comportarse el aplicativo antes que lo que debe hacer.

**Tabla 2**

*Requerimientos no funcionales del aplicativo*

| ID | Requerimiento |
|---|---|
| RNF-01 | Diseño adaptable en móvil (< 576 px), tableta (576–991 px) y escritorio (≥ 992 px) |
| RNF-02 | Visualización correcta en los navegadores web modernos de mayor uso |
| RNF-03 | HTML semántico y accesibilidad básica conforme a las pautas WCAG 2.2 (W3C, 2023) |
| RNF-04 | Código estructurado por responsabilidad, comentado y sin variables globales |
| RNF-05 | Tiempo de carga inicial inferior a tres segundos con imágenes optimizadas |
| RNF-06 | Coherencia visual estricta con el sistema de diseño definido |
| RNF-07 | Control de versiones en GitHub con historial de cambios descriptivo |

*Nota.* Elaboración propia.

## 4.3 Trazabilidad con la guía del módulo

La Tabla 3 cruza cada una de las seis características exigidas por la guía del
módulo con la vista que la evidencia.

**Tabla 3**

*Correspondencia entre las características exigidas y las vistas maquetadas*

| Característica exigida | Vista que la evidencia |
|---|---|
| 1. Visualización de noticias | Home (destacadas) y Listado |
| 2. Detalle de la noticia | Detalle |
| 3. Gestión de favoritos | Favoritos, más el control de favorito en Listado y Detalle |
| 4. Página de inicio | Home |
| 5. Página de contacto | Contacto |
| 6. Gestión básica de noticias (mini CRUD) | Publicar / Gestionar |

*Nota.* Elaboración propia a partir de las orientaciones del módulo.

---

# 5. Arquitectura de información y mapa de navegación

El aplicativo se organiza en siete vistas. Seis de ellas son accesibles desde el menú principal,
con lo que se supera el mínimo de cinco páginas solicitado; la séptima, el detalle de la noticia,
se alcanza desde cualquier tarjeta.

La Tabla 4 detalla las siete vistas, su archivo en la Entrega 2, su ruta en la
Entrega 3 y su presencia en el menú.

**Tabla 4**

*Vistas del aplicativo*

| Vista | Archivo (Entrega 2) | Ruta (Entrega 3) | En el menú | Propósito |
|---|---|---|---|---|
| Inicio | `index.html` | `/` | Sí | Bienvenida, destacadas, llamados a la acción |
| Noticias | `noticias.html` | `/noticias` | Sí | Catálogo con búsqueda y filtros |
| Detalle | `detalle.html?id=` | `/noticias/:id` | No | Nota completa y acciones |
| Favoritos | `favoritos.html` | `/favoritos` | Sí | Lista personalizada |
| Publicar | `publicar.html` | `/publicar` | Sí | Crear y eliminar noticias |
| Contacto | `contacto.html` | `/contacto` | Sí | Formulario validado |
| Acerca de | `acerca.html` | `/acerca` | Sí | Línea editorial e información del proyecto |

*Nota.* Elaboración propia.

La Figura 1 muestra cómo se conectan esas vistas entre sí.

**Figura 1**

*Mapa de navegación del aplicativo*

```
                          ┌──────────────┐
                          │   Inicio     │
                          └──────┬───────┘
        ┌────────────┬───────────┼────────────┬────────────┐
        ▼            ▼           ▼            ▼            ▼
   ┌─────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐
   │ Noticias│ │ Favoritos │ │ Publicar │ │ Contacto │ │ Acerca  │
   └────┬────┘ └─────┬─────┘ └──────────┘ └──────────┘ └─────────┘
        │            │
        ▼            ▼
   ┌──────────────────────┐
   │ Detalle de la noticia│───► Favoritos · Contacto
   └──────────────────────┘
```

*Nota.* Elaboración propia.

## 5.1 Modelo de datos

Las noticias se almacenan en un archivo JSON local. Cada objeto contiene los campos `id`,
`titulo`, `resumen`, `contenido`, `categoria`, `autor`, `fecha`, `imagen`, `destacada`,
`tiempoLectura` y `fuente`. Las categorías definidas son: Inteligencia Artificial, Startups,
Software, Hardware, Ciberseguridad e Innovación.

Dado que una página web no puede escribir en un archivo del servidor, el mini CRUD se resuelve
combinando el JSON base con tres claves de almacenamiento local. El listado que finalmente ve el
usuario se calcula así:

> noticias visibles = `noticias.json` − noticias marcadas como eliminadas + noticias creadas

La Tabla 5 describe las cuatro claves empleadas.

**Tabla 5**

*Claves de almacenamiento local*

| Clave | Contenido |
|---|---|
| `pd_favoritos` | Identificadores de las noticias guardadas |
| `pd_noticias_creadas` | Noticias creadas por el usuario |
| `pd_noticias_eliminadas` | Identificadores ocultos del archivo base |
| `pd_mensajes_contacto` | Mensajes enviados desde el formulario |

*Nota.* Elaboración propia. Sobre el funcionamiento de esta API, véase MDN Web Docs (2026).

---

# 6. Sistema de diseño

La dirección visual elegida es la de un **periódico editorial contemporáneo**: fondo de papel
cálido, tinta casi negra y un único color de señal. Se descartó una paleta azul con degradados
—habitual en los sitios de tecnología— por dos razones: resta identidad al medio y pierde
legibilidad al imprimirse. La paleta propuesta conserva el contraste en escala de grises.

La Tabla 6 recoge la paleta completa con el código de cada color y su uso.

**Tabla 6**

*Paleta de color*

| Variable | Valor | Uso |
|---|---|---|
| `--ink` | `#14161A` | Texto principal, franja superior y pie de página |
| `--ink-soft` | `#2B2F36` | Cuerpo del artículo |
| `--paper` | `#FAF8F5` | Fondo de página |
| `--surface` | `#FFFFFF` | Tarjetas, formularios y tablas |
| `--accent` | `#D6303C` | Acción primaria, categoría y estado de error |
| `--accent-soft` | `#FBE9EA` | Fondo de etiquetas y avisos |
| `--muted` | `#6B6F76` | Metadatos y textos de ayuda |
| `--border` | `#E4E0DA` | Bordes y separadores |

*Nota.* Elaboración propia.

**Tipografía.** Los titulares emplean *Space Grotesk* en peso 700, una tipografía geométrica que
aporta carácter técnico; el texto corrido y la interfaz emplean *IBM Plex Sans* en pesos 400, 500
y 600, de alta legibilidad en pantalla. Se declara una pila de reserva con `Segoe UI` y
`system-ui`.

**Escala tipográfica.** Titular de página 46–58 px; título de sección 28–38 px; título de tarjeta
20 px; texto base 16 px con interlineado 1,65; cuerpo del artículo 18 px con interlineado 1,78;
metadatos 12,5–13 px; antetítulo 11 px en versalitas con espaciado de 0,16 em.

**Grilla y espaciado.** Rejilla de 12 columnas con contenedor de 1200 px y medianil de 24 a 28 px
dentro de un lienzo de 1440 px. Los radios de borde se mantienen entre 2 y 3 px para sostener el
lenguaje impreso. Los botones miden 48 px de alto y los campos de formulario también, de modo que
el área táctil supera el mínimo recomendado en dispositivos móviles.

**Componentes definidos.** Encabezado con franja de fecha, cabecera con logotipo y barra de
navegación; tarjeta de noticia; etiqueta de categoría; botón primario, secundario y de icono;
chip de filtro; campo de formulario con sus estados de reposo, válido y con error; aviso de
confirmación; tabla de gestión; estado vacío; ventana modal de confirmación, y pie de página.

---

# 7. Maquetación de las vistas

Los mockups se elaboraron a alta fidelidad sobre un lienzo de 1440 px de ancho. Los bloques
rayados que aparecen en las imágenes son **marcadores de imagen**: indican la posición, la
proporción y el tamaño que ocuparán las fotografías reales en la Entrega 2. Los titulares,
autores y datos de contacto son contenido de ejemplo.

Cada lámina se presenta con tres marcas que no forman parte de la interfaz y que desaparecen en el
desarrollo: una **cinta de identificación** en la parte superior con el número y el nombre de la
vista y el ancho del lienzo; **etiquetas de zona** en el margen izquierdo, que nombran cada banda
de la página y permiten referirse a ellas en las tablas de este apartado; y una **cota** al pie
que recuerda las medidas de la retícula. Su función es la misma que la de las acotaciones en un
plano: describir el diseño sin formar parte de lo que se construye.

> **Herramienta utilizada:** Canvas de Claude Design.

## 7.1 Inicio (Home)

La Figura 2 presenta la maquetación de la página de inicio.

**Figura 2**

*Mockup de la página de inicio*

> FIGURA: insertar `docs/entrega-1/mockups/01-inicio`

*Nota.* Elaboración propia.

La Tabla 7 describe sus zonas, los elementos que contiene cada una y su
funcionalidad.

**Tabla 7**

*Elementos de la página de inicio*

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Franja superior | Fecha del día y línea editorial | Refuerza el carácter periodístico del medio |
| Cabecera | Logotipo con marca de pulso, buscador y acceso a favoritos con contador | El contador lee `pd_favoritos` y se actualiza al agregar o quitar una noticia |
| Barra de navegación | Inicio, Noticias, Favoritos, Publicar, Contacto y Acerca de | La página activa se resalta con color de acento y subrayado |
| Bienvenida | Antetítulo, titular, párrafo introductorio y dos botones de acción | «Explorar noticias» lleva al listado; «Contactar a la redacción» lleva al formulario |
| Noticia de portada | Imagen destacada, etiquetas «Portada» y de categoría, titular, entradilla, autoría y enlace «Ver más» | Corresponde a la primera noticia marcada como destacada en el JSON |
| Noticias destacadas | Tres tarjetas con imagen, categoría, titular, resumen, fecha, tiempo de lectura, icono de favorito y enlace «Ver más» | Se generan dinámicamente filtrando el campo `destacada`. El icono alterna el estado de favorito sin recargar la página |
| Llamado a la acción | Franja oscura con mensaje sobre la lista personal y dos botones | Dirige a Favoritos y al archivo completo |
| Sección informativa | Tres bloques con icono y texto sobre la línea editorial | Cubre el requisito de «testimonios o sección informativa» y anticipa el funcionamiento de los favoritos |
| Pie de página | Descripción del medio, enlaces rápidos, categorías, datos de contacto y redes sociales | Mantiene la información de contacto visible en todas las páginas |

*Nota.* Elaboración propia.

## 7.2 Listado de noticias

La Figura 3 presenta la maquetación del listado de noticias.

**Figura 3**

*Mockup del listado de noticias*

> FIGURA: insertar `docs/entrega-1/mockups/02-listado`

*Nota.* Elaboración propia.

La Tabla 8 describe sus zonas y su funcionalidad.

**Tabla 8**

*Elementos del listado de noticias*

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Encabezado | Título «Todas las noticias» y contador de resultados | El contador refleja los filtros activos |
| Búsqueda | Campo con icono de lupa | Filtra en tiempo real por titular y contenido, sin distinguir mayúsculas ni acentos |
| Orden | Selector de orden | Más recientes, más antiguas o alfabético |
| Filtros | Chips de categoría, con «Todas» activo por defecto | Solo un chip activo a la vez; se combina con la búsqueda |
| Grilla | Tarjetas en tres columnas en escritorio, dos en tableta y una en móvil | Render dinámico del JSON más las noticias creadas, menos las eliminadas |
| Paginación | Controles numéricos, seis noticias por página | Navegación entre páginas del archivo |
| Estado vacío | Icono, mensaje y botón «Limpiar filtros» | Se muestra cuando ninguna noticia coincide con la búsqueda |

*Nota.* Elaboración propia. El estado vacío aparece al final del mockup marcado como variante;
no es una pantalla independiente.

## 7.3 Detalle de la noticia

La Figura 4 presenta la maquetación del detalle de la noticia.

**Figura 4**

*Mockup del detalle de la noticia*

> FIGURA: insertar `docs/entrega-1/mockups/03-detalle`

*Nota.* Elaboración propia.

La Tabla 9 describe sus zonas y su funcionalidad.

**Tabla 9**

*Elementos del detalle de la noticia*

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Migas de pan | Inicio › Noticias › Categoría › Titular | Permiten volver a cualquier nivel anterior |
| Cabecera del artículo | Etiqueta de categoría, titular, entradilla, autoría, fecha, tiempo de lectura y botones de compartir | Los datos provienen del objeto noticia |
| Imagen representativa | Imagen a todo el ancho del contenedor con pie de foto | Requiere texto alternativo descriptivo |
| Cuerpo | Párrafos con ancho de lectura limitado, cita destacada y etiquetas temáticas | Render del campo `contenido` |
| Panel de interacción | Botón de favorito y botón «Contactar a la redacción» | El botón de favorito escribe en `localStorage` y alterna entre «Añadir a favoritos» y «En favoritos» sin recargar la página; el mockup lo presenta en estado activo y documenta el estado alterno debajo. «Contactar a la redacción» abre el formulario con el asunto precargado |
| Ficha de la noticia | Categoría, autor, fecha de publicación, duración de lectura e identificador | Resume los metadatos de la nota |
| Noticias relacionadas | Tres tarjetas de la misma categoría | Excluye la noticia que se está leyendo |

*Nota.* Elaboración propia.

## 7.4 Contacto

La Figura 5 presenta la maquetación de la página de contacto.

**Figura 5**

*Mockup de la página de contacto*

> FIGURA: insertar `docs/entrega-1/mockups/04-contacto`

*Nota.* Elaboración propia.

El mockup muestra el formulario con las validaciones activas para documentar el comportamiento
esperado: el campo de nombre en estado válido, el de correo con un error de formato y el de
mensaje con un error de campo obligatorio.

La Tabla 10 recoge los campos del formulario y sus reglas de validación.

**Tabla 10**

*Campos y reglas de validación del formulario de contacto*

| Campo | Tipo | Reglas |
|---|---|---|
| Nombre completo | Texto | Obligatorio, mínimo 3 caracteres, solo letras y espacios |
| Correo electrónico | Correo | Obligatorio, formato `usuario@dominio.ext` |
| Asunto | Lista desplegable | Obligatorio. Opciones: consulta general, sugerencia de noticia, reportar un error, quiero colaborar |
| Mensaje | Área de texto | Obligatorio, entre 10 y 500 caracteres, con contador visible |
| Autorización de datos | Casilla de verificación | Obligatoria |

*Nota.* Elaboración propia.

La validación se dispara al salir de cada campo y al pulsar «Enviar mensaje». Los campos
inválidos muestran borde de acento y un mensaje de error debajo. Cuando el formulario es válido,
el mensaje se guarda en `pd_mensajes_contacto`, se presenta un aviso verde de confirmación que
retoma el nombre y el asunto indicados, y el formulario se limpia. Junto al formulario se
presenta un panel oscuro con correo, teléfono, dirección y horario de atención, además de un
mapa de referencia.

## 7.5 Favoritos

La Figura 6 presenta la maquetación de la lista de favoritos.

**Figura 6**

*Mockup de la lista de favoritos*

> FIGURA: insertar `docs/entrega-1/mockups/05-favoritos`

*Nota.* Elaboración propia.

La lista adopta una disposición horizontal —miniatura, datos de la nota y acciones— que la
diferencia visualmente del catálogo y comunica que se trata de una selección personal. Cada fila
ofrece «Ver más» y «Quitar de favoritos»; el encabezado incluye el botón «Vaciar lista». Un aviso
explica que la lista reside únicamente en ese navegador y ese dispositivo. El mockup incluye
además la variante de lista vacía, con un mensaje orientador y un botón que devuelve al catálogo.

## 7.6 Publicar y gestionar noticias

La Figura 7 presenta la maquetación de la vista de publicación y gestión.

**Figura 7**

*Mockup de la vista de publicación y gestión*

> FIGURA: insertar `docs/entrega-1/mockups/06-publicar`

*Nota.* Elaboración propia.

Esta vista resuelve el mini CRUD solicitado. El formulario de creación pide titular, categoría,
autor, descripción breve, contenido completo y dirección de la imagen, e incluye una casilla para
marcar la noticia como destacada; los campos de texto muestran contador de caracteres y el campo
de imagen aparece en estado de error para documentar esa validación. A la derecha, una vista
previa reproduce la tarjeta tal como se verá en el catálogo y se actualiza mientras se escribe.

Debajo, una tabla lista las noticias visibles con su origen —«Base» si proviene del archivo JSON
o «Creada» si la añadió el usuario— y un botón de eliminación por fila. La eliminación pasa
siempre por una ventana modal de confirmación que cita el titular afectado. El botón «Restaurar
noticias base» revierte las eliminaciones sobre el archivo original.

## 7.7 Acerca de

La séptima vista del aplicativo no se maquetó como pantalla independiente porque se compone
íntegramente de elementos ya definidos en los mockups anteriores: la cabecera, la barra de
navegación, bloques de texto con la misma retícula de la sección informativa del Inicio y el pie
de página. Su contenido —misión del medio, línea editorial, equipo, tecnologías utilizadas y
preguntas frecuentes— se implementará en la Entrega 2. La guía
del módulo exige la maquetación de cuatro vistas (Inicio, Listado, Detalle y Contacto); esta
entrega presenta seis.

---

# 8. Flujos de usuario

**Flujo 1. Explorar y guardar una noticia.** El usuario llega al Inicio, pulsa «Explorar
noticias», filtra el catálogo por una categoría, abre una nota con «Ver más», la añade a
favoritos desde el panel de interacción —el contador de la cabecera aumenta— y consulta su lista
en Favoritos.

**Flujo 2. Contactar desde una noticia.** Desde el detalle, el usuario pulsa «Contactar a la
redacción». El formulario se abre con el asunto precargado; el usuario completa los campos,
recibe la validación en línea y, al enviar, obtiene el mensaje de confirmación.

**Flujo 3. Publicar y eliminar una noticia.** El usuario abre Publicar, completa el formulario
comprobando el resultado en la vista previa y guarda. La noticia aparece de inmediato en el
catálogo y en la tabla de gestión con la marca «Creada». Al eliminarla, el sistema pide
confirmación y la retira del listado.

---

# 9. Cronograma de las entregas siguientes

La Tabla 11 resume el cronograma previsto para las dos entregas siguientes.

**Tabla 11**

*Cronograma del proyecto*

| Semana | Hito | Producto |
|---|---|---|
| 3 | Entrega 1 — Maquetación | Mockups y este documento |
| 4 | Desarrollo en HTML, CSS y JavaScript | Código en el repositorio |
| 5 | Entrega 2 — Prototipo funcional | Aplicación funcional y documento |
| 6 | Migración a Angular y despliegue | Aplicación desplegada |
| 7 | Entrega 3 — Entrega final | Aplicación, documento y video explicativo |

*Nota.* Elaboración propia.

---

# 10. Conclusiones

1. La elaboración de los mockups permitió detectar decisiones que no eran evidentes en el
   enunciado del proyecto. La más relevante fue cómo resolver la eliminación de noticias
   provenientes de un archivo JSON, dado que el navegador no puede modificarlo: la solución
   adoptada —registrar los identificadores ocultos en el almacenamiento local y calcular el
   listado visible por diferencia— quedó definida antes de programar y evitará rehacer trabajo
   en la Entrega 2.

2. Documentar los estados alternos de cada vista (listado sin resultados, lista de favoritos
   vacía, errores de validación y confirmaciones) resultó tan importante como diseñar el estado
   normal. Mantener informado al usuario sobre el estado del sistema es la primera de las diez
   heurísticas de usabilidad de Nielsen (2020), y el estado vacío es justamente donde más se
   incumple: una pantalla en blanco no distingue entre «no hay resultados» y «algo falló».
   Estos estados suelen quedar fuera de la maquetación, lo que obliga a improvisarlos durante
   el desarrollo.

4. Definir un sistema de diseño explícito —paleta, escala tipográfica, grilla y componentes—
   antes de maquetar las pantallas produjo consistencia entre las seis vistas sin necesidad de
   corregirlas una por una, y constituye la base directa de la hoja de estilos de la Entrega 2.

5. La arquitectura de información de siete vistas, seis de ellas en el menú principal, cumple
   con holgura el mínimo de cinco páginas exigido y cubre las seis características obligatorias
   del proyecto, según se verifica en la Tabla 3.

6. La maquetación resultante es suficientemente detallada para servir como especificación de la
   Entrega 2, en la que se evaluará explícitamente la correspondencia entre el diseño propuesto
   y el desarrollo implementado.

---

# 11. Referencias

American Psychological Association. (2020). *Publication manual of the American Psychological
Association* (7.ª ed.). https://doi.org/10.1037/0000165-000

Linube. (2023). *¿Qué son los mockups?* https://linube.com/blog/que-son-los-mockups/

MDN Web Docs. (2026). *Window.localStorage*.
https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

Nielsen, J. (2020). *10 usability heuristics for user interface design*. Nielsen Norman Group.
https://www.nngroup.com/articles/ten-usability-heuristics/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/

---

## Lista de verificación antes de entregar

- [ ] Portada completa con todos los datos institucionales
- [ ] Tabla de contenido generada automáticamente
- [ ] Las seis figuras insertadas, numeradas y con su nota
- [ ] Todas las tablas numeradas, con título en cursiva y nota al pie
- [ ] Interlineado doble, márgenes de 2,54 cm y sangría de 1,27 cm
- [ ] Números de página en la esquina superior derecha
- [ ] Referencias en orden alfabético con sangría francesa
- [ ] Todas las marcas `[...]` reemplazadas
- [ ] Documento exportado a PDF
