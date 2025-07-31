import { enviroment } from './../../environment/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthRegisterService {

  constructor(private httpclient: HttpClient) { }

  private readonly router = inject(Router)

  PostRegisterForBack(data: object): Observable<any> {

    return this.httpclient.post(`${enviroment.baseURL}/api/v1/auth/signup`, data)

  }
  PostLoginForBack(data: string | null): Observable<any> {

    return this.httpclient.post(`${enviroment.baseURL}/api/v1/auth/signin`, data)

  }

  signout() {
    localStorage.removeItem('userToken')
    this.router.navigate(['/login'])
  }



  setVeryfyEmail(data: object): Observable<any> {
    return this.httpclient.post(`${enviroment.baseURL}/api/v1/auth/forgotPasswords`, data)
  }
  setVeryfyCode(data: object): Observable<any> {
    return this.httpclient.post(`${enviroment.baseURL}/api/v1/auth/verifyResetCode`, data)
  }
  setNewPassword(data: object): Observable<any> {
    return this.httpclient.put(`${enviroment.baseURL}/api/v1/auth/resetPassword`, data)
  }


}






