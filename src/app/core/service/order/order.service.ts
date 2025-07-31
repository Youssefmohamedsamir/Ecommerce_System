import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  myToken = localStorage.getItem('userToken')!
  order(id: string, data: object): Observable<any> {
    return this.httpClient.post(`${enviroment.baseURL}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      },
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }




}
