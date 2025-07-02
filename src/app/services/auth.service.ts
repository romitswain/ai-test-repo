import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // In a real application, this would validate credentials against a backend
    // For demo purposes, we'll just set isAuthenticated to true
    this.isAuthenticated = true;
    
    // Store authentication state in localStorage or sessionStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    
    return true;
  }

  logout(): void {
    // Clear authentication state
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Check if user is authenticated
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
