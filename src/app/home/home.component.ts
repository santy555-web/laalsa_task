import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  CustomerData:any;
  orderData:any;
  RestaurantData =[];
  constructor(private router:Router,
    private service: RegistrationService,
    ) { }

  ngOnInit(): void {

    this.service.getRestaurantStatus().subscribe((data:any)=>
    {
      var restData = data;
      console.log(restData)

      this.RestaurantData.push(restData.data);
    });
  }

  logout(){
       localStorage.clear();
       this.router.navigate(['/']);
     }
}
