/**
 * Auth Routes
 * -------------
 * Defines authentication routes for user registration, login, and profile.
 * Routes:
 *   POST /api/auth/register  - Register a new user
 *   POST /api/auth/login     - Login and get JWT token
 *   GET  /api/auth/profile   - Get user profile (Protected)
 */

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Validation rules for registration
const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Validation rules for login
const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
