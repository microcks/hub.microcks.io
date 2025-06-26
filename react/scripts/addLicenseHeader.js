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

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Entête de licence à ajouter
const licenseHeader = `/*
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
 */`;

const files = process.argv.slice(2);

files.forEach(file => {
  const content = readFileSync(file, { encoding: 'utf-8' });

  if (!content.startsWith(licenseHeader)) {
    const newContent = `${licenseHeader}\n\n${content}`;
    writeFileSync(file, newContent, { encoding: 'utf-8' });

    execSync(`git add ${file}`);
    console.info(`Entête ajoutée dans ${file}`);
  }
});
