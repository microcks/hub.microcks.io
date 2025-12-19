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

import type { PlaywrightTestArgs, PlaywrightWorkerArgs, TestFixture } from '@playwright/test';
import { test } from '@playwright/test';
import { CoverageReport } from 'monocart-coverage-reports';
import { coverageOptions } from '../../mrc.e2e.config';

export const createTestWithCoverageFixture = (): [
  TestFixture<string, PlaywrightTestArgs & PlaywrightWorkerArgs>,
  { scope: 'test'; auto: true },
] => [
  async ({ page }, use) => {
    const isChromium = test.info().project.name === 'chromium';

    if (isChromium && coverageOptions.enabled) {
      await page.coverage.startJSCoverage({
        resetOnNavigation: false,
      });
    }

    await use('testWithCoverage');

    if (isChromium && coverageOptions.enabled) {
      const coverageList = await page.coverage.stopJSCoverage();
      const mcr = new CoverageReport(coverageOptions);
      await mcr.add(coverageList);
    }
  },
  {
    scope: 'test',
    auto: true,
  },
];
