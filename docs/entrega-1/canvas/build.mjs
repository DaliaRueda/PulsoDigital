// Ensambla los artboards: sustituye los marcadores por las hojas compartidas
// y escribe build/*.dc.html a partir de src/*.src.dc.html.
//
//   /*@FONTS@*/       tipografias de marca (Space Grotesk + IBM Plex Sans)
//   /*@BASE@*/        sistema de diseno de Pulso Digital
//   /*@FONTS-WIRE@*/  tipografia manuscrita (Architects Daughter)
//   /*@WIRE@*/        estilos de wireframe de baja fidelidad
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'src', OUT = 'build';
const parts = {
  '/*@FONTS@*/': '_fonts.css',
  '/*@BASE@*/': '_base.css',
  '/*@FONTS-WIRE@*/': '_fonts-wire.css',
  '/*@WIRE@*/': '_wire.css',
};
// Las hojas de wireframe son opcionales: solo existen si hay artboards que las usen.
const css = Object.fromEntries(
  Object.entries(parts)
    .filter(([, file]) => fs.existsSync(path.join(SRC, file)))
    .map(([marker, file]) => [marker, fs.readFileSync(path.join(SRC, file), 'utf8')]),
);

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.src.dc.html'))) {
  let out = fs.readFileSync(path.join(SRC, f), 'utf8');
  for (const [marker, text] of Object.entries(css)) out = out.replace(marker, text);
  const leftover = out.match(/\/\*@[A-Z-]+@\*\//);
  if (leftover) throw new Error(`${f}: marcador sin resolver ${leftover[0]}`);
  const name = f.replace('.src.dc.html', '.dc.html');
  fs.writeFileSync(path.join(OUT, name), out);
  console.log(`${name.padEnd(24)} ${(Buffer.byteLength(out) / 1024).toFixed(0)} KB`);
  n++;
}
fs.copyFileSync(path.join(SRC, 'canvas.json'), path.join(OUT, 'canvas.json'));
console.log(`${n} artboards + canvas.json -> ${OUT}/`);
