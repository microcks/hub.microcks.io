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

import type { MicrocksHubServiceInterface } from '@/services/microcksHubService/MicrocksHubServiceInterface';
import { AbstractObserver } from '@/shared/helpers/observer/AbstractObserver';
import { HubSectionMapper } from './HubSectionMapper';
import {
  type HubSectionFilterName,
  type HubSectionFiltersState,
  type HubSectionListItem,
  type HubSectionListState,
} from './HubSection.type';
import type { HubSectionStoreInterface } from './HubSectionStoreInterface';

export class HubSectionStore extends AbstractObserver implements HubSectionStoreInterface {
  private static readonly LOAD_ERROR_MESSAGE = 'Unable to load packages. Please try again.';

  private items: HubSectionListItem[] = [];

  private searchQuery: string = '';

  private filtersState!: HubSectionFiltersState;

  private listState!: HubSectionListState;

  constructor(private readonly microcksHubService: MicrocksHubServiceInterface) {
    super();
    this.initState();
    queueMicrotask(() => {
      this.loadPackages();
    });
  }

  /**
   * Returns the filter state consumed by the filter sections.
   */
  getFilters(): HubSectionFiltersState {
    return this.filtersState;
  }

  /**
   * Returns the list state consumed by the package list section.
   */
  getList(): HubSectionListState {
    return this.listState;
  }

  /**
   * Applies a search query to the visible items.
   */
  searchBy(searchQuery: string): void {
    if (this.searchQuery === searchQuery) {
      return;
    }

    this.searchQuery = searchQuery;
    this.commitList();
  }

  /**
   * Toggles a filter selection and refreshes the visible items.
   */
  filterBy(filterName: HubSectionFilterName, filterValue: string): void {
    this.commitFilters({
      [filterName]: this.toggleSelection(filterName, filterValue),
    } as Pick<HubSectionFiltersState, HubSectionFilterName>);
  }

  /**
   * Clears the current filter selections and reapplies the provided search query.
   */
  clearFilters(): void {
    if (
      this.searchQuery === '' &&
      this.filtersState.selectedCategories.length === 0 &&
      this.filtersState.selectedProviders.length === 0
    ) {
      return;
    }

    this.searchQuery = '';
    this.commitFilters({
      selectedCategories: [],
      selectedProviders: [],
    });
  }

  /**
   * Loads packages through MicrocksHubService and rebuilds filter and list states.
   */
  private async loadPackages(): Promise<void> {
    try {
      const apiPackages = await this.microcksHubService.getPackages();

      this.items = HubSectionMapper.toListItems(apiPackages);
      this.filtersState = {
        ...this.filtersState,
        categories: HubSectionMapper.toCategories(apiPackages),
        providers: HubSectionMapper.toProviders(apiPackages),
      };

      this.commitList({
        isLoading: false,
        hasError: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching packages:', error);

      this.items = [];
      this.filtersState = {
        ...this.filtersState,
        categories: [],
        providers: [],
      };

      this.commitList({
        isLoading: false,
        hasError: true,
        error: HubSectionStore.LOAD_ERROR_MESSAGE,
      });
    }
  }

  /**
   * Updates the filter state and refreshes the derived list state.
   */
  private commitFilters(nextFilters: Partial<HubSectionFiltersState>): void {
    this.filtersState = {
      ...this.filtersState,
      ...nextFilters,
    };

    this.commitList();
  }

  /**
   * Recomputes the list state from the current filter state and notifies subscribers.
   */
  private commitList(nextList: Partial<HubSectionListState> = {}): void {
    this.listState = {
      items: this.filterListItems(),
      packagesCount: new Set(this.items.map(item => item.providerId)).size,
      apisCount: this.items.length,
      isLoading: nextList.isLoading ?? this.listState.isLoading,
      hasError: nextList.hasError ?? this.listState.hasError,
      error: nextList.error ?? this.listState.error,
    };

    this.notifyObservers();
  }

  /**
   * Initializes the filter and list states exposed by the store.
   */
  private initState(): void {
    this.filtersState = {
      categories: [],
      providers: [],
      selectedCategories: [],
      selectedProviders: [],
    };
    this.listState = {
      items: [],
      packagesCount: 0,
      apisCount: 0,
      isLoading: true,
      hasError: false,
      error: null,
    };
  }

  /**
   * Returns the next selection values for a filter after toggling one entry.
   */
  private toggleSelection(filterName: HubSectionFilterName, filterValue: string): string[] {
    const selectedValues = this.filtersState[filterName];

    if (selectedValues.includes(filterValue)) {
      return selectedValues.filter(selectedValue => selectedValue !== filterValue);
    }

    return [...selectedValues, filterValue];
  }

  /**
   * Returns the current list items after applying active filters and search criteria.
   */
  private filterListItems(): HubSectionListItem[] {
    const normalizedSearchQuery = this.searchQuery.trim().toLowerCase();

    return this.items.filter(item => {
      const categoryMatch =
        this.filtersState.selectedCategories.length === 0 ||
        this.filtersState.selectedCategories.includes(item.categoryId);
      const providerMatch =
        this.filtersState.selectedProviders.length === 0 ||
        this.filtersState.selectedProviders.includes(item.providerId);
      const searchMatch =
        normalizedSearchQuery === '' ||
        item.name.toLowerCase().includes(normalizedSearchQuery) ||
        item.provider.toLowerCase().includes(normalizedSearchQuery) ||
        item.description.toLowerCase().includes(normalizedSearchQuery);

      return categoryMatch && providerMatch && searchMatch;
    });
  }
}
