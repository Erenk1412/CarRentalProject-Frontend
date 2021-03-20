import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/Image';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  images:Image[]=[];
  cars:Car;
  
  constructor(
    private imageService:ImageService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getImagesByCarId(params["carId"])
       this.getCarsById(params["carId"]);
      }
      
    })

  }
 
  getImagesByCarId(carId:number){
    this.imageService.getImagesByCarId(carId).subscribe(response=>{
      this.images=response.data;
    })
  }
  getCarsById(id:number){
    this.carService.getCarsById(id).subscribe(response=>{
      this.cars=response.data[0];
    })
  }

}
