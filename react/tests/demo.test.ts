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

import { expect } from '@playwright/test';
import { describe, it } from './fixture/playwright.fixture';

describe('Demo Test Suite', () => {
  it('should load the homepage and check title', async ({ page }) => {
    await page.goto('/');
    const title = page.getByRole('heading', { name: 'Welcome to hub.microcks.io', level: 1 });

    await expect(title).toBeVisible();
  });
});
