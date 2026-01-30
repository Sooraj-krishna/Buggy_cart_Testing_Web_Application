import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

// Define a type for user profile data
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  address?: string;
  phone?: string;
}

function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate a network request delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock user data
        const mockUser: UserProfile = {
          id: 'user-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          avatarUrl: 'https://github.com/shadcn.png', // Example avatar URL
          address: '123 Main St, Anytown, USA 12345',
          phone: '+1 (555) 123-4567',
        };
        setUser(mockUser);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Helper function to get initials for AvatarFallback
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">User Profile</CardTitle>
          <CardDescription>Manage your personal information and account settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            // Loading state with Skeleton components
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ) : error ? (
            // Error state
            <div className="text-center text-destructive">
              <p>{error}</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : user ? (
            // Display user profile
            <>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}'s avatar`} />
                  <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={user.firstName} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={user.lastName} readOnly />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} readOnly />
                </div>
                {user.address && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={user.address} readOnly />
                  </div>
                )}
                {user.phone && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={user.phone} readOnly />
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">Edit Profile</Button>
                <Button>Change Password</Button>
              </div>
            </>
          ) : (
            // No user data found (e.g., not logged in)
            <div className="text-center text-muted-foreground">
              <p>No user data available. Please log in to view your profile.</p>
              <Button className="mt-4">Login</Button> {/* Placeholder for a login button */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;