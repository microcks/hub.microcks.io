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

import type { HubSectionStoreInterface } from '@/services/hubSectionStore/HubSectionStoreInterface';
import { useCallback, useRef, useSyncExternalStore } from 'react';
import { useHubSectionStore } from '../useHubSectionStore/useHubSectionStore';

export const useHubSectionSelector = <T>(selector: (store: HubSectionStoreInterface) => T): T => {
  const store = useHubSectionStore();
  const selectorRef = useRef(selector);

  selectorRef.current = selector;

  return useSyncExternalStore(
    useCallback(callback => store.subscribe(callback), [store]),
    useCallback(() => selectorRef.current(store), [store]),
  );
};
