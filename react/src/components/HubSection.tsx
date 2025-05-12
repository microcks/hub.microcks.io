import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { getPackages } from '@/services/package.services';

// Types for the data coming from APIs
interface ApiProvider {
    id: string;
    name: string;
    count: number;
}

interface Category {
    id: string;
    name: string;
}

interface API {
    id: string;
    name: string;
    provider: string;
    description: string;
    logoUrl: string;
    category: string;
}

export default function HubSection() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [apis, setApis] = useState<API[]>([]);  // Real API data
    const [categories, setCategories] = useState<Category[]>([]);  // Real categories data
    const [providers, setProviders] = useState<ApiProvider[]>([]);  // Real providers data
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real data from the backend
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const data = await getPackages();  // Fetch real packages data
                setApis(data.apis || []);  // Ensure we have arrays even if undefined
                setCategories(data.categories || []);
                setProviders(data.providers || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setApis([]);
                setCategories([]);
                setProviders([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const toggleProvider = (providerId: string) => {
        setSelectedProviders(prev =>
            prev.includes(providerId)
                ? prev.filter(id => id !== providerId)
                : [...prev, providerId]
        );
    };

    // Filter APIs based on selected categories, providers, and search query
    const filteredApis = (apis || []).filter(api => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(api.category);
        const providerMatch = selectedProviders.length === 0 || selectedProviders.includes(api.provider.toLowerCase().replace(/\./g, '-'));
        const searchMatch = searchQuery === '' ||
            api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            api.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            api.description.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatch && providerMatch && searchMatch;
    });

    // Count total packages and APIs
    const packagesCount = new Set((apis || []).map(api => api.provider)).size;
    const apisCount = (apis || []).length;

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

    return (
        <section className="py-8 px-4 md:px-6 bg-[#121C2D]">
            <div className="container mx-auto">
                <div className="mb-8 flex flex-col items-center">


                    {/* Search input */}
                    <div className="w-full md:w-[450px] lg:w-[550px] relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Packages"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-xl font-semibold text-white flex w-full justify-between">
                        <span><span className="text-blue-400">{packagesCount}</span> PACKAGES, <span className="text-blue-400">{apisCount}</span> APIS</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left sidebar with filters */}
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
                                            onChange={() => toggleCategory(category.id)}
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
                                            onChange={() => toggleProvider(provider.id)}
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

                    {/* Right content with API cards */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredApis.map(api => (
                                <Card key={api.id} className="overflow-hidden hover:shadow-md transition-shadow border border-[#1e293b] bg-[#0f172a]">
                                    <CardHeader className="p-4 border-b border-[#1e293b]">
                                        <div className="h-12 flex items-center justify-center mb-2">
                                            <img
                                                src={api.logoUrl}
                                                alt={`${api.name} logo`}
                                                className="h-10 max-w-full object-contain"
                                                onError={(e) => {
                                                    // Fallback for missing images
                                                    (e.target as HTMLImageElement).src = 'fallback.png';
                                                }}
                                            />
                                        </div>
                                        <CardTitle className="text-center text-lg text-white">{api.name}</CardTitle>
                                        <CardDescription className="text-center text-xs text-gray-400">
                                            provided by {api.provider}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-3">
                                        <p className="text-sm text-gray-300 line-clamp-3">
                                            {api.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0 flex justify-center">
                                        <Link to={`/package/${api.id}`}>
                                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-[#1e293b]">
                                                View Details →
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {filteredApis.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-300 text-lg">No APIs found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 