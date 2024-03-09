import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth.service.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAutenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthServiceService)
  const router = inject(Router)

  if(authService.AuthStatus() === AuthStatus.Authenticated){
    return true;
  }

  router.navigateByUrl('/auth/login')



  return false;
};
