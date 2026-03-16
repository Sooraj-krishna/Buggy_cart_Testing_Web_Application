import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast.ts';
import { Product } from '@/types/product.ts'; // Assuming Product interface is defined here

/**
 * Defines the shape of the Wishlist Context.
 */
interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

/**
 * Creates the React Context for the wishlist.
 * It's initialized with `undefined` and will be provided by `WishlistContext` (the provider component).
 */
const WishlistProvider = createContext<WishlistContextType | undefined>(undefined);

/**
 * Props for the Wishlist Provider component.
 */
interface WishlistProviderProps {
  children: ReactNode;
}

/**
 * WishlistContext Provider Component.
 * Manages the wishlist state, provides functions to interact with it,
 * and persists the wishlist to local storage.
 * It also uses toast notifications for user feedback.
 *
 * This component is named `WishlistContext` and default exported as per strict naming rules.
 */
function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    // Initialize wishlist from local storage on component mount
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
        return [];
      }
    }
    return [];
  });

  // Effect to save wishlist to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlist]);

  /**
   * Adds a product to the wishlist.
   * Provides a toast notification for success or if the item is already present.
   * @param product The product to add.
   */
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
        variant: "default", // Can be "destructive" or "default" depending on desired feedback
      });
    }
  };

  /**
   * Removes a product from the wishlist by its ID.
   * Provides a toast notification upon removal.
   * @param productId The ID of the product to remove.
   */
  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
    toast({
      title: "Removed from Wishlist",
      description: "Product has been removed from your wishlist.",
    });
  };

  /**
   * Checks if a product is currently in the wishlist.
   * @param productId The ID of the product to check.
   * @returns True if the product is in the wishlist, false otherwise.
   */
  const isInWishlist = (productId: string) => {
    return wishlist.some((product) => product.id === productId);
  };

  // The value provided to consumers of the context
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/**
 * Custom hook to consume the Wishlist Context.
 * Throws an error if used outside of a WishlistProvider.
 * @returns The wishlist context value.
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Export the provider component as default, named WishlistContext as per strict naming rules.
export default WishlistProvider;