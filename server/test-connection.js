// Simple test to verify database connection
require('dotenv').config();
const { Client } = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;

console.log('\n====== DATABASE CONNECTION TEST ======\n');
console.log('Connection Details:');
console.log(`  Host: ${process.env.DB_HOST}`);
console.log(`  Port: ${process.env.DB_PORT}`);
console.log(`  User: ${process.env.DB_USER}`);
console.log(`  Database: ${process.env.DB_NAME}`);
console.log(`  Password: ${process.env.DB_PASSWORD}`);
console.log(`  Password Length: ${process.env.DB_PASSWORD.length} characters`);
console.log(`  Password Preview: ${process.env.DB_PASSWORD.substring(0, 5)}...${process.env.DB_PASSWORD.substring(process.env.DB_PASSWORD.length - 5)}`);
console.log('\nAttempting to connect...\n');

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

client.connect((err) => {
  if (err) {
    console.error('❌ CONNECTION FAILED!');
    console.error('Error:', err.message);
    console.error('\nFull Error Details:');
    console.error(err);
    console.error('\n====== TROUBLESHOOTING TIPS ======');
    console.error('1. Verify password in Aiven dashboard - click to reveal');
    console.error('2. Check for hidden spaces in password');
    console.error('3. Make sure avnadmin user is active in Aiven');
    console.error('4. Try regenerating the password in Aiven');
    console.error('5. Check Aiven service is running (not paused)');
    process.exit(1);
  } else {
    console.log('✅ CONNECTION SUCCESSFUL!');
    
    // Try simple query
    client.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('❌ QUERY FAILED:', err.message);
      } else {
        console.log('✅ QUERY SUCCESSFUL!');
        console.log('Current database time:', res.rows[0].now);
      }
      client.end();
      process.exit(err ? 1 : 0);
    });
  }
});
