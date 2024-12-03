// import { RentalService } from 'src/app/core/services/rental.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RentalService } from '../../core/services/rental.service';
@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  constructor(private _RentalService:RentalService,private toaster:ToastrService,@Inject(MAT_DIALOG_DATA) public data:any,private _FormBuilder:FormBuilder,public dialog: MatDialog,private _Router:Router){
  console.log(this.data);
  }
  ngOnInit(): void {
    this.carId=this.data;
    this.createForm(this.carId.id);
  }

  carId:any=0;
  rentalForm!:FormGroup
  createForm(id:any):void{
    this.rentalForm =this._FormBuilder.group({
      start_Date:['',[Validators.required]],
      end_Date:['',[Validators.required]],
      pick_Location:['',[Validators.required]],
      ret_Location:['',[Validators.required]],
      clientId:[localStorage.getItem("UserId"),[Validators.required]],
      carId:[id,[Validators.required]],
    })
  }
  rent(rentalForm:FormGroup){
    if(!rentalForm.invalid){
      this._RentalService.addrental(rentalForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.toaster.success('You are rented car successfully', 'congratulations',{
            timeOut: 2000,
          });
          this.dialog.closeAll();
          this._Router.navigate(['/rental'])


        },
        error:err=>{
          console.log(err);
        }
      })
    }
  }
}

