# -*- coding: utf-8 -*-
"""Genera el Word de una entrega a partir de su informe en Markdown, en APA 7.

Aplica: Times New Roman 12, interlineado doble, margenes de 2,54 cm, sangria de
primera linea de 1,27 cm, numeracion de pagina arriba a la derecha desde la
portada, titulos de nivel 1 y 2, tablas sin lineas verticales con su numero y
nota, figuras con su numero, titulo y nota, y referencias con sangria francesa.

Uso:  python ../hacer-docx.py <informe.md> <salida.docx> "<Título del trabajo>"
Ejemplo:
    cd docs/entrega-2
    python ../hacer-docx.py informe-apa.md Entrega-2.docx "Pulso Digital: prototipo"

Las rutas de las imágenes en el Markdown se resuelven desde la carpeta del
propio informe. Si la ruta indicada no existe como archivo, se buscan los
segmentos «<ruta>-1», «<ruta>-2»… en .png o .jpg, que es como quedan las
capturas largas troceadas para que quepan en una página.
"""
import io, os, re, glob, sys
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

MD = sys.argv[1] if len(sys.argv) > 1 else 'informe-apa.md'
SALIDA = sys.argv[2] if len(sys.argv) > 2 else 'Entrega.docx'
TITULO_TRABAJO = sys.argv[3] if len(sys.argv) > 3 else (
    'Pulso Digital: maquetación de una plataforma web de noticias de '
    'tecnología e innovación')
# Cuarto argumento: fecha de la portada. Por omisión, la de hoy.
if len(sys.argv) > 4:
    FECHA = sys.argv[4]
else:
    _M = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
          'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    _h = __import__('datetime').date.today()
    FECHA = '%d de %s de %d' % (_h.day, _M[_h.month - 1], _h.year)
FUENTE = 'Times New Roman'
CUERPO = Pt(12)
SANGRIA = Cm(1.27)
ANCHO_UTIL = Cm(16.5)     # carta menos margenes de 2,54 cm
ALTO_FIGURA = Cm(19.5)    # deja sitio para el numero, el titulo y la nota

# ---------------------------------------------------------------- utilidades


def borde(elemento, lados, sz=8, color='000000'):
    """Pone o quita bordes de una celda o tabla."""
    tcPr = elemento
    borders = OxmlElement('w:tcBorders')
    for lado in ('top', 'left', 'bottom', 'right'):
        b = OxmlElement('w:' + lado)
        if lado in lados:
            b.set(qn('w:val'), 'single')
            b.set(qn('w:sz'), str(sz))
            b.set(qn('w:color'), color)
        else:
            b.set(qn('w:val'), 'nil')
        borders.append(b)
    tcPr.append(borders)


def numeracion(seccion):
    """Numero de pagina en el encabezado, alineado a la derecha."""
    p = seccion.header.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = p.add_run()
    r.font.name = FUENTE
    r.font.size = CUERPO
    for instr, val in (('begin', None), ('instrText', 'PAGE'), ('end', None)):
        e = OxmlElement('w:' + ('fldChar' if instr != 'instrText' else 'instrText'))
        if instr == 'instrText':
            e.text = ' PAGE '
            e.set(qn('xml:space'), 'preserve')
        else:
            e.set(qn('w:fldCharType'), instr)
        r._r.append(e)


def campo_toc(doc):
    """Inserta un indice automatico; Word lo rellena al abrir o con F9."""
    p = doc.add_paragraph()
    r = p.add_run()
    f1 = OxmlElement('w:fldChar'); f1.set(qn('w:fldCharType'), 'begin')
    it = OxmlElement('w:instrText'); it.set(qn('xml:space'), 'preserve')
    it.text = r'TOC \o "1-2" \h \z \u'
    f2 = OxmlElement('w:fldChar'); f2.set(qn('w:fldCharType'), 'separate')
    t = OxmlElement('w:t'); t.text = 'Haz clic derecho aqui y elige «Actualizar campos» para generar la tabla de contenido.'
    f3 = OxmlElement('w:fldChar'); f3.set(qn('w:fldCharType'), 'end')
    for e in (f1, it, f2, t, f3):
        r._r.append(e)


INLINE = re.compile(r'(\*\*.+?\*\*|(?<!\*)\*[^*]+?\*(?!\*)|`[^`]+?`)')


def escribir(p, texto, size=None, base_italic=False):
    """Escribe texto con **negrita**, *cursiva* y `monoespaciado`."""
    for trozo in INLINE.split(texto):
        if not trozo:
            continue
        r = p.add_run()
        if trozo.startswith('**') and trozo.endswith('**'):
            r.text, r.bold = trozo[2:-2], True
        elif trozo.startswith('`') and trozo.endswith('`'):
            r.text = trozo[1:-1]
            r.font.name = 'Consolas'
            r._element.rPr.rFonts.set(qn('w:cs'), 'Consolas')
            r.font.size = Pt((size or CUERPO).pt - 1)
        elif trozo.startswith('*') and trozo.endswith('*'):
            r.text, r.italic = trozo[1:-1], True
        else:
            r.text = trozo
        if r.font.name != 'Consolas':
            r.font.name = FUENTE
            r.font.size = size or CUERPO
        if base_italic:
            r.italic = True
    return p


# ---------------------------------------------------------------- documento

doc = Document()

# La plantilla base de python-docx no declara version de compatibilidad, y Word
# abre el archivo en «Modo de compatibilidad». Se fija Word 2013 o posterior.
_settings = doc.settings.element
for _viejo in _settings.findall(qn('w:compat')):
    _settings.remove(_viejo)
_compat = OxmlElement('w:compat')
_cs = OxmlElement('w:compatSetting')
_cs.set(qn('w:name'), 'compatibilityMode')
_cs.set(qn('w:uri'), 'http://schemas.microsoft.com/office/word')
_cs.set(qn('w:val'), '15')
_compat.append(_cs)
_settings.append(_compat)

sec = doc.sections[0]
sec.page_width, sec.page_height = Cm(21.59), Cm(27.94)      # carta
sec.left_margin = sec.right_margin = Cm(2.54)
sec.top_margin = sec.bottom_margin = Cm(2.54)
numeracion(sec)

n = doc.styles['Normal']
n.font.name = FUENTE
n.font.size = CUERPO
n.element.rPr.rFonts.set(qn('w:eastAsia'), FUENTE)
pf = n.paragraph_format
pf.line_spacing_rule = WD_LINE_SPACING.DOUBLE
pf.space_before = Pt(0)
pf.space_after = Pt(0)
pf.alignment = WD_ALIGN_PARAGRAPH.LEFT


for _nombre, _align in (('Heading 1', WD_ALIGN_PARAGRAPH.CENTER),
                        ('Heading 2', WD_ALIGN_PARAGRAPH.LEFT)):
    st = doc.styles[_nombre]
    st.font.name = FUENTE
    st.font.size = CUERPO
    st.font.bold = True
    st.font.italic = False
    st.font.color.rgb = RGBColor(0, 0, 0)
    st.element.rPr.rFonts.set(qn('w:eastAsia'), FUENTE)
    st.paragraph_format.alignment = _align
    st.paragraph_format.line_spacing_rule = WD_LINE_SPACING.DOUBLE
    st.paragraph_format.space_before = Pt(0)
    st.paragraph_format.space_after = Pt(0)
    st.paragraph_format.keep_with_next = True


def titulo(texto, nivel):
    p = doc.add_paragraph(style='Heading %d' % nivel)
    escribir(p, texto)
    for r in p.runs:
        r.bold = True
    return p


def par(texto='', sangria=False, align=WD_ALIGN_PARAGRAPH.LEFT, size=None,
        espacio=WD_LINE_SPACING.DOUBLE, italic=False, negrita=False):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing_rule = espacio
    p.alignment = align
    if sangria:
        p.paragraph_format.first_line_indent = SANGRIA
    if texto:
        escribir(p, texto, size, italic)
    if negrita:
        for r in p.runs:
            r.bold = True
    return p


# ---- portada -------------------------------------------------------------
PORTADA = [
    (TITULO_TRABAJO, True),
    ('', False),
    ('Dalia Johanna Rueda Tangarife', False),
    ('Facultad de Ingeniería, Diseño e Innovación, Politécnico Grancolombiano', False),
    ('Ingeniería de Software', False),
    ('Virtual / Front End', False),
    ('Tutor: John Olarte', False),
    (FECHA, False),
]
for _ in range(3):
    par()
for texto, negrita in PORTADA:
    par(texto, align=WD_ALIGN_PARAGRAPH.CENTER, negrita=negrita)
doc.add_page_break()

# ---- tabla de contenido --------------------------------------------------
par('Tabla de contenido', align=WD_ALIGN_PARAGRAPH.CENTER, negrita=True)
campo_toc(doc)
doc.add_page_break()


# ---------------------------------------------------------------- parseo

texto = io.open(MD, encoding='utf-8').read()
# se descartan la nota de uso, la portada y el indice: ya estan construidos
texto = texto[texto.index('# 1. Introducción'):]
# la lista de verificacion es una ayuda de trabajo, no parte del entregable
if '## Lista de verificación antes de entregar' in texto:
    texto = texto[:texto.index('## Lista de verificación antes de entregar')]
lineas = texto.split('\n')

i = 0
buffer = []
en_referencias = False


def volcar():
    """Vuelca el parrafo acumulado."""
    global buffer
    if buffer:
        t = ' '.join(buffer).strip()
        if t:
            if en_referencias:
                p = par(t)
                p.paragraph_format.left_indent = SANGRIA
                p.paragraph_format.first_line_indent = -SANGRIA
            else:
                par(t, sangria=True)
        buffer = []


while i < len(lineas):
    ln = lineas[i]
    s = ln.strip()

    if s.startswith('```'):
        volcar()
        i += 1
        codigo = []
        while i < len(lineas) and not lineas[i].strip().startswith('```'):
            codigo.append(lineas[i])
            i += 1
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
        p.paragraph_format.left_indent = SANGRIA
        r = p.add_run('\n'.join(codigo))
        r.font.name = 'Consolas'
        r._element.rPr.rFonts.set(qn('w:cs'), 'Consolas')
        r.font.size = Pt(9)
        par()
        i += 1
        continue

    if s.startswith('|') and s.endswith('|'):
        volcar()
        filas = []
        while i < len(lineas) and lineas[i].strip().startswith('|'):
            celdas = [c.strip() for c in lineas[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r':?-{2,}:?', c) for c in celdas):
                filas.append(celdas)
            i += 1
        if filas:
            ncol = max(len(f) for f in filas)
            t = doc.add_table(rows=len(filas), cols=ncol)
            t.alignment = WD_TABLE_ALIGNMENT.LEFT
            t.autofit = True
            for fi, fila in enumerate(filas):
                for ci in range(ncol):
                    celda = t.cell(fi, ci)
                    celda.text = ''
                    p = celda.paragraphs[0]
                    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
                    p.paragraph_format.space_after = Pt(2)
                    p.paragraph_format.space_before = Pt(2)
                    escribir(p, fila[ci] if ci < len(fila) else '', Pt(9))
                    if fi == 0:
                        for r in p.runs:
                            r.bold = True
                    lados = ('top', 'bottom') if fi == 0 else (('bottom',) if fi == len(filas) - 1 else ())
                    borde(celda._tc.get_or_add_tcPr(), lados)
                if fi == 0:
                    trPr = t.rows[0]._tr.get_or_add_trPr()
                    th = OxmlElement('w:tblHeader')
                    th.set(qn('w:val'), 'true')
                    trPr.append(th)
            par()
        continue

    if s.startswith('# '):
        volcar()
        titulo(s[2:], 1)
        en_referencias = s[2:].strip().endswith('Referencias')
        i += 1
        continue

    if s.startswith('## '):
        volcar()
        titulo(s[3:], 2)
        i += 1
        continue

    if s.startswith('> FIGURA: insertar'):
        volcar()
        ruta_md = re.search(r'`(.+?)`', s).group(1)
        # La ruta puede venir relativa al informe o a la raiz del repositorio.
        candidatas = [ruta_md, os.path.join('..', '..', ruta_md)]
        rutas = []
        for base in candidatas:
            for ext in ('', '.png', '.jpg', '.jpeg'):
                if os.path.isfile(base + ext):
                    rutas = [base + ext]
                    break
            if rutas:
                break
            for patron in ('-*.png', '-*.jpg'):
                encontradas = sorted(glob.glob(base + patron))
                if encontradas:
                    rutas = encontradas
                    break
            if rutas:
                break
        if not rutas:
            sys.exit('sin imagenes para ' + ruta_md)
        for k, ruta in enumerate(rutas):
            from PIL import Image
            with Image.open(ruta) as im:
                w, h = im.size
            ancho = ANCHO_UTIL
            if Cm(ANCHO_UTIL.cm * h / w) > ALTO_FIGURA:
                ancho = Cm(ALTO_FIGURA.cm * w / h)
            if k:
                q = par('(continuación)', italic=True, size=Pt(10))
                q.paragraph_format.page_break_before = True
                q.paragraph_format.keep_with_next = True
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
            p.add_run().add_picture(ruta, width=ancho)
            # el parrafo de separacion solo despues del ultimo segmento: si no,
            # se queda solo al inicio de la pagina siguiente y la deja en blanco
            if k == len(rutas) - 1:
                par()
        i += 1
        continue

    if s.startswith('> '):
        volcar()
        p = par(s[2:], size=Pt(11))
        p.paragraph_format.left_indent = SANGRIA
        i += 1
        continue

    if s.startswith('- ') or re.match(r'^\d+\.\s', s):
        volcar()
        item = [re.sub(r'^(-\s\[.\]\s|-\s|\d+\.\s)', '', s)]
        marca = s.split(' ')[0] if s.startswith('- ') else s.split(' ')[0]
        if s.startswith('- ['):
            marca = '☐'
        i += 1
        while i < len(lineas) and lineas[i].startswith('   ') and lineas[i].strip():
            item.append(lineas[i].strip())
            i += 1
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = SANGRIA
        p.paragraph_format.first_line_indent = -Cm(0.5)
        escribir(p, ('• ' if marca == '-' else marca + ' ') + ' '.join(item))
        continue

    if s == '---' or s == '':
        volcar()
        i += 1
        continue

    if s.startswith('**Tabla ') or s.startswith('**Figura '):
        volcar()
        p = par(s)
        p.paragraph_format.keep_with_next = True
        # el titulo en cursiva de la linea siguiente viaja con el rotulo
        if i + 2 < len(lineas) and lineas[i + 2].strip().startswith('*'):
            q = par(lineas[i + 2].strip())
            q.paragraph_format.keep_with_next = True
            i += 3
        else:
            i += 1
        continue

    buffer.append(s)
    i += 1

volcar()
doc.save(SALIDA)
print('%s  (%.1f MB)' % (SALIDA, os.path.getsize(SALIDA) / 1024 / 1024))
