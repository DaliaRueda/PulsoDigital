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
