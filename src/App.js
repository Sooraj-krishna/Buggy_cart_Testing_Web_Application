import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- Components ---

/**
 * HomePage Component
 * Displays a welcome message for the application.
 */
const HomePage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Our Application!</h1>
      <p>This is the home page. Navigate to the Products page to see our offerings.</p>
    </div>
  );
};

/**
 * ProductsPage Component
 * Displays a list of sample products with their details.
 * Includes basic error handling for an empty product list.
 */
const ProductsPage = () => {
  // Sample product data
  const products = [
    { id: 1, name: 'Laptop Pro', price: 1200.00, description: 'High-performance laptop for professionals, featuring a powerful processor and ample RAM.' },
    { id: 2, name: 'Wireless Mouse', price: 25.50, description: 'Ergonomic wireless mouse with long battery life and precise tracking.' },
    { id: 3, name: 'Mechanical Keyboard', price: 99.99, description: 'Durable mechanical keyboard with customizable RGB lighting and tactile switches.' },
    { id: 4, name: 'USB-C Hub', price: 45.00, description: 'Multi-port USB-C hub for all your connectivity needs, including HDMI, USB 3.0, and SD card slots.' },
    { id: 5, name: 'External SSD 1TB', price: 150.00, description: 'Fast and portable 1TB external solid-state drive for quick data transfers and backups.' },
    { id: 6, name: 'Monitor 27-inch 4K', price: 350.00, description: 'Stunning 27-inch 4K monitor for crisp visuals and immersive viewing experience.' },
  ];

  // Basic error handling: If products array is empty or null/undefined
  if (!products || products.length === 0) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'red', fontFamily: 'Arial, sans-serif' }}>
        <h2>Products</h2>
        <p>Error: No products available at the moment. Please try again later.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Our Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.3em' }}>{product.name}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#007bff', fontWeight: 'bold', fontSize: '1.1em' }}>${product.price.toFixed(2)}</p>
            <p style={{ fontSize: '0.95em', color: '#555', flexGrow: 1 }}>{product.description}</p>
            <button
              onClick={() => alert(`Added "${product.name}" to cart!`)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '15px',
                fontSize: '1em',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Navbar Component
 * Provides navigation links for the application.
 */
const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#343a40',
      padding: '15px 30px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>My App</Link>
      </div>
      <div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginLeft: '25px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#007bff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
              Home
            </Link>
          </li>
          <li style={{ marginLeft: '25px' }}>
            <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#007bff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

/**
 * NotFoundPage Component
 * Displays a 404 error message for routes that do not exist.
 */
const NotFoundPage = () => {
  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '3em', color: '#dc3545' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2em', color: '#555', marginBottom: '30px' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '1.1em',
        transition: 'background-color 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
        Go to Home
      </Link>
    </div>
  );
};

/**
 * App Component
 * The main application component that sets up routing and renders the Navbar and page components.
 */
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Catch-all route for any undefined paths, displaying the 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;