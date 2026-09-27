# -*- coding: utf-8 -*-
"""Sirve la compilacion de produccion con reenvio a index.html.

Una aplicacion de una sola pagina necesita que el servidor devuelva index.html
para cualquier ruta que no sea un archivo: es el enrutador de Angular, ya en el
navegador, quien decide que mostrar. Sin ese reenvio, abrir /noticias
directamente da 404. Sirve para probar en local lo mismo que hara GitHub Pages
con el archivo 404.html.

Uso:  python servir-dist.py [puerto]
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                    'dist', 'pulso-digital', 'browser')
PUERTO = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class Spa(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=RAIZ, **k)

    def do_GET(self):
        ruta = self.translate_path(self.path)
        if not os.path.exists(ruta) or os.path.isdir(ruta):
            if not os.path.isfile(os.path.join(RAIZ, self.path.lstrip('/'), 'index.html')):
                self.path = '/index.html'
        super().do_GET()

    def log_message(self, *a):
        pass


print('Sirviendo %s en http://127.0.0.1:%d' % (RAIZ, PUERTO))
ThreadingHTTPServer(('127.0.0.1', PUERTO), Spa).serve_forever()
