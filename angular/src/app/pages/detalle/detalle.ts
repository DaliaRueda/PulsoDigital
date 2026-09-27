import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';
import { Noticia } from '../../models/noticia';

/**
 * Detalle de una noticia. Recibe el identificador por la ruta
 * (/noticias/n-001) y conecta las dos acciones que pide la característica 2
 * del enunciado: añadir a favoritos y contactar a la redacción.
 */
@Component({
  selector: 'app-detalle',
  imports: [RouterLink, NoticiaCardComponent, FechaEsPipe],
  templateUrl: './detalle.html',
})
export class DetalleComponent {
  private readonly noticiasSrv = inject(NoticiasService);
  private readonly favoritosSrv = inject(FavoritosService);
  private readonly ruta = inject(ActivatedRoute);

  readonly noticia = signal<Noticia | undefined>(undefined);
  readonly relacionadas = signal<Noticia[]>([]);
  readonly cargando = signal(true);

  /** Señal derivada: el botón cambia de texto y de aspecto con ella. */
  readonly esFavorita = computed(() => {
    const n = this.noticia();
    return n ? this.favoritosSrv.favoritos().includes(n.id) : false;
  });

  constructor() {
    // paramMap es un observable: si se navega de una noticia a otra sin salir
    // del componente, se vuelve a cargar sin recrearlo.
    this.ruta.paramMap.subscribe((p) => {
      const id = p.get('id');
      this.cargando.set(true);
      this.noticiasSrv.cargar().subscribe((lista) => {
        const n = lista.find((x) => x.id === id);
        this.noticia.set(n);
        this.relacionadas.set(n ? this.noticiasSrv.relacionadas(lista, n, 3) : []);
        this.cargando.set(false);
      });
    });
  }

  /** Divide el contenido en párrafos por las líneas en blanco. */
  parrafos(): string[] {
    const texto = this.noticia()?.contenido ?? '';
    return texto.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  }

  esCreada(): boolean {
    const n = this.noticia();
    return n ? this.noticiasSrv.esCreada(n) : false;
  }

  alternarFavorito(): void {
    const n = this.noticia();
    if (n) this.favoritosSrv.alternar(n.id);
  }

  alternarRelacionada(id: string): void {
    this.favoritosSrv.alternar(id);
  }

  esFavorito(id: string): boolean {
    return this.favoritosSrv.esFavorito(id);
  }
}
