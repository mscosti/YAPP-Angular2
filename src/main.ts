import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MainComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(MainComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://mc-test-angular2.firebaseio.com')
]);
