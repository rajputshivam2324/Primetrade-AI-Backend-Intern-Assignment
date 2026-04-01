# TaskFlow-Scalable REST API with Authentication & Role-Based Access

A full-stack task management application featuring a secure Express.js REST API with JWT authentication, role-based access control (RBAC), CRUD operations, Swagger documentation, and a modern React frontend.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

---

## Features

### Backend
- **User Authentication** - Register & login with bcrypt password hashing + JWT tokens
- **Role-Based Access Control**-`user` and `admin` roles with granular permissions
- **Task CRUD**-Create, read, update, delete tasks with ownership enforcement
- **Admin Panel API**-Manage users, update roles, delete accounts
- **API Versioning**-All routes under `/api/v1`
- **Input Validation**-express-validator on all endpoints
- **Error Handling**-Global error handler with consistent JSON responses
- **Rate Limiting**-Protection against brute force attacks
- **Security**-Helmet headers, CORS configuration
- **API Documentation**-Interactive Swagger UI at `/api-docs`

### Frontend
- **Modern React UI**-Built with Vite, React Router, and context-based state management
- **Authentication Flow**-Register, login, JWT token management
- **Protected Routes**-Dashboard accessible only with valid JWT
- **Task Management**-Create, edit, delete, filter tasks by status/priority
- **Admin Panel**-User management with role editing (admin only)
- **Responsive Design**-Works on desktop, tablet, and mobile
- **Dark Theme**-Premium glassmorphism design with micro-animations

---

## 🛠 Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Runtime     | Node.js 18+                         |
| Backend     | Express.js 4                        |
| Database    | MongoDB + Mongoose 8                |
| Auth        | JWT + bcryptjs                      |
| Validation  | express-validator                   |
| Security    | Helmet, CORS, express-rate-limit    |
| API Docs    | swagger-jsdoc + swagger-ui-express  |
| Frontend    | React 19 (Vite)                     |
| HTTP Client | Axios                               |
| Styling     | Vanilla CSS (custom design system)  |

---

## Project Structure

```
├── server/                     # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT & RBAC middleware
│   │   │   ├── errorHandler.js # Global error handler
│   │   │   └── validate.js     # Validation middleware
│   │   ├── models/
│   │   │   ├── User.js         # User schema
│   │   │   └── Task.js         # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── adminRoutes.js
│   │   └── index.js            # Server entry point
│   ├── .env.example
│   └── package.json
│
├── client/                     # Frontend React App
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── README.md
└── SCALABILITY.md
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Primetrade-AI-Backend-Intern-Assignment.git
cd Primetrade-AI-Backend-Intern-Assignment
```

### 2. Backend Setup
```bash
cd server
cp .env.example .env     # Update MONGO_URI and JWT_SECRET
npm install
npm run dev              # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev              # Starts on http://localhost:5173
```

### 4. Access the Application
| Service       | URL                              |
|--------------|----------------------------------|
| Frontend     | http://localhost:5173             |
| Backend API  | http://localhost:5000/api/v1      |
| Swagger Docs | http://localhost:5000/api-docs    |
| Health Check | http://localhost:5000/api/health  |

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint               | Auth     | Description       |
|--------|------------------------|----------|-------------------|
| POST   | `/api/v1/auth/register`| Public   | Register user     |
| POST   | `/api/v1/auth/login`   | Public   | Login, get JWT    |
| GET    | `/api/v1/auth/me`      | Protected| Get profile       |

### Tasks
| Method | Endpoint              | Auth      | Description                    |
|--------|-----------------------|-----------|--------------------------------|
| GET    | `/api/v1/tasks`       | Protected | List tasks (own/all for admin) |
| GET    | `/api/v1/tasks/:id`   | Protected | Get single task                |
| POST   | `/api/v1/tasks`       | Protected | Create task                    |
| PUT    | `/api/v1/tasks/:id`   | Protected | Update task                    |
| DELETE | `/api/v1/tasks/:id`   | Protected | Delete task                    |

### Admin
| Method | Endpoint                       | Auth  | Description         |
|--------|--------------------------------|-------|---------------------|
| GET    | `/api/v1/admin/users`          | Admin | List all users      |
| PUT    | `/api/v1/admin/users/:id/role` | Admin | Update user role    |
| DELETE | `/api/v1/admin/users/:id`      | Admin | Delete user         |

---

## Database Schema

### User
| Field     | Type   | Constraints              |
|-----------|--------|--------------------------|
| name      | String | Required, max 50 chars   |
| email     | String | Required, unique, valid  |
| password  | String | Required, min 6, hashed  |
| role      | Enum   | `user` / `admin`         |
| createdAt | Date   | Auto-generated           |

### Task
| Field       | Type     | Constraints                         |
|-------------|----------|-------------------------------------|
| title       | String   | Required, max 100 chars             |
| description | String   | Optional, max 500 chars             |
| status      | Enum     | `pending` / `in-progress` / `completed` |
| priority    | Enum     | `low` / `medium` / `high`           |
| user        | ObjectId | Reference to User (owner)           |
| createdAt   | Date     | Auto-generated                      |

---

## Security Practices
- **Password Hashing**-bcrypt with 12 salt rounds
- **JWT Authentication**-Tokens stored in client, sent via `Authorization: Bearer` header
- **Input Validation**-express-validator on all POST/PUT routes
- **Rate Limiting**-100 requests per 15 minutes per IP
- **Helmet**-Sets security-related HTTP headers
- **CORS**-Configured for frontend origin only
- **Body Size Limit**-10kb max payload to prevent abuse

---

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/primetrade_taskmanager
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

---


