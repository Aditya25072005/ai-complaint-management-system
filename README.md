# AI-Based Smart Complaint Management System

## 🛡️ Overview
A full-stack MERN application that allows users to register complaints online. The system uses AI to classify complaint priority, generate automated responses, and recommend the concerned department.

## ✨ Features
- **Complaint Registration** - Submit complaints with name, email, title, description, category, and location
- **Complaint Tracking** - View, search, and filter complaints by category/location/status
- **AI Analysis** - Priority detection, department recommendation, complaint summary, auto-response
- **Authentication** - JWT-based login/signup with bcrypt password hashing
- **Status Management** - Update complaint status (Pending, In Progress, Resolved, Rejected)

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt |
| AI | Rule-based analysis engine |

## 📁 Folder Structure
```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handler logic
│   ├── middleware/      # Auth & error middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── server.js       # Entry point
│   └── .env            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components (Navbar, Footer)
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layer
│   │   ├── App.jsx     # Root component
│   │   └── main.jsx    # Entry point
│   └── index.html
└── README.md
```

## 🚀 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/complaints` | Add a new complaint |
| GET | `/api/complaints` | Get all complaints |
| PUT | `/api/complaints/:id` | Update complaint status |
| GET | `/api/complaints/search?location=` | Search by location |
| DELETE | `/api/complaints/:id` | Delete a complaint |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (Protected) |
| POST | `/api/ai/analyze` | AI complaint analysis |

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup
```bash
cd backend
npm install
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📦 Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🌐 Deployment
- **Frontend**: Deployed on Render (Static Site)
- **Backend**: Deployed on Render (Web Service)
- **Database**: MongoDB Atlas

## 👤 Author
Student - AI Driven Full Stack Development (AI308B)
