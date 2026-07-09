# Task Manager — Machine Test Practice

A small full-stack CRUD app: Node/Express + MongoDB backend, React frontend.
Covers the patterns most machine tests ask for: REST CRUD, JWT auth, controlled forms, useReducer, Context API, protected routes.

## Run it

### Backend
```
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI if needed (needs a running MongoDB)
npm run dev
```
Runs on http://localhost:5000

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 (Vite default)

## What to study from each file

- **models/User.js** — Mongoose pre-save hook for password hashing, instance method for comparison
- **models/Task.js** — schema with enum, ref to another model
- **middleware/auth.js** — how JWT verification middleware works, attaching data to `req`
- **routes/authRoutes.js** — register/login pattern, generating a token
- **routes/taskRoutes.js** — full CRUD, always scoping queries by `user: req.userId` (critical — don't forget this in a live test, interviewers check for it)
- **context/AuthContext.jsx** — `useReducer` + Context API combined, syncing to localStorage with `useEffect`
- **components/TaskForm.jsx** — reusable controlled form for both create and edit
- **components/TaskList.jsx** — `useEffect` to fetch on mount, optimistic local state updates after create/update/delete (no full refetch)
- **components/ProtectedRoute.jsx** — route guarding pattern with `react-router-dom`

## If your test is React-only (no backend)

Practice building `TaskList` + `TaskForm` against a fake in-memory array instead of `api` calls — same component structure, just swap `api.get/post/put/delete` for local state functions. That's usually enough for a React-only machine test.

## If asked to add something on the spot

Likely additions and where they'd go:
- Search/filter tasks → add a `useState` for search term in `TaskList`, filter the `tasks` array before rendering
- Pagination → add `?page=` query param handling in `taskRoutes.js`, `.skip().limit()` in the Mongoose query
- Sorting → `.sort({ field: 1/-1 })` in the route, or client-side `[...tasks].sort()`
