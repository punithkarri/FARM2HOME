
import { Product, ProductCategory } from '../types';

export const products: Product[] = [
    {
        id: 1,
        name: 'Organic Spinach',
        price: 80,
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.LeafyGreens,
        freshnessDays: 7,
        rating: 4.8,
        reviews: 124,
        description: 'Tender and nutrient-rich spinach, perfect for salads, smoothies, and cooking. Grown without any chemical pesticides.'
    },
    {
        id: 2,
        name: 'Farm-Fresh Carrots',
        price: 60,
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.RootVegetables,
        freshnessDays: 10,
        rating: 4.9,
        reviews: 210,
        description: 'Sweet and crunchy carrots, harvested daily. A great source of Vitamin A. Ideal for snacking, roasting, and juicing.'
    },
    {
        id: 3,
        name: 'Juicy Tomatoes',
        price: 50,
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.SeasonalPicks,
        freshnessDays: 8,
        rating: 4.7,
        reviews: 180,
        description: 'Vine-ripened tomatoes bursting with flavor. Perfect for sauces, salads, and sandwiches. A taste of summer all year round.'
    },
    {
        id: 4,
        name: 'Crisp Lettuce',
        price: 70,
        image: 'https://images.pexels.com/photos/2893636/pexels-photo-2893636.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.SaladEssentials,
        freshnessDays: 6,
        rating: 4.6,
        reviews: 95,
        description: 'Crisp and refreshing lettuce heads, the perfect base for any salad. Washed and ready to eat.'
    },
    {
        id: 5,
        name: 'Organic Potatoes',
        price: 45,
        image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.RootVegetables,
        freshnessDays: 10,
        rating: 4.8,
        reviews: 155,
        description: 'Versatile and earthy potatoes. Great for mashing, frying, roasting, or boiling. A staple for any kitchen.'
    },
    {
        id: 6,
        name: 'Fresh Broccoli',
        price: 120,
        image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.SeasonalPicks,
        freshnessDays: 7,
        rating: 4.9,
        reviews: 130,
        description: 'Nutrient-packed broccoli with a vibrant green color. Excellent for steaming, stir-frying, or adding to pastas.'
    },
    {
        id: 7,
        name: 'Crunchy Cucumbers',
        price: 40,
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.SaladEssentials,
        freshnessDays: 9,
        rating: 4.7,
        reviews: 112,
        description: 'Cool and hydrating cucumbers. Slice them for salads, sandwiches, or enjoy as a healthy snack.'
    },
    {
        id: 8,
        name: 'Organic Kale',
        price: 90,
        image: 'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: ProductCategory.LeafyGreens,
        freshnessDays: 5,
        rating: 4.8,
        reviews: 88,
        description: 'A superfood powerhouse, our organic kale is perfect for making healthy chips, salads, or adding to green juices.'
    }
];

export const featuredProducts = products.slice(0, 4);