import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user = {
    name: 'John Doe',
    role: 'Software Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    joinDate: 'January 15, 2023',
    lastLogin: 'Today at 9:30 AM'
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    
    // If we have a stored username, use it for the profile
    const username = this.authService.getUsername();
    if (username) {
      this.user.name = username;
    }
  }

  logout(): void {
    this.authService.logout();
    // Router navigation is handled in the auth service
  }
}