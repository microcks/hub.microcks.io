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
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIPackage, APIVersion } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private rootUrl: string = '/api';

  constructor(private http: HttpClient) {}

  public getPackages(): Observable<APIPackage[]> {
    return this.http.get<APIPackage[]>(this.rootUrl + '/mocks');
  }

  public getPackage(name: string): Observable<APIPackage> {
    return this.http.get<APIPackage>(this.rootUrl + '/mocks/' + name);
  }

  public getLatestAPIVersions(packageName: string): Observable<APIVersion[]> {
    return this.http.get<APIVersion[]>(
      this.rootUrl + '/mocks/' + packageName + '/apis'
    );
  }

  public getAPIVersion(
    packageName: string,
    apiVersionName: string
  ): Observable<APIVersion> {
    return this.http.get<APIVersion>(
      this.rootUrl + '/mocks/' + packageName + '/apis/' + apiVersionName
    );
  }
}
