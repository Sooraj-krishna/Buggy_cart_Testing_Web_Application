export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number; // Optional, for products that might have a rating
  reviewsCount?: number; // Optional, for products that might have reviews
}

export interface CartItem extends Product {
  quantity: number;
}

// Wishlist items can simply be Product objects, so a separate interface might not be strictly necessary
// unless additional wishlist-specific properties are needed in the future.
// For now, we can assume a Wishlist will store an array of Product.