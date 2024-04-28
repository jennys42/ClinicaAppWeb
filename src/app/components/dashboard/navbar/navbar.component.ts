import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  cerrarSesion() {
    const isLocalNombreUsuarioPresent = localStorage.getItem("nombreUsuario");
    const isLocalTokenPresent = localStorage.getItem("token");
    if (isLocalNombreUsuarioPresent != null && isLocalTokenPresent != null) {
      const localNombreUsuario = JSON.parse(isLocalNombreUsuarioPresent);
      const userLog = localNombreUsuario.find((user: string) => user);
      console.log(userLog);
      localStorage.removeItem("nombreUsuario");


      const localTokenPresent = JSON.parse(isLocalNombreUsuarioPresent);
      const tokenLog = localTokenPresent.find((token: string) => token);
      console.log(tokenLog);
      localStorage.removeItem("token");



      this.router.navigate(['/inicio']);
    }
  }
}
