import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidoComponent } from './components/inicio/bienvenido/bienvenido.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { EspecialidadesComponent } from './components/dashboard/especialidades/especialidades.component';


export const routes: Routes = [

    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {
        path: 'inicio', component: InicioComponent, children: [
            { path: '', component: BienvenidoComponent },
            { path: 'login', component: LoginComponent },
        ]
    },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            { path: '', component: UsuariosComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'especialidades', component: EspecialidadesComponent },
            { path: 'login', component: LoginComponent },
        ]
    },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' },

];

