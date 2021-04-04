import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import {FormsModule ,ReactiveFormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';

import { from } from 'rxjs';

import {ToastrModule} from "ngx-toastr";
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { RentComponent } from './components/rent/rent.component';
import { CarListComponent } from './components/list-component/car-list/car-list.component';
import { CarAddComponent } from './components/add-component/car-add/car-add.component';

import { CarUpdateComponent } from './components/update-component/car-update/car-update.component';
import { BrandAddComponent } from './components/add-component/brand-add/brand-add.component';

import { BrandUpdateComponent } from './components/update-component/brand-update/brand-update.component';
import { ColorAddComponent } from './components/add-component/color-add/color-add.component';
import { ColorUpdateComponent } from './components/update-component/color-update/color-update.component';

import { ColorListComponent } from './components/list-component/color-list/color-list.component';
import { BrandListComponent } from './components/list-component/brand-list/brand-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CarDetailComponent,

    BrandFilterPipePipe,   
    ColorFilterPipePipe,
    CreditCardComponent,
    
    RentComponent,
    
    CarListComponent,
    
    CarAddComponent,
    

    
    CarUpdateComponent,
    
    BrandAddComponent,
  
    BrandUpdateComponent,
    
    ColorAddComponent,
    
    ColorUpdateComponent,
    
    ColorListComponent,
    
    BrandListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
