import { Routes } from '@angular/router';
import { CarrierReportComponent } from './carrier-report/carrier-report.component';

export const routes: Routes = [
  { path: 'carrier-report', component: CarrierReportComponent },
  { path: '', redirectTo: '/carrier-report', pathMatch: 'full' }
];
