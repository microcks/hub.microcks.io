import { getPackages } from '@client/sdk.gen'
import type { ApiPackage } from '@client/types.gen';
import { Toggle } from '@components/components/ui/toggle';
import React, { useCallback, useEffect, useState } from 'react';
import { PackageCard } from './PackageCard';
import { Checkbox } from '@components/components/ui/checkbox';
import { Input } from '@components/components/ui/input';
import { PackagePlus } from "lucide-react"

function containsAny<T extends Array<any>>(arr1: T, arr2: T) {
    return arr1.some(item => arr2.includes(item));
}

type PackagesContainerProps = {
    apiPackages: ApiPackage[];
}

const PackagesContainer = ({ apiPackages }: PackagesContainerProps) => {
    const [data, setData] = useState<ApiPackage[]>(apiPackages);
    const [filteredData, setFilteredData] = useState<ApiPackage[]>([]);
    const [categories, setCategories] = useState<ApiPackage['categories']>([]);
    const [apis, setApis] = useState<ApiPackage['apis']>([]);
    const [filteredApis, setFilteredApis] = useState<ApiPackage['apis']>([]);
    const [apiByProvider, setApiByProvider] = useState<Map<string, ApiPackage['apis']>>(new Map());
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [selectedProviders, setSelectedProviders] = useState<Set<string>>(new Set());
    const [searchValue, setSearchValue] = useState('');

    const initLocalState = (data: ApiPackage[] = apiPackages) => {
        let allApis = [] as ApiPackage['apis'];
        let allCaterogies = [] as ApiPackage['categories'];
        const providersApis = new Map<string, ApiPackage['apis']>();

        data.forEach((catalogPackage) => {
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
        setData(data);
    }

    const onGetPackages = async () => {
        const response = await getPackages();

        if (response.error) {
            console.error(response.error);
            return;
        }

        if (!response.data) {
            return;
        }

        initLocalState(response.data);
    }

    useEffect(() => {
        initLocalState();
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

    const handleSearchChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }, []);

    useEffect(() => {
        let filteredPackages = data;
        let categories = [...selectedCategories];
        let search = searchValue.toLocaleLowerCase();

        filteredPackages = filteredPackages.filter((item) => {
            const matchesProvider = selectedProviders.size ? selectedProviders.has(item.provider) : true;
            const matchesCategory = selectedCategories.size ? containsAny(item.categories, categories) : true;
            const matchesSearch = searchValue ? item.displayName.toLowerCase().includes(search) : true;
            return matchesProvider && matchesCategory && matchesSearch;
        });

        setFilteredData(filteredPackages);
    }, [data, selectedCategories, selectedProviders, searchValue]);

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
                <div className="grid w-full mb-4">
                    <Input type="search" placeholder="Search by name" onChange={handleSearchChange} />
                </div>
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
                    <a href="../docs/how-to-contribute" className="grid min-h-[200px]">
                        <div className="bg-white rounded-md shadow-sm p-4 flex flex-col justify-center text-center items-center">
                            <PackagePlus size={48} />
                            <p className="mt-6 font-bold">
                                List your API mocks on hub.microcks.io
                            </p>
                        </div>
                    </a>
                    {filteredData.map((item) => <PackageCard key={item.name} apiPackage={item} />)}
                </div>
            </div>
        </section>
    );
}


export { PackagesContainer };