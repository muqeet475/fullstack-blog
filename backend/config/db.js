const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres', // PostgreSQL username
  host: process.env.DB_HOST || 'localhost', // Database host
  database: process.env.DB_NAME || 'blog', // Database name
  password: process.env.DB_PASSWORD || 'Abdul@786', // PostgreSQL password
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
