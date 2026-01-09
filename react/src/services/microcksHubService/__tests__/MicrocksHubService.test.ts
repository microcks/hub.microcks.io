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

import type { APIPackage, APIPackageFull, APIVersion } from '@Api/microcksHub';
import { getAPIVersion200, getAPIVersions200 } from '@Mocks/handlers/apiVersionsHandlers';
import { getPackage200, getPackages200 } from '@Mocks/handlers/packagesHandlers';
import { server } from '@Mocks/server';
import { describe, it, expect } from 'vitest';
import { MicrocksHubService } from '../MicrocksHubService';

describe('MicrocksHubService', () => {
  it('should fetch and return all API packages', async () => {
    server.use(getPackages200);

    const microcksHubService = new MicrocksHubService();

    const response = await microcksHubService.getPackages();

    expect(response).toHaveLength(1);
    expect(response[0]).toStrictEqual<APIPackage>({
      name: 'Sample API Package',
      displayName: 'Sample API Package',
      description: 'This is a sample API package for testing purposes.',
      categories: ['Banking'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      thumbUrl: '',
      apis: [
        {
          name: 'sample-api',
          currentVersion: '1.0.0',
          versions: [
            {
              name: '1.0.0',
              version: '1.0.0',
            },
          ],
        },
      ],
    });
  });

  it('should fetch and return package details', async () => {
    server.use(getPackage200);

    const microcksHubService = new MicrocksHubService();

    const response = await microcksHubService.getPackageDetails('foo');

    expect(response).toStrictEqual<APIPackageFull>({
      name: 'Sample API Package',
      displayName: 'Sample API Package',
      description: 'This is a sample API package for testing purposes.',
      categories: ['Banking'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      thumbUrl: '',
      apis: [
        {
          name: 'sample-api',
          currentVersion: '1.0.0',
          versions: [
            {
              name: '1.0.0',
              version: '1.0.0',
            },
          ],
        },
      ],
      longDescription: 'This is a long description of the Sample API Package for testing purposes.',
      imgUrl: '',
    });
  });

  it('should fetch and return API versions for a package', async () => {
    server.use(getAPIVersions200);

    const microcksHubService = new MicrocksHubService();

    const response = await microcksHubService.getAPIVersions('foo');

    expect(response).toHaveLength(1);
    expect(response[0]).toStrictEqual<APIVersion>({
      id: 'sample',
      name: '1.0.0',
      displayName: '1.0.0',
      version: '1.0.0',
      provider: 'Sample Provider',
      description: 'This is a sample API version for testing purposes.',
      imgUrl: '',
      thumbUrl: '',
      capabilityLevel: 'Incomplete Mocks',
      contracts: [
        {
          type: 'openapi',
        },
      ],
      maintainers: [
        {
          name: 'John Doe',
          email: 'john@doe.xx',
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      keywords: ['sample', 'api', 'test'],
      packageName: 'Sample API Package',
    });
  });

  it('should fetch and return API version details', async () => {
    server.use(getAPIVersion200);

    const microcksHubService = new MicrocksHubService();

    const response = await microcksHubService.getAPIVersionDetails('foo', 'bar');

    expect(response).toStrictEqual<APIVersion>({
      id: 'sample',
      name: '1.0.0',
      displayName: '1.0.0',
      version: '1.0.0',
      provider: 'Sample Provider',
      description: 'This is a sample API version for testing purposes.',
      imgUrl: '',
      thumbUrl: '',
      capabilityLevel: 'Incomplete Mocks',
      contracts: [
        {
          type: 'openapi',
        },
      ],
      maintainers: [
        {
          name: 'John Doe',
          email: 'john@doe.xx',
        },
      ],
      createdAt: '2024-01-01T00:00:00Z',
      keywords: ['sample', 'api', 'test'],
      packageName: 'Sample API Package',
    });
  });
});
