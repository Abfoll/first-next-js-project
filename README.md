# first-next-js-project

Full-stack portfolio application with a Next.js frontend and an Express/MongoDB backend.

## Features

- Featured projects grid with GitHub/live links
- Auth (register/login/profile) with JWT
- Redux Toolkit state management
- Responsive UI using Tailwind CSS and shadcn-style components
- MongoDB persistence for users and projects

## Project structure

- frontend/ — Next.js app (App Router)
- backend/ — Express API with Mongoose
- docker-compose.yml — local service orchestration (optional)

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB (local or Docker)

## Environment variables

Backend [backend/.env](backend/.env):

- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/portfolio
- JWT_SECRET=your-secret

Frontend [frontend/.env.local](frontend/.env.local) (optional):

- NEXT_PUBLIC_API_URL=http://localhost:5000/api

## Install

From the repo root:

1) Backend

- cd backend
- npm install

2) Frontend

- cd frontend
- npm install

## Run

1) Start MongoDB (Docker example):

- docker run -d -p 27017:27017 --name mongodb mongo:4.4

2) Start backend:

- cd backend
- npm run dev

3) Start frontend:

- cd frontend
- npm run dev

Frontend: http://localhost:3000
Backend: http://localhost:5000

## API endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects

## Notes

- MongoDB 5+ requires AVX; use MongoDB 4.4 on older CPUs.
