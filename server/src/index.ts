import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port, default to 5000

// Middleware
// Enable CORS for all origins during development.
// In a production environment, you might want to restrict this to specific origins.
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

/**
 * @interface Product
 * @description Defines the structure for a product object.
 * This interface would ideally be in a shared types package in a monorepo
 * to be used by both frontend and backend.
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string; // Optional: for future filtering
  stock?: number; // Optional: for future inventory management
}

/**
 * @constant products
 * @description Dummy product data to be served by the API.
 */
const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation and comfortable earcups. Perfect for music lovers.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Headphones',
    category: 'Audio',
    stock: 150,
  },
  {
    id: 'prod-2',
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Smartwatch',
    category: 'Wearables',
    stock: 80,
  },
  {
    id: 'prod-3',
    name: 'Portable Power Bank 10000mAh',
    description: 'Fast charging for your devices on the go. Compact and lightweight design for ultimate portability.',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=PowerBank',
    category: 'Accessories',
    stock: 200,
  },
  {
    id: 'prod-4',
    name: 'USB-C to HDMI Adapter',
    description: 'Connect your USB-C laptop to an HDMI display for crystal clear video and audio output.',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/300/FFFF00/000000?text=Adapter',
    category: 'Connectivity',
    stock: 120,
  },
  {
    id: 'prod-5',
    name: 'Ergonomic Wireless Mouse',
    description: 'Comfortable design for long hours of use, precise tracking, and customizable buttons.',
    price: 24.99,
    imageUrl: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=Mouse',
    category: 'Peripherals',
    stock: 90,
  },
  {
    id: 'prod-6',
    name: '4K Ultra HD Smart TV 55-inch',
    description: 'Immerse yourself in stunning visuals with vibrant colors and incredible detail.',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/300/00FFFF/000000?text=SmartTV',
    category: 'Electronics',
    stock: 30,
  },
  {
    id: 'prod-7',
    name: 'Gaming Keyboard RGB Mechanical',
    description: 'Experience responsive and tactile feedback with customizable RGB lighting effects.',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/300/FFA500/FFFFFF?text=Keyboard',
    category: 'Peripherals',
    stock: 70,
  },
  {
    id: 'prod-8',
    name: 'Noise Cancelling Earbuds',
    description: 'Compact and powerful earbuds with active noise cancellation for an immersive audio experience.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300/800080/FFFFFF?text=Earbuds',
    category: 'Audio',
    stock: 110,
  },
];

/**
 * @route GET /api/products
 * @description Serves a list of all dummy products.
 * Includes basic error handling.
 */
app.get('/api/products', (req, res) => {
  try {
    // Simulate a network delay for a more realistic experience
    setTimeout(() => {
      res.status(200).json(products);
    }, 500); // 500ms delay
  } catch (error) {
    console.error('Error fetching products:', error);
    // Respond with a 500 Internal Server Error if something goes wrong
    res.status(500).json({ message: 'Failed to fetch products due to an internal server error.' });
  }
});

/**
 * @route GET /api/products/:id
 * @description Serves a single product by its ID.
 * Includes error handling for product not found.
 */
app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);

    if (product) {
      setTimeout(() => {
        res.status(200).json(product);
      }, 300); // 300ms delay
    } else {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch product due to an internal server error.' });
  }
});

/**
 * @route GET /api/health
 * @description Basic health check endpoint for the server.
 */
app.get('/api/health', (req, res) => {
  res.status(200).send('Server is healthy and running.');
});

/**
 * Start the Express server.
 * Logs the server's listening address to the console.
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - All products: http://localhost:${PORT}/api/products`);
  console.log(`  - Single product: http://localhost:${PORT}/api/products/prod-1 (example)`);
  console.log(`  - Health check: http://localhost:${PORT}/api/health`);
});

/**
 * Global error handling for unhandled promise rejections.
 * This helps catch errors in asynchronous operations that are not explicitly caught.
 */
process.on('unhandledRejection', (reason: Error | any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log the error, send to an error tracking service, etc.
  // For a production application, you might want to gracefully shut down or restart.
});

/**
 * Global error handling for uncaught exceptions.
 * This catches synchronous errors that are not handled by try-catch blocks.
 */
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  // Log the error, send to an error tracking service, etc.
  // It's critical to exit the process after an uncaught exception to prevent
  // the application from running in an undefined state.
  process.exit(1);
});