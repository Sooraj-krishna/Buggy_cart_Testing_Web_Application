import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar component for application navigation.
 * Provides links to various pages including Home, Products, About, and Contact.
 * Uses react-router-dom's NavLink for active link styling.
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand/Logo link to the homepage */}
        <NavLink className="navbar-brand" to="/">
          MyECommerceApp
        </NavLink>

        {/* Toggler button for responsive navigation on small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto pushes links to the right */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active" // Class applied when the link is active
                exact // Ensures this link is active only when the path is exactly "/"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/products" // New link for the Products page
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;