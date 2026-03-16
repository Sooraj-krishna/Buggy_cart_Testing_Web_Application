import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast.ts';
import { Product } from '@/types/product.ts';

// Define the structure for a cart item
interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the Cart Context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      // Optionally clear corrupted data or handle gracefully
      localStorage.removeItem('cartItems');
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (product: Product, quantityToAdd: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Product already in cart, update quantity
        const updatedItems = prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity updated in your cart.`,
        });
        return updatedItems;
      } else {
        // Product not in cart, add new item
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  // Remove a product entirely from the cart
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.name} has been removed from your cart.`,
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // Update the quantity of a specific product in the cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        // If quantity is 0 or less, remove the item
        const itemToRemove = prevItems.find(item => item.id === productId);
        if (itemToRemove) {
          toast({
            title: "Removed from Cart",
            description: `${itemToRemove.name} has been removed from your cart.`,
          });
        }
        return prevItems.filter((item) => item.id !== productId);
      } else {
        const updatedItems = prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        const updatedItem = updatedItems.find(item => item.id === productId);
        if (updatedItem) {
          toast({
            title: "Cart Updated",
            description: `${updatedItem.name} quantity updated to ${newQuantity}.`,
          });
        }
        return updatedItems;
      }
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Calculate total price of items in the cart
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Calculate total number of items (sum of quantities) in the cart
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const contextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};