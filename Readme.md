# Backend - Leaderboard System

## 📦 Base URL
`http://localhost:8000`

---

## 🌱 For Populated Database
# npm run seed


## 🔐 Auth Routes

### `POST /api/auth/register`
- Register a new user

### `POST /api/auth/login`
- Login and receive JWT

---

## 👤 User Routes

### `GET /api/user/users`
- Get all users

### `POST /api/user/users`
- Add a new user

---

## 🏆 Leaderboard Routes

### `GET /api/user/leaderboard?page=1`
- Paginated leaderboard (10 users per page)

### `POST /api/user/claim`
- Claim points (for daily logins or task completion)

---

## ⚙️ Environment Variables
## Set in `.env`:
## PORT = 8000 
## JWT_SECRET = YOUR GENERATED JWT SECRET
## MONGODB_URL = YOUR MONGODB_URL 