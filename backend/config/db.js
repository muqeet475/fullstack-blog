const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost', // Database host
  database: 'blog', // Database name
  password: 'Abdul@786', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
