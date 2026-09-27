/* ============================================================================
   creditos.js — atribución de las fotografías
   Pulso Digital · Entrega 2

   Las licencias CC BY y CC BY-SA exigen nombrar autor, licencia y origen. La
   información viaja dentro de cada noticia, en el campo «credito», de modo que
   nunca pueda desincronizarse de la imagen a la que pertenece.
   ========================================================================== */

(function (PD) {
  'use strict';

  const cuerpo = document.getElementById('pd-creditos');

  function fila(n) {
    const c = n.credito;
    const detalle = 'detalle.html?id=' + encodeURIComponent(n.id);
    if (!c) {
      return '<tr><td><div class="pd-marcador pd-tabla__miniatura"></div></td>' +
        '<td><a href="' + detalle + '">' + PD.ui.escapar(n.titulo) + '</a></td>' +
        '<td colspan="3" class="pd-meta">Sin fotografía: se muestra un marcador.</td></tr>';
    }
    return '<tr>' +
      '<td><img class="pd-tabla__miniatura" src="' + PD.ui.escapar(n.imagen) + '" alt="" ' +
      'onerror="PD.ui.imagenRota(this)"></td>' +
      '<td><a href="' + detalle + '">' + PD.ui.escapar(n.titulo) + '</a></td>' +
      '<td><a href="' + PD.ui.escapar(c.url) + '" target="_blank" rel="noopener noreferrer">«' +
      PD.ui.escapar(c.titulo) + '»</a></td>' +
      '<td>' + PD.ui.escapar(c.autor) + '</td>' +
      '<td>' + PD.ui.escapar(c.licencia) + '</td></tr>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('');

    PD.datos.cargar()
      .then((lista) => {
        cuerpo.removeAttribute('aria-busy');
        cuerpo.innerHTML = lista.map(fila).join('');
      })
      .catch((e) => PD.ui.errorCarga(cuerpo, e));
  });
})(window.PD);
