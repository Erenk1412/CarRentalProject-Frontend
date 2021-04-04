import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl='https://localhost:44370/api/cars/'
  constructor(private httpClient:HttpClient) { }


  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+'getcardetails'
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+'getcardetailsbybrand?brandId='+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+'getcardetailsbycolor?colorId='+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcardetailsbycar?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number): Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarfilter?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
 
addCar(car:Car):Observable<ResponseModel>{
 let newPath=this.apiUrl+"add";
 return this.httpClient.post<ResponseModel>(newPath,car);
}
deleteCar(car:Car):Observable<ResponseModel>{
let newPath=this.apiUrl+"delete";
return this.httpClient.post<ResponseModel>(newPath,car);
}
updateCar(car:Car):Observable<ResponseModel>{
let newPath=this.apiUrl+"update";
return this.httpClient.post<ResponseModel>(newPath,car);
}

}
