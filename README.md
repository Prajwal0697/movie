# Netflix Clone (TMDb)

A Netflix-like landing page and movie browsing app using TMDb API.
Includes user authentication and database integration (Aiven).

## Features
- Netflix-style landing page UI
- Fetch movies from TMDb API
- User registration & login
- Secure auth with JWT
- Hosted on Vercel

## Tech Stack
- Frontend: React
- Backend: Node.js / Express
- Database: MySQL (Aiven)
- Deployment: Vercel

## Setup (Local)
1. Install deps: `npm install`
2. Create `.env` file with:
   DATABASE_URL=...
   JWT_SECRET=...
3. Run: `npm run dev`
