import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRegisterService } from '../../core/service/authRegister/auth-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly authRegisterService = inject(AuthRegisterService)
  private readonly router = inject(Router)

  register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required
      , Validators.pattern(/^[A-Z]/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, this.confirmpassword);



  success: string = ""
  ErrMessage: string = ""
  isloading: boolean = false

  submitForm(): void {
    if (this.register.valid) {
      this.isloading = true;
      this.authRegisterService.PostRegisterForBack(this.register.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isloading = false

          if (res.message == 'success') {
            this.success = res.message
            setTimeout(() => {
              this.router.navigate(["/login"])
            }, 500)
          }

        },
        error: (err) => {
          console.log(err)
          this.isloading = false
          this.ErrMessage = err.error.message;

        }
      })
    } else {
      this.register.markAllAsTouched()
    }
  }



  confirmpassword(group: AbstractControl) {

    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value

    if (password === rePassword) {
      return null
    } else {

      return { mismatch: true }

    }


  }
}
