import { Product, ProductCategory } from '../types';

export const fruits: Product[] = [
    {
        id: 9,
        name: 'Alphonso Mango',
        price: 150,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 7,
        rating: 4.9,
        reviews: 250,
        description: "Premium Alphonso mangoes directly from Ratnagiri farms. Sweet, aromatic, and full of flavor."
    },
    {
        id: 10,
        name: 'Banana (Yelakki)',
        price: 60,
        unit: 'dozen',
        image: 'https://images.pexels.com/photos/2280925/pexels-photo-2280925.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 8,
        rating: 4.8,
        reviews: 180,
        description: "Naturally ripened Yelakki bananas from South Indian farms. Soft texture and rich in nutrients."
    },
    {
        id: 11,
        name: 'Papaya',
        price: 40,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/2363353/pexels-photo-2363353.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 6,
        rating: 4.7,
        reviews: 110,
        description: "Sweet and ripe papayas that boost digestion and immunity."
    },
    {
        id: 12,
        name: 'Apple (Shimla)',
        price: 180,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 10,
        rating: 4.9,
        reviews: 320,
        description: "Crisp and juicy apples grown in the cool hills of Shimla."
    },
    {
        id: 13,
        name: 'Guava',
        price: 80,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 7,
        rating: 4.6,
        reviews: 95,
        description: "Farm-fresh guavas rich in Vitamin C and natural fiber."
    },
    {
        id: 14,
        name: 'Pomegranate',
        price: 200,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/5945842/pexels-photo-5945842.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.IndianFruits,
        freshnessDays: 10,
        rating: 4.8,
        reviews: 155,
        description: "Juicy and antioxidant-rich pomegranates from Nashik farms."
    }
];
