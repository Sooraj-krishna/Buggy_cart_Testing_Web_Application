import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header.tsx";
import Home from "@/pages/Home.tsx";
import ProductsPage from "@/pages/ProductsPage.tsx"; // New ProductsPage to list products
import ProductDetail from "@/pages/ProductDetail.tsx";
import Cart from "@/pages/Cart.tsx";
import Checkout from "@/pages/Checkout.tsx";
import NotFound from "@/pages/not-found.tsx";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";
import { WishlistProvider } from "@/context/WishlistContext.tsx"; // Import WishlistProvider

function AppContent() {
  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const cartItemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      <WishlistProvider> {/* Wrap routes with WishlistProvider for state management */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={ProductsPage} /> {/* Use the new ProductsPage */}
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route component={NotFound} />
        </Switch>
      </WishlistProvider>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;