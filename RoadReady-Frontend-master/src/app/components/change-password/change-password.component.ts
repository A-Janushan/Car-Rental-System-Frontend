import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
constructor(private _AuthService:AuthService,private toastr:ToastrService,private dialog:MatDialog) {

}
  ngOnInit(): void {
this.createFormChangePass()
  }
  changePassForm!:FormGroup
  createFormChangePass(){
    this.changePassForm =new FormGroup({
      currentPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
      newPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
      confirmNewPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
    },{ validators:this.PasswordMatched})

  }
  PasswordMatched(changePassForm:any){
    let pass=changePassForm.get('newPassword')
    let rePass=changePassForm.get('confirmNewPassword')
    if(pass?.value==rePass?.value){
      return null
    }else{
      rePass?.setErrors({PasswordMatched: 'Confirm New Password does not match password'})
      return {PasswordMatched: 'Confirm New Password does not match password'}

    }
  }
  changePass(changePassForm:FormGroup){
    if(changePassForm.valid){
      this._AuthService.changePass(changePassForm.value).subscribe({
        next:res=>{
          this.toastr.success('Password are changed successfully', 'congratulations',{
            timeOut: 1500,
          });
          this.dialog.closeAll()
          console.log(res);
        },
        error:err=>{
          this.toastr.warning('password is invalid', 'Ooops',{
            timeOut: 1500,
          });
          console.log(err);

        }
      })
        }
    }
}
