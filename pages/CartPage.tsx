
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
    const { state, dispatch } = useCart();
    const { cartItems } = state;
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const updateQuantityHandler = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const removeItemHandler = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };
    
    const applyCouponHandler = () => {
        if (coupon.toUpperCase() === 'FARM10') {
            setDiscount(0.10);
            alert('Coupon applied successfully!');
        } else {
            alert('Invalid coupon code.');
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const discountAmount = subtotal * discount;
    const deliveryFee = subtotal > 0 && subtotal < 499 ? 50 : 0;
    const total = subtotal - discountAmount + deliveryFee;

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-text-dark text-center mb-8">Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md">
                        <p className="text-xl text-text-light mb-4">Your cart is empty.</p>
                        <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Cart Items ({cartItems.reduce((a, c) => a + c.quantity, 0)})</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                            <div>
                                                <h3 className="font-semibold text-text-dark">{item.name}</h3>
                                                <p className="text-text-light text-sm">₹{item.price}/kg</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border rounded-md">
                                                <button onClick={() => updateQuantityHandler(item.id, item.quantity - 1)} className="p-2 text-text-light hover:text-primary"><MinusIcon /></button>
                                                <span className="px-3 font-semibold">{item.quantity}</span>
                                                <button onClick={() => updateQuantityHandler(item.id, item.quantity + 1)} className="p-2 text-text-light hover:text-primary"><PlusIcon /></button>
                                            </div>
                                            <p className="font-bold w-20 text-right">₹{item.price * item.quantity}</p>
                                            <button onClick={() => removeItemHandler(item.id)} className="text-red-500 hover:text-red-700 p-2"><TrashIcon /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                           <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-3 text-text-light">
                                    <div className="flex justify-between"><span>Subtotal</span> <span className="font-semibold text-text-dark">₹{subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Delivery Fee</span> <span className="font-semibold text-text-dark">{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}</span></div>
                                    {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span> <span>- ₹{discountAmount.toFixed(2)}</span></div>}
                                    <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-text-dark"><span>Total</span> <span>₹{total.toFixed(2)}</span></div>
                                </div>
                                <div className="mt-6">
                                    <label className="font-semibold text-sm">Coupon Code</label>
                                    <div className="flex mt-1">
                                        <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="e.g. FARM10" className="w-full border rounded-l-md p-2" />
                                        <button onClick={applyCouponHandler} className="bg-primary-dark text-white font-semibold px-4 rounded-r-md">Apply</button>
                                    </div>
                                </div>
                                <Link to="/checkout" className="w-full block text-center mt-6 bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-dark transition-colors duration-300">
                                    Proceed to Checkout
                                </Link>
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;