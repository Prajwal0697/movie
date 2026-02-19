const mysql = require('mysql2/promise');
require('dotenv').config();

// Debug: Log connection details
console.log('Database Connection Config:');
console.log(`  Host: ${process.env.DB_HOST}`);
console.log(`  Port: ${process.env.DB_PORT}`);
console.log(`  User: ${process.env.DB_USER}`);
console.log(`  Database: ${process.env.DB_NAME}`);
console.log(`  SSL: ${process.env.DB_SSL}`);
console.log(`  Password length: ${process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 'NOT SET'}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false  // For self-signed certificates (Aiven)
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
