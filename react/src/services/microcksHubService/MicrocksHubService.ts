/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable class-methods-use-this */
import {
  type APIPackage,
  type APIPackageFull,
  type APIVersion,
  getAPIVersion,
  getAPIVersions,
  getPackage,
  getPackages,
} from '@Api/microcksHub';
import type { MicrocksHubServiceInterface } from './MicrocksHubServiceInterface';

export class MicrocksHubService implements MicrocksHubServiceInterface {
  getPackages(): Promise<APIPackage[]> {
    return getPackages();
  }

  getPackageDetails(packageName: string): Promise<APIPackageFull> {
    return getPackage(packageName);
  }

  getAPIVersions(packageName: string): Promise<APIVersion[]> {
    return getAPIVersions(packageName);
  }

  getAPIVersionDetails(packageName: string, apiVersion: string): Promise<APIVersion> {
    return getAPIVersion(packageName, apiVersion);
  }
}
