import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { Observable, map, of, tap } from 'rxjs';
import { LoginResponse, user } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl:string = enviroment.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal(<user|null>(null));
  private _AuthStatus = signal(<AuthStatus>(AuthStatus.checking));


  public currentUser = computed(() => this._currentUser());
  public AuthStatus = computed(() => this._AuthStatus())
  constructor() { }


  login(email:string,password:string):Observable<boolean>{

    const url = `${this.baseUrl}/Login`

    const body = {email,password}

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      tap(({User,Activo}) =>{
        this._currentUser.set(User);
        this._AuthStatus.set(AuthStatus.Authenticated)
        localStorage.setItem('token',User.Uguid)
        console.log({ User});
      }),

      map( () => true)
    )



  }
}


