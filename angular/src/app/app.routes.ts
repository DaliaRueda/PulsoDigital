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
