import { getPackages } from '@client/sdk.gen'
import type { ApiPackage } from '@client/types.gen';
import { useEffect, useState } from 'react';


const PackagesContainer = () => {
    const [data, setData] = useState<ApiPackage[]>([]);
    const [categories, setCategories] = useState<ApiPackage['categories']>([]);
    const [apis, setApis] = useState<ApiPackage['apis']>([]);
    const [apiByProvider, setApiByProvider] = useState<Map<string, ApiPackage['apis']>>(new Map());

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
                    [...(providersApis.get(catalogPackage.provider) || []), ...(catalogPackage.apis ||[])]
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

    return (
        <section className="grid grid-cols-3 gap-8">
        <div>
            <h2 className="text-xl font-bold mb-4 uppercase">Categories</h2>
            <ul className="space-y-2">
                {categories.map((category) => <li key={category}>{category}</li>)}
            </ul>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-4 uppercase">
                {categories.length} packages, {apis.length} apis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((item) => (
                    <div key={item.name} className="bg-white rounded-md shadow-sm p-4">
                        <h3 className="font-bold">{item.displayName}</h3>
                        <p>provided by {item.provider}</p>
                        <p className="text-sm text-gray-600">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-4 uppercase">provider</h2>
            <ul className="space-y-2">
                {
                    [...apiByProvider.keys()].map((provider) => <li key={provider}>
                        <label>{provider}({apiByProvider.get(provider)?.length})</label>
                    </li>)
                }
            </ul>
        </div>
    </section>
    );
}


export { PackagesContainer };