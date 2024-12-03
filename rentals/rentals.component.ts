import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Rating } from 'primeng/rating';
// import { RentalService } from 'src/app/core/services/rental.service';
// import { ReviewService } from 'src/app/core/services/review.service';
import { AddReviewComponent } from '../add-review/add-review.component';
import { Router } from '@angular/router';
import { SrcImgComponent } from '../src-img/src-img.component';
import { RentalService } from '../../core/services/rental.service';
import { ReviewService } from '../../core/services/review.service';
@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent {
  constructor(private _RentalService:RentalService, private _FormBuilder:FormBuilder,private _Router:Router,private _ReviewService:ReviewService,public dialog: MatDialog) {
  }
  isConfirmed:boolean =false

  // pay:boolean =false
  ngOnInit(): void {
    this.userId=localStorage.getItem("UserId");
    this._RentalService.getAllRentals(this.userId).subscribe({
      next:res=>{
        console.log(res);
        if(res.status==2){
          this.isConfirmed=true;
        }
        // if(res.status==2){
        //   this.pay=true;
        // }
        this.rentals=res;
      }
    })
  }
  openDialogImg(src:any) {
    this.dialog.open(SrcImgComponent, {
      data: {src},width:'500px',
    });
  }
  rentals!:any[]
  userId:any
  createFormReview(){
    this.reviewForm=this._FormBuilder.group({
      comment:['',[Validators.required]],
      rating:['',[Validators.required]],
      rentalId:[,[Validators.required]]
    })
  }
  openDialog(id:any){
    this.dialog.open(AddReviewComponent, {
      data: {id},width:'500px'
    });
  }


  reviewForm!:FormGroup;

  addReview(reviewForm:FormGroup){
    console.log(reviewForm.value);
if(reviewForm.valid){
  this._ReviewService.addReview(reviewForm.value).subscribe({
    next:res=>{

      console.log(res);

    }
  })
}
}





}
