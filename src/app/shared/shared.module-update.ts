import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { PopupComponent } from './popup/popup.component';
import { PopupContentDirective } from './popup/popup-content.directive';
import { PopupService } from './popup/popup.service';

@NgModule({
  declarations: [
    NotificationComponent,
    PopupComponent,
    PopupContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationComponent,
    PopupComponent,
    PopupContentDirective
  ],
  providers: [
    NotificationService,
    PopupService
  ]
})
export class SharedModule { }