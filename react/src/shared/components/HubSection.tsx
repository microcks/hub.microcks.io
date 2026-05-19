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

import { Button } from '@/shared/components/ui/Button/Button';
import { Card } from '@/shared/components/ui/Card/Card';
import { CardContent } from '@/shared/components/ui/CardContent/CardContent';
import { CardDescription } from '@/shared/components/ui/CardDescription/CardDescription';
import { CardFooter } from '@/shared/components/ui/CardFooter/CardFooter';
import { CardHeader } from '@/shared/components/ui/CardHeader/CardHeader';
import { CardTitle } from '@/shared/components/ui/CardTitle/CardTitle';
import { appRoutes } from '@/App/Routing/appRoutes';
import { useHubSectionSelector } from '@/shared/hooks/useHubSectionSelector/useHubSectionSelector';
import { useHubSectionStore } from '@/shared/hooks/useHubSectionStore/useHubSectionStore';
import { Link } from 'react-router';
import { Search } from 'lucide-react';

export const HubSection = () => {
  const hubSectionStore = useHubSectionStore();
  const { categories, providers, selectedCategories, selectedProviders } = useHubSectionSelector(store =>
    store.getFilters(),
  );
  const { apisCount, error, isLoading, items, packagesCount } = useHubSectionSelector(store => store.getList());

  if (isLoading) {
    return (
      <section className="py-8 px-4 md:px-6 bg-[#121C2D]">
        <div className="container mx-auto">
          <div className="text-center py-10">
            <p className="text-gray-300 text-lg">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-6 bg-[#121C2D]">
        <div className="container mx-auto">
          <div className="text-center py-10">
            <p className="text-gray-300 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6 bg-[#121C2D]">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full md:w-[450px] lg:w-[550px] relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              id="hub-section-search"
              aria-label="Search Packages"
              type="text"
              placeholder="Search Packages"
              onChange={event => hubSectionStore.searchBy(event.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-xl font-semibold text-white flex w-full justify-between">
            <span>
              <span className="text-blue-400">{packagesCount}</span> PACKAGES,{' '}
              <span className="text-blue-400">{apisCount}</span> APIS
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-300 font-medium mb-2">CATEGORIES</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => hubSectionStore.filterBy('selectedCategories', category.id)}
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-800"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-300">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-300 font-medium mb-2">PROVIDER</h3>
              <div className="space-y-1">
                {providers.map(provider => (
                  <div key={provider.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`provider-${provider.id}`}
                      checked={selectedProviders.includes(provider.id)}
                      onChange={() => hubSectionStore.filterBy('selectedProviders', provider.id)}
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-800"
                    />
                    <label htmlFor={`provider-${provider.id}`} className="ml-2 text-sm text-gray-300">
                      {provider.name} ({provider.count})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(item => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-md transition-shadow border border-[#1e293b] bg-[#0f172a]"
                >
                  <CardHeader className="p-4 border-b border-[#1e293b]">
                    <div className="h-12 flex items-center justify-center mb-2">
                      <img
                        src={item.logoUrl}
                        alt={`${item.name} logo`}
                        className="h-10 max-w-full object-contain"
                        onError={e => {
                          (e.target as HTMLImageElement).src = '/logos/default.png';
                        }}
                      />
                    </div>
                    <CardTitle className="text-center text-lg text-white">{item.name}</CardTitle>
                    <CardDescription className="text-center text-xs text-gray-400">
                      provided by {item.provider}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-3">
                    <p className="text-sm text-gray-300 line-clamp-3">{item.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-[#1e293b]"
                      asChild
                    >
                      <Link to={appRoutes.package({ packageId: item.id })} tabIndex={0}>
                        View Details →
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {items.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-300 text-lg">No APIs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
