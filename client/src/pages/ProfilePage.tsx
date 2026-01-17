import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-4">Welcome to your profile page!</p>
        <p className="text-gray-700">
          This is where you can view and manage your personal information, settings, and preferences.
        </p>
        {/* Placeholder for profile details */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">Name:</label>
              <p className="text-gray-800">John Doe</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">Email:</label>
              <p className="text-gray-800">john.doe@example.com</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">Member Since:</label>
              <p className="text-gray-800">January 1, 2023</p>
            </div>
            {/* Add more profile fields as needed */}
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;