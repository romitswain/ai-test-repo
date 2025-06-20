import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, USA',
    role: 'Administrator',
    joinDate: '2023-01-15',
    lastLogin: '2023-06-20'
  };

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch user details from a service
  }
}
