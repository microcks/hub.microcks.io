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

import { spawnSync } from 'node:child_process';
import { platform } from 'node:process';

const runCommand = (cmd, args = []) => {
  console.info(`> ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, { cwd: process.cwd(), stdio: 'inherit', shell: platform === 'win32' });
  if (result.status !== 0) {
    throw result;
  }
};

const main = async () => {
  const args = process.argv.slice(2);

  let playwrightArgs = [...args];

  if (args.indexOf('--watch') !== -1) {
    const filteredArgs = args.filter(a => a !== '--watch');
    runCommand('npx', [
      'nodemon',
      '--watch',
      './tests/',
      '--ext',
      'js,jx,ts,tsx',
      '--exec',
      ['node', 'scripts/playwright.js', ...filteredArgs].join(' '),
    ]);
    return;
  }

  if (playwrightArgs.indexOf('--coverage') !== -1) {
    process.env.ENABLED_COVERAGE = 'true';
    playwrightArgs = playwrightArgs.filter(p => p !== '--coverage');
  }

  runCommand('npx', ['playwright', ...playwrightArgs]);
};

main().catch(e => process.exit(e.status));
