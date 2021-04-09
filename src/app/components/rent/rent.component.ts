import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Image } from 'src/app/models/Image';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetail';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ImageService } from 'src/app/services/image.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentAddForm: FormGroup;
  rental: Rental;
  carId:number;
  images:Image;
  cars:Car;
  rentDate:Date;
  returnDate:Date;
  finalPrice:number;
  myRental:RentalDetails;
  customer:Customer;
  
  userId:number=this.authService.userId;
  customerId:number
  
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private rentalService:RentalService,
    private carService:CarService,
    private imageService:ImageService,
    private router:Router,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private authService:AuthService,
   
  

    
  ) { }

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(params=>{
      
      if(params["carId"]){
        this.authService.userDetailFromToken()
        this.userId=this.authService.userId;
        this.getCustomerByUserId(this.userId)
        
        this.carId=parseInt(params["carId"])
        this.toastrService.info("Tarihleri Seçiniz")
        
       this.getDetails(params["carId"]);
       this.getImage(params["carId"]);
       
      
       this.rentDate = new Date();
       this.returnDate = new Date();
       this.createRentAddForm();
       
       
      
      }
      
      
    })
    

  }
  createRentAddForm() {
    
    this.rentAddForm = this.formBuilder.group({
      carId: [this.carId,Validators.required],
      customerId: [Number(localStorage.getItem('customerid')) , Validators.required], 
      rentDate: ["" , Validators.required],
      returnDate:["",null]
      
    });
    console.log(this.rentAddForm.value)
  }
  

getImage(carId:number){
 this.imageService.getImagesByCarId(carId).subscribe(response=>{
    this.images=response.data[0];
    
      
    })
}
getDetails(carId:number){
  this.carService.getCarsById(carId).subscribe(response=>{
    this.cars=response.data[0];
    
    console.log(this.cars);
   
  })
}


getRentSummary() {
  
  var date1 = new Date(this.rentAddForm.value.rentDate);
  var date2 = new Date(this.rentAddForm.value.returnDate);
  if(isNaN(date1.getTime())||isNaN(date2.getTime())) {this.finalPrice=0}   
  else if(date1>date2){
    this.toastrService.error('Teslim Tarihi, Kiralama Tarihinde önce seçilemez.');
  }else{
    var difference = date2.getTime() - date1.getTime();
    var totalDate = Math.ceil(difference / (1000 * 3600 * 24));
    this.finalPrice = totalDate * this.cars.dailyPrice;
   localStorage.setItem("finalprice",this.finalPrice.toString())
  }

}

getCustomerByUserId(userId:number) {
  this.customerService.getCustomerByUserId(userId)
    .subscribe(response => {
      this.customer = response.data[0];
      this.customerId=response.data[0].id;
      localStorage.setItem("customerid",this.customerId.toString())
     
      console.log(this.customerId)
      
     
    });
}

 
  goToPay(){
    if(this.rentAddForm.valid){
      let carModel=Object.assign({},this.rentAddForm.value)
      this.rentalService.addRental(carModel).subscribe(response=>{
      this.toastrService.success(response.message,"HARİKA")
      })  
      setTimeout(()=>{
        this.router.navigate(['/cars/car-detail/rental-detail/pay/'+this.carId]);
      

      },2000)
      this.toastrService.info("Ödeme Sayfasına Yönlendiriliyor")
      
    }else{
      this.toastrService.error("Lütfen Tarihi Uygun Seçiniz")
    }
  }
}
 
 


