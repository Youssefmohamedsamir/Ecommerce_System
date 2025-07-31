import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products/sproducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartsService } from '../../core/service/carts/carts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartsService = inject(CartsService)
  private readonly toastrService = inject(ToastrService)


  detailsProduct: Iproduct | null = null

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let speproduct = p.get('id')!

        this.productsService.getspcificproduct(speproduct).subscribe({
          next: (res) => {
            console.log(res.data)
            this.detailsProduct = res.data
          },
          error: (err) => {
            console.log(err)
          }
        })
      },

    })
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


}
