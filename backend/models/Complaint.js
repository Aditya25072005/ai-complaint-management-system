/**
 * Complaint Model
 * ----------------
 * Mongoose schema for storing complaint data in MongoDB.
 * Fields: name, email, title, description, category, location, status, aiAnalysis, createdAt
 * Status defaults to "Pending" on creation.
 */

const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  title: {
    type: String,
    required: [true, "Complaint title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Complaint description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Complaint category is required"],
    enum: [
      "Water Supply",
      "Electricity",
      "Garbage",
      "Road Maintenance",
      "Public Safety",
      "Sanitation",
      "Other",
    ],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
  },
  aiAnalysis: {
    priority: { type: String, default: null },
    department: { type: String, default: null },
    summary: { type: String, default: null },
    response: { type: String, default: null },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
