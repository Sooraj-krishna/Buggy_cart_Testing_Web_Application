import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "./context/CartContext";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import APage from "@/pages/APage.tsx"; // Import the new APage
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";
// New imports for Cart functionality
import { CartProvider } from "@/context/CartContext.tsx";
import CartSheet from "@/components/CartSheet.tsx";

function AppContent() {
  // Existing cart query for Header, preserving its current functionality.
  // The CartContext will manage the client-side cart state for the CartSheet.
  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const cartItemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} /> {/* Header still receives existing prop */}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/a" component={APage} /> {/* Add the new route for APage */}
        <Route component={NotFound} />
      </Switch>
      {/* Render the CartSheet component. It will consume CartContext to display the cart. */}
      <CartSheet />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Wrap AppContent with CartProvider to make cart state globally available */}
        <CartProvider>
          <AppContent />
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;