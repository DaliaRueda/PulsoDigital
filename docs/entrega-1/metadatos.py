# -*- coding: utf-8 -*-
"""Corrige las propiedades del .docx.

Debe ejecutarse DESPUES de actualizar el indice en Word: al guardar, Word
reescribe «ultima modificacion por» con el nombre registrado en ese equipo.

Uso:  python metadatos.py
"""
import datetime, sys
from docx import Document

ARCHIVO = 'Entrega-1-Maquetacion-Pulso-Digital.docx'
AUTORA = 'Dalia Johanna Rueda Tangarife'
TITULO = ('Pulso Digital: maquetación de una plataforma web de noticias de '
          'tecnología e innovación')

d = Document(ARCHIVO)
c = d.core_properties
antes = (c.author, c.last_modified_by, c.comments)

c.author = AUTORA
c.last_modified_by = AUTORA
c.title = TITULO
c.subject = 'Entrega 1 — Maquetación · Módulo Virtual / Front End'
c.category = 'Trabajo académico'
c.keywords = 'maquetación, mockups, front-end, APA'
c.comments = ''
c.created = datetime.datetime(2026, 9, 13, 9, 0, tzinfo=datetime.timezone.utc)
c.modified = datetime.datetime.now(datetime.timezone.utc)
c.revision = 1

d.save(ARCHIVO)
print('autor            : %r -> %r' % (antes[0], c.author))
print('ultima modif. por: %r -> %r' % (antes[1], c.last_modified_by))
print('comentarios      : %r -> %r' % (antes[2], c.comments))
