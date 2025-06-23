import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];