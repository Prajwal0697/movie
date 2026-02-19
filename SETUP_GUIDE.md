# Movies App - Complete Authentication Setup Guide

This guide will help you set up and run the Movies application with database-powered authentication using Aiven PostgreSQL.

## Project Structure

```
moives/
├── server/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   │   ├── database.js    # PostgreSQL connection pool
│   │   └── initDB.js      # Database initialization and table creation
│   ├── routes/            # API routes
│   │   └── auth.js        # Authentication endpoints
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── index.js           # Express server entry point
├── src/                   # React frontend
│   ├── services/
│   │   └── authApi.js     # Authentication API service
│   ├── components/
│   │   ├── Login.jsx      # Updated with database login
│   │   ├── Register.jsx   # Updated with database registration
│   │   └── Home.jsx
│   └── ...
└── ...
```

## Database Setup (Aiven PostgreSQL)

Your database credentials are already configured in `server/.env`:

- **Host**: pg-366b42b8-prajwal.f.aivencloud.com
- **Port**: 25562
- **Database**: defaultdb
- **User**: avnadmin
- **Password**: AVNS_5pmqdBt1Nr6SFe3nKp
- **SSL**: Required

### Users Table Schema

The following table is automatically created when the backend starts:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This installs:
- **express**: Web framework
- **pg**: PostgreSQL client
- **bcryptjs**: Password hashing
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **jsonwebtoken**: JWT authentication

### 2. Install Frontend Dependencies (if needed)

From the root directory:
```bash
npm install
```

## Running the Application

### Step 1: Start the Backend Server

```bash
cd server
npm start
```

You should see:
```
Server running on http://localhost:5000
Users table created successfully
Database initialized
```

The backend will:
- Connect to your Aiven PostgreSQL database
- Create the `users` table if it doesn't exist
- Start listening on port 5000

### Step 2: Start the Frontend (in a new terminal)

```bash
npm run dev
```

The React app will start, typically at `http://localhost:5173`

## API Endpoints

### 1. Register a New User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

### 2. Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

### 3. Get User Profile (Protected)
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "created_at": "2024-02-18T10:30:00Z"
  }
}
```

## Authentication Flow

1. **Register**: User creates account
   - Username, email, phone, password sent to server
   - Password is hashed with bcryptjs
   - User stored in database
   - JWT token returned and saved in localStorage

2. **Login**: User logs in
   - Email and password sent to server
   - Password compared with stored hash
   - JWT token returned and saved in localStorage

3. **Protected Routes**: User accesses authenticated pages
   - JWT token sent in Authorization header
   - Token verified on server
   - User profile returned if valid

4. **Logout**: User logs out
   - JWT token removed from localStorage
   - Redirected to login page

## Frontend Integration

### Login Component Features
- Email and password validation
- Error message display
- Loading state during API call
- User type selection (Talent/Recruiter)
- Automatic redirect to Home on success

### Register Component Features
- Username, email, phone, password fields
- Password confirmation validation
- Min 6 character password requirement
- Unique email and username validation
- Error message display
- Loading state during API call

### API Service (`authApi.js`)
The `authService` object provides:
```javascript
authService.login(email, password)           // Login user
authService.register(username, email, phone, password) // Register user
authService.logout()                         // Logout user
authService.isAuthenticated()               // Check if logged in
authService.getCurrentUser()                // Get current user object
authService.getToken()                      // Get JWT token
authService.getProfile()                    // Fetch user profile from server
```

## Environment Variables

### Backend (.env)
```
DB_HOST=pg-366b42b8-prajwal.f.aivencloud.com
DB_PORT=25562
DB_USER=avnadmin
DB_PASSWORD=AVNS_5pmqdBt1Nr6SFe3nKp
DB_NAME=defaultdb
DB_SSL=true
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=development
```

**⚠️ Important**: Change `JWT_SECRET` in production!

## Security Notes

1. **Password Security**: All passwords are hashed with bcryptjs (10 rounds)
2. **JWT Tokens**: Token expires in 24 hours
3. **SSL/TLS**: Database connection uses SSL
4. **Input Validation**: Server validates all inputs
5. **CORS**: Enabled for frontend communication

## Troubleshooting

### Backend Connection Issues
```bash
# Test database connection
curl http://localhost:5000/api/test
```

Should return:
```json
{
  "message": "Database connected",
  "time": { "now": "2024-02-18T10:00:00.000Z" }
}
```

### Port Already in Use
Backend uses port 5000 by default. Change in `.env`:
```
PORT=3001
```

### CORS Errors
Backend has CORS enabled for all origins. If issues persist, update `index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

### Database Connection Failed
1. Check internet connection
2. Verify Aiven database is running
3. Confirm credentials in `.env` are correct
4. Check SSL certificate settings

## Testing the System

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Using Postman
1. Import the endpoints from this guide
2. Set Content-Type to `application/json`
3. Test registration and login
4. Copy token from response
5. Use token in Authorization header for protected routes

## Next Steps

1. ✅ Backend server is ready
2. ✅ Database is connected
3. ✅ Authentication APIs created
4. ✅ React components updated
5. TODO: Deploy to production
6. TODO: Add forgot password functionality
7. TODO: Add email verification
8. TODO: Add social authentication (Google, GitHub, etc.)

## Support

For issues or questions:
1. Check the console output for errors
2. Verify backend is running on port 5000
3. Ensure frontend can reach backend at http://localhost:5000
4. Check Aiven dashboard for database status
