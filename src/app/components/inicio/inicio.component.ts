import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../dashboard/navbar/navbar.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BienvenidoComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
