import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CanonicalService } from './services/canonical.service';

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideAppInitializer(() => {
      const canonicalService = inject(CanonicalService);
      canonicalService.init();
    })

  ]

};