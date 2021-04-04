import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  carDetail:Car;
  brands: Brand[];
  colors: Color[];
  carId:number;

 

  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
     if(params["carId"]){
      
       this.getCarDetailsById(params["carId"]);
       this.getBrands();
       this.getColors();
       this.createCarUpdateForm();
       this.carId=parseInt(params["carId"]);
      

     }
   })
  }
createCarUpdateForm(){
  this.carUpdateForm=this.formBuilder.group({
     id:[this.carId],
     colorId:["",Validators.required],
     brandId:["",Validators.required],
     carName:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required],
   
  })
}


getBrands(){
  this.brandService.getBrands().subscribe(response=>{
  this.brands=response.data;
  })
}   
  
getColors(){
  this.colorService.getColors().subscribe(response=>{
  this.colors=response.data;
   })
 }

 getCarDetailsById(carId:number){
   this.carService.getCarsById(carId).subscribe(response=>{
     this.carDetail=response.data[0];
     this.carUpdateForm.setValue({
       id:this.carDetail.carId,
       colorId:this.carDetail.colorId,
       brandId:this.carDetail.brandId,
       carName:this.carDetail.carName,
       modelYear:this.carDetail.modelYear,
       dailyPrice:this.carDetail.dailyPrice,
       description:this.carDetail.description
     })
   })
 }

 

 updateCar(){
  if(this.carUpdateForm.valid){      
    let carModel = Object.assign({},this.carUpdateForm.value)
    console.log(carModel)
     this.carService.updateCar(carModel).subscribe(response=>{
       this.toastrService.success(response.message)
     },responseError=>{
       this.toastrService.success(responseError.message)
     })
  }else{
    this.toastrService.error("Formunuz eksik","HATA")
  }    
}
}
