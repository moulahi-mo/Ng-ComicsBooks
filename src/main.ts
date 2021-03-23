import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // waiting for angular to load bootstrapping and then only loading service worker
  .then(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register('ngsw-worker.js', { scope: '/' })
        .then(function () {})
        .catch(function (err) {
          console.log(err);
        });
    }
  })
  .catch((err) => console.log(err));
