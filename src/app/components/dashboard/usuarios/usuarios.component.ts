import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { NgFor, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { UsuarioDTO } from '../../../models/usuario';
import { RolDTO } from '../../../models/rol';
import { EspecialidadDTO } from '../../../models/especialidad';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, CommonModule,
    TableModule, DropdownModule, ButtonModule, IconFieldModule, InputIconModule  //Prime
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  listMaRoles: RolDTO[] = [];
  listMaEspecialidades: EspecialidadDTO[] = [];

  listUsuarios: UsuarioDTO[] = [];

  accion = "Agregar";

  formUsuario: FormGroup;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private _usuarioService: UsuarioService) {
    this.formUsuario = this.fb.group({
      nombre_completo: ['', Validators.required],
      num_celular: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rol: new FormControl<RolDTO | null>(null, [Validators.required]),
      especialidad: new FormControl<EspecialidadDTO | null>(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerEspecialidades();

    this.obtenerUsuarios();
  }

  obtenerRoles() {
    this._usuarioService.getRoles().subscribe(result => {
      console.log(result);
      this.listMaRoles = result.data;
    }, error => {
      console.error(error);
    });
  }


  obtenerEspecialidades() {
    this._usuarioService.getEspecialidades().subscribe(result => {
      console.log(result);
      this.listMaEspecialidades = result.data;
    }, error => {
      console.error(error);
    });
  }


  obtenerUsuarios() {
    this._usuarioService.getUsers().subscribe(result => {
      console.log(result);
      this.listUsuarios = result.data;
    }, error => {
      console.error(error);
    });
  }

  guardarUsuario() {
    const usuario: UsuarioDTO = {
      nombre_completo: this.formUsuario.get("nombre_completo")?.value,
      num_celular: this.formUsuario.get("num_celular")?.value,
      correo: this.formUsuario.get("correo")?.value,
      password: this.formUsuario.get("password")?.value,
      id_rol: this.formUsuario.get("rol")?.value.id,
      id_especialidad: this.formUsuario.get("especialidad")?.value.id,
      activo: 'SI',
    }
    this._usuarioService.guardarUsuario(usuario).subscribe(result => {

      if (result.successful) {
        this.toastr.success('Usuario registrado', 'Exito');
        this.obtenerUsuarios();
        this.formUsuario.reset();
      } else {
        this.toastr.error(result.errors[0].msg, 'Error');
        this.obtenerUsuarios();
      }
    }, error => {
      console.error(error);
      this.toastr.error('Operación fallida', 'Error');

    });
  }

  editarUsuario(usuario: UsuarioDTO) {
    this.accion = "Editar";

    this.formUsuario.patchValue({
      nombre_completo: usuario.nombre_completo,
      num_celular: usuario.num_celular,
      correo: usuario.correo,
      password: usuario.password,
      rol: this.listMaRoles.find(item => item.id == usuario.id_rol),
      especialidad: this.listMaEspecialidades.find(item => item.id == usuario.id_especialidad),
      activo: usuario.activo,
    });

  }
}
