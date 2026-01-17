import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '1.1rem', fontWeight: '500' }}>Home</Link>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', fontSize: '1.1rem', fontWeight: '500' }}>Dashboard</Link>
        {/* Add more navigation links as needed */}
      </div>
      <div>
        {/* Profile Icon/Link */}
        <Link to="/profile" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '500' }}>
          {/* Using a simple emoji as a placeholder for an icon. In a real app, you might use an icon library like Font Awesome or Material Icons. */}
          <span role="img" aria-label="profile icon" style={{ fontSize: '1.5rem' }}>👤</span>
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;