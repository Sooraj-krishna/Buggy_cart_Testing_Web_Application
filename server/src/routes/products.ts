import express, { Request, Response } from 'express';

// 1. Define a product data structure
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

// 2. Create some dummy product data
const dummyProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation and comfortable earcups. Up to 20 hours battery life.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
    category: 'Electronics',
    stock: 50,
  },
  {
    id: 'prod-002',
    name: 'Smartwatch Series 7',
    description: 'Track your fitness, receive notifications, and make calls directly from your wrist. Water-resistant.',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: 'prod-003',
    name: 'Ergonomic Office Chair',
    description: 'Designed for maximum comfort and support during long working hours. Adjustable height and lumbar support.',
    price: 189.00,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Office+Chair',
    category: 'Home & Office',
    stock: 20,
  },
  {
    id: 'prod-004',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Water+Bottle',
    category: 'Kitchen & Dining',
    stock: 100,
  },
  {
    id: 'prod-005',
    name: 'Portable External SSD 1TB',
    description: 'Ultra-fast data transfer speeds and compact design. Perfect for on-the-go storage.',
    price: 120.50,
    imageUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=SSD',
    category: 'Electronics',
    stock: 40,
  },
];

const router = express.Router();

// 3. Create a backend API endpoint to serve dummy product data
router.get('/', (req: Request, res: Response) => {
  try {
    // Simulate a slight delay for network latency
    setTimeout(() => {
      res.status(200).json(dummyProducts);
    }, 500);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: 'Error fetching products', error: (error as Error).message });
  }
});

// Optional: Get a single product by ID
router.get('/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = dummyProducts.find(p => p.id === productId);

  if (product) {
    setTimeout(() => {
      res.status(200).json(product);
    }, 300);
  } else {
    res.status(404).json({ message: `Product with ID ${productId} not found.` });
  }
});

export default router;