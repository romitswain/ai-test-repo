import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check if there's a saved username in localStorage
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        rememberMe: true
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;
      
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // In a real app, you would call an authentication service here
      console.log('Login attempt:', { username, password });
      
      // For demo purposes, navigate to user details page
      this.router.navigate(['/user-details']);
    }
  }
}