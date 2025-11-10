import React, { useState } from 'react';

// Mock API
// FIX: Added explicit return type to the function to allow TypeScript to infer the shape of the response.
const changePassword = async (data: any): Promise<{ ok: boolean }> => {
    console.log("Changing password with data:", data);
    return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 1000));
};

const SecurityForm: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await changePassword({ currentPassword, newPassword });
            if (response.ok) {
                setSuccess('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            setError('Failed to update password. Please check your current password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="divide-y divide-gray-200 max-w-lg">
            {/* Change Password */}
            <div className="py-6">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Change Password</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <div className="text-right">
                        <button type="submit" disabled={isLoading} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark disabled:bg-gray-400">
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication Placeholder */}
            <div className="py-6">
                 <h3 className="text-lg font-semibold text-text-dark mb-2">Two-Factor Authentication</h3>
                 <div className="flex items-center justify-between">
                    <p className="text-sm text-text-light">Add an extra layer of security to your account.</p>
                    <button disabled className="bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-md cursor-not-allowed">Enable</button>
                 </div>
            </div>
            
             {/* Connected Accounts Placeholder */}
            <div className="py-6">
                 <h3 className="text-lg font-semibold text-text-dark mb-2">Connected Accounts</h3>
                 <p className="text-sm text-text-light">Manage your social logins. (Coming Soon)</p>
            </div>
        </div>
    );
};

export default SecurityForm;