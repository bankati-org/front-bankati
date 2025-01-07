import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../model/UserResponse";
import {ProfileService} from "../../service/profile.service";
import {ApiResponse} from "../../model/ApiResponse";
import {NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: UserResponse | null = null; // Holds the user profile data
  errorMessage: string | null = null; // Holds error messages
  isLoading: boolean = true; // Tracks loading state

  constructor(private userProfileService: ProfileService , private authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response.data; // Set the user profile data
        this.isLoading = false; // Loading complete
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch user profile. Please try again later.'; // Set error message
        this.isLoading = false; // Loading complete
        console.error('Error fetching profile:', err);
      },
    });
  }

}

