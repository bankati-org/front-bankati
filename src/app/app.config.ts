import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {authInterceptor} from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync() ,
    provideHttpClient(
      withInterceptors([authInterceptor]) // Register the interceptor here
    ),
    provideToastr({
      timeOut: 3000, // Toast will disappear after 3 seconds
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      closeButton : true,

    }),
  ]
};
