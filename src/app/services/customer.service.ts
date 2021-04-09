import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44370/api/customer/';
  constructor(private httpClient:HttpClient) { }

  getCustomerByUserId(userId:number):Observable<ListResponseModel<Customer>>{
   let newPath=this.apiUrl+"getbyuserid?userId="+userId;
   return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  updateCustomer(customer:Customer):Observable<ResponseModel>{
   let newPath=this.apiUrl+"update";
  return this.httpClient.post<ResponseModel>(newPath,customer)
  }
}
