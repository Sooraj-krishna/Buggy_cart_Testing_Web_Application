import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/**
 * A simple Home Page component.
 * This serves as a landing page for the application.
 */
const HomePage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Application!</h1>
      <p>This is the main landing page. Explore our features.</p>
      <p>Use the navigation bar above to go to your account page.</p>
    </div>
  );
};

/**
 * The dedicated User Account Page component.
 * In a real-world application, this component would typically:
 * - Fetch user-specific data from an API.
 * - Display profile information (e.g., name, email, membership details).
 * - Offer options to update profile, change password, manage subscriptions, etc.
 * - Implement robust error handling for API calls and form submissions.
 */
const AccountPage = () => {
  // Example state for user profile data.
  // In a production app, this would be fetched from a backend API.
  const [userProfile, setUserProfile] = React.useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'January 15, 2022',
    subscriptionStatus: 'Premium',
    lastLogin: new Date().toLocaleString(),
  });

  // Placeholder for data fetching logic.
  // In a real application, you would use useEffect to fetch data on component mount.
  /*
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Simulate an API call
        // const response = await fetch('/api/user/profile', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //   }
        // });
        // if (!response.ok) {
        //   // Handle HTTP errors (e.g., 401 Unauthorized, 404 Not Found)
        //   throw new Error(`Failed to fetch profile: ${response.statusText}`);
        // }
        // const data = await response.json();
        // setUserProfile(data);
        console.log("Simulating user profile data fetch...");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Implement user-facing error message (e.g., using a toast notification)
        // setError('Could not load profile data. Please try again later.');
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on mount
  */

  // Basic error handling for display purposes if data were dynamic
  // const [error, setError] = React.useState(null);
  // if (error) {
  //   return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div>;
  // }

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '40px auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>My Account</h2>

      <div style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h3 style={{ color: '#555', marginBottom: '15px' }}>Profile Information</h3>
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Member Since:</strong> {userProfile.memberSince}</p>
        <p><strong>Subscription Status:</strong> {userProfile.subscriptionStatus}</p>
        <p><strong>Last Login:</strong> {userProfile.lastLogin}</p>
      </div>

      <div style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h3 style={{ color: '#555', marginBottom: '15px' }}>Account Settings</h3>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            fontSize: '1em'
          }}
          onClick={() => alert('Edit Profile functionality coming soon!')}
        >
          Edit Profile
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            fontSize: '1em'
          }}
          onClick={() => alert('Change Password functionality coming soon!')}
        >
          Change Password
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
          onClick={() => { if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) alert('Account deletion initiated.'); }}
        >
          Delete Account
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <p style={{ color: '#777' }}>For support, please contact us at support@example.com</p>
      </div>
    </div>
  );
};

/**
 * The application's main navigation bar component.
 * It includes a link to the new Account Page.
 */
const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#343a40', // Dark background
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.8em', fontWeight: 'bold' }}>
          My App
        </Link>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginLeft: '25px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => e.target.style.color = '#007bff'}
            onMouseOut={(e) => e.target.style.color = 'white'}>
            Home
          </Link>
        </li>
        <li style={{ marginLeft: '25px' }}>
          <Link to="/account" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1em', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => e.target.style.color = '#007bff'}
            onMouseOut={(e) => e.target.style.color = 'white'}>
            My Account
          </Link>
        </li>
        {/* Add more navigation links here as the application grows */}
      </ul>
    </nav>
  );
};

/**
 * The main App component, responsible for setting up the application's
 * routing and overall layout.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* Catch-all route for 404 Not Found pages */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '80px', color: '#555' }}>
                <h2 style={{ fontSize: '3em', marginBottom: '20px' }}>404 - Page Not Found</h2>
                <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                  The page you are looking for does not exist or has been moved.
                </p>
                <Link to="/" style={{
                  padding: '12px 25px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '1.1em',
                  transition: 'background-color 0.3s ease'
                }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}>
                  Go to Home Page
                </Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;