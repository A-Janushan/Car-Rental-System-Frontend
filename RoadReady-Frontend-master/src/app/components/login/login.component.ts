import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  constructor(private _FormBuilder:FormBuilder,private _Auth:AuthService,private _Router:Router,private toastr: ToastrService,private dialog:MatDialog) {
  }
  createForm():void{
    this.loginForm =this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&#])[A-Z][A-Za-z\d@$!%*#?&]{7,}$/)]],
    })
  }
  ngOnInit(): void {
    this.createForm();
  }
  id:any
  login(formData:FormGroup){
    if(formData.valid){
      this._Auth.login(formData.value).subscribe({
        next:res =>{
          console.log(res);
       let response = this._Auth.decode(res);
       console.log(response);
          if(res)
            {
              if(response.Role=="User" || response.Role==""){
            localStorage.setItem("CurrentToken",res.token)
         //   localStorage.setItem("UserName",res.userName)
            localStorage.setItem("UserId",response.Id)
            // this.toastr.success('You are logged in successfully', 'Hi '+ res.userName,{
            //   timeOut: 1500,
            // });
            console.log(res);
            this._Router.navigate(['/home'])
              }
              else if(response.Role=="Admin"){
                localStorage.setItem("CurrentToken",res.token)
             //   localStorage.setItem("UserId",res.id)
                this.toastr.success('You are logged in successfully', 'As Admin' ,{
                  timeOut: 1500,
                });
                this._Auth.decode(res);
                this._Router.navigate(['/users'])

              }
              this.dialog.closeAll();

          }
          },
          error:(err) =>{
            console.log(err);
            this.toastr.warning(err.error.message, 'Ooops',{
              timeOut: 1500,
            });
          }
        }
      )
    }
  }
}
