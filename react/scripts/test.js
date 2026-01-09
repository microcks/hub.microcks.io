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
import concurrently from 'concurrently';

const args = process.argv.slice(2);

let commands = ['npm:test:unit', 'npm:test:e2e'];

if (args.includes('--coverage')) {
  commands = commands.map(command => `${command} -- --coverage`);
}

const { result } = concurrently(commands, {
  prefixColors: 'auto',
  maxProcesses: 1,
});

result.then(
  () => process.exit(0),
  () => process.exit(1),
);
