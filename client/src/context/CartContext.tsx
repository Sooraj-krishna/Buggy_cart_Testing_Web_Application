import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the Product type based on common e-commerce product attributes.
// This type should ideally come from a shared schema or API definition.
// For now, we define it here.
interface Product {
  id: string;
  name: string;
  price: number;
  image?: string; // Optional image URL for display
}

// Define the CartItem type, which extends Product with a quantity.
interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the Cart Context
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create the Cart Context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider component to manage cart state and provide it to children
export function CartProvider({ children }: CartProviderProps) {
  // Initialize cart state from localStorage or an empty array
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // Effect to persist cart state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items]);

  // Function to add an item to the cart or update its quantity if it already exists
  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Item does not exist, add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of an item in the cart
  const updateItemQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return prevItems.filter((item) => item.id !== productId);
      }

      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      return updatedItems;
    });
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Function to get the total number of items (sum of quantities) in the cart
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get the total price of all items in the cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // The value provided by the context
  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

// Custom hook to consume the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}