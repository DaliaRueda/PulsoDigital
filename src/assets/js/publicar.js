/* ============================================================================
   publicar.js — alta y baja de noticias (mini CRUD)
   Pulso Digital · Entrega 2

   Cubre la característica 6 de la guía: crear noticias nuevas y eliminar
   existentes.

   Eliminar funciona distinto según el origen de la noticia. Si la creó el
   usuario se borra de pd_noticias_creadas; si viene de noticias.json no se
   puede tocar el archivo desde el navegador, así que su identificador se
   registra en pd_noticias_eliminadas y se descuenta al construir el listado.
   Por eso existe «Restaurar noticias base», que vacía ese registro.
   ========================================================================== */

(function (PD) {
  'use strict';

  const form = document.getElementById('pd-form-noticia');
  const selCategoria = document.getElementById('categoria');
  const vistaPrevia = document.getElementById('pd-vista-previa');
  const cuerpoTabla = document.getElementById('pd-tabla-cuerpo');
  const notaTabla = document.getElementById('pd-nota-tabla');
  const botonRestaurar = document.getElementById('pd-restaurar');

  let catalogo = [];
  let pendienteDeBorrar = null;

  /* ------------------------------------------------------------ Validación */

  /** Reglas por campo. Devuelven un mensaje o cadena vacía si el valor sirve. */
  const REGLAS = {
    titulo: (v) => {
      if (!v.trim()) return 'El título es obligatorio.';
      if (v.trim().length < 10) return 'Escribe al menos 10 caracteres.';
      return '';
    },
    categoria: (v) => (v ? '' : 'Elige una categoría.'),
    autor: (v) => {
      if (!v.trim()) return 'El autor es obligatorio.';
      if (v.trim().length < 3) return 'Escribe al menos 3 caracteres.';
      return '';
    },
    resumen: (v) => {
      if (!v.trim()) return 'La descripción breve es obligatoria.';
      if (v.trim().length < 20) return 'Escribe al menos 20 caracteres.';
      return '';
    },
    contenido: (v) => {
      if (!v.trim()) return 'El contenido es obligatorio.';
      if (v.trim().length < 200) {
        return 'Faltan ' + (200 - v.trim().length) + ' caracteres para llegar al mínimo de 200.';
      }
      return '';
    },
    imagen: (v) => {
      if (!v.trim()) return '';   // opcional: sin imagen se usa un marcador
      if (!/\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i.test(v.trim())) {
        return 'Indica una ruta o dirección que termine en .jpg, .png o .webp';
      }
      return '';
    }
  };

  /**
   * Valida un campo y pinta su estado.
   * @returns {boolean} true si es válido
   */
  function validarCampo(campo) {
    const regla = REGLAS[campo.name];
    if (!regla) return true;
    const error = regla(campo.value);
    const caja = campo.parentElement.querySelector('.invalid-feedback');

    campo.classList.toggle('is-invalid', !!error);
    campo.classList.toggle('is-valid', !error && campo.value.trim() !== '');
    if (caja) caja.textContent = error;
    return !error;
  }

  function validarTodo() {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name], select[name], textarea[name]'))
      .map(validarCampo)
      .every(Boolean);
  }

  /* -------------------------------------------------------- Vista previa */

  /** Construye un objeto noticia con lo que hay escrito ahora mismo. */
  function borrador() {
    const dato = (n) => {
      const el = form.elements[n];
      return el ? el.value.trim() : '';
    };
    return {
      id: 'vista-previa',
      titulo: dato('titulo') || 'Titular de la noticia',
      resumen: dato('resumen') || 'La descripción breve aparecerá aquí.',
      contenido: dato('contenido'),
      categoria: dato('categoria') || 'Categoría',
      autor: dato('autor') || 'Autor',
      fecha: hoy(),
      imagen: dato('imagen'),
      destacada: form.elements.destacada.checked,
      tiempoLectura: tiempoLectura(dato('contenido'))
    };
  }

  function pintarVistaPrevia() {
    vistaPrevia.innerHTML = PD.ui.tarjeta(borrador(), { favorito: false });
  }

  /** Estima el tiempo de lectura a 200 palabras por minuto, mínimo 1. */
  function tiempoLectura(texto) {
    const palabras = String(texto || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / 200));
  }

  function hoy() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /* ---------------------------------------------------------- Contadores */

  function conectarContadores() {
    form.querySelectorAll('[data-contador]').forEach((salida) => {
      const campo = form.elements[salida.getAttribute('data-contador')];
      if (!campo) return;
      const tope = campo.getAttribute('maxlength');
      const pintar = () => {
        salida.textContent = tope
          ? campo.value.length + ' / ' + tope
          : campo.value.length + ' caracteres';
      };
      campo.addEventListener('input', pintar);
      pintar();
    });
  }

  /* --------------------------------------------------------------- Tabla */

  function pintarTabla() {
    cuerpoTabla.removeAttribute('aria-busy');

    if (!catalogo.length) {
      cuerpoTabla.innerHTML = '<tr><td colspan="6" class="text-center py-4 pd-meta">' +
        'No hay noticias visibles. Usa «Restaurar noticias base» para recuperar el archivo.' +
        '</td></tr>';
    } else {
      cuerpoTabla.innerHTML = catalogo.map((n) => {
        const creada = PD.datos.esCreada(n);
        const mini = n.imagen
          ? '<img class="pd-tabla__miniatura" src="' + PD.ui.escapar(n.imagen) + '" alt="" ' +
            'onerror="PD.ui.imagenRota(this)">'
          : '<div class="pd-marcador pd-tabla__miniatura"></div>';
        return '<tr>' +
          '<td>' + mini + '</td>' +
          '<td style="font-weight:500">' + PD.ui.escapar(n.titulo) + '</td>' +
          '<td>' + PD.ui.escapar(n.categoria) + '</td>' +
          '<td class="pd-meta">' + PD.ui.escapar(PD.ui.fecha(n.fecha)) + '</td>' +
          '<td><span class="pd-origen' + (creada ? ' pd-origen--nueva' : '') + '">' +
          (creada ? 'Creada' : 'Base') + '</span></td>' +
          '<td style="text-align:right">' +
          '<button type="button" class="pd-iconbtn" data-borrar="' + PD.ui.escapar(n.id) + '" ' +
          'title="Eliminar" aria-label="Eliminar «' + PD.ui.escapar(n.titulo) + '»">' +
          PD.ui.ICONOS.papelera + '</button></td></tr>';
      }).join('');
    }

    const ocultas = PD.almacen.eliminadas().length;
    notaTabla.textContent = 'Se muestran ' + catalogo.length + ' noticias visibles.' +
      (ocultas
        ? ' Hay ' + ocultas + (ocultas === 1 ? ' noticia del archivo base oculta' :
          ' noticias del archivo base ocultas') + '; «Restaurar noticias base» las recupera.'
        : ' Las marcadas como «Base» provienen del archivo JSON y pueden recuperarse tras eliminarlas.');
    botonRestaurar.disabled = ocultas === 0;
  }

  function recargarTabla() {
    return PD.datos.cargar().then((lista) => {
      catalogo = lista;
      pintarTabla();
    });
  }

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

  /* --------------------------------------------------------- Conexiones */

  function conectar() {
    // Validación al salir de cada campo y al escribir si ya estaba marcado.
    form.addEventListener('blur', (e) => {
      if (e.target.name && REGLAS[e.target.name]) validarCampo(e.target);
    }, true);

    form.addEventListener('input', (e) => {
      if (e.target.name && REGLAS[e.target.name] &&
          e.target.classList.contains('is-invalid')) {
        validarCampo(e.target);
      }
      pintarVistaPrevia();
    });

    form.addEventListener('change', pintarVistaPrevia);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validarTodo()) {
        const primero = form.querySelector('.is-invalid');
        if (primero) primero.focus();
        PD.ui.aviso('Revisa los campos marcados en rojo');
        return;
      }
      publicar();
    });

    form.addEventListener('reset', () => {
      window.setTimeout(() => {
        form.querySelectorAll('.is-valid, .is-invalid')
          .forEach((el) => el.classList.remove('is-valid', 'is-invalid'));
        form.querySelectorAll('.invalid-feedback').forEach((el) => { el.textContent = ''; });
        conectarContadores();
        pintarVistaPrevia();
      }, 0);
    });

    cuerpoTabla.addEventListener('click', (e) => {
      const boton = e.target.closest('[data-borrar]');
      if (!boton) return;
      const n = catalogo.find((x) => x.id === boton.getAttribute('data-borrar'));
      if (n) abrirConfirmacion(n);
    });

    const confirmar = document.getElementById('pd-confirmar-borrar');
    if (confirmar) {
      confirmar.addEventListener('click', () => {
        eliminarPendiente();
        const modal = document.getElementById('pd-modal-borrar');
        if (window.bootstrap && modal) {
          window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        }
      });
    }

    botonRestaurar.addEventListener('click', () => {
      PD.almacen.restaurarBase();
      recargarTabla().then(() => PD.ui.aviso('Noticias del archivo base restauradas'));
    });
  }

  /* ------------------------------------------------------------ Arranque */

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('publicar');

    selCategoria.innerHTML = '<option value="">Elige una categoría</option>' +
      PD.datos.CATEGORIAS.map((c) =>
        '<option value="' + PD.ui.escapar(c) + '">' + PD.ui.escapar(c) + '</option>').join('');

    conectarContadores();
    pintarVistaPrevia();
    conectar();

    recargarTabla().catch((e) => PD.ui.errorCarga(vistaPrevia, e));
  });
})(window.PD);
