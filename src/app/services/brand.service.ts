import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl='https://localhost:44370/api/brand/';
  constructor(private httpClient:HttpClient) { }
 
  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getallbrands";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  getBrandsById(brandId:number):Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getbyid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  deletBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
