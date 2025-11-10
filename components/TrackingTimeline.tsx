
import React from 'react';
import { OrderStatus } from '../types';
import { CheckCircleIcon, PackageIcon, TruckIcon } from './Icons';

interface TrackingTimelineProps {
    status: OrderStatus;
    estimatedDelivery: string;
}

const STATUS_MAP: OrderStatus[] = [
    OrderStatus.Pending,
    OrderStatus.Packed,
    OrderStatus.Shipped,
    OrderStatus.OutForDelivery,
    OrderStatus.Delivered,
];

const ICONS = {
    [OrderStatus.Pending]: <CheckCircleIcon />,
    [OrderStatus.Packed]: <PackageIcon />,
    [OrderStatus.Shipped]: <TruckIcon />,
    [OrderStatus.OutForDelivery]: <TruckIcon />,
    [OrderStatus.Delivered]: <CheckCircleIcon />,
    [OrderStatus.Cancelled]: <CheckCircleIcon />
};

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ status, estimatedDelivery }) => {
    const currentIndex = STATUS_MAP.indexOf(status);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-text-dark mb-2">Order Tracking</h3>
            <p className="text-text-light mb-6">
                Estimated Delivery: <span className="font-semibold text-primary-dark">{estimatedDelivery}</span>
            </p>
            <div className="flex items-center">
                {STATUS_MAP.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const isLast = index === STATUS_MAP.length - 1;

                    return (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    {React.cloneElement(ICONS[step], { className: 'w-6 h-6' })}
                                </div>
                                <p className={`mt-2 text-xs text-center font-semibold ${isCompleted ? 'text-primary-dark' : 'text-text-light'}`}>
                                    {step}
                                </p>
                            </div>
                            {!isLast && (
                                <div className={`flex-1 h-1 mx-2 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default TrackingTimeline;