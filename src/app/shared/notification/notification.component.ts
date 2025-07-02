import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() duration: number = 5000; // Default duration in milliseconds
  
  isVisible: boolean = false;
  private timeout: any;
  private subscription: Subscription;
  
  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.notifications$.subscribe(notification => {
      if (notification) {
        this.title = notification.title;
        this.message = notification.message;
        this.type = notification.type;
        this.duration = notification.duration || this.duration;
        this.show();
      }
    });
  }
  
  ngOnInit(): void {}
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
  
  show(): void {
    this.isVisible = true;
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    if (this.duration > 0) {
      this.timeout = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }
  
  close(): void {
    this.isVisible = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}