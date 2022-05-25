import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  if (environment.ga_tracking_id != null) {
    let ga_id = environment.ga_tracking_id // google analytics id
      
    document.write(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga_id}"></script>`);

    const script = document.createElement('script');
    script.innerHTML = `
        // Google Analytics
        window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${ga_id}', {
              'linker': {
                'domains': ['hub.microcks.io']
              },
              send_page_view: false
            });
    `;
    document.head.appendChild(script);
  }

  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
