import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import APage from "@/pages/APage.tsx"; // New page import
import CartPage from "@/pages/CartPage.tsx"; // New cart page import
import { CartProvider, useCart } from "@/context/CartContext.tsx"; // Cart context imports

function AppContent() {
  // Get cart items from the global cart context
  const { cartItems } = useCart();

  // Calculate total quantity of items in the cart
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/a-page" component={APage} /> {/* New route for APage */}
        <Route path="/cart" component={CartPage} /> {/* Use the new CartPage */}
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Wrap the application content with CartProvider to make cart state available globally */}
        <CartProvider>
          <AppContent />
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;