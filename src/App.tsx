import React from 'react';
import logo from './logo.svg'; // Assuming logo.svg exists in the same directory or can be mocked

function App() {
  const appTitle = "My Awesome Application";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        {appTitle}
      </h1>
      <img
        src={logo}
        className="h-48 w-48 object-contain mb-8"
        alt="Application logo" // Fixed: Changed from `${appTitle} logo` to "Application logo" to avoid redundancy with the h1 content.
      />
      <p className="text-lg text-gray-700">
        Welcome to your new React app!
      </p>
    </div>
  );
}

export default App;