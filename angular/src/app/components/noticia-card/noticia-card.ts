import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';

/**
 * Tarjeta de noticia. Es el mismo componente en el inicio, en el listado y en
 * las noticias relacionadas del detalle.
 *
 * Reúne los cuatro tipos de enlace que pide la guía:
 *   - interpolación:      {{ noticia.titulo }}
 *   - property binding:   [src]="noticia.imagen"
 *   - event binding:      (click)="alternarFavorito()"
 *   - enlace de entrada y salida: @Input y @Output
 *
 * No toca el almacenamiento: avisa al componente que lo contiene y es este
 * quien decide qué hacer. Así la tarjeta sirve en cualquier contexto.
 */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink, FechaEsPipe],
  templateUrl: './noticia-card.html',
})
export class NoticiaCardComponent {
  /** Noticia que se muestra. */
  @Input({ required: true }) noticia!: Noticia;

  /** Si está guardada en favoritos. Lo decide quien usa la tarjeta. */
  @Input() favorito = false;

  /** Se emite con el identificador cuando se pulsa el corazón. */
  @Output() alternar = new EventEmitter<string>();

  alternarFavorito(): void {
    this.alternar.emit(this.noticia.id);
  }

  /** Sustituye por un marcador la imagen cuya ruta no exista. */
  imagenRota(evento: Event): void {
    (evento.target as HTMLImageElement).style.display = 'none';
  }
}
