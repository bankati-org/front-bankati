import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  clientName: string = 'Client name';
  clientEmail: string = 'email@email.com';
  protected readonly name = name;
}
