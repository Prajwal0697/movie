// Test using service URI format
require('dotenv').config();
const { Client } = require('pg');

// Using the full service URI from Aiven
const serviceUri = `postgresql://avnadmin:${encodeURIComponent(process.env.DB_PASSWORD)}@pg-366b42b8-prajwal.f.aivencloud.com:25562/defaultdb?sslmode=require`;

console.log('\n====== TESTING WITH SERVICE URI FORMAT ======\n');
console.log('Connection String (with encoded password):\n');

const client = new Client({
  connectionString: serviceUri
});

client.connect((err) => {
  if (err) {
    console.error('❌ CONNECTION FAILED!');
    console.error('Error:', err.message);
    console.error('\nPossible Issues:');
    console.error('1. Password may have special characters that need URL encoding');
    console.error('2. Aiven service might be paused or not running');
    console.error('3. User account might not have connection permissions');
    console.error('4. Try deleting and recreating the avnadmin user in Aiven');
    process.exit(1);
  } else {
    console.log('✅ CONNECTION SUCCESSFUL WITH SERVICE URI!');
    client.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('❌ QUERY FAILED:', err.message);
      } else {
        console.log('✅ QUERY SUCCESSFUL!');
        console.log('Database time:', res.rows[0].now);
      }
      client.end();
      process.exit(err ? 1 : 0);
    });
  }
});
