import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// 1. Define a product data structure
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    rating: number;
}

// 2. Create dummy product data
const dummyProducts: Product[] = [
    {
        id: 'prod-001',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-fidelity sound with active noise cancellation and comfortable earcups. Up to 30 hours battery life.',
        price: 199.99,
        imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
        category: 'Electronics',
        stock: 50,
        rating: 4.5,
    },
    {
        id: 'prod-002',
        name: 'Smartwatch Series 7',
        description: 'Track your fitness, heart rate, and notifications. Water-resistant with a vibrant AMOLED display.',
        price: 249.00,
        imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
        category: 'Electronics',
        stock: 30,
        rating: 4.7,
    },
    {
        id: 'prod-003',
        name: 'Ergonomic Office Chair',
        description: 'Adjustable lumbar support, breathable mesh back, and padded armrests for ultimate comfort during long work hours.',
        price: 349.50,
        imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Office+Chair',
        category: 'Home & Office',
        stock: 20,
        rating: 4.2,
    },
    {
        id: 'prod-004',
        name: 'Stainless Steel Coffee Maker',
        description: 'Brew delicious coffee with this programmable 12-cup coffee maker. Features a permanent filter and auto-shutoff.',
        price: 79.99,
        imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Coffee+Maker',
        category: 'Kitchen Appliances',
        stock: 40,
        rating: 4.0,
    },
    {
        id: 'prod-005',
        name: 'Portable External SSD 1TB',
        description: 'Ultra-fast data transfer speeds with a compact and durable design. Perfect for backups and on-the-go storage.',
        price: 129.00,
        imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=External+SSD',
        category: 'Electronics',
        stock: 60,
        rating: 4.8,
    },
    {
        id: 'prod-006',
        name: 'Yoga Mat Eco-Friendly',
        description: 'Non-slip surface and extra thick for comfort during yoga and pilates. Made from sustainable, non-toxic materials.',
        price: 35.00,
        imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=Yoga+Mat',
        category: 'Sports & Outdoors',
        stock: 75,
        rating: 4.6,
    },
];

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json()); // Parse JSON request bodies

// 3. Create a backend API endpoint to serve dummy product data
app.get('/api/products', (req: Request, res: Response) => {
    try {
        // Simulate network latency
        setTimeout(() => {
            res.status(200).json(dummyProducts);
        }, 500); // 500ms delay
    } catch (error) {
        console.error('Error fetching products:', error);
        // Proper error handling
        res.status(500).json({ message: 'Failed to fetch products', error: (error as Error).message });
    }
});

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'Server is healthy', timestamp: new Date().toISOString() });
});

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler caught an error:', err.stack);
    res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Product API available at http://localhost:${PORT}/api/products`);
});