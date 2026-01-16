import React, { useState, useEffect } from 'react';

/**
 * @interface Product
 * @description Defines the structure for a product object.
 * In a monorepo, this interface would ideally be in a shared `types` or `shared` package.
 * For the purpose of generating a complete, working file as requested, it's defined here.
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

/**
 * @interface ProductCardProps
 * @description Props for the ProductCard component.
 */
interface ProductCardProps {
  product: Product;
}

/**
 * @component ProductCard
 * @description A component to display individual product details.
 * In a real application, this would likely be in `client/src/components/ProductCard.tsx`.
 * For the purpose of generating a complete, working file as requested, it's defined here.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#fff',
      transition: 'transform 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      />
      <h3 style={{
        margin: '0 0 10px 0',
        fontSize: '1.4em',
        color: '#333',
        fontWeight: '600',
      }}>{product.name}</h3>
      <p style={{
        margin: '0 0 15px 0',
        color: '#666',
        fontSize: '0.95em',
        lineHeight: '1.4',
        flexGrow: 1, // Allows description to take available space
      }}>{product.description}</p>
      <p style={{
        margin: '0 0 20px 0',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#007bff',
      }}>
        ${product.price.toFixed(2)}
      </p>
      <button style={{
        padding: '12px 25px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '500',
        transition: 'background-color 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Add to Cart
      </button>
    </div>
  );
};

/**
 * @component ProductsPage
 * @description A page component to display a list of products fetched from a (simulated) backend API.
 */
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- Simulate Backend API Call ---
        // In a real application, this would be an actual fetch request to your backend:
        // const response = await fetch('/api/products');
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        // }
        // const data: Product[] = await response.json();
        // setProducts(data);

        // For this example, we'll use dummy data and simulate network latency.
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate 1.2 seconds network delay

        const dummyProducts: Product[] = [
          {
            id: 'prod101',
            name: 'Premium Wireless Earbuds',
            description: 'Experience crystal-clear audio with active noise cancellation and a comfortable fit.',
            price: 149.99,
            imageUrl: 'https://via.placeholder.com/300x200?text=Earbuds',
          },
          {
            id: 'prod102',
            name: 'Ultra-Thin Laptop 13-inch',
            description: 'Powerful performance in a sleek, lightweight design, perfect for professionals on the go.',
            price: 1199.00,
            imageUrl: 'https://via.placeholder.com/300x200?text=Laptop',
          },
          {
            id: 'prod103',
            name: 'Smart Home Security Camera',
            description: 'Monitor your home 24/7 with 1080p HD video, motion detection, and two-way audio.',
            price: 79.95,
            imageUrl: 'https://via.placeholder.com/300x200?text=Security+Camera',
          },
          {
            id: 'prod104',
            name: 'Ergonomic Gaming Mouse',
            description: 'Precision tracking, customizable buttons, and RGB lighting for the ultimate gaming experience.',
            price: 59.99,
            imageUrl: 'https://via.placeholder.com/300x200?text=Gaming+Mouse',
          },
          {
            id: 'prod105',
            name: 'Portable Espresso Maker',
            description: 'Enjoy your favorite coffee anywhere with this compact and easy-to-use espresso machine.',
            price: 89.00,
            imageUrl: 'https://via.placeholder.com/300x200?text=Espresso+Maker',
          },
          {
            id: 'prod106',
            name: 'Fitness Tracker Watch',
            description: 'Track steps, heart rate, sleep, and more with this stylish and durable fitness companion.',
            price: 65.50,
            imageUrl: 'https://via.placeholder.com/300x200?text=Fitness+Tracker',
          },
        ];
        setProducts(dummyProducts);

      } catch (err) {
        console.error('Failed to fetch products:', err);
        // Provide a user-friendly error message
        setError('Failed to load products. Please check your internet connection or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        fontSize: '1.5em',
        color: '#555',
      }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        fontSize: '1.5em',
        color: '#dc3545', // Bootstrap red
        textAlign: 'center',
        padding: '20px',
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa', // Light background for the page
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '50px',
        color: '#343a40', // Darker text for heading
        fontSize: '2.8em',
        fontWeight: '700',
      }}>Our Latest Products</h1>

      {products.length === 0 ? (
        <p style={{
          textAlign: 'center',
          fontSize: '1.2em',
          color: '#6c757d', // Muted text color
          padding: '50px',
          border: '1px dashed #ced4da',
          borderRadius: '8px',
          backgroundColor: '#e9ecef',
        }}>
          No products are available at the moment. Please check back soon!
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '25px', // Spacing between cards
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