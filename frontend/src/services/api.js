/**
 * API Service Configuration
 * ---------------------------
 * Centralized Axios instance for making HTTP requests to the backend API.
 * Automatically attaches JWT token from localStorage to all requests.
 */

import axios from "axios";

// Base API URL - change for production deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Attaches JWT token from localStorage to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles 401 errors by clearing token and redirecting to login
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

// ==================== Complaint API Calls ====================

/** Add a new complaint */
export const addComplaint = (data) => api.post("/complaints", data);

/** Get all complaints */
export const getAllComplaints = () => api.get("/complaints");

/** Update complaint status by ID */
export const updateComplaintStatus = (id, status) =>
  api.put(`/complaints/${id}`, { status });

/** Search complaints by location */
export const searchComplaints = (params) =>
  api.get("/complaints/search", { params });

/** Delete a complaint by ID */
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);

// ==================== Auth API Calls ====================

/** Register a new user */
export const registerUser = (data) => api.post("/auth/register", data);

/** Login user */
export const loginUser = (data) => api.post("/auth/login", data);

/** Get user profile */
export const getUserProfile = () => api.get("/auth/profile");

// ==================== AI API Calls ====================

/** Analyze complaint using AI */
export const analyzeComplaint = (data) => api.post("/ai/analyze", data);

export default api;
