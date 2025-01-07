import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AgentAdminRequestDto, UserAdminRequestDto, UserAgentRequestDto, UserRequest} from "../model/UserRequest";
import {BehaviorSubject, Observable} from "rxjs";
import { ApiResponse } from "../model/ApiResponse";
import { UserResponse } from "../model/UserResponse";
import {environment} from "../../environments/environment";
import {LoginRequest} from "../model/LoginRequest";
import {AuthResponse} from "../model/AuthResponse";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}api/auth/`;
  private apiUrlAgent = `${environment.apiUrl}api/agent/`; // Base URL for agent endpoints
  private apiUrlAdmin = `${environment.apiUrl}api/admin/`;

  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();


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

  registerClientByAgent(
    userAgentRequestDto: UserAgentRequestDto
  ): Observable<ApiResponse<UserResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set content type to JSON
    });

    return this.http.post<ApiResponse<UserResponse>>(
      `${this.apiUrlAgent}register`,
      userAgentRequestDto,
      { headers }
    );
  }


  registerAgentByAdmin(
    AgentAdminRequestDto: AgentAdminRequestDto
  ): Observable<ApiResponse<UserResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set content type to JSON
    });

    return this.http.post<ApiResponse<UserResponse>>(
      `${this.apiUrlAdmin}register-agent`,
      AgentAdminRequestDto,
      { headers }
    );
  }

  registerClientByAdmin(
    clientAdminRequestDto: UserAdminRequestDto
  ): Observable<ApiResponse<UserResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set content type to JSON
    });

    return this.http.post<ApiResponse<UserResponse>>(
      `${this.apiUrlAdmin}register-client`,
      clientAdminRequestDto,
      { headers }
    );
  }

  decodeToken(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role; // Extract the role from the JWT payload

      // Store the role in localStorage
      localStorage.setItem('userRole', role);

      // Update the BehaviorSubject
      this.userRoleSubject.next(role);
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }

  // Get the current user role
  loadUserRole(): void {
    const role = localStorage.getItem('userRole'); // Retrieve the role from localStorage
    if (role) {
      this.userRoleSubject.next(role); // Update the BehaviorSubject
    }
  }

  clearUserRole(): void {
    localStorage.removeItem('userRole'); // Clear the role from localStorage
    this.userRoleSubject.next(''); // Reset the BehaviorSubject
  }

  changePassword(email: string, newPassword: string): Observable<ApiResponse<string>> {
    const payload = { email, newPassword };
    return this.http.put<ApiResponse<string>>(
      `${this.apiUrl}${email}/change-password`,
      null, // No body for PUT request
      {
        params: { newPassword }, // Pass newPassword as a query parameter
      }
    );
  }

}
