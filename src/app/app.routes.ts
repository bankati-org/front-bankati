import { Routes } from '@angular/router';
import {RegistrationFormComponent} from "./components/regisitration-form/regisitration-form.component";
import {EmailConfirmationComponent} from "./components/email-confirmation/email-confirmation.component";
import {PhoneConfirmationComponent} from "./components/phone-confirmation/phone-confirmation.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {WalletComponent} from "./components/wallet/wallet.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CryptoWalletComponent} from "./components/crypto-wallet/crypto-wallet.component";
import {AddClientComponent} from "./components/add-client/add-client.component";


export const routes: Routes = [
  {
    path: 'app', // Parent path
    children: [
      { path: 'register', component: RegistrationFormComponent }, // Child path
      { path: 'email-confirmation', component: EmailConfirmationComponent }, // Child path for email confirmation
      {path : 'phone-confirmation' ,  component : PhoneConfirmationComponent},
      {path: 'homepage', component: LandingPageComponent},
      {path : 'login' ,  component : LoginFormComponent} ,
      {path : 'phone-confirmation' ,  component : PhoneConfirmationComponent},
      {path : 'wallet' , component : WalletComponent} ,
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' }, // Default child route
          { path: 'profile', component: ProfileComponent },
          { path: 'wallet', component: WalletComponent },
          { path: 'add-client', component: AddClientComponent },
        ]
      },
    ]
  }
];
