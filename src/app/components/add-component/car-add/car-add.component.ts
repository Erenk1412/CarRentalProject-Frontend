import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  imageAddForm:FormGroup;
  imagedate:Date;
  brands:Brand[];
  colors:Color[];

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
     carName:["",Validators.required],
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required],
     
    })
  }
  createImageAddForm(){
   this.imageAddForm=this.formBuilder.group({
    carId:["",Validators.required],
    imagePath:["",Validators.required],
    date:[alert(this.imagedate),Validators.required],

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
  addCar(){
    if(this.carAddForm.valid){      
      let carModel = Object.assign({},this.carAddForm.value)
      console.log(carModel);
       this.carService.addCar(carModel).subscribe(response=>{
       this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        this.toastrService.error(responseError.message,"HATA")
      })
    }else{
      this.toastrService.error("Formunuzu Kontrol Ediniz","HATA")
    }    
  }
 


  

}
