# -*- coding: utf-8 -*-
"""Trocea las capturas de los mockups en segmentos que quepan en una pagina.

Lee el plan que deja canvas/capturas.mjs y escribe docs/entrega-1/mockups/.
Un mockup de 1440 x 3100 px insertado a 16,5 cm mediria 35 cm de alto, asi que
se corta por los limites de banda que marca el atributo data-zona.

Uso:  SCRATCH=<carpeta temporal> python recortar.py
"""
import io, json, os, sys
from PIL import Image

SCRATCH = os.environ.get('SCRATCH')
if not SCRATCH:
    sys.exit('Falta la variable SCRATCH (la carpeta donde capturas.mjs dejo el plan).')

PLAN = os.path.join(SCRATCH, 'plan-capturas.json')
if not os.path.exists(PLAN):
    sys.exit('No existe %s. Ejecuta antes: cd canvas && node capturas.mjs' % PLAN)

NOMBRES = {
    'Main': '01-inicio', 'Listado': '02-listado', 'Detalle': '03-detalle',
    'Contacto': '04-contacto', 'Favoritos': '05-favoritos', 'Publicar': '06-publicar',
}
ANCHO_FINAL = 1800   # ~277 ppp al insertarse a 16,5 cm de ancho

plan = json.load(io.open(PLAN, encoding='utf-8'))
os.makedirs('mockups', exist_ok=True)

total_kb = 0
for vista, d in plan.items():
    with Image.open(d['png']) as im:
        im = im.convert('RGB')
        escala, cortes = d['escala'], d['cortes']
        for i in range(len(cortes) - 1):
            seg = im.crop((0, cortes[i] * escala, im.width,
                           min(cortes[i + 1] * escala, im.height)))
            alto = round(seg.height * ANCHO_FINAL / seg.width)
            seg = seg.resize((ANCHO_FINAL, alto), Image.LANCZOS)
            nombre = os.path.join('mockups', '%s-%d.png' % (NOMBRES[vista], i + 1))
            seg.save(nombre, optimize=True)
            kb = os.path.getsize(nombre) / 1024
            total_kb += kb
            print('%-30s %4d x %4d  %6.0f KB' % (nombre, seg.width, seg.height, kb))

print('total: %.1f MB' % (total_kb / 1024))
