
import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon } from '../components/Icons';

const OrderConfirmationPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-md mx-auto">
                    <div className="bg-primary text-white rounded-full p-4 mb-4 inline-block">
                        <LeafIcon className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-text-dark mb-4">Thank You For Your Order!</h1>
                    <p className="text-lg text-text-light mb-8">
                        Your farm-fresh vegetables are on their way. You'll receive a confirmation email shortly.
                    </p>
                    <Link
                        to="/shop"
                        className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
