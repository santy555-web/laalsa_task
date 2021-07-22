import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Login } from "./login/login.component";
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

url1:string= "https://common.laalsa.com/support/support/credentials/login";
url2:string= "https://common.laalsa.com/support/support/crm/detailedOrderDetails?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0";
constructor(private http:HttpClient ) { }

  LoginForm(items:Login)
    {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response' as 'response'
      };
       let body=JSON.stringify(items);
       return this.http.post(this.url1,body,httpOptions)
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
      let token = localStorage.getItem('token');
      let header = new HttpHeaders({ 'Content-Type': 'application/json' }).set(
        'x-access-token',token
      );
      return this.http.get(this.url2, {headers : header });
    }
}
