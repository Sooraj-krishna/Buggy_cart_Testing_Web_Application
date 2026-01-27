import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';

// Define the Product type based on anticipated usage in App.tsx/CartPage.tsx
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Mock Product Data
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Mechanical Keyboard',
    description: 'High-performance mechanical keyboard with customizable RGB lighting.',
    price: 129.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Keyboard',
    category: 'Peripherals',
  },
  {
    id: 2,
    name: '4K Ultra HD Monitor',
    description: '27-inch monitor with stunning color accuracy and fast refresh rate.',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Monitor',
    category: 'Displays',
  },
  {
    id: 3,
    name: 'Ergonomic Gaming Mouse',
    description: 'Lightweight mouse designed for long gaming sessions.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/400x300?text=Mouse',
    category: 'Peripherals',
  },
  {
    id: 4,
    name: 'Noise Cancelling Headphones',
    description: 'Premium sound quality with industry-leading noise cancellation.',
    price: 249.00,
    imageUrl: 'https://via.placeholder.com/400x300?text=Headphones',
    category: 'Audio',
  },
];

// Define the context type for accessing global state (defined in App.tsx)
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
}

// We assume a context hook is available or passed down via props/context.
// Since we are creating the context in App.tsx, we will mock the usage here
// and assume a custom hook or context consumer will be used in a real scenario.
// For now, we will assume a context is available via React.useContext
// If App.tsx defines a context, we should import it. Since we are generating App.tsx later,
// we will use a placeholder context hook structure.

// Placeholder for context usage (to be replaced by actual context import from App.tsx later)
const useCartContext = (): CartContextType => {
  // In a real application, this would be imported from a context provider file or App.tsx
  // Since we cannot import the context yet, we assume a global state management structure
  // is available via a custom hook or prop drilling (though context is preferred).
  // We will assume the context is provided by App.tsx and accessed via a custom hook.
  
  // For this file generation, we must assume the context hook exists or is mocked.
  // Since we are implementing the requirement to establish basic global cart state management in `App.tsx`,
  // we must assume the consumer side exists.
  
  // Mocking the context hook return value for compilation safety:
  const context = React.useContext<CartContextType | undefined>(
    // @ts-ignore: We assume a CartContext is defined and exported in App.tsx
    window.CartContext || { cart: [], addToCart: () => {} }
  );

  if (!context) {
    // Fallback for development/testing if context isn't fully set up yet
    return { cart: [], addToCart: (product: Product) => console.log('Adding to cart (MOCK):', product.name) };
  }
  return context;
};


const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video bg-gray-100 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="text-sm">
          {product.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{product.description}</p>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

function ProductsPage() {
  const { addToCart } = useCartContext();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore the latest tech gadgets and accessories.
        </p>
        <Separator className="mt-4" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>

      <footer className="mt-12 text-center">
        <p className="text-muted-foreground">
          Can't find what you're looking for? <Link to="/" className="text-primary hover:underline">Go back home</Link>.
        </p>
      </footer>
    </div>
  );
}

export default ProductsPage;