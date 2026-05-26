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

import type { APIPackage } from '@Api/microcksHub';
import type { HubSectionCategory, HubSectionListItem, HubSectionProvider } from './HubSection.type';

const DEFAULT_CATEGORY_ID = 'uncategorized';

const DEFAULT_LOGO_URL = '/logos/default.png';

export class HubSectionMapper {
  static toListItems(apiPackages: APIPackage[]): HubSectionListItem[] {
    return apiPackages.map(apiPackage => ({
      id: apiPackage.name,
      name: apiPackage.displayName || apiPackage.name,
      provider: apiPackage.name,
      providerId: HubSectionMapper.normalizeProviderId(apiPackage.name),
      description: apiPackage.description || '',
      logoUrl: apiPackage.thumbUrl || DEFAULT_LOGO_URL,
      categoryId: apiPackage.categories[0] || DEFAULT_CATEGORY_ID,
    }));
  }

  static toCategories(apiPackages: APIPackage[]): HubSectionCategory[] {
    const categoryIds = new Set<string>();

    apiPackages.forEach(apiPackage => {
      apiPackage.categories.forEach(categoryId => {
        categoryIds.add(categoryId);
      });
    });

    return Array.from(categoryIds).map(categoryId => ({
      id: categoryId,
      name: categoryId,
    }));
  }

  static toProviders(apiPackages: APIPackage[]): HubSectionProvider[] {
    return apiPackages.map(apiPackage => ({
      id: HubSectionMapper.normalizeProviderId(apiPackage.name),
      name: apiPackage.displayName || apiPackage.name,
      count: 1,
    }));
  }

  private static normalizeProviderId(providerId: string): string {
    return providerId.toLowerCase().replace(/\./g, '-');
  }
}
