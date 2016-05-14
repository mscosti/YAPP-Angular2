import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MainComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

if (environment.production) {
  enableProdMode();
}

bootstrap(MainComponent, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  HTTP_PROVIDERS,
  defaultFirebase('https://mc-test-angular2.firebaseio.com')
]);
