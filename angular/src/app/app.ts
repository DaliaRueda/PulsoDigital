import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

/**
 * Raíz de la aplicación. La cabecera y el pie se montan una sola vez y
 * permanecen; solo cambia lo que hay entre ambos, según la ruta.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {}
