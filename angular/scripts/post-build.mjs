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
