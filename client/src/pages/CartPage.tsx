import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils.ts';
import { Minus, Plus, Trash2 } from 'lucide-react';

// --- Type Definitions ---
// These types would ideally come from a shared schema or API definition (e.g., shared/schema.ts)
// For this file, we define them locally.
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  // Add other relevant product details if needed
}

interface CartItem {
  product: Product;
  quantity: number;
}

// --- Mock Data (for demonstration purposes) ---
// In a real application, products would be fetched from an API or passed as props.
const MOCK_PRODUCTS: Product[] = [
  { id: 'prod1', name: 'Stylish T-Shirt', price: 29.99, imageUrl: 'https://via.placeholder.com/100x100?text=T-Shirt' },
  { id: 'prod2', name: 'Comfortable Jeans', price: 59.99, imageUrl: 'https://via.placeholder.com/100x100?text=Jeans' },
  { id: 'prod3', name: 'Running Shoes', price: 89.99, imageUrl: 'https://via.placeholder.com/100x100?text=Shoes' },
];

// --- Cart Management Hook (simulated for this file) ---
// IMPORTANT: In a real application, this hook (or a similar context/state management)
// would be extracted into a separate file (e.g., '@/hooks/use-cart.ts')
// so it can be imported and used by other components like APage.tsx to add items.
// For the purpose of generating *this single file*, it's included here.
const CART_STORAGE_KEY = 'shopping_cart';

function useCartState() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') { // Server-side rendering check
      return [];
    }
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') { // Client-side rendering check
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }
  }, [cartItems]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  }, []);

  const updateItemQuantity = useCallback((productId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.product.id !== productId);
      }
      return prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // For demonstration: Add some mock items to the cart initially if it's empty
  // This helps to see a populated cart on first load.
  useEffect(() => {
    if (cartItems.length === 0 && typeof window !== 'undefined') {
      // Only add mock items if the cart is truly empty and we are in a browser environment
      // This prevents adding duplicates on subsequent renders if the cart is already loaded from localStorage
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!storedCart || JSON.parse(storedCart).length === 0) {
        addItem(MOCK_PRODUCTS[0], 1);
        addItem(MOCK_PRODUCTS[1], 2);
      }
    }
  }, [cartItems, addItem]); // Dependency array includes cartItems and addItem

  return { cartItems, addItem, updateItemQuantity, removeItem, clearCart };
}


function CartPage() {
  const { cartItems, updateItemQuantity, removeItem } = useCartState();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example shipping cost
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products"> {/* Assuming a /products page exists */}
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items in your cart</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Product</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead> {/* For remove button */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link to={`/products/${item.product.id}`} className="hover:underline">
                            {item.product.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                if (!isNaN(newQty) && newQty >= 1) {
                                  updateItemQuantity(item.product.id, newQty);
                                }
                              }}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full"> {/* Assuming a /checkout page exists */}
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;