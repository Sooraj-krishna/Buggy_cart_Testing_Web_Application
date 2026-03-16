import React, { useState, useContext } from 'react';
import ProductCard from '@/components/ProductCard.tsx';
import { WishlistContext } from '@/context/WishlistContext.tsx';
import { useToast } from '@/hooks/use-toast.ts';

// Define a simple Product interface for demonstration purposes.
// In a real application, this might come from a shared schema or API types.
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Classic White T-Shirt',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/400x300/F0F0F0/333333?text=T-Shirt',
    description: 'A timeless classic, perfect for any occasion. Made from 100% organic cotton.',
  },
  {
    id: 'prod_002',
    name: 'High-Waist Denim Jeans',
    price: 69.99,
    imageUrl: 'https://via.placeholder.com/400x300/D0D0D0/333333?text=Jeans',
    description: 'Comfortable and stylish high-waist jeans, designed for a flattering fit.',
  },
  {
    id: 'prod_003',
    name: 'Sporty Running Shoes',
    price: 119.99,
    imageUrl: 'https://via.placeholder.com/400x300/E0E0E0/333333?text=Shoes',
    description: 'Lightweight and breathable running shoes, engineered for performance.',
  },
  {
    id: 'prod_004',
    name: 'Elegant Leather Handbag',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/400x300/C0C0C0/333333?text=Handbag',
    description: 'A sophisticated leather handbag, perfect for daily use or special events.',
  },
  {
    id: 'prod_005',
    name: 'Minimalist Smartwatch',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/400x300/B0B0B0/333333?text=Smartwatch',
    description: 'Track your fitness and stay connected with this sleek and minimalist smartwatch.',
  },
  {
    id: 'prod_006',
    name: 'Cozy Knit Sweater',
    price: 54.99,
    imageUrl: 'https://via.placeholder.com/400x300/A0A0A0/333333?text=Sweater',
    description: 'Stay warm and stylish with this soft and cozy knit sweater.',
  },
];

function ProductsPage() {
  // Basic local state for cart items. In a larger app, this would be a global context or Redux store.
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    toast({
      title: 'Added to Cart!',
      description: `${product.name} has been added to your cart.`,
    });
    console.log('Cart items:', [...cartItems, product]); // For debugging
  };

  const handleToggleWishlist = (product: Product) => {
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from Wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to Wishlist!',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistItems.some((item) => item.id === product.id)}
          />
        ))}
      </div>

      {/* Optional: Display current cart/wishlist for debugging/demonstration */}
      {/* <div className="mt-12 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Current State (for demo)</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">Cart Items ({cartItems.length})</h3>
          <ul className="list-disc pl-5">
            {cartItems.map((item) => (
              <li key={item.id}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium">Wishlist Items ({wishlistItems.length})</h3>
          <ul className="list-disc pl-5">
            {wishlistItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default ProductsPage;