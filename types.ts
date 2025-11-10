
export enum ProductCategory {
    LeafyGreens = 'Leafy Greens',
    RootVegetables = 'Root Vegetables',
    SeasonalPicks = 'Seasonal Picks',
    SaladEssentials = 'Salad Essentials',
    IndianFruits = 'Indian Fruits'
}

export interface Product {
    id: number;
    name: string;
    price: number;
    unit?: string;
    image: string;
    category: ProductCategory;
    freshnessDays: number;
    rating: number;
    reviews: number;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Testimonial {
    quote: string;
    author: string;
    location: string;
}

export enum OrderStatus {
    Pending = 'Pending',
    Packed = 'Packed',
    Shipped = 'Shipped',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled'
}

export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

export interface Order {
    orderId: string;
    customerName: string;
    date: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    paymentMethod: string;
    address: string;
    estimatedDelivery: string;
}