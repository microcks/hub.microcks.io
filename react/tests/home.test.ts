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

import { getHubSectionPackages200 } from '@Mocks/handlers/packagesHandlers';
import { expect } from '@playwright/test';
import { describe, it } from './fixture/playwright.fixture';

describe('Home page', () => {
  it('should render the main home page sections', async ({ network, page }) => {
    network.use(getHubSectionPackages200);

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Welcome to hub.microcks.io', level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder('Search Packages')).toBeVisible();
    await expect(page.getByText('3 PACKAGES, 3 APIS')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CATEGORIES' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PROVIDER' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Details →' })).toHaveCount(3);
  });

  it('should filter packages with the search bar', async ({ network, page }) => {
    network.use(getHubSectionPackages200);

    await page.goto('/');

    await page.getByPlaceholder('Search Packages').fill('cloud');

    const detailsLinks = page.getByRole('link', { name: 'View Details →' });
    await expect(detailsLinks).toHaveCount(1);
    await expect(detailsLinks.first()).toHaveAttribute('href', '/package/cloud-events');

    await page.getByPlaceholder('Search Packages').fill('missing package');

    await expect(page.getByText('No APIs found matching your criteria.')).toBeVisible();
  });

  it('should filter packages with category and provider filters', async ({ network, page }) => {
    network.use(getHubSectionPackages200);

    await page.goto('/');

    await page.getByRole('checkbox', { name: 'Banking', exact: true }).check();

    await expect(page.getByRole('link', { name: 'View Details →' })).toHaveCount(2);

    await page.getByLabel('Stripe Payments (1)').check();

    const detailsLinks = page.getByRole('link', { name: 'View Details →' });
    await expect(detailsLinks).toHaveCount(1);
    await expect(detailsLinks.first()).toHaveAttribute('href', '/package/stripe-payments');
  });
});
