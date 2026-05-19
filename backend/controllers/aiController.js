/**
 * AI Controller
 * ---------------
 * Provides AI-based analysis for complaints using rule-based logic.
 * Features:
 *   1. Complaint Priority Detection (Low / Medium / High / Critical)
 *   2. Department Recommendation
 *   3. Complaint Summary Generation
 *   4. Auto-generated User Response
 *
 * @route POST /api/ai/analyze
 */

const Complaint = require("../models/Complaint");

/**
 * Priority keywords mapped to urgency levels
 * Used for rule-based complaint priority detection
 */
const PRIORITY_KEYWORDS = {
  critical: [
    "emergency", "danger", "fire", "flood", "collapse", "death",
    "explosion", "hazard", "life-threatening", "urgent",
  ],
  high: [
    "broken", "leak", "damage", "accident", "sewage", "contaminated",
    "blocked", "overflow", "electric shock", "short circuit",
  ],
  medium: [
    "delayed", "irregular", "poor", "dirty", "noisy", "smell",
    "crack", "pothole", "dim", "slow",
  ],
  low: [
    "request", "suggestion", "feedback", "improvement", "minor",
    "cosmetic", "paint", "aesthetic",
  ],
};

/**
 * Department mapping based on complaint category
 */
const DEPARTMENT_MAP = {
  "Water Supply": "Water Department",
  "Electricity": "Electricity Board",
  "Garbage": "Sanitation Department",
  "Road Maintenance": "Public Works Department",
  "Public Safety": "Police / Safety Department",
  "Sanitation": "Sanitation Department",
  "Other": "General Administration",
};

/**
 * Detect complaint priority based on title and description keywords
 * @param {string} title - Complaint title
 * @param {string} description - Complaint description
 * @returns {string} - Priority level (Critical / High / Medium / Low)
 */
const detectPriority = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  for (const [level, keywords] of Object.entries(PRIORITY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return level.charAt(0).toUpperCase() + level.slice(1);
      }
    }
  }
  return "Medium"; // Default priority
};

/**
 * Suggest responsible department based on category
 * @param {string} category - Complaint category
 * @returns {string} - Recommended department
 */
const suggestDepartment = (category) => {
  return DEPARTMENT_MAP[category] || "General Administration";
};

/**
 * Generate a summary of the complaint
 * @param {string} title - Complaint title
 * @param {string} description - Complaint description
 * @param {string} category - Complaint category
 * @param {string} location - Complaint location
 * @returns {string} - Generated summary
 */
const generateSummary = (title, description, category, location) => {
  // Truncate description if too long
  const shortDesc =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return `[${category}] "${title}" reported at ${location}. Details: ${shortDesc}`;
};

/**
 * Generate an automated response message for the user
 * @param {string} priority - Detected priority level
 * @param {string} department - Suggested department
 * @param {string} title - Complaint title
 * @returns {string} - Auto-generated response message
 */
const generateResponse = (priority, department, title) => {
  const timeframes = {
    Critical: "within 2 hours",
    High: "within 24 hours",
    Medium: "within 3-5 business days",
    Low: "within 7-10 business days",
  };

  const timeframe = timeframes[priority] || "within 5 business days";

  return `Thank you for reporting "${title}". Your complaint has been classified as ${priority} priority and has been forwarded to the ${department}. Expected resolution time: ${timeframe}. You will receive updates on your registered email.`;
};

/**
 * @desc    Analyze a complaint using AI (rule-based)
 * @route   POST /api/ai/analyze
 * @access  Public
 */
const analyzeComplaint = async (req, res) => {
  try {
    const { complaintId, title, description, category, location } = req.body;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required for analysis",
      });
    }

    // Perform AI analysis
    const priority = detectPriority(title, description);
    const department = suggestDepartment(category);
    const summary = generateSummary(title, description, category, location);
    const response = generateResponse(priority, department, title);

    const aiResult = {
      priority,
      department,
      summary,
      response,
    };

    // If complaintId is provided, update the complaint with AI analysis
    if (complaintId) {
      await Complaint.findByIdAndUpdate(complaintId, {
        aiAnalysis: aiResult,
      });
    }

    res.status(200).json({
      success: true,
      message: "AI analysis completed successfully",
      data: aiResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI Analysis Error",
      error: error.message,
    });
  }
};

module.exports = { analyzeComplaint };
