import { Component, computed, inject } from '@angular/core';
import { AuthServiceService } from '../../../auth/services/auth.service.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private AuthService = inject(AuthServiceService)
  public user = computed(() => this.AuthService.currentUser());


/*   get user(){
    return this.AuthService.currentUser();
  } */
}
