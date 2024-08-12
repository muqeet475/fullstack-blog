const bcrypt = require('bcryptjs');

// Test Password Hashing and Comparison
const testPassword = 'password123';
const testHashPassword = async () => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log('Hashed Password:', hashedPassword);

    // Compare the password
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log('Password Match:', isMatch); // Should print: true
  } catch (error) {
    console.error('Error during hashing or comparison:', error);
  }
};

testHashPassword();
