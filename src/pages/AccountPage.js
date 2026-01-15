import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: 'john.doe',
    email: 'john.doe@example.com',
    membershipType: 'Premium',
    joinDate: '2023-01-15',
  });

  const [editableUserData, setEditableUserData] = useState({
    username: userData.username,
    email: userData.email,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    setEditableUserData({
      username: userData.username,
      email: userData.email,
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.1;
          if (success) {
            resolve({
              status: 200,
              data: {
                username: editableUserData.username,
                email: editableUserData.email,
              },
            });
          } else {
            reject({ status: 500, message: 'Failed to update profile. Please try again.' });
          }
        }, 1500);
      });

      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          ...response.data,
        }));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile. Please check your connection.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.1;
          if (success) {
            resolve({ status: 200 });
          } else {
            reject({ status: 500, message: 'Logout failed. Please try again.' });
          }
        }, 1000);
      });

      localStorage.removeItem('authToken');
      sessionStorage.removeItem('userSession');

      setMessage({ type: 'success', text: 'Logged out successfully!' });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to log out. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Account</h1>

      {message.text && (
        <div style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.subHeading}>Profile Information</h2>
        <form onSubmit={handleSave}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username:</label>
            {isEditing ? (
              <input
                type="text"
                id="username"
                name="username"
                value={editableUserData.username}
                onChange={handleInputChange}
                style={styles.input}
                disabled={isLoading}
              />
            ) : (
              <p style={styles.displayValue}>{userData.username}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={editableUserData.email}
                onChange={handleInputChange}
                style={styles.input}
                disabled={isLoading}
              />
            ) : (
              <p style={styles.displayValue}>{userData.email}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Membership Type:</label>
            <p style={styles.displayValue}>{userData.membershipType}</p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Member Since:</label>
            <p style={styles.displayValue}>{userData.joinDate}</p>
          </div>

          <div style={styles.buttonGroup}>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  style={{ ...styles.button, ...styles.primaryButton }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditableUserData({
                      username: userData.username,
                      email: userData.email,
                    });
                    setMessage({ type: '', text: '' });
                  }}
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                style={{ ...styles.button, ...styles.primaryButton }}
                disabled={isLoading}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subHeading}>Account Actions</h2>
        <button
          onClick={handleLogout}
          style={{ ...styles.button, ...styles.dangerButton }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  subHeading: {
    color: '#555',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  displayValue: {
    padding: '10px 0',
    color: '#333',
    fontSize: '16px',
    margin: '0',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default AccountPage;