import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private  _HttpClient:HttpClient) { }
  baseUrl:string='http://localhost:5077'
  addrental(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Rental`,data)
  }
  updateAvailability(id:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Rental/${id}`,id)
  }
  getAllRentals(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/${id}`)
  }
  getAllRequestForCar(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/getAllReqForCarById/${id}`)
  }
  waitingpayment(id:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Rental/PaymentRequest/${id}`,id)
  }
  rejectRequest(id:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Rental/RejectRequest/${id}`,id)
  }
  confirmRequest(id:any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Rental/ConfirmRequest/${id}`,id)
  }
  getAllPendingRentals():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/getAllPendingRentals`)
  }
  getAllWaitingRentals():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/getAllWaitingRentals`)
  }
  getAllConfirmedRentals():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/getAllConfirmedRentals`)
  }
  getAllRejectedRentals():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Rental/getAllRejectedRentals`)
  }
  updateStatus(id : number , status : number , payment?: number){
    if(payment){
      return this._HttpClient.put(`http://localhost:5077/api/Rental/${id}?totalCost=${payment}&status=${status}`, {})
    }else{
      return this._HttpClient.put(`http://localhost:5077/api/Rental/${id}?status=${status}`, {})
    }
  }
  getById(id : number){
    return this._HttpClient.get(`http://localhost:5077/api/Rental/Get-By-Id?id=` + id);
  }
//
}
