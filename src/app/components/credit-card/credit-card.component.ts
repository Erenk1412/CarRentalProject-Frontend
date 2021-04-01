import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from 'src/app/services/credit-card.service';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from 'src/app/models/creditCard';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';

import { CarService } from 'src/app/services/car.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  paymentForm:FormGroup;
  creditCard:CreditCard;
  cars:Car;
  rental:Rental;
  totalPrice:number;
  dataLoaded=false;
  carId:number;
  rentDate:Date;
  returnDate:Date;
  
  


  constructor(
    private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private carService:CarService,
    
    
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       
       this.carId=parseInt(params["carId"]);
       this.getRentalByCarId(params["carId"]);
       this.getCarDetails(params["carId"]);
       this.createPaymentForm();
       
       this.getRentSummary(this.rentDate,this.returnDate); 
       
      }

    })
  }
  getRentSummary(date1:Date,date2:Date) {
  
   
    var difference = date2.getTime() - date1.getTime()
    console.log(difference)
    var totalDate = Math.ceil(difference / (1000 * 3600 * 24))
    this.totalPrice = totalDate * this.cars.dailyPrice
    return this.totalPrice;
     
    }


 createPaymentForm(){
   this.paymentForm=this.formBuilder.group({
    customerId:[1,Validators.required],
    cardNumber:["",Validators.required,Validators.length==16],
    cVV:["",Validators.required,Validators.length==3],
    customerNameAndSurname:["",Validators.required],
    dateMonth:["",Validators.required,Validators.length==2],
    dateYear:["",Validators.required,Validators.length==2]
   })
   
 }

 addCreditCard(){
  if (this.paymentForm.valid) {
     let cardModel=Object.assign({},this.paymentForm.value)
     this.creditCardService.addCreditCard(cardModel).subscribe(response=>{
     this.toastrService.success(response.message,"BAŞARILI")
     });

   } else {
     this.toastrService.error("Kart Bilgilerinizi Kontrol Ediniz","HATA!")
     
   }
 }
 getCarDetails(carId:number){
  let car= this.carService.getCarsById(carId).subscribe(response=>{
    this.cars=response.data[0];
  })
  console.log(car);
}
getRentalByCarId(carId:number){
 let rental= this.rentalService.getRentalByCarId(carId).subscribe(response=>{
    this.rental=response.data[0];

   console.log(rental)
  })
 
  
}
deleteRental(){
  let rental=Object.assign({},this.getRentalByCarId(this.carId));
  console.log(rental)
  
}
 
 
}
