import { Component, OnInit } from '@angular/core';
import { RolDTO } from '../../../models/rol';
import { UsuarioService } from '../../../services/usuario.service';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule,
    TableModule, DropdownModule, ButtonModule, //Prime
    LoadingComponent, //Components
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  loading: boolean = false;
  listMaRoles: RolDTO[] = [];

  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerRol();
  }

  obtenerRol() {
    this.loading = true;
    this._usuarioService.getRoles().subscribe(result => {
      if (result.successful) {
        this.listMaRoles = result.data;
      } else {
        this.toastr.error(result.errors[0].msg, 'Error');
      }
    }, error => {
      console.error(error);
    }, () => {
      this.loading = false;
    });
  }
}