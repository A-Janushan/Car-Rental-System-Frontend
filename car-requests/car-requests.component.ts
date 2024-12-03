import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

// import { RentalService } from 'src/app/core/services/rental.service';
import { SrcImgComponent } from '../src-img/src-img.component';
import { RentalService } from '../../core/services/rental.service';


@Component({
  selector: 'app-car-requests',
  templateUrl: './car-requests.component.html',
  styleUrls: ['./car-requests.component.css']
})
export class CarRequestsComponent {

  constructor(private _RentalService:RentalService,private _ActivatedRoute:ActivatedRoute,public dialog: MatDialog) {
    this.carId =Number( this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.carId)
    this.getAllRequest()
  }

  carId:any
  requests!:any[]
getAllRequest(){
  this._RentalService.getAllRequestForCar(this.carId).subscribe({
    next:(res)=> {
      console.log(res);
      this.requests=res
    }
  })
}
isConfirmed:boolean=false
isrejected:boolean=false
  waitingPayment(id:any){
    this._RentalService.waitingpayment(id).subscribe({
      next:res=>{
        console.log(res);

        this.getAllRequest()
      },
      error:err=>{
        console.log(err);

      }
    })
  }
  rejectRequest(id:any){
    this._RentalService.rejectRequest(id).subscribe({
      next:res=>{

        console.log(res);
        this.getAllRequest()
      },
      error:err=>{
        console.log(err);

      }
    })
  }
  openDialog(src:any) {
    this.dialog.open(SrcImgComponent, {
      data: {src},width:'500px',
    });
  }

}

