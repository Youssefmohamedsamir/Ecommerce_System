import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpclient: HttpClient) { }

  getallcategories(): Observable<any> {
    return this.httpclient.get(`${enviroment.baseURL}/api/v1/categories`)
  }

  getspeceficcategories(id: string): Observable<any> {
    return this.httpclient.get(`${enviroment.baseURL}/api/v1/categories/${id}`)
  }

}
