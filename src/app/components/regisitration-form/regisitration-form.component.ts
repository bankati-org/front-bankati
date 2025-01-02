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
import { RegistrationService } from '../../service/registration.service';
import {RegistrationDto} from "../../model/Registration-dto";
import {TermsOfServiceComponent} from "../terms-of-service/terms-of-service.component";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    ToastComponent,
    TermsOfServiceComponent,
  ],
  templateUrl: './regisitration-form.component.html',
  styleUrls: ['./regisitration-form.component.css']
})
export class RegistrationFormComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  showTermsModal = false;
  uploadedImage: string | null = null;
  isHovered = false;  // Used to track hover state


  // Trigger file input when the button is clicked
  uploadFile(): void {
    document.getElementById('fileInput')?.click();
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }




  openTermsModal(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    // Only show modal if trying to check the box
    if (checkbox.checked) {
      event.preventDefault(); // Prevent immediate checking
      this.showTermsModal = true;
    }
  }

  acceptTerms() {
    this.signupForm.get('terms')?.setValue(true);
    this.showTermsModal = false;
  }

  closeTermsModal() {
    this.signupForm.get('terms')?.setValue(false);
    this.showTermsModal = false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastServiceService,
    private registrationService: RegistrationService
  ) {
    this.signupForm = this.fb.group({
      cin: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z]{2}[0-9]{6}$|^[0-9]{8}$')
      ]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
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
      this.isLoading = true;
      this.toastService.showToast('Processing registration...', 'info');

      // Add a delay of 3 seconds (3000ms)
      setTimeout(() => {
        const registrationDto: RegistrationDto = this.signupForm.value;
        registrationDto.phoneNumber = '+212' + registrationDto.phoneNumber;

        this.registrationService.registerUser(registrationDto).subscribe({
          next: (response) => {
            console.log(response)

            this.isLoading = false;
            this.toastService.showToast(`Registration successful! Welcome ${response.data.email}`, 'success');
            this.signupForm.reset();
            this.router.navigate(['/app/email-confirmation'], { queryParams: { email: response.data.email } });
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error occurred:', err);
            // Show the error message from the backend
            const errorMessage = err.error?.message || 'Registration failed. Please try again.';
            this.toastService.showToast(errorMessage, 'error');
          }
        });
      }, 3000); // Wait 3 seconds before sending the request
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
