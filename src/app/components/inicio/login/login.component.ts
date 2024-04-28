import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoginDTO } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private _usuarioService: UsuarioService,) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  ngOnInit(): void {

  }

  log() {
    const login: LoginDTO = {
      correo: this.login.get("usuario")?.value,
      password: this.login.get("password")?.value
    };

    this.loading = true;

    this._usuarioService.login(login).subscribe(result => {

      if (result.successful) {
        console.log(result);
        this.registarVariableSesion(result);
        this.toastr.success(result.mensaje, 'Exito');
        this.login.reset();
        this.loading = false;
        this.router.navigate(['/dashboard']);
      } else {
        this.loading = false;
        this.toastr.error(result.errors[0].msg, 'Operación fallida');
        this.login.reset();
      }
    }, error => {
      this.loading = false;
      this.toastr.error(error, 'Operación fallida');
      this.login.reset();
    });
  };


  registarVariableSesion(result: any) {
    const isLocalNombreUsuarioPresent = localStorage.getItem("nombreUsuario");
    const isLocalTokenPresent = localStorage.getItem("token");
    if (isLocalNombreUsuarioPresent != null && isLocalTokenPresent != null) {
      const oldArray = JSON.parse(isLocalNombreUsuarioPresent);
      oldArray.push(result.nombreUsuario);

      const oldArray1 = JSON.parse(isLocalTokenPresent);
      oldArray1.push(result.token);

    } else {
      const newArr = [];
      newArr.push(result.user.nombre_completo);
      localStorage.setItem("nombreUsuario", JSON.stringify(newArr));

      const newArr1 = [];
      newArr1.push(result.token);
      localStorage.setItem("token", JSON.stringify(newArr1));
    }

  }
}


