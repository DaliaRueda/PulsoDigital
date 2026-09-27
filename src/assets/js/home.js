/* ============================================================================
   home.js — página de inicio
   Pulso Digital · Entrega 2

   Rellena las dos zonas dinámicas de index.html a partir del catálogo:
   la noticia de portada y las tres tarjetas destacadas. Ninguna tarjeta está
   escrita a mano en el HTML.
   ========================================================================== */

(function (PD) {
  'use strict';

  const portada = document.getElementById('pd-portada');
  const destacadas = document.getElementById('pd-destacadas');

  /**
   * Bloque grande de la noticia de portada.
   * @param {Object} n
   * @returns {string} HTML
   */
  function bloquePortada(n) {
    const url = 'detalle.html?id=' + encodeURIComponent(n.id);
    return '' +
      '<article class="pd-portada">' +
      PD.ui.imagen(n, 'pd-portada__img') +
      '<div class="pd-portada__cuerpo">' +
      '<div class="d-flex align-items-center gap-2 flex-wrap">' +
      '<span class="pd-badge pd-badge--ink">Portada</span>' +
      '<span class="pd-badge">' + PD.ui.escapar(n.categoria) + '</span>' +
      '</div>' +
      '<h2 class="pd-portada__titulo"><a href="' + url + '">' +
      PD.ui.escapar(n.titulo) + '</a></h2>' +
      '<p class="pd-card__resumen" style="font-size:0.96875rem">' +
      PD.ui.escapar(n.resumen) + '</p>' +
      '<div class="d-flex align-items-center justify-content-between gap-2 flex-wrap ' +
      'border-top pt-3 mt-1">' +
      '<span class="pd-meta">Por ' + PD.ui.escapar(n.autor) + ' · ' +
      PD.ui.escapar(PD.ui.fecha(n.fecha)) + ' · ' +
      PD.ui.escapar(n.tiempoLectura || 3) + ' min de lectura</span>' +
      '<a href="' + url + '" class="pd-mas">Ver más →</a>' +
      '</div></div></article>';
  }

  function pintar(lista) {
    const marcadas = PD.datos.destacadas(lista);
    // Si aún no hay ninguna marcada como destacada, se usan las más recientes.
    const fuente = marcadas.length ? marcadas : lista;

    if (portada) {
      portada.removeAttribute('aria-busy');
      portada.innerHTML = fuente.length ? bloquePortada(fuente[0]) : '';
    }

    if (destacadas) {
      destacadas.removeAttribute('aria-busy');
      const tres = fuente.slice(1, 4);
      destacadas.innerHTML = tres.length
        ? tres.map((n) =>
          '<div class="col-12 col-sm-6 col-lg-4">' + PD.ui.tarjeta(n) + '</div>').join('')
        : '<div class="col-12">' + PD.ui.vacio({
          titulo: 'Todavía no hay noticias destacadas',
          texto: 'Marca una noticia como destacada al publicarla y aparecerá aquí.',
          boton: { texto: 'Publicar una noticia', url: 'publicar.html' }
        }) + '</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('inicio');
    PD.ui.conectarFavoritos(destacadas);

    PD.datos.cargar()
      .then(pintar)
      .catch((e) => PD.ui.errorCarga(destacadas, e));
  });
})(window.PD);
