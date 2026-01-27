import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Mail, User, Calendar, KeyRound } from 'lucide-react';

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

  const handleChangePassword = () => {
    console.log('Changing password...');
    alert('Navigating to password change form.');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    alert('User logged out successfully.');
    // In a real app, this would dispatch a logout action and redirect
  };

  const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center py-3">
      <div className="w-8 text-gray-500">{icon}</div>
      <div className="flex-1">
        <span className="font-medium text-gray-700">{label}:</span>
      </div>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="profile-page p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="text-lg text-gray-600 mt-1">Manage your personal details and account settings.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Profile Details Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <DetailItem 
                  icon={<User className="w-4 h-4" />} 
                  label="Username" 
                  value={userProfile.username} 
                />
                <Separator />
                <DetailItem 
                  icon={<User className="w-4 h-4" />} 
                  label="Full Name" 
                  value={`${userProfile.firstName} ${userProfile.lastName}`} 
                />
                <Separator />
                <DetailItem 
                  icon={<Mail className="w-4 h-4" />} 
                  label="Email Address" 
                  value={userProfile.email} 
                />
                <Separator />
                <DetailItem 
                  icon={<Calendar className="w-4 h-4" />} 
                  label="Member Since" 
                  value={new Date(userProfile.memberSince).toLocaleDateString()} 
                />
              </div>
              
              <div className="mt-6">
                <Button onClick={handleEditProfile}>
                  Edit Profile Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline"
                  onClick={handleChangePassword}
                  className="justify-start"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={handleLogout}
                  className="justify-start"
                >
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;