
import React, { useState, useEffect } from 'react';
import { mockUser, UserProfile } from '../../data/user';
import { EditIcon } from '../../components/Icons';
import EditProfileForm from '../../components/EditProfileForm';

// Mock API call
const fetchUserProfile = async (): Promise<UserProfile> => {
    return new Promise(resolve => setTimeout(() => resolve(mockUser), 500));
};

const ProfileCard: React.FC<{ user: UserProfile, onEdit: () => void }> = ({ user, onEdit }) => (
    <div>
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Profile Information</h2>
            <button onClick={onEdit} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                <EditIcon className="h-4 w-4" /> Edit
            </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={user.avatarUrl} alt={user.fullName} className="w-32 h-32 rounded-full object-cover shadow-md" />
            <div className="space-y-3">
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Newsletter:</strong> {user.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
            </div>
        </div>
    </div>
);


const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'My Profile | Farm2Home.in';
        fetchUserProfile().then(data => {
            setUser(data);
            setIsLoading(false);
        });
    }, []);

    const handleProfileSave = (updatedUser: UserProfile) => {
        setUser(updatedUser);
        setIsEditing(false);
        // Here you would show a success toast
    };

    if (isLoading || !user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            {isEditing ? (
                <EditProfileForm 
                    user={user}
                    onSave={handleProfileSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ProfileCard user={user} onEdit={() => setIsEditing(true)} />
            )}
        </div>
    );
};

export default ProfilePage;
