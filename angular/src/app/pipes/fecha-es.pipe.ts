import { Pipe, PipeTransform } from '@angular/core';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * Da formato a una fecha ISO (AAAA-MM-DD) en español.
 *
 * Se parte la cadena en lugar de usar «new Date()»: ese constructor la
 * interpreta como UTC y en Colombia, que va cinco horas por detrás,
 * devolvería el día anterior.
 *
 * Formatos:
 *   'tarjeta' → 12 sep
 *   'corto'   → 12 sep 2026        (por omisión)
 *   'largo'   → 12 de septiembre de 2026
 */
@Pipe({ name: 'fechaEs' })
export class FechaEsPipe implements PipeTransform {
  transform(iso: string | undefined, formato: 'tarjeta' | 'corto' | 'largo' = 'corto'): string {
    const p = String(iso ?? '').split('-');
    if (p.length !== 3) return '';

    const dia = parseInt(p[2], 10);
    const mes = parseInt(p[1], 10) - 1;
    if (isNaN(dia) || isNaN(mes) || mes < 0 || mes > 11) return '';

    if (formato === 'largo') return `${dia} de ${MESES[mes]} de ${p[0]}`;
    if (formato === 'tarjeta') return `${dia} ${MESES_CORTOS[mes]}`;
    return `${dia} ${MESES_CORTOS[mes]} ${p[0]}`;
  }
}
