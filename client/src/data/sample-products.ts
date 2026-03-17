export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const Product: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive audio with these comfortable, high-fidelity wireless headphones. Perfect for music lovers and commuters.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-002',
    name: 'Smartwatch with Fitness Tracker',
    description: 'Stay connected and monitor your health with this sleek smartwatch. Features heart rate tracking, step counter, and notification alerts.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-003',
    name: 'Ergonomic Office Chair',
    description: 'Designed for ultimate comfort and support during long workdays. Fully adjustable to fit your posture and reduce strain.',
    price: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a93?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home & Office',
  },
  {
    id: 'prod-004',
    name: 'Stainless Steel Coffee Maker',
    description: 'Brew your perfect cup every morning with this durable and stylish stainless steel coffee maker. Features a programmable timer.',
    price: 79.50,
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Kitchen Appliances',
  },
  {
    id: 'prod-005',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable, and eco-friendly t-shirt made from 100% organic cotton. A wardrobe essential for conscious consumers.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572178477-fff9299dd58f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Apparel',
  },
  {
    id: 'prod-006',
    name: 'Portable External Hard Drive 2TB',
    description: 'Securely store all your important files with this compact and high-capacity 2TB external hard drive. Fast data transfer speeds.',
    price: 89.00,
    imageUrl: 'https://images.unsplash.com/photo-1563297007-0686b70329ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-007',
    name: 'Premium Yoga Mat',
    description: 'Achieve perfect balance and comfort with this non-slip, extra-thick yoga mat. Ideal for all types of yoga and fitness routines.',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1591291621165-e94611294868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Sports & Outdoors',
  },
  {
    id: 'prod-008',
    name: 'Noise-Cancelling Earbuds',
    description: 'Immerse yourself in your music with these advanced noise-cancelling earbuds. Crystal-clear sound and comfortable fit.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1606220588915-da3d17d6d56a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-009',
    name: 'Classic Leather Wallet',
    description: 'A timeless accessory crafted from genuine leather. Features multiple card slots, a coin pocket, and a spacious bill compartment.',
    price: 55.00,
    imageUrl: 'https://images.unsplash.com/photo-1583241030062-588374943640?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Accessories',
  },
  {
    id: 'prod-010',
    name: 'Gourmet Coffee Beans (1lb)',
    description: 'Start your day with the rich aroma and exquisite taste of our premium gourmet coffee beans. Ethically sourced and expertly roasted.',
    price: 18.75,
    imageUrl: 'https://images.unsplash.com/photo-1509785307050-dc8749fba3f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Food & Beverage',
  },
  {
    id: 'prod-011',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this powerful and compact Bluetooth speaker. Delivers crisp audio and deep bass.',
    price: 65.00,
    imageUrl: 'https://images.unsplash.com/photo-1589578229495-255018155252?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-012',
    name: 'Digital Camera DSLR Kit',
    description: 'Capture stunning photos and videos with this professional-grade DSLR camera kit. Includes lens and essential accessories.',
    price: 799.00,
    imageUrl: 'https://images.unsplash.com/photo-1510125594112-f0087b056564?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
  },
  {
    id: 'prod-013',
    name: 'Classic Denim Jacket',
    description: 'A timeless denim jacket that never goes out of style. Durable and versatile, perfect for any casual outfit.',
    price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1565084888277-ad893343271a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Apparel',
  },
  {
    id: 'prod-014',
    name: 'Gourmet Chocolate Bar Set',
    description: 'Indulge in a collection of artisanal chocolate bars, crafted with premium cocoa and unique flavor combinations.',
    price: 25.00,
    imageUrl: 'https://images.unsplash.com/photo-1511381936442-4350781d459e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Food & Beverage',
  },
  {
    id: 'prod-015',
    name: 'Stainless Steel Water Bottle',
    description: 'Stay hydrated on the go with this eco-friendly stainless steel water bottle. Keeps drinks cold for hours.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1525961011293-58000418387c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Sports & Outdoors',
  },
];