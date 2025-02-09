import { getPackages } from '@client/sdk.gen'
import type { ApiPackage } from '@client/types.gen';
import { Toggle } from '@components/components/ui/toggle';
import { useCallback, useEffect, useState } from 'react';

function containsAny<T extends Array<any>>(arr1: T, arr2: T) {
    return arr1.some(item => arr2.includes(item));
}

const PackagesContainer = () => {
    const [data, setData] = useState<ApiPackage[]>([]);
    const [categories, setCategories] = useState<ApiPackage['categories']>([]);
    const [apis, setApis] = useState<ApiPackage['apis']>([]);
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
    }, []);

    return (
        <section className="flex gap-8">
            <div>
                <h2 className="text-xl font-bold mb-4 uppercase">Categories</h2>
                <ul className="space-y-2 mb-4">
                    {categories.map((category) => <li>
                        <Toggle className="Toggle" key={category} onPressedChange={() => handleCategoryClick(category)}>{category}</Toggle>
                    </li>
                    )}
                </ul>

                <h2 className="text-xl font-bold mb-4 uppercase">provider</h2>
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
                    {categories.length} packages, {apis.length} apis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {data.map((item) => {

                        if (selectedCategories.size && !containsAny(item.categories, [...selectedCategories])) {
                            return null;
                        }

                        return (
                            <div key={item.name} className="bg-white rounded-md shadow-sm p-4">
                                <h3 className="font-bold">{item.displayName}</h3>
                                <p>provided by {item.provider}</p>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </section>
    );
}


export { PackagesContainer };