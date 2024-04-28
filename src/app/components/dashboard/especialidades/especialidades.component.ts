import { NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../../../services/usuario.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { EspecialidadDTO } from '../../../models/especialidad';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule,
    TableModule, DropdownModule, ButtonModule, //Prime
    LoadingComponent, //Components
  ],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css'
})
export class EspecialidadesComponent implements OnInit {

  loading: boolean = false;
  listMaEspecialidades: EspecialidadDTO[] = [];

  constructor(private toastr: ToastrService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerEspecialidades();
  }

  obtenerEspecialidades() {
    this.loading = true;
    this._usuarioService.getEspecialidades().subscribe(result => {
      if (result.successful) {
        this.listMaEspecialidades = result.data;
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