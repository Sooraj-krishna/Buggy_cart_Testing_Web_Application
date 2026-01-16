import { Router, Request, Response } from 'express';

/**
 * @interface Product
 * @description Defines the structure for a product object, shared between frontend and backend.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  // Add any other relevant product properties here
}

/**
 * @constant dummyProducts
 * @description An array of dummy product data to simulate a database.
 */
const dummyProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive sound with these comfortable, noise-cancelling wireless headphones. Perfect for music lovers and commuters.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Headphones',
    category: 'Electronics',
    stock: 50,
  },
  {
    id: 'prod-002',
    name: 'Smartwatch Series 7',
    description: 'Stay connected and track your fitness goals with the latest Smartwatch. Features heart rate monitoring, GPS, and long battery life.',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Smartwatch',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: 'prod-003',
    name: 'Ergonomic Office Chair',
    description: 'Boost your productivity and comfort with this adjustable ergonomic office chair. Designed for long hours of work.',
    price: 199.00,
    imageUrl: 'https://via.placeholder.com/300x200/ffc107/000000?text=Office+Chair',
    category: 'Home & Office',
    stock: 20,
  },
  {
    id: 'prod-004',
    name: '4K UHD Smart TV 55-inch',
    description: 'Enjoy stunning visuals and smart features with this 55-inch 4K UHD TV. Stream your favorite content in breathtaking clarity.',
    price: 599.99,
    imageUrl: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Smart+TV',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: 'prod-005',
    name: 'Stainless Steel Coffee Maker',
    description: 'Brew the perfect cup of coffee every morning with this sleek and durable stainless steel coffee maker. Programmable and easy to clean.',
    price: 49.50,
    imageUrl: 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Coffee+Maker',
    category: 'Kitchen Appliances',
    stock: 40,
  },
  {
    id: 'prod-006',
    name: 'Gaming Laptop Pro',
    description: 'Unleash your gaming potential with this high-performance gaming laptop. Featuring a powerful processor and dedicated graphics card.',
    price: 1299.99,
    imageUrl: 'https://via.placeholder.com/300x200/17a2b8/ffffff?text=Gaming+Laptop',
    category: 'Electronics',
    stock: 10,
  },
  {
    id: 'prod-007',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this compact and powerful portable Bluetooth speaker. Waterproof and long battery life.',
    price: 75.00,
    imageUrl: 'https://via.placeholder.com/300x200/6610f2/ffffff?text=Bluetooth+Speaker',
    category: 'Electronics',
    stock: 60,
  },
];

/**
 * @constant productsRouter
 * @description Express Router for handling product-related API requests.
 */
const productsRouter = Router();

/**
 * @route GET /api/products
 * @description Retrieves a list of all products.
 * @returns {Product[]} An array of product objects.
 * @status 200 - Success
 * @status 500 - Server error
 */
productsRouter.get('/', (req: Request, res: Response) => {
  try {
    // In a real application, this would involve fetching data from a database.
    // For this example, we return the static dummy data.
    res.status(200).json(dummyProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Respond with a 500 status and an error message
    res.status(500).json({ message: 'Failed to retrieve products', error: (error as Error).message });
  }
});

/**
 * @route GET /api/products/:id
 * @description Retrieves a single product by its ID.
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Product} The product object if found.
 * @status 200 - Success
 * @status 404 - Product not found
 * @status 500 - Server error
 */
productsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = dummyProducts.find(p => p.id === id);

    if (product) {
      res.status(200).json(product);
    } else {
      // If product is not found, respond with a 404 status
      res.status(404).json({ message: `Product with ID '${id}' not found.` });
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    // Respond with a 500 status and an error message
    res.status(500).json({ message: 'Failed to retrieve product', error: (error as Error).message });
  }
});

// Export the router to be used in the main server application
export default productsRouter;