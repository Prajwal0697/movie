# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Terminal 1: Start Backend Server

```bash
cd server
npm install
npm start
```

**Expected Output:**
```
Server running on http://localhost:5000
Users table created successfully
Database initialized
```

### Terminal 2: Start Frontend Application

```bash
npm run dev
```

**Expected Output:**
```
Local: http://localhost:5173
Press o to open browser
```

## 📱 Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create a new account
   - Username: `testuser`
   - Email: `test@example.com`
   - Phone: `+1234567890` (optional)
   - Password: `Test123456`

3. On login success, you'll be redirected to the Home page
4. User data is stored in Aiven PostgreSQL database

## ✨ Key Features

✅ Secure password hashing (bcryptjs)
✅ JWT authentication tokens
✅ PostgreSQL database on Aiven
✅ Real-time validation
✅ Error handling & messages
✅ Auto-login on valid token
✅ Protected routes

## 🗄️ Database

All user credentials (username, email, phone, password hash) are stored securely in your Aiven database:
- Database: `defaultdb`
- Table: `users`
- Auto-created on first run

## 🔐 Security

- Passwords: Hashed with bcryptjs (10 rounds)
- Tokens: JWT with 24-hour expiration
- Connection: SSL/TLS to Aiven
- Validation: Server-side input validation

## 📚 Additional Info

See `SETUP_GUIDE.md` for:
- Detailed API documentation
- Troubleshooting guide
- Environment configuration
- Database schema details
