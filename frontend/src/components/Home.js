import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Blog
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/create-post" sx={{ ml: 2 }}>
          Create a Post
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
