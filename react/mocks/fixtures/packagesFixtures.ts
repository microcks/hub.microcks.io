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

import type { APIPackage, APIPackageFull } from '@Api/microcksHub';

const basePackage: APIPackage = {
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
};

export const package200: APIPackageFull = {
  ...basePackage,
  longDescription: 'This is a long description of the Sample API Package for testing purposes.',
  imgUrl: '',
};

export const packages200: APIPackage[] = [basePackage];
