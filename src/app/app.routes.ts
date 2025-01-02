import { Routes } from '@angular/router';
import {RegistrationFormComponent} from "./components/regisitration-form/regisitration-form.component";
import {EmailConfirmationComponent} from "./components/email-confirmation/email-confirmation.component";
import {PhoneConfirmationComponent} from "./components/phone-confirmation/phone-confirmation.component";

export const routes: Routes = [
  {
    path: 'app', // Parent path
    children: [
      { path: 'register', component: RegistrationFormComponent }, // Child path
      { path: 'email-confirmation', component: EmailConfirmationComponent }, // Child path for email confirmation
      {path : 'phone-confirmation' ,  component : PhoneConfirmationComponent}
    ]
  }
];
