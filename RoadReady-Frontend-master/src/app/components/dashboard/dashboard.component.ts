import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private _AuthService:AuthService,private toastr:ToastrService,private _CarService:CarService,private _Router:Router,private dialog:MatDialog){}
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next:()=>{
        console.log(jwtDecode(JSON.stringify(localStorage.getItem('CurrentToken'))));
        if(this._AuthService.currentUser.getValue() != null){
          this.isAdmin=true
        }else{
          this.isAdmin=false
        }
      }
    })
  }
  isAdmin:boolean=false
  logout(){
    this._AuthService.logout();
  }

}
