// Mide la altura real del contenido de cada artboard renderizandolo en Chrome.
// Evita estimar a ojo las alturas de canvas.json: el unico fallo real de un
// artboard es que el contenido se corte por abajo.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PROFILE = path.join(process.env.SCRATCH, 'cprofile');
const IN = 'render', TMP = '.measure';
fs.mkdirSync(TMP, { recursive: true });

const rows = [];
for (const f of fs.readdirSync(IN).filter((f) => f.endsWith('.html')).sort()) {
  const probe = path.join(TMP, f);
  fs.writeFileSync(probe, fs.readFileSync(path.join(IN, f), 'utf8') +
    '\n<script>document.title="H="+document.documentElement.scrollHeight;</script>');
  const url = pathToFileURL(path.resolve(probe)).href;
  const dom = execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-sandbox',
    `--user-data-dir=${PROFILE}`, '--window-size=1440,900', '--virtual-time-budget=5000',
    '--dump-dom', url], { encoding: 'utf8', maxBuffer: 1 << 28 });
  const m = dom.match(/<title>H=(\d+)<\/title>/);
  rows.push([f.replace('.html', ''), m ? Number(m[1]) : null]);
}
fs.rmSync(TMP, { recursive: true, force: true });

const canvas = JSON.parse(fs.readFileSync('src/canvas.json', 'utf8'));
const set = Object.fromEntries(canvas.artboards.map((a) => [a.file.replace('.dc.html', ''), a.h]));
console.log('artboard'.padEnd(14), 'contenido', ' h actual', ' margen');
for (const [name, h] of rows) {
  const cur = set[name];
  const margin = cur == null ? null : cur - h;
  const flag = margin == null ? 'SIN DEFINIR' : margin < 0 ? '*** SE CORTA ***' : margin < 80 ? '! justo' : 'ok';
  console.log(name.padEnd(14), String(h).padStart(9), String(cur ?? '-').padStart(9), String(margin ?? '-').padStart(7), flag);
}
