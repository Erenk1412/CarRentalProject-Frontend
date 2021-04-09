import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';

import { Image } from 'src/app/models/Image';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

import { ImageService } from 'src/app/services/image.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  images:Image[]=[];
  cars:Car;
  controlMessage:string;
  user:User;
  customer:Customer;
  userId:number=this.authService.userId;

  
  
   
  
  
  constructor(
    private imageService:ImageService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private router:Router,
    private userService:UserService,
    private customerService:CustomerService,
   
    private authService:AuthService,
    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getImagesByCarId(params["carId"])
       this.getCarsById(params["carId"]);
       this.getUserByEmail()
      }
      
     
     
    })

  }
 
  getImagesByCarId(carId:number){
    this.imageService.getImagesByCarId(carId).subscribe(response=>{
      this.images=response.data;
    })
  }
  getCarsById(carId:number){
    this.carService.getCarsById(carId).subscribe(response=>{
      this.cars=response.data[0];
    })
  }
  rentalControl(carId:number){
    
    this.rentalService.rentalControl(carId).subscribe(response=>{
     
      if(response.success==true){
      this.controlMessage=response.message;
    
        this.toastrService.info(this.controlMessage);
      
      setTimeout(()=>{
        this.router.navigate(['/cars/car-detail/rental-detail/'+this.cars.carId]);
      },3000)
       
      }
    },errorResponse=>{
      if(errorResponse.success!=true){
        this.controlMessage=errorResponse.message;
        setTimeout(()=>{
          this.toastrService.error("Araç Kiralanmış","HATA!");
        },3000)
      }
      
    });
    
  }

  getUserByEmail(){
    let email = localStorage.getItem('email');
    email == null ? email = "a" : email.toString()
    this.userService.getByEmail(email).subscribe(response=>{
       this.user = response.data[0];
       this.userId=this.user.id;
       if(this.user.findexScore<this.cars.minFindexScore){
        setTimeout(()=>{
          this.toastrService.error("Findex Puanınız aracı Kiralamak için yetersiz.")
          this.toastrService.info("Göz Atmaya Yönlendiriliyorsunuz")
        },2000)
        
         setTimeout(()=>{
          this.router.navigate(['/']);
        },3000)
       }

        
   })
  }
  

  getCustomer(userId:number){
    
   this.customerService.getCustomerByUserId(userId).subscribe(response=>{
     this.customer=response.data[0];
     console.log(this.customer)
   })
  }
 
}
