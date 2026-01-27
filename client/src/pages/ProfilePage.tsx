import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

// Mock User Data (Replace with actual data fetching logic later)
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const mockUser: UserProfile = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, USA 90210',
};

function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(mockUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    // In a real application, this would involve an API call to update the user profile
    setUser(formData);
    setIsEditing(false);
    // Add toast notification for success here if available
  };

  const handleCancel = () => {
    setFormData(user); // Reset form data to current user data
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">User Profile</h1>
      <Separator className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your name, email, and contact details.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" /> Name
                  </Label>
                  {isEditing ? (
                    <Input id="name" value={formData.name} onChange={handleInputChange} />
                  ) : (
                    <p className="text-lg font-medium">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" /> Email
                  </Label>
                  {isEditing ? (
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                  ) : (
                    <p className="text-lg font-medium">{user.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" /> Phone
                  </Label>
                  {isEditing ? (
                    <Input id="phone" value={formData.phone} onChange={handleInputChange} />
                  ) : (
                    <p className="text-lg font-medium">{user.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="grid gap-2">
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" /> Address
                  </Label>
                  {isEditing ? (
                    <Input id="address" value={formData.address} onChange={handleInputChange} />
                  ) : (
                    <p className="text-lg font-medium">{user.address}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings/Actions Card (Placeholder) */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage security and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Order History
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;