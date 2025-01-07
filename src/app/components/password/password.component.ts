import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastServiceService} from "../../core/services/toast-service.service";

@Component({
  selector: 'app-password',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  PassForm: FormGroup;
  isLoading = false;
  email: string | null = null;

  constructor(private fb: FormBuilder ,
              private authService: AuthService,
              private router: Router,
              private toastService: ToastServiceService ,
              private route: ActivatedRoute // Inject ActivatedRoute


) {
    this.PassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      retypePassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });

    // Retrieve the email from query parameters
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const retypePassword = formGroup.get('retypePassword')?.value;
    return password === retypePassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.PassForm.valid && this.email) {
      this.isLoading = true;

      const newPassword = this.PassForm.get('password')?.value;

      this.authService.changePassword(this.email, newPassword).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.showToast(response.data , "success");
          this.router.navigate(['/app/login']); // Redirect to a desired route
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error occurred:', error);
          const errorMessage = error.error?.message || 'password reset faild try again';
          this.toastService.showToast(errorMessage, 'error');
        },
      });
    }
  }
}
