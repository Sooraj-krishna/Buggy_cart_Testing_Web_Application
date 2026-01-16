import { Router, Request, Response } from 'express';

/**
 * @interface Product
 * @description Defines the structure for a product object.
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-fidelity sound with comfortable over-ear design and long-lasting battery.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
    category: 'Electronics',
    stock: 50,
  },
  {
    id: 'prod-002',
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: 'prod-003',
    name: 'Ergonomic Office Chair',
    description: 'Designed for maximum comfort and support during long working hours. Adjustable features.',
    price: 249.00,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Office+Chair',
    category: 'Home & Office',
    stock: 20,
  },
  {
    id: 'prod-004',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.',
    price: 19.95,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Water+Bottle',
    category: 'Kitchen & Dining',
    stock: 100,
  },
  {
    id: 'prod-005',
    name: 'Portable Power Bank 10000mAh',
    description: 'Charge your devices on the go. Compact design with fast charging capabilities.',
    price: 35.50,
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Power+Bank',
    category: 'Electronics',
    stock: 75,
  },
];

const router = Router();

/**
 * @route GET /api/products
 * @description Fetches a list of all mock products.
 * @returns {Product[]} An array of product objects.
 * @status 200 - Success
 * @status 500 - Server error
 */
router.get('/', (req: Request, res: Response) => {
  try {
    // Simulate network latency for a more realistic API experience
    setTimeout(() => {
      res.status(200).json(mockProducts);
    }, 500); // 500ms delay
  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error fetching products:', error);
    // Send a generic error response to the client
    res.status(500).json({ message: 'Failed to fetch products. Please try again later.' });
  }
});

/**
 * @route GET /api/products/:id
 * @description Fetches a single product by its ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Product} The product object if found.
 * @status 200 - Success
 * @status 404 - Product not found
 * @status 500 - Server error
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found.` });
    }

    // Simulate network latency
    setTimeout(() => {
      res.status(200).json(product);
    }, 300); // 300ms delay
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch product. Please try again later.' });
  }
});

export default router;