/**
 * AI Routes
 * -----------
 * Defines routes for AI-based complaint analysis.
 * Routes:
 *   POST /api/ai/analyze - Analyze a complaint using AI
 */

const express = require("express");
const router = express.Router();

const { analyzeComplaint } = require("../controllers/aiController");

// Route for AI complaint analysis
router.post("/analyze", analyzeComplaint);

module.exports = router;
