import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/core/services/car.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { ReviewService } from 'src/app/core/services/review.service';
import {MatDialog} from '@angular/material/dialog';
import { RentCarComponent } from '../rent-car/rent-car.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit  {
  constructor(private _CarService:CarService,private _ActivatedRoute:ActivatedRoute,private _ReviewService:ReviewService,private _FormBuilder:FormBuilder,private _RentalService:RentalService,private toaster:ToastrService,public dialog: MatDialog){
    this.carId =Number( this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._CarService.getSpecificCar(this.carId).subscribe({
      next:(res)=> {
        console.log(res);
        this.carDetails = res
      }
    })
  }
  ngOnInit(): void {
    this.getAllReviws()
  }
  openDialog(id:any) {
    this.dialog.open(RentCarComponent, {
      data: {id},width:'500px'
    });
  }

  carId:any=0;
  carDetails:any={};
  rentalForm!:FormGroup
  reviewArr!:any

    createForm():void{
      this.rentalForm =this._FormBuilder.group({
        start_Date:['',[Validators.required]],
        end_Date:['',[Validators.required]],
        pick_Location:['',[Validators.required]],
        ret_Location:['',[Validators.required]],
        clientId:[localStorage.getItem("UserId"),[Validators.required]],
        carId:[this.carId,[Validators.required]],
      })
    }
    rent(rentalForm:FormGroup){
        this._RentalService.addrental(rentalForm.value).subscribe({
          next:res=>{
            this.toaster.success('You are rented car successfully', 'congratulations',{
              timeOut: 2000,
            });
            console.log(res);
          },
          error:err=>{
            console.log(err);
          }
        }) 
    }
getAllReviws(){
  this._ReviewService.getAllReview(this.carId).subscribe({
    next:res=>{
      console.log(res);

      this.reviewArr=res
      // console.log(this.reviewArr);
    },
    error:err=>{
      console.log(err);
    }
  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

  }


