
import React from 'react';
import { Address } from '../data/addresses';
import { EditIcon, TrashIcon } from './Icons';

interface AddressesListProps {
    addresses: Address[];
    onEdit: (address: Address) => void;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
}

const AddressesList: React.FC<AddressesListProps> = ({ addresses, onEdit, onDelete, onSetDefault }) => {
    if (addresses.length === 0) {
        return <p className="text-text-light text-center py-8">You have no saved addresses.</p>;
    }

    return (
        <div className="space-y-4">
            {addresses.map(address => (
                <div key={address.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-text-dark">{address.label}</h3>
                            {address.isDefault && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">Default</span>
                            )}
                        </div>
                        <p className="text-sm text-text-light">{address.fullName}</p>
                        <p className="text-sm text-text-light">{address.addressLine}, {address.city}, {address.state} - {address.pincode}</p>
                        <p className="text-sm text-text-light">Phone: {address.phone}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:items-end gap-2">
                        <div className="flex items-center gap-2">
                            <button onClick={() => onEdit(address)} className="text-sm text-primary hover:underline flex items-center gap-1"><EditIcon className="h-4 w-4" /> Edit</button>
                            <span className="text-gray-300">|</span>
                            <button onClick={() => onDelete(address.id)} className="text-sm text-red-500 hover:underline flex items-center gap-1"><TrashIcon className="h-4 w-4" /> Delete</button>
                        </div>
                         {!address.isDefault && (
                            <button onClick={() => onSetDefault(address.id)} className="text-sm text-blue-600 hover:underline mt-2">
                                Set as Default
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddressesList;
