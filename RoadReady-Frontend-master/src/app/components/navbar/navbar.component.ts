import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CarService } from 'src/app/core/services/car.service';
import { AddCarComponent } from '../add-car/add-car.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { jwtDecode } from 'jwt-decode';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService:AuthService,private toastr:ToastrService,private _CarService:CarService,private _Router:Router,private dialog:MatDialog){}
  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next:()=>{
       // console.log(jwtDecode(JSON.stringify(localStorage.getItem('CurrentToken'))));

        if(this._AuthService.currentUser.getValue() != null){
          this._AuthService.isLogin.next(true)
          this.isLogin=this._AuthService.isLogin.getValue();
          console.log(this._AuthService.isLogin.getValue());

        }else{
          this._AuthService.isLogin.next(false)
          this.isLogin=this._AuthService.isLogin.getValue();
          console.log(this._AuthService.isLogin.getValue());
        }
      }
    })
    this.name=JSON.stringify(localStorage.getItem('UserName'))
  }
  name:string=''
  openDialog(){
      const dialogRef = this.dialog.open(AddCarComponent,{
        width:'500px',height:'700px'
      });
    }
    openDialogChangePass(){
      const dialogRef = this.dialog.open(ChangePasswordComponent,{
        width:'500px'
      });

    }
    openDialogLogin(){
      const dialogRef = this.dialog.open(LoginComponent,{
        width:'500px',height:'600px'
      });
    }
    openDialogRegister(){
      const dialogRef = this.dialog.open(SignupComponent,{
        width:'500px',height:'700px',
      });
    }
  isLogin:boolean=false;
  logout(){
    this._AuthService.logout();
  }

}
