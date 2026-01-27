import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Mail, User, Lock, ShoppingBag } from 'lucide-react';

/**
 * ProfilePage component implements the user profile dashboard.
 * It includes sections for Account Details, Password Management, and Order History.
 */
function ProfilePage() {
  // Mock user data (replace with actual state/API calls)
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA',
  };

  // Mock order history data
  const orders = [
    { id: 'ORD-001', date: '2023-10-01', total: 49.99, status: 'Delivered' },
    { id: 'ORD-002', date: '2023-11-15', total: 129.50, status: 'Shipped' },
    { id: 'ORD-003', date: '2023-12-05', total: 25.00, status: 'Processing' },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update profile details
    console.log('Profile updated');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to change password
    console.log('Password changed');
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        User Profile
      </h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" /> Account
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="w-4 h-4 mr-2" /> Password
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="w-4 h-4 mr-2" /> Orders
          </TabsTrigger>
        </TabsList>

        {/* Account Details Tab */}
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Manage your personal information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" defaultValue={user.address} />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Management Tab */}
        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password after logging in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Review your past purchases and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">Order ID: {order.id}</p>
                          <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                          <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No orders found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;