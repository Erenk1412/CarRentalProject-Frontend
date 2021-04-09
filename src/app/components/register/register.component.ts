import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService,

  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
    })
  }
  register(){
   if(this.registerForm.valid){
     let registerModel:RegisterModel=Object.assign({},this.registerForm.value)
     this.authService.register(registerModel).subscribe(response=>{
       this.localStorageService.addToken(response.data);
       this.toastrService.success(response.message)
       this.router.navigate(["cars"])
     },responseError=>{
      this.toastrService.error(responseError.error,"HATA")
    })
   }else{
     this.toastrService.warning("Lütfen Bilgilerinizi Kontrol Ediniz","Kayıt Başarısız")
   }
  }
}
