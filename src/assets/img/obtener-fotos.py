# -*- coding: utf-8 -*-
"""Descarga una fotografia con licencia libre para cada noticia.

Busca en Openverse, que agrega bancos de imagenes con licencia Creative Commons,
un termino acorde al tema de cada titular. Se filtran las licencias que permiten
uso y modificacion, se prefieren las mas permisivas (dominio publico antes que
atribucion, y atribucion antes que compartir-igual) y se guarda el credito de
cada imagen: autor, licencia y direccion de origen.

La atribucion no es opcional en las licencias CC BY y CC BY-SA. El credito se
guarda dentro de noticias.json y el aplicativo lo muestra en el pie de foto de
la vista de detalle.

Uso:  python obtener-fotos.py
"""
import io
import json
import os
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

API = 'https://api.openverse.org/v1/images/'
AGENTE = 'PulsoDigital/1.0 (proyecto academico)'
ANCHO, ALTO = 1200, 675          # 16:9, la proporcion de las tarjetas
DESTINO = 'noticias'
DATOS = '../data/noticias.json'

# Orden de preferencia: cuanto mas arriba, menos obligaciones impone la licencia.
PRIORIDAD = ['cc0', 'pdm', 'by', 'by-sa']

# Terminos de busqueda por noticia. Se prueban en orden hasta encontrar una
# imagen utilizable; van en ingles porque es donde estos bancos tienen fondo.
BUSQUEDAS = {
    'n-001': ['server room', 'data center'],
    'n-002': ['recording studio microphone', 'sound recording'],
    'n-003': ['checklist paper pen', 'clipboard document desk', 'magnifying glass paper'],
    'n-004': ['university lecture hall', 'college classroom empty', 'library books shelves'],
    'n-005': ['startup office meeting', 'business meeting table'],
    'n-006': ['notebook pen coffee desk', 'desk workspace overhead', 'planner notebook writing'],
    'n-007': ['motorcycle repair shop', 'mechanic workshop'],
    'n-008': ['padlock laptop security', 'computer security key'],
    'n-009': ['cyber security screen', 'computer code security'],
    'n-010': ['telephone office call', 'smartphone call hand'],
    'n-011': ['laptop keyboard closeup', 'ultrabook desk minimal', 'macbook desk'],
    'n-012': ['electronics repair soldering', 'circuit board repair'],
    'n-013': ['air pollution city smog', 'industrial chimney smoke', 'hazy city skyline'],
    'n-014': ['team meeting whiteboard', 'office teamwork'],
    'n-015': ['desktop computer office', 'office workstation'],
    'n-016': ['programming code screen', 'source code editor'],
    'n-017': ['electric bus', 'school bus'],
    'n-018': ['rooftop vegetable garden', 'balcony plants pots', 'container gardening'],
}


def buscar(termino, cuantas=8):
    """Consulta Openverse y devuelve los resultados ordenados por licencia."""
    consulta = urllib.parse.urlencode({
        'q': termino,
        'license_type': 'commercial,modification',
        'page_size': cuantas,
        'mature': 'false',
        'aspect_ratio': 'wide',
    })
    pet = urllib.request.Request(API + '?' + consulta,
                                 headers={'User-Agent': AGENTE, 'Accept': 'application/json'})
    with urllib.request.urlopen(pet, timeout=30) as r:
        datos = json.load(r)

    def orden(x):
        lic = (x.get('license') or '').lower()
        return PRIORIDAD.index(lic) if lic in PRIORIDAD else len(PRIORIDAD)

    return sorted(datos.get('results', []), key=orden)


def descargar(url):
    pet = urllib.request.Request(url, headers={'User-Agent': AGENTE})
    with urllib.request.urlopen(pet, timeout=45) as r:
        return r.read()


def recortar(bytes_imagen, destino):
    """Recorta al centro en 16:9 y guarda a 1200 x 675."""
    im = Image.open(io.BytesIO(bytes_imagen))
    if im.mode != 'RGB':
        im = im.convert('RGB')
    if im.width < 700 or im.height < 400:
        raise ValueError('imagen demasiado pequena: %dx%d' % (im.width, im.height))

    objetivo = ANCHO / ALTO
    actual = im.width / im.height
    if actual > objetivo:                       # sobra ancho
        nuevo = int(im.height * objetivo)
        izq = (im.width - nuevo) // 2
        im = im.crop((izq, 0, izq + nuevo, im.height))
    else:                                       # sobra alto
        nuevo = int(im.width / objetivo)
        arriba = (im.height - nuevo) // 2
        im = im.crop((0, arriba, im.width, arriba + nuevo))

    im = im.resize((ANCHO, ALTO), Image.LANCZOS)
    im.save(destino, 'JPEG', quality=84, optimize=True, progressive=True)


def etiqueta_licencia(r):
    lic = (r.get('license') or '').upper()
    ver = r.get('license_version') or ''
    if lic in ('CC0', 'PDM'):
        return 'CC0 1.0' if lic == 'CC0' else 'Dominio público'
    return ('CC ' + lic + (' ' + ver if ver else '')).strip()


# Palabras que suelen delatar un cartel corporativo, un evento o un retrato.
# Ilustrar una noticia de ejemplo con una marca o una persona reconocible seria
# enganoso, asi que esos resultados se descartan.
SOSPECHOSAS = [
    'inc', 'ltd', 'llc', 'corp', 'summit', 'conference', 'award', 'awards',
    'ceo', 'president', 'minister', 'portrait', 'headshot', 'logo', 'signage',
    'keynote', 'panel', 'forum', 'expo', 'launch event', 'press conference',
]


def sospechosa(r):
    texto = ((r.get('title') or '') + ' ' + (r.get('creator') or '')).lower()
    return any(p in texto for p in SOSPECHOSAS)


def main():
    solo = set(a for a in sys.argv[1:] if a.startswith('n-'))
    noticias = json.load(io.open(DATOS, encoding='utf-8'))
    os.makedirs(DESTINO, exist_ok=True)
    creditos = {}
    fallos = []

    for n in noticias:
        nid = n['id']
        if solo and nid not in solo:
            creditos[nid] = n.get('credito')          # se conserva lo ya descargado
            continue
        destino = os.path.join(DESTINO, nid + '.jpg')
        conseguida = False

        for termino in BUSQUEDAS.get(nid, []):
            if conseguida:
                break
            try:
                resultados = buscar(termino)
            except Exception as e:
                print('  %s  fallo la busqueda «%s»: %s' % (nid, termino, e))
                continue

            for r in resultados:
                url = r.get('url')
                if not url or sospechosa(r):
                    continue
                try:
                    recortar(descargar(url), destino)
                except Exception:
                    continue
                creditos[nid] = {
                    'titulo': (r.get('title') or 'Sin título').strip()[:120],
                    'autor': (r.get('creator') or 'Autor desconocido').strip()[:80],
                    'licencia': etiqueta_licencia(r),
                    'url': r.get('foreign_landing_url') or url,
                    'busqueda': termino,
                }
                print('  %s  %-28s %-12s %s'
                      % (nid, termino[:28], creditos[nid]['licencia'], creditos[nid]['autor'][:28]))
                conseguida = True
                break
            time.sleep(0.4)          # cortesia con la API

        if not conseguida:
            fallos.append(nid)
            print('  %s  SIN FOTO: se conserva el marcador' % nid)

    # El credito viaja con el dato: la vista de detalle lo muestra en el pie de foto.
    for n in noticias:
        if creditos.get(n['id']):
            n['credito'] = creditos[n['id']]
        else:
            n.pop('credito', None)

    io.open(DATOS, 'w', encoding='utf-8').write(
        json.dumps(noticias, ensure_ascii=False, indent=2) + '\n')

    print('\n  %d de %d fotografias descargadas' % (len(creditos), len(noticias)))
    if fallos:
        print('  sin foto: ' + ', '.join(fallos))
    return 0 if not fallos else 0


if __name__ == '__main__':
    sys.exit(main())
