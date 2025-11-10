
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { Product } from '../types';

type WishlistState = {
    wishlist: Product[];
};

type WishlistAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'SET_WISHLIST'; payload: Product[] };

const initialState: WishlistState = {
    wishlist: [],
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_ITEM':
            const item = action.payload;
            const existItem = state.wishlist.find(x => x.id === item.id);
            if (existItem) {
                return state; // Item already in wishlist
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, item],
                };
            }
        
        case 'REMOVE_ITEM':
            return {
                ...state,
                wishlist: state.wishlist.filter(x => x.id !== action.payload),
            };

        case 'SET_WISHLIST':
            return {
                ...state,
                wishlist: action.payload,
            };

        default:
            return state;
    }
};

interface WishlistContextType {
    wishlist: Product[];
    dispatch: Dispatch<WishlistAction>;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlist: initialState.wishlist,
    dispatch: () => null
});

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        try {
            const storedWishlist = localStorage.getItem('farm2home_wishlist');
            if (storedWishlist) {
                dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(storedWishlist) });
            }
        } catch (error) {
            console.error("Could not parse wishlist from localStorage", error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('farm2home_wishlist', JSON.stringify(state.wishlist));
    }, [state.wishlist]);

    return (
        <WishlistContext.Provider value={{ wishlist: state.wishlist, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};
