export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number; // Optional rating, e.g., 4.5
  reviewsCount?: number; // Optional number of reviews
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {
  // Additional properties specific to a wishlist item can be added here,
  // e.g., dateAdded: string;
}