
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { CartItem, Product } from '../types';

type CartState = {
    cartItems: CartItem[];
};

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'SET_CART'; payload: CartItem[] };

const initialState: CartState = {
    cartItems: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                };
            }
        
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload),
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(x =>
                    x.id === action.payload.id ? { ...x, quantity: action.payload.quantity } : x
                ).filter(item => item.quantity > 0),
            };
        
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };

        case 'SET_CART':
            return {
                ...state,
                cartItems: action.payload,
            };

        default:
            return state;
    }
};

interface CartContextType {
    state: CartState;
    dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType>({
    state: initialState,
    dispatch: () => null
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('farm2home_cart');
            if (storedCart) {
                dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
            }
        } catch (error) {
            console.error("Could not parse cart from localStorage", error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('farm2home_cart', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
