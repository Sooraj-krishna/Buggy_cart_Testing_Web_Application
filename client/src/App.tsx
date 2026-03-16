import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Header from "@/components/Header.tsx";
import Home from "@/pages/Home.tsx";
import Products from "@/pages/Products.tsx"; // Keep import for now, though route is changed
import ProductDetail from "@/pages/ProductDetail.tsx";
import Cart from "@/pages/Cart.tsx";
import Checkout from "@/pages/Checkout.tsx";
import NotFound from "@/pages/not-found.tsx";

// New imports for Context Providers and Product Listing Page
import { CartProvider, useCart } from "@/context/CartContext.tsx";
import { WishlistProvider } from "@/context/WishlistContext.tsx";
import ProductListingPage from "@/pages/ProductListingPage.tsx";

function AppContent() {
  // The cart state is now managed by CartContext.
  // We remove the direct useQuery for cart items and instead consume from the context.
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      <Switch>
        <Route path="/" component={Home} />
        {/* Modify the /products route to use the new ProductListingPage */}
        <Route path="/products" component={ProductListingPage} />
        {/* New route for the ProductListingPage, kept for explicit access if needed */}
        <Route path="/products-listing" component={ProductListingPage} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
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
        {/* Wrap the AppContent with CartProvider and WishlistProvider */}
        {/* This makes cart and wishlist state available to all components within AppContent */}
        <CartProvider>
          <WishlistProvider>
            <AppContent />
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;