const db = require('../config/db'); // Ensure the path is correct
const bcrypt = require('bcryptjs');

const User = {
  // Method to create a new user with hashed password
  async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password here
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email
    `;
    const values = [username, email, hashedPassword];

    try {
      const res = await db.query(query, values);
      console.log('User created with ID:', res.rows[0].id); // Log created user ID
      return res.rows[0];
    } catch (error) {
      console.error('Error creating user:', error.message); // Log error
      throw new Error('Error creating user: ' + error.message);
    }
  },

  // Method to find a user by email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const res = await db.query(query, [email]);
      if (res.rows.length > 0) {
        console.log('User found by email:', res.rows[0]); // Log user details
        return res.rows[0];
      } else {
        console.log('No user found with email:', email); // Log when no user is found
        return null;
      }
    } catch (error) {
      console.error('Error finding user by email:', error.message); // Log error
      throw new Error('Error finding user by email: ' + error.message);
    }
  },

  // Method to find a user by ID
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    try {
      const res = await db.query(query, [id]);
      if (res.rows.length > 0) {
        console.log('User found by ID:', res.rows[0]); // Log user details
        return res.rows[0];
      } else {
        console.log('No user found with ID:', id); // Log when no user is found
        return null;
      }
    } catch (error) {
      console.error('Error finding user by ID:', error.message); // Log error
      throw new Error('Error finding user by ID: ' + error.message);
    }
  },

  // Method to validate user password
  async validatePassword(email, password) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        console.log('User not found for email during validation:', email); // Log if user not found
        return false; // User not found
      }
      console.log('User password from DB:', user.password); // Log the password from the database
      const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
      console.log('Password comparison result:', isMatch); // Log password comparison result
      return isMatch;
    } catch (error) {
      console.error('Error validating password:', error.message); // Log error
      throw new Error('Error validating password: ' + error.message);
    }
  }
};

module.exports = User;
