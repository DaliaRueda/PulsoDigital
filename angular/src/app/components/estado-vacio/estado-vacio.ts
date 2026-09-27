import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Bloque que se muestra cuando una lista queda sin elementos: búsqueda sin
 * resultados o lista de favoritos vacía.
 *
 * Recibe todo por «property binding» y no conoce el contexto en el que se usa,
 * de modo que sirve igual en el listado y en favoritos.
 */
@Component({
  selector: 'app-estado-vacio',
  imports: [RouterLink],
  templateUrl: './estado-vacio.html',
})
export class EstadoVacioComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) texto!: string;
  /** Texto del botón. Si no se indica, no se muestra botón. */
  @Input() botonTexto?: string;
  /** Ruta a la que lleva el botón. Si no se indica, el botón emite un evento. */
  @Input() botonRuta?: string;
}
