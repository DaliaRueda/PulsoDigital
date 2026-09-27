/**
 * Estructura de una noticia. Espeja el archivo assets/data/noticias.json,
 * que sigue siendo el origen de los datos.
 */
export interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  autor: string;
  /** Fecha en formato ISO: AAAA-MM-DD */
  fecha: string;
  imagen?: string;
  destacada: boolean;
  tiempoLectura: number;
  fuente?: string;
  credito?: CreditoFoto;
}

/**
 * Atribución de la fotografía. Las licencias CC BY y CC BY-SA obligan a
 * nombrar autor, licencia y origen, así que el crédito viaja con la noticia
 * y no puede separarse de la imagen a la que pertenece.
 */
export interface CreditoFoto {
  titulo: string;
  autor: string;
  licencia: string;
  url: string;
  busqueda?: string;
}

/** Criterios con los que se puede ordenar el listado. */
export type Orden = 'recientes' | 'antiguas' | 'alfabetico';

export const CATEGORIAS: readonly string[] = [
  'Inteligencia Artificial',
  'Startups',
  'Software',
  'Hardware',
  'Ciberseguridad',
  'Innovación',
] as const;

export const POR_PAGINA = 6;
