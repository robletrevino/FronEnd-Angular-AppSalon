import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseUrl:string = enviroment.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal(<User|null>(null))
  private _AuthStatus = signal(<AuthStatus>())
  
  constructor() { }


  login(email:string,password:string):Observable<boolean>{
      


    return of(true)


  }
}
