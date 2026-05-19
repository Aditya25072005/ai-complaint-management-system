/**
 * Auth Controller
 * -----------------
 * Handles user registration and login with JWT token generation.
 * Functions:
 *   - registerUser: Create new user account (POST /api/auth/register)
 *   - loginUser: Authenticate and return JWT (POST /api/auth/login)
 *   - getUserProfile: Get logged-in user profile (GET /api/auth/profile)
 */

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

/**
 * Generate JWT Token
 * @param {string} id - User's MongoDB _id
 * @returns {string} - Signed JWT token valid for 30 days
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user (password is hashed via pre-save hook)
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Login user and return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Validate credentials
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private (requires JWT)
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
