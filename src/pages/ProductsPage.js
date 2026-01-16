import React, { useState, useEffect } from 'react';

/**
 * ProductsPage Component
 *
 * Displays a list of sample products, simulating an asynchronous data fetch.
 * Handles loading states and potential errors.
 */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchProducts = async () => {
      try {
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Sample product data
        const sampleProducts = [
          {
            id: 'prod-101',
            name: 'Wireless Bluetooth Headphones',
            price: 79.99,
            description: 'High-fidelity sound with comfortable over-ear design and 20-hour battery life.',
            imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones'
          },
          {
            id: 'prod-102',
            name: 'Smartwatch with GPS',
            price: 199.99,
            description: 'Track your fitness, receive notifications, and navigate with built-in GPS.',
            imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch'
          },
          {
            id: 'prod-103',
            name: 'Portable Power Bank 10000mAh',
            price: 29.99,
            description: 'Keep your devices charged on the go with this compact and powerful power bank.',
            imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=PowerBank'
          },
          {
            id: 'prod-104',
            name: 'Ergonomic Office Chair',
            price: 249.99,
            description: 'Designed for maximum comfort and support during long working hours.',
            imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=OfficeChair'
          },
          {
            id: 'prod-105',
            name: '4K Ultra HD Smart TV',
            price: 599.99,
            description: 'Immersive viewing experience with stunning clarity and smart features.',
            imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=SmartTV'
          }
        ];

        // Simulate a potential error condition (e.g., network failure)
        // if (Math.random() < 0.2) { // 20% chance of error
        //   throw new Error('Failed to fetch products. Please try again later.');
        // }

        setProducts(sampleProducts);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || 'An unexpected error occurred while fetching products.');
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return (
      <div className="products-page-container loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page-container error">
        <h2>Error</h2>
        <p className="error-message">{error}</p>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <h1 className="products-page-title">Our Products</h1>

      {products.length === 0 ? (
        <p className="no-products-message">No products available at the moment. Please check back later!</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;