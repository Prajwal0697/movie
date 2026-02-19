// Test with proper SSL configuration for Aiven
require('dotenv').config();
const { Client } = require('pg');

console.log('\n====== DATABASE CONNECTION TEST (WITH PROPER SSL) ======\n');

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,  // Important for Aiven self-signed certs
  },
});

console.log('Attempting to connect to:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);
console.log('\nConnecting...\n');

client.connect((err) => {
  if (err) {
    console.error('❌ CONNECTION FAILED!');
    console.error('Error:', err.message);
    console.error('\nFull Error:');
    console.error(err);
    process.exit(1);
  } else {
    console.log('✅ CONNECTION SUCCESSFUL!\n');
    
    client.query('SELECT NOW() as current_time, version()', (err, res) => {
      if (err) {
        console.error('❌ QUERY FAILED:', err.message);
        process.exit(1);
      } else {
        console.log('✅ DATABASE QUERY SUCCESSFUL!\n');
        console.log('Current Time:', res.rows[0].current_time);
        console.log('PostgreSQL Version:', res.rows[0].version.substring(0, 50) + '...');
        console.log('\n🎉 Database is ready for the application!\n');
      }
      client.end();
      process.exit(0);
    });
  }
});
