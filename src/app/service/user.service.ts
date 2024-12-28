import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {UserDto} from "../models/user-dto";

// Define a User models for type safety (optional, but recommended)
interface User {
  name: string;
  email: string;
  password: string;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/auth/register'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  registerUser(userData: UserDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    // Provide more detailed error handling depending on error type
    let errorMessage = 'Something went wrong. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'No internet connection or server is down.';
      } else {
        errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
