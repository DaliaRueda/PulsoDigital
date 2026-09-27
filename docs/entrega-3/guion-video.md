# Guion del vídeo — Entrega 3

**Duración objetivo:** 2 min 50 s (el límite son 3 min, conviene dejar margen).
**Qué grabar:** la pantalla, con el navegador abierto en <https://daliarueda.github.io/PulsoDigital/>
y el editor de código en una segunda pestaña o ventana.

**Antes de grabar**

1. Abrir el sitio y **guardar dos o tres noticias en favoritos**, para que la vista de favoritos no
   salga vacía cuando llegues a ella.
2. Cerrar pestañas ajenas, notificaciones y cualquier cosa con tu nombre de usuario visible.
3. Poner el navegador a pantalla completa (F11) y el zoom al 100 %.
4. Tener el editor abierto en `angular/src/app/components/noticia-card/noticia-card.ts`.

**Cómo usar este guion:** la columna de la izquierda es lo que se ve; la de la derecha, lo que dices.
Los tiempos son acumulados. Si te pasas, el recorte más fácil es el bloque 6 (código).

---

## 0:00 – 0:20 · Presentación

*En pantalla: la portada del sitio, quieta.*

> Buenos días. Soy Dalia Rueda y les presento *Pulso Digital*, una plataforma web de noticias de
> tecnología e innovación, desarrollada en Angular y publicada en GitHub Pages. Lo que están viendo
> no es una simulación: es el aplicativo funcionando en su dirección definitiva, que aparece ahí
> arriba en la barra del navegador.

---

## 0:20 – 0:45 · Portada y favoritos

*Bajar despacio por la portada. Al llegar a las tarjetas, pulsar el corazón de una y señalar el
contador de la cabecera.*

> La portada muestra la noticia principal, tres destacadas y las más recientes. Cada tarjeta se puede
> guardar en favoritos desde aquí mismo, y fíjense en el contador de la cabecera: cambia en el
> instante en que pulso el corazón, sin recargar la página. Ese comportamiento es el que resuelve
> Angular: el contador declara de qué depende y se actualiza solo.

---

## 0:45 – 1:15 · Listado: búsqueda, filtro, orden y paginación

*Ir a «Noticias». Escribir «inteligencia» en el buscador. Borrarlo. Elegir una categoría. Cambiar el
orden. Pasar a la página 2.*

> En el listado están las cuatro operaciones de consulta, y funcionan combinadas. Busco por texto y
> el resultado se reduce mientras escribo. Filtro por categoría. Cambio el orden. Y la paginación
> muestra seis noticias por página. Cuando una combinación de filtros no deja ninguna noticia, en
> lugar de una pantalla en blanco aparece un aviso con un botón para limpiarlos.

---

## 1:15 – 1:35 · Detalle

*Abrir una noticia. Bajar hasta el crédito de la foto y hasta las relacionadas.*

> Al abrir una noticia, la dirección incluye su identificador, así que este enlace se puede
> compartir. Debajo de la fotografía está el crédito de autoría: las dieciocho imágenes tienen
> licencia Creative Commons y esa atribución es una obligación de la licencia, no un adorno. Al final
> aparecen hasta tres noticias relacionadas de la misma categoría.

---

## 1:35 – 2:05 · Publicar: el enlace en dos sentidos

*Ir a «Publicar». Escribir un titular despacio, mirando la vista previa de la derecha. Luego bajar a
la tabla y pulsar eliminar en una fila para que salga la confirmación. Cancelar.*

> Esta es la vista con más lógica. Mientras escribo el titular, la tarjeta de la derecha lo va
> reflejando: es el enlace de datos en dos sentidos, y no hay una sola línea de código que mande
> repintar esa tarjeta. El formulario valida seis campos y los errores aparecen al intentar publicar,
> no mientras escribes. Abajo, la tabla permite eliminar noticias, siempre con una confirmación que
> muestra de cuál se trata.

---

## 2:05 – 2:20 · Favoritos y contacto

*Ir a «Mis favoritos» y mostrar las noticias guardadas. Luego a «Contacto», enviar el formulario
vacío para que salten los errores, y cerrar.*

> Los favoritos que guardé siguen aquí, porque se conservan en el almacenamiento del navegador. Y el
> formulario de contacto valida el nombre, el correo, el asunto, el mensaje y la autorización de
> datos antes de dejar enviar.

---

## 2:20 – 2:50 · Por dentro: arquitectura y despliegue

*Cambiar al editor, con `noticia-card.ts` abierto. Señalar `@Input` y `@Output`. Luego, si alcanza,
mostrar `app.routes.ts`.*

> Por dentro, el aplicativo son ocho vistas y cuatro componentes reutilizables. Este es la tarjeta de
> noticia: recibe la noticia con `@Input` y avisa con `@Output` cuando se pulsa el corazón, sin tocar
> el almacenamiento. Por eso sirve igual en la portada, en el listado y en la vista previa del
> formulario. Cada vista se carga de forma diferida, así que quien abre la portada no descarga el
> código del resto.
>
> Y el despliegue no lo hago yo: cada envío al repositorio dispara un flujo de GitHub Actions que
> compila y publica. La dirección siempre refleja lo que hay en el código. Muchas gracias.

---

## Notas de grabación

- **Si te pasas de tiempo**, recorta el bloque 6 hasta «no descarga el código del resto» y salta
  directo al despliegue.
- **No leas el guion palabra por palabra** si te suena forzado: lo importante es que se vea el
  aplicativo funcionando y que se nombren las cuatro cosas que pide la guía —Angular, los enlaces de
  datos, la arquitectura de componentes y el despliegue.
- Al subir a YouTube, ponlo como **público** o **no listado**, nunca privado: un vídeo privado no lo
  puede ver el tutor.
- Pega el enlace en el apartado 9.2 del informe antes de generar el PDF.
