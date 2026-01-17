import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600"><strong>Name:</strong> John Doe</p>
            <p className="text-gray-600"><strong>Email:</strong> john.doe@example.com</p>
            <p className="text-gray-600"><strong>Member Since:</strong> January 1, 2023</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>Location:</strong> New York, USA</p>
            <p className="text-gray-600"><strong>Bio:</strong> Enthusiastic user of this amazing platform!</p>
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Edit Profile
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">Change Password</li>
          <li className="mb-2">Notification Preferences</li>
          <li className="mb-2">Privacy Settings</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          Manage Settings
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">No recent activity to display.</p>
        {/* Placeholder for actual activity list */}
      </div>
    </div>
  );
};

export default ProfilePage;