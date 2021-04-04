import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
 brandUpdateForm:FormGroup
 brand:Brand
 brandId:number;
  constructor(
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
       this.brandId=parseInt(params["brandId"])
       this.getBrandsById(params["brandId"])
       this.createBrandUpdateForm()
      }
      
    })
  }
  
  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:[this.brandId,Validators.required ],
      brandName:["",Validators.required]
    })
  }
  
  
  
  getBrandsById(brandId:number){
    this.brandService.getBrandsById(brandId).subscribe(response=>{
      this.brand=response.data[0]
      this.brandUpdateForm.setValue({
        brandId:this.brand.brandId,
        brandname:this.brand.brandName
      })

    })
  }

  updateBrand(){
    if(this.brandUpdateForm.valid){
     let brandModel=Object.assign({},this.brandUpdateForm.value)
     this.brandService.updateBrand(brandModel).subscribe(response=>{
       this.toastrService.success(response.message,"Güncelleme Tamamlandı")
     })


    }
  }

}
