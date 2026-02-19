const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { createUsersTable } = require('./config/initDB');
const pool = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result[0] });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Initialize database on cold start
let isInitialized = false;
const initialize = async () => {
  if (!isInitialized) {
    try {
      await createUsersTable();
      console.log('Database initialized');
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await initialize();
  });
}

// For Vercel serverless
initialize();
module.exports = app;
