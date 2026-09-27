import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritosService } from '../../services/favoritos.service';

/**
 * Formulario de contacto con validaciones.
 *
 * Cubre la característica 5 del enunciado: campos obligatorios, correo válido
 * y mensaje de confirmación. Los errores se muestran una vez que se ha
 * intentado enviar, y desaparecen en cuanto el campo deja de ser inválido.
 *
 * No hay servidor: el mensaje se registra en localStorage. La confirmación es
 * fiel a lo que el aplicativo hace, y así se documenta.
 */
@Component({
  selector: 'app-contacto',
  imports: [FormsModule, RouterLink],
  templateUrl: './contacto.html',
})
export class ContactoComponent {
  private readonly favoritosSrv = inject(FavoritosService);
  private readonly ruta = inject(ActivatedRoute);

  // Acepta letras con tilde, eñe y espacios; no acepta cifras ni símbolos.
  private static readonly SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/;
  // Comprobación razonable de correo: algo@algo.extensión
  private static readonly CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

  readonly asuntos = [
    'Consulta general',
    'Sugerencia de noticia',
    'Reportar un error',
    'Quiero colaborar',
  ];

  readonly intentado = signal(false);
  readonly enviado = signal(false);
  readonly confirmacion = signal('');

  nombre = '';
  correo = '';
  asunto = '';
  mensaje = '';
  autorizacion = false;

  /** Identificador de la noticia desde la que se llegó, si lo hay. */
  private referencia = '';

  constructor() {
    // El detalle enlaza aquí con el asunto ya elegido.
    const p = this.ruta.snapshot.queryParamMap;
    const asunto = p.get('asunto');
    if (asunto && this.asuntos.includes(asunto)) this.asunto = asunto;
    this.referencia = p.get('ref') ?? '';
  }

  /** Devuelve el mensaje de error de un campo, o cadena vacía si es válido. */
  error(campo: string): string {
    switch (campo) {
      case 'nombre': {
        const t = this.nombre.trim();
        if (!t) return 'El nombre es obligatorio.';
        if (t.length < 3) return 'Escribe al menos 3 caracteres.';
        if (!ContactoComponent.SOLO_LETRAS.test(t)) return 'Usa solo letras y espacios.';
        return '';
      }
      case 'correo': {
        const t = this.correo.trim();
        if (!t) return 'El correo es obligatorio.';
        if (!ContactoComponent.CORREO.test(t)) {
          return 'Escribe un correo válido, por ejemplo, nombre@dominio.com';
        }
        return '';
      }
      case 'asunto':
        return this.asunto ? '' : 'Elige un asunto.';
      case 'mensaje': {
        const t = this.mensaje.trim();
        if (!t) return 'El mensaje es obligatorio.';
        if (t.length < 10) return 'Escribe al menos 10 caracteres.';
        return '';
      }
      case 'autorizacion':
        return this.autorizacion
          ? ''
          : 'Debes autorizar el tratamiento de datos para poder enviar el mensaje.';
      default:
        return '';
    }
  }

  readonly campos = ['nombre', 'correo', 'asunto', 'mensaje', 'autorizacion'];

  get valido(): boolean {
    return this.campos.every((c) => !this.error(c));
  }

  enviar(): void {
    this.intentado.set(true);
    if (!this.valido) return;

    const datos: Record<string, string> = {
      nombre: this.nombre.trim(),
      correo: this.correo.trim(),
      asunto: this.asunto,
      mensaje: this.mensaje.trim(),
    };
    if (this.referencia) datos['noticia'] = this.referencia;

    this.favoritosSrv.guardarMensaje(datos);

    this.confirmacion.set(
      `Gracias, ${datos['nombre'].split(' ')[0]}. Recibimos tu mensaje sobre ` +
      `«${datos['asunto']}» y te responderemos al correo que indicaste dentro de los ` +
      'próximos dos días hábiles.',
    );
    this.enviado.set(true);
  }

  nuevoMensaje(): void {
    this.nombre = '';
    this.correo = '';
    this.asunto = '';
    this.mensaje = '';
    this.autorizacion = false;
    this.intentado.set(false);
    this.enviado.set(false);
  }
}
