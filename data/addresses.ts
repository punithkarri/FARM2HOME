
export interface Address {
    id: string;
    label: 'Home' | 'Work' | 'Other';
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

export const mockAddresses: Address[] = [
    {
        id: 'addr-001',
        label: 'Home',
        fullName: 'Priya S.',
        phone: '+91 98765 43210',
        addressLine: '123, Jubilee Hills, Road No. 45',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        isDefault: true,
    },
    {
        id: 'addr-002',
        label: 'Work',
        fullName: 'Priya S.',
        phone: '+91 98765 43210',
        addressLine: 'The V, Plot No. 17, Software Units Layout',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500081',
        isDefault: false,
    },
];
