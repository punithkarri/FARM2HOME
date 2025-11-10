
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { TrashIcon, CartIcon } from './Icons';

interface WishlistListProps {
    wishlist: Product[];
}

const WishlistList: React.FC<WishlistListProps> = ({ wishlist }) => {
    const { dispatch: cartDispatch } = useCart();
    const { dispatch: wishlistDispatch } = useWishlist();

    const handleMoveToCart = (product: Product) => {
        cartDispatch({ type: 'ADD_ITEM', payload: product });
        wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    };

    const handleRemove = (id: number) => {
        wishlistDispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-text-light mb-4">Your wishlist is empty.</p>
                <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Discover Products
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {wishlist.map(product => (
                <div key={product.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                        <div>
                            <h3 className="font-semibold text-text-dark">{product.name}</h3>
                            <p className="text-primary-dark font-bold text-lg">₹{product.price}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => handleMoveToCart(product)}
                            className="bg-primary-light text-primary-dark font-semibold py-2 px-3 rounded-md hover:bg-primary-light/80 flex items-center gap-2 text-sm"
                        >
                           <CartIcon className="h-4 w-4" /> Move to Cart
                        </button>
                        <button onClick={() => handleRemove(product.id)} className="text-red-500 hover:text-red-700 p-2">
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistList;
