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

// eslint-disable-next-line import/no-extraneous-dependencies
import { delay, http, HttpResponse } from 'msw';
import { package200, packages200 } from '../fixtures/packagesFixtures';

export const getPackages200 = http.get('**/api/mocks', async () => {
  await delay();

  return HttpResponse.json(packages200);
});

export const getPackage200 = http.get('**/api/mocks/:packageName', async () => {
  await delay();

  return HttpResponse.json(package200);
});
