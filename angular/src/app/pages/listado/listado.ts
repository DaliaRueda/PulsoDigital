import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card';
import { Noticia, Orden, CATEGORIAS } from '../../models/noticia';

/**
 * Listado del archivo con búsqueda, filtro por categoría, orden y paginación.
 *
 * El estado son cuatro señales; la lista visible se deriva de ellas mediante
 * señales calculadas, de modo que no hay que repintar a mano: cambiar
 * cualquier criterio actualiza la vista.
 */
@Component({
  selector: 'app-listado',
  imports: [FormsModule, NoticiaCardComponent],
  templateUrl: './listado.html',
})
export class ListadoComponent {
  private readonly noticiasSrv = inject(NoticiasService);
  private readonly favoritosSrv = inject(FavoritosService);
  private readonly ruta = inject(ActivatedRoute);

  readonly categorias = ['Todas', ...CATEGORIAS];
  readonly cargando = signal(true);

  private readonly catalogo = signal<Noticia[]>([]);

  readonly texto = signal('');
  readonly categoria = signal('Todas');
  readonly orden = signal<Orden>('recientes');
  readonly pagina = signal(1);

  /** Resultado de aplicar los tres criterios, antes de paginar. */
  readonly resultado = computed(() =>
    this.noticiasSrv.ordenar(
      this.noticiasSrv.filtrar(this.catalogo(), this.texto(), this.categoria()),
      this.orden(),
    ),
  );

  readonly totalPaginas = computed(() => this.noticiasSrv.totalPaginas(this.resultado().length));
  readonly visibles = computed(() => this.noticiasSrv.paginar(this.resultado(), this.pagina()));
  readonly paginas = computed(() =>
    Array.from({ length: this.totalPaginas() }, (_, i) => i + 1),
  );

  constructor() {
    // El buscador de la cabecera y los enlaces del pie llegan con parámetros.
    const p = this.ruta.snapshot.queryParamMap;
    const q = p.get('q');
    const cat = p.get('categoria');
    if (q) this.texto.set(q);
    if (cat && CATEGORIAS.includes(cat)) this.categoria.set(cat);

    this.noticiasSrv.cargar().subscribe((lista) => {
      this.catalogo.set(lista);
      this.cargando.set(false);
    });
  }

  /* Cualquier cambio de criterio devuelve a la página 1: seguir en la página
     tres de un resultado nuevo desorienta. */

  cambiarTexto(valor: string): void {
    this.texto.set(valor);
    this.pagina.set(1);
  }

  cambiarCategoria(valor: string): void {
    this.categoria.set(valor);
    this.pagina.set(1);
  }

  cambiarOrden(valor: string): void {
    this.orden.set(valor as Orden);
    this.pagina.set(1);
  }

  irAPagina(n: number): void {
    this.pagina.set(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  limpiarFiltros(): void {
    this.texto.set('');
    this.categoria.set('Todas');
    this.pagina.set(1);
  }

  esFavorito(id: string): boolean {
    return this.favoritosSrv.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosSrv.alternar(id);
  }
}
