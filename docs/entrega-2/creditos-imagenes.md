# Créditos de las imágenes — Pulso Digital

Las dieciocho fotografías del aplicativo tienen licencia Creative Commons y se obtuvieron a
través de [Openverse](https://openverse.org/), el buscador de contenido con licencia abierta
de la Fundación Wikimedia. Se filtraron las licencias que permiten uso y modificación.

Las licencias CC BY y CC BY-SA **obligan a atribuir**: el aplicativo muestra autor, licencia y
enlace al original en el pie de foto de cada noticia, y reúne la lista completa en la página
`creditos.html`. Esta tabla es la misma información, para el informe.

Todas las fotografías son **de archivo e ilustrativas**: no documentan los hechos narrados, que
son contenido de ejemplo de un prototipo académico.

| Noticia | Fotografía | Autor | Licencia | Origen |
|---|---|---|---|---|
| `n-001` Los modelos de lenguaje abiertos ganan terreno… | «Centaur server room» | viagallery.com | CC BY 2.0 | [ver original](https://www.flickr.com/photos/15932083@N05/2293424530) |
| `n-002` Un laboratorio de Medellín entrena el primer m… | «professional-retro-microphone--dj-headphones-» | www.ilmicrofono.it | CC BY 2.0 | [ver original](https://www.flickr.com/photos/115089924@N02/12212276953) |
| `n-003` Cómo evaluar un asistente antes de ponerlo fre… | «Todo List» | Freestocks.org | CC0 1.0 | [ver original](https://stocksnap.io/photo/todo-list-TVEUBLIOSK) |
| `n-004` Las universidades del país acuerdan un marco c… | «Ohio University Lecture Hall» | Garden Sprite | CC0 1.0 | [ver original](https://commons.wikimedia.org/w/index.php?curid=149049984) |
| `n-005` La inversión semilla regional se reactiva tras… | «Team Meeting» | Startup Stock Photos | CC0 1.0 | [ver original](https://stocksnap.io/photo/team-meeting-JBW2PXDOL6) |
| `n-006` Tres fundadoras cuentan cómo levantaron su pri… | «Writing Drawing» | Green Chameleon | CC0 1.0 | [ver original](https://stocksnap.io/photo/writing-drawing-8Y0EDX4VP9) |
| `n-007` El modelo de suscripción llega a los talleres … | «Carroll Gardens Motorcycle repair shop» | postopp1 | CC BY 2.0 | [ver original](https://www.flickr.com/photos/20683116@N02/3658782200) |
| `n-008` Guía práctica para reemplazar tus contraseñas … | «Antivirus» | Infosec Images | CC BY 2.0 | [ver original](https://www.flickr.com/photos/136770128@N07/41397204425) |
| `n-009` Qué hacer en las primeras dos horas tras una f… | «Computer Data Hacker» | Visual Content | CC BY 2.0 | [ver original](https://www.flickr.com/photos/143601516@N03/29402709463) |
| `n-010` Las estafas por mensaje de voz clonada llegan … | «Project 365 #25: 250109 It's Good to Talk!» | comedy_nose | Dominio público | [ver original](https://www.flickr.com/photos/23408922@N07/3224694069) |
| `n-011` Los portátiles con procesador ARM ya compiten … | «Children's learner typing on the laptop keyboard closeup» | Shixart1985 | CC BY 2.0 | [ver original](https://commons.wikimedia.org/w/index.php?curid=194440259) |
| `n-012` Reparar en lugar de reemplazar: el auge de los… | «Fixed Headphones» | Andrew Mason | CC BY 2.0 | [ver original](https://www.flickr.com/photos/34754790@N00/3188058264) |
| `n-013` Sensores de bajo costo para medir la calidad d… | «Beijing smog» | kevin dooley | CC BY 2.0 | [ver original](https://www.flickr.com/photos/12836528@N00/386198516) |
| `n-014` Por qué cada vez más equipos abandonan las reu… | «101 Current Projects» | mandiberg | CC BY-SA 2.0 | [ver original](https://www.flickr.com/photos/42586873@N00/3839086705) |
| `n-015` El regreso del software de escritorio en las e… | «Desktop 8/2012» | Jiri Brozovsky | CC BY 2.0 | [ver original](https://www.flickr.com/photos/7958754@N03/7833087424) |
| `n-016` Documentar el código dejó de ser opcional en l… | «Jon Satrom - QTzrk (2011) http://Jonsatrom.com/ & Videogramo - olympic Games (2010) http://www.videogramo.8bitpeoples.co» | Rosa Menkman | CC BY 2.0 | [ver original](https://www.flickr.com/photos/68716054@N00/5486667090) |
| `n-017` Un bus escolar eléctrico diseñado y ensamblado… | «2013 in Bonn. BYD ebus (electrical bus). Bus facing left 1. Spielvogel» | For a gallery of some more of my uploaded pictures see: here. | CC0 1.0 | [ver original](https://commons.wikimedia.org/w/index.php?curid=29583408) |
| `n-018` Huertas urbanas conectadas: sensores caseros p… | «5685473534_678435312b_o» | USDAgov | Dominio público | [ver original](https://www.flickr.com/photos/41284017@N08/6302442363) |

## Reparto de licencias

- **CC BY 2.0** — 10 imagenes
- **CC BY-SA 2.0** — 1 imagen
- **CC0 1.0** — 5 imagenes
- **Dominio público** — 2 imagenes

## Cómo se obtuvieron

El script `src/assets/img/obtener-fotos.py` consulta la API de Openverse con un término de
búsqueda por noticia, prefiere las licencias menos restrictivas (dominio público antes que
atribución, y atribución antes que compartir-igual), descarta resultados cuyo título delate una
marca, un evento o un retrato, recorta al formato 16:9 y guarda el crédito dentro de
`noticias.json`. El crédito viaja con el dato para que no pueda desincronizarse de su imagen.
