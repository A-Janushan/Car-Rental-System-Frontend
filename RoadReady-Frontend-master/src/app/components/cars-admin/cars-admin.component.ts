import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-cars-admin',
  templateUrl: './cars-admin.component.html',
  styleUrls: ['./cars-admin.component.css']
})
export class CarsAdminComponent implements OnInit {
  cars:any
  carsCount:any
  constructor(private _CarService:CarService,private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.getAllCarsCount();
this.getAllCars();
  }
  getAllCars(){
    this._CarService.getAllCars().subscribe({
      next:res=>{
        console.log(res);
        this.cars=res
      },
      error:err=>{
        console.log(err);

      }
    })
  }
  getAllCarsCount(){
    this._CarService.getAllCarsCount().subscribe({
      next:res=>{
        this.carsCount=res
      }
    })
  }

  deleteCar(id:any){
    this._CarService.deleteCar(id).subscribe({
      next:res=>{
        console.log(res);
        this.toastr.success('car is deleted successfully', 'Success',{
          timeOut: 1500,
        });
        this.getAllCarsCount();
        this.getAllCars();


      },
      error:err=>{
        console.log(err);

      }
    })
  }

}
