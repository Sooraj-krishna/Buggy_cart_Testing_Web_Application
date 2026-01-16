import { useState, useEffect } from 'react';

/**
 * @interface Product
 * @description Defines the structure for a single product item.
 * In a larger application, this interface might be defined in a shared types file
 * (e.g., `client/src/types/product.ts`) and imported.
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

/**
 * @interface UseProductsResult
 * @description Defines the return type for the `useProducts` hook.
 */
interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/**
 * @function useProducts
 * @description A custom React hook to fetch product data from a backend API endpoint.
 * It manages the loading state, potential errors, and the list of products.
 *
 * @returns {UseProductsResult} An object containing:
 *   - `products`: An array of `Product` objects.
 *   - `loading`: A boolean indicating if the data is currently being fetched.
 *   - `error`: A string containing an error message if the fetch failed, otherwise `null`.
 */
const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors before a new fetch

        // Assuming a backend API endpoint for mock product data exists at '/api/products'.
        // This endpoint should return an array of Product objects.
        const response = await fetch('/api/products');

        if (!response.ok) {
          // If the HTTP response status is not in the 200-299 range,
          // it indicates an error from the server.
          const errorBody = await response.text(); // Attempt to read the error message from the response body
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}. Details: ${errorBody}`
          );
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        // Catch network errors (e.g., server unreachable) or errors thrown above.
        console.error("Error fetching products:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching products.");
        }
      } finally {
        // Ensure loading state is set to false regardless of success or failure.
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures this effect runs only once after the initial render.

  return { products, loading, error };
};

export default useProducts;