import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl='https://localhost:44370/api/';

  constructor(private httpClient:HttpClient) { }

  getImagesByCarId(carId:number):Observable<ListResponseModel<Image>>{
    let newPath=this.apiUrl+"image/getimagesbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
}
