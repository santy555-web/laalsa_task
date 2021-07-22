import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { RegistrationService } from '../app.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

export class Login{
  email:string;
  password:number;;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tokenString
  signInForm: FormGroup;
  errorMessage:any;
  result;
  constructor(
    private service: RegistrationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
        email: new FormControl(null,[Validators.required, Validators.email]),
        password: new FormControl(null,[Validators.required])
      });
  }

  login() {
    this.service.LoginForm(this.signInForm.value).subscribe((res: HttpResponse<any>) => {
      let token =  res.headers.get('x-access-token');
      localStorage.setItem("token",token);
      console.log(res);
      this.result = res;
      if(this.result === null || undefined || "" )
      {
        this.errorMessage="Invalid creditial";
      }
      else{
        this.router.navigate(['/home']);
      }
    })
}

}
