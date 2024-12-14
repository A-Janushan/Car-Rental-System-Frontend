import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SrcImgComponent } from '../src-img/src-img.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
constructor(private _AuthService:AuthService,public dialog: MatDialog ,private toaster:ToastrService){
}
ngOnInit(): void {
  this.getAllUsers()
}
getAllUsers(){
  this._AuthService.getAllUser().subscribe({
      next:res=>{
        console.log(res);
        this.users=res
      }
  })
}
  users:any
  openDialog(src:any) {
    this.dialog.open(SrcImgComponent, {
      data: {src},width:'500px',
    });
  }
  deleteUser(id:any){
    console.log(id);
    this._AuthService.deleteUser(id).subscribe({
      next:res=>{
        console.log(res);
        this.toaster.success('User is deleted successfully','success',{
          timeOut: 1500,
        })
        this.getAllUsers();
      },
      error:err=>{
        console.log(err);
        this.toaster.warning('This user can not be deleted now','Ooops',{
          timeOut: 2000,
        })

      }
    })
  }
}
