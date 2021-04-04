import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;
  colorId:number;

  constructor(
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
      this.colorId=parseInt(params["colorId"]);
      this.getColorsById(params["colorId"]);  
      this.createColorUpdateForm();
      }
      })
  }
  createColorUpdateForm(){
   this.colorUpdateForm=this.formBuilder.group({
    colorId:[this.colorId], 
    colorName:["",Validators.required],
   })

  }

  getColorsById(colorId:number){
  this.colorService.getColorsById(colorId).subscribe(response=>{
    this.color=response.data[0]
    this.colorUpdateForm.setValue({
      colorId:this.color.colorId,
      colorName:this.color.colorName
    })
  })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel=Object.assign({},this.colorUpdateForm.value)
      this.colorService.updateColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"BAŞARILI");
      })
    }
    

  }
}
