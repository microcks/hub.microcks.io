import { getPackages } from '@client/sdk.gen'
import type { ApiPackage } from '@client/types.gen';
import { Toggle } from '@components/components/ui/toggle';
import { useCallback, useEffect, useState } from 'react';
import { PackageCard } from './PackageCard';
import { Checkbox } from '@components/components/ui/checkbox';

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
    const [selectedProviders, setSelectedProviders] = useState<Set<string>>(new Set());

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

    const handleCategoryToggle = useCallback((category: string) => {
        setSelectedCategories((prevState) => {
            const newSet = new Set(prevState);

            if (prevState.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }

            return newSet;
        });
    }, [data]);

    const handleProviderToggle = useCallback((provider: string) => {
        setSelectedProviders((prevState) => {
            const newSet = new Set(prevState);

            if (prevState.has(provider)) {
                newSet.delete(provider);
            } else {
                newSet.add(provider);
            }

            return newSet;
        });
    }, [data]);

    useEffect(() => {
        let filteredPackages = data;
        let categories = [...selectedCategories];

        filteredPackages = filteredPackages.filter((item) => {
            const matchesProvider = selectedProviders.size ? selectedProviders.has(item.provider) : true;
            const matchesCategory = selectedCategories.size ? containsAny(item.categories, categories) : true;
            return matchesProvider && matchesCategory;
        });

        setFilteredData(filteredPackages);
    }, [data, selectedCategories, selectedProviders]);

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
                <div className="space-y-2 mb-4 w-48 max-w-sm flex flex-wrap gap-x-2">
                    {categories.map((category) =>
                        <Toggle className="Toggle" key={category} onPressedChange={() => handleCategoryToggle(category)}>{category}</Toggle>
                    )}
                </div>

                <h2 className="text-xl font-bold mb-4 uppercase">providers</h2>
                <div className="space-y-2 mb-4 flex flex-col gap-2">{
                    [...apiByProvider.keys()].map((provider) => {
                        return (
                            <div className="flex items-center space-x-2 whitespace-nowrap" key={provider}>
                                <Checkbox id={provider} onCheckedChange={(checked) => {
                                    handleProviderToggle(provider);

                                }} />
                                <label
                                    htmlFor={provider}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {provider} ({apiByProvider.get(provider)?.length})
                                </label>
                            </div>
                        );
                    })
                }
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                    {selectedCategories.size || selectedProviders.size ? `${filteredData.length} of ` : ''}{categories.length} packages, {selectedCategories.size || selectedProviders.size ? `${filteredApis.length} of ` : ''}{apis.length} apis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {filteredData.map((item) => <PackageCard key={item.name} apiPackage={item} />)}
                </div>
            </div>
        </section>
    );
}


export { PackagesContainer };