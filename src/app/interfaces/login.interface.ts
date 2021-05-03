export interface RespuestaLogin {
    ok: boolean;
    user:  User;
    token: string;
}

export interface User {
    _id:    string;
    nombre: string;
    correo: string;
    rut:    string;
    password: string;
}
