// View all users in database
require('dotenv').config();
const mysql = require('mysql2/promise');

async function viewAllUsers() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('\n====== ALL USERS IN DATABASE ======\n');
    
    const [users] = await connection.execute('SELECT id, username, email, phone, created_at FROM users ORDER BY created_at DESC');
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
    } else {
      console.log(`✅ Total Users: ${users.length}\n`);
      
      users.forEach((user, index) => {
        console.log(`User #${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Username: ${user.username}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Phone: ${user.phone || 'Not provided'}`);
        console.log(`  Created: ${user.created_at}`);
        console.log('');
      });
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

viewAllUsers();
