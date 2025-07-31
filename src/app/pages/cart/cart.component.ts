import { Component, inject, OnInit } from '@angular/core';
import { CartsService } from '../../core/service/carts/carts.service';
import { Icart } from '../../shared/interfaces/icart';
import { log } from 'node:console';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartsService = inject(CartsService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)

  CartDetails: Icart = {} as Icart

  AddToCart() {
    this.ngxSpinnerService.show('loading')
    this.cartsService.getLogedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.CartDetails = res.data
        this.ngxSpinnerService.hide('loading')

      },
    })
  }

  ngOnInit(): void {
    this.AddToCart()
  }

  deleteProduct(id: string) {
    this.ngxSpinnerService.show('loading')
    this.cartsService.DeleteProductCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.CartDetails = res.data
        this.cartsService.numberCart.next(res.numOfCartItems)
        this.ngxSpinnerService.hide('loading')
      },

    })
  }




  UpsateCounter(id: string, counter: number) {
    this.cartsService.UpateCounte(id, counter).subscribe({
      next: (res) => {
        console.log(res);
        this.CartDetails = res.data

      },

    })

  }


  ClearAllData(): void {
    this.cartsService.clearAllProduct().subscribe({
      next: (res) => {
        console.log(res);

        this.CartDetails = {} as Icart
        this.cartsService.numberCart.next(0)

      },

    })
  }

}
