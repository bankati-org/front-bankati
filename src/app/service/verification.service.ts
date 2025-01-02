import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/ApiResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  private apiUrl = `${environment.apiUrl}api/verify/`;  // Use the environment file

  constructor(private http: HttpClient) { }

  verifyEmail(email: string, token: string): Observable <ApiResponse<string>>{
    const params = new HttpParams()
      .set('email', email)
      .set('token', token);

    return this.http.post<ApiResponse<string>>(`${this.apiUrl}verifyEmail` , null, { params });
  }

  verifyPhone(phone: string, token: string): Observable<string> {
    const params = new HttpParams()
      .set('phoneNumber', phone)
      .set('token', token);

    console.log('Request URL:', `${this.apiUrl}verify-phone`); // Log the full URL
    console.log('Request params:', params.toString()); // Log the parameters
    return this.http.post<string>(`${this.apiUrl}verify-phone` , null, { params });
  }
}
