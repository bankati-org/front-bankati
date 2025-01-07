import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { AuthService } from '../../service/auth.service';
import { ToastServiceService } from '../../core/services/toast-service.service';
import { UserAdminRequestDto, UserAgentRequestDto } from '../../model/UserRequest';

@Component({
  selector: 'app-add-client-by-admin',
  standalone: true,
  imports: [
      NgIf,
      NgOptimizedImage,
      ReactiveFormsModule,
      TermsOfServiceComponent,
      NgStyle
    ],
  templateUrl: './add-client-by-admin.component.html',
  styleUrl: './add-client-by-admin.component.css'
})
export class AddClientByAdminComponent {
signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastServiceService,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      cin: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{2}[0-9]{6}$|^[0-9]{8}$'),
        ],
      ],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.toastService.showToast('Processing registration...', 'info');

      const registrationDto: UserAdminRequestDto = this.signupForm.value;
      console.log(registrationDto);

      this.authService.registerClientByAdmin(registrationDto).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.showToast(
            `Client registration successful!`,
            'success'
          );
          this.signupForm.reset();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error occurred:', err);
          const errorMessage =
            err.error?.message || 'Agent registration failed. Please try again.';
          this.toastService.showToast(errorMessage, 'error');
        },
      });
    } else {
      this.markFormGroupTouched(this.signupForm);
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
}
