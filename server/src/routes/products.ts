import { Router, Request, Response } from 'express';

// Define a type for a product to ensure type safety
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

// Mock product data to be served by the API
const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive sound with active noise cancellation and a comfortable over-ear design. Up to 30 hours of battery life.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones', // Placeholder image
    category: 'Electronics',
    stock: 150,
  },
  {
    id: 'prod-002',
    name: 'Smartwatch Series 7',
    description: 'Track your fitness, monitor heart rate, receive notifications, and make calls directly from your wrist. Water-resistant.',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch', // Placeholder image
    category: 'Wearables',
    stock: 80,
  },
  {
    id: 'prod-003',
    name: 'Portable SSD 1TB USB-C',
    description: 'Ultra-fast external solid-state drive with 1TB capacity. Perfect for backups, gaming, and large file transfers. USB-C compatible.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=SSD', // Placeholder image
    category: 'Storage',
    stock: 200,
  },
  {
    id: 'prod-004',
    name: 'Ergonomic Office Chair',
    description: 'Designed for maximum comfort and support during long working hours. Features adjustable lumbar support, armrests, and headrest.',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Chair', // Placeholder image
    category: 'Office Furniture',
    stock: 50,
  },
  {
    id: 'prod-005',
    name: '4K UHD Smart TV 55-inch',
    description: 'Stunning 4K resolution with vibrant colors and smart features. Access all your favorite streaming apps directly.',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=SmartTV', // Placeholder image
    category: 'Electronics',
    stock: 30,
  },
];

const router = Router();

/**
 * @route GET /api/products
 * @desc Get all mock products
 * @access Public
 * @returns {Product[]} An array of product objects
 */
router.get('/', (req: Request, res: Response) => {
  try {
    // In a real application, you would typically fetch data from a database here.
    // For this implementation, we are serving mock data.
    res.status(200).json(mockProducts);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching products:', error);
    // Send a 500 Internal Server Error response with a user-friendly message
    res.status(500).json({ message: 'Failed to retrieve products due to a server error.', error: (error as Error).message });
  }
});

/**
 * @route GET /api/products/:id
 * @desc Get a single product by its ID
 * @access Public
 * @param {string} id - The ID of the product to retrieve
 * @returns {Product} A single product object or a 404 error
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);

    if (product) {
      res.status(200).json(product);
    } else {
      // If no product is found with the given ID, send a 404 Not Found response
      res.status(404).json({ message: `Product with ID '${id}' not found.` });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    // Send a 500 Internal Server Error response
    res.status(500).json({ message: 'Failed to retrieve product due to a server error.', error: (error as Error).message });
  }
});

export default router;