import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
