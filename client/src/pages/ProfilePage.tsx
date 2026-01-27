import React from 'react';

/**
 * ProfilePage component displays the user's profile information and settings.
 * This page is accessible via the /profile route.
 */
function ProfilePage() {
  // In a real application, this data would be fetched from an API or context
  const userProfile = {
    username: 'current_user_123',
    email: 'user@example.com',
    firstName: 'Alex',
    lastName: 'Johnson',
    memberSince: '2023-01-15',
  };

  const handleEditProfile = () => {
    // Placeholder for navigation or opening a modal to edit profile
    console.log('Editing profile...');
    alert('Feature to edit profile is under development.');
  };

  return (
    <div className="profile-page p-6 max-w-4xl mx-auto">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <p className="text-gray-600">Manage your personal details and account settings.</p>
      </header>

      <section className="profile-details bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-medium mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700 w-1/3">Username:</span>
            <span className="text-gray-900 w-2/3 text-right">{userProfile.username}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700 w-1/3">Full Name:</span>
            <span className="text-gray-900 w-2/3 text-right">{userProfile.firstName} {userProfile.lastName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700 w-1/3">Email Address:</span>
            <span className="text-gray-900 w-2/3 text-right">{userProfile.email}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="font-medium text-gray-700 w-1/3">Member Since:</span>
            <span className="text-gray-900 w-2/3 text-right">{new Date(userProfile.memberSince).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      <section className="profile-actions">
        <button 
          onClick={handleEditProfile}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Edit Profile Details
        </button>
        
        {/* Additional actions like password change, logout, etc. */}
        <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-medium mb-3">Security</h2>
            <button 
                className="text-red-600 hover:text-red-800 underline"
                onClick={() => alert('Navigating to password change form.')}
            >
                Change Password
            </button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;