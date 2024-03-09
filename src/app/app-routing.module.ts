import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAutenticatedGuard } from './auth/guards/is-autenticated.guard';

const routes: Routes = [
    {
      path:'auth',
      //guards
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path:'dashboard',
      canActivate: [isAutenticatedGuard],
      loadChildren: () => import('./dashbord/dashbord.module').then(m => m.DashbordModule)
    },
    {
      path: '**',
      redirectTo:'auth'
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
