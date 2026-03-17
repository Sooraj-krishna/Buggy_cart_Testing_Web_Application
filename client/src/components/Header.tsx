// --- Step 1: Create the new AboutPage.tsx component ---
// Since I cannot create new files directly, I must assume the content for client/src/pages/AboutPage.tsx based on the requirement.

/*
// client/src/pages/AboutPage.tsx (Assumed content)
import React from 'react';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-2">About Us</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-primary">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to revolutionize the e-commerce experience by providing high-quality, curated products with unparalleled customer service. We strive to make shopping seamless, enjoyable, and trustworthy for everyone, everywhere.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-primary">Our Values</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="text-lg mr-2 text-green-500">✓</span>
            <strong>Integrity:</strong> Operating with transparency and honesty in all our dealings.
          </li>
          <li className="flex items-start">
            <span className="text-lg mr-2 text-green-500">✓</span>
            <strong>Customer Focus:</strong> Putting the needs and satisfaction of our customers first.
          </li>
          <li className="flex items-start">
            <span className="text-lg mr-2 text-green-500">✓</span>
            <strong>Quality:</strong> Committing to sourcing and delivering only the best products.
          </li>
          <li className="flex items-start">
            <span className="text-lg mr-2 text-green-500">✓</span>
            <strong>Innovation:</strong> Continuously seeking better ways to serve our community through technology and service improvements.
          </li>
        </ul>
      </section>
    </div>
  );
}
*/

// --- Step 2: Modify client/src/components/Header.tsx ---
// Add navigation link for About page.

import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      console.error("Search functionality broken - callback not executed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 p-4">
          <Button
            data-testid="button-mobile-menu"
            size="icon"
            variant="ghost"
            className="md:hidden text-primary-foreground hover-elevate"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xl font-bold">ShopKart</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto hidden md:flex">
            <div className="relative w-full">
              <Input
                data-testid="input-search"
                type="search"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-foreground pr-10 border-0 focus-visible:ring-2 focus-visible:ring-white"
              />
              <Button
                data-testid="button-search"
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover-elevate text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link href="/about" data-testid="link-about">
              <Button
                variant="ghost"
                className="text-primary-foreground hover-elevate hidden md:flex"
              >
                <span>About</span>
              </Button>
            </Link>

            <Link href="/contact" data-testid="link-contact">
              <Button
                variant="ghost"
                className="text-primary-foreground hover-elevate hidden md:flex"
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                <span>Contact</span>
              </Button>
            </Link>

            <Button
              data-testid="button-account"
              variant="ghost"
              className="text-primary-foreground hover-elevate hidden md:flex"
            >
              <User className="h-5 w-5 mr-2" />
              <span>Account</span>
            </Button>

            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" className="text-primary-foreground hover-elevate relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    data-testid="text-cart-count"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-offer text-offer-foreground text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden md:inline">Cart</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Input
                data-testid="input-search-mobile"
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-foreground pr-10 border-0"
              />
              <Button
                data-testid="button-search-mobile"
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover-elevate text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary-border bg-primary">
          <nav className="p-4 space-y-2">
            <Link href="/about" data-testid="link-mobile-about">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About Us</span>
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-mobile-contact">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </Link>
            <Button
              data-testid="button-mobile-account"
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover-elevate"
            >
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

// --- Step 3: Update client/src/App.tsx to register the route ---
// Assuming client/src/App.tsx uses react-router-dom or wouter for routing.
// Since Header uses 'wouter' Link component, we assume wouter is used for routing.

/*
// client/src/App.tsx (Modification required)
import { Route } from "wouter";
import Header from "@/components/Header.tsx";
import HomePage from "@/pages/Home.tsx";
// ... other imports

// Add import for AboutPage
import AboutPage from "@/pages/AboutPage.tsx"; 
// ... existing routes

<Route path="/about">
  <AboutPage />
</Route>
// ... other routes
*/

// Since I must return ONLY the modified Header.tsx content, I will ensure Header.tsx is complete based on its requirements.
// The routing update in App.tsx is a necessary side effect of implementing the feature, but I can only output the requested file modification.

// Final check on Header.tsx modifications:
// 1. Added navigation link to About page in desktop view. (Added <Link href="/about">)
// 2. Added navigation link to About page in mobile menu view. (Added <Link href="/about">)
// 3. Preserved all existing functionality.

// The implementation for Header.tsx is complete as requested.
// Note: The creation of client/src/pages/AboutPage.tsx and modification of client/src/App.tsx are implied necessary steps for feature completion but are outside the scope of modifying ONLY the provided file content.

import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export default Header Header({ cartItemCount = 0, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      console.error("Search functionality broken - callback not executed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 p-4">
          <Button
            data-testid="button-mobile-menu"
            size="icon"
            variant="ghost"
            className="md:hidden text-primary-foreground hover-elevate"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xl font-bold">ShopKart</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto hidden md:flex">
            <div className="relative w-full">
              <Input
                data-testid="input-search"
                type="search"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-foreground pr-10 border-0 focus-visible:ring-2 focus-visible:ring-white"
              />
              <Button
                data-testid="button-search"
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover-elevate text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link href="/about" data-testid="link-about">
              <Button
                variant="ghost"
                className="text-primary-foreground hover-elevate hidden md:flex"
              >
                <span>About</span>
              </Button>
            </Link>

            <Link href="/contact" data-testid="link-contact">
              <Button
                variant="ghost"
                className="text-primary-foreground hover-elevate hidden md:flex"
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                <span>Contact</span>
              </Button>
            </Link>

            <Button
              data-testid="button-account"
              variant="ghost"
              className="text-primary-foreground hover-elevate hidden md:flex"
            >
              <User className="h-5 w-5 mr-2" />
              <span>Account</span>
            </Button>

            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" className="text-primary-foreground hover-elevate relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    data-testid="text-cart-count"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-offer text-offer-foreground text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="ml-2 hidden md:inline">Cart</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Input
                data-testid="input-search-mobile"
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-foreground pr-10 border-0"
              />
              <Button
                data-testid="button-search-mobile"
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full hover-elevate text-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary-border bg-primary">
          <nav className="p-4 space-y-2">
            <Link href="/about" data-testid="link-mobile-about">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About Us</span>
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-mobile-contact">
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </Link>
            <Button
              data-testid="button-mobile-account"
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover-elevate"
            >
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}