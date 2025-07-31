import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRegisterService } from '../../core/service/authRegister/auth-register.service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authRegisterService = inject(AuthRegisterService)
  private readonly router = inject(Router)

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required
      , Validators.pattern(/^[A-Z]/)]),
  },);

  success: string = ""
  ErrMessage: string = ""
  isloading: boolean = false

  submitForm(): void {
    if (this.login.valid) {
      this.isloading = true;
      this.authRegisterService.PostLoginForBack(this.login.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isloading = false

          if (res.message == 'success') {
            this.success = res.message

            setTimeout(() => {

              localStorage.setItem('userToken', res.token)



              this.router.navigate(["/home"])
            }, 500)
          }

        },
        error: (err) => {
          console.log(err)
          this.isloading = false
          this.ErrMessage = err.error.message;

        }
      })
    }
  }


}

