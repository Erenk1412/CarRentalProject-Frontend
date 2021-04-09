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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileUpdateComponent } from './components/update-component/profile-update/profile-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path: "cars/car-detail/:carId", component: CarDetailComponent},
  {path:"cars/filter/:brandId:colorId", component:CarComponent},
  {path:"cars/car-detail/rental-detail/:carId",component:RentComponent,canActivate:[LoginGuard]},
  {path:"cars/car-detail/rental-detail/pay/:carId",component:CreditCardComponent,canActivate:[LoginGuard]},
  {path:"cars/carList",component:CarListComponent,canActivate:[LoginGuard]},
  {path:"cars/carList/carAdd",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/carList/carUpdate/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/brandList",component:BrandListComponent},
  {path:"brands/brandList/brandAdd",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/brandList/brandUpdate/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/colorList",component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"colors/colorList/colorAdd",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/colorList/colorUpdate/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"updateProfile",component:ProfileUpdateComponent},

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
