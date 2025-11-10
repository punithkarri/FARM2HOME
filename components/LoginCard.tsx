import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LeafIcon } from './Icons';
import OTPForm from './OTPForm';

// Mock API functions (replace with actual API calls)
const mockApi = {
    // FIX: Add types to mock API function to resolve destructuring error.
    // FIX: The promise was resolving with an object containing `ok`, `token`, and `user`, but the type only specified `token`.
    login: async (email: string, password: string): Promise<{ ok: boolean; token: string; user: { name: string } }> => {
        console.log('Attempting login with:', { email, password });
        // fireAnalyticsEvent('login_attempt', { method: 'password' });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'test@farm2home.in' && password === 'password123') {
                    // fireAnalyticsEvent('login_success', { method: 'password' });
                    resolve({ ok: true, token: 'mock-jwt-token', user: { name: 'Test User' } });
                } else {
                    reject({ message: 'Invalid email or password.' });
                }
            }, 1000);
        });
    },
    // FIX: Add types to mock API function to resolve destructuring error.
    // FIX: The promise was resolving with an object containing `ok`, `token`, and `user`, but the type only specified `token`.
    socialLogin: async (provider: 'google' | 'facebook'): Promise<{ ok: boolean; token: string; user: { name: string } }> => {
        console.log(`Attempting social login with: ${provider}`);
        // fireAnalyticsEvent('login_attempt', { method: provider });
        return new Promise((resolve) => {
            setTimeout(() => {
                // fireAnalyticsEvent('login_success', { method: provider });
                resolve({ ok: true, token: 'mock-oauth-token', user: { name: `${provider} User` } });
            }, 1500);
        });
    },
    requestPasswordReset: async (email: string): Promise<{ ok: boolean }> => {
        console.log(`Requesting password reset for: ${email}`);
        // fireAnalyticsEvent('password_reset_request', { email });
        return new Promise((resolve) => {
            // In a real app, this would always resolve true to prevent email enumeration
            setTimeout(() => resolve({ ok: true }), 1000);
        });
    },
};


const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.84-2.22.82-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

const FacebookIconBrand: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" fill="#1877F2"/>
    </svg>
);


const LoginCard: React.FC = () => {
    const [mode, setMode] = useState<'email' | 'otp' | 'forgot'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        setLoading(true);
        try {
            const { token } = await mockApi.login(email, password);
            if (rememberMe) {
                localStorage.setItem('authToken', token);
            } else {
                sessionStorage.setItem('authToken', token);
            }
            navigate('/orders');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const { token } = await mockApi.socialLogin(provider);
            localStorage.setItem('authToken', token);
            navigate('/orders');
        } catch (err: any) {
             setError('Social login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setLoading(true);
        try {
            await mockApi.requestPasswordReset(email);
            setSuccess('If an account with that email exists, a password reset link has been sent.');
        } catch (err: any) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center">
                 <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary-dark mb-2">
                    <LeafIcon className="h-8 w-8 text-primary" />
                    <span>Farm2Home.in</span>
                </Link>
                <p className="text-text-light">
                    {mode === 'forgot' ? 'Reset your password' : 'Welcome back! Freshness awaits.'}
                </p>
            </div>
            
            {mode === 'email' && (
                <form className="space-y-4" onSubmit={handleEmailLogin}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
                               placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
                               placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                                   className="h-4 w-4 text-primary focus:ring-primary-light border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                        </div>
                        <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="font-medium text-primary hover:text-primary-dark">Forgot password?</button>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center" aria-live="polite">{error}</p>}

                    <div>
                        <button type="submit" disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400">
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Log In'}
                        </button>
                    </div>
                     <div className="text-center">
                        <button type="button" onClick={() => { setMode('otp'); setError(''); setSuccess(''); }} className="font-medium text-primary hover:text-primary-dark text-sm">
                            Login with Phone OTP instead
                        </button>
                    </div>
                </form>
            )}

            {mode === 'otp' && (
                <OTPForm onBackToEmailLogin={() => { setMode('email'); setError(''); setSuccess(''); }} />
            )}

            {mode === 'forgot' && (
                <form className="space-y-4" onSubmit={handleForgotPassword}>
                     <p className="text-sm text-center text-gray-600">Enter your email and we'll send you a link to get back into your account.</p>
                     <div>
                        <label htmlFor="email-forgot" className="sr-only">Email address</label>
                        <input id="email-forgot" name="email" type="email" autoComplete="email" required 
                               className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
                               placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center" aria-live="polite">{error}</p>}
                    {success && <p className="text-sm text-green-600 text-center" aria-live="polite">{success}</p>}

                    <div>
                        <button type="submit" disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400">
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Send Reset Link'}
                        </button>
                    </div>

                     <div className="text-center">
                        <button type="button" onClick={() => { setMode('email'); setError(''); setSuccess(''); }} className="font-medium text-primary hover:text-primary-dark text-sm">
                            &larr; Back to Login
                        </button>
                    </div>
                </form>
            )}

            {mode !== 'forgot' && (
                <>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onClick={() => handleSocialLogin('google')} type="button" className="inline-flex items-center justify-center w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <GoogleIcon className="w-5 h-5 mr-2" />
                            Continue with Google
                        </button>
                        <button onClick={() => handleSocialLogin('facebook')} type="button" className="inline-flex items-center justify-center w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <FacebookIconBrand className="w-5 h-5 mr-2" />
                           Continue with Facebook
                        </button>
                    </div>
                    
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <a href="#" className="font-medium text-primary hover:text-primary-dark">Create an account</a>
                    </p>
                </>
            )}
            
            <p className="text-xs text-center text-gray-400">
                We'll never share your information with anyone.
            </p>
        </div>
    );
};

export default LoginCard;