import { OwlOptions } from 'ngx-owl-carousel-o';
import { AfterViewInit, Component } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent  {
  customOptions: OwlOptions= {
    loop: true,
    mouseDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
    },
    nav: true
  }
  cars!:any[]
  constructor(private _CarService:CarService){
  }
  ngOnInit(): void {
    this.getAllCars()


  }
  search:string=''
  getAllCars(){
    this._CarService.getAllCarsExceptOwner(localStorage.getItem("UserId")).subscribe({
      next:res=>{
        console.log(res);
        this.cars=res
      },
      error:err=>{
        console.log(err);

      }
    })
  }

}
