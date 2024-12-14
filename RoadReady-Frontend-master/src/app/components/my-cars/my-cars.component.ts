import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/core/services/car.service';
import { RentalService } from 'src/app/core/services/rental.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent {
  cars!:any[]
  constructor(private _CarService:CarService,private _RentalService:RentalService,private toastr:ToastrService){
  }
  ngOnInit(): void {
this.getAllCarsToOwner()
  }
  getAllCarsToOwner(){
    let ownerId=localStorage.getItem("UserId");
    this._CarService.getAllCarsToOwner(ownerId).subscribe({
      next:res=>{
        console.log(res);
        this.cars=res
      },
      error:err=>{
        console.log(err);

      }
    })

  }
  updateAvailability(id:any){
    this._RentalService.updateAvailability(id).subscribe({
      next:res=>{
        if(res.message=='success'){
          this.toastr.success('you updated car successfully', 'Success',{
            timeOut: 1500,
          });
          console.log(res);
          this.getAllCarsToOwner();


        }

      },
      error:err=>{
        console.log(err);

      }
    })

  }
  carTrackBy(index: number, car: any) {
    return car.id;
  }
  DeleteCar(id:any){
    this._CarService.deleteCar(id).subscribe({
      next:res=>{
        console.log(res);
        this.toastr.success('car is deleted successfully', 'Success',{
          timeOut: 1500,
        });
        this.getAllCarsToOwner();

      },
      error:err=>{
        console.log(err);

      }
    })
  }
}
