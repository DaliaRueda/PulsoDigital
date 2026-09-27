# -*- coding: utf-8 -*-
"""Genera noticias-respaldo.js a partir de noticias.json.

Por que existe este archivo: al abrir una pagina con doble clic el navegador
usa el protocolo file://, cuyo origen es opaco, y bloquea fetch() incluso para
un archivo que esta al lado. Como la guia del modulo pide que las paginas
puedan verse en cualquier navegador sin montar un servidor, data.js intenta
fetch() primero y recurre a este respaldo cuando falla.

noticias.json sigue siendo la unica fuente que se edita a mano. Este script se
vuelve a ejecutar cada vez que cambie.

Uso:  python generar-respaldo.py
"""
import io
import json
import os

ORIGEN = 'noticias.json'
DESTINO = 'noticias-respaldo.js'

CABECERA = """/* ============================================================================
   noticias-respaldo.js — GENERADO AUTOMÁTICAMENTE, NO EDITAR A MANO

   Copia de noticias.json para que el catálogo funcione también al abrir las
   páginas con doble clic, cuando el navegador bloquea fetch() por el origen
   opaco del protocolo file://.

   Para regenerarlo:  python assets/data/generar-respaldo.py
   Editar siempre:    assets/data/noticias.json
   ========================================================================== */

window.PD_NOTICIAS_RESPALDO = """

noticias = json.load(io.open(ORIGEN, encoding='utf-8'))
cuerpo = json.dumps(noticias, ensure_ascii=False, indent=2)
io.open(DESTINO, 'w', encoding='utf-8').write(CABECERA + cuerpo + ';\n')

print('%s -> %s  (%d noticias, %.1f KB)'
      % (ORIGEN, DESTINO, len(noticias), os.path.getsize(DESTINO) / 1024))
