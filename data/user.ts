
export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    avatarUrl: string;
    preferences: {
        newsletter: boolean;
        deliveryTime: 'morning' | 'afternoon' | 'evening';
    };
}

export const mockUser: UserProfile = {
    id: 'user-001',
    fullName: 'Priya S.',
    email: 'test@farm2home.in',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-05-15',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160',
    preferences: {
        newsletter: true,
        deliveryTime: 'morning',
    },
};
