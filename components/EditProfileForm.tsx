
import React, { useState } from 'react';
import { UserProfile } from '../data/user';
import { CameraIcon } from './Icons';

interface EditProfileFormProps {
    user: UserProfile;
    onSave: (updatedUser: UserProfile) => void;
    onCancel: () => void;
}

// Mock API call
const updateUserProfile = async (user: UserProfile): Promise<UserProfile> => {
    console.log("Saving user profile:", user);
    // fireAnalyticsEvent('profile_updated');
    return new Promise(resolve => setTimeout(() => resolve(user), 1000));
};


const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState<UserProfile>(user);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             const { checked } = e.target as HTMLInputElement;
             setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, [name]: checked }
            }));
        } else {
             setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Mock upload: in a real app, upload file to server and get URL
            // fireAnalyticsEvent('avatar_uploaded');
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            setFormData(prev => ({...prev, avatarUrl: previewUrl }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedUser = await updateUserProfile(formData);
            onSave(updatedUser);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-text-dark mb-6">Edit Profile</h2>
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img src={avatarPreview || formData.avatarUrl} alt={formData.fullName} className="w-24 h-24 rounded-full object-cover" />
                        <label htmlFor="avatar" className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary-dark">
                            <CameraIcon className="w-4 h-4" />
                            <input type="file" id="avatar" name="avatar" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                        </label>
                    </div>
                     <div className="flex-1">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} disabled className="mt-1 w-full border-gray-300 rounded-md shadow-sm bg-gray-100" />
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                
                 <div className="flex items-center">
                    <input type="checkbox" id="newsletter" name="newsletter" checked={formData.preferences.newsletter} onChange={handleChange} className="h-4 w-4 text-primary border-gray-300 rounded" />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">Subscribe to newsletter</label>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-text-dark font-bold py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" disabled={isLoading} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark disabled:bg-gray-400">
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditProfileForm;
