/**
 * Complaint Routes
 * ------------------
 * Defines all API routes for complaint management.
 * Routes:
 *   POST   /api/complaints          - Add a new complaint
 *   GET    /api/complaints          - Get all complaints
 *   GET    /api/complaints/search   - Search complaints by location/category/status
 *   PUT    /api/complaints/:id      - Update complaint status
 *   DELETE /api/complaints/:id      - Delete a complaint
 */

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  searchComplaints,
  deleteComplaint,
} = require("../controllers/complaintController");

// Validation rules for creating a complaint
const complaintValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

// Routes
router.post("/", complaintValidation, addComplaint);
router.get("/", getAllComplaints);
router.get("/search", searchComplaints);
router.put("/:id", updateComplaintStatus);
router.delete("/:id", deleteComplaint);

module.exports = router;
