import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'hello-world', component: HelloWorldComponent },
  { path: '', redirectTo: '/hello-world', pathMatch: 'full' }
];
