# -*- coding: utf-8 -*-
"""Captura las pantallas del aplicativo en funcionamiento para el informe.

Sirve de evidencia de que «la maquetación corresponde con el desarrollo», que es
lo que la guía del módulo dice que se revisará en esta entrega.

Requiere el servidor local en marcha:
    cd src && python -m http.server 8000

Uso:  python capturar-app.py
"""
import io
import os
import subprocess
import tempfile

from PIL import Image

CHROME = os.environ.get(
    'CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
PERFIL = os.path.join(tempfile.gettempdir(), 'pd-capturas-perfil')
BASE = 'http://127.0.0.1:8000/'
DESTINO = 'capturas'
ANCHO_FINAL = 1600          # ~270 ppp al insertarse a 15 cm de ancho
ALTO_MAX = 1500             # px CSS: lo que cabe en una página sin empequeñecer

# Nombre del archivo, ruta y alto de captura de cada vista.
VISTAS = [
    ('01-inicio', 'index.html', 1450),
    ('02-listado', 'noticias.html', 1450),
    ('03-detalle', 'detalle.html?id=n-001', 1450),
    ('04-contacto', 'contacto.html', 1350),
    ('05-favoritos', 'favoritos.html', 1150),
    ('06-publicar', 'publicar.html', 1450),
    ('07-acerca', 'acerca.html', 1250),
    ('08-creditos', 'creditos.html', 1250),
]


def capturar(nombre, ruta, alto):
    bruto = os.path.join(tempfile.gettempdir(), 'pd-' + nombre + '.png')
    subprocess.run(
        [CHROME, '--headless', '--disable-gpu', '--no-sandbox',
         '--user-data-dir=' + PERFIL, '--screenshot=' + bruto,
         '--window-size=1440,%d' % min(alto, ALTO_MAX),
         '--force-device-scale-factor=2', '--hide-scrollbars',
         '--virtual-time-budget=12000', BASE + ruta],
        capture_output=True, timeout=90)

    if not os.path.exists(bruto):
        raise RuntimeError('no se pudo capturar ' + ruta)

    with Image.open(bruto) as im:
        im = im.convert('RGB')
        # JPEG y no PNG: estas capturas llevan fotografias y en PNG pesan
        # tres veces mas sin ganar legibilidad al tamano al que se insertan.
        destino = os.path.join(DESTINO, nombre + '.jpg')
        alto_final = round(im.height * ANCHO_FINAL / im.width)
        im.resize((ANCHO_FINAL, alto_final), Image.LANCZOS).save(
            destino, 'JPEG', quality=86, optimize=True, progressive=True)
    os.remove(bruto)
    return os.path.getsize(destino) / 1024


os.makedirs(DESTINO, exist_ok=True)
total = 0
for nombre, ruta, alto in VISTAS:
    kb = capturar(nombre, ruta, alto)
    total += kb
    print('  %-14s %-26s %6.0f KB' % (nombre, ruta, kb))
print('\n  %d capturas · %.1f MB' % (len(VISTAS), total / 1024))
