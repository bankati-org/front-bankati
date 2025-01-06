import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRequest } from "../model/UserRequest";
import { ApiResponse } from "../model/ApiResponse";
import { UserResponse } from "../model/UserResponse";
import {environment} from "../../environments/environment";
import {LoginRequest} from "../model/LoginRequest";
import {AuthResponse} from "../model/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}api/auth/`;

  constructor(private http: HttpClient) { }


  registerUser(registrationDto: UserRequest, file: File): Observable<ApiResponse<UserResponse>> {
    const formData = new FormData();
    formData.append('userRequestDto', new Blob([JSON.stringify(registrationDto)], {
      type: 'application/json'
    }));
    formData.append('file', file);
    return this.http.post<ApiResponse<UserResponse>>(`${this.apiUrl}register`, formData);
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    const payload = JSON.stringify(loginRequest);
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}login`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Set the content type to JSON
      })
    });
  }
  logout(): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}logout`, {});
  }

}
