
import React from 'react';
import { Link } from 'react-router-dom';
import { orders } from '../../data/orders';
import { OrderStatus } from '../../types';
import { ArrowRightIcon } from '../../components/Icons';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Delivered: return 'bg-green-100 text-green-800';
        case OrderStatus.Cancelled: return 'bg-red-100 text-red-800';
        case OrderStatus.OutForDelivery: return 'bg-blue-100 text-blue-800';
        default: return 'bg-yellow-100 text-yellow-800';
    }
};

const AccountDashboardPage: React.FC = () => {
    const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-dark mb-6">Dashboard</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-text-dark mb-4">Recent Orders</h3>
                    {recentOrders.length > 0 ? (
                         <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.orderId} className="border rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                    <div>
                                        <p className="font-semibold text-sm">{order.orderId}</p>
                                        <p className="text-xs text-text-light">{order.date}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="font-semibold text-sm">₹{order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <Link to={`/orders/${order.orderId}`} className="text-primary font-semibold hover:underline text-sm inline-flex items-center gap-1">
                                            View Details <ArrowRightIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                         </div>
                    ) : (
                        <p className="text-text-light">You have no recent orders.</p>
                    )}
                     <div className="mt-4">
                        <Link to="/orders" className="text-primary font-semibold hover:underline">View All Orders &rarr;</Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-text-dark mb-2">My Profile</h4>
                        <p className="text-sm text-text-light mb-3">Manage your personal information and preferences.</p>
                        <Link to="/account/profile" className="text-primary font-semibold hover:underline text-sm">Edit Profile &rarr;</Link>
                    </div>
                    <div className="border rounded-lg p-4">
                         <h4 className="font-semibold text-text-dark mb-2">My Addresses</h4>
                        <p className="text-sm text-text-light mb-3">Add or edit your delivery addresses.</p>
                        <Link to="/account/addresses" className="text-primary font-semibold hover:underline text-sm">Manage Addresses &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDashboardPage;
