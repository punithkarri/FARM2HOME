import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../data/orders';
import { OrderStatus } from '../types';
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

const OrdersPage: React.FC = () => {

     useEffect(() => {
        document.title = 'My Orders | Farm2Home.in';
    }, []);

    const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-text-dark text-center mb-8">My Orders</h1>
                {sortedOrders.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md">
                        <p className="text-xl text-text-light mb-4">You have not placed any orders yet.</p>
                        <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {sortedOrders.map(order => (
                            <div key={order.orderId} className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg">
                                <div className="grid md:grid-cols-4 gap-4 items-center">
                                    <div>
                                        <h3 className="font-bold text-text-dark">Order ID</h3>
                                        <p className="text-sm text-text-light">{order.orderId}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-dark">Date</h3>
                                        <p className="text-sm text-text-light">{order.date}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-dark">Total</h3>
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
                )}
            </div>
        </div>
    );
};

export default OrdersPage;