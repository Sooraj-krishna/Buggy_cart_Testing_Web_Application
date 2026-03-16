import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product.ts';
import { sampleProducts } from '@/data/sample-products.ts';
import { useCart } from '@/context/CartContext.tsx';
import { useWishlist } from '@/context/WishlistContext.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx';
import ProductCard from '@/components/ProductCard.tsx'; // Import the new ProductCard component

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
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isInCart={isProductInCart(product.id)}
              isInWishlist={isProductInWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;