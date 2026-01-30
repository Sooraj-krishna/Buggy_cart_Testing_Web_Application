import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useToast } from '@/hooks/use-toast.ts';

// Assuming Product type is exported from shared/schema.ts
// If shared/schema.ts does not export a 'Product' type,
// this import will fail, and a local interface should be defined instead.
import type { Product } from '@shared/schema.ts';

// Define CartItem locally, as it's a client-side specific extension of Product
interface CartItem extends Product {
  quantity: number;
}

// Mock product data for demonstration purposes on APage.
// In a real application, this data would likely come from an API call.
const mockProduct: Product = {
  id: "prod_a001",
  name: "Premium Widget A",
  price: 49.99,
  imageUrl: "https://via.placeholder.com/400x300?text=Premium+Widget+A",
  description: "Experience the ultimate in convenience and style with our Premium Widget A. Crafted with precision and designed for durability, it's the perfect addition to your daily life.",
};

function APage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  /**
   * Handles adding a product to the shopping cart stored in localStorage.
   * If the product already exists, its quantity is incremented.
   * Otherwise, the product is added as a new item with quantity 1.
   * A toast notification provides user feedback.
   * @param product The product to add to the cart.
   */
  const handleAddToCart = (product: Product) => {
    const cartString = localStorage.getItem('cart');
    let cart: CartItem[] = [];

    if (cartString) {
      try {
        cart = JSON.parse(cartString);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        // If parsing fails, reset cart to an empty array to prevent further errors
        cart = [];
      }
    }

    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Product already in cart, increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Product not in cart, add new item with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    toast({
      title: "Item Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product Detail Page (APage)</h1>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{mockProduct.name}</CardTitle>
          <CardDescription>A fantastic product for your needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={mockProduct.imageUrl}
                alt={mockProduct.name}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <p className="text-2xl font-semibold text-primary mb-4">${mockProduct.price.toFixed(2)}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{mockProduct.description}</p>
              <div className="flex gap-4">
                <Button onClick={() => handleAddToCart(mockProduct)}>
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => navigate('/cart')}>
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Product ID: {mockProduct.id}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default APage;