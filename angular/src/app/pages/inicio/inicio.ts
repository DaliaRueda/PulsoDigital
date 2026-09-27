import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';
import { Noticia } from '../../models/noticia';

/**
 * Página de inicio: bienvenida, noticia de portada, tres destacadas, llamado
 * a la acción y sección informativa.
 *
 * Ninguna tarjeta está escrita en la plantilla: todas se generan a partir del
 * catálogo, igual que en la Entrega 2.
 */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NoticiaCardComponent, FechaEsPipe],
  templateUrl: './inicio.html',
})
export class InicioComponent {
  private readonly noticiasSrv = inject(NoticiasService);
  private readonly favoritosSrv = inject(FavoritosService);

  private readonly catalogo = signal<Noticia[]>([]);
  readonly cargando = signal(true);

  /** Si aún no hay ninguna marcada como destacada, se usan las más recientes. */
  private readonly fuente = computed(() => {
    const marcadas = this.noticiasSrv.destacadas(this.catalogo());
    return marcadas.length ? marcadas : this.catalogo();
  });

  readonly portada = computed(() => this.fuente()[0]);
  readonly destacadas = computed(() => this.fuente().slice(1, 4));

  constructor() {
    this.noticiasSrv.cargar().subscribe((lista) => {
      this.catalogo.set(lista);
      this.cargando.set(false);
    });
  }

  esFavorito(id: string): boolean {
    return this.favoritosSrv.esFavorito(id);
  }

  /** Recibe el evento que emite la tarjeta y decide qué hacer con él. */
  alternarFavorito(id: string): void {
    this.favoritosSrv.alternar(id);
  }
}
