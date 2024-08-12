import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    console.log('Stored token:', token); // Verify the token is present

    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Set the user data
      } catch (error) {
        // Log the error details to the console
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Failed to fetch profile - Response error:', error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Failed to fetch profile - Request error:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Failed to fetch profile - Error message:', error.message);
        }
        alert('Failed to fetch profile');
      }
    } else {
      console.error('No token found in localStorage');
      alert('No token found');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">
          Username: {user.username}
        </Typography>
        <Typography variant="body1">
          Email: {user.email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
