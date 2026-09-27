import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { EstadoVacioComponent } from '../../components/estado-vacio/estado-vacio';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';
import { Noticia } from '../../models/noticia';

/**
 * Lista personal del usuario.
 *
 * Cruza los identificadores guardados con el catálogo. Un identificador puede
 * quedar huérfano si la noticia se eliminó desde la vista de gestión: en ese
 * caso se descarta en silencio.
 *
 * La disposición es horizontal a propósito, para que se distinga del catálogo
 * y comunique que es una selección propia.
 */
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, EstadoVacioComponent, FechaEsPipe],
  templateUrl: './favoritos.html',
})
export class FavoritosComponent {
  private readonly noticiasSrv = inject(NoticiasService);
  private readonly favoritosSrv = inject(FavoritosService);

  private readonly catalogo = signal<Noticia[]>([]);
  readonly cargando = signal(true);
  readonly confirmandoVaciado = signal(false);

  /** Se recalcula sola cuando cambian los favoritos o el catálogo. */
  readonly guardadas = computed(() => {
    const ids = this.favoritosSrv.favoritos();
    return ids
      .map((id) => this.catalogo().find((n) => n.id === id))
      .filter((n): n is Noticia => !!n);
  });

  constructor() {
    this.noticiasSrv.cargar().subscribe((lista) => {
      this.catalogo.set(lista);
      this.cargando.set(false);
    });
  }

  quitar(id: string): void {
    this.favoritosSrv.quitar(id);
  }

  vaciar(): void {
    this.favoritosSrv.vaciar();
    this.confirmandoVaciado.set(false);
  }
}
