import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/header/headers.interceptor';
import { errorInterceptor } from './core/interceptors/Error/error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/translate';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideClientHydration(withEventReplay())
    , provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorInterceptor, loadingInterceptor]))
    , provideAnimations(),
  provideToastr(),
  importProvidersFrom(NgxSpinnerModule, TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })),
  ]
};
