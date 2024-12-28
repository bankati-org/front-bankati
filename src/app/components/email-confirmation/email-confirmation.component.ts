import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.css'
})
export class EmailConfirmationComponent {

}
