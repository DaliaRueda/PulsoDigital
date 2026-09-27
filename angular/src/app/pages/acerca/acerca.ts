import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página informativa: línea editorial, equipo, tecnologías y preguntas
 * frecuentes. Es estática, de modo que no necesita servicios.
 */
@Component({
  selector: 'app-acerca',
  imports: [RouterLink],
  templateUrl: './acerca.html',
})
export class AcercaComponent {
  readonly redaccion = [
    { nombre: 'Ana Rivera', area: 'Inteligencia artificial' },
    { nombre: 'Daniel Osorio', area: 'Startups y negocio' },
    { nombre: 'Sofía Cárdenas', area: 'Ciberseguridad' },
    { nombre: 'Marcela Peña', area: 'Software y hardware' },
    { nombre: 'Camilo Arboleda', area: 'Reportajes' },
    { nombre: 'Lucía Ferrer', area: 'Innovación y ciencia' },
  ];

  readonly tecnologias = [
    {
      titulo: 'Angular 21',
      texto: 'Componentes independientes, enrutador con carga diferida y señales para el estado ' +
             'de cada vista.',
    },
    {
      titulo: 'HTML y CSS',
      texto: 'Marcado semántico y una hoja de estilos propia con variables de diseño, montada ' +
             'sobre Bootstrap 5.3 para la rejilla y el menú.',
    },
    {
      titulo: 'JSON local',
      texto: 'El catálogo vive en un archivo JSON que se lee con HttpClient. Ninguna tarjeta ' +
             'está escrita a mano.',
    },
    {
      titulo: 'localStorage',
      texto: 'Los favoritos y las noticias que creas se guardan en tu navegador. No hay cuentas, ' +
             'no hay servidor y no se envía nada a ninguna parte.',
    },
  ];

  readonly preguntas = [
    {
      p: '¿Necesito una cuenta para guardar favoritos?',
      r: 'No. Tu lista se guarda en el propio navegador con localStorage. Eso significa que es ' +
         'privada, pero también que vive solo en ese dispositivo: si entras desde otro equipo, ' +
         'la lista aparecerá vacía.',
    },
    {
      p: 'Eliminé una noticia por error, ¿puedo recuperarla?',
      r: 'Si venía del archivo base, sí: en la vista de gestión, el botón «Restaurar noticias ' +
         'base» las devuelve todas. Las noticias que creaste tú se borran de forma definitiva.',
    },
    {
      p: '¿Qué pasa con el mensaje que envío por el formulario?',
      r: 'Este prototipo no tiene servidor, así que el mensaje queda registrado en tu propio ' +
         'navegador y no se envía a ninguna parte. La confirmación describe exactamente lo que ' +
         'ocurre.',
    },
  ];

  abierta = -1;

  alternar(i: number): void {
    this.abierta = this.abierta === i ? -1 : i;
  }
}
