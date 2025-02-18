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
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

// Thanks to https://github.com/onokumus/metismenu/issues/110#issuecomment-317254128
//import * as $ from 'jquery';
declare let $: any;

@Component({
  selector: 'header-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements OnInit {
  searchValue: string = '';

  ngOnInit() {}

  clearSearchValue(): void {
    this.searchValue = '';
  }

  @HostListener('window:scroll', ['$event']) // For window scroll events.
  onScroll(event: any) {
    // Do some stuff here when the window is scrolled.
    const verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    //console.log("Vertical Offset: " + verticalOffset);
    if (verticalOffset > 30) {
      (<any>$('.mh-header-bar')).addClass('scrolled');
    } else {
      (<any>$('.mh-header-bar')).removeClass('scrolled');
    }
  }
}
