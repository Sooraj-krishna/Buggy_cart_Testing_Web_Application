import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
// Assuming AboutPage.tsx exists based on the original import, though it wasn't listed in the provided file list.
// We must preserve existing functionality, so we keep the import path as it was written in the original file content.
import About from "@/pages/AboutPage"; 
import ProfilePage from "@/pages/ProfilePage"; // Import the new Profile page (using correct filename/component name)
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";

function AppContent() {
  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const cartItemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/profile" component={ProfilePage} /> {/* Add route for the Profile page */}
        <Route component={NotFound} />
      </Switch>
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