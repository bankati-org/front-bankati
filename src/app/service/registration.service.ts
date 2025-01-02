import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationDto} from "../model/Registration-dto";
import {ApiResponse} from "../model/ApiResponse";
import {UserResponseDto} from "../model/User-response-dto";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/api/auth/register';
  constructor(private http: HttpClient) { }
  registerUser(registrationDto: RegistrationDto): Observable<ApiResponse<UserResponseDto>> {
    return this.http.post<ApiResponse<UserResponseDto>>(this.apiUrl, registrationDto);
  }

}
