import React from 'react';

// Define the Product interface for type safety
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Optional image URL for product display
}

// Sample product data. In a real application, this would typically come from an API.
const sampleProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with noise-cancelling technology and long-lasting battery.',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones'
  },
  {
    id: 'prod-002',
    name: 'Ultra-Thin Laptop',
    description: 'Lightweight and powerful, perfect for productivity on the go with a stunning display.',
    price: 1200.00,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Laptop'
  },
  {
    id: 'prod-003',
    name: 'Smartwatch Pro',
    description: 'Track your fitness, receive notifications, and stay connected with advanced health monitoring.',
    price: 249.50,
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Smartwatch'
  },
  {
    id: 'prod-004',
    name: 'Ergonomic Office Chair',
    description: 'Designed for maximum comfort and support during long working hours, promoting good posture.',
    price: 350.00,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Chair'
  },
  {
    id: 'prod-005',
    name: '4K UHD Monitor',
    description: 'Stunning visuals and vibrant colors for an immersive viewing and gaming experience.',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=Monitor'
  },
  {
    id: 'prod-006',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact design with powerful sound, perfect for outdoor adventures and parties.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Speaker'
  },
];

/**
 * ProductsPage component displays a list of sample products.
 * In a production scenario, product data would typically be fetched from a backend API.
 */
const ProductsPage: React.FC = () => {
  // In a real application, you would use React's useState and useEffect hooks
  // to manage product data fetched from an API, handle loading states, and errors.
  // Example:
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/products'); // Replace with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data: Product[] = await response.json();
  //       setProducts(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An unknown error occurred');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // For this example, we're using static sample data directly.
  const productsToDisplay = sampleProducts; // In a real app, this would be `products` from state.

  // Basic inline styles for demonstration. In a larger project, use CSS modules, styled-components, or a UI library.
  const pageContainerStyle: React.CSSProperties = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: 'calc(100vh - 60px)' // Adjust based on header/footer height
  };

  const headingStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#343a40',
    fontSize: '2.5em'
  };

  const productGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    justifyContent: 'center'
  };

  const productCardStyle: React.CSSProperties = {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer'
  };

  const productCardHoverStyle: React.CSSProperties = {
    transform: 'translateY(-5px)'
  };

  const productImageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '180px',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
    objectFit: 'cover',
    aspectRatio: '1 / 1' // Ensure images maintain aspect ratio
  };

  const productNameStyle: React.CSSProperties = {
    fontSize: '1.6em',
    margin: '10px 0',
    color: '#007bff'
  };

  const productDescriptionStyle: React.CSSProperties = {
    fontSize: '0.95em',
    color: '#6c757d',
    flexGrow: 1, // Allows description to take available space
    marginBottom: '15px'
  };

  const productPriceStyle: React.CSSProperties = {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 'auto', // Pushes price to the bottom
    marginBottom: '15px'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease-in-out',
    marginTop: '10px'
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: '#0056b3'
  };

  // Example of a simple "Add to Cart" handler
  const handleAddToCart = (productName: string) => {
    alert(`"${productName}" added to cart! (This is a placeholder action)`);
    // In a real app, this would dispatch an action to a global state management system (e.g., Redux, Context API)
  };

  // Error handling for empty product list
  if (productsToDisplay.length === 0) {
    return (
      <div style={pageContainerStyle}>
        <h1 style={headingStyle}>Our Products</h1>
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '1.2em' }}>
          No products available at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div style={pageContainerStyle}>
      <h1 style={headingStyle}>Our Products</h1>

      <div style={productGridStyle}>
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            style={productCardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = productCardHoverStyle.transform || '')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={productImageStyle}
              />
            )}
            <h2 style={productNameStyle}>{product.name}</h2>
            <p style={productDescriptionStyle}>{product.description}</p>
            <p style={productPriceStyle}>
              ${product.price.toFixed(2)}
            </p>
            <button
              style={buttonStyle}
              onClick={() => handleAddToCart(product.name)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor || '')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor || '')}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;