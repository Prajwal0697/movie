const pool = require('./database');

const createUsersTable = async () => {
  try {
    const connection = await pool.getConnection();
    
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(query);
    connection.release();
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error.message);
  }
};

module.exports = { createUsersTable };
