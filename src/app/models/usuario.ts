export class UsuarioDTO {
    id?: number | undefined;
    id_rol?: number | undefined;
    id_especialidad?: number | undefined;
    correo?: string | undefined;
    num_celular?: string | undefined;
    password?: string | undefined;
    nombre_completo?: string | undefined;
    activo?: string | undefined;
    nombre_rol?: string | undefined;
    nombre_especialidad?: string | undefined;
}

export class LoginDTO {
    correo: string | undefined;
    password: string | undefined;
}