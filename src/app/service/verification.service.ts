import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'http://localhost:8080/api/verify';  // Adjusted base URL

  constructor(private http: HttpClient) { }

  // Email verification
  verifyEmail(email: string, token: string): Observable<ApiResponse<string>> {
    const body = { email, token }; // Use body for POST request
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/verifyEmail`, body);
  }

  // Phone verification
  verifyPhone(phone: string, token: string): Observable<string> {
    const body = { phoneNumber: phone, token }; // Use body for POST request
    return this.http.post<string>(`${this.apiUrl}/verify-phone`, body);
  }
}
