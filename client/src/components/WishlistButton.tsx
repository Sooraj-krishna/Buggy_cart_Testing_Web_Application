import React, { useContext } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Heart } from 'lucide-react';
import { WishlistContext } from '@/context/WishlistContext.tsx';
import { Product } from '@shared/schema.ts'; // Assuming Product type is defined here

interface WishlistButtonProps {
  product: Product;
}

function WishlistButton({ product }: WishlistButtonProps) {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleToggleWishlist = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering parent click events if nested
    toggleWishlist(product);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleWishlist}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className="text-muted-foreground hover:text-primary"
    >
      <Heart fill={isInWishlist ? 'currentColor' : 'none'} className={isInWishlist ? 'text-red-500' : ''} />
    </Button>
  );
}

export default WishlistButton;