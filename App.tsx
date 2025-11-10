
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ReturnsPage from './pages/ReturnsPage';
import FruitsPage from './pages/FruitsPage';
import LoginPage from './pages/LoginPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import ProtectedRoute from './components/ProtectedRoute';
import AccountLayout from './components/AccountLayout';
import AccountDashboardPage from './pages/account/AccountDashboardPage';
import ProfilePage from './pages/account/ProfilePage';
import AddressesPage from './pages/account/AddressesPage';
import WishlistPage from './pages/account/WishlistPage';
import SecurityPage from './pages/account/SecurityPage';


const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <HashRouter>
                    <ScrollToTop />
                    <div className="flex flex-col min-h-screen bg-gray-50 text-text-dark">
                        <Header />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/fruits" element={<FruitsPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/delivery" element={<DeliveryPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                                <Route path="/track" element={<TrackOrderPage />} />
                                <Route path="/returns" element={<ReturnsPage />} />
                                <Route path="/login" element={<LoginPage />} />

                                {/* Protected Account Routes */}
                                <Route path="/account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
                                    <Route index element={<AccountDashboardPage />} />
                                    <Route path="profile" element={<ProfilePage />} />
                                    <Route path="addresses" element={<AddressesPage />} />
                                    <Route path="wishlist" element={<WishlistPage />} />
                                    <Route path="security" element={<SecurityPage />} />
                                </Route>
                                
                                {/* Existing Order routes can also be protected */}
                                <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                                <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />

                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </HashRouter>
            </WishlistProvider>
        </CartProvider>
    );
}

export default App;
