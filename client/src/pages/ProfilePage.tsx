import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Assuming an existing hook for authentication/user data
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define a basic type for user profile data (adjust based on actual API response)
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  // Add other relevant fields
}

/**
 * ProfilePage component displays and allows editing of the user's profile information.
 */
function ProfilePage() {
  const { user, isLoading: isAuthLoading, error: authError, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      // Initialize form data with current user data
      setProfileData({
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
      });
    }
  }, [user]);

  if (isAuthLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading Profile...</Typography>
      </Container>
    );
  }

  if (authError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load user data: {authError}
        </Alert>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Go Home</Button>
      </Container>
    );
  }

  if (!user) {
    // Should ideally be handled by route protection, but good for safety
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">You must be logged in to view this page.</Alert>
        <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>Login</Button>
      </Container>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Assuming updateProfile handles the API call and updates the global user state
      await updateProfile(profileData);
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
      setSaveError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to the current user state
    setProfileData({
      id: user.id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username || '',
    });
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        User Profile
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
              {/* Username */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={profileData.username || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>

              {/* Email (usually read-only or requires special verification) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={profileData.email || ''}
                  disabled
                  helperText="Email cannot be changed here."
                />
              </Grid>

              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </Box>

          {saveError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {saveError}
            </Alert>
          )}

          {saveSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Profile updated successfully!
            </Alert>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {isEditing ? (
              <>
                <Button variant="outlined" onClick={handleCancel} disabled={isSaving}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={isSaving}
                  startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Optional: Link to change password or manage security */}
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="text" onClick={() => navigate('/settings/security')}>
          Change Password / Security Settings
        </Button>
      </Box>
    </Container>
  );
}

export default ProfilePage;