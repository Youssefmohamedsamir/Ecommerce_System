import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRegisterService } from '../../core/service/authRegister/auth-register.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  private readonly authRegisterService = inject(AuthRegisterService)
  private readonly router = inject(Router)

  step: number = 1


  VerifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  VerifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required,
    Validators.pattern(/^[0-9]{6}$/)])
  })

  ResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,
    Validators.email]),
    newPassword: new FormControl(null, [Validators.required
      , Validators.pattern(/^[A-Z]/)])
  })



  submitEmail(): void {
    console.log(this.VerifyEmail.value);

    let EmailValue = this.VerifyEmail.get("email")?.value

    this.ResetPassword.get('email')?.patchValue(EmailValue)

    this.authRegisterService.setVeryfyEmail(this.VerifyEmail.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.statusMsg == 'success') {
          this.step = 2
        }

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  submitCode(): void {

    this.authRegisterService.setVeryfyCode(this.VerifyCode.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status == 'Success') {
          this.step = 3
        }

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  submitNewPassword(): void {
    this.authRegisterService.setNewPassword(this.ResetPassword.value).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('usertoken', res.token)

        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
