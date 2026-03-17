import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Header from "@/components/Header.tsx";
import Home from "@/pages/Home.tsx";
import Products from "@/pages/Products.tsx";
import ProductDetail from "@/pages/ProductDetail.tsx";
import Cart from "@/pages/Cart.tsx";
import Checkout from "@/pages/Checkout.tsx";
import ContactPage from "@/pages/ContactPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import NotFound from "@/pages/not-found.tsx";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema.ts";

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
        <Route path="/products" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
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