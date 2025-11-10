
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Our Story: Connecting Farms to Your Family</h1>
                    <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">
                        Farm2Home.in was born from a simple idea: everyone deserves access to fresh, healthy, and natural food, and farmers deserve a fair price for their incredible work.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img src="https://picsum.photos/id/342/600/400" alt="Farmer in a field" className="rounded-lg shadow-lg w-full" />
                    <div>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4">From the Soil, With Love</h2>
                        <p className="text-text-light mb-4">
                            We are a team of nature lovers, food enthusiasts, and tech believers who saw a gap between urban consumers and rural farmers. In today's fast-paced world, finding genuinely fresh and chemical-free vegetables can be a challenge. At the same time, local farmers often struggle to reach customers directly, losing out to middlemen.
                        </p>
                        <p className="text-text-light">
                            Farm2Home.in bridges this gap. We partner with a network of dedicated local farmers in and around Hyderabad who practice sustainable and organic farming methods. We believe in food that is good for you, good for the farmers, and good for the planet.
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-text-dark mb-10">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-primary mb-2">Sustainability</h3>
                            <p className="text-text-light">We promote farming practices that respect the environment, conserve water, and maintain healthy soil for future generations.</p>
                        </div>
                        <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-primary mb-2">Fair Pricing</h3>
                            <p className="text-text-light">By eliminating middlemen, we ensure farmers receive a better income, and you get premium produce at reasonable prices.</p>
                        </div>
                        <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-primary mb-2">Chemical-Free Approach</h3>
                            <p className="text-text-light">Your health is our priority. All our partner farms are committed to growing produce without harmful pesticides or chemicals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
