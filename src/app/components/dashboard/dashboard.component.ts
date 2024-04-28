import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  nombreUsuario!: string | null;

  ngOnInit(): void {
    this.getNombreUsuario();
  }

  getNombreUsuario() {
    const isLocalPresent = localStorage.getItem("nombreUsuario");
    if (isLocalPresent != null) {
      const localNombreUsuario = JSON.parse(isLocalPresent);
      this.nombreUsuario = localNombreUsuario.find((user: string) => user);
      console.log(this.nombreUsuario);
    }
  }
}
