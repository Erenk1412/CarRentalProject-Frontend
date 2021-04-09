import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { PasswordChange } from '../models/passwordChange';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name: string = "";
  surname:string="";
  role:any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;
  email:string;
  apiUrl='https://localhost:44370/api/auth/';
  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelper:JwtHelperService,
    
    ) { }

  login(loginModel:LoginModel){
    let newPath = this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  register(registerModel:RegisterModel){
    let newPath = this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  logout(){
    this.localStorageService.removeToken()
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
    
  }

  changePassword(passwordToChange:PasswordChange){
    let newPath=this.apiUrl+"changepassword";
    return this.httpClient.post<SingleResponseModel<PasswordChange>>(newPath,passwordToChange);
  }
  userDetailFromToken(){
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    let surname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.surname = name.split(' ')[1];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId =parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.email=decodedToken["email"];
  }

}
