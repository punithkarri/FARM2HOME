
import React, { useState, useEffect } from 'react';
import { Address, mockAddresses } from '../../data/addresses';
import AddressesList from '../../components/AddressesList';
import AddressFormModal from '../../components/AddressFormModal';
import { PlusIcon } from '../../components/Icons';

// Mock API call
const fetchAddresses = async (): Promise<Address[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockAddresses), 300));
};

const AddressesPage: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    useEffect(() => {
        document.title = 'Manage Addresses | Farm2Home.in';
        fetchAddresses().then(setAddresses);
    }, []);

    const handleSaveAddress = (address: Address) => {
        // This is a mock implementation
        // fireAnalyticsEvent('address_added');
        if (editingAddress) {
            setAddresses(prev => prev.map(a => a.id === address.id ? address : a));
        } else {
            setAddresses(prev => [...prev, { ...address, id: `addr-${Date.now()}` }]);
        }
        closeModal();
    };

    const handleDeleteAddress = (id: string) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };
    
    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    };

    const openEditModal = (address: Address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-dark">Manage Addresses</h2>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">
                    <PlusIcon className="h-5 w-5" /> Add New Address
                </button>
            </div>
            
            <AddressesList
                addresses={addresses}
                onEdit={openEditModal}
                onDelete={handleDeleteAddress}
                onSetDefault={handleSetDefault}
            />

            {isModalOpen && (
                <AddressFormModal
                    address={editingAddress}
                    onSave={handleSaveAddress}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default AddressesPage;
