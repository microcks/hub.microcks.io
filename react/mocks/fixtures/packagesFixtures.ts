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

export const hubSectionPackages200: APIPackage[] = [
  {
    name: 'stripe-payments',
    displayName: 'Stripe Payments',
    description: 'Card and wallet payment APIs for online commerce.',
    categories: ['Banking'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    thumbUrl: '',
    apis: [
      {
        name: 'payments-api',
        currentVersion: '1.2.0',
        versions: [
          {
            name: '1.2.0',
            version: '1.2.0',
          },
          {
            name: '1.1.0',
            version: '1.1.0',
          },
        ],
      },
    ],
  },
  {
    name: 'cloud-events',
    displayName: 'Cloud Events',
    description: 'Cloud-native event APIs for distributed platforms.',
    categories: ['Cloud Provider'],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    thumbUrl: '',
    apis: [
      {
        name: 'events-api',
        currentVersion: '2.0.0',
        versions: [
          {
            name: '2.0.0',
            version: '2.0.0',
          },
        ],
      },
    ],
  },
  {
    name: 'banking-insights',
    displayName: 'Banking Insights',
    description: 'Analytics APIs for banking observability and reporting.',
    categories: ['Banking', 'Cloud Provider'],
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    thumbUrl: '',
    apis: [
      {
        name: 'analytics-api',
        currentVersion: '3.1.0',
        versions: [
          {
            name: '3.1.0',
            version: '3.1.0',
          },
        ],
      },
    ],
  },
];
