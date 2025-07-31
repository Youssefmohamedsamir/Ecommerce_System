import { Iproduct } from './../../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from '../../../core/service/carts/carts.service';
import { Iwishlist } from '../../../shared/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartsService = inject(CartsService)
  private readonly toastrService = inject(ToastrService)

  ngOnInit(): void {
    this.favourite()
  }

  AddProduct(id: string) {
    this.cartsService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartsService.numberCart.next(res.numOfCartItems)

        this.toastrService.success(res.message, 'Fresh cart Shope')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  favouritedata: Iproduct[] = []

  favourite() {
    this.wishlistService.getloged().subscribe({
      next: (res) => {
        console.log(res);
        this.favouritedata = res.data
        console.log(this.favouritedata)
      },

    })

  }

}
