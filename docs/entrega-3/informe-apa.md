# Informe — Entrega 3: Entrega final

> **Cómo usar este borrador.** Se convierte a Word con:
> `python ../hacer-docx.py informe-apa.md "Entrega-3-Entrega-Final-Pulso-Digital.docx" "Pulso Digital: aplicativo web de noticias desarrollado en Angular" "10 de octubre de 2026"`
> Después hay que actualizar el índice desde Word y ejecutar `metadatos.py`.

---

## PORTADA

*(Página independiente, todo centrado)*

**Pulso Digital: aplicativo web de noticias de tecnología e innovación desarrollado en Angular**

Dalia Johanna Rueda Tangarife

Facultad de Ingeniería, Diseño e Innovación, Politécnico Grancolombiano

Ingeniería de Software

Virtual / Front End

Tutor: John Olarte

10 de octubre de 2026

---

## TABLA DE CONTENIDO

*(Se genera automáticamente en Word)*

---

# 1. Introducción

Este documento corresponde a la entrega final del módulo Desarrollo de Front-end y describe el
funcionamiento y las tecnologías del aplicativo *Pulso Digital*, una plataforma web de noticias de
tecnología e innovación que se encuentra publicada y accesible desde cualquier navegador.

El proyecto se construyó en tres etapas. La primera definió cómo debía verse el aplicativo mediante
una maquetación de seis vistas. La segunda lo convirtió en un prototipo funcional escrito en HTML,
CSS y JavaScript, con datos en un archivo JSON y persistencia en el navegador. Esta tercera etapa
cierra el proceso con dos cambios de fondo: el código se reescribió sobre el *framework* Angular y
el resultado se publicó en internet mediante un flujo de despliegue automático.

La estructura del documento sigue el orden en que conviene conocer un aplicativo desconocido:
primero dónde está y qué hace (apartados 3 y 4), después con qué está hecho (apartado 5), luego
cómo está organizado por dentro (apartado 6), qué implicó el cambio de tecnología respecto de la
entrega anterior (apartado 7) y, por último, cómo llega el código desde el repositorio hasta el
servidor (apartado 8). El formato responde a la séptima edición del manual de la American
Psychological Association (2020).

---

# 2. Alcance de la entrega

La guía del módulo pide para esta entrega un aplicativo migrado a un *framework*, desplegado en un
servicio de alojamiento y documentado en normas APA, con la dirección del proyecto publicado
incluida en el documento. La Tabla 1 recoge cada punto y el estado en que se entrega.

**Tabla 1**

*Correspondencia entre lo solicitado y lo entregado*

| Lo que solicita la guía | Estado | Dónde se evidencia |
|---|---|---|
| Migración del aplicativo a un framework | Realizada en Angular 21 | Apartados 5.1, 6 y 7 |
| Despliegue en un servicio de alojamiento | Publicado en GitHub Pages | Apartado 8 |
| URL del proyecto desplegado en el documento | Incluida | Apartado 3.1 |
| Información sobre el funcionamiento del aplicativo | Incluida | Apartado 4 |
| Información sobre las tecnologías utilizadas | Incluida | Apartado 5 |
| Tabla de contenido | Incluida | Índice |
| Referentes bibliográficos | Incluidos | Apartado 11 |
| Conclusiones | Incluidas | Apartado 10 |
| Vídeo explicativo de máximo tres minutos | Enlace incluido | Apartado 9.2 |

*Nota.* Elaboración propia a partir de las orientaciones del módulo.

---

# 3. El aplicativo desplegado

## 3.1 Dirección de publicación

El aplicativo está publicado y en funcionamiento en:

**https://daliarueda.github.io/PulsoDigital/**

El código fuente completo, con las tres entregas, está en el repositorio público:

**https://github.com/DaliaRueda/PulsoDigital**

No hace falta instalar nada ni registrarse: basta abrir la dirección en cualquier navegador
moderno. El aplicativo no tiene servidor propio ni base de datos, de modo que cada visitante
trabaja sobre su propia copia de los datos, como se explica en el apartado 4.8.

## 3.2 Mapa de vistas

El aplicativo consta de ocho vistas, cada una con su propia dirección. La Tabla 2 las enumera en el
orden en que aparecen en el menú.

**Tabla 2**

*Vistas del aplicativo y su dirección*

| Vista | Dirección | Qué permite hacer |
|---|---|---|
| Portada | `/` | Ver las noticias destacadas y las más recientes |
| Noticias | `/noticias` | Buscar, filtrar, ordenar y paginar el catálogo |
| Detalle | `/noticias/:id` | Leer una noticia completa y sus relacionadas |
| Mis favoritos | `/favoritos` | Consultar y vaciar las noticias guardadas |
| Publicar | `/publicar` | Crear una noticia nueva y eliminar existentes |
| Contacto | `/contacto` | Enviar un mensaje a la redacción |
| Acerca de | `/acerca` | Conocer la línea editorial y las tecnologías |
| Créditos | `/creditos` | Ver la autoría y licencia de cada fotografía |

*Nota.* Elaboración propia. Los dos puntos en `/noticias/:id` indican un parámetro: la dirección
real de una noticia es, por ejemplo, `/noticias/n-001`.

---

# 4. Funcionamiento del aplicativo

Este apartado describe qué hace cada vista y cómo responde a lo que hace el usuario. Las capturas
corresponden al aplicativo ya desplegado, tomadas de la dirección indicada en el apartado 3.1.

## 4.1 Portada

La portada presenta la noticia principal en un bloque de apertura, tres noticias destacadas y las
más recientes del catálogo, todas ordenadas por fecha descendente. Las tarjetas de noticia son el
mismo componente que se reutiliza en el listado y en las relacionadas del detalle, de modo que una
noticia se ve igual en cualquier parte del aplicativo. El corazón de cada tarjeta guarda o quita la
noticia de favoritos sin salir de la página, y el contador de la cabecera cambia en el mismo
instante. La Figura 1 muestra la portada tal como se sirve en producción.


**Figura 1**

*Portada del aplicativo desplegado*

> FIGURA: insertar `capturas/01-inicio`

*Nota.* Elaboración propia.

## 4.2 Listado de noticias

El listado reúne las cuatro operaciones de consulta del catálogo, que funcionan combinadas entre
sí: un campo de búsqueda que recorre título, resumen y autor; un filtro por categoría; un selector
de orden (más recientes, más antiguas o alfabético) y una paginación de seis noticias por página.
Cambiar cualquiera de los cuatro controles recalcula el resultado y devuelve la vista a la primera
página, para que el usuario no quede mirando una página que ya no existe. Cuando la combinación de
filtros no deja ninguna noticia, en lugar de una zona vacía aparece un aviso con un botón que
limpia los filtros. La Figura 2 muestra la vista con los controles visibles.


**Figura 2**

*Listado con búsqueda, filtros, orden y paginación*

> FIGURA: insertar `capturas/02-listado`

*Nota.* Elaboración propia.

## 4.3 Detalle de la noticia

El detalle recibe el identificador de la noticia en la propia dirección, lo que permite compartir
el enlace de una nota concreta. Muestra la categoría, el titular, el autor, la fecha en formato
largo, el tiempo estimado de lectura, la fotografía con su crédito de autoría y el cuerpo del texto
separado en párrafos. Bajo el artículo aparecen hasta tres noticias relacionadas, elegidas por
coincidencia de categoría y excluyendo la que se está leyendo. Si la dirección contiene un
identificador que no existe, la vista lo dice con un aviso y ofrece volver al listado en lugar de
quedarse en blanco. La Figura 3 recoge la vista.


**Figura 3**

*Detalle de una noticia con su crédito fotográfico y sus relacionadas*

> FIGURA: insertar `capturas/03-detalle`

*Nota.* Elaboración propia.

## 4.4 Mis favoritos

Esta vista reúne las noticias que el usuario ha marcado con el corazón en cualquier otra pantalla.
Permite quitarlas de una en una o vaciar la lista completa, y cuando no hay ninguna muestra un
estado vacío que explica cómo guardar la primera, en lugar de una página sin contenido. Los
favoritos sobreviven al cierre del navegador porque se guardan en su almacenamiento local; también
se mantienen sincronizados si el usuario tiene dos pestañas abiertas del aplicativo. La Figura 4
muestra la vista sin favoritos guardados, que es el estado en que la encuentra un visitante nuevo.


**Figura 4**

*Lista de favoritos en su estado vacío*

> FIGURA: insertar `capturas/05-favoritos`

*Nota.* Elaboración propia.

## 4.5 Publicar y gestionar noticias

Esta es la vista con más lógica del aplicativo. El formulario de alta valida seis campos con reglas
propias: longitud mínima del titular, categoría obligatoria, autor de al menos tres caracteres,
descripción breve de veinte, cuerpo de doscientos y, si se escribe, una ruta de imagen con
extensión de archivo gráfico. Los errores no aparecen mientras el usuario escribe por primera vez,
sino cuando intenta publicar, y desaparecen en cuanto el campo deja de ser inválido. A la derecha,
una vista previa muestra la tarjeta que resultaría de lo escrito hasta ese momento y se actualiza
sin ningún código que la refresque, por el enlace en dos sentidos que se explica en el apartado 6.5.

Debajo, una tabla lista las noticias visibles con su origen —«Base» si viene del archivo JSON,
«Creada» si la hizo el usuario— y permite eliminarlas con una confirmación previa que muestra el
titular afectado. Eliminar funciona de dos maneras según el origen: las noticias creadas por el
usuario se borran de su almacenamiento, mientras que las del archivo JSON no pueden modificarse
desde el navegador y lo que se registra es que están ocultas. De ahí que exista un botón para
restaurar las noticias base, que las devuelve todas. La Figura 5 muestra el formulario, la vista
previa y la tabla de gestión.


**Figura 5**

*Publicación de noticias con vista previa en vivo y tabla de gestión*

> FIGURA: insertar `capturas/06-publicar`

*Nota.* Elaboración propia.

## 4.6 Contacto

El formulario de contacto valida el nombre —solo letras, tildes y espacios—, el correo electrónico
con una expresión regular, el asunto elegido de una lista, un mensaje de entre diez y quinientos
caracteres y la autorización de tratamiento de datos. Al enviarlo correctamente, la confirmación
sustituye al formulario en el mismo lugar y saluda al remitente por su nombre de pila citando el
asunto, de modo que se vea que el dato llegó. Como no hay servidor, el mensaje se registra en el
almacenamiento del navegador, y así se declara en el apartado 4.8: la confirmación es fiel a lo que
el aplicativo hace realmente. La vista de detalle enlaza aquí con el asunto ya seleccionado cuando
el lector quiere reportar un error en una nota concreta. La Figura 6 recoge el formulario.


**Figura 6**

*Formulario de contacto con sus validaciones*

> FIGURA: insertar `capturas/04-contacto`

*Nota.* Elaboración propia.

## 4.7 Acerca de y Créditos

La vista «Acerca de» reúne la línea editorial del medio, el equipo de redacción, un resumen de las
tecnologías empleadas y un apartado de preguntas frecuentes plegable, donde solo una respuesta
permanece abierta a la vez. Declara de forma explícita que se trata de un proyecto académico y que
los nombres del equipo son ficticios. La Figura 7 la muestra.


**Figura 7**

*Vista informativa con línea editorial, tecnologías y preguntas frecuentes*

> FIGURA: insertar `capturas/07-acerca`

*Nota.* Elaboración propia.

La vista de créditos cumple una obligación legal, no decorativa. Las dieciocho fotografías del
aplicativo provienen de bancos de imágenes con licencia Creative Commons, y las licencias CC BY y
CC BY-SA exigen atribuir al autor, nombrar la licencia y enlazar la fuente (Creative Commons,
2026). El crédito viaja dentro de cada noticia en el archivo JSON, junto a la ruta de su imagen, de
manera que no puede desincronizarse de la fotografía que acompaña; se muestra bajo la imagen en el
detalle y se reúne completo en esta vista. La Figura 8 la recoge.


**Figura 8**

*Créditos de autoría y licencia de las dieciocho fotografías*

> FIGURA: insertar `capturas/08-creditos`

*Nota.* Elaboración propia.

## 4.8 Qué se guarda y dónde

El aplicativo no tiene servidor ni base de datos. Las dieciocho noticias de partida se leen de un
archivo JSON que se sirve junto al aplicativo, y todo lo que el usuario decide se guarda en el
almacenamiento local de su navegador mediante la interfaz `localStorage` (MDN Web Docs, 2026). La
Tabla 3 enumera las cuatro claves utilizadas.

**Tabla 3**

*Datos que el aplicativo conserva en el navegador*

| Clave | Contenido | Qué vista la escribe |
|---|---|---|
| `pd_favoritos` | Identificadores de las noticias guardadas | Todas las que muestran tarjetas |
| `pd_noticias_creadas` | Noticias completas creadas por el usuario | Publicar |
| `pd_noticias_eliminadas` | Identificadores de noticias base ocultas | Publicar |
| `pd_mensajes_contacto` | Mensajes enviados desde el formulario | Contacto |

*Nota.* Elaboración propia. El catálogo que se muestra es el resultado de tomar las noticias del
archivo JSON, descontar las marcadas como eliminadas y añadir las creadas por el usuario.

Esta decisión tiene dos consecuencias que conviene enunciar sin rodeos. La primera es que los datos
son locales: lo que un visitante publica no lo ven los demás, y se pierde si borra los datos del
navegador. La segunda es que el almacenamiento puede no estar disponible —navegación privada,
cookies bloqueadas o cuota agotada—, y en ese caso el aplicativo sigue funcionando durante la
sesión trabajando contra memoria, en lugar de fallar.

---

# 5. Tecnologías utilizadas

La Tabla 4 reúne las tecnologías del aplicativo con su versión y la función que cumple cada una.
Los apartados siguientes explican por qué se eligieron.

**Tabla 4**

*Tecnologías empleadas en el aplicativo*

| Tecnología | Versión | Función en el proyecto |
|---|---|---|
| Angular | 21.2 | Framework: componentes, enrutador, formularios y señales |
| TypeScript | 5.9 | Lenguaje de la lógica, con tipos comprobados al compilar |
| RxJS | 7.8 | Flujo asíncrono de la carga del archivo JSON |
| Bootstrap | 5.3 | Rejilla responsiva y componentes base de la interfaz |
| CSS propio | — | Identidad visual: 28,9 KB reescribiendo las variables de Bootstrap |
| HTML5 | — | Plantillas de los componentes, con etiquetas semánticas |
| JSON | — | Archivo de datos con las dieciocho noticias y sus créditos |
| localStorage | — | Persistencia de favoritos, noticias creadas y mensajes |
| Git y GitHub | — | Control de versiones y repositorio público |
| GitHub Actions | — | Compilación y despliegue automáticos |
| GitHub Pages | — | Servicio de alojamiento del aplicativo |
| Node.js | 24 | Entorno de ejecución de las herramientas de compilación |

*Nota.* Elaboración propia. Las versiones son las declaradas en `angular/package.json`.

## 5.1 Angular

Angular es un *framework* de desarrollo web mantenido por Google que organiza la interfaz en
componentes y se encarga por sí mismo de mantener la pantalla al día cuando cambian los datos
(Angular Team, 2026). Se eligió por tres razones concretas, todas comprobables en el código:

En primer lugar, resuelve de raíz el problema que más código repetido generaba en la entrega
anterior. En el prototipo en JavaScript, cada vez que el usuario marcaba un favorito había que
llamar a mano a la función que repinta el contador de la cabecera y a la que repinta las tarjetas;
olvidar una de esas llamadas dejaba la pantalla mintiendo. En Angular el contador declara de qué
depende y se actualiza solo.

En segundo lugar, permite cargar cada vista por separado. Las ocho pantallas se declaran con carga
diferida, de modo que quien abre la portada no descarga el código del formulario de publicación.

En tercer lugar, trae resueltos el enrutador, los formularios y la petición de datos, que en la
entrega anterior hubo que escribir a mano.

Se utilizó la versión 21 y no la 22, que ya existía en el momento del desarrollo, porque esta última
exige Node.js 24.15 o superior y el entorno de trabajo disponía de la 24.14. Actualizar el entorno
por una diferencia de una versión menor, sin ninguna función necesaria en juego, habría añadido
riesgo sin beneficio.

## 5.2 TypeScript

TypeScript es JavaScript con tipos que se comprueban antes de ejecutar el programa
(Microsoft, 2026). Angular lo usa de forma nativa, pero su ventaja aquí es específica: el modelo de
datos de una noticia está declarado una sola vez y el compilador avisa cuando alguna parte del
aplicativo lo usa mal. En la entrega anterior, escribir `noticia.titular` en lugar de
`noticia.titulo` producía un `undefined` que solo se descubría mirando la pantalla; ahora el error
aparece al escribirlo, antes de compilar.

## 5.3 Bootstrap y la hoja de estilos propia

Bootstrap 5.3 aporta la rejilla de doce columnas, los puntos de ruptura responsivos y el
comportamiento de los componentes interactivos (Bootstrap Team, 2026). Sobre él se conserva sin
cambios la hoja de estilos de 28,9 KB escrita para la entrega anterior, que redefine las variables
CSS del *framework* para imponer la identidad visual aprobada en la maquetación: la paleta, las dos
familias tipográficas, los radios y las sombras. El resultado es que el aplicativo no se parece a
una plantilla de Bootstrap, aunque use su rejilla.

Las tipografías —Space Grotesk para titulares e IBM Plex Sans para el texto— se sirven desde el
propio aplicativo en formato WOFF2, sin depender de un servicio externo.

## 5.4 RxJS y la carga de datos

El archivo JSON con las noticias se pide con el cliente HTTP de Angular, que devuelve un flujo de
RxJS (ReactiveX, 2026). El servicio guarda el resultado de la primera petición y lo reparte entre
todos los componentes que lo soliciten después, de modo que las ocho vistas no descargan el archivo
ocho veces.

Este punto marca una diferencia técnica con la entrega anterior que merece mención. El prototipo se
abría haciendo doble clic en el archivo HTML, con el protocolo `file://`, y en ese protocolo el
navegador bloquea la lectura de archivos por seguridad. Hubo que escribir un archivo JavaScript de
respaldo con las mismas noticias. El aplicativo de Angular se sirve siempre por HTTP, así que esa
copia de seguridad dejó de tener sentido y se eliminó.

## 5.5 Fotografías con licencia libre

Las dieciocho fotografías proceden de bancos de imágenes con licencia Creative Commons o de dominio
público. Se seleccionaron por tema, se descargaron, se redimensionaron y se registraron con su autor, su
licencia y la dirección de su origen. El apartado 4.7 describe cómo circula esa
información dentro del aplicativo y la Figura 8 muestra el resultado.

## 5.6 Git, GitHub y GitHub Actions

El proyecto se versiona con Git en un repositorio público de GitHub, con un envío por hito del
desarrollo. GitHub Actions compila y publica el aplicativo en cada envío a la rama principal, y
GitHub Pages lo sirve. El apartado 8 detalla ese flujo.

---

# 6. Arquitectura de la aplicación

## 6.1 Organización de los archivos

El código propio de la aplicación son 19 archivos TypeScript (1.318 líneas) y 13 plantillas HTML
(1.361 líneas), repartidos como indica la Tabla 5.

**Tabla 5**

*Estructura del código fuente de la aplicación*

| Carpeta | Contiene | Cantidad |
|---|---|---|
| `src/app/models/` | Definición de tipos y constantes compartidas | 1 archivo |
| `src/app/services/` | Acceso a datos y a la persistencia | 2 servicios |
| `src/app/components/` | Piezas de interfaz reutilizables | 4 componentes |
| `src/app/pages/` | Una por cada vista del aplicativo | 8 componentes |
| `src/app/pipes/` | Transformación de datos para mostrar | 1 pipe |
| `public/assets/` | Estilos, tipografías, imágenes y el archivo JSON | — |
| `scripts/` | Ajustes posteriores a la compilación | 1 archivo |

*Nota.* Elaboración propia.

El criterio de reparto es sencillo: si una pieza de interfaz aparece en más de una vista, es un
componente; si solo existe en una, vive dentro de esa vista. Nada que toque el almacenamiento está
en un componente: todo pasa por un servicio.

## 6.2 Componentes reutilizables

Los cuatro componentes compartidos son la cabecera, el pie, la tarjeta de noticia y el estado
vacío. La tarjeta es el más interesante porque concentra los cuatro tipos de enlace de datos que
pide la guía y porque ilustra una decisión de diseño: no toca el almacenamiento. Cuando se pulsa su
corazón, avisa al componente que la contiene y es este quien decide qué hacer. Así la misma tarjeta
sirve en la portada, en el listado, en las noticias relacionadas del detalle y en la vista previa
del formulario de publicación, donde el corazón no debe guardar nada porque la noticia todavía no
existe.


Archivo completo `angular/src/app/components/noticia-card/noticia-card.ts` (42 líneas).

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';

/**
 * Tarjeta de noticia. Es el mismo componente en el inicio, en el listado y en
 * las noticias relacionadas del detalle.
 *
 * Reúne los cuatro tipos de enlace que pide la guía:
 *   - interpolación:      {{ noticia.titulo }}
 *   - property binding:   [src]="noticia.imagen"
 *   - event binding:      (click)="alternarFavorito()"
 *   - enlace de entrada y salida: @Input y @Output
 *
 * No toca el almacenamiento: avisa al componente que lo contiene y es este
 * quien decide qué hacer. Así la tarjeta sirve en cualquier contexto.
 */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink, FechaEsPipe],
  templateUrl: './noticia-card.html',
})
export class NoticiaCardComponent {
  /** Noticia que se muestra. */
  @Input({ required: true }) noticia!: Noticia;

  /** Si está guardada en favoritos. Lo decide quien usa la tarjeta. */
  @Input() favorito = false;

  /** Se emite con el identificador cuando se pulsa el corazón. */
  @Output() alternar = new EventEmitter<string>();

  alternarFavorito(): void {
    this.alternar.emit(this.noticia.id);
  }

  /** Sustituye por un marcador la imagen cuya ruta no exista. */
  imagenRota(evento: Event): void {
    (evento.target as HTMLImageElement).style.display = 'none';
  }
}
```
## 6.3 Servicios

Hay dos servicios, y la razón de que sean dos es la naturaleza de lo que gestionan. El servicio de
noticias lee datos que no cambian: pide el archivo JSON una vez y ofrece las operaciones de filtro,
orden, paginación, destacadas y relacionadas. El servicio de favoritos gestiona datos que sí
cambian, y es el único punto del aplicativo que accede a `localStorage`; si mañana hubiera que
sustituir el almacenamiento local por una base de datos real, solo cambiaría este archivo.

El fragmento siguiente muestra la pieza que resuelve el problema descrito en el apartado 5.1: la
lista de identificadores es una señal, y el recuento se declara como un valor derivado de ella. La
cabecera muestra ese recuento y se actualiza sola cuando cualquier vista guarda o quita una
noticia, sin que ninguna vista tenga que avisarla.


Fragmento de `angular/src/app/services/favoritos.service.ts`.

```typescript
  /** Identificadores guardados. Es la fuente de la que derivan las demás. */
  private readonly ids = signal<string[]>(this.leer(FavoritosService.CLAVES.favoritos, []));

  /** Cuántas noticias hay guardadas. La cabecera se suscribe a esto. */
  readonly cuantos = computed(() => this.ids().length);

  /** Lista de identificadores, de solo lectura para quien la consulte. */
  readonly favoritos = this.ids.asReadonly();

  constructor() {
    // Dos pestañas abiertas se mantienen sincronizadas.
    window.addEventListener('storage', (e) => {
      if (e.key === FavoritosService.CLAVES.favoritos) {
        this.ids.set(this.leer(FavoritosService.CLAVES.favoritos, []));
      }
    });
  }
```
## 6.4 Enrutador y carga diferida

Las ocho vistas se declaran en un único archivo de rutas. Cada una usa `loadComponent`, que retrasa
la descarga de su código hasta que el usuario abre esa dirección; el compilador produce por ello un
fragmento independiente por vista. La ruta del detalle declara el identificador como parámetro, y la
última regla captura cualquier dirección desconocida y devuelve al inicio.


Archivo completo `angular/src/app/app.routes.ts` (52 líneas).

```typescript
import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación. Cada vista se carga de forma diferida, de modo que
 * el usuario solo descarga el código de la pantalla que abre.
 *
 * El detalle recibe el identificador como parámetro: /noticias/n-001
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inicio/inicio').then((m) => m.InicioComponent),
    title: 'Pulso Digital — Noticias de tecnología e innovación',
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/listado/listado').then((m) => m.ListadoComponent),
    title: 'Noticias — Pulso Digital',
  },
  {
    path: 'noticias/:id',
    loadComponent: () => import('./pages/detalle/detalle').then((m) => m.DetalleComponent),
    title: 'Noticia — Pulso Digital',
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos').then((m) => m.FavoritosComponent),
    title: 'Mis favoritos — Pulso Digital',
  },
  {
    path: 'publicar',
    loadComponent: () => import('./pages/publicar/publicar').then((m) => m.PublicarComponent),
    title: 'Publicar y gestionar noticias — Pulso Digital',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.ContactoComponent),
    title: 'Contacto — Pulso Digital',
  },
  {
    path: 'acerca',
    loadComponent: () => import('./pages/acerca/acerca').then((m) => m.AcercaComponent),
    title: 'Acerca de — Pulso Digital',
  },
  {
    path: 'creditos',
    loadComponent: () => import('./pages/creditos/creditos').then((m) => m.CreditosComponent),
    title: 'Créditos de imágenes — Pulso Digital',
  },
  // Cualquier dirección desconocida vuelve al inicio.
  { path: '**', redirectTo: '' },
];
```
## 6.5 Los cuatro tipos de enlace de datos

La guía del módulo pide evidenciar los cuatro mecanismos con que Angular conecta la lógica de un
componente con su plantilla. La Tabla 6 los enumera con un ejemplo real del código del aplicativo.

**Tabla 6**

*Tipos de enlace de datos y dónde se usan en el aplicativo*

| Tipo | Sintaxis | Ejemplo en el proyecto | Qué hace |
|---|---|---|---|
| Interpolación | `{{ }}` | `{{ noticia.titulo }}` en la tarjeta | Escribe un valor en el texto |
| Enlace de propiedad | `[ ]` | `[src]="noticia.imagen"` en la tarjeta | Pasa un valor a un atributo |
| Enlace de evento | `( )` | `(click)="alternarFavorito()"` en la tarjeta | Ejecuta código ante una acción |
| Enlace en dos sentidos | `[( )]` | `[(ngModel)]="titulo"` en el formulario de publicación | Sincroniza campo y propiedad en ambos sentidos |

*Nota.* Elaboración propia. Los tipos de enlace de entrada y salida entre componentes se implementan
con los decoradores `@Input` y `@Output`, visibles en el listado del apartado 6.2.

El cuarto es el que produce el efecto más visible del aplicativo. En el formulario de publicación,
la vista previa de la tarjeta se construye a partir de las mismas propiedades a las que están
enlazados los campos; al escribir el titular, la tarjeta de la derecha lo refleja al instante sin
una sola línea de código que la mande repintar.

## 6.6 Estado derivado

El listado ilustra la forma en que el aplicativo organiza su estado. Los cuatro controles —texto de
búsqueda, categoría, orden y página— son señales, y el resultado que se muestra no se guarda: se
declara como un cálculo que depende de ellas. Cambiar cualquier control recalcula solo lo que
depende de él.


Fragmento de `angular/src/app/pages/listado/listado.ts`.

```typescript
  readonly resultado = computed(() =>
    this.noticiasSrv.ordenar(
      this.noticiasSrv.filtrar(this.catalogo(), this.texto(), this.categoria()),
      this.orden(),
    ),
  );

  readonly totalPaginas = computed(() => this.noticiasSrv.totalPaginas(this.resultado().length));
  readonly visibles = computed(() => this.noticiasSrv.paginar(this.resultado(), this.pagina()));
```
Esta es la diferencia práctica más grande respecto de la entrega anterior. En el prototipo en
JavaScript, la misma funcionalidad exigía una función que leyera los cuatro controles, calculara el
resultado y volviera a dibujar la lista, y había que acordarse de llamarla desde cada uno de los
cuatro sitios donde algo cambiaba.

## 6.7 Un pipe propio para las fechas

Las fechas se guardan en el archivo JSON en formato internacional (`2026-09-12`) y deben mostrarse
en español, en tres formatos según el sitio: abreviado en las tarjetas, medio en las tablas y
completo en el detalle. Se escribió un *pipe* propio para ello en lugar de usar el de Angular por un
motivo concreto que se documenta en el propio código: convertir la cadena con `new Date()` la
interpreta como hora universal, y en Colombia, cinco horas por detrás, eso devuelve el día anterior.
El *pipe* parte la cadena en lugar de interpretarla como instante de tiempo.


Archivo completo `angular/src/app/pipes/fecha-es.pipe.ts` (35 líneas).

```typescript
import { Pipe, PipeTransform } from '@angular/core';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * Da formato a una fecha ISO (AAAA-MM-DD) en español.
 *
 * Se parte la cadena en lugar de usar «new Date()»: ese constructor la
 * interpreta como UTC y en Colombia, que va cinco horas por detrás,
 * devolvería el día anterior.
 *
 * Formatos:
 *   'tarjeta' → 12 sep
 *   'corto'   → 12 sep 2026        (por omisión)
 *   'largo'   → 12 de septiembre de 2026
 */
@Pipe({ name: 'fechaEs' })
export class FechaEsPipe implements PipeTransform {
  transform(iso: string | undefined, formato: 'tarjeta' | 'corto' | 'largo' = 'corto'): string {
    const p = String(iso ?? '').split('-');
    if (p.length !== 3) return '';

    const dia = parseInt(p[2], 10);
    const mes = parseInt(p[1], 10) - 1;
    if (isNaN(dia) || isNaN(mes) || mes < 0 || mes > 11) return '';

    if (formato === 'largo') return `${dia} de ${MESES[mes]} de ${p[0]}`;
    if (formato === 'tarjeta') return `${dia} ${MESES_CORTOS[mes]}`;
    return `${dia} ${MESES_CORTOS[mes]} ${p[0]}`;
  }
}
```
## 6.8 Accesibilidad

Las pautas de accesibilidad para el contenido web (World Wide Web Consortium, 2023) se aplicaron en
las decisiones que dependen del marcado, no como una revisión final. El documento declara su idioma,
la primera pieza enfocable de cada pantalla es un enlace que salta directamente al contenido, y los
campos de búsqueda y de orden que no llevan etiqueta visible tienen una oculta que el lector de
pantalla sí anuncia. Las dos tablas del aplicativo llevan un resumen oculto que explica qué
contienen. Los botones de icono —el corazón de cada tarjeta, el botón de eliminar de la tabla—
declaran su acción incluyendo el titular de la noticia sobre la que actúan, de modo que no se
anuncien como «botón» sin más. Los iconos decorativos se marcan para que el lector los omita, y las
fotografías reciben como texto alternativo el titular de su noticia, salvo las miniaturas que
acompañan a un título ya escrito al lado, donde el texto alternativo se deja vacío a propósito para
no repetirlo.

Tres zonas anuncian sus cambios sin que el usuario tenga que buscarlos: el recuento de resultados
del listado, el de favoritos y el aviso de confirmación al publicar. La paginación marca cuál es la
página actual, y el desplegable de preguntas frecuentes declara si está abierto.

---

# 7. Del prototipo en JavaScript al aplicativo en Angular

## 7.1 Lo que se conservó

La migración no rehízo el proyecto desde cero. Se conservaron sin cambios la hoja de estilos, las
tipografías, el archivo JSON de noticias, las dieciocho fotografías con sus créditos y, sobre todo,
las decisiones de comportamiento: las mismas validaciones, los mismos mensajes, las mismas reglas de
paginación y de noticias relacionadas. Un usuario que hubiera visto el prototipo reconocería el
aplicativo, y esa continuidad fue deliberada: permite atribuir cualquier diferencia de
comportamiento a la migración y no a un rediseño simultáneo.

La versión en JavaScript se conserva además en la carpeta `src/` del repositorio, como evidencia de
la entrega anterior.

## 7.2 Lo que cambió

La Tabla 7 recoge la correspondencia entre las piezas del prototipo y las del aplicativo.

**Tabla 7**

*Equivalencias entre el prototipo en JavaScript y el aplicativo en Angular*

| En la Entrega 2 | En la Entrega 3 |
|---|---|
| Nueve archivos HTML completos, con cabecera y pie repetidos | Un `index.html` y ocho componentes de vista |
| Cabecera y pie copiados en cada página | Dos componentes reutilizados |
| `storage.js` con funciones sueltas | `FavoritosService`, inyectable y con señales |
| `data.js` con `fetch` y respaldo | `NoticiasService` con `HttpClient` |
| Funciones que repintaban el DOM a mano | Valores derivados que Angular repinta solos |
| Enlaces entre archivos `.html` | Enrutador con carga diferida por vista |
| Formularios validados con JavaScript propio | Formularios con `ngModel` y validación propia |
| Fechas formateadas con una función auxiliar | Pipe `fechaEs` |
| Se abre haciendo doble clic en el archivo | Requiere compilación y un servidor |

*Nota.* Elaboración propia.

## 7.3 Lo que costó la decisión

Un informe honesto debe registrar también el precio del cambio. La Tabla 8 compara el peso del
código que el navegador descarga en cada versión.

**Tabla 8**

*Comparación del código JavaScript entregado al navegador*

| Medida | Entrega 2 (JavaScript) | Entrega 3 (Angular) |
|---|---|---|
| Código propio escrito | 11 archivos, 73,5 KB | 19 archivos TypeScript, 1.318 líneas |
| JavaScript compilado total | No se compila | 393 KB en 16 fragmentos |
| Lo que descarga la portada | 73,5 KB | 299 KB precargados, más el fragmento de la vista |
| Fragmento mayor | — | 254 KB: Angular, enrutador y formularios |
| Requisitos para ejecutarlo | Un navegador | Node.js y una compilación previa |

*Nota.* Elaboración propia a partir de la medición de los archivos generados por
`npm run build:pages`.

La lectura de esos números es que, para un aplicativo de este tamaño, el *framework* pesa varias
veces más que la aplicación que sostiene. A cambio, elimina la clase de error más frecuente del
prototipo —la pantalla que no se actualiza porque faltó una llamada—, permite que cada vista se
descargue por separado y hace que el código crezca sin volverse más difícil de seguir. Es un
intercambio razonable para un proyecto que aspira a seguir creciendo, y un sobrecoste difícil de
justificar para una página de tres pantallas que no va a cambiar. Reconocerlo forma parte de haber
entendido la herramienta.

---

# 8. Despliegue

## 8.1 Servicio elegido

El aplicativo se publicó en GitHub Pages, el servicio de alojamiento de sitios estáticos de GitHub
(GitHub, 2026a). Se eligió por tres motivos: el código ya estaba en un repositorio de GitHub, de
modo que el despliegue no introduce otra cuenta ni otro proveedor; el aplicativo es un sitio
estático, que es exactamente lo que el servicio sirve; y permite lanzar la publicación desde un
flujo de trabajo automático, sin subir archivos a mano.

## 8.2 Compilación y publicación automáticas

El despliegue no se hace desde el equipo de desarrollo. Un flujo de trabajo de GitHub Actions
(GitHub, 2026b) se ejecuta en cada envío a la rama principal: descarga el repositorio, instala las
dependencias exactas declaradas en el archivo de bloqueo, compila el aplicativo y publica el
resultado. La consecuencia práctica es que la dirección publicada siempre refleja lo que hay en el
repositorio, y que nadie puede desplegar una versión que no esté versionada.


Fragmento de `.github/workflows/deploy.yml`.

```yaml
name: Desplegar en GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Un despliegue a la vez; si llegan varios, se atiende el último.
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  compilar:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar el repositorio
        uses: actions/checkout@v4

      - name: Preparar Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: angular/package-lock.json

      - name: Instalar dependencias
        working-directory: angular
        run: npm ci

      - name: Compilar para GitHub Pages
        working-directory: angular
        run: npm run build:pages

      - name: Preparar Pages
        uses: actions/configure-pages@v5

      - name: Subir la compilación
        uses: actions/upload-pages-artifact@v3
        with:
          path: angular/dist/pulso-digital/browser

  desplegar:
    needs: compilar
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.despliegue.outputs.page_url }}
    steps:
      - name: Publicar
        id: despliegue
        uses: actions/deploy-pages@v4
```
El comando de compilación merece una nota. El aplicativo no se sirve en la raíz de un dominio, sino
en una subcarpeta con el nombre del repositorio, así que la compilación se lanza indicando esa base:

```
ng build --configuration production --base-href /PulsoDigital/
```

Sin ese parámetro, el aplicativo buscaría sus archivos en la raíz del dominio y no encontraría
ninguno.

Para que el flujo funcione hay un requisito que no está en el código y conviene dejar escrito: en la
configuración del repositorio, la fuente de GitHub Pages debe estar puesta en «GitHub Actions». Con
la opción por omisión, que publica el contenido de una rama, el flujo falla al preparar el
despliegue.

## 8.3 Las rutas profundas y la página 404

El único problema real de la publicación fue este. Un aplicativo de una sola página resuelve sus
rutas en el navegador: `/noticias` no es un archivo, es una dirección que el enrutador interpreta.
GitHub Pages, en cambio, busca un archivo con ese nombre y, al no encontrarlo, responde con su
página de error. El resultado era que navegar dentro del aplicativo funcionaba, pero abrir
`/noticias` directamente —o recargar la página estando ahí, o entrar por un enlace compartido—
devolvía un error.

La solución consiste en servir una copia del `index.html` como página de error, de modo que
cualquier dirección no encontrada cargue el aplicativo y sea el enrutador de Angular quien decida
qué mostrar. Un pequeño archivo de Node.js lo hace al terminar cada compilación, y aprovecha para
escribir el archivo `.nojekyll`, sin el cual GitHub descartaría las carpetas que empiezan por guion
bajo.


Archivo completo `angular/scripts/post-build.mjs` (25 líneas).

```javascript
/**
 * Ajustes posteriores a la compilación, necesarios para GitHub Pages.
 *
 * 1. 404.html: GitHub Pages no reenvía a index.html las rutas que no existen
 *    como archivo. Al servir una copia de index.html como página de error, el
 *    enrutador de Angular recibe el control y muestra la vista correcta. Sin
 *    esto, abrir /noticias directamente daría un 404.
 *
 * 2. .nojekyll: evita que GitHub procese la salida con Jekyll, que ignoraría
 *    los archivos y carpetas que empiezan por guion bajo.
 */
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist', 'pulso-digital', 'browser');

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No se encontró index.html en ' + DIST);
  process.exit(1);
}

copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'));
writeFileSync(join(DIST, '.nojekyll'), '');

console.log('post-build: 404.html y .nojekyll escritos en dist/pulso-digital/browser');
```
Cabe precisar que esta solución es la habitual, no un apaño: el servidor sigue respondiendo con el
código 404 en la cabecera de la respuesta, pero entrega el aplicativo completo y el usuario ve la
vista correcta. Eliminar ese código de estado exigiría un servidor propio, que es precisamente lo
que un sitio estático no tiene.

## 8.4 Verificación del despliegue

Una vez publicado, se comprobó ruta por ruta sobre la dirección real, no sobre el equipo de
desarrollo. La Tabla 9 recoge el resultado.

**Tabla 9**

*Comprobación del aplicativo desplegado*

| Dirección | Qué se comprobó | Resultado |
|---|---|---|
| `/` | Carga la portada con sus tres destacadas | Correcto |
| `/noticias` | Muestra seis noticias y la paginación | Correcto |
| `/noticias/n-001` | Carga la noticia y sus tres relacionadas | Correcto |
| `/favoritos` | Muestra el estado vacío | Correcto |
| `/publicar` | Lista las dieciocho noticias en la tabla | Correcto |
| `/contacto` | Valida y confirma el envío | Correcto |
| `/acerca` | Despliega las preguntas frecuentes | Correcto |
| `/creditos` | Lista los dieciocho créditos | Correcto |
| Archivos de `assets/` | Estilos, tipografías, JSON e imágenes | Correcto |
| Recarga en una ruta profunda | El enrutador recupera el control | Correcto |

*Nota.* Elaboración propia. Las capturas de las Figuras 1 a 8 se tomaron de esta misma verificación.

---

# 9. Repositorio y vídeo

## 9.1 Repositorio

**https://github.com/DaliaRueda/PulsoDigital**

El repositorio es público y contiene las tres entregas. La carpeta `src/` guarda el prototipo en
JavaScript de la Entrega 2; `angular/` contiene el aplicativo de esta entrega; `docs/` reúne la
maquetación, las capturas y los informes de las tres. El historial tiene un envío por hito, con mensajes
que describen el cambio.

## 9.2 Vídeo explicativo

El vídeo de presentación, de duración inferior a tres minutos, recorre el aplicativo desplegado en
GitHub Pages: la portada, el listado de noticias, la lectura de una noticia, el formulario para
publicar, la página de favoritos y el formulario de contacto. Termina en el editor, con el componente
de la tarjeta de noticia, para explicar cómo se arma la interfaz con componentes reutilizables, cómo
la tarjeta recibe los datos y avisa a la página al marcar un favorito, y cómo el despliegue se
actualiza automáticamente con cada cambio enviado a GitHub.

Dirección del vídeo:

**https://youtu.be/7ltYDqaxYc0**

---

# 10. Conclusiones

**El framework resolvió un problema concreto, no uno abstracto.** La razón por la que el aplicativo
es más sencillo de mantener que el prototipo no es que Angular sea mejor tecnología, sino que
elimina una tarea que el prototipo obligaba a hacer a mano: avisar a cada parte de la pantalla de
que los datos cambiaron. El contador de favoritos de la cabecera es el ejemplo mínimo. En la entrega
anterior había que recordar actualizarlo desde cada vista; ahora declara de qué depende una sola
vez. Ese cambio es el que explica por qué el código creció en archivos y se redujo en trampas.

**El coste del framework es real y conviene medirlo.** El aplicativo entrega 393 KB de JavaScript
compilado donde el prototipo entregaba 73,5 KB, y el fragmento mayor —254 KB de Angular, enrutador y
formularios— pesa varias veces más que toda la lógica propia. Para este proyecto la carga diferida
por vista y la facilidad de mantenimiento lo compensan; para una página de tres pantallas que no va
a cambiar, no lo compensaría. Aprender a usar una herramienta incluye saber cuándo no usarla.

**Separar el acceso a los datos del resto del código dio resultado dos veces.** La decisión de que
ningún componente toque el almacenamiento directamente se tomó en la entrega anterior por orden, y
resultó rentable en esta: migrar la persistencia consistió en reescribir un solo archivo, y el
respaldo que el protocolo `file://` había obligado a inventar se pudo eliminar sin tocar ninguna
vista.

**Desplegar reveló un requisito que el desarrollo local oculta.** Todo funcionaba en el equipo y
seguía funcionando en la compilación local, pero abrir una ruta profunda en el servidor devolvía un
error. La causa era estructural —un aplicativo de una sola página resuelve rutas que el servidor
estático desconoce— y la solución exigió entender la diferencia entre lo que hace el enrutador y lo
que hace un servidor de archivos. Un despliegue no es el último paso de la lista: es una prueba que
descubre suposiciones que el desarrollo local no cuestiona.

**Automatizar el despliegue cambió su naturaleza.** Que la publicación se lance desde un flujo de
trabajo en cada envío a la rama principal significa que la dirección publicada no puede divergir del
repositorio, y que el despliegue dejó de ser un trámite manual que se puede hacer mal para
convertirse en una consecuencia del control de versiones.

**Las tres entregas describen un orden que resultó ser el correcto.** Definir primero el aspecto,
después el comportamiento y solo al final la tecnología permitió que cada etapa se apoyara en algo
ya decidido. Al migrar no hubo que discutir cómo debía verse una tarjeta ni cuántas noticias caben
en una página: esas preguntas estaban cerradas, y el trabajo pudo concentrarse en el *framework*.

---

# 11. Referencias

American Psychological Association. (2020). *Publication manual of the American Psychological
Association* (7.ª ed.). https://doi.org/10.1037/0000165-000

Angular Team. (2026). *Angular documentation*. https://angular.dev/

Bootstrap Team. (2026). *Bootstrap 5.3 documentation*. https://getbootstrap.com/docs/5.3/

Creative Commons. (2026). *About CC licenses*. https://creativecommons.org/share-your-work/cclicenses/

GitHub. (2026a). *GitHub Pages documentation*. https://docs.github.com/en/pages

GitHub. (2026b). *GitHub Actions documentation*. https://docs.github.com/en/actions

MDN Web Docs. (2026). *Window.localStorage*.
https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

Microsoft. (2026). *TypeScript documentation*. https://www.typescriptlang.org/docs/

ReactiveX. (2026). *RxJS documentation*. https://rxjs.dev/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/
