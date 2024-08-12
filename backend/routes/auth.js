const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Import the database connection

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists by email
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if user already exists by username
    const queryUsername = 'SELECT * FROM users WHERE username = $1';
    const resUsername = await db.query(queryUsername, [username]);
    if (resUsername.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this username' });
    }

    // Create a new user with hashed password
    const user = await User.create({ username, email, password });

    // Respond with the created user (without password)
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Registration error:', error.message); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email); // Log email

    // Validate user credentials
    const isValid = await User.validatePassword(email, password);
    if (!isValid) {
      console.log('Invalid credentials for email:', email); // Log invalid credentials
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Find user by email to get user details
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated:', token); // Log the generated token

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Profile Route
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Ensure User.findById is defined
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Profile fetch error:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

module.exports = router;
