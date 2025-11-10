
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { state, dispatch } = useCart();
    const { cartItems } = state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: 'UPI',
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const deliveryFee = subtotal > 0 && subtotal < 499 ? 50 : 0;
    const total = subtotal + deliveryFee;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.address) {
            alert('Please fill in your name and address.');
            return;
        }
        // In a real app, you'd process payment here
        console.log('Order placed:', { ...formData, cartItems, total });
        dispatch({ type: 'CLEAR_CART' });
        navigate('/order-confirmation');
    };

    if (cartItems.length === 0) {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                 <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                 <p className="mt-4">You cannot proceed to checkout without items in your cart.</p>
             </div>
        );
    }


    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-text-dark text-center mb-8">Checkout</h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-light">Full Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label htmlFor="address" className="block text-sm font-medium text-text-light">Delivery Address</label>
                                <input type="text" name="address" id="address" required value={formData.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-text-light">Payment Method</label>
                                <select name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                    <option>UPI</option>
                                    <option>Credit/Debit Card</option>
                                    <option>Cash on Delivery (COD)</option>
                                </select>
                            </div>
                             <button type="submit" className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors duration-300">
                                Place Order
                            </button>
                        </form>
                    </div>
                    <div className="lg:col-span-1">
                       <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                            <h2 className="text-xl font-bold mb-4">Your Order</h2>
                            <div className="space-y-2">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="font-medium">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t my-4"></div>
                            <div className="space-y-3 text-text-light">
                                <div className="flex justify-between"><span>Subtotal</span> <span className="font-semibold text-text-dark">₹{subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Delivery Fee</span> <span className="font-semibold text-text-dark">{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}</span></div>
                                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-text-dark"><span>Total</span> <span>₹{total.toFixed(2)}</span></div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
