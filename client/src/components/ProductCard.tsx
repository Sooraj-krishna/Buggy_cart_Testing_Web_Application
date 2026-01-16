import { Link } from "wouter";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // The console.error for 'nonExistentProperty' was a placeholder/debug statement and has been removed.
  
  const discount = product.originalPrice
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  return (
    <Card
      data-testid={`card-product-${product.id}`}
      className="group relative overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <Badge
              data-testid={`badge-${product.badge.toLowerCase()}-${product.id}`}
              className={`absolute top-2 left-2 ${
                product.badge === "Bestseller"
                  ? "bg-orange-500 text-white"
                  : product.badge === "New Arrival"
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge
              data-testid={`badge-discount-${product.id}`}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground"
            >
              {discount}% OFF
            </Badge>
          )}
        </div>
      </Link>

      <Button
        data-testid={`button-wishlist-${product.id}`}
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white hover-elevate"
      >
        <Heart className="h-4 w-4" />
      </Button>

      <div className="p-4 space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3
            data-testid={`text-product-name-${product.id}`}
            className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors min-h-[3rem]"
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(Number(product.rating))
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span
            data-testid={`text-rating-${product.id}`}
            className="text-sm text-muted-foreground"
          >
            ({product.rating})
          </span>
          <span className="text-sm text-muted-foreground">
            {product.reviewCount} reviews
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            data-testid={`text-price-${product.id}`}
            className="text-2xl font-bold"
          >
            ₹{Number(product.price).toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              data-testid={`text-original-price-${product.id}`}
              className="text-sm text-muted-foreground line-through"
            >
              ₹{Number(product.originalPrice).toLocaleString()}
            </span>
          )}
        </div>

        <Button
          data-testid={`button-add-to-cart-${product.id}`}
          onClick={() => onAddToCart?.(product.id)}
          className="w-full"
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </Card>
  );
}