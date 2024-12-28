import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ToastComponent} from "../toast/toast.component";
import {ToastServiceService} from "../../core/services/toast-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    ToastComponent,
  ],
  templateUrl: './regisitration-form.component.html',
  styleUrls: ['./regisitration-form.component.css']
})
export class RegistrationFormComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder , private router: Router , private toastService: ToastServiceService) {
    this.signupForm = this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      retypePassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator() });
  }


  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const retypePassword = form.get('retypePassword')?.value;
      return password && retypePassword && password !== retypePassword
        ? { passwordMismatch: true }
        : null;
    };
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;  // Show the spinner and disable the button
      this.toastService.showToast('Processing registration...', 'info');
      setTimeout(() => {
        console.log(this.signupForm.value);
        this.isLoading = false;
        this.toastService.showToast('Registration successful!', 'success');
        this.signupForm.reset();
        this.router.navigate(['/app/email-confirmation']).then(r => {
          if (r) {
            console.log('Navigation to email confirmation page was successful!');
            this.signupForm.reset();  // Example of resetting the form after successful navigation
          } else {
            console.error('Navigation to email confirmation page failed.');
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });}, 1000 * 3);
    } else {
      this.markFormGroupTouched(this.signupForm);
    }
  }
  signInWithGoogle(): void {
    this.toastService.showToast('Google sign-in feature coming soon!', 'info');
    console.log('Sign in with Google clicked');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
