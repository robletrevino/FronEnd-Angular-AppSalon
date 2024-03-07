export interface user {
  nombre: string;
  correo: string;
  clave:  string;
  Uguid:  string;
}


export interface LoginResponse {
  User: user;
  Activo: boolean;
}
