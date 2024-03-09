import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CheckStatus, LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';


import Swal from 'sweetalert2'
import { strict } from 'assert';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl:string = enviroment.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal(<User|null>(null));
  private _AuthStatus = signal(<AuthStatus>(AuthStatus.checking));


  public currentUser = computed(() => this._currentUser());
  public AuthStatus = computed(() => this._AuthStatus())


  constructor() {
    this.chechAuthStatus().subscribe();

  }

  private setAuthrntication(user:User,token:string):boolean{
    this._currentUser.set(user);
    this._AuthStatus.set(AuthStatus.Authenticated);
    localStorage.setItem('token', token);

    return true

  }

  login(email:string,password:string):Observable<boolean>{

    const url = `${this.baseUrl}/api/Autenticacion/Token`

    const body = {correo:email,contraseña:password}

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({ access_Token,expires_Date,user,estatus}) => {
        var User = user; // Obtén el primer objeto del array 'usuario'

         this.setAuthrntication(user,access_Token);


        if (estatus === "400") {
          throw { error: { message: "Credenciales no Validas o aun no se a Registrado" } }; // Lanza un error si Estatus es "400"
        }

        return true
      }),

      catchError(err => {
        const errorMessage = err.error ? err.error.message : 'Error desconocido';
        return throwError(() => errorMessage);
      })


    );



  }

  chechAuthStatus():Observable<boolean>{
    const url = `${this.baseUrl}/api/Usuario/Token/Usuario`;
    const token = localStorage.getItem('token')

    if(!token) return of(false)

    const headers = new HttpHeaders()
    .set(`Authorization`,`Bearer ${token}`)

    return this.http.get<CheckStatus>(url, {headers})
    .pipe(
      map(({ access_Token,user,estatus}) => {
        var User = user; // Obtén el primer objeto del array 'usuario'

         this.setAuthrntication(user,access_Token);


        if (estatus === "400") {
          throw { error: { message: "Credenciales no Validas o aun no se a Registrado" } }; // Lanza un error si Estatus es "400"
        }

        return true
      }),


        catchError(() => {

          this._AuthStatus.set(AuthStatus.noAuthenticated)

         return of(false)
        })
    )



  }

}


