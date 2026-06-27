# Book A Doctor

A production-ready **MERN Stack** healthcare appointment booking system with role-based access (Patient, Doctor, Admin), real-time updates via Socket.io, and file uploads for medical reports.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React (Vite), React Router, Axios, Bootstrap 5, Chart.js, Socket.io Client |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, Socket.io |

## Features

- **Authentication** — Register, login, logout, JWT, role-based routes, password hashing
- **Patients** — Search/filter doctors, book/cancel/reschedule appointments, upload reports
- **Doctors** — Profile management, view appointments, update status, view reports
- **Admin** — Analytics dashboard, approve/reject/suspend doctors, user & appointment management
- **Advanced** — Dark mode, pagination, search, toast notifications, loading skeletons, error boundaries, real-time notifications

## Project Structure

```
book-a-doctor/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios API layer
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth, Theme, Socket contexts
│   │   ├── pages/          # Route pages
│   │   ├── styles/         # Custom CSS
│   │   └── utils/          # Helpers
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # DB & config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth, upload, validation, errors
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── uploads/            # Uploaded files (Multer)
│   ├── utils/              # Helpers
│   └── server.js           # Entry point + Socket.io
└── package.json            # Root scripts (concurrently)
```

## Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) — local install **or** [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster

### Steps

1. **Clone / navigate to project**
   ```bash
   cd book-a-doctor
   ```

2. **Install all dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```
   Or use: `npm run install:all` (from root after `npm install` for concurrently)

3. **Configure environment variables**

   **Server** — copy `server/.env.example` to `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/book-a-doctor
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Client** — copy `client/.env.example` to `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Health check: http://localhost:5000/api/health

### Default Admin Account

On first server start, a default admin is created:

| Email | Password |
|-------|----------|
| admin@bookadoctor.com | admin123 |

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/register` | Public |
| POST | `/login` | Public |
| GET | `/profile` | Protected |
| POST | `/logout` | Protected |

### Doctors (`/api/doctors`)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/` | Public |
| GET | `/:id` | Public |
| GET | `/profile/me` | Doctor |
| PUT | `/profile/me` | Doctor |
| GET | `/appointments/me` | Doctor |

### Appointments (`/api/appointments`)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/` | Patient |
| GET | `/my` | Protected |
| PATCH | `/:id/status` | Patient/Doctor |
| PATCH | `/:id/reschedule` | Patient |
| DELETE | `/:id` | Protected |

### Reports (`/api/reports`)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/:appointmentId` | Patient |
| GET | `/my` | Protected |
| GET | `/appointment/:appointmentId` | Protected |

### Admin (`/api/admin`)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/stats` | Admin |
| GET | `/doctors` | Admin |
| PATCH | `/doctors/:id/approval` | Admin |
| GET | `/users` | Admin |
| DELETE | `/users/:id` | Admin |
| GET | `/appointments` | Admin |
| DELETE | `/appointments/:id` | Admin |

## Deployment Guide

### Backend (Render / Railway / Heroku)

1. Push code to GitHub
2. Create a new Web Service
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `server/.env.example`
7. Use MongoDB Atlas connection string for `MONGODB_URI`
8. Set `CLIENT_URL` to your deployed frontend URL

### Frontend (Vercel / Netlify)

1. Set root directory to `client`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables:
   - `VITE_API_URL=https://your-api.com/api`
   - `VITE_SOCKET_URL=https://your-api.com`

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist IP `0.0.0.0/0` (or specific IPs for production)
4. Copy connection string to `MONGODB_URI`

### File Uploads in Production

For production, consider migrating from local `server/uploads` to cloud storage (AWS S3, Cloudinary) for persistence across deploys.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client & server |
| `npm run dev:server` | Backend only |
| `npm run dev:client` | Frontend only |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server |

## License

MIT
