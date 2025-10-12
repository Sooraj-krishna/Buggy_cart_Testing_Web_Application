import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetail() {
  const { toast } = useToast();
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const relatedProducts = allProducts?.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 4) || [];

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      apiRequest("POST", "/api/cart", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart!",
        description: `${quantity} item(s) added to your cart.`,
      });
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate({ productId: product.id, quantity });
    }
  };

  if (productLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
              {product.badge && (
                <Badge
                  data-testid="badge-product-badge"
                  className={`absolute top-4 left-4 ${
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
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded border-2 border-border hover:border-primary cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 data-testid="text-product-name" className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(Number(product.rating))
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span data-testid="text-product-rating" className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span data-testid="text-product-price" className="text-4xl font-bold">
                ₹{Number(product.price).toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span data-testid="text-product-original-price" className="text-xl text-muted-foreground line-through">
                    ₹{Number(product.originalPrice).toLocaleString()}
                  </span>
                  <Badge data-testid="badge-product-discount" className="bg-destructive text-destructive-foreground">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded">
                <Button
                  data-testid="button-decrease-quantity"
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover-elevate"
                >
                  -
                </Button>
                <span data-testid="text-quantity" className="px-4 font-semibold">{quantity}</span>
                <Button
                  data-testid="button-increase-quantity"
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover-elevate"
                >
                  +
                </Button>
              </div>
              <Button
                data-testid="button-add-to-cart-detail"
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                data-testid="button-wishlist-detail"
                variant="outline"
                size="lg"
                className="hover-elevate"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% secure</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7 days return</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="font-medium">Brand:</span>
                <span className="text-muted-foreground">{product.brand}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Category:</span>
                <span className="text-muted-foreground">{product.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Stock:</span>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList data-testid="tabs-product-info">
            <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
            <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6" data-testid="content-description">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6" data-testid="content-specifications">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-medium">Brand</p>
                  <p className="text-muted-foreground">{product.brand}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Category</p>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6" data-testid="content-reviews">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
