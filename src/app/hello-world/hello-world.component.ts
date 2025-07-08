import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {
  title = 'Hello World';
  message = 'Welcome to my Angular application!';
  messages: string[] = [
    'Welcome to my Angular application!',
    'Angular is awesome!',
    'Building with Angular is fun!',
    'Hello from the other side!'
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeMessage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    this.message = this.messages[this.currentIndex];
  }
}
