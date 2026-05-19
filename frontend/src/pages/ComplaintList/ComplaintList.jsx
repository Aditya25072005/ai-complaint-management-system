/**
 * Complaint List Page
 * ----------------------
 * Displays all registered complaints in a searchable, filterable list.
 * Features:
 *   - View all complaints
 *   - Filter by category
 *   - Search by location
 *   - Update complaint status
 *   - Delete complaints
 */

import { useState, useEffect } from "react";
import {
  getAllComplaints,
  searchComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../../services/api";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiRefreshCw,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import "./ComplaintList.css";

/** Available categories for filtering */
const CATEGORIES = [
  "All",
  "Water Supply",
  "Electricity",
  "Garbage",
  "Road Maintenance",
  "Public Safety",
  "Sanitation",
  "Other",
];

/** Available status options */
const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [message, setMessage] = useState("");

  /** Fetch all complaints on mount */
  useEffect(() => {
    fetchComplaints();
  }, []);

  /** Fetch complaints from the API */
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await getAllComplaints();
      setComplaints(response.data.data);
    } catch (error) {
      setMessage("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  /** Handle search by location */
  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      fetchComplaints();
      return;
    }
    setLoading(true);
    try {
      const response = await searchComplaints({ location: searchLocation });
      setComplaints(response.data.data);
    } catch (error) {
      setMessage("Search failed");
    } finally {
      setLoading(false);
    }
  };

  /** Handle status update for a complaint */
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      // Update local state
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      setMessage("Status updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  /** Handle complaint deletion */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;
    try {
      await deleteComplaint(id);
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      setMessage("Complaint deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete complaint");
    }
  };

  /** Filter complaints by category (client-side) */
  const filteredComplaints =
    filterCategory === "All"
      ? complaints
      : complaints.filter((c) => c.category === filterCategory);

  /** Get CSS class for status badge */
  const getStatusClass = (status) => {
    const map = {
      Pending: "status-pending",
      "In Progress": "status-progress",
      Resolved: "status-resolved",
      Rejected: "status-rejected",
    };
    return map[status] || "status-pending";
  };

  return (
    <div className="complaints-page" id="complaints-page">
      <div className="complaints-container">
        {/* Page Header */}
        <div className="page-header">
          <h1>All Complaints</h1>
          <p>View, search, and manage all registered complaints</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="controls-bar" id="controls-bar">
          {/* Location Search */}
          <div className="search-box">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              id="search-location-input"
            />
            <button onClick={handleSearch} className="search-btn" id="search-btn">
              Search
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-box">
            <FiFilter size={16} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              id="category-filter"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button onClick={fetchComplaints} className="refresh-btn" id="refresh-btn">
            <FiRefreshCw size={16} />
          </button>
        </div>

        {/* Status Message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Complaints Count */}
        <p className="results-count">
          Showing <strong>{filteredComplaints.length}</strong> complaint(s)
        </p>

        {/* Complaints List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading complaints...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints found</p>
          </div>
        ) : (
          <div className="complaints-grid">
            {filteredComplaints.map((complaint) => (
              <div className="complaint-card" key={complaint._id} id={`complaint-${complaint._id}`}>
                {/* Card Header */}
                <div className="card-header">
                  <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <span className="category-badge">{complaint.category}</span>
                </div>

                {/* Card Body */}
                <h3 className="card-title">{complaint.title}</h3>
                <p className="card-desc">{complaint.description}</p>

                <div className="card-meta">
                  <span>
                    <FiMapPin size={13} /> {complaint.location}
                  </span>
                  <span>
                    <FiClock size={13} />{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="card-info">
                  <p><strong>Name:</strong> {complaint.name}</p>
                  <p><strong>Email:</strong> {complaint.email}</p>
                </div>

                {/* AI Analysis (if available) */}
                {complaint.aiAnalysis?.priority && (
                  <div className="card-ai">
                    <span className="ai-tag">🤖 AI: {complaint.aiAnalysis.priority} Priority</span>
                    <span className="ai-tag">📍 {complaint.aiAnalysis.department}</span>
                  </div>
                )}

                {/* Card Actions */}
                <div className="card-actions">
                  <select
                    className="status-select"
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusUpdate(complaint._id, e.target.value)
                    }
                    id={`status-select-${complaint._id}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(complaint._id)}
                    id={`delete-btn-${complaint._id}`}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
