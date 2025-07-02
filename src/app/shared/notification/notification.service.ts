import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationData | null>();
  notifications$ = this.notificationSubject.asObservable();

  constructor() {}

  show(notification: NotificationData): void {
    this.notificationSubject.next(notification);
  }

  success(title: string, message: string, duration?: number): void {
    this.show({
      title,
      message,
      type: 'success',
      duration
    });
  }

  error(title: string, message: string, duration?: number): void {
    this.show({
      title,
      message,
      type: 'error',
      duration
    });
  }

  warning(title: string, message: string, duration?: number): void {
    this.show({
      title,
      message,
      type: 'warning',
      duration
    });
  }

  info(title: string, message: string, duration?: number): void {
    this.show({
      title,
      message,
      type: 'info',
      duration
    });
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
}