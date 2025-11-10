
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ACCOUNT_NAV_LINKS } from '../constants';
import { useAuth } from '../hooks/useAuth';

const AccountSidebar: React.FC = () => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-primary text-white' : 'text-text-dark hover:bg-gray-100'
        }`;
    
    // Exclude Dashboard from the main list as it's the parent
    const links = ACCOUNT_NAV_LINKS.filter(link => link.path !== '/account');

    return (
        <aside className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
                {links.map(link => (
                    <NavLink key={link.name} to={link.path} className={navLinkClasses} end={link.path === "/orders"}>
                         {React.cloneElement(link.icon, { className: 'h-5 w-5' })}
                         <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};


const AccountLayout: React.FC = () => {
    const { user } = useAuth();
    
    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-left mb-8">
                    <h1 className="text-3xl font-extrabold text-text-dark">My Account</h1>
                    <p className="mt-2 text-lg text-text-light">Welcome back, {user.fullName}!</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <AccountSidebar />
                    <main className="flex-1">
                         <div className="bg-white rounded-lg shadow-md p-6 min-h-[60vh]">
                            <Outlet />
                         </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;
