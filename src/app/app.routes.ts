import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LaneReportComponent } from './lane-report/lane-report.component';

export const routes: Routes = [
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'lane-report', component: LaneReportComponent },
  { path: '', redirectTo: '/user-details', pathMatch: 'full' }
];
