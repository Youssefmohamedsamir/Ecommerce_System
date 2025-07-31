import { Component, input, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthRegisterService } from '../../core/service/authRegister/auth-register.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslatesService } from '../../core/service/translate/translates.service';
import { CartsService } from '../../core/service/carts/carts.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router)
  readonly auth = inject(AuthRegisterService)
  private readonly translatesService = inject(TranslatesService)
  private readonly cartsService = inject(CartsService)

  prosuctNumber!: number

  ngOnInit(): void {
    this.cartsService.numberCart.subscribe({
      next: (res) => {
        console.log(res);
        this.prosuctNumber = res
      }
    })

    this.cartsService.getLogedUserCart().subscribe({
      next: (res) => {
        this.cartsService.numberCart.next(res.numOfCartItems)
      }
    })
  }

  islogin = input(true)

  change(lang: string): void {
    this.translatesService.changeTranslate(lang)
  }

}
