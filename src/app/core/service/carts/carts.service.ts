import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  myToken = localStorage.getItem('userToken')!

  constructor(private httpClient: HttpClient) { }


  numberCart: BehaviorSubject<number> = new BehaviorSubject(0)


  AddProductToCart(id: string): Observable<any> {

    return this.httpClient.post(enviroment.baseURL + '/api/v1/cart',
      {
        "productId": id
      },
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }

  getLogedUserCart(): Observable<any> {
    return this.httpClient.get(enviroment.baseURL + '/api/v1/cart',
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }

  DeleteProductCart(id: string): Observable<any> {
    return this.httpClient.delete(enviroment.baseURL + `/api/v1/cart/${id}`,
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }

  UpateCounte(id: string, counter: number): Observable<any> {
    return this.httpClient.put(enviroment.baseURL + `/api/v1/cart/${id}`,
      {
        count: counter
      },
      {
        headers:
        {
          token: this.myToken
        }
      }
    )
  }

  clearAllProduct(): Observable<any> {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token: this.myToken
        }
      }
    )

  }


}
