import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/core/services/rental.service';

@Component({
  selector: 'app-rentals-admin',
  templateUrl: './rentals-admin.component.html',
  styleUrls: ['./rentals-admin.component.css']
})
export class RentalsAdminComponent implements OnInit {
  waitingRentals!:any[]
  pendingRentals!:any[]
  confirmedRentals!:any[]
  rejectedRentals!:any[]
  constructor(private _RentalService:RentalService){
  }
  ngOnInit(): void {
   this.getAllPendingrentals();
   this.getAllWaitingrentals();
   this.getAllConfirmedRentals();
   this.getAllRejectedRentals();
  }

  getAllPendingrentals(){
    this._RentalService.getAllPendingRentals().subscribe({
      next:res=>{
        console.log(res)
        this.pendingRentals=res
      }
    })
  }
  getAllWaitingrentals(){
    this._RentalService.getAllWaitingRentals().subscribe({
      next:res=>{
        console.log(res)
        this.waitingRentals=res

      }
    })
  }
  getAllConfirmedRentals(){
    this._RentalService.getAllConfirmedRentals().subscribe({
      next:res=>{
        console.log(res)
        this.confirmedRentals=res

      }
    })
  }
  getAllRejectedRentals(){
    this._RentalService.getAllRejectedRentals().subscribe({
      next:res=>{
        console.log(res)
        this.rejectedRentals=res

      }
    })
  }

 updateStatus(rentalId : number, totalCost? : number ){
  this._RentalService.getById(rentalId).subscribe((data : any) => {
    console.log(data);
    data.total_Cost = totalCost;
    this._RentalService.updateStatus(rentalId,1,totalCost).subscribe(data => {
      console.log(data);
    })
  })
 }


}
