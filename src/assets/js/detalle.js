/* ============================================================================
   detalle.js — vista de una noticia
   Pulso Digital · Entrega 2

   Lee el identificador de la dirección (detalle.html?id=n-001), pinta la nota
   completa y conecta las dos acciones que pide la característica 2 de la guía:
   añadir a favoritos y contactar a la redacción.
   ========================================================================== */

(function (PD) {
  'use strict';

  const contenedor = document.getElementById('pd-detalle');
  const seccionRel = document.getElementById('pd-relacionadas-seccion');
  const relacionadas = document.getElementById('pd-relacionadas');

  /* ---------------------------------------------------------------- Pintado */

  function migas(n) {
    return '<div class="container pt-4"><nav class="pd-migas" aria-label="Ruta de navegación">' +
      '<a href="index.html">Inicio</a><span aria-hidden="true">›</span>' +
      '<a href="noticias.html">Noticias</a><span aria-hidden="true">›</span>' +
      '<a href="noticias.html?categoria=' + encodeURIComponent(n.categoria) + '">' +
      PD.ui.escapar(n.categoria) + '</a><span aria-hidden="true">›</span>' +
      '<span style="color:var(--pd-ink-soft)">' + PD.ui.escapar(recortar(n.titulo, 48)) +
      '</span></nav></div>';
  }

  function recortar(texto, largo) {
    const t = String(texto || '');
    return t.length > largo ? t.slice(0, largo).trim() + '…' : t;
  }

  function cabecera(n) {
    return '<section class="py-4"><div class="container">' +
      '<div class="pd-articulo__cab d-flex flex-column gap-3 align-items-start">' +
      '<span class="pd-badge">' + PD.ui.escapar(n.categoria) + '</span>' +
      '<h1 class="pd-articulo__titular">' + PD.ui.escapar(n.titulo) + '</h1>' +
      '<p class="pd-articulo__entradilla mb-0">' + PD.ui.escapar(n.resumen) + '</p>' +
      '<div class="pd-firma w-100 mt-1">' +
      '<span class="pd-meta">Por <strong style="color:var(--pd-ink)">' +
      PD.ui.escapar(n.autor) + '</strong> · Publicado el ' +
      PD.ui.escapar(PD.ui.fecha(n.fecha, 'largo')) + ' · ' +
      PD.ui.escapar(n.tiempoLectura || 3) + ' min de lectura</span>' +
      '<span class="pd-meta">Identificador: ' + PD.ui.escapar(n.id) + '</span>' +
      '</div></div></div></section>';
  }

  function portada(n) {
    return '<section class="pb-4"><div class="container">' +
      PD.ui.imagen(n, 'pd-articulo__portada') +
      creditoFoto(n) +
      '</div></section>';
  }

  /**
   * Pie de foto con la atribución de la imagen. Las licencias CC BY y CC BY-SA
   * obligan a nombrar autor, licencia y origen: no es un adorno.
   */
  function creditoFoto(n) {
    const c = n.credito;
    if (!c) {
      return '<p class="pd-meta mt-2 fst-italic">Imagen no disponible: se muestra un marcador.</p>';
    }
    // «De archivo, ilustrativa» no es relleno: las noticias de este prototipo son
    // de ejemplo y la foto no documenta el hecho que se narra. Decirlo evita que
    // el lector la interprete como prueba grafica.
    return '<p class="pd-meta mt-2">Fotografía de archivo, ilustrativa: «' +
      PD.ui.escapar(c.titulo) + '» de ' +
      PD.ui.escapar(c.autor) + ', licencia ' + PD.ui.escapar(c.licencia) + '. ' +
      '<a href="' + PD.ui.escapar(c.url) + '" target="_blank" rel="noopener noreferrer" ' +
      'style="text-decoration:underline">Ver original</a>. ' +
      '<a href="creditos.html" style="text-decoration:underline">Créditos de todas las imágenes</a>.' +
      '</p>';
  }

  /** Convierte el campo contenido, separado por líneas en blanco, en párrafos. */
  function cuerpo(n) {
    const parrafos = String(n.contenido || '')
      .split(/\n\s*\n/)
      .filter((p) => p.trim())
      .map((p) => '<p>' + PD.ui.escapar(p.trim()) + '</p>')
      .join('');
    return parrafos || '<p>' + PD.ui.escapar(n.resumen) + '</p>';
  }

  function panelAcciones(n) {
    const esFav = PD.almacen.esFavorito(n.id);
    return '<div class="pd-panel">' +
      '<span class="pd-kicker">Interactuar</span>' +
      '<div class="d-flex flex-column gap-2 pt-3">' +
      '<button type="button" id="pd-boton-fav" class="btn w-100" ' +
      'aria-pressed="' + (esFav ? 'true' : 'false') + '">' +
      PD.ui.ICONOS.corazon + '<span id="pd-boton-fav-texto">' +
      (esFav ? 'En favoritos' : 'Añadir a favoritos') + '</span></button>' +
      '<a class="btn btn-ghost w-100" href="contacto.html?asunto=' +
      encodeURIComponent('Sugerencia de noticia') + '&ref=' + encodeURIComponent(n.id) + '">' +
      PD.ui.ICONOS.correo + ' Contactar a la redacción</a>' +
      '</div></div>';
  }

  function ficha(n) {
    const fila = (clave, valor) =>
      '<li><span class="clave">' + PD.ui.escapar(clave) + '</span>' +
      '<span class="valor">' + PD.ui.escapar(valor) + '</span></li>';
    return '<div class="pd-panel">' +
      '<span class="pd-kicker">Ficha de la noticia</span>' +
      '<ul class="pd-ficha pt-2">' +
      fila('Categoría', n.categoria) +
      fila('Autor', n.autor) +
      fila('Publicado', PD.ui.fecha(n.fecha, 'largo')) +
      fila('Lectura', (n.tiempoLectura || 3) + ' minutos') +
      fila('Origen', PD.datos.esCreada(n) ? 'Creada por el usuario' : 'Archivo base') +
      '</ul></div>';
  }

  function volver() {
    return '<div class="pd-panel pd-panel--ink">' +
      '<span class="pd-kicker">Volver</span>' +
      '<p class="mt-3 mb-3" style="font-size:0.90625rem;line-height:1.6">' +
      'Puedes seguir explorando el archivo completo o revisar lo que ya guardaste.</p>' +
      '<div class="d-flex flex-column gap-2">' +
      '<a class="btn btn-sm btn-outline-claro w-100" href="noticias.html">← Todas las noticias</a>' +
      '<a class="btn btn-sm btn-outline-claro w-100" href="favoritos.html">Mis favoritos</a>' +
      '</div></div>';
  }

  function pintar(n) {
    document.title = n.titulo + ' — Pulso Digital';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', n.resumen);

    contenedor.removeAttribute('aria-busy');
    contenedor.innerHTML =
      migas(n) + cabecera(n) + portada(n) +
      '<section class="pb-5"><div class="container pd-contenedor-ancho">' +
      '<div class="row g-5">' +
      '<div class="col-12 col-lg-8"><div class="pd-prosa">' + cuerpo(n) + '</div></div>' +
      '<div class="col-12 col-lg-4"><div class="d-flex flex-column gap-3">' +
      panelAcciones(n) + ficha(n) + volver() +
      '</div></div></div></div></section>';

    conectarFavorito(n);
  }

  /** El botón alterna estado y texto sin recargar la página. */
  function conectarFavorito(n) {
    const boton = document.getElementById('pd-boton-fav');
    const texto = document.getElementById('pd-boton-fav-texto');
    if (!boton) return;

    const vestir = (activo) => {
      boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
      boton.className = activo ? 'btn w-100 pd-boton-fav--activo' : 'btn btn-primary w-100';
      texto.textContent = activo ? 'En favoritos' : 'Añadir a favoritos';
    };

    vestir(PD.almacen.esFavorito(n.id));

    boton.addEventListener('click', () => {
      const guardada = PD.almacen.alternarFavorito(n.id);
      vestir(guardada);
      PD.ui.aviso(guardada ? 'Noticia guardada en favoritos' : 'Noticia quitada de favoritos');
    });
  }

  function pintarRelacionadas(lista, n) {
    const rel = PD.datos.relacionadas(lista, n, 3);
    if (!rel.length) return;
    seccionRel.hidden = false;
    relacionadas.innerHTML = rel.map((r) =>
      '<div class="col-12 col-sm-6 col-lg-4">' + PD.ui.tarjeta(r) + '</div>').join('');
    PD.ui.conectarFavoritos(relacionadas);
  }

  function noEncontrada() {
    contenedor.removeAttribute('aria-busy');
    contenedor.innerHTML = '<div class="container py-5">' + PD.ui.vacio({
      titulo: 'No encontramos esa noticia',
      texto: 'Puede que se haya eliminado desde la vista de gestión, o que la dirección no sea ' +
        'correcta.',
      boton: { texto: 'Ver todas las noticias', url: 'noticias.html' }
    }) + '</div>';
  }

  /* ------------------------------------------------------------- Arranque */

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('noticias');

    const id = PD.ui.parametro('id');
    if (!id) {
      noEncontrada();
      return;
    }

    PD.datos.cargar()
      .then((lista) => {
        const n = lista.find((x) => x.id === id);
        if (!n) {
          noEncontrada();
          return;
        }
        pintar(n);
        pintarRelacionadas(lista, n);
      })
      .catch((e) => PD.ui.errorCarga(contenedor, e));
  });
})(window.PD);
