import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { NgStyle } from '@angular/common';
import { ToastServiceService } from '../../core/services/toast-service.service';
import { AuthService } from '../../service/auth.service';
import { AgentAdminRequestDto } from '../../model/UserRequest';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';

@Component({
  selector: 'app-add-agent',
  standalone: true,imports: [
        NgIf,
        NgOptimizedImage,
        ReactiveFormsModule,
        TermsOfServiceComponent,
        NgStyle
      ],
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
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

      const registrationDto: AgentAdminRequestDto = this.signupForm.value;
      console.log(registrationDto);

      this.authService.registerAgentByAdmin(registrationDto).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.showToast(
            `Agent Registration successful!`,
            'success'
          );
          this.signupForm.reset();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error occurred:', err);
          const errorMessage =
            err.error?.message || 'Agent Registration failed. Please try again.';
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