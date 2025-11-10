
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../data/user';

// In a real app, you would decode the JWT to get user info
const getAuth = () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
        return { isAuthenticated: true, user: mockUser };
    }
    return { isAuthenticated: false, user: null };
};

export const useAuth = () => {
    const [authState, setAuthState] = useState(getAuth());
    const navigate = useNavigate();

    // Listen for storage changes to sync across tabs
    useEffect(() => {
        const handleStorageChange = () => {
            setAuthState(getAuth());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token: string, rememberMe: boolean) => {
        if (rememberMe) {
            localStorage.setItem('authToken', token);
        } else {
            sessionStorage.setItem('authToken', token);
        }
        setAuthState(getAuth());
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setAuthState({ isAuthenticated: false, user: null });
        // Optionally redirect to home page after logout
        navigate('/');
    };

    return { ...authState, login, logout };
};
