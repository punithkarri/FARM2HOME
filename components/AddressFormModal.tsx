
import React, { useState } from 'react';
import { Address } from '../data/addresses';

interface AddressFormModalProps {
    address: Address | null;
    onSave: (address: Address) => void;
    onClose: () => void;
}

const emptyAddress: Omit<Address, 'id'> = {
    label: 'Home',
    fullName: '',
    phone: '',
    addressLine: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '',
    isDefault: false,
};

const AddressFormModal: React.FC<AddressFormModalProps> = ({ address, onSave, onClose }) => {
    const [formData, setFormData] = useState(address ? { ...address } : { ...emptyAddress, id: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            onSave(formData as Address);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-text-dark mb-4">{address ? 'Edit Address' : 'Add New Address'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                             <div className="col-span-2">
                                <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" name="addressLine" value={formData.addressLine} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                                <select name="label" value={formData.label} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                    <option>Home</option>
                                    <option>Work</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-text-dark font-bold py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isLoading} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark disabled:bg-gray-400">
                             {isLoading ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressFormModal;
