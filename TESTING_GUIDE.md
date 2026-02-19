# Testing Your Authentication System

## 🧪 Using cURL Commands

### Test 1: Check Database Connection

```bash
curl http://localhost:5000/api/test
```

**Expected Response:**
```json
{
  "message": "Database connected",
  "time": {
    "now": "2024-02-18T10:30:45.123Z"
  }
}
```

---

## 👤 User Registration Tests

### Test 2: Register New User - Success

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "password": "SecurePassword123"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567"
  }
}
```

### Test 3: Register with Duplicate Email

```bash
# Try to register with same email as above
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "another_user",
    "email": "john@example.com",
    "phone": "+1 (555) 987-6543",
    "password": "AnotherPass123"
  }'
```

**Expected Response:**
```json
{
  "error": "User already exists"
}
```

### Test 4: Register Missing Required Field

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com"
    // Missing password
  }'
```

**Expected Response:**
```json
{
  "error": "Username, email, and password are required"
}
```

---

## 🔓 Login Tests

### Test 5: Login - Success

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567"
  }
}
```

### Test 6: Login with Wrong Password

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "WrongPassword123"
  }'
```

**Expected Response:**
```json
{
  "error": "Invalid email or password"
}
```

**Status Code:** 401 Unauthorized

### Test 7: Login with Non-existent Email

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "SomePassword123"
  }'
```

**Expected Response:**
```json
{
  "error": "Invalid email or password"
}
```

**Status Code:** 401 Unauthorized

---

## 🔐 Protected Routes (Get Profile)

### Test 8: Get Profile - With Valid Token

First, get a token from login (Test 5), then use it:

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response:**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "created_at": "2024-02-18T10:30:45.123Z"
  }
}
```

### Test 9: Get Profile - Invalid Token

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response:**
```json
{
  "error": "Invalid or expired token"
}
```

**Status Code:** 403 Forbidden

### Test 10: Get Profile - Missing Token

```bash
curl -X GET http://localhost:5000/api/auth/profile
```

**Expected Response:**
```json
{
  "error": "Access token required"
}
```

**Status Code:** 401 Unauthorized

---

## 🌐 Using Postman

### Import Collection

1. Open Postman
2. Create new Collection: "Movies Auth API"
3. Create the following requests:

#### Request 1: Register User
```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "username": "postman_user",
  "email": "postman@example.com",
  "phone": "+1 (555) 456-7890",
  "password": "PostmanTest123"
}
```

#### Request 2: Login User
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "email": "postman@example.com",
  "password": "PostmanTest123"
}
```

#### Request 3: Get Profile
```
Method: GET
URL: http://localhost:5000/api/auth/profile
Headers:
  Authorization: Bearer {{token}}
```

**Steps:**
1. Run "Login User" request
2. Copy the token from response
3. Click Variables tab (top right)
4. Create variable: `token` = (paste token)
5. Run "Get Profile" request
6. Should see user data ✅

---

## 💻 Using JavaScript/Fetch

### Example: Complete Registration and Login Flow

```javascript
// 1. Register
async function registerUser() {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'jsdemo_user',
      email: 'jsdemo@example.com',
      phone: '+1 (555) 111-2222',
      password: 'JavaScriptDemo123'
    })
  });

  const data = await response.json();
  console.log('Register Response:', data);
  
  if (response.ok) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } else {
    throw new Error(data.error);
  }
}

// 2. Login
async function loginUser() {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'jsdemo@example.com',
      password: 'JavaScriptDemo123'
    })
  });

  const data = await response.json();
  console.log('Login Response:', data);
  
  if (response.ok) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } else {
    throw new Error(data.error);
  }
}

// 3. Get Profile
async function getProfile() {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch('http://localhost:5000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log('Profile Response:', data);
  return data;
}

// 4. Run all
async function runTests() {
  try {
    console.log('=== REGISTER ===');
    await registerUser();
    
    console.log('\n=== LOGIN ===');
    await loginUser();
    
    console.log('\n=== GET PROFILE ===');
    await getProfile();
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Execute in browser console
runTests();
```

---

## 📊 Test Scenarios

### Scenario 1: Complete User Journey
```
1. Register new user
   ↓
2. User data saved to database
   ↓
3. JWT token returned
   ↓
4. Token saved in localStorage
   ↓
5. Login with same credentials
   ↓
6. Token still valid (or new one issued)
   ↓
7. Fetch user profile successfully
   ↓
8. ✅ All working!
```

### Scenario 2: Security Test
```
1. Try to login with wrong password
   ↓
2. Get error "Invalid email or password"
   ↓
3. Try with expired/invalid token
   ↓
4. Get error "Invalid or expired token"
   ↓
5. Try without token on protected route
   ↓
6. Get error "Access token required"
   ↓
7. ✅ Security working!
```

### Scenario 3: Data Integrity
```
1. Register user with unique email
   ↓
2. Try to register with same email
   ↓
3. Get error "User already exists"
   ↓
4. Verify database has only one user
   ↓
5. ✅ Constraints working!
```

---

## 🔍 Database Query Examples

If you want to check the database directly (using a PostgreSQL client):

### View All Users
```sql
SELECT id, username, email, phone, created_at 
FROM users;
```

### Find Specific User
```sql
SELECT * FROM users 
WHERE email = 'john@example.com';
```

### Check Password Hash (hashed, can't read):
```sql
SELECT email, password 
FROM users 
WHERE id = 1;
-- Output: "password": "$2a$10$..."  (bcryptjs hash)
```

### Delete Test User
```sql
DELETE FROM users 
WHERE email = 'test@example.com';
```

---

## ✅ Test Checklist

- [ ] Backend server starts (port 5000)
- [ ] Database connection works (`/api/test`)
- [ ] Can register new user
- [ ] Can't register with duplicate email
- [ ] Can login with correct credentials
- [ ] Can't login with wrong password
- [ ] JWT token is returned on login
- [ ] Can fetch profile with valid token
- [ ] Can't fetch profile without token
- [ ] Get error with invalid token
- [ ] Frontend registers and login works
- [ ] User data persists in database
- [ ] Logout clears token

---

## 🐛 Debugging Tips

### Check Network Requests
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try login/register
4. Click on POST request
5. Check Response & Request tabs

### View LocalStorage
1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Click LocalStorage → localhost:5173
4. See stored token and user data

### Check Backend Logs
Look at terminal where `npm start` is running:
```
Server running on http://localhost:5000
```

If error occurs, check the error message there.

### Test Database Directly
Use a PostgreSQL client like:
- pgAdmin
- DBeaver
- psql command line
- Aiven console

---

## 📝 Notes

- Tokens expire after 24 hours
- Passwords are hashed (can't recover)
- Usernames and emails must be unique
- Phone number is optional
- All timestamps use UTC
- API returns 401 for auth errors, 403 for invalid tokens, 400 for validation

---

**Happy Testing! 🚀**
