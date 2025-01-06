import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {NgIf} from "@angular/common";
import {Role} from "../../enum/role";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userRole: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // Subscribe to the userRole$ observable
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    // Load the user role on component initialization
    this.authService.loadUserRole();
  }
  protected readonly Role = Role;
}
