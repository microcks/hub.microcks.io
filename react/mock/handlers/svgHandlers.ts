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

const CONTENT_TYPE = 'content-type';

const MINE_TYPE_SVG = 'image/svg+xml';

export const getSvg200 = http.get('*.svg', async () => {
  await delay();

  const svg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>';

  return HttpResponse.text(svg, { headers: [[CONTENT_TYPE, MINE_TYPE_SVG]] });
});
