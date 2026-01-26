import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock user data structure for demonstration purposes
const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  initials: "JD",
  avatarUrl: "https://github.com/shadcn.png", // Placeholder image
  bio: "Software Developer focused on React, TypeScript, and modern web architectures.",
};

/**
 * Implements the dedicated User Profile Page using shadcn/ui components.
 */
function ProfilePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">User Profile Settings</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Profile Summary Card (Sidebar) */}
        <Card className="lg:col-span-1 h-fit shadow-lg">
          <CardHeader className="flex flex-col items-center text-center pt-8">
            <Avatar className="h-28 w-28 mb-4 border-4 border-primary/20">
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{mockUser.initials}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Bio</h3>
              <p className="text-sm text-muted-foreground italic">{mockUser.bio}</p>
            </div>
            <Separator className="my-4" />
            <Button variant="outline" className="w-full">Change Avatar</Button>
          </CardContent>
        </Card>

        {/* Profile Details/Settings Card (Main Content) */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Edit Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={mockUser.name} placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} disabled className="bg-muted/50" />
                  <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Headline</Label>
                <Input id="bio" defaultValue={mockUser.bio} placeholder="Tell us about yourself" />
              </div>
            </div>

            <Separator />

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;