/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hub-microcks-io-frontend';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.setUpAnalytics();
  }

  setUpAnalytics() {
    if (environment.production && environment.ga_tracking_id != null) {
      let ga_id = environment.ga_tracking_id // google analytics id
      //console.log("Setup GA with " + ga_id);

      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          //console.log("Navigation end detected, calling gtag with " + event.urlAfterRedirects);
          gtag('config', '${ga_id}',
            {
              page_path: event.urlAfterRedirects
            }
          );
        });
    }
  }
}
