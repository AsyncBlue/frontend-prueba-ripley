export interface User {
    nombre:   string;
    password: string;
    rut:      string;
}

export interface RespuestaCrearUsuario {
    ok: boolean;
    user: User;
    token: string;
}
