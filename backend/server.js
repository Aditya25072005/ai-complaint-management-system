/**
 * Server Entry Point
 * --------------------
 * Main server file for the AI-Based Smart Complaint Management System.
 * Configures Express, connects to MongoDB, and mounts all API routes.
 *
 * API Routes:
 *   /api/complaints  - Complaint CRUD operations
 *   /api/auth        - User authentication (register, login, profile)
 *   /api/ai          - AI-based complaint analysis
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ----- Middleware -----
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ----- API Routes -----
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// ----- Root Route -----
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI-Based Smart Complaint Management System API is running",
    endpoints: {
      complaints: "/api/complaints",
      auth: "/api/auth",
      ai: "/api/ai/analyze",
    },
  });
});

// ----- Error Handling -----
app.use(notFound);
app.use(errorHandler);

// ----- Start Server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
