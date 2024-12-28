import {Component, Input} from '@angular/core';
import {ToastServiceService} from "../../core/services/toast-service.service";

type ToastStatus = 'success' | 'error' | 'warning' | 'info';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() set message(value: string) {
    if (value) {
      this.showToast(value, this.status);
    }
  }

  @Input() status: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(private toastService: ToastServiceService) {}

  private showToast(message: string, status: 'success' | 'error' | 'info' | 'warning') {
    this.toastService.showToast(message, status);
  }

}
