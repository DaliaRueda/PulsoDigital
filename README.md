# Pulso Digital

Plataforma web de noticias de tecnología e innovación.
Proyecto del módulo **Desarrollo de Front-end** — Agosto 2026.

| | |
|---|---|
| **Repositorio** | `[PENDIENTE]` |
| **Despliegue** | `[PENDIENTE — Entrega 3]` |
| **Video explicativo** | `[PENDIENTE — Entrega 3]` |
| **Tutor** | John Olarte |
| **Estudiante** | Dalia Johanna Rueda Tangarife |

## Documentación

- [PLAN.md](PLAN.md) — plan completo de las tres entregas
- [docs/entrega-1/](docs/entrega-1/) — maquetación y especificación funcional
  - `Entrega-1-Maquetacion-Pulso-Digital.docx` — **documento de entrega** (APA 7, 29 páginas)
  - `informe-apa.md` — fuente del documento
  - `hacer-docx.py` — genera el Word a partir del Markdown
  - `mockups/` — las seis vistas exportadas a PNG, en doce segmentos
- [docs/entrega-2/](docs/entrega-2/) — prototipo funcional
  - `creditos-imagenes.md` — autoría y licencia de las 18 fotografías
- [docs/entrega-3/](docs/entrega-3/) — entrega final

## Estado

| Entrega | Semana | Estado |
|---|---|---|
| 1 — Maquetación | 3 | En curso |
| 2 — Prototipo funcional | 5 | Pendiente |
| 3 — Entrega final (Angular + despliegue) | 7 | Pendiente |

## Tecnologías

HTML5 · CSS3 · JavaScript (ES Modules) · Bootstrap 5.3 · Angular · localStorage · JSON local

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
├── PLAN.md        Plan maestro del proyecto
├── docs/          Documentación e informes APA por entrega
├── src/           Aplicación en HTML/CSS/JavaScript (Entrega 2)
└── angular/       Aplicación Angular (Entrega 3)
```
