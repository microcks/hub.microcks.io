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

import { ServiceContext } from '@/App/providers/ServiceProvider/ServiceContext';
import type { ServiceIdentifier } from 'inversify';
import { useContext } from 'react';

/**
 * Resolves a service instance from the Inversify container exposed by {@link ServiceProvider}.
 *
 * Use this hook inside React components to access an already registered dependency
 * without importing the container directly. It throws when called outside of the
 * provider tree so missing wiring fails fast during development and tests.
 *
 * @template T The expected service type returned by the container.
 * @param serviceIdentifier The Inversify identifier used when the service was bound.
 * @returns The resolved service instance.
 * @throws {Error} When the hook is used outside of a {@link ServiceProvider}.
 */
export const useService = <T = unknown>(serviceIdentifier: ServiceIdentifier<T>): T => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }

  return context.container.get<T>(serviceIdentifier);
};
