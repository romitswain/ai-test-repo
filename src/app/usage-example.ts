import { Component } from '@angular/core';
import { NotificationService } from './shared/notification/notification.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showSuccessNotification()">Show Success</button>
    <button (click)="showErrorNotification()">Show Error</button>
    <button (click)="showWarningNotification()">Show Warning</button>
    <button (click)="showInfoNotification()">Show Info</button>
  `
})
export class ExampleComponent {
  constructor(private notificationService: NotificationService) {}

  showSuccessNotification(): void {
    this.notificationService.success(
      'Success!', 
      'Your action was completed successfully.'
    );
  }

  showErrorNotification(): void {
    this.notificationService.error(
      'Error!', 
      'Something went wrong. Please try again.'
    );
  }

  showWarningNotification(): void {
    this.notificationService.warning(
      'Warning!', 
      'This action might have consequences.'
    );
  }

  showInfoNotification(): void {
    this.notificationService.info(
      'Information', 
      'Here is some important information for you.'
    );
  }
}