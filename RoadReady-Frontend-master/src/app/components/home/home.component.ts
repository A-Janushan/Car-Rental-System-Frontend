import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _CarService:CarService){}
  ngOnInit(): void {
    this.getAllCars()
  }
  cars!:any[]
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
        items: 4
      },
    },
    nav: true
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
}
