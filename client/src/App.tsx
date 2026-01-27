import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Header from "@/components/Header.tsx";
import Home from "@/pages/Home.tsx";
import ProductsPage from "@/pages/Products.tsx"; // Renamed import to match file name convention
import ProductDetail from "@/pages/ProductDetail.tsx";
import CartPage from "@/pages/Cart.tsx"; // Renamed import to match file name convention
import Checkout from "@/pages/Checkout.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import NotFound from "@/pages/not-found.tsx";
import { useQuery } from "@tanstack/react-query";
import type { CartItem, Product } from "@shared/schema";
import React, { useState, createContext, useContext, useCallback, useMemo } from "react";

// --- Types and Sample Data ---

// Define Product type locally for App.tsx usage if needed, though it's imported from @shared/schema
// We will use the Product type imported from @shared/schema

// Sample Product Data (Simulating API fetch)
const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Mechanical Keyboard", price: 129.99, description: "High-performance mechanical keyboard with wireless connectivity.", category: "Electronics", imageUrl: "/images/keyboard.jpg" },
  { id: 2, name: "Ergonomic Office Chair", price: 349.99, description: "Fully adjustable chair designed for maximum comfort during long work sessions.", category: "Furniture", imageUrl: "/images/chair.jpg" },
  { id: 3, name: "4K Ultra HD Monitor", price: 499.99, description: "27-inch monitor with stunning 4K resolution and HDR support.", category: "Electronics", imageUrl: "/images/monitor.jpg" },
  { id: 4, name: "Noise Cancelling Headphones", price: 249.99, description: "Premium over-ear headphones with industry-leading noise cancellation.", category: "Audio", imageUrl: "/images/headphones.jpg" },
];

// --- Cart Context Setup ---

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  products: Product[]; // Expose products via context for simplicity
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart state (using local state for client-side simulation)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Simulate product data fetching/storage
  const products = SAMPLE_PRODUCTS;

  const addToCart = useCallback((productId: number, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);

      if (existingItem) {
        return prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = products.find(p => p.id === productId);
        if (!product) return prevItems;

        return [
          ...prevItems,
          {
            id: Date.now(), // Mock ID
            productId: productId,
            quantity: quantity,
            product: product,
          } as CartItem,
        ];
      }
    });
  }, [products]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.productId !== productId);
      }
      return prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: quantity }
          : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  }, []);

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    products,
  }), [cartItems, addToCart, updateQuantity, removeFromCart, products]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};


// --- App Content Component ---

function AppContent() {
  // Use local state/context for cart management instead of relying on a mock API query
  // We will still use useQuery for demonstration purposes if needed, but rely on context for state management
  const { cartItems } = useCart();

  // Calculate cart item count from context state
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // NOTE: The original useQuery for "/api/cart" is removed as we are implementing local state management
  // If we were connecting to a real backend, we would keep the useQuery hook.

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      <main className="container mx-auto p-4">
        <Switch>
          <Route path="/" component={Home} />
          {/* Use ProductsPage and CartPage imports */}
          <Route path="/products" component={ProductsPage} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;