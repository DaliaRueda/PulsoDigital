# Plan de Proyecto — Módulo Front End (Agosto 2026)

**Proyecto:** Pulso Digital — Plataforma Web de Noticias de Tecnología e Innovación
**Tutor:** John Olarte
**Estudiante:** Dalia Johanna Rueda Tangarife
**Institución / Programa:** Politécnico Grancolombiano · Facultad de Ingeniería, Diseño e Innovación · Ingeniería de Software
**Asignatura:** Virtual / Front End
**Modalidad:** `[PENDIENTE — individual o colaborativa]`

> Documento maestro. Define alcance, decisiones técnicas y el plan detallado de las 3 entregas
> exigidas en *"Orientaciones para las entregas del módulo Front End — Agosto 2026"*.

---

## 1. Resumen del requerimiento (fuente: PDF del tutor)

Aplicación web tipo periódico donde el usuario explora noticias, ve su detalle e interactúa
mediante favoritos y contacto. Debe evidenciar HTML, CSS, JavaScript y fundamentos de Angular.

### 1.1 Características obligatorias

| # | Característica | Requisito literal del PDF |
|---|---|---|
| 1 | Visualización de noticias | Catálogo en formato de **tarjetas (cards)** con: imagen, nombre, descripción breve, botón "ver más" |
| 2 | Detalle de la noticia | Información completa, imagen representativa, botón de interacción (favoritos o contacto) |
| 3 | Gestión de favoritos | Guardar noticias y ver lista personalizada. **Obligatorio: `localStorage` o `sessionStorage`** |
| 4 | Página de inicio (Home) | Header con menú de navegación, sección de bienvenida, noticias destacadas, CTA, footer |
| 5 | Página de contacto | Formulario con validaciones básicas (campos obligatorios, correo válido) + mensaje de confirmación |
| 6 | Mini CRUD de noticias | **Crear** nuevas noticias y **eliminar** noticias existentes |

### 1.2 Ideas para el Home (checklist del PDF)

- [ ] Encabezado atractivo con nombre del aplicativo
- [ ] Menú de navegación claro — **mínimo 5 páginas**
- [ ] Sección de noticias destacadas (cards dinámicas)
- [ ] Testimonios o sección informativa
- [ ] Botones de acción (ver servicios, contactar, explorar)
- [ ] Información de contacto visible

### 1.3 Tecnologías recomendadas por el PDF

HTML · CSS · JavaScript · Bootstrap **o** Tailwind · Angular (componentes y binding) ·
localStorage/sessionStorage · JSON local para manejo de datos.

### 1.4 Mecanismo de entrega (aplica a las 3 entregas)

- GitHub para control de versiones
- Despliegue en servidor gratuito (GitHub Pages / Netlify / Vercel)
- Entrega en **PDF con normas APA 7**
- Inclusión de URL del repositorio y del despliegue

---

## 2. Decisiones de proyecto (tomadas y justificadas)

| Decisión | Elección | Justificación |
|---|---|---|
| Temática | Tecnología e innovación | Permitido por el PDF; facilita contenido e imágenes realistas |
| Nombre del aplicativo | **Pulso Digital** — *"El latido de la innovación"* | Nombre corto, memorable, en español |
| Herramienta de mockups (E1) | Canvas de Claude Design (artboards editables, exportables a PNG/PDF) | El PDF dice "herramienta de su elección"; Figma es solo *recomendación* |
| Framework CSS | **Bootstrap 5.3 (CDN) + capa propia de design tokens** | El PDF exige que las páginas se vean abriéndolas en cualquier navegador. Tailwind por CDN es solo para desarrollo y el Tailwind real requiere build. Bootstrap funciona sin compilar y luego se instala por npm en Angular. Los tokens propios evitan el aspecto genérico de Bootstrap |
| Estrategia Angular (E3) | Migración completa del proyecto vanilla a Angular | Cumple "aplicación funcional completa" + "implementación en Angular"; la E2 se conserva intacta en el repo como evidencia histórica |
| Persistencia | `localStorage` (no `sessionStorage`) | Los favoritos y las noticias creadas deben sobrevivir al cierre del navegador |
| Origen de datos | `noticias.json` local + capa de overrides en localStorage | Cumple "JSON local para manejo de datos" y permite el mini CRUD sin backend |
| Despliegue | GitHub Pages (E2 estática) → Vercel o GitHub Pages (E3 Angular) | Gratuitos, aceptados explícitamente por el PDF |
| Normas | APA 7.ª edición | Exigido en E1 y E3; recomendable en E2 |

---

## 3. Arquitectura de información (7 vistas)

| Vista | Archivo (E2) | Ruta (E3 Angular) | En menú | Propósito |
|---|---|---|---|---|
| Home | `index.html` | `/` | Sí | Bienvenida, destacadas, CTA, sección informativa |
| Noticias (listado) | `noticias.html` | `/noticias` | Sí | Catálogo completo con filtro por categoría y búsqueda |
| Detalle | `detalle.html?id=` | `/noticias/:id` | No | Nota completa + acciones |
| Favoritos | `favoritos.html` | `/favoritos` | Sí | Lista personalizada desde localStorage |
| Publicar / Gestionar | `publicar.html` | `/publicar` | Sí | Mini CRUD: crear y eliminar noticias |
| Contacto | `contacto.html` | `/contacto` | Sí | Formulario validado + confirmación |
| Acerca de | `acerca.html` | `/acerca` | Sí | Sección informativa / misión / equipo |

**Menú de navegación: 6 entradas** → cumple el mínimo de 5 páginas exigido.

### 3.1 Modelo de datos (`noticias.json`)

```json
{
  "id": "n-001",
  "titulo": "Título de la noticia",
  "resumen": "Descripción breve para la card (máx. 160 caracteres).",
  "contenido": "Cuerpo completo de la nota en uno o varios párrafos.",
  "categoria": "Inteligencia Artificial",
  "autor": "Nombre del autor",
  "fecha": "2026-09-10",
  "imagen": "assets/img/noticias/n-001.jpg",
  "destacada": true,
  "tiempoLectura": 4,
  "fuente": "https://ejemplo.com/nota-original"
}
```

**Categorías:** Inteligencia Artificial · Startups · Software · Hardware · Ciberseguridad · Innovación

### 3.2 Claves de `localStorage`

| Clave | Contenido | Usada por |
|---|---|---|
| `pd_favoritos` | Array de `id` de noticias favoritas | Favoritos |
| `pd_noticias_creadas` | Array de objetos noticia creados por el usuario | Mini CRUD |
| `pd_noticias_eliminadas` | Array de `id` ocultos del JSON base | Mini CRUD |
| `pd_mensajes_contacto` | Array de envíos del formulario | Contacto |

> El listado que ve el usuario = `noticias.json` − `pd_noticias_eliminadas` + `pd_noticias_creadas`.
> Así se permite "eliminar" noticias del JSON sin poder escribir en el archivo desde el navegador.

### 3.3 Sistema de diseño

Dirección visual: **periódico editorial**. Papel cálido, tinta casi negra y un único color de
señal. Evita el azul degradado genérico y funciona también en escala de grises.

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#14161A` | Texto principal, franja superior, pie de página |
| `--ink-soft` | `#2B2F36` | Texto largo y cuerpo de artículo |
| `--paper` | `#FAF8F5` | Fondo de página |
| `--surface` | `#FFFFFF` | Fondo de tarjetas, formularios y tablas |
| `--accent` | `#D6303C` | Acción primaria, categoría, enlace "Ver más", estado de error |
| `--accent-soft` | `#FBE9EA` | Fondo de badges y avisos de acento |
| `--muted` | `#6B6F76` | Metadatos, ayudas de formulario |
| `--border` | `#E4E0DA` | Bordes, reglas y separadores |

**Tipografía:** titulares `Space Grotesk` (700); texto e interfaz `IBM Plex Sans` (400/500/600).
Fallback: `'Segoe UI', system-ui, sans-serif`. Ambas familias se incrustan como `@font-face` con
`data:` URI en los mockups para que la exportación a PNG del informe conserve la tipografía.

**Escala tipográfica (escritorio):** H1 46–58 px · H2 28–38 px · H3 (tarjeta) 20 px ·
cuerpo 16 px / interlineado 1.65 · artículo 18 px / 1.78 · metadatos 12,5–13 px ·
kicker 11 px en versalitas con `letter-spacing: .16em`.

**Grilla:** 12 columnas, contenedor máx. 1200 px, medianil 24–28 px.
**Breakpoints:** móvil < 576 px · tablet 576–991 px · escritorio ≥ 992 px.
**Radio de borde:** 2–3 px (lenguaje impreso, no "tarjeta redondeada").
**Altura de controles:** botones 48 px (38 px en variante `sm`), campos 48 px.

**Marcas de maquetación.** Los mockups se presentan enmarcados como lámina: cinta de identificación
arriba, etiquetas de zona en el margen izquierdo y cota de la retícula al pie. Están definidas en
`_base.css` bajo las clases `.tape`, `[data-zona]` y `.cota`, y no se trasladan al desarrollo de la
Entrega 2.

---

## 4. Estructura de carpetas del repositorio

```
frontend-project/
├── PLAN.md                        ← este documento
├── README.md                      ← portada del repo (URLs, cómo ejecutar)
├── .gitignore
├── docs/
│   ├── entrega-1/
│   │   ├── informe-apa.md          ← borrador del PDF de la Entrega 1
│   │   ├── especificacion-funcional.md
│   │   ├── mockups/                ← PNG/PDF exportados del canvas
│   │   └── canvas/                 ← fuentes de los mockups
│   │       ├── src/                   artboards .src.dc.html + hojas CSS + canvas.json
│   │       ├── build/                 artboards ensamblados (generados)
│   │       ├── render/                versión autónoma para navegador (generada)
│   │       ├── build.mjs              ensambla los artboards
│   │       ├── render.mjs             genera la versión autónoma
│   │       └── measure.mjs            mide la altura real de cada artboard
│   ├── entrega-2/
│   │   └── informe-apa.md
│   ├── entrega-3/
│   │   └── informe-apa.md
│   └── recursos/
│       └── referencias-apa.md      ← bibliografía compartida
├── src/                           ← Entrega 2 (HTML/CSS/JS vanilla)
│   ├── index.html
│   ├── noticias.html
│   ├── detalle.html
│   ├── favoritos.html
│   ├── publicar.html
│   ├── contacto.html
│   ├── acerca.html
│   └── assets/
│       ├── css/styles.css
│       ├── js/  (data.js, storage.js, ui.js, home.js, …)
│       ├── img/
│       └── data/noticias.json
└── angular/                       ← Entrega 3 (se crea en la semana 6)
```

---

## 5. Entrega 1 — Maquetación (Semana 3)

### 5.1 Qué pide el PDF

- Mockups del aplicativo (Figma u otra herramienta)
- Diseño de: **Home**, **Listado de noticias**, **Detalle**, **Contacto**
- Descripción de funcionalidades
- Documento final en normas APA, en PDF, con referentes bibliográficos y conclusiones
- Adjuntar los archivos de maquetación dentro del informe

### 5.2 Alcance a producir

**Mockups — 6 artboards** (los 4 obligatorios + 2 que refuerzan la propuesta):

1. **Home** — header + nav, hero de bienvenida, 3 cards destacadas, franja de CTA, sección informativa/testimonios, footer con datos de contacto
2. **Listado de noticias** — barra de búsqueda, filtros por categoría, grilla de cards, paginación
3. **Detalle de la noticia** — imagen de portada, metadatos, cuerpo, botones "Añadir a favoritos" y "Contactar", noticias relacionadas
4. **Contacto** — formulario (nombre, correo, asunto, mensaje), estados de validación y mensaje de confirmación
5. **Favoritos** — lista personalizada + estado vacío
6. **Publicar / Gestionar** — formulario de creación y tabla con eliminar (evidencia del mini CRUD)

**Documento APA — estructura:**

1. Portada APA 7
2. Tabla de contenido
3. Introducción
4. Descripción del proyecto y objetivos
5. Requerimientos funcionales y no funcionales
6. Arquitectura de información y mapa de navegación
7. Sistema de diseño (color, tipografía, grilla, componentes)
8. Mockups por vista — imagen + descripción detallada de cada elemento y su funcionalidad
9. Flujos de usuario (explorar → detalle → favorito; contacto; crear/eliminar noticia)
10. Cronograma de las entregas 2 y 3
11. Conclusiones
12. Referencias bibliográficas

### 5.3 Pasos de ejecución

| # | Paso | Responsable | Estado |
|---|---|---|---|
| 1 | Definir tema, nombre, stack y sistema de diseño | Claude | ✅ |
| 2 | Crear estructura de carpetas y este plan | Claude | ✅ |
| 3 | Redactar `especificacion-funcional.md` (RF/RNF + descripción por vista) | Claude | ✅ |
| 4 | Generar el canvas con los 6 artboards | Claude | ✅ |
| 5 | Redactar `informe-apa.md` con la estructura de 5.2 | Claude | ✅ |
| 6 | Revisar y ajustar el diseño visualmente en el canvas | **Tú** | ⏳ |
| 7 | Exportar los mockups a PNG en `docs/entrega-1/mockups/` | Claude | ✅ |
| 8 | Completar datos de portada (nombre, institución, curso, fecha) | Claude | ✅ |
| 9 | Generar el Word con formato APA 7 | Claude | ✅ |
| 9b | Revisar el Word y exportarlo a PDF | **Tú** | ⏳ |
| 10 | `git init`, primer commit y push al repositorio | Claude / Tú | ⏳ |

**Canvas de maquetación:** https://claude.ai/code/artifact/cb2a3695-d991-4192-8ff1-71c98ffff0e0

Los artboards se editan desde sus fuentes en `docs/entrega-1/canvas/src/` y se reconstruyen con
`node docs/entrega-1/canvas/build.mjs` antes de volver a publicar el canvas.

**Regenerar el entregable.** Si cambia la maquetación o el texto del informe:

```bash
cd docs/entrega-1/canvas
node build.mjs && node render.mjs        # arma los artboards
SCRATCH=<temporal> node capturas.mjs     # captura y trocea los mockups
cd ..
python recortar.py                       # escribe docs/entrega-1/mockups/
python ../hacer-docx.py informe-apa.md "Entrega-1.docx" "<título>"
python ../metadatos.py "Entrega-1.docx" "<título>" "<asunto>"
```

`measure.mjs` comprueba que ningún artboard corte contenido por abajo.

### 5.4 Criterios de aceptación

- [ ] Existen al menos los 4 mockups exigidos (Home, Listado, Detalle, Contacto)
- [ ] Cada mockup tiene descripción escrita de sus elementos y funcionalidad
- [ ] El PDF sigue APA 7: portada, interlineado 2.0, fuente 12 pt, sangría, citas y referencias
- [ ] Incluye tabla de contenido, conclusiones y referencias
- [ ] Los mockups reflejan las 6 características obligatorias del apartado 1.1
- [ ] La cita de Linube (2023) sobre mockups aparece correctamente referenciada

---

## 6. Entrega 2 — Prototipo funcional (Semana 5)

### 6.1 Qué pide el PDF

Desarrollo en HTML/CSS/JS · renderizado dinámico desde JSON · favoritos · formularios con
validaciones · código estructurado · repositorio en GitHub.
**Nota del tutor: "Se revisará que la maquetación corresponda con el desarrollo".**

### 6.2 Plan técnico

| Módulo JS | Archivo | Responsabilidad |
|---|---|---|
| Carga de datos | `assets/js/data.js` | `fetch()` del JSON + merge con overrides de localStorage |
| Persistencia | `assets/js/storage.js` | Wrapper sobre localStorage (favoritos, CRUD, mensajes) |
| Componentes UI | `assets/js/ui.js` | `renderCard()`, `renderVacio()`, `toast()`, header/footer compartidos |
| Home | `assets/js/home.js` | Render de noticias destacadas |
| Listado | `assets/js/noticias.js` | Filtro por categoría, búsqueda, orden |
| Detalle | `assets/js/detalle.js` | Lectura de `?id=`, render, toggle favorito |
| Favoritos | `assets/js/favoritos.js` | Lista personalizada, quitar de favoritos |
| CRUD | `assets/js/publicar.js` | Alta con validación, eliminar con confirmación |
| Contacto | `assets/js/contacto.js` | Validación (requeridos + regex de correo) y confirmación |

**Reglas de calidad:** una única variable global (`window.PD`) como espacio de nombres, cada
archivo encerrado en una función autoejecutada, funciones comentadas con JSDoc breve, nombres en
español coherentes, HTML semántico (`<header> <nav> <main> <article> <footer>`), accesibilidad
básica (alt, labels, foco visible), diseño responsive verificado en los 3 breakpoints.

> **Corrección sobre el plan inicial.** Este apartado preveía módulos ES (`type="module"`). Se
> descartaron tras comprobarlo en el navegador: al abrir una página con doble clic el protocolo
> es `file://`, cuyo origen es opaco, y Chrome bloquea tanto `import` entre archivos como
> `fetch()` del JSON. Como la guía exige que las páginas «puedan ser vistas en cualquiera de los
> navegadores Web», se usan scripts clásicos con espacio de nombres, y `data.js` intenta
> `fetch()` primero y recurre a `noticias-respaldo.js` —copia generada del JSON— cuando falla.
> El archivo `noticias.json` sigue siendo la única fuente que se edita a mano.

**Orden de carga en cada página:** `noticias-respaldo.js` → `storage.js` → `data.js` → `ui.js` →
el script de la vista.

### 6.3 Pasos de ejecución

1. ✅ `noticias.json` con 18 noticias y 18 fotografías con licencia Creative Commons
   (Openverse), con su crédito guardado en el propio dato y mostrado en el pie de foto
2. ✅ `styles.css` sobre Bootstrap 5.3, con las tipografías alojadas en el proyecto
3. ✅ Cabecera y pie compartidos, escritos una sola vez en `ui.js`
4. ✅ `storage.js` + `data.js` verificados con `src/pruebas.html` (25 comprobaciones)
5. ✅ Las siete vistas del menú más `creditos.html`, la página de atribución de imágenes
6. ✅ Pruebas de extremo a extremo con `src/pruebas-e2e.py` (38 comprobaciones)
7. ✅ Repositorio público en https://github.com/DaliaRueda/PulsoDigital
8. ✅ Informe APA de la Entrega 2: 51 páginas, 4 tablas, 20 figuras y 11 listados de código

**Cómo ejecutar las pruebas**

```bash
cd src
python pruebas-e2e.py     # 38 comprobaciones sobre las páginas reales, sin servidor
```

Abre además `src/pruebas.html` en el navegador para las 25 comprobaciones de la capa de datos.

**Dos hallazgos del navegador que quedaron resueltos**

1. Un `row g-5` dentro de un `container` de Bootstrap sobresale 12 px por lado, porque el
   contenedor calcula su relleno con el gutter por defecto. Desbordaba tres páginas en móvil;
   se corrige con la clase `.pd-contenedor-ancho`.
2. Chrome sin interfaz no acepta ventanas de menos de unos 500 px en Windows, así que una prueba
   «a 390 px» medía en realidad 504. Las comprobaciones de móvil cargan la página dentro de un
   `iframe` de 390 px, que sí activa las media queries correctas.

### 6.4 Entregable documental

PDF APA que incluye: **la maquetación de la Entrega 1** + el código fuente estructurado y
comentado + URL del repositorio (verificar permisos de acceso públicos) + tabla de contenido +
referencias + conclusiones.

### 6.5 Criterios de aceptación

- [ ] Las cards se renderizan dinámicamente desde `noticias.json` (ninguna card hardcodeada en HTML)
- [ ] Favoritos persiste tras recargar y cerrar el navegador
- [ ] El formulario de contacto rechaza campos vacíos y correos inválidos, y confirma el envío
- [ ] Crear y eliminar noticias funciona y persiste
- [ ] El desarrollo es visualmente fiel a los mockups de la Entrega 1
- [ ] El sitio funciona abriendo los archivos en el navegador y también en servidor local
- [ ] Repositorio en GitHub con commits descriptivos e histórico coherente

---

## 7. Entrega 3 — Entrega final (Semana 7)

### 7.1 Qué pide el PDF

Aplicación funcional completa · implementación básica en Angular (componentes y binding) ·
código organizado y documentado · aplicación desplegada · documento APA · **video explicativo
de máximo 3 minutos (link de YouTube)**.

### 7.2 Plan técnico Angular

**Setup:** Angular CLI (standalone components), Bootstrap por npm, carpeta `angular/`.

| Capa | Elementos |
|---|---|
| Modelo | `interface Noticia` (TypeScript, espeja el apartado 3.1) |
| Servicios | `NoticiasService` (carga el JSON desde `assets/`, CRUD), `FavoritosService` (localStorage), `ContactoService` |
| Componentes de layout | `HeaderComponent`, `FooterComponent` |
| Componentes reutilizables | `NoticiaCardComponent` (`@Input() noticia`, `@Output() favoritoToggle`), `FiltroCategoriasComponent`, `EstadoVacioComponent` |
| Páginas | `HomeComponent`, `NoticiasComponent`, `DetalleComponent`, `FavoritosComponent`, `PublicarComponent`, `ContactoComponent`, `AcercaComponent` |
| Routing | `app.routes.ts` con las rutas del apartado 3 + ruta comodín 404 |
| Binding a evidenciar | Interpolación `{{ }}`, property binding `[src]`, event binding `(click)`, two-way `[(ngModel)]` en formularios, `@if` / `@for` en listas |

**Despliegue:** build de producción → GitHub Pages (con `--base-href`) o Vercel.

### 7.3 Video (máx. 3 minutos)

Guion sugerido: (0:00) presentación del proyecto y del autor · (0:20) recorrido por Home y
navegación · (0:50) listado, filtros y detalle · (1:20) favoritos con persistencia · (1:50) mini
CRUD · (2:20) formulario de contacto y validaciones · (2:40) tecnologías y cierre.
Subir a YouTube como **"no listado"** y pegar el enlace en el PDF.

### 7.4 Criterios de aceptación

- [ ] App Angular funcionando con las 7 vistas y routing
- [ ] Uso demostrable de componentes, `@Input`/`@Output` y los 4 tipos de binding
- [ ] Favoritos y CRUD funcionan igual que en la Entrega 2
- [ ] Código comentado y organizado por carpetas (`models/`, `services/`, `components/`, `pages/`)
- [ ] URL de despliegue pública y funcional
- [ ] Video de ≤ 3 minutos publicado y enlazado
- [ ] PDF APA con tabla de contenido, funcionamiento, tecnologías, URL, conclusiones y referencias

---

## 8. Cronograma

| Semana | Hito | Salida |
|---|---|---|
| 3 | Entrega 1 — Maquetación | Mockups + PDF APA |
| 4 | Desarrollo vanilla (datos, estilos, Home, Listado, Detalle) | Código en GitHub |
| 5 | Entrega 2 — Prototipo funcional | App vanilla completa + PDF APA |
| 6 | Migración a Angular + despliegue | App Angular desplegada |
| 7 | Entrega 3 — Entrega final | App + PDF APA + video |

> Fechas exactas de corte: `[PENDIENTE — confirmar en el aula]`

---

## 9. Referencias base (APA 7)

Se mantienen y amplían en `docs/recursos/referencias-apa.md`.

- Linube. (2023). *¿Qué son los mockups?* https://linube.com/blog/que-son-los-mockups/
- Google. (2026). *Angular documentation*. https://angular.dev/
- Bootstrap Team. (2026). *Bootstrap 5.3 documentation*. https://getbootstrap.com/
- MDN Web Docs. (2026). *Window.localStorage*. https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
- American Psychological Association. (2020). *Publication manual of the American Psychological Association* (7.ª ed.).

---

## 10. Puntos pendientes de confirmar

1. Datos de portada APA: nombre completo, institución, programa, asignatura, fecha de entrega
2. ¿El trabajo es individual o colaborativo? (el PDF menciona evidenciar la participación individual en un trabajo colaborativo; el tutor indicará la estrategia)
3. Fechas exactas de corte de las semanas 3, 5 y 7
4. Usuario u organización de GitHub donde se creará el repositorio
5. Confirmación del nombre del aplicativo: **Pulso Digital**
