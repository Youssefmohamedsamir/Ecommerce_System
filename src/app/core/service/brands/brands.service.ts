import { enviroment } from './../../environment/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private httpClient: HttpClient) { }

  brand(): Observable<any> {
    return this.httpClient.get(`${enviroment.baseURL}/api/v1/brands`)
  }

  getspcificproduct(id: string): Observable<any> {
    return this.httpClient.get(`${enviroment.baseURL}/api/v1/brands/${id}`)
  }

}
