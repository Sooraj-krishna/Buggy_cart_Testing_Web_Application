import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product.ts';
import { sampleProducts } from '@/data/sample-products.ts';
import { useCart } from '@/context/CartContext.tsx';
import { useWishlist } from '@/context/WishlistContext.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, cartItems } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProducts(sampleProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Added to Cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    toast({
      title: 'Added to Wishlist!',
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const isProductInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      {error && (
        <div className="text-red-500 text-center text-lg mb-4">{error}</div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-grow">
                <AspectRatio ratio={1 / 1} className="mb-4">
                  <Skeleton className="h-full w-full object-cover rounded-md" />
                </AspectRatio>
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="line-clamp-1">{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <AspectRatio ratio={1 / 1} className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </AspectRatio>
                <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
                <Badge variant="secondary" className={cn(
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                )}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock || isProductInCart(product.id)}
                  className="w-full sm:w-auto flex-grow"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isProductInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAddToWishlist(product)}
                  disabled={isProductInWishlist(product.id)}
                  className="w-full sm:w-auto flex-grow"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {isProductInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;