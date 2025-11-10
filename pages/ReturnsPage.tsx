
import React from 'react';
import { Link } from 'react-router-dom';

const ReturnsPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-text-dark">Returns & Refunds Policy</h1>
                    <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">
                        Your satisfaction is our top priority. We stand by the freshness and quality of our produce.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="bg-gray-50 rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-primary-dark mb-4">Our Freshness Guarantee</h2>
                        <p className="text-text-light mb-4">
                            We are committed to delivering only the freshest vegetables from local farms. If you receive an item that does not meet your quality expectations, we are here to help.
                        </p>
                        <p className="text-text-light">
                            Please inspect your order upon delivery. If you find any issues with the quality of a product, please report it to us <span className="font-semibold">within 24 hours</span> of receiving your order.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-primary-dark mb-4">How to Initiate a Return</h2>
                        <p className="text-text-light mb-6">
                            To request a return for a quality-related issue, please follow these simple steps:
                        </p>
                        <ol className="list-decimal list-inside space-y-4 text-text-light">
                            <li>
                                <span className="font-semibold">Contact Us:</span> Reach out to our customer support team via email at <a href="mailto:support@farm2home.in" className="text-primary hover:underline">support@farm2home.in</a> or through our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
                            </li>
                            <li>
                                <span className="font-semibold">Provide Details:</span> In your message, please include your <span className="font-semibold">Order ID</span> and a clear description of the issue with the item(s).
                            </li>
                            <li>
                                <span className="font-semibold">Attach a Photo (Optional but Recommended):</span> A photo of the product helps us understand the issue better and can expedite your request.
                            </li>
                            <li>
                                <span className="font-semibold">Review:</span> Our team will review your request and get back to you within one business day with the next steps.
                            </li>
                        </ol>
                    </div>

                    <div className="bg-gray-50 rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-primary-dark mb-4">Refund & Replacement Process</h2>
                        <p className="text-text-light mb-4">
                            Once your return request is approved, we offer two solutions:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-text-light">
                            <li><span className="font-semibold">Replacement:</span> We can include a free replacement for the item in your next order.</li>
                            <li><span className="font-semibold">Refund:</span> We can issue a full refund for the specific item to your original payment method. Please allow 5-7 business days for the refund to reflect in your account. For Cash on Delivery (COD) orders, the refund will be processed as store credit or via bank transfer.</li>
                        </ul>
                    </div>
                     <div className="bg-primary-light bg-opacity-30 text-primary-dark rounded-lg p-6 text-center">
                        <h3 className="text-xl font-bold mb-2">Important Note</h3>
                        <p>Due to the perishable nature of our products, we do not accept returns for reasons other than quality concerns (e.g., if you change your mind after delivery). We appreciate your understanding.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
