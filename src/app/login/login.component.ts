import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { RegistrationService } from '../app.service';
import { HttpHeaders } from '@angular/common/http';

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
    var email = this.signInForm.value.email;
    var password = this.signInForm.value.password;
    var btoaPassword = btoa(email + ':' + password);

    this.service.LoginForm(this.signInForm.value).subscribe((res:any)=>
    {
      console.log(res);
      localStorage.setItem("token",btoaPassword);
      this.router.navigate(["/home"]);
    }),
     (error) => {
      this.errorMessage ="Invalid creditionals";
      throw error;
      };
}

  dologin() {
    this.service.LoginForm(this.signInForm.value).subscribe((res:any)=>
    {
      console.log(res);
      localStorage.setItem("userId",res.data.userId);
      this.router.navigate(["/home"]);
    }),
     (error) => {
      this.errorMessage =error;
      throw error;
      };

    }

}
