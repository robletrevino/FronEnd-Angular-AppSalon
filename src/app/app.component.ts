import { Component, computed, effect, inject } from '@angular/core';
import { AuthServiceService } from './auth/services/auth.service.service';
import { AuthStatus } from './auth/interfaces';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private auhtService = inject(AuthServiceService);


  public finishedAuthChecking = computed<boolean>(() =>{

    if(this.auhtService.AuthStatus() === AuthStatus.checking){
      return false
    }

    return true

  })

  public authsStatusChangedEffect = effect(() =>{

    console.log('AuhtStaus',this.auhtService.AuthStatus())


  })



}
