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
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PackagesService } from 'src/app/services/packages.service';
import { APIPackage } from 'src/app/models/package.model';

// Thanks to https://github.com/onokumus/metismenu/issues/110#issuecomment-317254128
//import * as $ from 'jquery';
declare let $: any;

const OTHER_CATEGORY = 'Other';
const IGNORED_PROVIDER_TAILS = [
  ', Inc.',
  ', Inc',
  ' Inc.',
  ' Inc',
  ', LLC',
  ' LLC',
];

const sanitizeProviderValue = (value) => {
  if (!value) {
    return value;
  }
  var providerTail = null;
  IGNORED_PROVIDER_TAILS.forEach((tail, index, array) => {
    if (value.endsWith(tail)) {
      providerTail = tail;
    }
  });
  if (providerTail) {
    return value.substring(0, value.indexOf(providerTail));
  }
  return value;
};

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePageComponent implements OnInit {
  categories: any = [];
  providers: any = [];
  packages: APIPackage[];
  maxProviders: number = 6;

  filterString: string;
  selectedCategory: string;
  selectedProviders: string[] = [];
  filteredPackages: APIPackage[];
  sortType: string;

  constructor(
    private packagesSvc: PackagesService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  ngAfterViewInit() {
    this.renderer.listen(
      parent.document.getElementById('search-input'),
      'keyup',
      (event) => {
        this.filterString = $('#search-input').val().toLowerCase();
        this.applyFilters();
        // Update browser URL.
        const queryParams: Params = { search: this.filterString };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
      }
    );
    this.renderer.listen(
      parent.document.getElementById('search-clear'),
      'click',
      (event) => {
        this.filterString = null;
        this.applyFilters();
        // Update browser URL.
        const queryParams: Params = { search: null };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
        });
      }
    );
  }

  getPackages(): void {
    this.packagesSvc.getPackages().subscribe((results) => {
      this.packages = results;
      this.filteredPackages = results;
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams['search']) {
          this.filterString = queryParams['search'];
          this.applyFilters();
        }
      });
      this.initializeAvailableCategories();
      this.initializeAvailableProviders();
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  unselectCategory(category: string): void {
    this.selectedCategory = null;
    this.applyFilters();
  }
  toggleProvider(provider: string): void {
    if (this.selectedProviders.indexOf(provider) != -1) {
      this.selectedProviders.splice(
        this.selectedProviders.indexOf(provider),
        1
      );
    } else {
      this.selectedProviders.push(provider);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredPackages = this.packages.filter((item, index, array) => {
      return (
        this.challengeFilterString(item) &&
        this.challengeSelectedCategory(item) &&
        this.challengeSelectedProviders(item)
      );
    });
  }
  challengeFilterString(item: APIPackage): boolean {
    if (this.filterString && this.filterString != null) {
      if (
        item.name.toLowerCase().indexOf(this.filterString) != -1 ||
        item.displayName.toLowerCase().indexOf(this.filterString) != -1
      ) {
        return true;
      }
      return false;
    }
    return true;
  }
  challengeSelectedCategory(item: APIPackage): boolean {
    if (this.selectedCategory && this.selectedCategory != null) {
      if (item.categories.indexOf(this.selectedCategory) != -1) {
        return true;
      }
      return false;
    }
    return true;
  }
  challengeSelectedProviders(item: APIPackage): boolean {
    if (this.selectedProviders && this.selectedProviders.length > 0) {
      return (
        this.selectedProviders.indexOf(sanitizeProviderValue(item.provider)) !=
        -1
      );
    }
    return true;
  }

  countFilteredPackagesForProvider(provider: string): number {
    return this.packages.filter((item, index, array) => {
      if (
        this.selectedCategory &&
        item.categories.indexOf(this.selectedCategory) != -1
      ) {
        return false;
      } else if (sanitizeProviderValue(item.provider) === provider) {
        return true;
      }
      return false;
    }).length;
  }
  countFilteredAPIs(): number {
    return this.filteredPackages.reduce((total, item) => {
      return total + item.apis.length;
    }, 0);
  }

  showAllProviders(): void {
    this.maxProviders = this.packages.length;
  }

  private initializeAvailableCategories(): void {
    var unsortedCategories = {};
    this.packages.forEach((apiPackage, index, packs) => {
      if (apiPackage.categories.length > 0) {
        apiPackage.categories.forEach((category, index, cats) => {
          if (!unsortedCategories[category]) {
            unsortedCategories[category] = [];
          }
          unsortedCategories[category].push(apiPackage);
        });
      } else {
        if (!unsortedCategories[OTHER_CATEGORY]) {
          unsortedCategories[OTHER_CATEGORY] = [];
        }
        unsortedCategories[OTHER_CATEGORY].push(apiPackage);
      }
    });
    this.categories = Object.keys(unsortedCategories).sort((cat1, cat2) => {
      if (cat1 === OTHER_CATEGORY) {
        return 1;
      }
      if (cat2 === OTHER_CATEGORY) {
        return -1;
      }
      return cat1.localeCompare(cat2);
    });
  }

  private initializeAvailableProviders(): void {
    var unsortedProviders = {};
    this.packages.forEach((apiPackage, index, packs) => {
      var provider = sanitizeProviderValue(apiPackage.provider);
      if (!unsortedProviders[provider]) {
        unsortedProviders[provider] = [];
      }
      unsortedProviders[provider].push(apiPackage);
    });
    this.providers = Object.keys(unsortedProviders).sort((pro1, pro2) => {
      return pro1.localeCompare(pro2);
    });
  }
}
