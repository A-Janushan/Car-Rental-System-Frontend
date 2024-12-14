import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string='http://localhost:5077'
  getAllReview(id:any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Review/${id}`);
  }
  addReview(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Review`,data)
  }
}
