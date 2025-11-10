import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../data/orders';
import { Order, OrderStatus } from '../types';
import TrackingTimeline from '../components/TrackingTimeline';
import { ArrowRightIcon } from '../components/Icons';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Delivered:
            return 'bg-green-100 text-green-800';
        case OrderStatus.Cancelled:
            return 'bg-red-100 text-red-800';
        case OrderStatus.OutForDelivery:
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-yellow-100 text-yellow-800';
    }
};

const TrackOrderPage: React.FC = () => {
    const [orderIdInput, setOrderIdInput] = useState('');
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);
    const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Track Your Order | Farm2Home.in';
    }, []);

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFoundOrder(null);
        setCustomerOrders([]);

        if (!orderIdInput.trim()) {
            setError('Please enter an Order ID.');
            return;
        }

        const order = orders.find(o => o.orderId.toLowerCase() === orderIdInput.toLowerCase());

        if (order) {
            setFoundOrder(order);
            const allCustomerOrders = orders
                .filter(o => o.customerName === order.customerName)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setCustomerOrders(allCustomerOrders);
        } else {
            setError('Order not found. Please check the ID and try again.');
        }
    };

    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-text-dark">Track Your Order</h1>
                    <p className="mt-4 text-lg text-text-light">
                        Enter your order ID below to see the latest status of your delivery.
                    </p>
                </div>
                
                <div className="max-w-lg mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleTrackOrder}>
                        <label htmlFor="orderId" className="block text-sm font-medium text-text-light">Enter your Order ID</label>
                        <div className="flex mt-1">
                            <input
                                type="text"
                                id="orderId"
                                value={orderIdInput}
                                onChange={(e) => setOrderIdInput(e.target.value)}
                                placeholder="e.g. ORD12345"
                                className="w-full border border-gray-300 rounded-l-md p-3 focus:ring-primary focus:border-primary"
                                aria-label="Order ID"
                            />
                            <button type="submit" className="bg-primary text-white font-bold px-6 rounded-r-md hover:bg-primary-dark transition-colors">
                                Track
                            </button>
                        </div>
                    </form>
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                </div>

                {foundOrder && (
                    <div className="max-w-4xl mx-auto mt-12 space-y-8">
                        <TrackingTimeline status={foundOrder.status} estimatedDelivery={foundOrder.estimatedDelivery} />
                        
                        <div className="bg-white p-6 rounded-lg shadow-md">
                             <h3 className="text-xl font-bold text-text-dark mb-4">Order Summary</h3>
                             <div className="grid grid-cols-2 gap-4 text-text-light">
                                <p><strong>Order ID:</strong> {foundOrder.orderId}</p>
                                <p><strong>Order Date:</strong> {foundOrder.date}</p>
                                <p><strong>Total Amount:</strong> ₹{foundOrder.total.toFixed(2)}</p>
                                <p><strong>Payment Method:</strong> {foundOrder.paymentMethod}</p>
                                <p className="col-span-2"><strong>Shipping Address:</strong> {foundOrder.address}</p>
                             </div>
                             <div className="text-center mt-6">
                                <Link to={`/orders/${foundOrder.orderId}`} className="text-primary hover:underline font-semibold">
                                    View Full Order Details
                                </Link>
                             </div>
                        </div>

                        {customerOrders.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Order History for {foundOrder.customerName}
                                </h3>
                                <div className="divide-y divide-gray-200">
                                    {customerOrders.map(order => (
                                        <div key={order.orderId} className="py-4">
                                            <div className="grid md:grid-cols-4 gap-4 items-center">
                                                <div>
                                                    <h4 className="font-bold text-text-dark text-sm">Order ID</h4>
                                                    <p className="text-sm text-text-light">{order.orderId}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-dark text-sm">Date</h4>
                                                    <p className="text-sm text-text-light">{order.date}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-dark text-sm">Total</h4>
                                                    <p className="text-sm text-text-light">₹{order.total.toFixed(2)}</p>
                                                </div>
                                                <div className="flex flex-col items-start md:items-end">
                                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                    <Link to={`/orders/${order.orderId}`} className="mt-2 text-primary font-semibold hover:underline text-sm inline-flex items-center gap-1">
                                                        View Details <ArrowRightIcon className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                 <div className="text-center mt-12">
                    <p className="text-text-light">
                        Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderPage;