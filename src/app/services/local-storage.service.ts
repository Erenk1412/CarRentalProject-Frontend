import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

 customerDetail:string='customerDetail';
  localStorage:Storage;
  constructor() {
    this.localStorage=window.localStorage
   }

  addToken(tokenDetail:TokenModel){
    localStorage.setItem("token",tokenDetail.token);
    localStorage.setItem("expiration",tokenDetail.expiration)
  }


  removeToken(){
    this.localStorage.removeItem("token")
    this.localStorage.removeItem("expiration")
  }

  getToken(){
    let token:string | null =this.localStorage.getItem("token");
    let expiration:string | null = this.localStorage.getItem("expiration");
    var tokenModel:TokenModel = {token: "",expiration:""};
    if(token != null && expiration != null){
      tokenModel.expiration = expiration;
      tokenModel.token = token;
    }
    return tokenModel;
  }

  

  setCurrentCustomer(customer:Customer){
    localStorage.setItem(this.customerDetail,JSON.stringify(customer));
  }

  get(key : string){
    this.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    this.localStorage.setItem(key,value);
  }

  clearAll(){
    this.localStorage.clear();
  }
}
