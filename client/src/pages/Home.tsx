import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { name: "Electronics", image: "https://placehold.co/400x200/2874f0/ffffff?text=Electronics", link: "/products?category=Electronics" },
  { name: "Fashion", image: "https://placehold.co/400x200/f0a82e/ffffff?text=Fashion", link: "/products?category=Fashion" },
  { name: "Home & Kitchen", image: "https://placehold.co/400x200/10b981/ffffff?text=Home+Kitchen", link: "/products?category=Home" },
  { name: "Books", image: "https://placehold.co/400x200/8b5cf6/ffffff?text=Books", link: "/products?category=Books" },
];

export default function Home() {
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 8) || [];

  const handleAddToCart = (productId: string) => {
    toast({
      title: "Added to cart!",
      description: "Product has been added to your cart.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                data-testid={`link-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="relative group overflow-hidden rounded-md border border-border hover:shadow-lg transition-all">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" data-testid="link-view-all">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss Out on Great Deals!
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Subscribe to our newsletter and get exclusive offers
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              data-testid="input-newsletter"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button
              data-testid="button-subscribe"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
