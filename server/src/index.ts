import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // For parsing application/json

// Mock Product Data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation and comfortable earcups.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
  },
  {
    id: 'prod-2',
    name: 'Smartwatch Series 7',
    description: 'Track your fitness, receive notifications, and make calls from your wrist.',
    price: 249.00,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
  },
  {
    id: 'prod-3',
    name: 'Portable Power Bank 10000mAh',
    description: 'Keep your devices charged on the go with this high-capacity power bank.',
    price: 29.95,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=PowerBank',
  },
  {
    id: 'prod-4',
    name: 'USB-C to HDMI Adapter',
    description: 'Connect your USB-C laptop to an HDMI display with ease.',
    price: 15.50,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Adapter',
  },
  {
    id: 'prod-5',
    name: 'Ergonomic Wireless Mouse',
    description: 'Comfortable design for long hours of use, precise tracking.',
    price: 35.00,
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Mouse',
  },
];

// API Endpoint to get all products
app.get('/api/products', (req: Request, res: Response) => {
  try {
    console.log('GET /api/products request received.');
    res.status(200).json(mockProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: (error as Error).message });
  }
});

// API Endpoint to get a single product by ID
app.get('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/products/${id} request received.`);
    const product = mockProducts.find(p => p.id === id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to fetch product', error: (error as Error).message });
  }
});

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Product service is running.' });
});

// Catch-all for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Product API server running on http://localhost:${PORT}`);
});