import { Order, OrderStatus } from '../types';

export const orders: Order[] = [
    {
        orderId: 'ORD12345',
        customerName: 'Priya S.',
        date: '2024-07-28',
        status: OrderStatus.OutForDelivery,
        items: [
            { id: 3, name: 'Juicy Tomatoes', quantity: 2, price: 50, image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 1, name: 'Organic Spinach', quantity: 1, price: 80, image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400' }
        ],
        subtotal: 180,
        deliveryFee: 50,
        total: 230,
        paymentMethod: 'UPI',
        address: '123, Jubilee Hills, Hyderabad, Telangana',
        estimatedDelivery: '2024-07-29'
    },
    {
        orderId: 'ORD67890',
        customerName: 'Ankit R.',
        date: '2024-07-27',
        status: OrderStatus.Delivered,
        items: [
            { id: 2, name: 'Farm-Fresh Carrots', quantity: 3, price: 60, image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 7, name: 'Crunchy Cucumbers', quantity: 2, price: 40, image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 5, name: 'Organic Potatoes', quantity: 2, price: 45, image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400' }
        ],
        subtotal: 350,
        deliveryFee: 50,
        total: 400,
        paymentMethod: 'Credit Card',
        address: '456, Hitec City, Secunderabad, Telangana',
        estimatedDelivery: '2024-07-28'
    },
    {
        orderId: 'ORD54321',
        customerName: 'Sunita M.',
        date: '2024-07-29',
        status: OrderStatus.Packed,
        items: [
            { id: 6, name: 'Fresh Broccoli', quantity: 1, price: 120, image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400' }
        ],
        subtotal: 120,
        deliveryFee: 50,
        total: 170,
        paymentMethod: 'Cash on Delivery (COD)',
        address: '789, Gachibowli, Hyderabad, Telangana',
        estimatedDelivery: '2024-07-30'
    },
    {
        orderId: 'ORD11223',
        customerName: 'Ravi K.',
        date: '2024-07-30',
        status: OrderStatus.Pending,
        items: [
            { id: 8, name: 'Organic Kale', quantity: 2, price: 90, image: 'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 4, name: 'Crisp Lettuce', quantity: 1, price: 70, image: 'https://images.pexels.com/photos/2893636/pexels-photo-2893636.jpeg?auto=compress&cs=tinysrgb&w=400' }
        ],
        subtotal: 250,
        deliveryFee: 50,
        total: 300,
        paymentMethod: 'UPI',
        address: '321, Kondapur, Hyderabad, Telangana',
        estimatedDelivery: '2024-07-31'
    },
    {
        orderId: 'ORD44556',
        customerName: 'Priya S.',
        date: '2024-07-26',
        status: OrderStatus.Cancelled,
        items: [
            { id: 6, name: 'Fresh Broccoli', quantity: 2, price: 120, image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400' },
            { id: 2, name: 'Farm-Fresh Carrots', quantity: 1, price: 60, image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400' }
        ],
        subtotal: 300,
        deliveryFee: 50,
        total: 350,
        paymentMethod: 'Credit Card',
        address: '123, Jubilee Hills, Hyderabad, Telangana',
        estimatedDelivery: '2024-07-27'
    }
];