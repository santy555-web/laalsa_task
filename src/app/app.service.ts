import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Login } from "./login/login.component";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

url1:string= "https://common.laalsa.com/support/support/credentials/login";
url2:string= "https://common.laalsa.com/support/support/crm/restaurantStatus?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0";
url3:string= "https://common.laalsa.com/support/support/crm/customerStatus?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0";
url4:string= "https://common.laalsa.com/support/support/crm/orderDetails?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0";
  constructor(private http:HttpClient ) { }
    LoginForm(items:Login)
    {
      let head = new HttpHeaders().set('Content-Type','application/json');
      let body=JSON.stringify(items);
      return this.http.post(this.url1, body, {headers:head})
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
          } else {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
      })
    );
    }
    getRestaurantStatus()
    {
      let header = new HttpHeaders().set(
        "Authorization",
         localStorage.getItem("token")
      );
      return this.http.get(this.url2,{headers:header});
    }
    getCustomerStatus()
    {
      let header = new HttpHeaders().set(
        "Authorization",
         localStorage.getItem("token")
      );
      return this.http.get(this.url3,{headers:header});
    }
    getOrderDetails()
    {
      let header = new HttpHeaders().set(
        "Authorization",
         localStorage.getItem("token")
      );
      return this.http.get(this.url4,{headers:header});
    }

}
