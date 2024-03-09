import { User } from "./login-response.interface";

export interface CheckStatus {
  access_Token:string;
  user: User;
  estatus:string
}
