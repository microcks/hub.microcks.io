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

import { MicrocksHubService } from '@/services/microcksHubService/MicrocksHubService';
import { waitFor } from '@testing-library/react';
import { getHubSectionPackages200, getPackages500 } from '@Mocks/handlers/packagesHandlers';
import { server } from '@Mocks/server';
import { describe, expect, it, vi } from 'vitest';
import { HubSectionStore } from '../HubSectionStore';

const createStore = () => new HubSectionStore(new MicrocksHubService());

describe('HubSectionStore', () => {
  it('should load packages and expose filter and list states', async () => {
    server.use(getHubSectionPackages200);

    const store = createStore();
    const initialList = store.getList();

    expect(initialList.isLoading).toBeTruthy();
    expect(initialList.items).toHaveLength(0);

    await waitFor(() => {
      expect(store.getList().isLoading).toBeFalsy();
    });

    const filters = store.getFilters();
    const list = store.getList();

    expect(filters.categories).toStrictEqual([
      { id: 'Banking', name: 'Banking' },
      { id: 'Cloud Provider', name: 'Cloud Provider' },
    ]);
    expect(filters.providers).toStrictEqual([
      { id: 'stripe-payments', name: 'Stripe Payments', count: 1 },
      { id: 'cloud-events', name: 'Cloud Events', count: 1 },
      { id: 'banking-insights', name: 'Banking Insights', count: 1 },
    ]);
    expect(list.items.map(item => item.id)).toStrictEqual(['stripe-payments', 'cloud-events', 'banking-insights']);
    expect(list.packagesCount).toBe(3);
    expect(list.apisCount).toBe(3);
    expect(list.hasError).toBeFalsy();
    expect(list.error).toBeNull();
  });

  it('should filter cards with search, category, and provider actions', async () => {
    server.use(getHubSectionPackages200);

    const store = createStore();

    await waitFor(() => {
      expect(store.getList().isLoading).toBeFalsy();
    });

    store.searchBy('cloud');

    expect(store.getList().items.map(item => item.id)).toStrictEqual(['cloud-events']);

    store.filterBy('selectedCategories', 'Cloud Provider');

    expect(store.getList().items.map(item => item.id)).toStrictEqual(['cloud-events']);

    store.clearFilters();
    store.filterBy('selectedCategories', 'Banking');

    expect(store.getList().items.map(item => item.id)).toStrictEqual(['stripe-payments', 'banking-insights']);

    store.filterBy('selectedProviders', 'stripe-payments');

    expect(store.getList().items.map(item => item.id)).toStrictEqual(['stripe-payments']);
    expect(store.getFilters().selectedCategories).toStrictEqual(['Banking']);
    expect(store.getFilters().selectedProviders).toStrictEqual(['stripe-payments']);
  });

  it('should expose an error list state when loading packages fails', async () => {
    server.use(getPackages500);

    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const store = createStore();

    await waitFor(() => {
      expect(store.getList().hasError).toBeTruthy();
    });

    const list = store.getList();

    expect(list.isLoading).toBeFalsy();
    expect(list.items).toHaveLength(0);
    expect(list.error).toBe('Unable to load packages. Please try again.');

    consoleErrorMock.mockRestore();
  });

  it('should notify subscribers when the snapshot changes', async () => {
    server.use(getHubSectionPackages200);

    const store = createStore();
    const observer = vi.fn();
    const unsubscribe = store.subscribe(observer);

    await waitFor(() => {
      expect(observer).toHaveBeenCalledTimes(1);
    });

    store.searchBy('analytics');

    expect(observer).toHaveBeenCalledTimes(2);

    unsubscribe();
    store.clearFilters();

    expect(observer).toHaveBeenCalledTimes(2);
  });
});
