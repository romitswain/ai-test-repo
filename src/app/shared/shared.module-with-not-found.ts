import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { PopupComponent } from './popup/popup.component';
import { PopupContentDirective } from './popup/popup-content.directive';
import { PopupService } from './popup/popup.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NotificationComponent,
    PopupComponent,
    PopupContentDirective,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NotificationComponent,
    PopupComponent,
    PopupContentDirective,
    NotFoundComponent
  ],
  providers: [
    NotificationService,
    PopupService
  ]
})
export class SharedModule { }
