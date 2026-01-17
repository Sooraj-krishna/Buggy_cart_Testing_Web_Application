import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">User Profile</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="flex-shrink-0">
            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-blue-200"
              src="https://via.placeholder.com/150/0000FF/FFFFFF?text=User" // Placeholder image
              alt="Profile Avatar"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-sm text-gray-500 mt-1">Member since: January 1, 2023</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
            <div className="space-y-3">
              <p className="text-gray-700"><strong>Full Name:</strong> John Doe</p>
              <p className="text-gray-700"><strong>Username:</strong> johndoe123</p>
              <p className="text-gray-700"><strong>Location:</strong> New York, USA</p>
              <p className="text-gray-700"><strong>Bio:</strong> Passionate about web development and open source projects.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Edit Profile
              </button>
              <button className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Change Password
              </button>
              <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Activity</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Updated profile picture (2 days ago)</li>
            <li>Posted a new comment on "React Best Practices" (1 week ago)</li>
            <li>Liked 3 items in the "Tech Gadgets" category (2 weeks ago)</li>
            <li>Completed "TypeScript Fundamentals" course (1 month ago)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;