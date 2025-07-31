import { SpecificCategoriesComponent } from './pages/specificCategories/specific-categories/specific-categories.component';
import { SpecificbrandComponent } from './pages/specificbrand/specificbrand/specificbrand.component';

import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';
import { authgardGuard } from './core/guards/authgard.guard';
import { loginGuard } from './core/guards/login.guard';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '', component: AuthComponent, canActivate: [loginGuard], children: [
      { path: 'login', loadComponent: () => import("./pages/login/login.component").then((c) => c.LoginComponent), title: 'login' },
      { path: 'register', loadComponent: () => import("./pages/register/register.component").then((r) => r.RegisterComponent), title: 'register' },
      { path: 'forgetpassword', loadComponent: () => import("./pages/forgetpassword/forgetpassword.component").then((r) => r.ForgetpasswordComponent), title: 'ForgetPassword' }
    ]
  },

  {
    path: '', component: BlankComponent, canActivate: [authgardGuard], children: [
      { path: 'home', loadComponent: () => import("./pages/home/home.component").then((h) => h.HomeComponent), title: 'home' },
      { path: 'allorders', loadComponent: () => import("./pages/allorders/allorders.component").then((h) => h.AllordersComponent), title: 'Allorders' },
      { path: 'cart', loadComponent: () => import("./pages/cart/cart.component").then((c) => c.CartComponent), title: 'cart' },
      { path: 'brands', loadComponent: () => import("./pages/brands/brands.component").then((b) => b.BrandsComponent), title: 'brands' },

      { path: 'wishlist', loadComponent: () => import("./pages/wishlist/wishlist/wishlist.component").then((b) => b.WishlistComponent), title: 'wishlist' },

      { path: 'categories', loadComponent: () => import("./pages/categoryes/categoryes.component").then((c) => c.CategoryesComponent), title: 'categories' },
      { path: 'checkout/:id', loadComponent: () => import("./pages/checkout/checkout.component").then((c) => c.CheckoutComponent), title: 'checkout' },

      // details
      { path: 'details/:id', loadComponent: () => import("./pages/details/details.component").then((d) => d.DetailsComponent), title: 'details' },

      // specificbrand
      { path: 'specificbrand/:id', loadComponent: () => import("./pages/specificbrand/specificbrand/specificbrand.component").then((s) => s.SpecificbrandComponent), title: 'specificbrand' },

      // specificCategories
      { path: 'SpecificCategories/:id', loadComponent: () => import("./pages/specificCategories/specific-categories/specific-categories.component").then((s) => s.SpecificCategoriesComponent), title: 'specificCategories' },


      { path: 'product', loadComponent: () => import("./pages/product/product.component").then((p) => p.ProductComponent), title: 'product' },
      { path: '**', loadComponent: () => import("./pages/not-found/not-found.component").then((n) => n.NotFoundComponent) },

    ]
  }
];
