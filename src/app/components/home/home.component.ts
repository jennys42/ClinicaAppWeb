import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {
    id_cliente: "",
    nombres: "",
    apellidos: "",
    num_documento: "",
    num_celular: "",
    direccion: "",
    ciudad: "",
    departamento: "",
    fecha_nacimiento: "",
    sexo_biologico: "",
    estado_civil: "",
    ref_nombre: "tets tets",
    ref_telefono: "",
  };
  citas: { id: number, id_cliente: number, id_user: number, id_cita_estado: number, fecha_cita: string, hora_ini: string, hora_fin: string, direccion: string, cita_precencial: string, motivo_consulta: string, diagnostico: string, createdAt: string, updatedAt: string, nombre_cita_estado: string, nombre_completo: string, nombre_especialidad: string }[] = [];
  // Asegúrate de completar la definición de las propiedades de cita según la estructura de datos que recibes de la API

  solicitar = {
    id_cliente: this.user.id_cliente,
    id_user: "",
    fecha_cita: "",
    hora_ini: "",
    hora_fin: "",
    direccion: "",
    cita_precencial: ""
  }
  medicos: {
    id: number,
    nombre_completo: string
  }[] = []
  userId = ""
  ngOnInit(): void {

    this.fetchData();

  }

  constructor(private router: Router) {

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


  submitFormSolicitarCita(event: Event) {
    event.preventDefault();



    const urlencoded = new URLSearchParams();
    urlencoded.append("id_cliente", this.user.id_cliente);
    urlencoded.append("id_user", this.solicitar.id_user);
    urlencoded.append("fecha_cita", this.solicitar.fecha_cita);
    urlencoded.append("hora_ini", this.solicitar.hora_ini);
    urlencoded.append("hora_fin", this.solicitar.hora_fin);
    urlencoded.append("direccion", this.solicitar.direccion);
    urlencoded.append("cita_precencial", this.solicitar.cita_precencial);

    fetch("https://poli-proyec-gerencia.onrender.com/clientes/cita_medica/input_cita_medica", {
      method: "POST",
      body: urlencoded
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        this.fetchData()
        return response.text();
      })
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
  }
  submitFormProfile(event: Event) {
    event.preventDefault();

    const urlencoded = new URLSearchParams();
    urlencoded.append("id_cliente", this.user.id_cliente);
    urlencoded.append("nombres", this.user.nombres);
    urlencoded.append("apellidos", this.user.apellidos);
    urlencoded.append("num_documento", this.user.num_documento);
    urlencoded.append("num_celular", this.user.num_celular);
    urlencoded.append("direccion", this.user.direccion);
    urlencoded.append("ciudad", this.user.ciudad);
    urlencoded.append("departamento", this.user.departamento);
    urlencoded.append("fecha_nacimiento", this.user.fecha_nacimiento);
    urlencoded.append("sexo_biologico", this.user.sexo_biologico);
    urlencoded.append("estado_civil", this.user.estado_civil);
    urlencoded.append("ref_nombre", this.user.ref_nombre);
    urlencoded.append("ref_telefono", this.user.ref_telefono);

    fetch("https://poli-proyec-gerencia.onrender.com/clientes/cliente/input_inf_cliente", {
      method: "POST",
      body: urlencoded
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.text();
      })
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
  }
  formatDate(dateString: string): string {
    // Parsear la cadena de fecha usando moment.js
    const parsedDate = moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss.SSS Z');

    // Formatear la fecha en el formato deseado
    const formattedDate = parsedDate.format('YYYY-MM-DD');

    return formattedDate;
}

buscarNombreMedico(idMedico: number): string {

  const medico = this.medicos.find(medico => medico.id === idMedico);
  return medico ? medico.nombre_completo : 'Médico no encontrado';
}
fetchData() {
  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://poli-proyec-gerencia.onrender.com/clientes/cliente/lista_cliente_info?id=" + localStorage.getItem('user'), requestOptions)
      .then((response) => response.json())
      .then((result) => {

        // Asignar las propiedades de la respuesta al objeto user
        this.user.id_cliente = result.data.id_cliente;
        this.user.nombres = result.data.nombres;
        this.user.apellidos = result.data.apellidos;
        this.user.num_documento = result.data.num_documento;
        this.user.num_celular = result.data.num_celular;
        this.user.direccion = result.data.direccion;
        this.user.ciudad = result.data.ciudad;
        this.user.departamento = result.data.departamento;
        this.user.fecha_nacimiento = this.formatDate(result.data.fecha_nacimiento);
        this.user.sexo_biologico = result.data.sexo_biologico;
        this.user.estado_civil = result.data.estado_civil;
        this.user.ref_nombre = result.data.ref_nombre;
        this.user.ref_telefono = result.data.ref_telefono;
        //Ahora cargamos las citas
        const requestOptions: RequestInit = {
          method: "GET",
          redirect: "follow"
        };

        fetch("https://poli-proyec-gerencia.onrender.com/clientes/cita_medica/lista_cita_medicasxcliente?id=" + localStorage.getItem('user'), requestOptions)
          .then((response) => response.json())
          .then((result) => {



            const requestOptions: RequestInit = {
              method: "GET",
              redirect: "follow"
            };

            fetch("https://poli-proyec-gerencia.onrender.com/admin/user/lista_users", requestOptions)
              .then((response) => response.json())
              .then((result) => {

                this.medicos = result.data
              })
              .catch((error) => console.error(error));

            this.citas = result.data
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error)
      });
  }
  catch (error) {

  }
}
}
