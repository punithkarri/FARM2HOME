
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import { LeafIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-dark mb-4">
                            <LeafIcon className="h-8 w-8 text-primary" />
                            <span>Farm2Home.in</span>
                        </Link>
                        <p className="text-text-light text-sm">Freshness That Lasts — From Farm to Home.</p>
                        <div className="flex space-x-4 mt-6">
                            {SOCIAL_LINKS.map(social => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-primary transition-colors">
                                    {React.cloneElement(social.icon, { className: 'h-6 w-6' })}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-dark mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.slice(1).map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-text-light hover:text-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                             <li>
                                <Link to="/cart" className="text-text-light hover:text-primary transition-colors">Your Cart</Link>
                            </li>
                             <li>
                                <Link to="/orders" className="text-text-light hover:text-primary transition-colors">My Orders</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-dark mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-text-light hover:text-primary transition-colors">FAQs</a></li>
                            <li><Link to="/returns" className="text-text-light hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-text-light hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-dark mb-4">Contact Us</h3>
                        <p className="text-text-light">Hyderabad, Telangana, India</p>
                        <p className="text-text-light mt-2">
                            Email: <a href="mailto:support@farm2home.in" className="text-primary hover:underline">support@farm2home.in</a>
                        </p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-300 pt-8 text-center text-sm text-text-light">
                    <p>&copy; {new Date().getFullYear()} Farm2Home.in. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;