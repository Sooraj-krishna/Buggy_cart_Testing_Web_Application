import { useState, useEffect, useCallback } from 'react';

// Define the interface for a product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define the return type of our hook
interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void; // Function to manually refetch products
}

/**
 * A custom React hook to fetch product data from a backend API.
 * It manages loading, error states, and provides a refetch mechanism.
 *
 * @returns {UseProductsResult} An object containing products, loading state, error message, and a refetch function.
 */
export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0); // Used to trigger a refetch

  const fetchProducts = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Assuming the backend API endpoint for products is /api/products
      const response = await fetch('/api/products', { signal });

      if (!response.ok) {
        // If the response is not OK (e.g., 404, 500), throw an error
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          // Request was aborted, typically on component unmount
          console.log('Fetch aborted');
        } else {
          console.error('Failed to fetch products:', err);
          setError(`Failed to load products: ${err.message}`);
        }
      } else {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred while fetching products.');
      }
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, so this function is stable across renders

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchProducts(signal);

    // Cleanup function: abort the fetch request if the component unmounts
    return () => {
      abortController.abort();
    };
  }, [fetchProducts, refetchTrigger]); // Re-run effect if fetchProducts changes or refetchTrigger is updated

  // Function to manually trigger a refetch
  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  return { products, loading, error, refetch };
};