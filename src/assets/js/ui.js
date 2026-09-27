/* ============================================================================
   ui.js — piezas de interfaz compartidas por las siete páginas
   Pulso Digital · Entrega 2

   La cabecera, la barra de navegación y el pie se escriben una sola vez aquí y
   cada página los monta con PD.ui.montarLayout('noticias'). Evita mantener
   siete copias del mismo marcado y prepara la Entrega 3: estas funciones se
   traducen casi literalmente a HeaderComponent y FooterComponent en Angular.

   Todo el texto que procede de datos pasa por escapar() antes de insertarse:
   las noticias que crea el usuario son entrada no confiable.
   ========================================================================== */

window.PD = window.PD || {};

(function (PD) {
  'use strict';

  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  /* -------------------------------------------------------------- Utilidades */

  /**
   * Convierte a texto seguro para insertar como HTML.
   * @param {*} texto
   * @returns {string}
   */
  function escapar(texto) {
    return String(texto === null || texto === undefined ? '' : texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Da formato a una fecha ISO (AAAA-MM-DD).
   * Se parte la cadena en lugar de usar new Date(): éste la interpreta como
   * UTC y en Colombia devolvería el día anterior.
   * @param {string} iso
   * @param {'corto'|'largo'} formato
   */
  function fecha(iso, formato) {
    const p = String(iso || '').split('-');
    if (p.length !== 3) return '';
    const dia = parseInt(p[2], 10);
    const mes = parseInt(p[1], 10) - 1;
    if (isNaN(dia) || isNaN(mes) || mes < 0 || mes > 11) return '';
    if (formato === 'largo') return dia + ' de ' + MESES[mes] + ' de ' + p[0];
    // en la tarjeta el año sobra: la maquetación muestra solo «12 sep»
    if (formato === 'tarjeta') return dia + ' ' + MESES_CORTOS[mes];
    return dia + ' ' + MESES_CORTOS[mes] + ' ' + p[0];
  }

  /** Fecha de hoy en la franja superior, con la inicial en mayúscula. */
  function fechaDeHoy() {
    try {
      const t = new Date().toLocaleDateString('es-CO', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
      return t.charAt(0).toUpperCase() + t.slice(1);
    } catch (e) {
      const h = new Date();
      return h.getDate() + ' de ' + MESES[h.getMonth()] + ' de ' + h.getFullYear();
    }
  }

  /** Lee un parámetro de la dirección, por ejemplo detalle.html?id=n-001 */
  function parametro(nombre) {
    return new URLSearchParams(window.location.search).get(nombre);
  }

  /* ----------------------------------------------------------------- Iconos */
  /* Dibujados como SVG en línea: heredan el color del texto, escalan sin
     pérdida y no dependen de ninguna librería de iconos. */

  const ICONOS = {
    pulso: '<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#D6303C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 17h6l3.6-10 5.6 20 3.6-10H30"/></svg>',
    lupa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
    corazon: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.2S4.6 15.5 4.6 10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 7.4 3.4c0 5.1-7.4 9.8-7.4 9.8z"/></svg>',
    flecha: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>',
    correo: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    telefono: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z"/></svg>',
    lugar: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.8-6-6.8-11a6.8 6.8 0 1 1 13.6 0c0 5-6.8 11-6.8 11z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    reloj: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>',
    papelera: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M9.5 7V5h5v2"/><path d="M6.5 7l1 12.5h9L17.5 7"/></svg>',
    mas: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    visto: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    equis: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>',
    alerta: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5l8.5 15h-17z"/><path d="M12 10v4"/><path d="M12 17.2v.2"/></svg>',
    info: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11.5v5"/><path d="M12 7.8v.2"/></svg>'
  };

  /* -------------------------------------------------------- Cabecera y pie */

  const PAGINAS = [
    { clave: 'inicio', texto: 'Inicio', url: 'index.html' },
    { clave: 'noticias', texto: 'Noticias', url: 'noticias.html' },
    { clave: 'favoritos', texto: 'Favoritos', url: 'favoritos.html' },
    { clave: 'publicar', texto: 'Publicar', url: 'publicar.html' },
    { clave: 'contacto', texto: 'Contacto', url: 'contacto.html' },
    { clave: 'acerca', texto: 'Acerca de', url: 'acerca.html' }
  ];

  const CONTACTO = {
    correo: 'redaccion@pulsodigital.co',
    telefono: '+57 601 000 0000',
    lugar: 'Bogotá D. C., Colombia',
    horario: 'Lunes a viernes, 8:00 a. m. – 6:00 p. m.'
  };

  function cabeceraHTML(activa) {
    const enlaces = PAGINAS.map((p) =>
      '<li class="nav-item"><a class="nav-link' + (p.clave === activa ? ' activo' : '') +
      '" href="' + p.url + '"' + (p.clave === activa ? ' aria-current="page"' : '') + '>' +
      p.texto + '</a></li>').join('');

    return '' +
      '<div class="pd-topbar"><div class="container"><div class="pd-topbar__interior">' +
      '<span>' + escapar(fechaDeHoy()) + '</span>' +
      '<span class="pd-topbar__edicion">Tecnología e innovación · Edición Colombia</span>' +
      '</div></div></div>' +

      '<div class="pd-masthead"><div class="container">' +
      '<div class="d-flex align-items-center justify-content-between gap-3 flex-wrap py-3">' +
      '<a class="pd-marca" href="index.html" aria-label="Pulso Digital, ir al inicio">' +
      ICONOS.pulso +
      '<span class="pd-marca__nombre">Pulso Digital</span>' +
      '<span class="pd-marca__lema">El latido de la innovación</span>' +
      '</a>' +
      '<div class="d-flex align-items-center gap-3 flex-grow-1 justify-content-end pd-cabecera__acciones">' +
      '<form class="pd-buscador pd-buscador--cabecera" role="search" id="pd-buscador-cabecera">' +
      ICONOS.lupa +
      '<label class="visually-hidden" for="pd-q">Buscar noticias</label>' +
      '<input id="pd-q" name="q" type="search" placeholder="Buscar noticias…" autocomplete="off">' +
      '</form>' +
      '<a href="favoritos.html" class="pd-favlink">' + ICONOS.corazon + ' Favoritos ' +
      '<span class="pd-favlink__contador" id="pd-contador-fav">0</span></a>' +
      '</div></div></div></div>' +

      '<nav class="navbar navbar-expand-lg pd-nav" aria-label="Navegación principal">' +
      '<div class="container">' +
      '<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" ' +
      'data-bs-target="#pd-menu" aria-controls="pd-menu" aria-expanded="false" ' +
      'aria-label="Mostrar u ocultar el menú">' +
      '<span class="navbar-toggler-icon"></span></button>' +
      '<div class="collapse navbar-collapse" id="pd-menu">' +
      '<ul class="navbar-nav">' + enlaces + '</ul>' +
      '<span class="pd-meta ms-lg-auto d-none d-lg-block" ' +
      'style="font-size:12px;letter-spacing:.1em;text-transform:uppercase">Actualizado hoy</span>' +
      '</div></div></nav>';
  }

  function pieHTML() {
    const secciones = PAGINAS.map((p) =>
      '<li><a href="' + p.url + '">' + p.texto + '</a></li>').join('');

    const categorias = PD.datos.CATEGORIAS.map((c) =>
      '<li><a href="noticias.html?categoria=' + encodeURIComponent(c) + '">' +
      escapar(c) + '</a></li>').join('');

    const dato = (icono, texto) =>
      '<li class="d-flex gap-2 align-items-start">' +
      '<span class="flex-shrink-0 mt-1">' + icono + '</span>' + escapar(texto) + '</li>';

    return '' +
      '<div class="container">' +
      '<div class="row g-4 pt-5 pb-4">' +
      '<div class="col-12 col-lg-4">' +
      '<div class="d-flex align-items-center gap-2 mb-3">' + ICONOS.pulso +
      '<span style="font-family:var(--pd-titulares);font-weight:700;font-size:22px;' +
      'letter-spacing:-0.03em;color:#FFF">Pulso Digital</span></div>' +
      '<p style="font-size:14.5px;line-height:1.65;max-width:330px">Periodismo de tecnología e ' +
      'innovación. Un proyecto académico del módulo de Desarrollo de Front-end.</p>' +
      '</div>' +
      '<div class="col-6 col-lg-2"><h2>Secciones</h2><ul>' + secciones + '</ul></div>' +
      '<div class="col-6 col-lg-3"><h2>Categorías</h2><ul>' + categorias + '</ul></div>' +
      '<div class="col-12 col-lg-3"><h2>Contacto</h2><ul>' +
      dato(ICONOS.correo, CONTACTO.correo) +
      dato(ICONOS.telefono, CONTACTO.telefono) +
      dato(ICONOS.lugar, CONTACTO.lugar) +
      dato(ICONOS.reloj, CONTACTO.horario) +
      '</ul></div>' +
      '</div>' +
      '<div class="pd-footer__abajo">' +
      '<span>© 2026 Pulso Digital · Proyecto académico — Módulo Desarrollo de Front-end</span>' +
      '<span class="d-flex gap-4 flex-wrap"><a href="creditos.html">Créditos de imágenes</a>' +
      '<a href="#">Términos</a><a href="#">Privacidad</a></span>' +
      '</div></div>';
  }

  /**
   * Monta cabecera y pie en la página y deja conectados el contador de
   * favoritos, el buscador y el resaltado de la página activa.
   * @param {string} activa clave de la página: 'inicio', 'noticias', …
   */
  function montarLayout(activa) {
    const cab = document.getElementById('pd-cabecera');
    const pie = document.getElementById('pd-pie');
    if (cab) cab.innerHTML = cabeceraHTML(activa);
    if (pie) pie.innerHTML = pieHTML();

    actualizarContador();
    PD.almacen.alCambiarFavoritos(actualizarContador);

    // El buscador de la cabecera lleva al listado con el término aplicado.
    const form = document.getElementById('pd-buscador-cabecera');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = form.querySelector('#pd-q').value.trim();
        window.location.href = 'noticias.html' + (q ? '?q=' + encodeURIComponent(q) : '');
      });
    }
  }

  function actualizarContador() {
    const n = PD.almacen.contarFavoritos();
    document.querySelectorAll('#pd-contador-fav').forEach((el) => {
      el.textContent = String(n);
    });
  }

  /* ---------------------------------------------------------------- Tarjeta */

  /**
   * Tarjeta de noticia. Es el mismo componente en el inicio y en el listado.
   * @param {Object} n noticia
   * @param {{favorito?: boolean}} opciones
   * @returns {string} HTML
   */
  function tarjeta(n, opciones) {
    const o = opciones || {};
    const activo = o.favorito === undefined ? PD.almacen.esFavorito(n.id) : o.favorito;
    const url = 'detalle.html?id=' + encodeURIComponent(n.id);

    return '' +
      '<article class="pd-card">' +
      imagen(n, 'pd-card__img') +
      '<div class="pd-card__cuerpo">' +
      '<span class="pd-badge">' + escapar(n.categoria) + '</span>' +
      '<h3 class="pd-card__titulo"><a href="' + url + '">' + escapar(n.titulo) + '</a></h3>' +
      '<p class="pd-card__resumen">' + escapar(n.resumen) + '</p>' +
      '</div>' +
      '<div class="pd-card__pie">' +
      '<span class="pd-meta">' + escapar(fecha(n.fecha, 'tarjeta')) + ' · ' +
      escapar(n.tiempoLectura || 3) + ' min</span>' +
      '<div class="d-flex align-items-center gap-2">' +
      botonFavorito(n.id, activo) +
      '<a href="' + url + '" class="pd-mas">Ver más →</a>' +
      '</div></div></article>';
  }

  /** Imagen de la noticia, o marcador si la creada no aportó ninguna. */
  function imagen(n, clase) {
    if (!n.imagen) {
      return '<div class="pd-marcador ' + clase + '" style="aspect-ratio:16/9">' +
        '<span>Sin imagen</span></div>';
    }
    return '<img class="' + clase + '" src="' + escapar(n.imagen) + '" alt="' +
      escapar(n.titulo) + '" loading="lazy" onerror="PD.ui.imagenRota(this)">';
  }

  /** Sustituye por un marcador la imagen cuya ruta no existe. */
  function imagenRota(img) {
    const clase = img.className;
    const rep = document.createElement('div');
    rep.className = 'pd-marcador ' + clase;
    rep.style.aspectRatio = '16 / 9';
    rep.innerHTML = '<span>Sin imagen</span>';
    if (img.parentNode) img.parentNode.replaceChild(rep, img);
  }

  function botonFavorito(id, activo) {
    return '<button type="button" class="pd-iconbtn" data-favorito="' + escapar(id) + '" ' +
      'aria-pressed="' + (activo ? 'true' : 'false') + '" ' +
      'title="' + (activo ? 'Quitar de favoritos' : 'Agregar a favoritos') + '" ' +
      'aria-label="' + (activo ? 'Quitar de favoritos' : 'Agregar a favoritos') + '">' +
      ICONOS.corazon + '</button>';
  }

  /**
   * Conecta, por delegación, todos los botones de favorito de un contenedor.
   * Por delegación para que siga funcionando cuando se repinta la lista.
   * @param {Element} contenedor
   * @param {Function} [alCambiar] se llama con (id, guardada)
   */
  function conectarFavoritos(contenedor, alCambiar) {
    if (!contenedor) return;
    contenedor.addEventListener('click', (e) => {
      const boton = e.target.closest('[data-favorito]');
      if (!boton) return;
      const id = boton.getAttribute('data-favorito');
      const guardada = PD.almacen.alternarFavorito(id);
      boton.setAttribute('aria-pressed', guardada ? 'true' : 'false');
      const etiqueta = guardada ? 'Quitar de favoritos' : 'Agregar a favoritos';
      boton.setAttribute('title', etiqueta);
      boton.setAttribute('aria-label', etiqueta);
      aviso(guardada ? 'Noticia guardada en favoritos' : 'Noticia quitada de favoritos');
      if (typeof alCambiar === 'function') alCambiar(id, guardada);
    });
  }

  /* ------------------------------------------------------- Estados y avisos */

  /**
   * Bloque de estado vacío.
   * @param {{titulo: string, texto: string, boton?: {texto: string, url?: string, id?: string}}} o
   */
  function vacio(o) {
    const b = o.boton
      ? (o.boton.url
        ? '<a href="' + o.boton.url + '" class="btn btn-primary btn-sm mt-2">' +
          escapar(o.boton.texto) + '</a>'
        : '<button type="button" id="' + escapar(o.boton.id || '') +
          '" class="btn btn-ghost btn-sm mt-2">' + escapar(o.boton.texto) + '</button>')
      : '';
    return '<div class="pd-vacio"><h3>' + escapar(o.titulo) + '</h3>' +
      '<p>' + escapar(o.texto) + '</p>' + b + '</div>';
  }

  let tiempoAviso = null;

  /** Notificación breve al pie de la pantalla. */
  function aviso(mensaje) {
    let caja = document.getElementById('pd-toast');
    if (!caja) {
      caja = document.createElement('div');
      caja.id = 'pd-toast';
      caja.className = 'pd-toast';
      caja.setAttribute('role', 'status');
      caja.setAttribute('aria-live', 'polite');
      document.body.appendChild(caja);
    }
    caja.textContent = mensaje;
    caja.classList.add('visible');
    window.clearTimeout(tiempoAviso);
    tiempoAviso = window.setTimeout(() => caja.classList.remove('visible'), 2600);
  }

  /** Mensaje de error cuando no se pudo cargar el catálogo. */
  function errorCarga(contenedor, e) {
    console.error(e);
    if (!contenedor) return;
    contenedor.innerHTML = vacio({
      titulo: 'No pudimos cargar las noticias',
      texto: e && e.message ? e.message : 'Vuelve a intentarlo en unos minutos.'
    });
  }

  /* ------------------------------------------------------------- Interfaz */

  PD.ui = {
    ICONOS,
    PAGINAS,
    CONTACTO,
    escapar,
    fecha,
    fechaDeHoy,
    parametro,
    montarLayout,
    actualizarContador,
    tarjeta,
    imagen,
    imagenRota,
    botonFavorito,
    conectarFavoritos,
    vacio,
    aviso,
    errorCarga
  };
})(window.PD);
