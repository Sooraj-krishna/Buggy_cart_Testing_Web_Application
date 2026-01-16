import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Define a type for our product data for better type safety
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

/**
 * Products Page Component
 * Displays a list of sample products.
 */
const ProductsPage: React.FC = () => {
  // Sample product data (in a real app, this would come from an API)
  const sampleProducts: Product[] = [
    {
      id: 'prod101',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-fidelity sound with comfortable earcups and long battery life.',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones'
    },
    {
      id: 'prod102',
      name: 'Smartwatch Series 7',
      description: 'Track your fitness, receive notifications, and stay connected on the go.',
      price: 249.00,
      imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch'
    },
    {
      id: 'prod103',
      name: 'Portable SSD 1TB',
      description: 'Ultra-fast external storage for all your files and backups.',
      price: 129.99,
      imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=SSD'
    },
    {
      id: 'prod104',
      name: 'Ergonomic Office Chair',
      description: 'Designed for maximum comfort and support during long working hours.',
      price: 349.50,
      imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Chair'
    },
    {
      id: 'prod105',
      name: '4K UHD Smart TV 55"',
      description: 'Immersive viewing experience with stunning clarity and smart features.',
      price: 699.00,
      imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=TV'
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Our Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        justifyContent: 'center'
      }}>
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
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
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
            />
            <h2 style={{ fontSize: '1.4em', margin: '10px 0', color: '#007bff' }}>{product.name}</h2>
            <p style={{ fontSize: '0.9em', color: '#555', flexGrow: 1 }}>{product.description}</p>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333', marginTop: '15px' }}>
              ${product.price.toFixed(2)}
            </p>
            <button
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '15px',
                fontSize: '1em',
                transition: 'background-color 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
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
 * Home Page Component
 * A simple landing page.
 */
const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 60px)' }}>
      <h1 style={{ fontSize: '3em', color: '#343a40', marginBottom: '20px' }}>Welcome to Our Awesome Store!</h1>
      <p style={{ fontSize: '1.2em', color: '#6c757d', marginBottom: '30px' }}>
        Discover a wide range of high-quality products tailored just for you.
      </p>
      <Link to="/products" style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Explore Products
      </Link>
    </div>
  );
};

/**
 * Navbar Component
 * Provides navigation links for the application.
 */
const Navbar: React.FC = () => {
  return (
    <nav style={{
      backgroundColor: '#343a40',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>MyStore</Link>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginLeft: '25px' }}>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.2s ease-in-out' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Home
          </Link>
        </li>
        <li style={{ marginLeft: '25px' }}>
          <Link to="/products" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.2s ease-in-out' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Products
          </Link>
        </li>
        {/* Add more navigation links here as needed */}
      </ul>
    </nav>
  );
};

/**
 * App Component
 * The main component that sets up routing and renders the Navbar and different page components.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} /> {/* New route for the Products page */}
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default App;