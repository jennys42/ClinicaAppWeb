import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    // provideHttpClient(withInterceptors([addTokenInterceptor]), withFetch()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),

  ]
};
