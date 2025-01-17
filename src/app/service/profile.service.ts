import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/ApiResponse";
import {Observable} from "rxjs";
import {UserResponse} from "../model/UserResponse";
import {environment} from "../../environments/environment";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}api/auth/`; // Replace with your backend API URL if different
  private apiUrlAgent = `${environment.apiUrl}api/agent/`;

  constructor(private http: HttpClient) {}
  getUserProfile(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`${this.apiUrl}profile`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrlAgent}all`);
  }
}
