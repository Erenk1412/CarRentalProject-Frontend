import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/Image';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  images:Image[]=[];
  cars:Car;
  controlMessage:string;
  
  
  constructor(
    private imageService:ImageService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private router:Router,
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
 
 
}
