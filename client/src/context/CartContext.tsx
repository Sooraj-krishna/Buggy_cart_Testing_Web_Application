import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast.ts';
import { cn } from '@/lib/utils.ts'; // Included for general utility, though not directly used in this specific file.

// --- Types ---
// Define a basic Product interface. If a more comprehensive Product type
// exists in `@shared/schema.ts`, it should be imported and used instead.
// For this context, we'll define a minimal structure.
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string; // Optional image URL for display in cart
  // Add other relevant product properties as needed (e.g., description, category)
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartTotalItems: number;
  cartTotalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// --- Create the actual React Context object ---
// We name it `_CartContext` to avoid a naming collision with the default exported
// component `CartContext`, which serves as the provider.
const _CartContext = createContext<CartContextType | undefined>(undefined);

// --- Cart Provider Component ---
interface CartProviderProps {
  children: ReactNode;
}

/**
 * `CartContext` serves as the provider for the global cart state.
 * It manages adding, removing, updating quantities, and clearing cart items,
 * as well as controlling the visibility of the cart side panel.
 * Cart state is persisted to and loaded from local storage.
 *
 * This component is named `CartContext` to strictly adhere to the
 * "Component Name MUST EXACTLY Match Filename" rule for `CartContext.tsx`.
 */
export default CartProvider CartContext({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Effect to load cart items from local storage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ecom_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
      // If local storage data is corrupted, start with an empty cart
      setCartItems([]);
    }
  }, []);

  // Effect to save cart items to local storage whenever `cartItems` changes
  useEffect(() => {
    try {
      localStorage.setItem('ecom_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to local storage:", error);
    }
  }, [cartItems]);

  // --- Cart Actions ---

  /**
   * Adds a product to the cart or updates its quantity if it already exists.
   * @param product The product to add.
   * @param quantityToAdd The amount to add, defaults to 1.
   */
  const addToCart = (product: Product, quantityToAdd: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity updated to ${existingItem.quantity + quantityToAdd}.`,
        });
        return updatedItems;
      } else {
        // Add new item to cart
        const newItems = [...prevItems, { ...product, quantity: quantityToAdd }];
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
        });
        return newItems;
      }
    });
    openCart(); // Automatically open the cart panel when an item is added
  };

  /**
   * Removes an item completely from the cart.
   * @param productId The ID of the product to remove.
   */
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

  /**
   * Updates the quantity of a specific item in the cart.
   * If the quantity is 0 or less, the item is removed from the cart.
   * @param productId The ID of the product to update.
   * @param quantity The new quantity for the product.
   */
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        const itemToRemove = prevItems.find(item => item.id === productId);
        if (itemToRemove) {
          toast({
            title: "Removed from Cart",
            description: `${itemToRemove.name} has been removed from your cart.`,
          });
        }
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
    closeCart(); // Close cart panel after clearing
  };

  // --- Cart Panel Control ---

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // --- Cart Totals ---
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // The value provided to consumers of the context
  const contextValue: CartContextType = {
    cartItems,
    isCartOpen,
    cartTotalItems,
    cartTotalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return (
    <_CartContext.Provider value={contextValue}>
      {children}
    </_CartContext.Provider>
  );
}

// --- Custom Hook for Consuming Cart Context ---

/**
 * `useCart` is a custom hook that provides access to the global cart state and actions.
 * It must be used within a `CartContext` (provider).
 * @returns The cart context value (cart items, state, and actions).
 * @throws An error if used outside of a `CartContext` provider.
 */
export const useCart = () => {
  const context = useContext(_CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartContext (Provider)');
  }
  return context;
};