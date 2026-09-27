import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritosService } from '../../services/favoritos.service';
import { CATEGORIAS } from '../../models/noticia';

/**
 * Cabecera común: franja de fecha, marca, buscador, acceso a favoritos y
 * barra de navegación.
 *
 * En la Entrega 2 esto era una función de ui.js que devolvía una cadena de
 * HTML; aquí es un componente. Se monta una sola vez en la raíz y se muestra
 * en todas las rutas.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly favoritosSrv = inject(FavoritosService);

  /** Señal con el número de favoritos: la vista se actualiza sola al cambiar. */
  readonly cuantosFavoritos = this.favoritosSrv.cuantos;

  /** Enlazado en dos sentidos con el campo de búsqueda. */
  termino = '';

  readonly paginas = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Noticias', ruta: '/noticias' },
    { texto: 'Favoritos', ruta: '/favoritos' },
    { texto: 'Publicar', ruta: '/publicar' },
    { texto: 'Contacto', ruta: '/contacto' },
    { texto: 'Acerca de', ruta: '/acerca' },
  ];

  readonly categorias = CATEGORIAS;

  /** Fecha de hoy, con la inicial en mayúscula. */
  get fechaDeHoy(): string {
    const t = new Date().toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  /** El buscador de la cabecera lleva al listado con el término aplicado. */
  buscar(): void {
    const q = this.termino.trim();
    this.router.navigate(['/noticias'], q ? { queryParams: { q } } : {});
  }
}
