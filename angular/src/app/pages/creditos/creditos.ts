import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia';

/**
 * Atribución de las fotografías.
 *
 * Las licencias CC BY y CC BY-SA exigen nombrar autor, licencia y origen. La
 * información viaja dentro de cada noticia, en el campo «credito», de modo que
 * nunca pueda desincronizarse de la imagen a la que pertenece.
 */
@Component({
  selector: 'app-creditos',
  imports: [RouterLink],
  templateUrl: './creditos.html',
})
export class CreditosComponent {
  private readonly noticiasSrv = inject(NoticiasService);

  readonly noticias = signal<Noticia[]>([]);

  constructor() {
    this.noticiasSrv.cargar().subscribe((lista) => this.noticias.set(lista));
  }
}
