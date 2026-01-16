export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string; // e.g., "USD", "EUR"
  imageUrl: string;
  category?: string;
  stock?: number;
}