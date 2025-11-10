
import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import { StarIcon, HeartIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { dispatch: cartDispatch } = useCart();
    const { wishlist, dispatch: wishlistDispatch } = useWishlist();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const isWishlisted = wishlist.some(item => item.id === product.id);

    const handleAddToCart = () => {
        cartDispatch({ type: 'ADD_ITEM', payload: product });
    };
    
    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        if (isWishlisted) {
            wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
        } else {
            wishlistDispatch({ type: 'ADD_ITEM', payload: product });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-primary-light text-primary-dark text-xs font-bold px-2 py-1 rounded">
                    Fresh up to {product.freshnessDays} days
                </div>
                 <button 
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-80 group-hover:opacity-100 transition-opacity"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <HeartIcon className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-text-dark truncate">{product.name}</h3>
                <div className="flex items-center my-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-secondary' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-sm text-text-light ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-primary-dark">₹{product.price}<span className="text-sm font-normal text-text-light">/{product.unit || 'kg'}</span></p>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
