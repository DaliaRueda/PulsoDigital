import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, of, catchError } from 'rxjs';
import { Noticia, Orden, POR_PAGINA } from '../models/noticia';
import { FavoritosService } from './favoritos.service';

/**
 * Origen de datos del catálogo.
 *
 * Es la traducción del módulo data.js de la Entrega 2. El catálogo que ve el
 * usuario se calcula igual que allí:
 *
 *     noticias.json  −  las marcadas como eliminadas  +  las creadas
 *
 * A diferencia de la versión anterior no hace falta copia de respaldo: la
 * aplicación se sirve siempre por HTTP, nunca abriendo un archivo con doble
 * clic, de modo que la petición nunca queda bloqueada por el origen opaco del
 * protocolo file://.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private static readonly RUTA = 'assets/data/noticias.json';

  private readonly http = inject(HttpClient);
  private readonly favoritos = inject(FavoritosService);

  /** El archivo base se pide una sola vez y se comparte entre suscriptores. */
  private readonly base$: Observable<Noticia[]> = this.http
    .get<Noticia[]>(NoticiasService.RUTA)
    .pipe(
      catchError(() => of([] as Noticia[])),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  /** Catálogo completo y ordenado que debe ver el usuario. */
  cargar(): Observable<Noticia[]> {
    return this.base$.pipe(
      map((base) => {
        const ocultas = this.favoritos.eliminadas();
        const visibles = base.filter((n) => !ocultas.includes(n.id));
        return this.ordenar([...visibles, ...this.favoritos.creadas()], 'recientes');
      }),
    );
  }

  /** Busca una noticia por su identificador. */
  porId(id: string): Observable<Noticia | undefined> {
    return this.cargar().pipe(map((lista) => lista.find((n) => n.id === id)));
  }

  /* ------------------------------------------------------------ Consultas */

  /** Quita acentos y pasa a minúsculas, para buscar sin distinguirlos. */
  private normalizar(texto: string): string {
    return (texto ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  /**
   * Filtra por texto libre y por categoría. Ambos criterios se combinan.
   * La búsqueda mira título y contenido, como indica la maquetación.
   */
  filtrar(lista: Noticia[], texto: string, categoria: string): Noticia[] {
    const busqueda = this.normalizar(texto).trim();
    const cat = categoria && categoria !== 'Todas' ? categoria : null;

    return lista.filter((n) => {
      if (cat && n.categoria !== cat) return false;
      if (!busqueda) return true;
      return this.normalizar(`${n.titulo} ${n.resumen} ${n.contenido}`).includes(busqueda);
    });
  }

  /** Ordena sin modificar el arreglo recibido. */
  ordenar(lista: Noticia[], criterio: Orden): Noticia[] {
    const copia = [...lista];
    if (criterio === 'antiguas') {
      copia.sort((a, b) => a.fecha.localeCompare(b.fecha));
    } else if (criterio === 'alfabetico') {
      copia.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
    } else {
      copia.sort((a, b) => b.fecha.localeCompare(a.fecha));
    }
    return copia;
  }

  /** Las destacadas alimentan la portada y las tarjetas del inicio. */
  destacadas(lista: Noticia[]): Noticia[] {
    return lista.filter((n) => n.destacada === true);
  }

  /** Noticias de la misma categoría, excluyendo la que se está leyendo. */
  relacionadas(lista: Noticia[], noticia: Noticia, cuantas = 3): Noticia[] {
    return lista
      .filter((n) => n.categoria === noticia.categoria && n.id !== noticia.id)
      .slice(0, cuantas);
  }

  paginar(lista: Noticia[], pagina: number, porPagina = POR_PAGINA): Noticia[] {
    const inicio = (Math.max(1, pagina) - 1) * porPagina;
    return lista.slice(inicio, inicio + porPagina);
  }

  totalPaginas(total: number, porPagina = POR_PAGINA): number {
    return Math.max(1, Math.ceil(total / porPagina));
  }

  /** Indica si una noticia la creó el usuario o viene del archivo base. */
  esCreada(noticia: Noticia): boolean {
    return String(noticia.id).charAt(0) === 'u';
  }
}
