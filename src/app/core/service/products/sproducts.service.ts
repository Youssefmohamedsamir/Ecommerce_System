import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //api

  constructor(private httpclient: HttpClient) { }



  getbasicproduct(): Observable<any> {
    return this.httpclient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getspcificproduct(id: string): Observable<any> {
    return this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }













}
