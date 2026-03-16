import React from 'react';
import { Heart, ShoppingCart, X } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useWishlist } from '@/context/WishlistContext.tsx';
import { Product } from '@shared/schema.ts';

// Helper component for individual wishlist items within the sheet
interface WishlistItemProps {
  item: Product;
  onRemove: (productId: string) => void;
  onAddToCart?: (product: Product) => void; // Optional: if we want to add to cart from wishlist
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, onRemove, onAddToCart }) => {
  return (
    <div className="flex items-center space-x-4 py-4">
      <img
        src={item.imageUrl} // Assuming Product type has an imageUrl property
        alt={item.name}
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="flex-1 grid gap-1">
        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
        <p className="text-muted-foreground text-xs">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        {onAddToCart && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddToCart(item)}
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          aria-label="Remove from wishlist"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

function WishlistSheet() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  // Placeholder for adding to cart functionality.
  // In a real application, this would interact with a CartContext or similar state management.
  const handleAddToCart = (product: Product) => {
    console.log(`Adding ${product.name} to cart and removing from wishlist.`);
    // Simulate adding to cart, then remove from wishlist
    // You would typically call a cart context function here, e.g., addToCart(product);
    removeFromWishlist(product.id);
    // Optionally, show a toast notification here
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open wishlist">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {wishlistItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Wishlist</SheetTitle>
          <SheetDescription>
            Manage your saved items.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {wishlistItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-muted-foreground text-center p-4">
            <p>Your wishlist is empty. Start adding items you love!</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="divide-y">
              {wishlistItems.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        <Separator />

        <SheetFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          {wishlistItems.length > 0 && (
            <Button className="w-full" onClick={() => console.log("Implement 'Move all to Cart' functionality")}>
              Move all to Cart (Optional)
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={() => console.log("Continue shopping action")}>
            Continue Shopping
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default WishlistSheet;