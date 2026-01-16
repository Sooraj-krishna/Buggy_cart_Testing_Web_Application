export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string; // e.g., "USD", "EUR"
  imageUrl: string;
  category?: string;
  stock?: number;
  rating?: {
    rate: number;
    count: number;
  };
}

// If there were other shared types related to product features,
// they would also be defined and exported here.
// For example, an interface for a product filter or a paginated response.
// export interface ProductFilter {
//   category?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   searchQuery?: string;
// }

// export interface PaginatedProductsResponse {
//   products: Product[];
//   totalItems: number;
//   currentPage: number;
//   totalPages: number;
// }