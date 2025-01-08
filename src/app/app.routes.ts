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
import { AddAgentComponent } from './components/add-agent/add-agent.component';
import { AddClientByAdminComponent } from './components/add-client-by-admin/add-client-by-admin.component';
import {PasswordComponent} from "./components/password/password.component";
import {CreanceComponent} from "./components/creance/creance.component";


export const routes: Routes = [
  {
    path: '', // Parent path
    children: [
      { path: 'register', component: RegistrationFormComponent }, // Child path
      { path: 'email-confirmation', component: EmailConfirmationComponent }, // Child path for email confirmation
      {path : 'phone-confirmation' ,  component : PhoneConfirmationComponent},
      {path: '', component: LandingPageComponent},
      {path : 'login' ,  component : LoginFormComponent} ,
      {path : 'wallet' , component : WalletComponent} ,
      {path:'change-password' , component : PasswordComponent},
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'wallet', component: WalletComponent },
          { path: 'agent/add-client', component: AddClientComponent },
          {path: 'admin/add-client', component: AddClientByAdminComponent},
          {path: 'admin/add-agent', component: AddAgentComponent},
          {path:'crypto-wallet',component: CryptoWalletComponent},
          {path:'creance',component: CreanceComponent},
          { path: '', redirectTo: 'profile', pathMatch: 'full' } // Default child route

        ]
      },

    ]
  }
];
