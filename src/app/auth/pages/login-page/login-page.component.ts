import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { url } from 'inspector';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthServiceService)
    private router = inject(Router)

    public myform: FormGroup = this.fb.group({
      email:['correo@correo.com',[Validators.required,Validators.email]],
      password:['Alex6789',[Validators.required,Validators.minLength(6)]]
    })

  login(){
    const {email,password} = this.myform.value

    this.authService.login(email,password)
    .subscribe({
      next: () => {
        console.log('OK');
        this.router.navigateByUrl('/dashboard');
      },
      error: (errorMessage) => {
        Swal.fire('Error',errorMessage,'error')
      }
    })
  }
}
