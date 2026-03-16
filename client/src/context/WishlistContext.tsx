import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define Product Type for Wishlist
// This type should match the essential properties of a product that you want to store in the wishlist.
// It's defined here as a basic interface, assuming a full Product type might be in shared/schema.ts
// but for client-side context, a simpler representation is often sufficient.
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  // Add other relevant product properties if needed, e.g., 'slug', 'category', etc.
}

// Define the shape of the Wishlist Context
interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistSheetOpen: boolean;
  openWishlistSheet: () => void;
  closeWishlistSheet: () => void;
}

// Create the Context object
const InternalWishlistContext = createContext<WishlistContextType | undefined>(undefined);

// LocalStorage key for persisting wishlist data
const WISHLIST_STORAGE_KEY = 'my_ecommerce_wishlist';

// The actual Provider logic component
interface WishlistProviderProps {
  children: ReactNode;
}

function WishlistProviderLogic({ children }: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistSheetOpen, setIsWishlistSheetOpen] = useState(false);

  // Effect to load wishlist from localStorage on initial component mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
      // In case of corrupted data, clear it to prevent future errors
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save wishlist to localStorage whenever the wishlist state changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]); // Dependency array includes 'wishlist' to trigger on changes

  // Function to add a product to the wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      // Prevent adding duplicate products
      if (!prevWishlist.some((item) => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist; // Product already exists, return current state
    });
  };

  // Function to remove a product from the wishlist by its ID
  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  // Function to check if a product is already in the wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  // Functions to control the visibility of the wishlist sheet component
  const openWishlistSheet = () => {
    setIsWishlistSheetOpen(true);
  };

  const closeWishlistSheet = () => {
    setIsWishlistSheetOpen(false);
  };

  // The value provided by the context
  const contextValue: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isWishlistSheetOpen,
    openWishlistSheet,
    closeWishlistSheet,
  };

  return (
    <InternalWishlistContext.Provider value={contextValue}>
      {children}
    </InternalWishlistContext.Provider>
  );
}

// Custom Hook to consume the wishlist context
// This hook provides a convenient way for components to access wishlist state and functions.
export const useWishlist = () => {
  const context = useContext(InternalWishlistContext);
  if (context === undefined) {
    // Ensure the hook is used within the WishlistProvider
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Main WishlistContext component that acts as the provider.
// This component adheres to the strict naming convention:
// Filename: WishlistContext.tsx -> Default Export Component Name: WishlistContext
function WishlistProvider({ children }: WishlistProviderProps) {
  return <WishlistProviderLogic>{children}</WishlistProviderLogic>;
}

export default WishlistProvider;