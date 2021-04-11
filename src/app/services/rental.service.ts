import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  

  apiUrl="https://localhost:44370/api/rental/";
  constructor(private httpClient:HttpClient) { }

getRentalDetails():Observable<ListResponseModel<RentalDetails>>{
let newPath=this.apiUrl+"getrentaldetails";
return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
}

addRental(rental:Rental):Observable<ResponseModel>{
  let newPath = this.apiUrl + "add";
  return this.httpClient.post<ResponseModel>(newPath,rental);
}
rentalControl(carId:number):Observable<ResponseModel>{
  let newPath= this.apiUrl+"rentalcontrol?carId="+carId;
  return this.httpClient.get<ResponseModel>(newPath);
}
deleteRental(rental:Rental):Observable<ResponseModel>{
  let newPath = this.apiUrl + "deleterental";
  return this.httpClient.post<ResponseModel>(newPath,rental);
}
getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
let newPath=this.apiUrl+"getrentalbycarId?carId="+carId;
return this.httpClient.get<ListResponseModel<Rental>>(newPath);
}
getRentalByCustomerId(customerId:number):Observable<ListResponseModel<Rental>>{
  let newPath=this.apiUrl+"getrentalbycustomerid?customerId="+customerId;
  return this.httpClient.get<ListResponseModel<Rental>>(newPath);
}
}