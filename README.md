# Netflix Clone - TMDb Movies

A Netflix-inspired landing page that displays movies from The Movie Database (TMDb) API.

## Features

- 🔐 Login and Registration system with beautiful UI
- 🎬 Netflix-style landing page design
- 🎭 Hero banner with featured trending movie
- 📺 Multiple movie rows (Trending, Top Rated, Action, Comedy, Horror, Romance, Documentaries)
- 🎨 Smooth scrolling and hover effects
- 📱 Responsive design
- 🔄 Protected routes - redirects to login if not authenticated

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Technologies Used

- React 18
- React Router DOM (for navigation and protected routes)
- Vite
- Axios
- TMDb API
- CSS3

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Login.jsx        # Login page component
│   │   ├── Register.jsx     # Registration page component
│   │   ├── Home.jsx         # Netflix landing page (protected)
│   │   ├── Navbar.jsx       # Navigation bar component
│   │   ├── Hero.jsx         # Hero banner component
│   │   ├── Row.jsx          # Movie row component
│   │   ├── Login.css        # Login/Register styling
│   │   ├── Navbar.css       # Navbar styling
│   │   ├── Hero.css         # Hero styling
│   │   └── Row.css          # Row styling
│   ├── services/
│   │   └── tmdb.js          # TMDb API service
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # App styling
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Authentication Flow

1. **Login Page**: Users can sign in with email and password
2. **Registration Page**: New users can create an account
3. **Protected Routes**: The Netflix landing page is only accessible after login
4. **Auto-redirect**: Authenticated users are automatically redirected to the home page
5. **Logout**: Click on the avatar in the navbar to logout

## User Experience

- Start at `/login` or `/register`
- After successful login/registration, you'll be redirected to `/home` (Netflix landing page)
- The app remembers your login state using localStorage
- If you try to access `/home` without logging in, you'll be redirected to `/login`

## API Key

The TMDb API key is configured in `src/services/tmdb.js`. Make sure to keep your API key secure in production.
