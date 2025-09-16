# User Management Dashboard (Fullstack)

This monorepo contains frontend (React + Vite) and backend (Node + Express + SQLite).

Run backend:
  cd backend
  npm install
  cp .env.example .env
  npm run migrate
  npm run dev

Run frontend:
  cd frontend
  npm install
  echo "VITE_API_BASE=http://localhost:4000" > .env
  npm run dev
