/* ============================================================================
   contacto.js — formulario de contacto con validaciones
   Pulso Digital · Entrega 2

   Cubre la característica 5 de la guía: campos obligatorios, correo válido y
   mensaje de confirmación. La validación se dispara al salir de cada campo y
   al enviar; una vez marcado un campo, se revalida mientras se corrige, para
   que el error desaparezca en cuanto deja de serlo.

   No hay servidor: el mensaje se guarda en localStorage. La confirmación es
   real respecto a lo que el aplicativo hace, y así se documenta.
   ========================================================================== */

(function (PD) {
  'use strict';

  const form = document.getElementById('pd-form-contacto');
  const confirmacion = document.getElementById('pd-confirmacion');
  const textoConfirmacion = document.getElementById('pd-texto-confirmacion');
  const panelDatos = document.getElementById('pd-datos-contacto');

  /* ------------------------------------------------------------ Validación */

  // Acepta letras con tilde, eñe y espacios; no acepta cifras ni símbolos.
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

  /* ---------------------------------------------------------- Contadores */

  function conectarContadores() {
    form.querySelectorAll('[data-contador]').forEach((salida) => {
      const campo = form.elements[salida.getAttribute('data-contador')];
      if (!campo) return;
      const tope = campo.getAttribute('maxlength');
      const pintar = () => { salida.textContent = campo.value.length + ' / ' + tope; };
      campo.addEventListener('input', pintar);
      pintar();
    });
  }

  /* --------------------------------------------------------- Panel lateral */

  function pintarDatos() {
    const c = PD.ui.CONTACTO;
    const fila = (icono, titulo, sub) =>
      '<li class="d-flex gap-3 align-items-start">' +
      '<span class="flex-shrink-0 mt-1" style="color:var(--pd-accent)">' + icono + '</span>' +
      '<span><span class="d-block" style="color:#FFF;font-size:0.9375rem;font-weight:500">' +
      PD.ui.escapar(titulo) + '</span>' +
      '<span style="font-size:0.8125rem">' + PD.ui.escapar(sub) + '</span></span></li>';

    panelDatos.innerHTML = '<span class="pd-kicker">Datos de contacto</span>' +
      '<ul class="d-flex flex-column gap-3 pt-3 mb-0" style="list-style:none;padding-left:0">' +
      fila(PD.ui.ICONOS.correo, c.correo, 'Correo general') +
      fila(PD.ui.ICONOS.telefono, c.telefono, 'Línea de redacción') +
      fila(PD.ui.ICONOS.lugar, c.lugar, 'Calle 00 #00-00, oficina 000') +
      fila(PD.ui.ICONOS.reloj, 'Lunes a viernes', '8:00 a. m. – 6:00 p. m.') +
      '</ul>';
  }

  /* --------------------------------------------------------------- Envío */

  function enviar() {
    const datos = {
      nombre: form.elements.nombre.value.trim(),
      correo: form.elements.correo.value.trim(),
      asunto: form.elements.asunto.value,
      mensaje: form.elements.mensaje.value.trim()
    };

    const ref = PD.ui.parametro('ref');
    if (ref) datos.noticia = ref;

    if (!PD.almacen.guardarMensaje(datos)) {
      PD.ui.aviso('No se pudo registrar el mensaje en este navegador');
      return;
    }

    textoConfirmacion.textContent =
      'Gracias, ' + datos.nombre.split(' ')[0] + '. Recibimos tu mensaje sobre «' +
      datos.asunto + '» y te responderemos al correo que indicaste dentro de los próximos ' +
      'dos días hábiles.';

    form.hidden = true;
    confirmacion.hidden = false;
    confirmacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    PD.ui.aviso('Mensaje enviado');
  }

  function nuevoMensaje() {
    form.reset();
    form.querySelectorAll('.is-valid, .is-invalid')
      .forEach((el) => el.classList.remove('is-valid', 'is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach((el) => {
      el.textContent = '';
      el.style.display = '';
    });
    conectarContadores();
    confirmacion.hidden = true;
    form.hidden = false;
    form.elements.nombre.focus();
  }

  /* --------------------------------------------------------- Conexiones */

  function conectar() {
    form.addEventListener('blur', (e) => {
      if (e.target.name && REGLAS[e.target.name]) validarCampo(e.target);
    }, true);

    form.addEventListener('input', (e) => {
      if (e.target.name && REGLAS[e.target.name] &&
          e.target.classList.contains('is-invalid')) {
        validarCampo(e.target);
      }
    });

    form.addEventListener('change', (e) => {
      if (e.target.name && REGLAS[e.target.name]) validarCampo(e.target);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validarTodo()) {
        const primero = form.querySelector('.is-invalid');
        if (primero) primero.focus();
        PD.ui.aviso('Revisa los campos marcados en rojo');
        return;
      }
      enviar();
    });

    form.addEventListener('reset', () => {
      window.setTimeout(nuevoMensaje, 0);
    });

    document.getElementById('pd-otro-mensaje').addEventListener('click', nuevoMensaje);
  }

  /* ------------------------------------------------------------ Arranque */

  document.addEventListener('DOMContentLoaded', () => {
    PD.ui.montarLayout('contacto');
    pintarDatos();
    conectarContadores();
    conectar();

    // El detalle enlaza aquí con el asunto ya elegido.
    const asunto = PD.ui.parametro('asunto');
    if (asunto) {
      const opciones = Array.prototype.slice.call(form.elements.asunto.options);
      if (opciones.some((o) => o.value === asunto)) form.elements.asunto.value = asunto;
    }
  });
})(window.PD);
