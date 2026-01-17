import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navbar component for application navigation.
 * Includes links to various sections and a profile icon that navigates to the user profile page.
 */
function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#282c34', // Dark background for the navbar
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }}>
      {/* Application Brand/Logo */}
      <div className="navbar-brand">
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.8rem',
          fontWeight: 'bold',
        }}>
          My App
        </Link>
      </div>

      {/* Navigation Links */}
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        gap: '2rem', // Space between navigation items
      }}>
        <li>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease',
          }} onMouseOver={(e) => e.currentTarget.style.color = '#61dafb'} onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease',
          }} onMouseOver={(e) => e.currentTarget.style.color = '#61dafb'} onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
            Dashboard
          </Link>
        </li>
        <li>
          {/* Profile Icon/Link */}
          <Link to="/profile" style={{
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease',
          }} onMouseOver={(e) => e.currentTarget.style.color = '#61dafb'} onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
            {/* Placeholder for a profile icon. In a real app, this would be an SVG or an icon font. */}
            <span style={{ fontSize: '1.5rem' }} role="img" aria-label="profile icon">👤</span>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;