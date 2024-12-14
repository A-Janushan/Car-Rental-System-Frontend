import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { RatingModule } from "primeng/rating";
import { RentalsComponent } from './components/rentals/rentals.component';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {MatDialogModule} from '@angular/material/dialog';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/loading.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { CarRequestsComponent } from './components/car-requests/car-requests.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentComponent } from './components/payment/payment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { UsersComponent } from './components/users/users.component';
import { CarsAdminComponent } from './components/cars-admin/cars-admin.component';
import { RentalsAdminComponent } from './components/rentals-admin/rentals-admin.component';
import { SrcImgComponent } from './components/src-img/src-img.component';
import { SearchPipe } from './core/pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
     NavbarComponent,
     CarComponent,
     CarDetailsComponent,
     MyCarsComponent,
     RentalsComponent,
     RentCarComponent,
     AddCarComponent,
    ChangePasswordComponent,
    AddReviewComponent,
    FooterComponent,
    CarRequestsComponent,
    PaymentComponent,
    DashboardComponent,
    CarsAdminComponent,
    RentalsAdminComponent,
    SrcImgComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    CarouselModule,
    NgxSpinnerModule,
    NgxPayPalModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
