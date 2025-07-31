import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }



  myToken = localStorage.getItem('userToken')!


  AddProductTowishlist(id: string): Observable<any> {

    return this.httpClient.post(enviroment.baseURL + '/api/v1/wishlist',
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


  getloged(): Observable<any> {
    return this.httpClient.get(enviroment.baseURL + '/api/v1/wishlist',
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }



  deleteWishlist(id: string): Observable<any> {
    return this.httpClient.delete(enviroment.baseURL + `/api/v1/wishlist/${id}`,
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }












}
