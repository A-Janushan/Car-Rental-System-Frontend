import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject,Observable } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser =new BehaviorSubject(null)
isLogin=new BehaviorSubject(false)
baseUrl:string='http://localhost:5077'
  constructor(private _HttpClient:HttpClient,private _Router:Router,private dialog:MatDialog) {
    if(localStorage.getItem('CurrentToken') !==null){
      this.decode({})
    }
   }
   //http://localhost:5077/api/Account?FName=test&LName=test&Email=test%40gmail.com&Address=byjfgsiuefhiueh&PhoneNumber=0987654321&DOB=1999-07-23&Password=123456&ConfirmPassword=123456
//http://localhost:5077/api/Account?FName=FName&LName=LName&Email=Email&Address=Address&PhoneNumber=PhoneNumber&DOB=DOB&Password=Password&ConfirmPassword=ConfirmPassword
  register(data:any):Observable<any>{
    console.log(data);
    return this._HttpClient.post(`${this.baseUrl}/api/Account?FName=${data.fName}&LName=${data.lName}&Email=${data.email}%40gmail.com&Address=${data.address}&PhoneNumber=${data.phoneNumber}&DOB=${data.dob}&Password=${data.password}&ConfirmPassword=${data.confirmPassword}&Role=${data.role}`, data);
  }
//http://localhost:5077/api/Account/Login
  login(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Account/login`, data);
  }
  //
  getAllUser():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Account/get-all-users`);
  }
  deleteUser(id:any):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/Account/deleteUser?userId=${id}`);
  }
  logout(){
    localStorage.removeItem('CurrentToken')
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    this.currentUser.next(null)
    this.isLogin.next(false)
    this._Router.navigate(['/home'])
  }

  token:any= localStorage.getItem('CurrentToken')


  decode(obj : any){
    let encode=JSON.stringify(obj.token);
    console.log(obj);
    let decoded : any;
    if(encode){
     decoded =jwtDecode(encode)
    }
    this.currentUser.next(decoded);
    return decoded;
  }
  changePass(data:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
   return this._HttpClient.post(`${this.baseUrl}/api/Account/changepassword`,data,{headers});
  }

}
