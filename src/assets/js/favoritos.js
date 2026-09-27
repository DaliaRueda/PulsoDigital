/* ============================================================================
   favoritos.js — lista personal del usuario
   Pulso Digital · Entrega 2

   Cruza los identificadores guardados en localStorage con el catálogo. Un
   identificador puede quedar huérfano si la noticia se eliminó desde la vista
   de gestión: en ese caso se descarta en silencio y se limpia la lista.

   La disposición es horizontal a propósito, para que se distinga del catálogo
   y comunique que es una selección propia.
   ========================================================================== */

(function (PD) {
  'use strict';

  const lista = document.getElementById('pd-lista');
  const resumen = document.getElementById('pd-resumen-fav');
  const botonVaciar = document.getElementById('pd-vaciar');
  const aviso = document.getElementById('pd-aviso-persistencia');

  let catalogo = [];

  /* ---------------------------------------------------------------- Pintado */

  /** Fila de la lista: miniatura, datos y acciones. */
  function fila(n) {
    const url = 'detalle.html?id=' + encodeURIComponent(n.id);
    return '<article class="pd-fav" data-id="' + PD.ui.escapar(n.id) + '">' +
      PD.ui.imagen(n, 'pd-fav__img') +
      '<div class="pd-fav__datos d-flex flex-column gap-2">' +
      '<span class="pd-badge">' + PD.ui.escapar(n.categoria) + '</span>' +
      '<h2 class="pd-card__titulo" style="font-size:1.3125rem">' +
      '<a href="' + url + '">' + PD.ui.escapar(n.titulo) + '</a></h2>' +
      '<span class="pd-meta">Por ' + PD.ui.escapar(n.autor) + ' · ' +
      PD.ui.escapar(PD.ui.fecha(n.fecha)) + ' · ' +
      PD.ui.escapar(n.tiempoLectura || 3) + ' min</span>' +
      '</div>' +
      '<div class="pd-fav__acciones">' +
      '<a href="' + url + '" class="btn btn-ink btn-sm w-100">Ver más</a>' +
      '<button type="button" class="btn btn-sm w-100 pd-quitar" data-quitar="' +
      PD.ui.escapar(n.id) + '" style="background:transparent;color:var(--pd-accent);' +
      'border-color:var(--pd-accent)">' + PD.ui.ICONOS.equis + ' Quitar de favoritos</button>' +
      '</div></article>';
  }

  function guardadas() {
    const ids = PD.almacen.favoritos();
    const encontradas = ids
      .map((id) => catalogo.find((n) => n.id === id))
      .filter(Boolean);

    // Si alguna noticia guardada ya no existe, se depura la lista.
    if (encontradas.length !== ids.length) {
      PD.almacen.vaciarFavoritos();
      encontradas.forEach((n) => PD.almacen.alternarFavorito(n.id));
    }
    return encontradas;
  }

  function pintar() {
    const items = guardadas();
    lista.removeAttribute('aria-busy');

    if (!items.length) {
      resumen.innerHTML = '';
      botonVaciar.hidden = true;
      aviso.hidden = true;
      lista.innerHTML = PD.ui.vacio({
        titulo: 'Aún no tienes favoritos',
        texto: 'Pulsa el corazón en cualquier noticia y la guardarás aquí. No necesitas crear ' +
          'una cuenta.',
        boton: { texto: 'Explorar noticias', url: 'noticias.html' }
      });
      return;
    }

    botonVaciar.hidden = false;
    aviso.hidden = false;
    resumen.innerHTML = 'Tienes <strong>' + items.length + '</strong> ' +
      (items.length === 1 ? 'noticia guardada' : 'noticias guardadas') +
      '. Se conservan en tu navegador con <code>localStorage</code>, sin registro.';

    lista.innerHTML = items.map(fila).join('');
  }

  /* ------------------------------------------------------------- Conexiones */

  function conectar() {
    // Quitar una noticia: se anima la salida y después se vuelve a pintar.
    lista.addEventListener('click', (e) => {
      const boton = e.target.closest('[data-quitar]');
      if (!boton) return;
      const id = boton.getAttribute('data-quitar');
      const tarjeta = boton.closest('.pd-fav');

      PD.almacen.quitarFavorito(id);
      PD.ui.aviso('Noticia quitada de favoritos');

      if (tarjeta) {
        tarjeta.classList.add('saliendo');
        window.setTimeout(pintar, 260);
      } else {
        pintar();
      }
    });

    const modal = document.getElementById('pd-modal-vaciar');
    const confirmar = document.getElementById('pd-confirmar-vaciar');

    botonVaciar.addEventListener('click', () => {
      if (window.bootstrap && modal) {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
      } else if (window.confirm('¿Vaciar tu lista de favoritos?')) {
        vaciar();
      }
    });

    if (confirmar) {
      confirmar.addEventListener('click', () => {
        vaciar();
        if (window.bootstrap && modal) {
          window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        }
      });
    }
  }

  function vaciar() {
    PD.almacen.vaciarFavoritos();
    PD.ui.aviso('Lista de favoritos vaciada');
    pintar();
  }

  /* ------------------------------------------------------------- Arranque */

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('favoritos');
    conectar();

    PD.datos.cargar()
      .then((c) => {
        catalogo = c;
        pintar();
      })
      .catch((e) => PD.ui.errorCarga(lista, e));
  });
})(window.PD);
