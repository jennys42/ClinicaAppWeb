import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO, UsuarioDTO } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppURL: string;
  private headers: any;

  constructor(private http: HttpClient) {
    // this.myAppURL = environment.endpoint;
    this.myAppURL = 'https://poli-proyec-gerencia.onrender.com';
    this.headers = { 'Content-Type': 'x-www-form-urlencoded' }; //Se utuliza este header
  }

  login(login: LoginDTO): Observable<any> {
    let param = {
      correo: login.correo ?? "",
      password: login.password ?? ""
    };
    var payload = new HttpParams({ fromObject: param });
    return this.http.post(this.myAppURL + '/admin/user/login', payload);
  }

  getUsers(): Observable<any> {
    let param = {
    };
    var payload = new HttpParams({ fromObject: param });

    let options = {
      headers: this.headers,
      params: payload
    };
    return this.http.get(this.myAppURL + '/admin/user/lista_users', options);
  }


  guardarUsuario(usuario: UsuarioDTO): Observable<any> {

    let param;
    if (usuario.id == undefined) {
      //Crear
      param = {
        id: '',
        id_rol: usuario.id_rol ?? 0,
        id_especialidad: usuario.id_especialidad ?? 0,
        correo: usuario.correo ?? "",
        num_celular: usuario.num_celular ?? "",
        nombre_completo: usuario.nombre_completo ?? "",
        password: usuario.password ?? "",
        activo: usuario.activo ?? ""
      };
    } else {
      //Editar
      param = {
        id: usuario.id ?? 0,
        id_rol: usuario.id_rol ?? 0,
        id_especialidad: usuario.id_especialidad ?? 0,
        correo: usuario.correo ?? "",
        num_celular: usuario.num_celular ?? "",
        nombre_completo: usuario.nombre_completo ?? "",
        password: usuario.password ?? "",
        activo: usuario.activo ?? ""
      };
    }

    var payload = new HttpParams({ fromObject: param });
    return this.http.post('https://poli-proyec-gerencia.onrender.com/admin/user/input_user', payload);
  }

  getRoles(): Observable<any> {
    let param = {
    };
    var payload = new HttpParams({ fromObject: param });

    let options = {
      headers: this.headers,
      params: payload
    };


    return this.http.get('https://poli-proyec-gerencia.onrender.com/admin/rol/lista_roles', options);
  }


  getEspecialidades(): Observable<any> {
    let param = {
    };
    var payload = new HttpParams({ fromObject: param });

    let options = {
      headers: this.headers,
      params: payload
    };


    return this.http.get('https://poli-proyec-gerencia.onrender.com/admin/especialidad/lista_especialidades', options);
  }


  // saveUser(usuario: Usuario): Observable<any> {
  //   return this.http.post(this.myAppURL + this.myApiURL + 'GuardarUsuario', usuario);
  // }

  // changePassword(password: any): Observable<any> {
  //   return this.http.put(this.myAppURL + this.myApiURL + 'CambiarPassword', password);
  // }

}
