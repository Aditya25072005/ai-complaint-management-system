/**
 * Complaint Registration Form Page
 * -----------------------------------
 * Allows users to submit new complaints with:
 * - Name, Email, Title, Description, Category, Location
 * Auto-triggers AI analysis after successful submission.
 */

import { useState } from "react";
import { addComplaint, analyzeComplaint } from "../../services/api";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "./RegisterComplaint.css";

/** Available complaint categories */
const CATEGORIES = [
  "Water Supply",
  "Electricity",
  "Garbage",
  "Road Maintenance",
  "Public Safety",
  "Sanitation",
  "Other",
];

const RegisterComplaint = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [aiResult, setAiResult] = useState(null);

  /** Handle input field changes */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /** Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setAiResult(null);

    try {
      // Step 1: Submit complaint
      const response = await addComplaint(formData);
      const complaintId = response.data.data._id;

      setMessage({
        type: "success",
        text: "Complaint registered successfully!",
      });

      // Step 2: Auto-trigger AI analysis
      try {
        const aiResponse = await analyzeComplaint({
          complaintId,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
        });
        setAiResult(aiResponse.data.data);
      } catch {
        // AI analysis failure is non-critical
        console.log("AI analysis skipped");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to register complaint",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" id="register-complaint-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Register Complaint</h1>
          <p>Fill in the details below to submit your complaint</p>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`alert alert-${message.type}`} id="form-alert">
            {message.type === "success" ? (
              <FiCheckCircle size={18} />
            ) : (
              <FiAlertCircle size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Complaint Form */}
        <form onSubmit={handleSubmit} className="complaint-form" id="complaint-form">
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Kumar"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@gmail.com"
                required
              />
            </div>

            {/* Title */}
            <div className="form-group full-width">
              <label htmlFor="title">Complaint Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Water Leakage Issue"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows="4"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Ghaziabad"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={loading}
            id="submit-complaint-btn"
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <FiSend size={16} />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </form>

        {/* AI Analysis Result */}
        {aiResult && (
          <div className="ai-result-card" id="ai-result-inline">
            <h3>🤖 AI Analysis Result</h3>
            <div className="ai-result-grid">
              <div className="ai-item">
                <span className="ai-label">Priority</span>
                <span className={`ai-value priority-${aiResult.priority?.toLowerCase()}`}>
                  {aiResult.priority}
                </span>
              </div>
              <div className="ai-item">
                <span className="ai-label">Department</span>
                <span className="ai-value">{aiResult.department}</span>
              </div>
              <div className="ai-item full-width">
                <span className="ai-label">Summary</span>
                <span className="ai-value">{aiResult.summary}</span>
              </div>
              <div className="ai-item full-width">
                <span className="ai-label">Response</span>
                <span className="ai-value">{aiResult.response}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterComplaint;
