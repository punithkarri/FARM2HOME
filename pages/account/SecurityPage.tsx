
import React from 'react';
import SecurityForm from '../../components/SecurityForm';

const SecurityPage: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-text-dark mb-6">Security Settings</h2>
            <SecurityForm />
        </div>
    );
};

export default SecurityPage;
