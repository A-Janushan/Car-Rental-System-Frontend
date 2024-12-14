import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) {
    if(localStorage.getItem('CurrentToken') !==null){
      this._AuthService.decode({})
    }

   }
   baseUrl:string='http://localhost:5077'
   headers:any={
    token: localStorage.getItem('CurrentToken')
  }
  getAllCarsExceptOwner(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Car/getAllCarsExceptOwner/${id}`)
  }
  getAllCars():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Car`)
  }
  getAllCarsCount():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Car/cars-count`)
  }
  getSpecificCar(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Car/getDetailsCars/${id}`)
  }
  getAllCarsToOwner(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Car/${id}`)
  }
  deleteCar(id:number):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/Car/${id}`)
  }
  uploadCar(data:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/Car`, data)
  }
  updateCar(data:any,id:number):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/Car/${id}`, data)
  }



}
