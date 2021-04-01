import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  brands:Brand[];
  colors:Color[];
  dataLoaded=false;
  colorId:number;
  brandId:number;
 

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService
    
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"])
      {
        this.getCarsByFilter(params["brandId"],params["colorId"])
      }
      if(params["colorId"]){
       this.getCarsByColor(params["colorId"])
       
      }
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      
      else{
        this.getCars();
      }
      this.getColors();
      this.getBrands();

    })
    
  }
getCars(){
  this.carService.getCars().subscribe(response=>{
    this.cars=response.data;
    this.dataLoaded=true;

  });
}
 getCarsByColor(colorId:number){
   this.carService.getCarsByColor(colorId).subscribe(response=>{
    this.cars=response.data
    this.dataLoaded=true;
   });
 }
 getCarsByBrand(brandId:number){
   this.carService.getCarsByBrand(brandId).subscribe(response=>{
     this.cars=response.data
     this.dataLoaded=true;
   })
 }
 getBrands(){
  this.brandService.getBrands().subscribe(respone => {
    this.brands = respone.data;
  })
}

getColors(){
  this.colorService.getColors().subscribe(response => {
    this.colors = response.data;
  })
}

getSelectedBrand(id:number){
  if (this.brandId == id)
  {
    return true;
  }
   else
  {
    return false;
  }
}

getSelectedColor(id:number){
  if (this.colorId == id) 
  {
    return true;
  } 
  else 
  {
    return false;
  }
}
 getCarsByFilter(brandId:number,colorId:number){
  this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
    this.cars=response.data;
  });
}
}
