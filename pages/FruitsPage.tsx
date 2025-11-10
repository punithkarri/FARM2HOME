import React, { useState, useEffect, useMemo } from 'react';
import { fruits } from '../data/fruits';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const FruitsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        document.title = 'Fresh Indian Fruits – Farm2Home.in';
    }, []);

    const sortedAndFilteredFruits = useMemo(() => {
        let filtered = fruits.filter(fruit =>
            fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'freshness':
                filtered.sort((a, b) => b.freshnessDays - a.freshnessDays);
                break;
            default:
                break;
        }

        return filtered;
    }, [searchQuery, sortOption]);


    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Our Fresh Fruits</h1>
                    <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
                        A handpicked selection of the finest Indian fruits, sourced directly from local orchards to ensure peak freshness and flavor.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search for fruits..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            aria-label="Search for fruits"
                        />
                    </div>
                    {/* Sort Dropdown */}
                    <div className="relative w-full md:w-auto">
                         <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-text-dark py-3 px-4 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                            aria-label="Sort products"
                        >
                            <option value="default">Sort by</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                            <option value="freshness">Freshness</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedAndFilteredFruits.map(fruit => (
                        <ProductCard key={fruit.id} product={fruit} />
                    ))}
                </div>
                {sortedAndFilteredFruits.length === 0 && (
                    <div className="text-center col-span-full py-16">
                        <p className="text-text-light text-lg">No fruits found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FruitsPage;
