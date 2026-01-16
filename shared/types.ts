export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  // Add other relevant product properties as needed, e.g., stock, rating, etc.
  // stock?: number;
  // rating?: number;
}

export interface ProductApiResponse {
  products: Product[];
  // Optionally, add metadata for pagination or other API response details
  // totalCount?: number;
  // page?: number;
  // pageSize?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  // Optionally, add a specific error code or details
  // code?: string;
  // details?: any;
}