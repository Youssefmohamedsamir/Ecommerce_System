
import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { CategoriesService } from './../../core/service/catigories/categories.service';
import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/service/products/sproducts.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartsService } from '../../core/service/carts/carts.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/service/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartsService = inject(CartsService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  //static slider

  mainslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    nav: false,
    items: 1,
  }


  // dynamic slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  product: Iproduct[] = []  //property beacause showen in the HTML (it is global)

  categorie: Icategories[] = []


  getallcategory() {
    this.categoriesService.getallcategories().subscribe({
      next: (re) => {
        console.log(re.data);
        this.categorie = re.data;
      }
    })
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

  ngOnInit(): void {

    this.getAllproductData()
    this.getallcategory()


    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const ids = localStorage.getItem("products")
      if (ids) {
        this.array = JSON.parse(ids)
      }
    }
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

  array: string[] = []

  AddProducttowishlist(id: string) {
    this.wishlistService.AddProductTowishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.array = res.data
        localStorage.setItem('products', JSON.stringify(this.array))
        this.toastrService.success(res.message, 'Fresh cart Shope')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteproductfromwishlist(id: string) {
    this.wishlistService.deleteWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.array = res.data
        localStorage.setItem('products', JSON.stringify(this.array))
        this.toastrService.success(res.message, 'Fresh cart Shope')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}


