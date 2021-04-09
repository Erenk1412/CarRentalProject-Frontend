import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44370/api/user/";
  constructor(private httpClient:HttpClient) { }

  getById(userId:number):Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"getuserbyid?userId="+userId;
    return  this.httpClient.get<ListResponseModel<User>>(newPath)
  }
  getByEmail(email:string):Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"getuserbyemail?email="+email;
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  update(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath,user);

  }
}
