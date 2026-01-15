import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-300">My App</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          </li>
          {/* New navigation link for the User Account page */}
          <li>
            <Link to="/account" className="hover:text-gray-300">User Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;