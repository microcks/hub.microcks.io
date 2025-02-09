import { getPackages } from '@client/sdk.gen'
import type { ApiPackage } from '@client/types.gen';
import { Toggle } from '@components/components/ui/toggle';
import { useCallback, useEffect, useState } from 'react';
import { PackageCard } from './PackageCard';

function containsAny<T extends Array<any>>(arr1: T, arr2: T) {
    return arr1.some(item => arr2.includes(item));
}

const PackagesContainer = () => {
    const [data, setData] = useState<ApiPackage[]>([]);
    const [filteredData, setFilteredData] = useState<ApiPackage[]>([]);
    const [categories, setCategories] = useState<ApiPackage['categories']>([]);
    const [apis, setApis] = useState<ApiPackage['apis']>([]);
    const [filteredApis, setFilteredApis] = useState<ApiPackage['apis']>([]);
    const [apiByProvider, setApiByProvider] = useState<Map<string, ApiPackage['apis']>>(new Map());
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

    const onGetPackages = async () => {
        const response = await getPackages();

        if (response.error) {
            console.error(response.error);
            return;
        }

        if (!response.data) {
            return;
        }

        let allApis = [] as ApiPackage['apis'];
        let allCaterogies = [] as ApiPackage['categories'];
        const providersApis = new Map<string, ApiPackage['apis']>();

        response.data.forEach((catalogPackage) => {
            if (catalogPackage.apis) {
                allApis = [...allApis, ...(catalogPackage.apis || [])];
                providersApis.set(catalogPackage.provider,
                    [...(providersApis.get(catalogPackage.provider) || []), ...(catalogPackage.apis || [])]
                );
            }

            if (catalogPackage.categories) {
                allCaterogies = [...allCaterogies, ...(catalogPackage.categories || [])];
            }
        });

        setApiByProvider(providersApis);
        setCategories([...new Set(allCaterogies)].sort());
        setApis(allApis);
        setData(response.data || []);
    }

    useEffect(() => {
        onGetPackages();
    }, []);

    const handleCategoryClick = useCallback((category: string) => {
        setSelectedCategories((activeSet) => {
            if (activeSet.has(category)) {
                activeSet.delete(category);
                return new Set(activeSet);

            }

            activeSet.add(category);
            return new Set(activeSet);
        }
        );
    }, [data]);

    useEffect(() => {
        let filteredPackages = data;
        let categories = [...selectedCategories];

        if (selectedCategories.size) {
            filteredPackages = filteredPackages.filter((item) => {
                return containsAny(item.categories, categories);
            });
        }

        setFilteredData(filteredPackages);
    }, [data, selectedCategories]);

    useEffect(() => {
        let filteredApis = [];

        filteredApis = filteredData.reduce((acc, item) => {
            return [...acc, ...item.apis];
        }, [] as ApiPackage['apis']);

        setFilteredApis(filteredApis);
    }, [filteredData, apis]);

    return (
        <section className="flex gap-8">
            <div>
                <h2 className="text-xl font-bold mb-4 uppercase">Categories</h2>
                <div className="space-y-2 mb-4 max-w-xs flex flex-wrap gap-2">
                    {categories.map((category) =>
                        <Toggle className="Toggle" key={category} onPressedChange={() => handleCategoryClick(category)}>{category}</Toggle>

                    )}
                </div>

                <h2 className="text-xl font-bold mb-4 uppercase">providers</h2>
                <ul className="space-y-2 mb-4">
                    <span className="whitespace-nowrap">{
                        [...apiByProvider.keys()].map((provider) => {
                            return (<li key={provider}>
                                <label>{provider} ({apiByProvider.get(provider)?.length})</label>
                            </li>);
                        })
                    }</span>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                    {selectedCategories.size ? `${selectedCategories.size} of ` : ''}{categories.length} packages, {selectedCategories.size ? `${filteredApis.length} of ` : ''}{apis.length} apis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {filteredData.map((item) => <PackageCard key={item.name} apiPackage={item} />)}
                </div>
            </div>
        </section>
    );
}


export { PackagesContainer };