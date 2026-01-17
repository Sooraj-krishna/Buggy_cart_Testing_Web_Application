import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
            My App
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300 transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/settings" className="hover:text-gray-300 transition-colors duration-200">
            Settings
          </Link>

          {/* Profile Icon/Link */}
          <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200">
            {/* Placeholder for a user icon. In a real app, you might use an icon library like react-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;