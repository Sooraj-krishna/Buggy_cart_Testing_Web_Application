import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export default function Header({ cartItemCount = 0, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
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
