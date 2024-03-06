import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path:'auth',
      //guards
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path:'dashborad',
      //guards
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
