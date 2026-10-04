# Pulso Digital

Plataforma web de noticias de tecnología e innovación.
Proyecto del módulo **Desarrollo de Front-end** — Agosto 2026.

| | |
|---|---|
| **Repositorio** | https://github.com/DaliaRueda/PulsoDigital |
| **Despliegue** | https://daliarueda.github.io/PulsoDigital/ |
| **Video explicativo** | https://youtu.be/7ltYDqaxYc0 |
| **Tutor** | John Olarte |
| **Estudiante** | Dalia Johanna Rueda Tangarife |

## Documentación

- [docs/entrega-1/](docs/entrega-1/) — maquetación y especificación funcional
  - `Entrega-1-Maquetacion-Pulso-Digital.docx` — **documento de entrega** (APA 7, 29 páginas)
  - `especificacion-funcional.md` — especificación funcional de las vistas
  - `mockups/` — las seis vistas exportadas a PNG, en doce segmentos
- [docs/entrega-2/](docs/entrega-2/) — prototipo funcional
  - `Entrega-2-Prototipo-Funcional-Pulso-Digital.docx` — **documento de entrega** (APA 7, 51 páginas)
  - `capturas/` — pantallas del prototipo en funcionamiento
  - `creditos-imagenes.md` — autoría y licencia de las 18 fotografías
- [docs/entrega-3/](docs/entrega-3/) — entrega final
  - `Entrega-3-Entrega-Final-Pulso-Digital.docx` — **documento de entrega** (APA 7, 40 páginas)
  - `capturas/` — pantallas del sitio ya desplegado

## Estado

| Entrega | Semana | Estado |
|---|---|---|
| 1 — Maquetación | 3 | Entregada |
| 2 — Prototipo funcional | 5 | Entregada |
| 3 — Entrega final (Angular + despliegue) | 7 | Entregada |

## Tecnologías

**Entrega 2** — HTML5 · CSS3 · JavaScript con espacio de nombres · Bootstrap 5.3 · localStorage · JSON local
**Entrega 3** — Angular 21 con componentes independientes, enrutador con carga diferida y señales

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `src/` | Aplicación de la Entrega 2 en HTML, CSS y JavaScript. Se conserva como evidencia |
| `angular/` | Aplicación de la Entrega 3 en Angular 21. Es la que se despliega |
| `docs/` | Documentación e informes de cada entrega |

## Cómo ejecutar la aplicación de Angular

```bash
cd angular
npm install
npm start                 # servidor de desarrollo en http://localhost:4200
```

Para reproducir la compilación que se publica:

```bash
npm run build:pages       # compila con la ruta base de GitHub Pages
npm run serve:dist        # la sirve en http://127.0.0.1:8080 con reenvío a index.html
```

El reenvío importa: una aplicación de una sola página necesita que el servidor devuelva
`index.html` para cualquier ruta que no sea un archivo. GitHub Pages no lo hace, y por eso la
compilación publica una copia de `index.html` como `404.html`.

## Despliegue

Automático con GitHub Actions en cada envío a `main`. El flujo está en
`.github/workflows/deploy.yml`.

## Cómo ejecutar (Entrega 2)

Las páginas funcionan abriendo `src/index.html` en cualquier navegador. Para que el `fetch()`
del JSON no sea bloqueado por CORS al abrir con `file://`, se recomienda un servidor local:

```bash
cd src
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Estructura

```
├── docs/          Documentación e informes APA por entrega
├── src/           Aplicación en HTML/CSS/JavaScript (Entrega 2)
└── angular/       Aplicación Angular (Entrega 3)
```
