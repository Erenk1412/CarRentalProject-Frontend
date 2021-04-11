import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
 rentals:Rental[]
 cars:Car[]
 dataLoaded=false;

  constructor(private rentalService:RentalService,) { }

  ngOnInit(): void {
    this.getMyRentals();
  }

  getMyRentals(){
    this.rentalService.getRentalByCustomerId(Number(localStorage.getItem("customerid"))).subscribe(response=>{
        this.rentals=response.data;
        
        this.dataLoaded=true;
    })

  }
  

}
