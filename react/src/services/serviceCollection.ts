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

import { ContainerModule } from 'inversify';
import { MicrocksHubService } from './microcksHubService/MicrocksHubService';
import type { MicrocksHubServiceInterface } from './microcksHubService/MicrocksHubServiceInterface';
import { SERVICE_IDENTIFIERS } from './serviceIdentifiers';

export const serviceCollection = new ContainerModule(options => {
  options
    .bind<MicrocksHubServiceInterface>(SERVICE_IDENTIFIERS.MicrocksHubService)
    .toDynamicValue(() => new MicrocksHubService())
    .inSingletonScope();
});
