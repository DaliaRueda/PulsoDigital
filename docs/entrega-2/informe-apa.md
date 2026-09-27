# Informe — Entrega 2: Prototipo funcional

> **Cómo usar este borrador.** Se convierte a Word con:
> `python ../hacer-docx.py informe-apa.md "Entrega-2-Prototipo-Funcional-Pulso-Digital.docx" "Pulso Digital: prototipo funcional de una plataforma web de noticias"`
> Después hay que actualizar el índice desde Word y ejecutar `metadatos.py`.

---

## PORTADA

*(Página independiente, todo centrado)*

**Pulso Digital: prototipo funcional de una plataforma web de noticias de tecnología e innovación**

Dalia Johanna Rueda Tangarife

Facultad de Ingeniería, Diseño e Innovación, Politécnico Grancolombiano

Ingeniería de Software

Virtual / Front End

Tutor: John Olarte

[Día] de [mes] de 2026

---

## TABLA DE CONTENIDO

*(Se genera automáticamente en Word)*

---

# 1. Introducción

Este documento corresponde a la segunda entrega del módulo Desarrollo de Front-end y presenta
el prototipo funcional de *Pulso Digital*, la plataforma web de noticias de tecnología e
innovación cuya maquetación se aprobó en la entrega anterior.

Mientras que la primera entrega respondía a la pregunta de cómo debía verse el aplicativo, esta
responde a cómo funciona. El resultado son siete vistas construidas con HTML, CSS y JavaScript
sobre Bootstrap 5.3, que leen su contenido de un archivo JSON local y conservan las decisiones
del usuario en su propio navegador, sin servidor y sin cuentas.

La guía del módulo advierte que en esta entrega «se revisará que la maquetación corresponda con
el desarrollo». Por ese motivo el documento dedica un apartado completo a contrastar cada vista
maquetada con su implementación, y declara de forma explícita las dos decisiones en las que el
desarrollo se apartó del diseño, junto con el motivo de cada una.

La redacción, las citas y las referencias siguen el manual de la American Psychological
Association (2020) en su séptima edición.

---

# 2. Alcance de la entrega

La Tabla 1 recoge cada punto solicitado por la guía del módulo y el estado en que se entrega.

**Tabla 1**

*Correspondencia entre lo solicitado y lo implementado*

| Lo que solicita la guía | Estado | Dónde se evidencia |
|---|---|---|
| Desarrollo en HTML, CSS y JavaScript | Implementado | Apartados 5 y 6 |
| Renderizado dinámico de servicios desde JSON | Implementado | Apartados 6.1 a 6.3 |
| Funcionalidad de favoritos | Implementado | Apartados 6.2 y 7 |
| Formularios con validaciones | Implementado | Apartados 6.6 y 6.7 |
| Código estructurado | Implementado | Apartado 5 |
| Repositorio en GitHub | Publicado | Apartado 10 |
| Maquetación de la Entrega 1 incluida | Incluida | Apartado 3 |
| Código fuente comentado incluido | Incluido | Apartado 6 |
| URL del repositorio asociada | Incluida | Apartado 10 |
| Tabla de contenido, referencias y conclusiones | Incluidas | Índice, apartados 11 y 12 |

*Nota.* Elaboración propia a partir de las orientaciones del módulo.

---

# 3. Maquetación de la Entrega 1

La guía pide incorporar a este documento la maquetación aprobada, que es el punto de partida
contra el que se contrasta el desarrollo. Se reproduce completa, con sus estados alternos.

Los bloques rayados que aparecen en los mockups son marcadores de imagen; en el desarrollo se
sustituyeron por fotografías reales, como se explica en el apartado 9.
**Figura 2**

*Mockup de la página de inicio*

> FIGURA: insertar `docs/entrega-1/mockups/01-inicio`

*Nota.* Elaboración propia.

**Figura 3**

*Mockup del listado de noticias*

> FIGURA: insertar `docs/entrega-1/mockups/02-listado`

*Nota.* Elaboración propia.

**Figura 4**

*Mockup del detalle de la noticia*

> FIGURA: insertar `docs/entrega-1/mockups/03-detalle`

*Nota.* Elaboración propia.

**Figura 5**

*Mockup de la página de contacto*

> FIGURA: insertar `docs/entrega-1/mockups/04-contacto`

*Nota.* Elaboración propia.

**Figura 6**

*Mockup de la lista de favoritos*

> FIGURA: insertar `docs/entrega-1/mockups/05-favoritos`

*Nota.* Elaboración propia.

**Figura 7**

*Mockup de la vista de publicación y gestión*

> FIGURA: insertar `docs/entrega-1/mockups/06-publicar`

*Nota.* Elaboración propia.

---

# 4. Correspondencia entre maquetación y desarrollo

Las figuras siguientes muestran el aplicativo en funcionamiento, servido desde un servidor local.
Cada una corresponde a la vista maquetada del mismo nombre en el apartado anterior.
**Figura 8**

*Página de inicio en funcionamiento*

> FIGURA: insertar `capturas/01-inicio`

*Nota.* Elaboración propia.

**Figura 9**

*Listado de noticias con búsqueda, filtros y paginación*

> FIGURA: insertar `capturas/02-listado`

*Nota.* Elaboración propia.

**Figura 10**

*Detalle de la noticia*

> FIGURA: insertar `capturas/03-detalle`

*Nota.* Elaboración propia.

**Figura 11**

*Formulario de contacto*

> FIGURA: insertar `capturas/04-contacto`

*Nota.* Elaboración propia.

**Figura 12**

*Lista de favoritos*

> FIGURA: insertar `capturas/05-favoritos`

*Nota.* Elaboración propia.

**Figura 13**

*Publicación y gestión de noticias*

> FIGURA: insertar `capturas/06-publicar`

*Nota.* Elaboración propia.

**Figura 14**

*Página informativa*

> FIGURA: insertar `capturas/07-acerca`

*Nota.* Elaboración propia.

**Figura 15**

*Créditos de las imágenes*

> FIGURA: insertar `capturas/08-creditos`

*Nota.* Elaboración propia.

## 4.1 Desviaciones respecto a la maquetación

El desarrollo se apartó del diseño aprobado en dos puntos. Ambos se documentan aquí porque la
guía advierte que se revisará la correspondencia entre ambos, y ocultar una diferencia sería
peor que explicarla.

**El campo de imagen dejó de ser obligatorio.** En el mockup de la vista de publicación el campo
aparece marcado con asterisco. En el desarrollo se dejó opcional: el aplicativo no dispone de
ningún mecanismo para subir archivos, de modo que exigir una ruta que la usuaria no puede obtener
bloquearía la creación de noticias, que es una característica exigida por la guía. Cuando el
campo queda vacío, la noticia muestra un marcador de imagen.

**La cabecera se reorganiza en móvil.** El mockup solo definía la versión de escritorio. Por
debajo de 576 px el buscador y el acceso a favoritos pasan a una segunda fila y el menú se
colapsa en un botón, porque a ese ancho los tres elementos no caben en línea.

---

# 5. Arquitectura del código

## 5.1 Estructura del directorio

La guía pide organizar el directorio raíz con los archivos HTML, CSS, JavaScript e imágenes
necesarios para que las páginas puedan verse en cualquier navegador. La estructura es la
siguiente:

```
src/
├── index.html            Inicio
├── noticias.html         Listado con búsqueda, filtros y paginación
├── detalle.html          Detalle de una noticia
├── favoritos.html        Lista personal
├── publicar.html         Alta y baja de noticias
├── contacto.html         Formulario con validaciones
├── acerca.html           Página informativa
├── creditos.html         Atribución de las fotografías
├── pruebas.html          Comprobaciones de la capa de datos
├── pruebas-e2e.py        Comprobaciones sobre las páginas reales
└── assets/
    ├── css/styles.css    Hoja de estilos sobre Bootstrap 5.3
    ├── fonts/            Space Grotesk e IBM Plex Sans
    ├── data/             noticias.json y su copia de respaldo
    ├── img/noticias/     18 fotografías con licencia Creative Commons
    └── js/               Un módulo por responsabilidad
```

La Tabla 2 detalla la responsabilidad de cada módulo de JavaScript.

**Tabla 2**

*Módulos de JavaScript y su responsabilidad*

| Archivo | Responsabilidad |
|---|---|
| `storage.js` | Única capa que accede a `localStorage`: favoritos, noticias creadas, noticias ocultas y mensajes |
| `data.js` | Carga del catálogo, filtros, orden, paginación y noticias relacionadas |
| `ui.js` | Cabecera, pie, tarjeta de noticia, estados vacíos, avisos y escape de texto |
| `home.js` | Portada y noticias destacadas del inicio |
| `noticias.js` | Estado del listado: búsqueda, categoría, orden y página |
| `detalle.js` | Lectura del identificador, render de la nota y acciones |
| `favoritos.js` | Lista personal, quitar y vaciar |
| `publicar.js` | Alta con validación y baja con confirmación |
| `contacto.js` | Validación del formulario y confirmación |
| `creditos.js` | Tabla de atribución de las fotografías |
| `acerca.js` | Monta la cabecera y el pie de la vista informativa |

*Nota.* Elaboración propia.

## 5.2 Espacio de nombres y orden de carga

Todo el código se cuelga de una única variable global, `window.PD`, y cada archivo se encierra en
una función autoejecutada. Así no hay funciones ni variables sueltas en el ámbito global, que es
lo que se degrada primero cuando un proyecto crece.

El orden de carga en cada página es fijo, porque cada capa usa la anterior:

```html
<script src="assets/data/noticias-respaldo.js"></script>
<script src="assets/js/storage.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/ui.js"></script>
<script src="assets/js/home.js"></script>
```

## 5.3 Por qué no se usaron módulos ES

El plan inicial del proyecto preveía módulos ES con `type="module"`, que es la práctica habitual
hoy. Se descartaron tras comprobarlo en el navegador.

Cuando una página se abre con doble clic, el protocolo es `file://` y su origen es opaco. En esas
condiciones el navegador bloquea dos cosas: la instrucción `import` entre archivos y la llamada
`fetch()` al archivo JSON, aunque esté en la misma carpeta. La guía del módulo exige que las
páginas «puedan ser vistas en cualquiera de los navegadores Web», y con módulos ES el resultado
habría sido una página en blanco.

La solución fue doble. Por un lado, scripts clásicos con espacio de nombres, que funcionan en
ambos protocolos. Por otro, `data.js` intenta primero `fetch()` —la vía correcta cuando hay
servidor— y recurre a `noticias-respaldo.js`, una copia del JSON generada por script, cuando el
navegador lo bloquea. El archivo `noticias.json` sigue siendo la única fuente que se edita a
mano.

---

# 6. Código fuente

Se reproducen los módulos que evidencian las características exigidas. El resto del código, y
estos mismos archivos completos, están en el repositorio indicado en el apartado 10.

## 6.1 Origen de datos: `noticias.json`

El catálogo son 18 noticias. Cada objeto incluye el crédito de su fotografía, de modo que la atribución no pueda separarse de la imagen a la que pertenece. Se reproduce el primer objeto como muestra de la estructura.

Fragmento de `src/assets/data/noticias.json`.

```json
[
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
```

## 6.2 Persistencia: `storage.js`

Única capa que toca `localStorage`. Ningún otro archivo lee una clave directamente, de forma que un cambio de mecanismo de persistencia afectaría solo a este módulo. Contempla que el almacenamiento esté bloqueado —navegación privada o cuota agotada— y en ese caso trabaja contra memoria para que la interfaz siga funcionando.

Archivo completo `src/assets/js/storage.js` (233 líneas).

```javascript
/* ============================================================================
   storage.js — persistencia en el navegador
   Pulso Digital · Entrega 2

   Única capa que toca localStorage. El resto del código pide y guarda a través
   de PD.almacen y nunca lee una clave directamente: así, si mañana cambia el
   mecanismo de persistencia, solo cambia este archivo.

   Claves utilizadas
     pd_favoritos           identificadores de las noticias guardadas
     pd_noticias_creadas    noticias añadidas por el usuario
     pd_noticias_eliminadas identificadores ocultos del archivo base
     pd_mensajes_contacto   mensajes enviados desde el formulario

   El aplicativo no tiene cuentas: toda la personalización vive aquí.
   ========================================================================== */

window.PD = window.PD || {};

(function (PD) {
  'use strict';

  const CLAVES = {
    favoritos: 'pd_favoritos',
    creadas: 'pd_noticias_creadas',
    eliminadas: 'pd_noticias_eliminadas',
    mensajes: 'pd_mensajes_contacto'
  };

  /* ------------------------------------------------------------------
     localStorage puede no estar disponible: navegación privada, cookies
     bloqueadas o cuota agotada. En ese caso se trabaja contra un objeto en
     memoria para que la interfaz siga funcionando durante la sesión.
     ------------------------------------------------------------------ */
  const disponible = (() => {
    try {
      const prueba = '__pd__';
      window.localStorage.setItem(prueba, '1');
      window.localStorage.removeItem(prueba);
      return true;
    } catch (e) {
      return false;
    }
  })();

  const memoria = {};

  /**
   * Lee y deserializa un valor.
   * @param {string} clave
   * @param {*} porDefecto valor devuelto si no hay nada o el dato está corrupto
   * @returns {*}
   */
  function leer(clave, porDefecto) {
    try {
      const bruto = disponible ? window.localStorage.getItem(clave) : memoria[clave];
      if (bruto === null || bruto === undefined) return porDefecto;
      return JSON.parse(bruto);
    } catch (e) {
      // Un valor corrupto no debe tumbar la página: se descarta.
      console.warn('No se pudo leer «' + clave + '»; se usa el valor por defecto.', e);
      return porDefecto;
    }
  }

  /**
   * Serializa y guarda un valor.
   * @returns {boolean} false si no se pudo guardar
   */
  function escribir(clave, valor) {
    const bruto = JSON.stringify(valor);
    try {
      if (disponible) window.localStorage.setItem(clave, bruto);
      else memoria[clave] = bruto;
      return true;
    } catch (e) {
      console.warn('No se pudo guardar «' + clave + '».', e);
      return false;
    }
  }

  /* ------------------------------------------------------------------
     Aviso de cambios: el contador de favoritos de la cabecera se actualiza
     sin recargar, y dos pestañas abiertas se mantienen sincronizadas.
     ------------------------------------------------------------------ */
  const oyentes = [];

  /** Registra una función que se ejecuta cuando cambian los favoritos. */
  function alCambiarFavoritos(fn) {
    if (typeof fn === 'function') oyentes.push(fn);
  }

  function avisar() {
    oyentes.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error('Error en un oyente de favoritos.', e);
      }
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === CLAVES.favoritos) avisar();
  });

  /* ------------------------------------------------------------- Favoritos */

  /** @returns {string[]} identificadores guardados */
  function favoritos() {
    const v = leer(CLAVES.favoritos, []);
    return Array.isArray(v) ? v : [];
  }

  function esFavorito(id) {
    return favoritos().indexOf(id) !== -1;
  }

  /**
   * Añade o quita una noticia de favoritos.
   * @returns {boolean} true si quedó guardada
   */
  function alternarFavorito(id) {
    const lista = favoritos();
    const i = lista.indexOf(id);
    if (i === -1) lista.push(id);
    else lista.splice(i, 1);
    escribir(CLAVES.favoritos, lista);
    avisar();
    return i === -1;
  }

  function quitarFavorito(id) {
    const lista = favoritos().filter((x) => x !== id);
    escribir(CLAVES.favoritos, lista);
    avisar();
  }

  function vaciarFavoritos() {
    escribir(CLAVES.favoritos, []);
    avisar();
  }

  function contarFavoritos() {
    return favoritos().length;
  }

  /* --------------------------------------------------- Noticias del usuario */

  /** @returns {Object[]} noticias creadas por el usuario */
  function creadas() {
    const v = leer(CLAVES.creadas, []);
    return Array.isArray(v) ? v : [];
  }

  function agregarNoticia(noticia) {
    const lista = creadas();
    lista.push(noticia);
    return escribir(CLAVES.creadas, lista);
  }

  function eliminarCreada(id) {
    return escribir(CLAVES.creadas, creadas().filter((n) => n.id !== id));
  }

  /**
   * Devuelve el siguiente identificador libre para una noticia creada.
   * Usa un prefijo propio para no chocar nunca con los del archivo base.
   */
  function siguienteId() {
    const numeros = creadas()
      .map((n) => parseInt(String(n.id).replace(/\D/g, ''), 10))
      .filter((n) => !isNaN(n));
    const max = numeros.length ? Math.max.apply(null, numeros) : 0;
    return 'u-' + String(max + 1).padStart(3, '0');
  }

  /* ------------------------------------------------- Ocultar noticias base */
  /* El navegador no puede escribir en noticias.json, así que «eliminar» una
     noticia del archivo base consiste en registrar su identificador aquí y
     descontarlo al construir el listado. Es reversible. */

  function eliminadas() {
    const v = leer(CLAVES.eliminadas, []);
    return Array.isArray(v) ? v : [];
  }

  function marcarEliminada(id) {
    const lista = eliminadas();
    if (lista.indexOf(id) === -1) lista.push(id);
    return escribir(CLAVES.eliminadas, lista);
  }

  function restaurarBase() {
    return escribir(CLAVES.eliminadas, []);
  }

  /* ------------------------------------------------------------- Contacto */

  function guardarMensaje(mensaje) {
    const lista = leer(CLAVES.mensajes, []);
    lista.push(Object.assign({ enviadoEn: new Date().toISOString() }, mensaje));
    return escribir(CLAVES.mensajes, lista);
  }

  function mensajes() {
    const v = leer(CLAVES.mensajes, []);
    return Array.isArray(v) ? v : [];
  }

  /* ------------------------------------------------------------- Interfaz */

  PD.almacen = {
    CLAVES,
    disponible,
    favoritos,
    esFavorito,
    alternarFavorito,
    quitarFavorito,
    vaciarFavoritos,
    contarFavoritos,
    alCambiarFavoritos,
    creadas,
    agregarNoticia,
    eliminarCreada,
    siguienteId,
    eliminadas,
    marcarEliminada,
    restaurarBase,
    guardarMensaje,
    mensajes
  };
})(window.PD);
```

## 6.3 Origen del catálogo: `data.js`

Calcula el catálogo visible como el archivo JSON menos las noticias ocultas más las creadas por el usuario. Incluye la búsqueda insensible a mayúsculas y acentos, el filtro por categoría, tres criterios de orden y la paginación.

Archivo completo `src/assets/js/data.js` (179 líneas).

```javascript
/* ============================================================================
   data.js — origen de datos de las noticias
   Pulso Digital · Entrega 2

   El catálogo que ve el usuario se calcula así:

       noticias.json  −  las marcadas como eliminadas  +  las creadas

   Sobre la carga del archivo: un navegador bloquea fetch() cuando la página se
   abre con doble clic (protocolo file://), porque el origen es opaco. Como la
   guía del módulo pide que las páginas puedan verse en cualquier navegador sin
   montar un servidor, se intenta primero fetch() —la ruta correcta cuando hay
   servidor— y, si falla, se usa el respaldo noticias-respaldo.js, que es una
   copia del mismo JSON generada automáticamente. El archivo JSON sigue siendo
   la única fuente que se edita a mano.
   ========================================================================== */

window.PD = window.PD || {};

(function (PD) {
  'use strict';

  const RUTA_JSON = 'assets/data/noticias.json';

  const CATEGORIAS = [
    'Inteligencia Artificial',
    'Startups',
    'Software',
    'Hardware',
    'Ciberseguridad',
    'Innovación'
  ];

  const POR_PAGINA = 6;

  let baseEnCache = null;

  /* --------------------------------------------------------------- Carga */

  /**
   * Carga el archivo base. Intenta fetch() y recurre al respaldo si el
   * navegador lo bloquea por estar abriendo la página desde el disco.
   * @returns {Promise<Object[]>}
   */
  function cargarBase() {
    if (baseEnCache) return Promise.resolve(baseEnCache);

    return fetch(RUTA_JSON)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .catch(() => {
        if (Array.isArray(window.PD_NOTICIAS_RESPALDO)) {
          return window.PD_NOTICIAS_RESPALDO;
        }
        throw new Error(
          'No se pudieron cargar las noticias. Abre el proyecto con un ' +
          'servidor local o comprueba que exista assets/data/noticias-respaldo.js.'
        );
      })
      .then((lista) => {
        baseEnCache = Array.isArray(lista) ? lista : [];
        return baseEnCache;
      });
  }

  /**
   * Catálogo completo y ordenado que debe ver el usuario.
   * @returns {Promise<Object[]>}
   */
  function cargar() {
    return cargarBase().then((base) => {
      const ocultas = PD.almacen.eliminadas();
      const visibles = base.filter((n) => ocultas.indexOf(n.id) === -1);
      return ordenar(visibles.concat(PD.almacen.creadas()), 'recientes');
    });
  }

  /**
   * Busca una noticia por su identificador.
   * @returns {Promise<Object|null>}
   */
  function porId(id) {
    return cargar().then((lista) => lista.find((n) => n.id === id) || null);
  }

  /* ------------------------------------------------------------ Consultas */

  /** Quita acentos y pasa a minúsculas, para buscar sin distinguirlos. */
  function normalizar(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  /**
   * Filtra por texto libre y por categoría. Ambos criterios se combinan.
   * @param {Object[]} lista
   * @param {{texto?: string, categoria?: string}} criterios
   * @returns {Object[]}
   */
  function filtrar(lista, criterios) {
    const c = criterios || {};
    const busqueda = normalizar(c.texto).trim();
    const categoria = c.categoria && c.categoria !== 'Todas' ? c.categoria : null;

    return lista.filter((n) => {
      if (categoria && n.categoria !== categoria) return false;
      if (!busqueda) return true;
      const heno = normalizar(n.titulo + ' ' + n.resumen + ' ' + n.contenido);
      return heno.indexOf(busqueda) !== -1;
    });
  }

  /**
   * Ordena sin modificar el arreglo recibido.
   * @param {Object[]} lista
   * @param {'recientes'|'antiguas'|'alfabetico'} criterio
   * @returns {Object[]} copia ordenada
   */
  function ordenar(lista, criterio) {
    const copia = lista.slice();
    if (criterio === 'antiguas') {
      copia.sort((a, b) => a.fecha.localeCompare(b.fecha));
    } else if (criterio === 'alfabetico') {
      copia.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
    } else {
      copia.sort((a, b) => b.fecha.localeCompare(a.fecha));
    }
    return copia;
  }

  /** Las destacadas alimentan la portada y las tarjetas del inicio. */
  function destacadas(lista) {
    return lista.filter((n) => n.destacada === true);
  }

  /** Noticias de la misma categoría, excluyendo la que se está leyendo. */
  function relacionadas(lista, noticia, cuantas) {
    return lista
      .filter((n) => n.categoria === noticia.categoria && n.id !== noticia.id)
      .slice(0, cuantas || 3);
  }

  /** Devuelve la porción correspondiente a una página. */
  function paginar(lista, pagina, porPagina) {
    const tam = porPagina || POR_PAGINA;
    const inicio = (Math.max(1, pagina) - 1) * tam;
    return lista.slice(inicio, inicio + tam);
  }

  function totalPaginas(total, porPagina) {
    return Math.max(1, Math.ceil(total / (porPagina || POR_PAGINA)));
  }

  /** Indica si una noticia la creó el usuario o viene del archivo base. */
  function esCreada(noticia) {
    return String(noticia.id).charAt(0) === 'u';
  }

  /* ------------------------------------------------------------- Interfaz */

  PD.datos = {
    CATEGORIAS,
    POR_PAGINA,
    cargar,
    porId,
    filtrar,
    ordenar,
    destacadas,
    relacionadas,
    paginar,
    totalPaginas,
    esCreada,
    normalizar
  };
})(window.PD);
```

## 6.4 Componentes compartidos: `ui.js`

La cabecera, el pie y la tarjeta de noticia se escriben una sola vez aquí y cada página los monta. Todo el texto procedente de datos pasa por `escapar()` antes de insertarse, porque las noticias que crea el usuario son entrada no confiable. Se reproduce el fragmento de la tarjeta y del escape.

Fragmento de `src/assets/js/ui.js`.

```javascript
  function escapar(texto) {
    return String(texto === null || texto === undefined ? '' : texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
```

## 6.5 Listado: `noticias.js`

Mantiene un único objeto de estado con los cuatro criterios del listado y repinta la grilla cuando cualquiera cambia. La búsqueda espera a que el usuario deje de escribir antes de filtrar.

Archivo completo `src/assets/js/noticias.js` (168 líneas).

```javascript
/* ============================================================================
   noticias.js — listado del archivo
   Pulso Digital · Entrega 2

   Mantiene un único objeto de estado (texto, categoría, orden y página) y
   vuelve a pintar la grilla cada vez que cambia. Los tres criterios se
   combinan entre sí; cualquier cambio en texto o categoría devuelve a la
   página 1, porque seguir en la página 3 de un resultado nuevo desorienta.
   ========================================================================== */

(function (PD) {
  'use strict';

  const estado = { texto: '', categoria: 'Todas', orden: 'recientes', pagina: 1 };

  let catalogo = [];

  const grid = document.getElementById('pd-grid');
  const filtros = document.getElementById('pd-filtros');
  const paginacion = document.getElementById('pd-paginacion');
  const contador = document.getElementById('pd-contador');
  const buscar = document.getElementById('pd-buscar');
  const orden = document.getElementById('pd-orden');

  /* --------------------------------------------------------------- Filtros */

  function pintarFiltros() {
    const categorias = ['Todas'].concat(PD.datos.CATEGORIAS);
    filtros.innerHTML = categorias.map((c) =>
      '<button type="button" class="pd-chip" data-categoria="' + PD.ui.escapar(c) + '" ' +
      'aria-pressed="' + (c === estado.categoria ? 'true' : 'false') + '">' +
      PD.ui.escapar(c) + '</button>').join('');
  }

  /* ---------------------------------------------------------------- Pintado */

  /** Aplica los tres criterios y devuelve la lista resultante. */
  function resultado() {
    return PD.datos.ordenar(
      PD.datos.filtrar(catalogo, { texto: estado.texto, categoria: estado.categoria }),
      estado.orden
    );
  }

  function pintar() {
    const lista = resultado();
    const paginas = PD.datos.totalPaginas(lista.length);
    if (estado.pagina > paginas) estado.pagina = paginas;

    const visibles = PD.datos.paginar(lista, estado.pagina);

    grid.removeAttribute('aria-busy');

    if (!lista.length) {
      contador.textContent = 'Sin resultados';
      paginacion.innerHTML = '';
      grid.innerHTML = '<div class="col-12">' + PD.ui.vacio({
        titulo: 'No encontramos noticias con esos filtros',
        texto: 'Prueba con otra palabra clave o vuelve a la categoría «Todas» para ver el ' +
          'archivo completo.',
        boton: { texto: 'Limpiar filtros', id: 'pd-limpiar' }
      }) + '</div>';
      const limpiar = document.getElementById('pd-limpiar');
      if (limpiar) limpiar.addEventListener('click', reiniciar);
      return;
    }

    contador.innerHTML = 'Mostrando <strong style="color:var(--pd-ink)">' + visibles.length +
      '</strong> de <strong style="color:var(--pd-ink)">' + lista.length + '</strong> ' +
      (lista.length === 1 ? 'noticia' : 'noticias');

    grid.innerHTML = visibles.map((n) =>
      '<div class="col-12 col-sm-6 col-lg-4">' + PD.ui.tarjeta(n) + '</div>').join('');

    pintarPaginacion(paginas);
  }

  function pintarPaginacion(paginas) {
    if (paginas <= 1) {
      paginacion.innerHTML = '';
      return;
    }
    let html = '<button type="button" class="pd-pagina" data-pagina="' + (estado.pagina - 1) +
      '"' + (estado.pagina === 1 ? ' disabled' : '') + '>← Anterior</button>';

    for (let i = 1; i <= paginas; i++) {
      html += '<button type="button" class="pd-pagina" data-pagina="' + i + '"' +
        (i === estado.pagina ? ' aria-current="page"' : '') +
        ' aria-label="Página ' + i + '">' + i + '</button>';
    }

    html += '<button type="button" class="pd-pagina" data-pagina="' + (estado.pagina + 1) +
      '"' + (estado.pagina === paginas ? ' disabled' : '') + '>Siguiente →</button>';
    paginacion.innerHTML = html;
  }

  function reiniciar() {
    estado.texto = '';
    estado.categoria = 'Todas';
    estado.pagina = 1;
    if (buscar) buscar.value = '';
    pintarFiltros();
    pintar();
  }

  /* ------------------------------------------------------------- Conexiones */

  function conectar() {
    // La búsqueda espera a que el usuario deje de escribir.
    let temporizador = null;
    buscar.addEventListener('input', () => {
      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => {
        estado.texto = buscar.value;
        estado.pagina = 1;
        pintar();
      }, 220);
    });

    orden.addEventListener('change', () => {
      estado.orden = orden.value;
      estado.pagina = 1;
      pintar();
    });

    filtros.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-categoria]');
      if (!chip) return;
      estado.categoria = chip.getAttribute('data-categoria');
      estado.pagina = 1;
      pintarFiltros();
      pintar();
    });

    paginacion.addEventListener('click', (e) => {
      const boton = e.target.closest('[data-pagina]');
      if (!boton || boton.disabled) return;
      estado.pagina = parseInt(boton.getAttribute('data-pagina'), 10);
      pintar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    PD.ui.conectarFavoritos(grid);
  }

  /* ------------------------------------------------------------- Arranque */

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('noticias');

    // El buscador de la cabecera y el pie llegan con parámetros en la dirección.
    const q = PD.ui.parametro('q');
    const cat = PD.ui.parametro('categoria');
    if (q) estado.texto = q;
    if (cat && PD.datos.CATEGORIAS.indexOf(cat) !== -1) estado.categoria = cat;
    if (q && buscar) buscar.value = q;

    pintarFiltros();
    conectar();

    PD.datos.cargar()
      .then((lista) => {
        catalogo = lista;
        pintar();
      })
      .catch((e) => PD.ui.errorCarga(grid, e));
  });
})(window.PD);
```

## 6.6 Validación del formulario de contacto: `contacto.js`

Cada campo tiene una regla que devuelve un mensaje o cadena vacía. La validación se dispara al salir del campo y al enviar; una vez marcado un campo, se revalida mientras se corrige, para que el error desaparezca en cuanto deja de serlo.

Fragmento de `src/assets/js/contacto.js`.

```javascript
  const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/;
  // Comprobación razonable de correo: algo@algo.extensión
  const CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

  const REGLAS = {
    nombre: (v) => {
      const t = v.trim();
      if (!t) return 'El nombre es obligatorio.';
      if (t.length < 3) return 'Escribe al menos 3 caracteres.';
      if (!SOLO_LETRAS.test(t)) return 'Usa solo letras y espacios.';
      return '';
    },
    correo: (v) => {
      const t = v.trim();
      if (!t) return 'El correo es obligatorio.';
      if (!CORREO.test(t)) return 'Escribe un correo válido, por ejemplo, nombre@dominio.com';
      return '';
    },
    asunto: (v) => (v ? '' : 'Elige un asunto.'),
    mensaje: (v) => {
      const t = v.trim();
      if (!t) return 'El mensaje es obligatorio.';
      if (t.length < 10) return 'Escribe al menos 10 caracteres.';
      return '';
    },
    autorizacion: (v, campo) =>
      (campo.checked ? '' : 'Debes autorizar el tratamiento de datos para poder enviar el mensaje.')
  };

  function validarCampo(campo) {
    const regla = REGLAS[campo.name];
    if (!regla) return true;
    const error = regla(campo.value, campo);

    // En la casilla el mensaje cuelga del contenedor .form-check
    const contenedor = campo.type === 'checkbox' ? campo.closest('.form-check') : campo.parentElement;
    const caja = contenedor ? contenedor.querySelector('.invalid-feedback') : null;

    campo.classList.toggle('is-invalid', !!error);
    if (campo.type !== 'checkbox') {
      campo.classList.toggle('is-valid', !error && campo.value.trim() !== '');
    }
    if (caja) {
      caja.textContent = error;
      caja.style.display = error ? 'block' : '';
    }
    return !error;
  }

  function validarTodo() {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name], select[name], textarea[name]'))
      .map(validarCampo)
      .every(Boolean);
  }
```

## 6.7 Alta y baja de noticias: `publicar.js`

Eliminar funciona distinto según el origen de la noticia. Las creadas por el usuario se borran; las del archivo JSON no se pueden tocar desde el navegador, así que su identificador se registra como oculto y se descuenta al construir el listado. De ahí que exista «Restaurar noticias base».

Fragmento de `src/assets/js/publicar.js`.

```javascript
  /* ----------------------------------------------------------- Eliminar */

  function abrirConfirmacion(n) {
    pendienteDeBorrar = n;
    const titular = document.getElementById('pd-modal-borrar-titular');
    if (titular) titular.textContent = '«' + n.titulo + '»';

    const modal = document.getElementById('pd-modal-borrar');
    if (window.bootstrap && modal) {
      window.bootstrap.Modal.getOrCreateInstance(modal).show();
    } else if (window.confirm('¿Eliminar «' + n.titulo + '»?')) {
      eliminarPendiente();
    }
  }

  function eliminarPendiente() {
    if (!pendienteDeBorrar) return;
    const n = pendienteDeBorrar;

    if (PD.datos.esCreada(n)) PD.almacen.eliminarCreada(n.id);
    else PD.almacen.marcarEliminada(n.id);

    // La noticia eliminada no debe quedar colgando en favoritos.
    PD.almacen.quitarFavorito(n.id);

    pendienteDeBorrar = null;
    recargarTabla().then(() => PD.ui.aviso('Noticia eliminada'));
  }

  /* -------------------------------------------------------------- Alta */

  function publicar() {
    const noticia = borrador();
    noticia.id = PD.almacen.siguienteId();
    noticia.fuente = '';
    if (!noticia.imagen) delete noticia.imagen;

    if (!PD.almacen.agregarNoticia(noticia)) {
      PD.ui.aviso('No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado');
      return;
    }

    form.reset();
    form.querySelectorAll('.is-valid, .is-invalid')
      .forEach((el) => el.classList.remove('is-valid', 'is-invalid'));
    conectarContadores();
    pintarVistaPrevia();

    recargarTabla().then(() => {
      PD.ui.aviso('Noticia publicada. Ya aparece en el listado.');
      document.getElementById('pd-tabla-cuerpo')
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
```

## 6.8 Tokens de diseño: `styles.css`

La hoja de estilos se carga después de Bootstrap y lo re-viste con los valores definidos en la maquetación, usando las variables CSS del propio framework. Se reproduce el bloque de tokens y el ajuste de Bootstrap.

Fragmento de `src/assets/css/styles.css`.

```css
/* ---------------------------------------------------------------- 2. Tokens */

:root {
  /* Color */
  --pd-ink: #14161A;
  --pd-ink-soft: #2B2F36;
  --pd-paper: #FAF8F5;
  --pd-surface: #FFFFFF;
  --pd-accent: #D6303C;
  --pd-accent-dark: #B8262F;
  --pd-accent-soft: #FBE9EA;
  --pd-muted: #6B6F76;
  --pd-border: #E4E0DA;
  --pd-border-fuerte: #CFCAC2;
  --pd-exito: #3F8A55;
  --pd-exito-soft: #EEF7F0;

  /* Tipografía */
  --pd-titulares: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
  --pd-texto: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;

  /* Espaciado: la escala de la maquetación */
  --pd-e1: 8px;
  --pd-e2: 14px;
  --pd-e3: 20px;
  --pd-e4: 28px;
  --pd-e5: 56px;
  --pd-e6: 72px;

  /* Geometría */
  --pd-radio: 3px;
  --pd-control: 48px;
  --pd-control-sm: 38px;
}

/* ---------------------------------------------------------------- 3. Bootstrap */
/* Bootstrap 5.3 se configura por variables CSS; se sobrescriben las que
   afectan al aspecto para no tener que pelear con especificidad después. */

:root {
  --bs-body-font-family: var(--pd-texto);
  --bs-body-font-size: 1rem;
  --bs-body-line-height: 1.65;
  --bs-body-color: var(--pd-ink);
  --bs-body-bg: var(--pd-paper);
  --bs-border-color: var(--pd-border);
  --bs-border-radius: var(--pd-radio);
  --bs-border-radius-sm: 2px;
  --bs-primary: var(--pd-accent);
  --bs-primary-rgb: 214, 48, 60;
  --bs-link-color: var(--pd-ink);
  --bs-link-color-rgb: 20, 22, 26;
  --bs-link-hover-color: var(--pd-accent);
  --bs-link-hover-color-rgb: 214, 48, 60;
  --bs-form-invalid-color: var(--pd-accent);
  --bs-form-invalid-border-color: var(--pd-accent);
  --bs-form-valid-color: var(--pd-exito);
  --bs-form-valid-border-color: var(--pd-exito);
  --bs-emphasis-color: var(--pd-ink);
  --bs-secondary-color: var(--pd-muted);
}

/* Un .row con separación g-5 sobresale 12 px por cada lado del .container: el
   contenedor calcula su relleno con el gutter por defecto (1,5 rem) mientras la
   fila aplica márgenes negativos con el suyo (3 rem). Esta clase iguala ambos y
   evita el desplazamiento horizontal en móvil. */
.pd-contenedor-ancho {
  --bs-gutter-x: 3rem;
}

/* El contenedor del sistema de diseño mide 1200 px, no los 1140 de Bootstrap. */
@media (min-width: 1200px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1200px;
  }
}

@media (min-width: 1400px) {
  .container-xxl {
    max-width: 1200px;
  }
}
```

## 6.9 Estructura de una página: `index.html`

Marcado semántico con `header`, `main`, `section`, `article` y `footer`. Las dos zonas dinámicas quedan vacías en el HTML y las rellena `home.js`: ninguna tarjeta está escrita a mano.

Archivo completo `src/index.html` (148 líneas).

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pulso Digital — Noticias de tecnología e innovación</title>
  <meta name="description" content="Reportajes, análisis y noticias verificadas sobre inteligencia artificial, startups, software, hardware, ciberseguridad e innovación.">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/css/styles.css" rel="stylesheet">
</head>

<body>
  <a class="pd-saltar" href="#contenido">Saltar al contenido</a>

  <!-- Cabecera, buscador y navegación: los monta ui.js -->
  <header id="pd-cabecera"></header>

  <main id="contenido">

    <!-- ===== Bienvenida y noticia de portada ===== -->
    <section class="pd-hero">
      <div class="container pd-contenedor-ancho">
        <div class="row g-5 align-items-start">

          <div class="col-12 col-lg-5">
            <span class="pd-kicker">Bienvenido a Pulso Digital</span>
            <h1 class="pd-hero__titular mt-3">Tecnología contada como se debe contar.</h1>
            <p class="pd-hero__entrada mt-3">
              Reportajes, análisis y noticias verificadas sobre inteligencia artificial, startups,
              software, hardware, ciberseguridad e innovación. Guarda lo que te interesa y vuelve
              a leerlo cuando quieras.
            </p>
            <div class="d-flex flex-wrap gap-2 mt-4">
              <a href="noticias.html" class="btn btn-primary">
                Explorar noticias
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>
              </a>
              <a href="contacto.html" class="btn btn-ghost">Contactar a la redacción</a>
            </div>
            <p class="pd-meta mt-3">Portada actualizada de lunes a viernes.</p>
          </div>

          <div class="col-12 col-lg-7">
            <!-- La rellena home.js con la primera noticia destacada -->
            <div id="pd-portada" aria-busy="true"></div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== Noticias destacadas ===== -->
    <section class="pb-5">
      <div class="container">
        <div class="pd-seccion-cab d-flex align-items-end justify-content-between flex-wrap gap-2">
          <div>
            <span class="pd-kicker">Selección de la redacción</span>
            <h2 class="mt-2">Noticias destacadas</h2>
          </div>
          <a href="noticias.html" class="pd-mas">Ver todas las noticias →</a>
        </div>

        <!-- Las rellena home.js -->
        <div class="row g-4" id="pd-destacadas" aria-busy="true"></div>
      </div>
    </section>

    <!-- ===== Llamado a la acción ===== -->
    <section class="pd-cta">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-12 col-lg-8">
            <span class="pd-kicker">Tu lista personal</span>
            <h2 class="mt-2" style="font-size:clamp(1.75rem,1.2rem+2vw,2.375rem)">
              Guarda una noticia hoy y encuéntrala cuando la necesites
            </h2>
            <p class="mt-3 mb-0" style="font-size:1.03125rem">
              Sin registro y sin contraseñas: tus favoritos se guardan en tu propio navegador.
            </p>
          </div>
          <div class="col-12 col-lg-4">
            <div class="d-flex flex-column gap-2">
              <a href="favoritos.html" class="btn btn-primary">Ver mis favoritos</a>
              <a href="noticias.html" class="btn btn-outline-claro">Explorar el archivo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Sección informativa ===== -->
    <section class="py-5">
      <div class="container">
        <div class="pd-seccion-cab">
          <span class="pd-kicker">Cómo trabajamos</span>
          <h2 class="mt-2">Tres compromisos con quien nos lee</h2>
        </div>

        <div class="row g-4">
          <div class="col-12 col-md-4">
            <div class="pd-info">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D6303C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.4c0 4.6-3.1 8.3-7.5 9.6-4.4-1.3-7.5-5-7.5-9.6V6z"/><path d="M9 12l2.2 2.2L15.5 10"/></svg>
              <h3 class="mt-3">Dos fuentes, siempre</h3>
              <p class="pd-card__resumen mt-2">
                Ninguna nota se publica con una sola fuente. Si algo no se puede verificar,
                lo decimos en el texto.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="pd-info">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D6303C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h13"/></svg>
              <h3 class="mt-3">Titulares sin anzuelo</h3>
              <p class="pd-card__resumen mt-2">
                El titular dice lo que pasó. El tiempo de lectura aparece antes de que decidas
                entrar.
              </p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="pd-info">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D6303C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v7l3-2 3 2V4"/></svg>
              <h3 class="mt-3">Tu lista es tuya</h3>
              <p class="pd-card__resumen mt-2">
                Los favoritos viven en tu navegador. No pedimos correo, no creamos perfil,
                no compartimos nada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Pie de página: lo monta ui.js -->
  <footer class="pd-footer" id="pd-pie"></footer>

  <!-- Orden de carga: respaldo de datos → persistencia → datos → interfaz → vista -->
  <script src="assets/data/noticias-respaldo.js"></script>
  <script src="assets/js/storage.js"></script>
  <script src="assets/js/data.js"></script>
  <script src="assets/js/ui.js"></script>
  <script src="assets/js/home.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

# 7. Funcionalidades implementadas

La Tabla 3 relaciona cada característica exigida en el enunciado del proyecto con su
implementación.

**Tabla 3**

*Características del proyecto y su implementación*

| Característica exigida | Implementación |
|---|---|
| 1. Visualización de noticias en tarjetas | `ui.js` genera la tarjeta; el inicio y el listado la reutilizan sin duplicar marcado |
| 2. Detalle con botón de interacción | `detalle.js` pinta la nota y conecta «Añadir a favoritos» y «Contactar a la redacción» |
| 3. Gestión de favoritos con almacenamiento local | `storage.js` sobre `localStorage`; el contador de la cabecera se actualiza sin recargar y se sincroniza entre pestañas |
| 4. Página de inicio completa | Cabecera con menú de seis páginas, bienvenida, portada, destacadas, llamado a la acción, sección informativa y pie |
| 5. Formulario de contacto validado | Cinco reglas de validación, mensajes por campo y confirmación que sustituye al formulario |
| 6. Mini CRUD de noticias | Alta con vista previa en vivo y baja con confirmación, distinguiendo noticias creadas de las del archivo base |

*Nota.* Elaboración propia.

---

# 8. Pruebas realizadas

El prototipo se verificó con dos baterías automáticas, ambas incluidas en el repositorio.

La primera, `src/pruebas.html`, comprueba la capa de datos y de persistencia con 25
verificaciones: carga del catálogo, orden, filtros, búsqueda con y sin acentos, paginación,
favoritos, alta de noticias y ocultar o restaurar las del archivo base.

La segunda, `src/pruebas-e2e.py`, abre las páginas reales en el navegador —sin servidor, que es
el escenario más exigente— y comprueba 38 condiciones. La Tabla 4 resume qué verifica.

**Tabla 4**

*Comprobaciones de extremo a extremo*

| Área | Qué se comprueba |
|---|---|
| Contacto | Que el envío vacío marque los cinco campos, que rechace un correo incompleto, que un envío válido muestre la confirmación y registre el mensaje, y que el asunto llegue precargado desde el detalle |
| Publicar | Que un formulario incompleto no cree nada, que un alta válida aparezca en el catálogo y en la tabla, que eliminar una noticia del archivo base la oculte y la quite de favoritos, y que «Restaurar» la devuelva |
| Favoritos | Que el corazón del listado guarde la noticia, que el contador de la cabecera se actualice, que persista al cambiar de página y que la lista vacía muestre su estado |
| Listado | Que la búsqueda encuentre una palabra acentuada escrita sin tilde y que un término sin resultados muestre el estado vacío |
| Detalle | Que el botón alterne entre «Añadir a favoritos» y «En favoritos», que el contenido se divida en párrafos y que un identificador inexistente avise sin romperse |
| Diseño adaptable | Que ninguna de las siete páginas se desborde horizontalmente a 390 px de ancho |

*Nota.* Elaboración propia.

Dos hallazgos de estas pruebas merecen mención, porque ambos habrían llegado a la entrega sin
ellas. El primero: una fila de Bootstrap con separación `g-5` dentro de un contenedor sobresale
doce píxeles por cada lado, porque el contenedor calcula su relleno con la separación por defecto
mientras la fila aplica márgenes negativos con la suya; eso desbordaba tres páginas en móvil. El
segundo: Chrome sin interfaz gráfica no admite ventanas de menos de unos 500 px en Windows, de
modo que una comprobación «a 390 px» medía en realidad 504 y daba por buena una página rota. La
medición se rehízo cargando cada página dentro de un marco de 390 px.

---

# 9. Fotografías y licencias

Las 18 fotografías del aplicativo se obtuvieron a través de Openverse, el buscador de contenido
con licencia abierta de la Fundación Wikimedia, filtrando las licencias que permiten uso y
modificación. El reparto es de diez con licencia CC BY, cinco con CC0, dos en dominio público y
una con CC BY-SA.

Las licencias CC BY y CC BY-SA obligan a atribuir. El crédito —título, autor, licencia y enlace
al original— se guarda dentro de cada noticia en el archivo JSON, se muestra en el pie de foto de
la vista de detalle y se reúne completo en la página `creditos.html`, reproducida en la Figura 15.

Todas las fotografías son de archivo e ilustrativas: no documentan los hechos narrados, que son
contenido de ejemplo de un prototipo académico. El pie de foto lo indica expresamente para que
ningún lector las interprete como prueba gráfica.

---

# 10. Repositorio

El proyecto está publicado en un repositorio público, de modo que no requiere gestionar permisos
de acceso para su revisión:

https://github.com/DaliaRueda/PulsoDigital

El historial se organiza en cuatro confirmaciones que siguen las fases del trabajo: estructura y
plan, maquetación de la Entrega 1, capa de datos y estilos, y las siete vistas con sus pruebas.

---

# 11. Conclusiones

1. Comprobar los supuestos en el navegador antes de escribir el código evitó un error que habría
   llegado hasta la entrega. El plan preveía módulos ES; al medirlo se vio que el navegador los
   bloquea cuando la página se abre con doble clic, que es exactamente el escenario que la guía
   exige soportar. Cambiar la decisión costó una tarde; descubrirlo al final habría costado
   rehacer todo el JavaScript.

2. Concentrar el acceso a `localStorage` en un único módulo resultó más útil de lo previsto. La
   eliminación de noticias, los favoritos y los mensajes de contacto comparten el mismo mecanismo,
   y cuando hubo que impedir que una noticia eliminada quedara colgando en favoritos, el cambio se
   hizo en un solo lugar.

3. Las pruebas automáticas encontraron dos fallos que la revisión visual no detectó, y uno de
   ellos estaba en la propia prueba: medía un ancho de móvil que el navegador no estaba aplicando.
   Una comprobación que pasa no garantiza que el sistema funcione; garantiza que la comprobación
   pasa, y conviene desconfiar cuando el resultado no coincide con lo que se ve.

4. Partir de una maquetación detallada acortó el desarrollo de forma apreciable. Las decisiones
   discutibles —ancho de lectura, jerarquía de la portada, estados vacíos— ya estaban tomadas, y
   el trabajo consistió en traducirlas, no en volver a decidirlas.

5. Las dos desviaciones respecto al diseño surgieron de limitaciones reales del medio, no de
   descuido: no se puede subir un archivo sin servidor, y tres elementos en línea no caben en 390
   píxeles. Documentarlas deja el criterio a la vista de quien evalúa.

6. El prototipo queda preparado para la Entrega 3. La cabecera y el pie ya están escritos como
   funciones que producen marcado a partir de datos, que es exactamente lo que serán
   `HeaderComponent` y `FooterComponent` en Angular, y los módulos de datos y persistencia se
   corresponden con los servicios que consumirán esos componentes.

---

# 12. Referencias

American Psychological Association. (2020). *Publication manual of the American Psychological
Association* (7.ª ed.). https://doi.org/10.1037/0000165-000

Bootstrap Team. (2026). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/

Creative Commons. (2026). *About CC licenses*. https://creativecommons.org/share-your-work/cclicenses/

Linube. (2023). *¿Qué son los mockups?* https://linube.com/blog/que-son-los-mockups/

MDN Web Docs. (2026). *Using the Fetch API*.
https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch

MDN Web Docs. (2026). *Window.localStorage*.
https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

Nielsen, J. (2020). *10 usability heuristics for user interface design*. Nielsen Norman Group.
https://www.nngroup.com/articles/ten-usability-heuristics/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/
