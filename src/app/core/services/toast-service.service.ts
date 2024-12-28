import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  constructor(private toastr: ToastrService) {}

  showToast(message: string, status: 'success' | 'error' | 'info' | 'warning' = 'info') {
    switch (status) {
      case 'success':
        this.toastr.success(message, 'Success');
        break;
      case 'error':
        this.toastr.error(message, 'Error');
        break;
      case 'warning':
        this.toastr.warning(message, 'Warning');
        break;
      default:
        this.toastr.info(message, 'Info');
    }
  }
}
