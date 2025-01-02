import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationService} from "../../service/verification.service";
import {ToastServiceService} from "../../core/services/toast-service.service";

@Component({
  selector: 'app-phone-confirmation',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        ReactiveFormsModule
    ],
  templateUrl: './phone-confirmation.component.html',
  styleUrl: './phone-confirmation.component.css'
})
export class PhoneConfirmationComponent {
  phone?: string;
  isLoading: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private verificationService: VerificationService,
    private toastService: ToastServiceService ,
    private router: Router
  ) {
    this.form = this.fb.group({
      digits: this.fb.array(Array(6).fill('').map(() => ['']))
    });
  }

  get digits(): FormArray {
    return this.form.get('digits') as FormArray;
  }

  get verificationCode(): string {
    return this.digits.value.join('');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'];
    });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value ;

    // Keep only alphanumeric characters
    value = value.replace(/[^A-Za-z0-9]/g, '');

    // Keep only the first character
    if (value.length > 1) {
      value = value.charAt(0);
    }

    // Update the form control with the cleaned value
    this.digits.at(index).setValue(value);

    // Move to next input if we have a value
    if (value && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const previousInput = input.previousElementSibling as HTMLInputElement;
    const nextInput = input.nextElementSibling as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && previousInput) {
        event.preventDefault();
        previousInput.focus();
        previousInput.value = '';
        this.digits.at(index - 1).setValue('');
      }
      return;
    }

    if (event.key === 'ArrowLeft' && previousInput) {
      event.preventDefault();
      previousInput.focus();
      return;
    }

    if (event.key === 'ArrowRight' && nextInput) {
      event.preventDefault();
      nextInput.focus();
      return;
    }

    const allowedKeys = ['Tab', 'ArrowLeft', 'ArrowRight', 'Backspace'];
    const isAlphanumeric = /^[a-zA-Z0-9]$/.test(event.key);

    if (!isAlphanumeric && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text');
    const chars = clipboardData?.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).split('');

    if (chars) {
      chars.forEach((char, index) => {
        if (index < 6) {
          this.digits.at(index).setValue(char);
        }
      });
    }
  }

  isCodeComplete(): boolean {
    return this.digits.value.every((code: string | any[]) => code.length === 1);
  }

  verifyCode(): void {
    console.log(this.digits.value)
    if (this.phone && this.isCodeComplete()) {
      this.isLoading = true;
      this.toastService.showToast('Verifying code...', 'info');

      setTimeout(() => {
        if (this.phone) {
          this.verificationService.verifyPhone(this.phone, this.verificationCode).subscribe({
            next: (response) => {
              this.isLoading = false;
              this.toastService.showToast('Email verified successfully!', 'success');
              },
            error: (err) => {
              this.isLoading = false;
              console.error('Error occurred:', err); // Log the entire error
              console.error('Error details:', err.error); // Log the body of the error response
              const errorMessage = err.error?.message || 'Verification failed. Please try again.';
              this.toastService.showToast(errorMessage, 'error');
            }
          });
        } else {
          this.toastService.showToast('Email is required.', 'error');
        }
      }, 3000);
    }
  }

}
