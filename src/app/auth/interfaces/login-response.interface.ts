export interface User {
  Nombre: string;
}


export interface LoginResponse {
  access_Token:string;
  expires_Date:string;
  user: User;
  estatus:string
}
