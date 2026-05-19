/**
 * Complaint Controller
 * ----------------------
 * Handles all CRUD operations for complaints.
 * Functions:
 *   - addComplaint: Create a new complaint (POST /api/complaints)
 *   - getAllComplaints: Retrieve all complaints (GET /api/complaints)
 *   - updateComplaintStatus: Update status by ID (PUT /api/complaints/:id)
 *   - searchComplaints: Search/filter by location (GET /api/complaints/search)
 *   - deleteComplaint: Remove a complaint by ID (DELETE /api/complaints/:id)
 */

const Complaint = require("../models/Complaint");
const { validationResult } = require("express-validator");

/**
 * @desc    Add a new complaint
 * @route   POST /api/complaints
 * @access  Public
 */
const addComplaint = async (req, res) => {
  try {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors.array(),
      });
    }

    const { name, email, title, description, category, location } = req.body;

    // Create new complaint document
    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
      data: complaint,
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
 * @desc    Get all complaints
 * @route   GET /api/complaints
 * @access  Public
 */
const getAllComplaints = async (req, res) => {
  try {
    // Retrieve all complaints, sorted by newest first
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
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
 * @desc    Update complaint status
 * @route   PUT /api/complaints/:id
 * @access  Public
 */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status value
    const validStatuses = ["Pending", "In Progress", "Resolved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // Find complaint by ID and update
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: complaint,
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
 * @desc    Search complaints by location
 * @route   GET /api/complaints/search?location=Ghaziabad
 * @access  Public
 */
const searchComplaints = async (req, res) => {
  try {
    const { location, category, status } = req.query;
    let filter = {};

    // Build dynamic filter object based on query parameters
    if (location) {
      filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      filter.category = category;
    }
    if (status) {
      filter.status = status;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
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
 * @desc    Delete a complaint
 * @route   DELETE /api/complaints/:id
 * @access  Public
 */
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  searchComplaints,
  deleteComplaint,
};
