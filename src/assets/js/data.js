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
