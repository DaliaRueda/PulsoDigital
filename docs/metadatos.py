# -*- coding: utf-8 -*-
"""Corrige las propiedades del .docx.

Debe ejecutarse DESPUES de actualizar el indice en Word: al guardar, Word
reescribe «ultima modificacion por» con el nombre registrado en ese equipo.

Uso:  python ../metadatos.py <archivo.docx> "<Título>" "<Asunto>"
"""
import datetime, sys
from docx import Document

ARCHIVO = sys.argv[1] if len(sys.argv) > 1 else 'Entrega.docx'
AUTORA = 'Dalia Johanna Rueda Tangarife'
TITULO = sys.argv[2] if len(sys.argv) > 2 else 'Pulso Digital'
ASUNTO = sys.argv[3] if len(sys.argv) > 3 else 'Módulo Virtual / Front End'

d = Document(ARCHIVO)
c = d.core_properties
antes = (c.author, c.last_modified_by, c.comments)

c.author = AUTORA
c.last_modified_by = AUTORA
c.title = TITULO
c.subject = ASUNTO
c.category = 'Trabajo académico'
c.keywords = 'front-end, HTML, CSS, JavaScript, APA'
c.comments = ''
c.created = datetime.datetime.now(datetime.timezone.utc)
c.modified = datetime.datetime.now(datetime.timezone.utc)
c.revision = 1

d.save(ARCHIVO)
print('autor            : %r -> %r' % (antes[0], c.author))
print('ultima modif. por: %r -> %r' % (antes[1], c.last_modified_by))
print('comentarios      : %r -> %r' % (antes[2], c.comments))
