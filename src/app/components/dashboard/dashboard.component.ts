import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
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
  constructor(private authService: AuthService , private router :  Router) {}
  ngOnInit(): void {
    // Subscribe to the userRole$ observable
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });

    // Load the user role on component initialization
    this.authService.loadUserRole();
  }
  protected readonly Role = Role;


  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        // Remove tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.authService.clearUserRole(); // Clear the user role
        // Redirect to the login page
        this.router.navigate(['/app/login']).then(() => {
          console.log('Logout successful. Redirected to login page.');
        });
      },
      error: (err) => {
        console.error('Logout failed:', err);
      },
    });
  }

}
