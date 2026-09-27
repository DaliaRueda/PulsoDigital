# Especificación funcional — Pulso Digital

**Entrega 1 — Maquetación (Semana 3)**
Documento de apoyo. Su contenido se integra en los capítulos 5, 6 y 8 del informe APA.

---

## 1. Propósito del aplicativo

Pulso Digital es una plataforma web tipo periódico digital especializada en noticias de
tecnología e innovación. Permite al usuario explorar un catálogo de noticias, leer su contenido
completo, guardar las que le interesan en una lista personal, publicar y eliminar noticias, y
comunicarse con la redacción mediante un formulario de contacto.

**Usuario objetivo:** lector general interesado en tecnología, sin necesidad de registro ni
autenticación. Toda la personalización se resuelve en el propio navegador.

---

## 2. Requerimientos funcionales

| ID | Requerimiento | Vista | Origen (PDF) |
|---|---|---|---|
| RF-01 | El sistema muestra un catálogo de noticias en formato de tarjetas con imagen, título, descripción breve y botón "Ver más" | Home, Listado | Característica 1 |
| RF-02 | El sistema permite filtrar el catálogo por categoría | Listado | Complemento |
| RF-03 | El sistema permite buscar noticias por título o contenido | Listado | Complemento |
| RF-04 | El sistema muestra el detalle de una noticia con su información completa e imagen representativa | Detalle | Característica 2 |
| RF-05 | El sistema permite agregar o quitar una noticia de favoritos desde la card y desde el detalle | Listado, Detalle | Características 2 y 3 |
| RF-06 | El sistema muestra la lista personalizada de favoritos del usuario | Favoritos | Característica 3 |
| RF-07 | Los favoritos persisten entre sesiones mediante `localStorage` | Transversal | Característica 3 |
| RF-08 | El Home presenta header con navegación, sección de bienvenida, noticias destacadas, llamados a la acción y footer | Home | Característica 4 |
| RF-09 | El menú de navegación ofrece acceso a un mínimo de cinco páginas | Transversal | Ideas para el Home |
| RF-10 | El formulario de contacto valida campos obligatorios y formato de correo electrónico | Contacto | Característica 5 |
| RF-11 | El formulario de contacto muestra un mensaje de confirmación tras un envío válido | Contacto | Característica 5 |
| RF-12 | El sistema permite crear nuevas noticias mediante un formulario | Publicar | Característica 6 |
| RF-13 | El sistema permite eliminar noticias existentes con confirmación previa | Publicar | Característica 6 |
| RF-14 | Las noticias base se cargan desde un archivo JSON local | Transversal | Tecnologías recomendadas |
| RF-15 | El sistema muestra un estado vacío informativo cuando no hay resultados o favoritos | Listado, Favoritos | Complemento |

## 3. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | Diseño responsive funcional en móvil (<576 px), tablet (576–991 px) y escritorio (≥992 px) |
| RNF-02 | Las páginas deben poder visualizarse en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari) |
| RNF-03 | HTML semántico y accesibilidad básica: textos alternativos, etiquetas asociadas a los campos, foco visible, contraste mínimo AA |
| RNF-04 | Código estructurado por responsabilidad, comentado y sin variables globales |
| RNF-05 | Tiempo de carga inicial inferior a 3 segundos con imágenes optimizadas |
| RNF-06 | Coherencia visual estricta con el sistema de diseño definido (color, tipografía, espaciado) |
| RNF-07 | Control de versiones en GitHub con historial de commits descriptivos |

---

## 4. Descripción de las vistas

### 4.1 Home (`index.html`)

**Objetivo:** dar la bienvenida, comunicar la propuesta del medio y dirigir al catálogo.

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Header | Logotipo "Pulso Digital", menú de navegación (Inicio, Noticias, Favoritos, Publicar, Contacto, Acerca de), contador de favoritos, botón de menú hamburguesa en móvil | El enlace de la página activa se resalta. El contador lee `pd_favoritos` y se actualiza al cambiar |
| Hero de bienvenida | Antetítulo, titular, párrafo descriptivo y botones "Explorar noticias" y "Contactar a la redacción" | Los botones son llamados a la acción que navegan al listado y a contacto |
| Noticias destacadas | Tres cards con imagen, badge de categoría, título, resumen, fecha, tiempo de lectura, botón "Ver más" e icono de favorito | Se generan dinámicamente desde el JSON filtrando `destacada: true`. "Ver más" abre el detalle; el icono alterna el favorito |
| Franja CTA | Franja oscura sobre la lista personal con los botones "Ver mis favoritos" y "Explorar el archivo" | Dirige a Favoritos y al catálogo completo. El enlace "Ver todas las noticias" vive en la cabecera de la sección de destacadas |
| Sección informativa | Tres bloques con icono, título y texto: "Dos fuentes, siempre", "Titulares sin anzuelo" y "Tu lista es tuya" | Contenido estático que explica la línea editorial y anticipa el funcionamiento de favoritos. Cubre el requisito "testimonios o sección informativa" |
| Footer | Descripción breve, enlaces rápidos, categorías, información de contacto (correo, teléfono, ciudad), redes sociales, aviso de copyright | Información de contacto visible en todas las páginas |

### 4.2 Listado de noticias (`noticias.html`)

**Objetivo:** permitir explorar y encontrar noticias.

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Encabezado de sección | Título "Todas las noticias" y contador de resultados | El contador refleja los filtros aplicados |
| Barra de búsqueda | Campo de texto con icono de lupa | Filtra en tiempo real por título y contenido, sin distinguir mayúsculas ni acentos |
| Filtros de categoría | Chips: Todas, Inteligencia Artificial, Startups, Software, Hardware, Ciberseguridad, Innovación | Un solo chip activo a la vez; se combina con la búsqueda |
| Orden | Selector: más recientes, más antiguas, A–Z | Reordena la grilla sin recargar |
| Grilla de cards | Cards idénticas a las del Home, en 3 columnas (escritorio), 2 (tablet), 1 (móvil) | Render dinámico desde el JSON más las noticias creadas por el usuario, menos las eliminadas |
| Estado vacío | Ilustración, mensaje "No encontramos noticias" y botón "Limpiar filtros" | Se muestra cuando el resultado es cero |
| Paginación | Controles numéricos, 6 noticias por página | Navegación entre páginas del catálogo |

### 4.3 Detalle de la noticia (`detalle.html?id=`)

**Objetivo:** entregar la información completa e invitar a interactuar.

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Migas de pan | Inicio › Noticias › Categoría › Título | Navegación de retorno |
| Cabecera del artículo | Badge de categoría, titular, autor, fecha, tiempo de lectura | Datos tomados del objeto noticia |
| Imagen de portada | Imagen representativa a ancho completo con pie de foto | `alt` descriptivo obligatorio |
| Cuerpo | Contenido completo en párrafos, cita destacada y etiquetas temáticas; ancho de lectura de 680 px (~75 caracteres) | Render del campo `contenido` |
| Barra de acciones | Botón "Añadir a favoritos" (alterna a "En favoritos"), botón "Contactar a la redacción", botones de compartir | El botón de favorito escribe en `localStorage` y cambia de estado sin recargar; "Contactar" lleva al formulario con el asunto precargado |
| Noticias relacionadas | Tres cards de la misma categoría | Excluye la noticia actual |

### 4.4 Contacto (`contacto.html`)

**Objetivo:** canal de comunicación con validaciones.

| Campo | Tipo | Reglas de validación |
|---|---|---|
| Nombre completo | Texto | Obligatorio, mínimo 3 caracteres, solo letras y espacios |
| Correo electrónico | Email | Obligatorio, formato válido (`usuario@dominio.ext`) |
| Asunto | Select | Obligatorio; opciones: consulta general, sugerencia de noticia, reportar error, colaborar |
| Mensaje | Textarea | Obligatorio, entre 10 y 500 caracteres, con contador visible |
| Autorización de datos | Checkbox | Obligatorio |

**Comportamiento:** la validación se dispara al perder el foco y al enviar. Los campos inválidos
muestran borde rojo y mensaje de error bajo el campo. Con el formulario válido se guarda el
mensaje en `pd_mensajes_contacto`, se muestra una alerta verde de confirmación y se limpia el
formulario. Junto al formulario se presenta un panel con correo, teléfono, dirección, horario de
atención y un mapa de referencia.

### 4.5 Favoritos (`favoritos.html`)

**Objetivo:** mostrar la lista personalizada del usuario.

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Encabezado | Título "Mis favoritos" y contador | Lee los identificadores de `pd_favoritos` |
| Lista | Cards con botón "Quitar de favoritos" | Al quitar, la card desaparece con una transición y el contador se actualiza |
| Acciones | Botón "Vaciar lista" con confirmación | Limpia `pd_favoritos` |
| Estado vacío | Mensaje "Aún no tienes favoritos" y botón "Explorar noticias" | Se muestra cuando la lista está vacía |

### 4.6 Publicar / Gestionar (`publicar.html`)

**Objetivo:** cubrir el mini CRUD exigido.

| Zona | Elementos | Funcionalidad |
|---|---|---|
| Formulario de creación | Título, resumen, contenido, categoría (select), autor, ruta de imagen, casilla "Destacada" | Valida campos obligatorios, longitud mínima del contenido y formato de la ruta de imagen. Al guardar, añade la noticia a `pd_noticias_creadas` y muestra una notificación de éxito |

> **Ajuste respecto al mockup.** En la maquetación el campo de imagen aparece marcado como
> obligatorio. En el desarrollo se dejó **opcional**: el aplicativo no tiene forma de subir
> archivos, así que exigir una ruta que la usuaria no puede obtener bloquearía el mini CRUD que
> la guía pide. Si se deja vacío, la noticia usa un marcador de imagen; si se escribe algo, se
> valida que termine en una extensión de imagen.
| Vista previa | Card que refleja lo escrito | Se actualiza mientras el usuario escribe |
| Tabla de gestión | Columnas: imagen, título, categoría, fecha, origen (base o creada), acciones | Lista las noticias visibles más recientes, con el mismo criterio de paginación del catálogo |
| Eliminar | Botón por fila | Pide confirmación en un modal. Si la noticia fue creada por el usuario se borra de `pd_noticias_creadas`; si pertenece al JSON base, su identificador se añade a `pd_noticias_eliminadas` |
| Restaurar | Botón "Restaurar noticias base" | Vacía `pd_noticias_eliminadas` |

### 4.7 Acerca de (`acerca.html`)

Misión del medio, línea editorial, equipo, tecnologías utilizadas y preguntas frecuentes.
Cumple el requisito de "testimonios o sección informativa" y aporta la quinta página del menú.

---

## 5. Flujos de usuario

**Flujo 1 — Explorar y guardar**
Home → clic en "Explorar noticias" → Listado → filtra por categoría → clic en "Ver más" →
Detalle → clic en "Añadir a favoritos" → el contador del header aumenta → Favoritos → ve su lista.

**Flujo 2 — Contactar desde una noticia**
Detalle → clic en "Contactar a la redacción" → Contacto con el asunto precargado → completa el
formulario → validación → mensaje de confirmación.

**Flujo 3 — Publicar y eliminar**
Publicar → completa el formulario y ve la vista previa → guarda → la noticia aparece en el
Listado → vuelve a Publicar → elimina desde la tabla con confirmación → desaparece del Listado.

---

## 6. Mapa de navegación

```
                    ┌──────────────┐
                    │  Home (/)    │
                    └──────┬───────┘
      ┌────────────┬───────┼────────┬────────────┬──────────┐
      ▼            ▼       ▼        ▼            ▼          ▼
 ┌─────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ ┌────────┐
 │ Noticias│ │Favoritos │ │Publicar│ │Contacto │ │Acerca  │
 └────┬────┘ └────┬─────┘ └────────┘ └─────────┘ └────────┘
      │           │
      ▼           ▼
 ┌────────────────────┐
 │ Detalle (?id=n-00X)│──► Favoritos / Contacto
 └────────────────────┘
```

---

## 7. Trazabilidad requisito → mockup

| Característica del PDF | Mockup que la evidencia |
|---|---|
| 1. Visualización de noticias | Home (destacadas) y Listado |
| 2. Detalle de la noticia | Detalle |
| 3. Gestión de favoritos | Favoritos + botón en Listado y Detalle |
| 4. Página de inicio | Home |
| 5. Página de contacto | Contacto |
| 6. Mini CRUD | Publicar / Gestionar |
