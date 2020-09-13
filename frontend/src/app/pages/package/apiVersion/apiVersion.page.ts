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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import copy from 'copy-to-clipboard';

import { PackagesService } from 'src/app/services/packages.service';
import { APIPackage, APIVersion, APISummary } from 'src/app/models/package.model';

import { markdownConverter } from 'src/app/components/markdown';

// Thanks to https://github.com/onokumus/metismenu/issues/110#issuecomment-317254128
//import * as $ from 'jquery';
declare let $: any;

@Component({
  selector: 'apiVersion-page',
  templateUrl: './apiVersion.page.html',
  styleUrls: ['./apiVersion.page.css']
})
export class APIVersionPageComponent implements OnInit {

  package: Observable<APIPackage>;
  packageAPIVersion: Observable<APIVersion>;
  resolvedPackage: APIPackage;
  resolvedPackageAPI: APISummary;
  resolvedAPIVersion: APIVersion;

  guiCommandStatus: string = "Copy to Clipboard";
  cliCommandStatus: string = "Copy to Clipboard";

  constructor(private packagesSvc: PackagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.package = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.packagesSvc.getPackage(params.get('packageId')))
    );
    this.packageAPIVersion = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.packagesSvc.getAPIVersion(params.get('packageId'), params.get('apiVersionId')))
    );

    this.package.subscribe( result => {
      this.resolvedPackage = result;
      this.packageAPIVersion.subscribe( apiVersion => {
        this.resolvedPackage.apis.forEach(api => {
          if (api.name === apiVersion.id) {
            this.resolvedPackageAPI = api;
          }
        });
      });
    });
    this.packageAPIVersion.subscribe (result => {
      this.resolvedAPIVersion = result;
    });
  }

  ngAfterViewInit() {
    (<any>$('[data-toggle="tooltip"]')).tooltip();
  }

  renderDescription(): string {
    return markdownConverter.makeHtml(this.resolvedAPIVersion.description);
  }

  renderCapabilityLevel(): string {
    if ("Full Mocks" === this.resolvedAPIVersion.capabilityLevel) {
      return "/assets/images/mocks-level-2.svg"
    } else if ("Mocks + Assertions" === this.resolvedAPIVersion.capabilityLevel) {
      return "/assets/images/mocks-level-2.svg"
    }
    return "/assets/images/mocks-level-1.svg"
  }

  onModalEnter(): void {
    (<any>$('[data-toggle="tooltip"]')).tooltip();
  }

  getImportAPICommand(): string {
    return `microcks-cli importAPI ${this.resolvedPackage.name}:${this.resolvedAPIVersion.name} \ --microcksURL=http://localhost:8080/api/ \ --keycloakClientId=microcks-serviceaccount \ --keycloakClientSecret=7deb71e8-8c80-4376-95ad-00a399ee3ca1 \ --insecure --verbose`;
  }

  copyToClipboard(command: string, event: Event): void {
    event.preventDefault();
    copy(command);
    (<any>$(event.currentTarget)).attr('data-original-title', 'Copied').tooltip('show');
  };

  onCopyEnter(event: Event): void {
    (<any>$(event.currentTarget)).attr('data-original-title', 'Copy to Clipboard').tooltip('show');
  }
}