import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
 
  user:User;
  constructor(
    private toastrService:ToastrService,
    private userService:UserService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    let email = localStorage.getItem("email");
   
    if(this.checkToLogin()){
      console.log(email)
      this.getByEmail(email == null ? email = "a" : email.toString());
      
    
      console.log(this.user)
    
    }
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }

 

  logOut(){
   this.localStorageService.clearAll()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    setTimeout(()=>{
      this.router.navigate(['/']);
    },1000)
    window.location.reload();
  }

  getByEmail(email:string){
    
     this.userService.getByEmail(email).subscribe(response=>{
        this.user = response.data[0];
       
   })
  }
}

