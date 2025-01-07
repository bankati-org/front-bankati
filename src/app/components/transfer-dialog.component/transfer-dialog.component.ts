// transfer-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-transfer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="min-w-[400px] p-6">
      <h2 class="text-2xl font-semibold text-slate-800 mb-6">New Transfer</h2>

      <form [formGroup]="transferForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- From Currency -->
        <div class="form-field">
          <mat-form-field class="w-full">
            <mat-label>From Currency</mat-label>
            <mat-select formControlName="fromCurrency">
              <mat-option *ngFor="let currency of currencies" [value]="currency">
                {{currency}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="transferForm.get('fromCurrency')?.hasError('required')">
              From currency is required
            </mat-error>
          </mat-form-field>
        </div>

        <!-- To Currency -->
        <div class="form-field">
          <mat-form-field class="w-full">
            <mat-label>To Currency</mat-label>
            <mat-select formControlName="toCurrency">
              <mat-option *ngFor="let currency of currencies" [value]="currency">
                {{currency}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="transferForm.get('toCurrency')?.hasError('required')">
              To currency is required
            </mat-error>
          </mat-form-field>
        </div>

        <!-- Amount -->
        <div class="form-field">
          <mat-form-field class="w-full">
            <mat-label>Amount</mat-label>
            <input matInput type="number" formControlName="amount" min="0">
            <mat-error *ngIf="transferForm.get('amount')?.hasError('required')">
              Amount is required
            </mat-error>
            <mat-error *ngIf="transferForm.get('amount')?.hasError('min')">
              Amount must be greater than 0
            </mat-error>
          </mat-form-field>
        </div>

        <!-- Recipient ID -->
        <div class="form-field">
          <mat-form-field class="w-full">
            <mat-label>Recipient ID</mat-label>
            <input matInput formControlName="toUserId">
            <mat-error *ngIf="transferForm.get('toUserId')?.hasError('required')">
              Recipient ID is required
            </mat-error>
          </mat-form-field>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            mat-button
            type="button"
            (click)="onCancel()"
            class="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="transferForm.invalid || isLoading"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
            <div class="flex items-center">
              <mat-spinner *ngIf="isLoading" [diameter]="20" class="mr-2"></mat-spinner>
              Transfer
            </div>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .form-field {
      @apply mb-4;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class TransferDialogComponent implements OnInit {
  transferForm: FormGroup;
  isLoading = false;
  currencies = ['USD', 'EUR', 'GBP', 'MAD'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransferDialogComponent>
  ) {
    this.transferForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      toUserId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const formValue = this.transferForm.value;
      const transferData = {
        ...formValue,
        fromUserId: '1' // Replace with actual user ID from your auth service
      };

      // Close dialog with form data
      this.dialogRef.close(transferData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
