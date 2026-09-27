// Convierte los artboards a HTML autonomo (render/) para verlos y capturarlos
// en un navegador normal. Solo retira la envoltura del canvas: el contenido de
// los artboards es HTML estatico puro, sin sintaxis de plantilla.
import fs from 'node:fs';
import path from 'node:path';

const IN = 'build', OUT = 'render';
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(IN).filter((f) => f.endsWith('.dc.html'))) {
  const html = fs.readFileSync(path.join(IN, f), 'utf8')
    .replace('<script src="./support.js"></script>', '')
    .replace('<x-dc>', '').replace('</x-dc>', '')
    .replace('<helmet>', '').replace('</helmet>', '');
  const name = f.replace('.dc.html', '.html');
  fs.writeFileSync(path.join(OUT, name), html);
  console.log(name);
}
