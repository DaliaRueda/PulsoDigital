# -*- coding: utf-8 -*-
"""Pruebas de extremo a extremo de los criterios de aceptacion de la Entrega 2.

Abre cada pagina en Chrome sin interfaz, sobre una copia temporal con un guion
de prueba inyectado, y comprueba el resultado en el DOM. Se ejecuta con el
protocolo file://, que es el escenario mas exigente: sin servidor.

Uso:  python pruebas-e2e.py
"""
import io
import os
import re
import subprocess
import sys
import tempfile
import urllib.parse

CHROME = os.environ.get(
    'CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
PERFIL = os.path.join(tempfile.gettempdir(), 'pd-pruebas-perfil')
AQUI = os.path.dirname(os.path.abspath(__file__))


def correr(pagina, guion, parametros='', ventana='1440,900'):
    """Inyecta el guion en una copia de la pagina y devuelve el DOM resultante."""
    origen = io.open(os.path.join(AQUI, pagina), encoding='utf-8').read()
    marca = '<script>window.__pd_listo = false;\n' + guion + '\n</script>\n</body>'
    copia = '_e2e-' + pagina
    io.open(os.path.join(AQUI, copia), 'w', encoding='utf-8').write(
        origen.replace('</body>', marca))
    url = 'file:///' + os.path.join(AQUI, copia).replace('\\', '/') + parametros
    try:
        salida = subprocess.run(
            [CHROME, '--headless', '--disable-gpu', '--no-sandbox',
             '--user-data-dir=' + PERFIL, '--virtual-time-budget=12000',
             '--window-size=' + ventana, '--dump-dom', url],
            capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=45)
        return salida.stdout or ''
    finally:
        try:
            os.remove(os.path.join(AQUI, copia))
        except OSError:
            pass


resultados = []


def revisar(etiqueta, condicion):
    resultados.append(('OK   ' if condicion else 'FALLA', etiqueta))


# El guion de prueba corre despues de que la pagina haya montado todo.
ESPERAR = """
function alEstarListo(fn) {
  var intentos = 0;
  var t = setInterval(function () {
    if (document.querySelector('#pd-cabecera .pd-marca') || ++intentos > 60) {
      clearInterval(t);
      setTimeout(fn, 350);
    }
  }, 60);
}
"""

# --------------------------------------------------------- 1. Contacto: vacio
dom = correr('contacto.html', ESPERAR + """
alEstarListo(function () {
  var f = document.getElementById('pd-form-contacto');
  f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  document.title = 'INVALIDOS=' + f.querySelectorAll('.is-invalid').length +
                   ';CONFIRMA=' + (document.getElementById('pd-confirmacion').hidden ? 'no' : 'si');
});
""")
m = re.search(r'INVALIDOS=(\d+);CONFIRMA=(\w+)', dom)
revisar('contacto: enviar vacio marca los 5 campos', bool(m) and m.group(1) == '5')
revisar('contacto: enviar vacio NO confirma', bool(m) and m.group(2) == 'no')

# ------------------------------------------------- 2. Contacto: correo invalido
dom = correr('contacto.html', ESPERAR + """
alEstarListo(function () {
  var f = document.getElementById('pd-form-contacto');
  f.elements.nombre.value = 'Camila Restrepo';
  f.elements.correo.value = 'camila.restrepo@';
  f.elements.asunto.value = 'Consulta general';
  f.elements.mensaje.value = 'Quisiera proponer un tema para una nota.';
  f.elements.autorizacion.checked = true;
  f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  document.title = 'CORREO_INVALIDO=' +
    (f.elements.correo.classList.contains('is-invalid') ? 'si' : 'no') +
    ';CONFIRMA=' + (document.getElementById('pd-confirmacion').hidden ? 'no' : 'si');
});
""")
m = re.search(r'CORREO_INVALIDO=(\w+);CONFIRMA=(\w+)', dom)
revisar('contacto: rechaza «camila.restrepo@»', bool(m) and m.group(1) == 'si')
revisar('contacto: con correo invalido NO confirma', bool(m) and m.group(2) == 'no')

# ------------------------------------------------------ 3. Contacto: envio valido
dom = correr('contacto.html', ESPERAR + """
alEstarListo(function () {
  var f = document.getElementById('pd-form-contacto');
  f.elements.nombre.value = 'Camila Restrepo';
  f.elements.correo.value = 'camila.restrepo@ejemplo.com';
  f.elements.asunto.value = 'Sugerencia de noticia';
  f.elements.mensaje.value = 'Quisiera proponer un tema para una nota sobre software libre.';
  f.elements.autorizacion.checked = true;
  f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  setTimeout(function () {
    document.title = 'CONFIRMA=' + (document.getElementById('pd-confirmacion').hidden ? 'no' : 'si') +
      ';GUARDADOS=' + PD.almacen.mensajes().length +
      ';FORM_OCULTO=' + (f.hidden ? 'si' : 'no');
  }, 200);
});
""")
m = re.search(r'CONFIRMA=(\w+);GUARDADOS=(\d+);FORM_OCULTO=(\w+)', dom)
revisar('contacto: envio valido muestra la confirmacion', bool(m) and m.group(1) == 'si')
revisar('contacto: el mensaje queda registrado', bool(m) and int(m.group(2)) >= 1)
revisar('contacto: la confirmacion sustituye al formulario', bool(m) and m.group(3) == 'si')

# ------------------------------------------------- 4. Contacto: asunto precargado
dom = correr('contacto.html', ESPERAR + """
alEstarListo(function () {
  document.title = 'ASUNTO=' + document.getElementById('asunto').value;
});
""", '?asunto=' + urllib.parse.quote('Sugerencia de noticia') + '&ref=n-001')
m = re.search(r'ASUNTO=([^<]*)', dom)
revisar('detalle -> contacto llega con el asunto elegido',
        bool(m) and m.group(1).strip() == 'Sugerencia de noticia')

# ------------------------------------------------------- 5. Publicar: alta invalida
dom = correr('publicar.html', ESPERAR + """
alEstarListo(function () {
  var f = document.getElementById('pd-form-noticia');
  PD.almacen.creadas().forEach(function (n) { PD.almacen.eliminarCreada(n.id); });
  var antes = PD.almacen.creadas().length;
  f.elements.titulo.value = 'Corto';
  f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  document.title = 'CREADAS=' + PD.almacen.creadas().length + ';ANTES=' + antes +
    ';INVALIDOS=' + f.querySelectorAll('.is-invalid').length;
});
""")
m = re.search(r'CREADAS=(\d+);ANTES=(\d+);INVALIDOS=(\d+)', dom)
revisar('publicar: formulario incompleto no crea nada', bool(m) and m.group(1) == m.group(2))
revisar('publicar: marca los campos que faltan', bool(m) and int(m.group(3)) >= 4)

# --------------------------------------------------------- 6. Publicar: alta valida
dom = correr('publicar.html', ESPERAR + """
alEstarListo(function () {
  var f = document.getElementById('pd-form-noticia');
  PD.almacen.creadas().forEach(function (n) { PD.almacen.eliminarCreada(n.id); });
  PD.almacen.restaurarBase();
  f.elements.titulo.value = 'Una cooperativa de Cali desarrolla su sistema de historia clinica';
  f.elements.categoria.value = 'Innovación';
  f.elements.autor.value = 'Sofia Cardenas';
  f.elements.resumen.value = 'La herramienta la usan doce consultorios rurales del Valle.';
  f.elements.contenido.value = new Array(30).join('Texto del cuerpo de la noticia. ');
  f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  setTimeout(function () {
    PD.datos.cargar().then(function (lista) {
      document.title = 'CREADAS=' + PD.almacen.creadas().length +
        ';EN_CATALOGO=' + (lista.some(function (n) { return n.id === 'u-001'; }) ? 'si' : 'no') +
        ';TOTAL=' + lista.length +
        ';FILAS=' + document.querySelectorAll('#pd-tabla-cuerpo tr').length;
    });
  }, 500);
});
""")
m = re.search(r'CREADAS=(\d+);EN_CATALOGO=(\w+);TOTAL=(\d+);FILAS=(\d+)', dom)
revisar('publicar: alta valida guarda la noticia', bool(m) and m.group(1) == '1')
revisar('publicar: la noticia nueva entra al catalogo', bool(m) and m.group(2) == 'si')
revisar('publicar: el catalogo pasa de 18 a 19', bool(m) and m.group(3) == '19')
revisar('publicar: la tabla la muestra', bool(m) and m.group(4) == '19')

# ------------------------------------------------ 7. Publicar: eliminar y restaurar
dom = correr('publicar.html', ESPERAR + """
alEstarListo(function () {
  PD.almacen.creadas().forEach(function (n) { PD.almacen.eliminarCreada(n.id); });
  PD.almacen.restaurarBase();
  PD.almacen.vaciarFavoritos();
  PD.almacen.alternarFavorito('n-018');
  PD.almacen.marcarEliminada('n-018');
  PD.datos.cargar().then(function (a) {
    PD.almacen.quitarFavorito('n-018');
    var favTrasBorrar = PD.almacen.contarFavoritos();
    PD.almacen.restaurarBase();
    PD.datos.cargar().then(function (b) {
      document.title = 'TRAS_OCULTAR=' + a.length + ';OCULTA_FUERA=' +
        (a.some(function (n) { return n.id === 'n-018'; }) ? 'no' : 'si') +
        ';FAV_LIMPIO=' + favTrasBorrar + ';TRAS_RESTAURAR=' + b.length;
    });
  });
});
""")
m = re.search(r'TRAS_OCULTAR=(\d+);OCULTA_FUERA=(\w+);FAV_LIMPIO=(\d+);TRAS_RESTAURAR=(\d+)', dom)
revisar('publicar: eliminar una del archivo base la oculta', bool(m) and m.group(1) == '17')
revisar('publicar: deja de aparecer en el catalogo', bool(m) and m.group(2) == 'si')
revisar('publicar: no queda colgando en favoritos', bool(m) and m.group(3) == '0')
revisar('publicar: «Restaurar noticias base» la devuelve', bool(m) and m.group(4) == '18')

# ------------------------------------------------- 8. Favoritos entre paginas
dom = correr('noticias.html', ESPERAR + """
alEstarListo(function () {
  PD.almacen.vaciarFavoritos();
  var boton = document.querySelector('#pd-grid [data-favorito]');
  boton.click();
  document.title = 'GUARDADOS=' + PD.almacen.contarFavoritos() +
    ';CONTADOR=' + document.getElementById('pd-contador-fav').textContent +
    ';PULSADO=' + boton.getAttribute('aria-pressed');
});
""")
m = re.search(r'GUARDADOS=(\d+);CONTADOR=(\d+);PULSADO=(\w+)', dom)
revisar('listado: el corazon guarda la noticia', bool(m) and m.group(1) == '1')
revisar('listado: el contador de la cabecera se actualiza', bool(m) and m.group(2) == '1')
revisar('listado: el boton queda en estado pulsado', bool(m) and m.group(3) == 'true')

dom = correr('favoritos.html', ESPERAR + """
alEstarListo(function () {
  document.title = 'FILAS=' + document.querySelectorAll('#pd-lista .pd-fav').length +
    ';VACIO=' + (document.querySelector('#pd-lista .pd-vacio') ? 'si' : 'no');
});
""")
m = re.search(r'FILAS=(\d+);VACIO=(\w+)', dom)
revisar('favoritos: el guardado persiste al cambiar de pagina', bool(m) and m.group(1) == '1')
revisar('favoritos: no muestra el estado vacio', bool(m) and m.group(2) == 'no')

# ------------------------------------------------------ 9. Favoritos: lista vacia
# El guion inyectado corre antes de DOMContentLoaded, asi que basta con vaciar
# la lista aqui: la pagina se pintara ya sin favoritos, sin recargar.
dom = correr('favoritos.html', ESPERAR + """
PD.almacen.vaciarFavoritos();
alEstarListo(function () {
  document.title = 'VACIO=' + (document.querySelector('#pd-lista .pd-vacio') ? 'si' : 'no');
});
""")
revisar('favoritos: con la lista vacia aparece el estado vacio',
        'Aún no tienes favoritos' in dom)

# ------------------------------------------------- 10. Listado: busqueda y filtros
dom = correr('noticias.html', ESPERAR + """
alEstarListo(function () {
  var b = document.getElementById('pd-buscar');
  b.value = 'medellin';
  b.dispatchEvent(new Event('input', { bubbles: true }));
  setTimeout(function () {
    var conBusqueda = document.querySelectorAll('#pd-grid .pd-card').length;
    b.value = 'zzzz-no-existe';
    b.dispatchEvent(new Event('input', { bubbles: true }));
    setTimeout(function () {
      document.title = 'BUSQUEDA=' + conBusqueda +
        ';VACIO=' + (document.querySelector('#pd-grid .pd-vacio') ? 'si' : 'no');
    }, 400);
  }, 400);
});
""")
m = re.search(r'BUSQUEDA=(\d+);VACIO=(\w+)', dom)
revisar('listado: buscar «medellin» encuentra la nota acentuada', bool(m) and m.group(1) == '1')
revisar('listado: sin resultados muestra el estado vacio', bool(m) and m.group(2) == 'si')

# -------------------------------------------------------- 11. Detalle: favorito
dom = correr('detalle.html', ESPERAR + """
alEstarListo(function () {
  PD.almacen.vaciarFavoritos();
  var b = document.getElementById('pd-boton-fav');
  var antes = document.getElementById('pd-boton-fav-texto').textContent;
  b.click();
  document.title = 'ANTES=' + antes.trim() +
    ';DESPUES=' + document.getElementById('pd-boton-fav-texto').textContent.trim() +
    ';GUARDADOS=' + PD.almacen.contarFavoritos() +
    ';PARRAFOS=' + document.querySelectorAll('.pd-prosa p').length;
});
""", '?id=n-001')
m = re.search(r'ANTES=([^;]*);DESPUES=([^;]*);GUARDADOS=(\d+);PARRAFOS=(\d+)', dom)
revisar('detalle: el boton arranca en «Anadir a favoritos»',
        bool(m) and m.group(1) == 'Añadir a favoritos')
revisar('detalle: al pulsar pasa a «En favoritos»', bool(m) and m.group(2) == 'En favoritos')
revisar('detalle: queda guardada', bool(m) and m.group(3) == '1')
revisar('detalle: el contenido se parte en parrafos', bool(m) and int(m.group(4)) >= 4)

# ------------------------------------------------------ 12. Detalle inexistente
dom = correr('detalle.html', ESPERAR + """
alEstarListo(function () { document.title = 'LISTO'; });
""", '?id=no-existe')
revisar('detalle: un identificador inexistente avisa sin romperse',
        'No encontramos esa noticia' in dom)

# ------------------------------------- 13. Responsive: sin desbordamiento lateral
# Chrome sin interfaz no permite ventanas mas estrechas de unos 500 px, de modo
# que una ventana de 390 px medía en realidad 504. Para obtener el ancho real se
# carga la pagina dentro de un iframe de 390 px; las media queries responden al
# ancho del iframe, no al de la ventana.
MARCO = """<!doctype html><html><head><meta charset="utf-8"><title>midiendo</title>
<style>html,body{margin:0;padding:0}iframe{width:390px;height:2600px;border:0;display:block}</style>
</head><body><iframe id="m" src="PAGINA"></iframe>
<script>
document.getElementById('m').addEventListener('load', function () {
  setTimeout(function () {
    var d = this.contentDocument.documentElement;
    document.title = 'ANCHO=' + d.scrollWidth + ';VENTANA=' + d.clientWidth;
  }.bind(this), 900);
});
</script></body></html>"""


def medir_movil(pagina, parametros=''):
    """Carga la pagina en un iframe de 390 px y compara ancho de contenido y de caja."""
    marco = MARCO.replace('PAGINA', pagina + parametros)
    archivo = os.path.join(AQUI, '_movil.html')
    io.open(archivo, 'w', encoding='utf-8').write(marco)
    url = 'file:///' + archivo.replace(chr(92), '/')
    try:
        r = subprocess.run(
            [CHROME, '--headless', '--disable-gpu', '--no-sandbox',
             '--allow-file-access-from-files', '--user-data-dir=' + PERFIL,
             '--virtual-time-budget=12000', '--window-size=600,2700', '--dump-dom', url],
            capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=45)
        return r.stdout or ''
    finally:
        try:
            os.remove(archivo)
        except OSError:
            pass


# Una pagina mas ancha que la pantalla obliga a desplazarse en horizontal, que es
# el fallo tipico del diseno adaptable. Se mide en el ancho mas estrecho previsto.
PAGINAS = ['index.html', 'noticias.html', 'detalle.html', 'favoritos.html',
           'publicar.html', 'contacto.html', 'acerca.html']

MEDIR = ESPERAR + """
alEstarListo(function () {
  document.title = 'ANCHO=' + document.documentElement.scrollWidth +
                   ';VENTANA=' + document.documentElement.clientWidth;
});
"""

for pagina in PAGINAS:
    extra = '?id=n-001' if pagina == 'detalle.html' else ''
    dom = medir_movil(pagina, extra)
    m = re.search(r'ANCHO=(\d+);VENTANA=(\d+)', dom)
    cabe = bool(m) and int(m.group(1)) <= int(m.group(2)) + 1
    detalle = '' if cabe else (' (%s px en una ventana de %s px)' % (m.group(1), m.group(2)) if m else ' (no se pudo medir)')
    revisar('movil 390 px: %s no se desborda%s' % (pagina, detalle), cabe)


# ----------------------------------------------------------------- Resultado
print('')
for estado, etiqueta in resultados:
    print('  %s %s' % (estado, etiqueta))
fallos = [r for r in resultados if r[0].strip() == 'FALLA']
print('\n  %d de %d comprobaciones correctas' % (len(resultados) - len(fallos), len(resultados)))
sys.exit(1 if fallos else 0)
