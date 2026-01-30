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

/*
// Define types for the API response
interface ApiVersion {
  name: string;
  version: string;
}

interface Api {
  name: string;
  currentVersion: string;
  versions: ApiVersion[];
}

interface Package {
  name: string;
  displayName: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  description: string;
  thumbUrl: string;
  provider: string;
  source: string;
  maturity: string;
  apis: Api[];
}
*/

export async function getPackages() {
  try {
    const response = await fetch('http://localhost:4000/api/mocks');
    const data = await response.json();

    if (Array.isArray(data)) {
      // "apis" here are actually packages for the main page
      const apis = data.map(pkg => ({
        id: pkg.name,
        name: pkg.displayName || pkg.name,
        provider: pkg.provider || pkg.name,
        description: pkg.description || '',
        logoUrl: pkg.thumbUrl || '/logos/default.png',
        category: pkg.categories?.[0] || 'uncategorized',
      }));

      // categories: flatten and dedupe all categories
      const categorySet = new Set<string>();
      data.forEach(pkg => (pkg.categories || []).forEach((cat: string) => categorySet.add(cat)));
      const categories = Array.from(categorySet).map(cat => ({
        id: cat,
        name: cat,
      }));

      // providers: from package data
      const providers = data.map(pkg => ({
        id: pkg.name,
        name: pkg.displayName || pkg.name,
        count: 1, // one card per package
      }));

      return { apis, categories, providers };
    }

    if (data.apis && data.categories && data.providers) {
      return data;
    }

    return { apis: [], categories: [], providers: [] };
  } catch (error) {
    console.error('Error fetching packages:', error);
    return { apis: [], categories: [], providers: [] };
  }
}
