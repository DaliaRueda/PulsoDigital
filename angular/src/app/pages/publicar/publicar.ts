import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card';
import { FechaEsPipe } from '../../pipes/fecha-es.pipe';
import { Noticia, CATEGORIAS } from '../../models/noticia';

/**
 * Alta y baja de noticias: el mini CRUD que pide la característica 6 del
 * enunciado.
 *
 * El formulario usa enlace en dos sentidos con [(ngModel)], de modo que la
 * vista previa de la derecha se actualiza mientras se escribe sin código que
 * la refresque a mano.
 *
 * Eliminar funciona distinto según el origen de la noticia. Las creadas por el
 * usuario se borran; las del archivo JSON no se pueden tocar desde el
 * navegador, así que su identificador se registra como oculto y se descuenta
 * al construir el listado. De ahí que exista «Restaurar noticias base».
 */
@Component({
  selector: 'app-publicar',
  imports: [FormsModule, NoticiaCardComponent, FechaEsPipe],
  templateUrl: './publicar.html',
})
export class PublicarComponent {
  private readonly noticiasSrv = inject(NoticiasService);
  private readonly favoritosSrv = inject(FavoritosService);

  readonly categorias = CATEGORIAS;
  readonly catalogo = signal<Noticia[]>([]);
  readonly cargando = signal(true);
  readonly aviso = signal('');
  readonly intentado = signal(false);
  readonly porBorrar = signal<Noticia | undefined>(undefined);

  /** Campos del formulario, enlazados en dos sentidos con la plantilla. */
  titulo = '';
  categoria = '';
  autor = '';
  resumen = '';
  contenido = '';
  imagen = '';
  destacada = false;

  constructor() {
    this.recargar();
  }

  /* ------------------------------------------------------------ Validación */

  /** Devuelve el mensaje de error de un campo, o cadena vacía si es válido. */
  error(campo: string): string {
    switch (campo) {
      case 'titulo':
        if (!this.titulo.trim()) return 'El título es obligatorio.';
        if (this.titulo.trim().length < 10) return 'Escribe al menos 10 caracteres.';
        return '';
      case 'categoria':
        return this.categoria ? '' : 'Elige una categoría.';
      case 'autor':
        if (!this.autor.trim()) return 'El autor es obligatorio.';
        if (this.autor.trim().length < 3) return 'Escribe al menos 3 caracteres.';
        return '';
      case 'resumen':
        if (!this.resumen.trim()) return 'La descripción breve es obligatoria.';
        if (this.resumen.trim().length < 20) return 'Escribe al menos 20 caracteres.';
        return '';
      case 'contenido':
        if (!this.contenido.trim()) return 'El contenido es obligatorio.';
        if (this.contenido.trim().length < 200) {
          return `Faltan ${200 - this.contenido.trim().length} caracteres para llegar al mínimo de 200.`;
        }
        return '';
      case 'imagen':
        // Opcional: sin imagen se usa un marcador. Si se escribe, se valida.
        if (!this.imagen.trim()) return '';
        return /\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i.test(this.imagen.trim())
          ? ''
          : 'Indica una ruta o dirección que termine en .jpg, .png o .webp';
      default:
        return '';
    }
  }

  readonly campos = ['titulo', 'categoria', 'autor', 'resumen', 'contenido', 'imagen'];

  get valido(): boolean {
    return this.campos.every((c) => !this.error(c));
  }

  /* --------------------------------------------------------- Vista previa */

  /** Noticia construida con lo que hay escrito ahora mismo. */
  get borrador(): Noticia {
    return {
      id: 'vista-previa',
      titulo: this.titulo.trim() || 'Titular de la noticia',
      resumen: this.resumen.trim() || 'La descripción breve aparecerá aquí.',
      contenido: this.contenido,
      categoria: this.categoria || 'Categoría',
      autor: this.autor.trim() || 'Autor',
      fecha: this.hoy(),
      imagen: this.imagen.trim() || undefined,
      destacada: this.destacada,
      tiempoLectura: this.tiempoLectura(),
    };
  }

  /** Estima el tiempo de lectura a 200 palabras por minuto, mínimo 1. */
  private tiempoLectura(): number {
    const palabras = this.contenido.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / 200));
  }

  private hoy(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  /* ---------------------------------------------------------------- Alta */

  publicar(): void {
    this.intentado.set(true);
    if (!this.valido) {
      this.mostrarAviso('Revisa los campos marcados en rojo');
      return;
    }

    const noticia: Noticia = { ...this.borrador, id: this.favoritosSrv.siguienteId() };
    if (!this.favoritosSrv.agregarNoticia(noticia)) {
      this.mostrarAviso('No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado');
      return;
    }

    this.limpiar();
    this.recargar();
    this.mostrarAviso('Noticia publicada. Ya aparece en el listado.');
  }

  limpiar(): void {
    this.titulo = '';
    this.categoria = '';
    this.autor = '';
    this.resumen = '';
    this.contenido = '';
    this.imagen = '';
    this.destacada = false;
    this.intentado.set(false);
  }

  /* -------------------------------------------------------------- Baja */

  confirmarBorrado(n: Noticia): void {
    this.porBorrar.set(n);
  }

  eliminar(): void {
    const n = this.porBorrar();
    if (!n) return;

    if (this.noticiasSrv.esCreada(n)) this.favoritosSrv.eliminarCreada(n.id);
    else this.favoritosSrv.marcarEliminada(n.id);

    // La noticia eliminada no debe quedar colgando en favoritos.
    this.favoritosSrv.quitar(n.id);

    this.porBorrar.set(undefined);
    this.recargar();
    this.mostrarAviso('Noticia eliminada');
  }

  restaurar(): void {
    this.favoritosSrv.restaurarBase();
    this.recargar();
    this.mostrarAviso('Noticias del archivo base restauradas');
  }

  get hayOcultas(): number {
    return this.favoritosSrv.eliminadas().length;
  }

  esCreada(n: Noticia): boolean {
    return this.noticiasSrv.esCreada(n);
  }

  /* ------------------------------------------------------------- Interno */

  private recargar(): void {
    this.noticiasSrv.cargar().subscribe((lista) => {
      this.catalogo.set(lista);
      this.cargando.set(false);
    });
  }

  private mostrarAviso(texto: string): void {
    this.aviso.set(texto);
    setTimeout(() => this.aviso.set(''), 3000);
  }
}
