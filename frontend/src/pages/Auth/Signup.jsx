/**
 * Signup Page - User registration with validation
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import { FiUserPlus, FiAlertCircle } from "react-icons/fi";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await registerUser(formData);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="signup-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Sign up to get started</p>
        {error && <div className="alert alert-error"><FiAlertCircle size={16} /><span>{error}</span></div>}
        <form onSubmit={handleSubmit} id="signup-form">
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <input type="text" id="signup-name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" minLength={6} required />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading} id="signup-btn">
            {loading ? <span className="spinner"></span> : <><FiUserPlus size={16} /><span>Sign Up</span></>}
          </button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
