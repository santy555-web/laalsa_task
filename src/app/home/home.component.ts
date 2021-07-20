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
  RestaurantData:any;
  constructor(private router:Router,
    private service: RegistrationService,
    ) { }

  ngOnInit(): void {
    // this.service.getCustomerStatus().subscribe((data)=>
    // {
    //   this.CustomerData=data;
    //   console.log("Customerdata",data);
    // });
    // this.service.getOrderDetails().subscribe((data)=>
    // {
    //   this.orderData=data;
    //   console.log("orderdata",this.orderData);
    // });
    this.service.getRestaurantStatus().subscribe((data)=>
    {
      this.RestaurantData=data;
      console.log("Customerdata",data);
    });
  }

  logout(){
       localStorage.clear();
       this.router.navigate(['/']);
     }
}
