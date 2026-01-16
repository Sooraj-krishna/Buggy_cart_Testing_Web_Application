import React, { useState, useEffect } from 'react';

// Define the interface for a Product
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assuming a backend API endpoint at /api/products
        const response = await fetch('/api/products');

        if (!response.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        // Catch any network errors or errors thrown above
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred while fetching products.');
        }
        console.error("Failed to fetch products:", err);
      } finally {
        // Ensure loading state is set to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <div className="products-page-container">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page-container">
        <h1 className="error-title">Error</h1>
        <p className="error-message">Failed to load products: {error}</p>
        <p>Please try again later or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <h1 className="page-title">Our Products</h1>
      {products.length === 0 ? (
        <p className="no-products-message">No products found at the moment. Please check back later!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;