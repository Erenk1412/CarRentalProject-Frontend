import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add-component/brand-add/brand-add.component';
import { BrandListComponent } from './components/list-component/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/update-component/brand-update/brand-update.component';
import { CarAddComponent } from './components/add-component/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/list-component/car-list/car-list.component';
import { CarUpdateComponent } from './components/update-component/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/add-component/color-add/color-add.component';
import { ColorListComponent } from './components/list-component/color-list/color-list.component';
import { ColorUpdateComponent } from './components/update-component/color-update/color-update.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { RentComponent } from './components/rent/rent.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path: "cars/car-detail/:carId", component: CarDetailComponent},
  {path:"cars/filter/:brandId:colorId", component:CarComponent},
  {path:"cars/car-detail/rental-detail/:carId",component:RentComponent},
  {path:"cars/car-detail/rental-detail/pay/:carId",component:CreditCardComponent},
  {path:"cars/carList",component:CarListComponent},
  {path:"cars/carList/carAdd",component:CarAddComponent},
  {path:"cars/carList/carUpdate/:carId",component:CarUpdateComponent},
  {path:"brands/brandList",component:BrandListComponent},
  {path:"brands/brandList/brandAdd",component:BrandAddComponent},
  {path:"brands/brandList/brandUpdate/:brandId",component:BrandUpdateComponent},
  {path:"colors/colorList",component:ColorListComponent},
  {path:"colors/colorList/colorAdd",component:ColorAddComponent},
  {path:"colors/colorList/colorUpdate/:colorId",component:ColorUpdateComponent},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
