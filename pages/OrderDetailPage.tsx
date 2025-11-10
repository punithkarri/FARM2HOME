import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orders } from '../data/orders';

const OrderDetailPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const order = orders.find(o => o.orderId === orderId);
    
    useEffect(() => {
        if (order) {
            document.title = `Order ${order.orderId} | Farm2Home.in`;
        } else {
             document.title = 'Order Not Found | Farm2Home.in';
        }
    }, [order]);

    if (!order) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600">Order Not Found</h1>
                <p className="mt-4 text-text-light">We couldn't find an order with that ID. Please check the order number and try again.</p>
                <div className="mt-8">
                     <Link to="/orders" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                        Back to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/orders" className="text-primary hover:underline">&larr; Back to My Orders</Link>
                </div>
                <h1 className="text-3xl font-extrabold text-text-dark mb-2">Order Details</h1>
                <p className="text-text-light mb-8">Order ID: {order.orderId} &bull; Placed on {order.date}</p>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Items Ordered</h2>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                        <div>
                                            <h3 className="font-semibold text-text-dark">{item.name}</h3>
                                            <p className="text-text-light text-sm">₹{item.price.toFixed(2)} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                       <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Summary</h2>
                            <div className="space-y-3 text-text-light">
                                <div className="flex justify-between"><span>Subtotal</span> <span className="font-semibold text-text-dark">₹{order.subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Delivery Fee</span> <span className="font-semibold text-text-dark">₹{order.deliveryFee.toFixed(2)}</span></div>
                                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-text-dark"><span>Total</span> <span>₹{order.total.toFixed(2)}</span></div>
                                <div className="pt-2">Paid with {order.paymentMethod}</div>
                            </div>
                       </div>
                       <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Delivery Address</h2>
                            <p className="text-text-light">{order.customerName}</p>
                            <p className="text-text-light">{order.address}</p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;