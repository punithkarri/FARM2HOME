
import React from 'react';
import { FacebookIcon, InstagramIcon, UserIcon, MapPinIcon, HeartIcon, ShieldCheckIcon, PackageIcon as BoxIcon } from './components/Icons';

export const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Vegetables', path: '/shop' },
    { name: 'Fruits', path: '/fruits' },
    { name: 'Our Story', path: '/about' },
    { name: 'Delivery', path: '/delivery' },
    { name: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/farm2home' },
    { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com/farm2home' },
];

export const ACCOUNT_NAV_LINKS = [
    { name: 'Dashboard', path: '/account', icon: <UserIcon /> },
    { name: 'Profile Information', path: '/account/profile', icon: <UserIcon /> },
    { name: 'Manage Addresses', path: '/account/addresses', icon: <MapPinIcon /> },
    { name: 'My Orders', path: '/orders', icon: <BoxIcon /> },
    { name: 'My Wishlist', path: '/account/wishlist', icon: <HeartIcon /> },
    { name: 'Security', path: '/account/security', icon: <ShieldCheckIcon /> },
];
