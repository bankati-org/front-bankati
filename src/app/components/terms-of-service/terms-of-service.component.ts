import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})
export class TermsOfServiceComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  closeTermsModal() {
    this.closeModal.emit();
  }

  acceptTerms() {
    this.accept.emit();
  }
}
