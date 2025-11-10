
import React from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import WishlistList from '../../components/WishlistList';

const WishlistPage: React.FC = () => {
    const { wishlist } = useWishlist();

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-dark mb-6">My Wishlist</h2>
            <WishlistList wishlist={wishlist} />
        </div>
    );
};

export default WishlistPage;
