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
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  paymentForm:FormGroup;
  creditCard:CreditCard;
  savedCard:CreditCard;
  cardNumber:string;
  cars:Car;
  rental:Rental;
  totalPrice=Number(localStorage.getItem("finalprice"))
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
       this.getCreditCard();
       this.createPaymentForm();
       
       
       
       
      }

    })
  }



 createPaymentForm(){
   this.paymentForm=this.formBuilder.group({
    customerId:[Number(localStorage.getItem('customerid')),Validators.required],
    cardNumber:["",Validators.required,Validators.length==16],
    cVV:["",Validators.required,Validators.length==3],
    customerNameAndSurname:["",Validators.required],
    dateMonth:["",Validators.required,Validators.length==2],
    dateYear:["",Validators.required,Validators.length==2]
   })
   
 }

 addCreditCard(cardModel:CreditCard){
  if (this.paymentForm.valid) {
     cardModel=Object.assign({},this.paymentForm.value)
     this.creditCardService.addCreditCard(cardModel).subscribe(response=>{
     this.toastrService.success(response.message,"BAŞARILI")
     });

   } else {
     this.toastrService.error("Kart Bilgilerinizi Kontrol Ediniz","HATA!")
     
   }
 }
 pay(){
  if(this.paymentForm.valid){
    this.askSaveCreditCard();
    this.toastrService.success("Ödeme İşlemi Başarıyla Gerçekleşti")
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
askSaveCreditCard() {
  if (!this.savedCard)
    if (window.confirm('Kartınızı Kaydetmek İster misiniz ?')) {
      let newCreditCard: CreditCard = {
        customerId:Number(localStorage.getItem('customerid')) ,
        ...this.paymentForm.value,
      };
      this.addCreditCard(newCreditCard);
    }
}


getCreditCard(){
  this.creditCardService.getCreditCartByCustomerId(Number(localStorage.getItem('customerid'))).subscribe(response=>{
    this.creditCard=response.data[0];
    let cardNumber=response.data[0].id;
    console.log(this.creditCard)
  })
}
fillCardInformation(selectedCreditCard: CreditCard) {
  this.savedCard = selectedCreditCard;
  if (this.creditCard){
    this.paymentForm.patchValue({ ...this.savedCard });
  }
    
  else this.paymentForm.reset();
}
 
 
}
