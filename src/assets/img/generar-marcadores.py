# -*- coding: utf-8 -*-
"""Genera las imagenes marcador de cada noticia.

Reproduce el mismo marcador que aparece en los mockups de la Entrega 1 —fondo
de papel con trama diagonal y una etiqueta centrada— para que el desarrollo
corresponda con la maquetacion. Son marcadores, no fotografias: se sustituyen
por imagenes reales cuando se disponga de ellas.

Uso:  python generar-marcadores.py
"""
import io, json, os
from PIL import Image, ImageDraw, ImageFont

ANCHO, ALTO = 1200, 675          # 16:9, la proporcion que usan las tarjetas
PAPEL = (233, 229, 223)          # fondo del marcador
TRAMA = (20, 22, 26)             # color de la trama diagonal
BORDE = (228, 224, 218)
TEXTO = (154, 149, 141)
CAJA = (250, 248, 245)

FUENTES = [
    r'C:\Windows\Fonts\segoeuisb.ttf',
    r'C:\Windows\Fonts\segoeui.ttf',
    r'C:\Windows\Fonts\arialbd.ttf',
    r'C:\Windows\Fonts\arial.ttf',
]


def fuente(tam):
    for ruta in FUENTES:
        if os.path.exists(ruta):
            return ImageFont.truetype(ruta, tam)
    return ImageFont.load_default()


def marcador(texto, destino):
    im = Image.new('RGB', (ANCHO, ALTO), PAPEL)
    d = ImageDraw.Draw(im, 'RGBA')

    # trama diagonal a 135 grados, equivalente al repeating-linear-gradient del CSS
    paso = 22
    for x in range(-ALTO, ANCHO + ALTO, paso):
        d.line([(x, 0), (x + ALTO, ALTO)], fill=(*TRAMA, 16), width=5)

    d.rectangle([0, 0, ANCHO - 1, ALTO - 1], outline=BORDE, width=2)

    f = fuente(30)
    ancho_txt = d.textbbox((0, 0), texto, font=f)[2]
    pad_x, pad_y = 26, 16
    cw, ch = ancho_txt + pad_x * 2, 30 + pad_y * 2
    cx, cy = (ANCHO - cw) // 2, (ALTO - ch) // 2
    d.rectangle([cx, cy, cx + cw, cy + ch], fill=CAJA, outline=BORDE, width=2)
    d.text((cx + pad_x, cy + pad_y - 4), texto, font=f, fill=TEXTO)

    im.save(destino, 'JPEG', quality=88, optimize=True)
    return os.path.getsize(destino)


noticias = json.load(io.open('../data/noticias.json', encoding='utf-8'))
os.makedirs('noticias', exist_ok=True)
total = 0
for n in noticias:
    destino = os.path.join('noticias', n['id'] + '.jpg')
    total += marcador('%s · %s' % (n['id'].upper(), n['categoria'].upper()), destino)
print('%d marcadores · %.0f KB en total' % (len(noticias), total / 1024))
