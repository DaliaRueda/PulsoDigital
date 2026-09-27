# -*- coding: utf-8 -*-
"""Arma informe-apa.md de la Entrega 2 incrustando el codigo desde su origen.

El codigo no se copia a mano: se lee de los archivos del proyecto cada vez que
se ejecuta este script. Asi el informe no puede quedar desincronizado con lo
que hay realmente en el repositorio.

Uso:  python armar-informe.py
"""
import io
import os

RAIZ = os.path.join('..', '..')
SALIDA = 'informe-apa.md'
REPO = 'https://github.com/DaliaRueda/PulsoDigital'


def leer(ruta):
    return io.open(os.path.join(RAIZ, ruta), encoding='utf-8').read().rstrip()


def listado(ruta, lenguaje, desde=None, hasta=None):
    """Devuelve un bloque de codigo. Si se dan anclas, recorta entre ellas."""
    texto = leer(ruta)
    if desde:
        i = texto.index(desde)
        texto = texto[i:]
    if hasta:
        j = texto.index(hasta)
        texto = texto[:j].rstrip()
    return '```' + lenguaje + '\n' + texto + '\n```'


def bloque(titulo, ruta, lenguaje, descripcion, **recorte):
    lineas = leer(ruta).count('\n') + 1
    cuerpo = listado(ruta, lenguaje, **recorte)
    trozo = recorte.get('desde') or recorte.get('hasta')
    nota = ('Fragmento de `%s`.' % ruta) if trozo else ('Archivo completo `%s` (%d líneas).' % (ruta, lineas))
    return '\n'.join(['## ' + titulo, '', descripcion, '', nota, '', cuerpo, ''])


# ---------------------------------------------------------------- documento

P = []
A = P.append

A("""# Informe — Entrega 2: Prototipo funcional

> **Cómo usar este borrador.** Se convierte a Word con:
> `python ../hacer-docx.py informe-apa.md "Entrega-2-Prototipo-Funcional-Pulso-Digital.docx" "Pulso Digital: prototipo funcional de una plataforma web de noticias"`
> Después hay que actualizar el índice desde Word y ejecutar `metadatos.py`.

---

## PORTADA

*(Página independiente, todo centrado)*

**Pulso Digital: prototipo funcional de una plataforma web de noticias de tecnología e innovación**

Dalia Johanna Rueda Tangarife

Facultad de Ingeniería, Diseño e Innovación, Politécnico Grancolombiano

Ingeniería de Software

Virtual / Front End

Tutor: John Olarte

[Día] de [mes] de 2026

---

## TABLA DE CONTENIDO

*(Se genera automáticamente en Word)*

---

# 1. Introducción

Este documento corresponde a la segunda entrega del módulo Desarrollo de Front-end y presenta
el prototipo funcional de *Pulso Digital*, la plataforma web de noticias de tecnología e
innovación cuya maquetación se aprobó en la entrega anterior.

Mientras que la primera entrega respondía a la pregunta de cómo debía verse el aplicativo, esta
responde a cómo funciona. El resultado son siete vistas construidas con HTML, CSS y JavaScript
sobre Bootstrap 5.3, que leen su contenido de un archivo JSON local y conservan las decisiones
del usuario en su propio navegador, sin servidor y sin cuentas.

La guía del módulo advierte que en esta entrega «se revisará que la maquetación corresponda con
el desarrollo». Por ese motivo el documento dedica un apartado completo a contrastar cada vista
maquetada con su implementación, y declara de forma explícita las dos decisiones en las que el
desarrollo se apartó del diseño, junto con el motivo de cada una.

La redacción, las citas y las referencias siguen el manual de la American Psychological
Association (2020) en su séptima edición.

---

# 2. Alcance de la entrega

La Tabla 1 recoge cada punto solicitado por la guía del módulo y el estado en que se entrega.

**Tabla 1**

*Correspondencia entre lo solicitado y lo implementado*

| Lo que solicita la guía | Estado | Dónde se evidencia |
|---|---|---|
| Desarrollo en HTML, CSS y JavaScript | Implementado | Apartados 5 y 6 |
| Renderizado dinámico de servicios desde JSON | Implementado | Apartados 6.1 a 6.3 |
| Funcionalidad de favoritos | Implementado | Apartados 6.2 y 7 |
| Formularios con validaciones | Implementado | Apartados 6.6 y 6.7 |
| Código estructurado | Implementado | Apartado 5 |
| Repositorio en GitHub | Publicado | Apartado 10 |
| Maquetación de la Entrega 1 incluida | Incluida | Apartado 3 |
| Código fuente comentado incluido | Incluido | Apartado 6 |
| URL del repositorio asociada | Incluida | Apartado 10 |
| Tabla de contenido, referencias y conclusiones | Incluidas | Índice, apartados 11 y 12 |

*Nota.* Elaboración propia a partir de las orientaciones del módulo.

---

# 3. Maquetación de la Entrega 1

La guía pide incorporar a este documento la maquetación aprobada, que es el punto de partida
contra el que se contrasta el desarrollo. Se reproduce completa, con sus estados alternos.

Los bloques rayados que aparecen en los mockups son marcadores de imagen; en el desarrollo se
sustituyeron por fotografías reales, como se explica en el apartado 9.""")

VISTAS_MOCKUP = [
    (2, 'inicio', '01-inicio', 'Mockup de la página de inicio'),
    (3, 'listado', '02-listado', 'Mockup del listado de noticias'),
    (4, 'detalle', '03-detalle', 'Mockup del detalle de la noticia'),
    (5, 'contacto', '04-contacto', 'Mockup de la página de contacto'),
    (6, 'favoritos', '05-favoritos', 'Mockup de la lista de favoritos'),
    (7, 'publicar', '06-publicar', 'Mockup de la vista de publicación y gestión'),
]
for num, _, archivo, titulo in VISTAS_MOCKUP:
    A('**Figura %d**\n\n*%s*\n\n> FIGURA: insertar `docs/entrega-1/mockups/%s`\n\n*Nota.* Elaboración propia.\n'
      % (num, titulo, archivo))

A("""---

# 4. Correspondencia entre maquetación y desarrollo

Las figuras siguientes muestran el aplicativo en funcionamiento, servido desde un servidor local.
Cada una corresponde a la vista maquetada del mismo nombre en el apartado anterior.""")

VISTAS_APP = [
    (8, '01-inicio', 'Página de inicio en funcionamiento'),
    (9, '02-listado', 'Listado de noticias con búsqueda, filtros y paginación'),
    (10, '03-detalle', 'Detalle de la noticia'),
    (11, '04-contacto', 'Formulario de contacto'),
    (12, '05-favoritos', 'Lista de favoritos'),
    (13, '06-publicar', 'Publicación y gestión de noticias'),
    (14, '07-acerca', 'Página informativa'),
    (15, '08-creditos', 'Créditos de las imágenes'),
]
for num, archivo, titulo in VISTAS_APP:
    A('**Figura %d**\n\n*%s*\n\n> FIGURA: insertar `capturas/%s`\n\n*Nota.* Elaboración propia.\n'
      % (num, titulo, archivo))

A("""## 4.1 Desviaciones respecto a la maquetación

El desarrollo se apartó del diseño aprobado en dos puntos. Ambos se documentan aquí porque la
guía advierte que se revisará la correspondencia entre ambos, y ocultar una diferencia sería
peor que explicarla.

**El campo de imagen dejó de ser obligatorio.** En el mockup de la vista de publicación el campo
aparece marcado con asterisco. En el desarrollo se dejó opcional: el aplicativo no dispone de
ningún mecanismo para subir archivos, de modo que exigir una ruta que la usuaria no puede obtener
bloquearía la creación de noticias, que es una característica exigida por la guía. Cuando el
campo queda vacío, la noticia muestra un marcador de imagen.

**La cabecera se reorganiza en móvil.** El mockup solo definía la versión de escritorio. Por
debajo de 576 px el buscador y el acceso a favoritos pasan a una segunda fila y el menú se
colapsa en un botón, porque a ese ancho los tres elementos no caben en línea.

---

# 5. Arquitectura del código

## 5.1 Estructura del directorio

La guía pide organizar el directorio raíz con los archivos HTML, CSS, JavaScript e imágenes
necesarios para que las páginas puedan verse en cualquier navegador. La estructura es la
siguiente:

```
src/
├── index.html            Inicio
├── noticias.html         Listado con búsqueda, filtros y paginación
├── detalle.html          Detalle de una noticia
├── favoritos.html        Lista personal
├── publicar.html         Alta y baja de noticias
├── contacto.html         Formulario con validaciones
├── acerca.html           Página informativa
├── creditos.html         Atribución de las fotografías
├── pruebas.html          Comprobaciones de la capa de datos
├── pruebas-e2e.py        Comprobaciones sobre las páginas reales
└── assets/
    ├── css/styles.css    Hoja de estilos sobre Bootstrap 5.3
    ├── fonts/            Space Grotesk e IBM Plex Sans
    ├── data/             noticias.json y su copia de respaldo
    ├── img/noticias/     18 fotografías con licencia Creative Commons
    └── js/               Un módulo por responsabilidad
```

La Tabla 2 detalla la responsabilidad de cada módulo de JavaScript.

**Tabla 2**

*Módulos de JavaScript y su responsabilidad*

| Archivo | Responsabilidad |
|---|---|
| `storage.js` | Única capa que accede a `localStorage`: favoritos, noticias creadas, noticias ocultas y mensajes |
| `data.js` | Carga del catálogo, filtros, orden, paginación y noticias relacionadas |
| `ui.js` | Cabecera, pie, tarjeta de noticia, estados vacíos, avisos y escape de texto |
| `home.js` | Portada y noticias destacadas del inicio |
| `noticias.js` | Estado del listado: búsqueda, categoría, orden y página |
| `detalle.js` | Lectura del identificador, render de la nota y acciones |
| `favoritos.js` | Lista personal, quitar y vaciar |
| `publicar.js` | Alta con validación y baja con confirmación |
| `contacto.js` | Validación del formulario y confirmación |
| `creditos.js` | Tabla de atribución de las fotografías |
| `acerca.js` | Monta la cabecera y el pie de la vista informativa |

*Nota.* Elaboración propia.

## 5.2 Espacio de nombres y orden de carga

Todo el código se cuelga de una única variable global, `window.PD`, y cada archivo se encierra en
una función autoejecutada. Así no hay funciones ni variables sueltas en el ámbito global, que es
lo que se degrada primero cuando un proyecto crece.

El orden de carga en cada página es fijo, porque cada capa usa la anterior:

```html
<script src="assets/data/noticias-respaldo.js"></script>
<script src="assets/js/storage.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/ui.js"></script>
<script src="assets/js/home.js"></script>
```

## 5.3 Por qué no se usaron módulos ES

El plan inicial del proyecto preveía módulos ES con `type="module"`, que es la práctica habitual
hoy. Se descartaron tras comprobarlo en el navegador.

Cuando una página se abre con doble clic, el protocolo es `file://` y su origen es opaco. En esas
condiciones el navegador bloquea dos cosas: la instrucción `import` entre archivos y la llamada
`fetch()` al archivo JSON, aunque esté en la misma carpeta. La guía del módulo exige que las
páginas «puedan ser vistas en cualquiera de los navegadores Web», y con módulos ES el resultado
habría sido una página en blanco.

La solución fue doble. Por un lado, scripts clásicos con espacio de nombres, que funcionan en
ambos protocolos. Por otro, `data.js` intenta primero `fetch()` —la vía correcta cuando hay
servidor— y recurre a `noticias-respaldo.js`, una copia del JSON generada por script, cuando el
navegador lo bloquea. El archivo `noticias.json` sigue siendo la única fuente que se edita a
mano.

---

# 6. Código fuente

Se reproducen los módulos que evidencian las características exigidas. El resto del código, y
estos mismos archivos completos, están en el repositorio indicado en el apartado 10.
""")

A(bloque(
    '6.1 Origen de datos: `noticias.json`',
    'src/assets/data/noticias.json', 'json',
    'El catálogo son 18 noticias. Cada objeto incluye el crédito de su fotografía, de modo que la '
    'atribución no pueda separarse de la imagen a la que pertenece. Se reproduce el primer objeto '
    'como muestra de la estructura.',
    hasta='\n  {\n    "id": "n-002"'))

A(bloque(
    '6.2 Persistencia: `storage.js`',
    'src/assets/js/storage.js', 'javascript',
    'Única capa que toca `localStorage`. Ningún otro archivo lee una clave directamente, de forma '
    'que un cambio de mecanismo de persistencia afectaría solo a este módulo. Contempla que el '
    'almacenamiento esté bloqueado —navegación privada o cuota agotada— y en ese caso trabaja '
    'contra memoria para que la interfaz siga funcionando.'))

A(bloque(
    '6.3 Origen del catálogo: `data.js`',
    'src/assets/js/data.js', 'javascript',
    'Calcula el catálogo visible como el archivo JSON menos las noticias ocultas más las creadas '
    'por el usuario. Incluye la búsqueda insensible a mayúsculas y acentos, el filtro por '
    'categoría, tres criterios de orden y la paginación.'))

A(bloque(
    '6.4 Componentes compartidos: `ui.js`',
    'src/assets/js/ui.js', 'javascript',
    'La cabecera, el pie y la tarjeta de noticia se escriben una sola vez aquí y cada página los '
    'monta. Todo el texto procedente de datos pasa por `escapar()` antes de insertarse, porque las '
    'noticias que crea el usuario son entrada no confiable. Se reproduce el fragmento de la '
    'tarjeta y del escape.',
    desde='  function escapar(texto) {', hasta='  /**\n   * Da formato a una fecha ISO'))

A(bloque(
    '6.5 Listado: `noticias.js`',
    'src/assets/js/noticias.js', 'javascript',
    'Mantiene un único objeto de estado con los cuatro criterios del listado y repinta la grilla '
    'cuando cualquiera cambia. La búsqueda espera a que el usuario deje de escribir antes de '
    'filtrar.'))

A(bloque(
    '6.6 Validación del formulario de contacto: `contacto.js`',
    'src/assets/js/contacto.js', 'javascript',
    'Cada campo tiene una regla que devuelve un mensaje o cadena vacía. La validación se dispara '
    'al salir del campo y al enviar; una vez marcado un campo, se revalida mientras se corrige, '
    'para que el error desaparezca en cuanto deja de serlo.',
    desde='  const SOLO_LETRAS', hasta='  /* ---------------------------------------------------------- Contadores */'))

A(bloque(
    '6.7 Alta y baja de noticias: `publicar.js`',
    'src/assets/js/publicar.js', 'javascript',
    'Eliminar funciona distinto según el origen de la noticia. Las creadas por el usuario se '
    'borran; las del archivo JSON no se pueden tocar desde el navegador, así que su identificador '
    'se registra como oculto y se descuenta al construir el listado. De ahí que exista «Restaurar '
    'noticias base».',
    desde='  /* ----------------------------------------------------------- Eliminar */',
    hasta='  /* --------------------------------------------------------- Conexiones */'))

A(bloque(
    '6.8 Tokens de diseño: `styles.css`',
    'src/assets/css/styles.css', 'css',
    'La hoja de estilos se carga después de Bootstrap y lo re-viste con los valores definidos en '
    'la maquetación, usando las variables CSS del propio framework. Se reproduce el bloque de '
    'tokens y el ajuste de Bootstrap.',
    desde='/* ---------------------------------------------------------------- 2. Tokens */',
    hasta='/* ---------------------------------------------------------------- 4. Base */'))

A(bloque(
    '6.9 Estructura de una página: `index.html`',
    'src/index.html', 'html',
    'Marcado semántico con `header`, `main`, `section`, `article` y `footer`. Las dos zonas '
    'dinámicas quedan vacías en el HTML y las rellena `home.js`: ninguna tarjeta está escrita a '
    'mano.'))

A("""---

# 7. Funcionalidades implementadas

La Tabla 3 relaciona cada característica exigida en el enunciado del proyecto con su
implementación.

**Tabla 3**

*Características del proyecto y su implementación*

| Característica exigida | Implementación |
|---|---|
| 1. Visualización de noticias en tarjetas | `ui.js` genera la tarjeta; el inicio y el listado la reutilizan sin duplicar marcado |
| 2. Detalle con botón de interacción | `detalle.js` pinta la nota y conecta «Añadir a favoritos» y «Contactar a la redacción» |
| 3. Gestión de favoritos con almacenamiento local | `storage.js` sobre `localStorage`; el contador de la cabecera se actualiza sin recargar y se sincroniza entre pestañas |
| 4. Página de inicio completa | Cabecera con menú de seis páginas, bienvenida, portada, destacadas, llamado a la acción, sección informativa y pie |
| 5. Formulario de contacto validado | Cinco reglas de validación, mensajes por campo y confirmación que sustituye al formulario |
| 6. Mini CRUD de noticias | Alta con vista previa en vivo y baja con confirmación, distinguiendo noticias creadas de las del archivo base |

*Nota.* Elaboración propia.

---

# 8. Pruebas realizadas

El prototipo se verificó con dos baterías automáticas, ambas incluidas en el repositorio.

La primera, `src/pruebas.html`, comprueba la capa de datos y de persistencia con 25
verificaciones: carga del catálogo, orden, filtros, búsqueda con y sin acentos, paginación,
favoritos, alta de noticias y ocultar o restaurar las del archivo base.

La segunda, `src/pruebas-e2e.py`, abre las páginas reales en el navegador —sin servidor, que es
el escenario más exigente— y comprueba 38 condiciones. La Tabla 4 resume qué verifica.

**Tabla 4**

*Comprobaciones de extremo a extremo*

| Área | Qué se comprueba |
|---|---|
| Contacto | Que el envío vacío marque los cinco campos, que rechace un correo incompleto, que un envío válido muestre la confirmación y registre el mensaje, y que el asunto llegue precargado desde el detalle |
| Publicar | Que un formulario incompleto no cree nada, que un alta válida aparezca en el catálogo y en la tabla, que eliminar una noticia del archivo base la oculte y la quite de favoritos, y que «Restaurar» la devuelva |
| Favoritos | Que el corazón del listado guarde la noticia, que el contador de la cabecera se actualice, que persista al cambiar de página y que la lista vacía muestre su estado |
| Listado | Que la búsqueda encuentre una palabra acentuada escrita sin tilde y que un término sin resultados muestre el estado vacío |
| Detalle | Que el botón alterne entre «Añadir a favoritos» y «En favoritos», que el contenido se divida en párrafos y que un identificador inexistente avise sin romperse |
| Diseño adaptable | Que ninguna de las siete páginas se desborde horizontalmente a 390 px de ancho |

*Nota.* Elaboración propia.

Dos hallazgos de estas pruebas merecen mención, porque ambos habrían llegado a la entrega sin
ellas. El primero: una fila de Bootstrap con separación `g-5` dentro de un contenedor sobresale
doce píxeles por cada lado, porque el contenedor calcula su relleno con la separación por defecto
mientras la fila aplica márgenes negativos con la suya; eso desbordaba tres páginas en móvil. El
segundo: Chrome sin interfaz gráfica no admite ventanas de menos de unos 500 px en Windows, de
modo que una comprobación «a 390 px» medía en realidad 504 y daba por buena una página rota. La
medición se rehízo cargando cada página dentro de un marco de 390 px.

---

# 9. Fotografías y licencias

Las 18 fotografías del aplicativo se obtuvieron a través de Openverse, el buscador de contenido
con licencia abierta de la Fundación Wikimedia, filtrando las licencias que permiten uso y
modificación. El reparto es de diez con licencia CC BY, cinco con CC0, dos en dominio público y
una con CC BY-SA.

Las licencias CC BY y CC BY-SA obligan a atribuir. El crédito —título, autor, licencia y enlace
al original— se guarda dentro de cada noticia en el archivo JSON, se muestra en el pie de foto de
la vista de detalle y se reúne completo en la página `creditos.html`, reproducida en la Figura 15.

Todas las fotografías son de archivo e ilustrativas: no documentan los hechos narrados, que son
contenido de ejemplo de un prototipo académico. El pie de foto lo indica expresamente para que
ningún lector las interprete como prueba gráfica.

---

# 10. Repositorio

El proyecto está publicado en un repositorio público, de modo que no requiere gestionar permisos
de acceso para su revisión:

**REPOSITORIO**

El historial se organiza en cuatro confirmaciones que siguen las fases del trabajo: estructura y
plan, maquetación de la Entrega 1, capa de datos y estilos, y las siete vistas con sus pruebas.

---

# 11. Conclusiones

1. Comprobar los supuestos en el navegador antes de escribir el código evitó un error que habría
   llegado hasta la entrega. El plan preveía módulos ES; al medirlo se vio que el navegador los
   bloquea cuando la página se abre con doble clic, que es exactamente el escenario que la guía
   exige soportar. Cambiar la decisión costó una tarde; descubrirlo al final habría costado
   rehacer todo el JavaScript.

2. Concentrar el acceso a `localStorage` en un único módulo resultó más útil de lo previsto. La
   eliminación de noticias, los favoritos y los mensajes de contacto comparten el mismo mecanismo,
   y cuando hubo que impedir que una noticia eliminada quedara colgando en favoritos, el cambio se
   hizo en un solo lugar.

3. Las pruebas automáticas encontraron dos fallos que la revisión visual no detectó, y uno de
   ellos estaba en la propia prueba: medía un ancho de móvil que el navegador no estaba aplicando.
   Una comprobación que pasa no garantiza que el sistema funcione; garantiza que la comprobación
   pasa, y conviene desconfiar cuando el resultado no coincide con lo que se ve.

4. Partir de una maquetación detallada acortó el desarrollo de forma apreciable. Las decisiones
   discutibles —ancho de lectura, jerarquía de la portada, estados vacíos— ya estaban tomadas, y
   el trabajo consistió en traducirlas, no en volver a decidirlas.

5. Las dos desviaciones respecto al diseño surgieron de limitaciones reales del medio, no de
   descuido: no se puede subir un archivo sin servidor, y tres elementos en línea no caben en 390
   píxeles. Documentarlas deja el criterio a la vista de quien evalúa.

6. El prototipo queda preparado para la Entrega 3. La cabecera y el pie ya están escritos como
   funciones que producen marcado a partir de datos, que es exactamente lo que serán
   `HeaderComponent` y `FooterComponent` en Angular, y los módulos de datos y persistencia se
   corresponden con los servicios que consumirán esos componentes.

---

# 12. Referencias

American Psychological Association. (2020). *Publication manual of the American Psychological
Association* (7.ª ed.). https://doi.org/10.1037/0000165-000

Bootstrap Team. (2026). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/

Creative Commons. (2026). *About CC licenses*. https://creativecommons.org/share-your-work/cclicenses/

Linube. (2023). *¿Qué son los mockups?* https://linube.com/blog/que-son-los-mockups/

MDN Web Docs. (2026). *Using the Fetch API*.
https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch

MDN Web Docs. (2026). *Window.localStorage*.
https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

Nielsen, J. (2020). *10 usability heuristics for user interface design*. Nielsen Norman Group.
https://www.nngroup.com/articles/ten-usability-heuristics/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/
""")

texto = '\n'.join(P).replace('**REPOSITORIO**', REPO)
io.open(SALIDA, 'w', encoding='utf-8').write(texto)

lineas_codigo = sum(1 for l in texto.split('\n'))
print('%s escrito' % SALIDA)
print('  %d líneas · %.0f KB' % (lineas_codigo, len(texto.encode('utf-8')) / 1024))
print('  %d figuras · %d bloques de código' % (texto.count('> FIGURA:'), texto.count('```') // 2))
