import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ToastServiceService} from "../../core/services/toast-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastServiceService
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]], // Email or username
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.toastService.showToast('Logging in...', 'info');

      const loginRequest = this.loginForm.value;

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          // Store tokens in local storage
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          this.toastService.showToast(response.message, 'success');
          this.router.navigate(['/app/profile']).then(() => {
            console.log('Navigation to root page successful!');
            this.loginForm.reset(); // Reset the form after successful navigation
          });},
        error: (err) => {
          this.isLoading = false;
          console.error('Error occurred:', err);
          const errorMessage = err.error?.message || 'Login failed. Please try again.';
          this.toastService.showToast(errorMessage, 'error');
        },
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  signInWithGoogle(): void {
    this.toastService.showToast('Google sign-in feature coming soon!', 'info');
    console.log('Sign in with Google clicked');
  }
}
