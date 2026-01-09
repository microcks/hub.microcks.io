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

import type { APIVersion } from '@Api/microcksHub';

export const apiVersion200: APIVersion = {
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
};

export const apiVersions200: APIVersion[] = [apiVersion200];
