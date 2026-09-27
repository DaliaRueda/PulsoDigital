import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS } from '../../models/noticia';

/**
 * Pie común: descripción del medio, enlaces rápidos, categorías y datos de
 * contacto. Mantiene la información de contacto visible en todas las vistas,
 * que es uno de los requisitos del enunciado.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly categorias = CATEGORIAS;

  readonly secciones = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Noticias', ruta: '/noticias' },
    { texto: 'Favoritos', ruta: '/favoritos' },
    { texto: 'Publicar', ruta: '/publicar' },
    { texto: 'Contacto', ruta: '/contacto' },
    { texto: 'Acerca de', ruta: '/acerca' },
  ];

  readonly contacto = {
    correo: 'redaccion@pulsodigital.co',
    telefono: '+57 601 000 0000',
    lugar: 'Bogotá D.\u00A0C., Colombia',
    horario: 'Lunes a viernes, 8:00 a.\u00A0m. – 6:00 p.\u00A0m.',
  };
}
