import { Injectable, signal, computed } from '@angular/core';
import { Noticia } from '../models/noticia';

/**
 * Única capa que accede a localStorage.
 *
 * Es la traducción del módulo storage.js de la Entrega 2. Ningún componente
 * lee una clave directamente: si cambiara el mecanismo de persistencia, solo
 * cambiaría este archivo.
 *
 * El recuento de favoritos se expone como señal, de modo que la cabecera se
 * actualiza sola cuando cualquier componente guarda o quita una noticia.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private static readonly CLAVES = {
    favoritos: 'pd_favoritos',
    creadas: 'pd_noticias_creadas',
    eliminadas: 'pd_noticias_eliminadas',
    mensajes: 'pd_mensajes_contacto',
  };

  /**
   * localStorage puede no estar disponible: navegación privada, cookies
   * bloqueadas o cuota agotada. En ese caso se trabaja contra memoria para que
   * la interfaz siga funcionando durante la sesión.
   */
  private readonly disponible = this.comprobarDisponibilidad();
  private readonly memoria = new Map<string, string>();

  /** Identificadores guardados. Es la fuente de la que derivan las demás. */
  private readonly ids = signal<string[]>(this.leer(FavoritosService.CLAVES.favoritos, []));

  /** Cuántas noticias hay guardadas. La cabecera se suscribe a esto. */
  readonly cuantos = computed(() => this.ids().length);

  /** Lista de identificadores, de solo lectura para quien la consulte. */
  readonly favoritos = this.ids.asReadonly();

  constructor() {
    // Dos pestañas abiertas se mantienen sincronizadas.
    window.addEventListener('storage', (e) => {
      if (e.key === FavoritosService.CLAVES.favoritos) {
        this.ids.set(this.leer(FavoritosService.CLAVES.favoritos, []));
      }
    });
  }

  /* --------------------------------------------------------------- Favoritos */

  esFavorito(id: string): boolean {
    return this.ids().includes(id);
  }

  /**
   * Añade o quita una noticia de favoritos.
   * @returns true si quedó guardada
   */
  alternar(id: string): boolean {
    const lista = [...this.ids()];
    const i = lista.indexOf(id);
    if (i === -1) {
      lista.push(id);
    } else {
      lista.splice(i, 1);
    }
    this.guardarIds(lista);
    return i === -1;
  }

  quitar(id: string): void {
    this.guardarIds(this.ids().filter((x) => x !== id));
  }

  vaciar(): void {
    this.guardarIds([]);
  }

  private guardarIds(lista: string[]): void {
    this.escribir(FavoritosService.CLAVES.favoritos, lista);
    this.ids.set(lista);
  }

  /* ------------------------------------------------- Noticias del usuario */

  creadas(): Noticia[] {
    return this.leer<Noticia[]>(FavoritosService.CLAVES.creadas, []);
  }

  agregarNoticia(noticia: Noticia): boolean {
    return this.escribir(FavoritosService.CLAVES.creadas, [...this.creadas(), noticia]);
  }

  eliminarCreada(id: string): boolean {
    return this.escribir(
      FavoritosService.CLAVES.creadas,
      this.creadas().filter((n) => n.id !== id),
    );
  }

  /** Siguiente identificador libre, con prefijo propio para no chocar con el archivo base. */
  siguienteId(): string {
    const numeros = this.creadas()
      .map((n) => parseInt(String(n.id).replace(/\D/g, ''), 10))
      .filter((n) => !isNaN(n));
    const max = numeros.length ? Math.max(...numeros) : 0;
    return 'u-' + String(max + 1).padStart(3, '0');
  }

  /* ----------------------------------------------- Ocultar noticias base */
  /* El navegador no puede escribir en noticias.json, así que «eliminar» una
     noticia del archivo base consiste en registrar su identificador aquí y
     descontarlo al construir el listado. Es reversible. */

  eliminadas(): string[] {
    return this.leer<string[]>(FavoritosService.CLAVES.eliminadas, []);
  }

  marcarEliminada(id: string): boolean {
    const lista = this.eliminadas();
    if (!lista.includes(id)) {
      lista.push(id);
    }
    return this.escribir(FavoritosService.CLAVES.eliminadas, lista);
  }

  restaurarBase(): boolean {
    return this.escribir(FavoritosService.CLAVES.eliminadas, []);
  }

  /* ------------------------------------------------------------- Contacto */

  guardarMensaje(mensaje: Record<string, string>): boolean {
    const lista = this.leer<Record<string, string>[]>(FavoritosService.CLAVES.mensajes, []);
    lista.push({ ...mensaje, enviadoEn: new Date().toISOString() });
    return this.escribir(FavoritosService.CLAVES.mensajes, lista);
  }

  mensajes(): Record<string, string>[] {
    return this.leer<Record<string, string>[]>(FavoritosService.CLAVES.mensajes, []);
  }

  /* ------------------------------------------------------------ Interno */

  private comprobarDisponibilidad(): boolean {
    try {
      const prueba = '__pd__';
      localStorage.setItem(prueba, '1');
      localStorage.removeItem(prueba);
      return true;
    } catch {
      return false;
    }
  }

  private leer<T>(clave: string, porDefecto: T): T {
    try {
      const bruto = this.disponible ? localStorage.getItem(clave) : this.memoria.get(clave);
      if (bruto === null || bruto === undefined) return porDefecto;
      return JSON.parse(bruto) as T;
    } catch {
      // Un valor corrupto no debe tumbar la aplicación: se descarta.
      return porDefecto;
    }
  }

  private escribir(clave: string, valor: unknown): boolean {
    try {
      const bruto = JSON.stringify(valor);
      if (this.disponible) localStorage.setItem(clave, bruto);
      else this.memoria.set(clave, bruto);
      return true;
    } catch {
      return false;
    }
  }
}
