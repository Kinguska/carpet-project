import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: 
    [provideRouter(routes), provideAnimationsAsync(), 
      importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))), 
      importProvidersFrom(provideAuth(() => getAuth())), 
      importProvidersFrom(provideFirestore(() => getFirestore())), 
      importProvidersFrom(provideDatabase(() => getDatabase())), 
      importProvidersFrom(provideStorage(() => getStorage())),
      provideHttpClient(),
      importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    ]
};
