import React, { useState, useEffect } from 'react';

// 1. Shared Product Interface (ideally in a shared types file, but defined here for completeness of this file)
interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// 2. Mock Backend API Endpoint Simulation
// In a real application, this would be an actual API call (e.g., using axios or fetch)
// to a backend server.
const mockProducts: IProduct[] = [
  { id: 'prod-1', name: 'Laptop Pro X', description: 'High-performance laptop for professionals.', price: 1299.99, imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+Pro+X' },
  { id: 'prod-2', name: 'Wireless Ergonomic Mouse', description: 'Comfortable and precise mouse for daily use.', price: 49.99, imageUrl: 'https://via.placeholder.com/300x200?text=Wireless+Mouse' },
  { id: 'prod-3', name: 'Mechanical Keyboard RGB', description: 'Tactile and clicky keyboard with customizable RGB lighting.', price: 119.99, imageUrl: 'https://via.placeholder.com/300x200?text=Mech+Keyboard' },
  { id: 'prod-4', name: 'USB-C Hub 7-in-1', description: 'Expand your device connectivity with multiple ports.', price: 39.99, imageUrl: 'https://via.placeholder.com/300x200?text=USB-C+Hub' },
  { id: 'prod-5', name: 'Noise-Cancelling Headphones', description: 'Immersive audio experience with active noise cancellation.', price: 199.99, imageUrl: 'https://via.placeholder.com/300x200?text=Headphones' },
  { id: 'prod-6', name: '4K UHD Monitor 27"', description: 'Stunning visuals and ample screen real estate.', price: 349.99, imageUrl: 'https://via.placeholder.com/300x200?text=4K+Monitor' },
];

const fetchProductsApi = (): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration purposes
      if (Math.random() < 0.1) { // 10% chance of failure
        reject(new Error('Failed to fetch products. Please try again.'));
      } else {
        resolve(mockProducts);
      }
    }, 1000); // Simulate network delay
  });
};

// 3. Custom React Hook to Fetch Products (ideally in client/src/hooks/useProducts.ts)
interface UseProductsResult {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => void; // Added refetch capability
}

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [triggerRefetch, setTriggerRefetch] = useState<number>(0); // State to trigger refetch

  const refetch = () => {
    setTriggerRefetch(prev => prev + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const data = await fetchProductsApi();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [triggerRefetch]); // Re-run effect when triggerRefetch changes

  return { products, loading, error, refetch };
};

// 4. Reusable Product Card Component (ideally in client/src/components/ProductCard.tsx)
interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      width: '280px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      />
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2em', color: '#333' }}>{product.name}</h3>
      <p style={{ fontSize: '0.9em', color: '#666', flexGrow: 1, marginBottom: '12px' }}>
        {product.description.length > 100 ? product.description.substring(0, 97) + '...' : product.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.3em', color: '#007bff', margin: 0 }}>
          ${product.price.toFixed(2)}
        </p>
        <button style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '0.9em',
          transition: 'background-color 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// 5. Products Page Component
const ProductsPage: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Our Amazing Products</h1>

      {loading && (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em', color: '#555' }}>
          Loading products...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          margin: '20px auto',
          maxWidth: '600px',
        }}>
          <p style={{ margin: '0 0 15px 0', fontSize: '1.1em' }}>Error: {error}</p>
          <button
            onClick={refetch}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1em',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em', color: '#555' }}>
          No products found.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          justifyItems: 'center',
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;