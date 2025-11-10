
import React from 'react';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../data/products';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/ProductCard';
import { TruckIcon, LeafIcon } from '../components/Icons';

const Hero: React.FC = () => (
    <div className="relative bg-cover bg-center h-[60vh] md:h-[80vh] text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl text-shadow-lg">
                Freshness That Lasts — <br /> Straight From Our Farms to Your Home.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-xl text-shadow">
                Experience the taste of real, chemical-free vegetables, delivered daily.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 text-lg">
                    Shop Now
                </Link>
                <Link to="/about" className="bg-white text-primary-dark font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg">
                    Explore Our Story
                </Link>
            </div>
        </div>
    </div>
);

const FeaturedProducts: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-text-dark mb-2">Featured Products</h2>
            <p className="text-center text-text-light mb-10 max-w-2xl mx-auto">Handpicked for you, these are our customers' favorites. Fresh, delicious, and packed with goodness.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </section>
);

const OurPromise: React.FC = () => (
    <section className="py-16 bg-primary-light bg-opacity-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-text-dark mb-10">Why Choose Farm2Home?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-full p-4 mb-4">
                        <LeafIcon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
                    <p className="text-text-light">No chemicals, no pesticides. Just pure, natural goodness from local farms you can trust.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-full p-4 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Support Local Farmers</h3>
                    <p className="text-text-light">We partner directly with farmers, ensuring they get a fair price for their hard work.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-full p-4 mb-4">
                        <TruckIcon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Fast & Free Delivery</h3>
                    <p className="text-text-light">Get your fresh produce delivered to your doorstep, with free delivery on orders over ₹499.</p>
                </div>
            </div>
        </div>
    </section>
);


const Testimonials: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-text-dark mb-10">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-100 p-8 rounded-lg">
                        <p className="text-text-light italic mb-6">"{testimonial.quote}"</p>
                        <p className="font-bold text-text-dark">{testimonial.author}</p>
                        <p className="text-sm text-primary-dark">{testimonial.location}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const HomePage: React.FC = () => {
    return (
        <div>
            <Hero />
            <OurPromise />
            <FeaturedProducts />
            <Testimonials />
        </div>
    );
};

export default HomePage;