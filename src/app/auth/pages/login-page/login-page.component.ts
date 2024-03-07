import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthServiceService)

    public myform: FormGroup = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })

  login(){
    const {email,password} = this.myform.value

    this.authService.login(email,password)
    .subscribe(data => {
      console.log(data)
    })
  }
}
