import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarRequestsComponent } from './components/car-requests/car-requests.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { UsersComponent } from './components/users/users.component';
import { CarsAdminComponent } from './components/cars-admin/cars-admin.component';
import { RentalsAdminComponent } from './components/rentals-admin/rentals-admin.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  {path:'',
  component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:"full"},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'car',canActivate:[AuthGuard],component:CarComponent,title:'car'},
    {path:'cardetails/:id',canActivate:[AuthGuard],component:CarDetailsComponent,title:'carDetails'},
    {path:'carRequest/:id',canActivate:[AuthGuard],component:CarRequestsComponent,title:'carRequest'},
    {path:'payment/:cost/:id',canActivate:[AuthGuard],component:PaymentComponent,title:'payment'},
    {path:'myCars',canActivate:[AuthGuard],component:MyCarsComponent,title:'myCars'},
    {path:'rental',canActivate:[AuthGuard],component:RentalsComponent,title:'rental'},

  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:"full"},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:SignupComponent,title:'Register'},
  ]},
  {path:'',component:DashboardComponent,children:[
    {path:'',redirectTo:'users',pathMatch:"full"},
   // {path:'users',canActivate:[AuthGuard],component:UsersComponent,title:'users'},
    {path:'cars',canActivate:[AuthGuard],component:CarsAdminComponent,title:'cars'},
    {path:'rentals',canActivate:[AuthGuard],component:RentalsAdminComponent,title:'rentals'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
