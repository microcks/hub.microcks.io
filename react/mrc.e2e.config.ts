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

import { CoverageReportOptions } from 'monocart-coverage-reports';

export const coverageOptions: CoverageReportOptions = {
  enabled: process.env.CI ?? process.env.ENABLED_COVERAGE,
  name: 'Playwright Coverage Report',
  outputDir: './test-reports/e2e/coverage',
  baseDir: './src/',
  reports: [
    'text',
    'text-summary',
    ['html', { subdir: 'html-coverage' }],
    ['lcovonly', { file: 'lcov-coverage.info' }],
    ['cobertura', { file: 'cobertura-coverage.xml' }],
  ],
  sourceFilter: {
    '**/node_modules/**': false,
    '**/mocks/**': false,
    '**/*.{test,spec,steps}.{js,jsx,ts,tsx}': false,
    'vitest.setup.ts': false,
    '**/*.{js,jsx,ts,tsx}': true,
  },
  watermarks: {
    statements: [80, 90],
    branches: [70, 80],
    functions: [80, 90],
    lines: [80, 90],
    bytes: [80, 90],
  },
};
