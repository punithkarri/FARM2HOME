import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock API functions
const mockOtpApi = {
    send: async (phone: string) => {
        // fireAnalyticsEvent('otp_send_attempt', { phone });
        return new Promise<{ ok: boolean, requestId: string, otpSent: boolean }>((resolve, reject) => {
            setTimeout(() => {
                if (/^\+?91\d{10}$/.test(phone.replace(/\s/g, ''))) {
                    console.log(`Sending OTP to ${phone}. Mock OTP: 123456`);
                    resolve({ ok: true, requestId: 'mock-request-id', otpSent: true });
                } else {
                    reject({ message: 'Invalid Indian phone number format.' });
                }
            }, 1000);
        });
    },
    verify: async (requestId: string, otp: string) => {
        // fireAnalyticsEvent('otp_verify_attempt', { requestId });
        return new Promise<{ ok: boolean, token: string, user: any }>((resolve, reject) => {
            setTimeout(() => {
                if (requestId === 'mock-request-id' && otp === '123456') {
                    // fireAnalyticsEvent('login_success', { method: 'otp' });
                    resolve({ ok: true, token: 'mock-otp-token', user: { name: 'OTP User' } });
                } else {
                    reject({ message: 'Invalid OTP. Please try again.' });
                }
            }, 1000);
        });
    }
};


interface OTPFormProps {
    onBackToEmailLogin: () => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ onBackToEmailLogin }) => {
    const [phone, setPhone] = useState('+91 ');
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOtpSent && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [isOtpSent, countdown]);

    const handleSendOtp = async () => {
        setError('');
        setLoading(true);
        try {
            const result = await mockOtpApi.send(phone);
            if (result.ok) {
                setRequestId(result.requestId);
                setIsOtpSent(true);
                setCountdown(60);
                setTimeout(() => inputRefs.current[0]?.focus(), 100);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit OTP.');
            return;
        }
        setLoading(true);
        try {
            const result = await mockOtpApi.verify(requestId, otpCode);
            if (result.ok) {
                localStorage.setItem('authToken', result.token);
                navigate('/orders');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };


    return (
        <div className="space-y-4">
            {!isOtpSent ? (
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required 
                           className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
                           placeholder="+91 12345 67890" value={phone} onChange={e => setPhone(e.target.value)} />
                    <button onClick={handleSendOtp} disabled={loading}
                            className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400">
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Send OTP'}
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-center text-sm text-gray-600 mb-2">Enter the 6-digit OTP sent to {phone}</p>
                    <div className="flex justify-center gap-2 mb-4">
                        {otp.map((digit, index) => (
                            <input key={index} type="text" maxLength={1} value={digit}
                                   // FIX: Add curly braces to ref callback to ensure it returns void.
                                   ref={el => { inputRefs.current[index] = el; }}
                                   onChange={e => handleOtpChange(e, index)}
                                   onKeyDown={e => handleKeyDown(e, index)}
                                   className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                        ))}
                    </div>

                    <button onClick={handleVerifyOtp} disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:bg-gray-400">
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Verify OTP'}
                    </button>

                    <div className="text-center text-sm mt-4">
                        {countdown > 0 ? (
                            <p className="text-gray-500">Resend OTP in {countdown}s</p>
                        ) : (
                            <button onClick={handleSendOtp} disabled={loading} className="font-medium text-primary hover:text-primary-dark">
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-sm text-red-600 text-center" aria-live="polite">{error}</p>}

             <div className="text-center">
                <button type="button" onClick={onBackToEmailLogin} className="font-medium text-primary hover:text-primary-dark text-sm">
                    &larr; Back to Email Login
                </button>
            </div>
        </div>
    );
};

export default OTPForm;