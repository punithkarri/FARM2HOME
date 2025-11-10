
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { CartIcon, LeafIcon, MenuIcon, CloseIcon, UserIcon, ChevronDownIcon } from './Icons';

const AccountDropdown: React.FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        onLinkClick();
        logout();
        navigate('/');
    };

    return (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-text-dark">Signed in as</p>
                    <p className="truncate text-sm text-text-light">{user?.email}</p>
                </div>
                <NavLink to="/account/profile" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'bg-gray-100 text-primary' : 'text-text-dark'} hover:bg-gray-100`} onClick={onLinkClick}>My Profile</NavLink>
                <NavLink to="/orders" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'bg-gray-100 text-primary' : 'text-text-dark'} hover:bg-gray-100`} onClick={onLinkClick}>My Orders</NavLink>
                <NavLink to="/account/wishlist" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'bg-gray-100 text-primary' : 'text-text-dark'} hover:bg-gray-100`} onClick={onLinkClick}>My Wishlist</NavLink>
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                </button>
            </div>
        </div>
    );
};


const Header: React.FC = () => {
    const { state } = useCart();
    const { isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    const cartItemCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setIsAccountMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `text-lg font-medium transition-colors duration-300 hover:text-primary ${isActive ? 'text-primary' : 'text-text-dark'}`;

    const mainNavLinks = NAV_LINKS;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-dark">
                        <LeafIcon className="h-8 w-8 text-primary" />
                        <span>Farm2Home.in</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {mainNavLinks.map(link => (
                            <NavLink key={link.name} to={link.path} className={navLinkClasses}>
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-4">
                            {isAuthenticated ? (
                                <div className="relative" ref={accountMenuRef}>
                                    <button onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} className="flex items-center gap-2 font-semibold text-primary-dark py-2 px-4 rounded-md hover:bg-gray-100">
                                        <UserIcon className="h-5 w-5" />
                                        <span>Account</span>
                                        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isAccountMenuOpen && <AccountDropdown onLinkClick={() => setIsAccountMenuOpen(false)} />}
                                </div>
                            ) : (
                                <>
                                 <Link to="/login" className="text-primary-dark font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm">
                                       Login
                                 </Link>
                                 <Link to="/track" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 text-sm">
                                    Track My Order
                                 </Link>
                                </>
                            )}
                        </div>

                        <Link to="/cart" className="relative p-2 text-text-dark hover:text-primary transition-colors">
                            <CartIcon className="h-7 w-7" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-secondary rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className="lg:hidden p-2 text-text-dark"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <MenuIcon className="h-7 w-7" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-primary-dark">Menu</h2>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                    {isAuthenticated ? (
                       <div className="border-b pb-2 mb-2">
                         <NavLink to="/account/profile" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>
                         <NavLink to="/orders" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Orders</NavLink>
                         <NavLink to="/account/wishlist" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Wishlist</NavLink>
                       </div>
                    ) : (
                       <NavLink to="/login" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                    )}

                    {NAV_LINKS.map(link => (
                        <NavLink key={link.name} to={link.path} className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </NavLink>
                    ))}
                     <NavLink to="/track" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Track My Order</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
