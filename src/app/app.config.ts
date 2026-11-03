import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { CanonicalService } from './services/canonical.service';

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    // scrollPositionRestoration: 'top' → footer se Terms/Privacy kholne par
    // page upar se start hoga (neeche scroll nahi rahega)
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),

    provideAppInitializer(() => {
      const canonicalService = inject(CanonicalService);
      canonicalService.init();
    })

  ]

};