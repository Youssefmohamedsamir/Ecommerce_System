import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products/sproducts.service';
import { CartsService } from '../../core/service/carts/carts.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  private readonly productsService = inject(ProductsService)
  private readonly cartsService = inject(CartsService)
  private readonly toastrService = inject(ToastrService)


  product: Iproduct[] = []



  ngOnInit(): void {
    this.getAllproductData()
  }



  getAllproductData() {
    this.productsService.getbasicproduct().subscribe({
      next: (res) => {
        console.log(res.data);
        this.product = res.data;
      },
      error: (e) => {
        console.log(e)
      }
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
