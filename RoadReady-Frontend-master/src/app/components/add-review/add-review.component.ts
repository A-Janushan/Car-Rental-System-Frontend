import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit{
  constructor(private toaster:ToastrService,@Inject(MAT_DIALOG_DATA) public data:any,private _FormBuilder:FormBuilder,public dialog: MatDialog,private ReviewService:ReviewService){

  }
  ngOnInit(): void {
    this.rentalId=this.data
    this.createFormReview(this.rentalId.id)
  }
  rentalId:any
  reviewForm!:FormGroup;
  createFormReview(id:any){
    this.reviewForm=this._FormBuilder.group({
      comment:['',[Validators.required]],
      rating:['',[Validators.required]],
      rentalId:[id,[Validators.required]]
    })
  }
  addReview(reviewForm:FormGroup){
    console.log(reviewForm.value);
if(reviewForm.valid){
  this.ReviewService.addReview(reviewForm.value).subscribe({
    next:res=>{
      this.dialog.closeAll(),
      console.log(res);
      this.toaster.success('Review is submitted','success',{
        timeOut: 1500,
      })
    },
    error:err=>{
      console.log(err);
    }
  })
}
}

}
