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
