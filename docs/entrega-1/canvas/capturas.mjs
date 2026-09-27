// Captura los seis mockups y los parte en segmentos que quepan en una pagina A4.
//
// Un mockup de 1440 x 3100 px insertado a 16,5 cm de ancho mediria 35 cm de alto:
// no cabe en una pagina y Word no reparte una imagen entre dos. Por eso se corta
// por los limites de las bandas que ya estan marcadas con data-zona, nunca a mitad
// de una tarjeta o de un parrafo.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PROFILE = path.join(process.env.SCRATCH, 'cprofile');
const OUT = process.env.SCRATCH;
const ESCALA = 2;          // se captura al doble y se reduce despues, para que no pixele
const MAX_SEG = 1650;      // px CSS por segmento

const VISTAS = ['Main', 'Listado', 'Detalle', 'Contacto', 'Favoritos', 'Publicar'];
const TMP = '.capturas';
fs.mkdirSync(TMP, { recursive: true });

const plan = {};
for (const v of VISTAS) {
  // 1. medir el alto total y el limite de cada banda
  const probe = path.join(TMP, v + '.html');
  fs.writeFileSync(probe, fs.readFileSync(path.join('render', v + '.html'), 'utf8') + `
<script>
  var tape = document.querySelector('.tape');
  var paper = tape.nextElementSibling;
  var rows = [{ y: 0, name: 'cinta' }];
  for (var el of paper.children) {
    var r = el.getBoundingClientRect();
    rows.push({ y: Math.round(r.top + window.scrollY), name: el.getAttribute('data-zona') || el.className || el.tagName });
  }
  document.title = 'J' + JSON.stringify({ total: document.documentElement.scrollHeight, rows: rows });
</script>`);
  const dom = execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-sandbox',
    `--user-data-dir=${PROFILE}`, '--window-size=1440,900', '--virtual-time-budget=6000',
    '--dump-dom', pathToFileURL(path.resolve(probe)).href], { encoding: 'utf8', maxBuffer: 1 << 28 });
  const m = dom.match(/<title>J(\{.*?\})<\/title>/s);
  if (!m) throw new Error('no se pudo medir ' + v);
  const { total, rows } = JSON.parse(m[1]);

  // 2. repartir las bandas en segmentos equilibrados, cortando solo en sus limites
  const limites = [...rows.map((r) => r.y), total];
  const n = Math.max(1, Math.ceil(total / MAX_SEG));
  const cortes = [0];
  for (let k = 1; k < n; k++) {
    const ideal = (total * k) / n;
    // limite real mas cercano al corte ideal, siempre por delante del anterior
    const cand = limites.filter((y) => y > cortes[cortes.length - 1] && y < total);
    if (!cand.length) break;
    cortes.push(cand.reduce((a, b) => (Math.abs(b - ideal) < Math.abs(a - ideal) ? b : a)));
  }
  cortes.push(total);

  // 3. captura completa al doble de resolucion
  const png = path.join(OUT, v + '-full.png');
  execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-sandbox',
    `--user-data-dir=${PROFILE}`, `--screenshot=${png}`,
    `--window-size=1440,${total}`, `--force-device-scale-factor=${ESCALA}`,
    '--hide-scrollbars', '--virtual-time-budget=8000',
    pathToFileURL(path.resolve('render', v + '.html')).href], { stdio: 'pipe' });

  plan[v] = { total, escala: ESCALA, png, cortes, zonas: rows.map((r) => r.name) };
  console.log(`${v.padEnd(10)} ${String(total).padStart(5)} px -> ${cortes.length - 1} segmento(s): ` +
    cortes.slice(1).map((c, i) => `${c - cortes[i]}`).join(' + '));
}

fs.rmSync(TMP, { recursive: true, force: true });
fs.writeFileSync(path.join(OUT, 'plan-capturas.json'), JSON.stringify(plan, null, 2));
console.log('plan escrito en ' + path.join(OUT, 'plan-capturas.json'));
