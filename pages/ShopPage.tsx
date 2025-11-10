
import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';

const categories = [
    'All', 
    ProductCategory.LeafyGreens, 
    ProductCategory.RootVegetables, 
    ProductCategory.SeasonalPicks, 
    ProductCategory.SaladEssentials
];

const ShopPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

     useEffect(() => {
        document.title = 'Shop Fresh Vegetables | Farm2Home.in';
    }, []);

    const filteredProducts = products
        .filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(p => 
            activeCategory === 'All' ? true : p.category === activeCategory
        );

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Our Fresh Vegetables</h1>
                    <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">
                        Browse our selection of farm-fresh, organic vegetables. Picked at peak ripeness and delivered to you.
                    </p>
                </div>

                <div className="mb-8 max-w-lg mx-auto">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search for vegetables..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
                            aria-label="Search for products"
                        />
                    </div>
                </div>

                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 ${
                                activeCategory === category
                                    ? 'bg-primary text-white shadow'
                                    : 'bg-gray-200 text-text-dark hover:bg-gray-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center col-span-full py-16">
                        <p className="text-text-light text-lg">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;