import React from 'react';

/**
 * ProfilePage component displays the user's profile information.
 * This is a placeholder for future profile details, settings, etc.
 */
function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-4">Welcome to your profile page!</p>
        <p className="text-gray-700">
          This is where you can view and manage your personal information,
          account settings, and other relevant details.
        </p>
        <p className="mt-4 text-gray-600">
          (Content for user details, settings, etc., will be added here.)
        </p>
      </div>

      {/* Example sections (can be expanded later) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <p className="text-gray-700">Name: John Doe</p>
          <p className="text-gray-700">Email: john.doe@example.com</p>
          <p className="text-gray-700">Location: New York, USA</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Info</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-gray-700">Password: *********</p>
          <p className="text-gray-700">Two-Factor Auth: Enabled</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Manage Settings</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;