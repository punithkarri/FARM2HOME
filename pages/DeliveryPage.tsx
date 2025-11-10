
import React from 'react';

const DeliveryPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Freshness, Delivered Fast</h1>
                    <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">
                        We're committed to bringing the farm's freshness to your doorstep with speed and care. Here’s everything you need to know about our delivery service.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-8">
                        <h2 className="text-2xl font-bold text-primary-dark mb-4">Delivery Coverage</h2>
                        <p className="text-text-light mb-4">We are currently delivering across <span className="font-semibold">Hyderabad and its nearby locations</span>. Our delivery network is expanding rapidly, so stay tuned for updates!</p>
                        <p className="text-text-light">Key areas include: Gachibowli, Hitec City, Madhapur, Jubilee Hills, Banjara Hills, Kondapur, Secunderabad, and more.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-primary-dark mb-4">Delivery Options</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-text-dark">Same-Day Delivery</h3>
                                    <p className="text-text-light">Place your order before 12 PM, and receive your fresh vegetables the very same evening (between 5 PM - 9 PM).</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-text-dark">Next-Day Delivery</h3>
                                    <p className="text-text-light">Orders placed after 12 PM will be delivered the next day in our morning slot (9 AM - 1 PM).</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-primary-dark mb-4">Delivery Charges</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-text-dark">Standard Delivery</h3>
                                    <p className="text-text-light">A nominal fee of ₹50 is charged for all orders below ₹499.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-green-600">Free Delivery!</h3>
                                    <p className="text-text-light">Enjoy complimentary delivery on all orders of <span className="font-bold">₹499 or more</span>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="bg-primary-light bg-opacity-30 text-primary-dark rounded-lg p-6 mt-8 text-center">
                        <h3 className="text-xl font-bold mb-2">Our Freshness Guarantee</h3>
                        <p>We pack your order with utmost care to ensure it reaches you in perfect condition. If you're not satisfied with the quality of any item, we offer a hassle-free replacement or refund.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
