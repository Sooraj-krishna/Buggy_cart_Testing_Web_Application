import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

/**
 * @interface Product
 * @description Defines the structure for a product object.
 * This interface could ideally be in a shared types package in a monorepo
 * for both client and server to use, but for this self-contained server mock,
 * it's defined here.
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

/**
 * @constant mockProducts
 * @description An array of mock product data to be served by the API.
 */
const mockProducts: Product[] = [
  {
    id: 'prod-101',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience immersive sound with active noise cancellation and a comfortable over-ear design. Up to 30 hours of battery life.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Headphones',
    category: 'Audio',
    stock: 50,
  },
  {
    id: 'prod-102',
    name: 'Smartwatch Series 8',
    description: 'Track your fitness, monitor heart rate, receive notifications, and make calls directly from your wrist. Water-resistant.',
    price: 299.00,
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Smartwatch',
    category: 'Wearables',
    stock: 30,
  },
  {
    id: 'prod-103',
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast external solid-state drive for quick data transfers and reliable storage. USB-C compatible.',
    price: 89.50,
    imageUrl: 'https://via.placeholder.com/300/00FF00/000000?text=PortableSSD',
    category: 'Storage',
    stock: 75,
  },
  {
    id: 'prod-104',
    name: 'Ergonomic Wireless Mouse',
    description: 'Designed for comfort and precision, reducing wrist strain during long hours of use. Adjustable DPI settings.',
    price: 45.99,
    imageUrl: 'https://via.placeholder.com/300/FFFF00/000000?text=ErgoMouse',
    category: 'Peripherals',
    stock: 120,
  },
  {
    id: 'prod-105',
    name: '4K UHD Smart TV 55-inch',
    description: 'Stunning 4K resolution with smart features, built-in streaming apps, and voice control. Immersive viewing experience.',
    price: 599.00,
    imageUrl: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=SmartTV',
    category: 'Electronics',
    stock: 20,
  },
  {
    id: 'prod-106',
    name: 'Gaming Keyboard RGB',
    description: 'Mechanical gaming keyboard with customizable RGB backlighting, anti-ghosting, and durable keycaps.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300/00FFFF/000000?text=GamingKB',
    category: 'Peripherals',
    stock: 60,
  },
  {
    id: 'prod-107',
    name: 'Noise Cancelling Earbuds',
    description: 'Compact and powerful earbuds with excellent sound quality and active noise cancellation for on-the-go listening.',
    price: 99.00,
    imageUrl: 'https://via.placeholder.com/300/800080/FFFFFF?text=Earbuds',
    category: 'Audio',
    stock: 90,
  },
  {
    id: 'prod-108',
    name: 'Webcam Full HD 1080p',
    description: 'High-definition webcam with auto-focus and built-in microphone, perfect for video calls and streaming.',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/300/FFA500/000000?text=Webcam',
    category: 'Peripherals',
    stock: 150,
  },
];

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port, default to 5000

// Middleware
// Enable CORS for all routes. This is crucial for allowing the React client
// (likely running on a different port) to make requests to this server.
app.use(cors());
// Enable JSON body parsing for incoming requests.
app.use(express.json());

/**
 * @route GET /api/products
 * @description API endpoint to fetch a list of mock product data.
 * Includes a simulated network delay for a more realistic development experience.
 */
app.get('/api/products', (req: Request, res: Response) => {
  try {
    // Simulate a network delay to mimic real-world API calls
    setTimeout(() => {
      res.status(200).json(mockProducts);
    }, 700); // 700ms delay
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: 'Failed to fetch products',
      error: (error instanceof Error) ? error.message : 'An unknown error occurred',
    });
  }
});

/**
 * @route GET /api/products/:id
 * @description API endpoint to fetch a single product by its ID.
 */
app.get('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);

    setTimeout(() => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: `Product with ID ${id} not found.` });
      }
    }, 300); // Shorter delay for single item fetch
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: 'Failed to fetch product',
      error: (error instanceof Error) ? error.message : 'An unknown error occurred',
    });
  }
});


/**
 * @route GET /
 * @description Basic health check endpoint for the server.
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Product API Server is running. Access product data at /api/products');
});

/**
 * @middleware Error Handling
 * @description Generic error handling middleware to catch unhandled errors.
 * This should be the last middleware added to the Express app.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({
    message: 'An unexpected server error occurred.',
    error: err.message,
  });
});

/**
 * Start the Express server.
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Product API available at http://localhost:${PORT}/api/products`);
});

// Export the app for potential testing purposes (e.g., Supertest)
export default app;