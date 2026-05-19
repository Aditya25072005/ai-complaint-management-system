/**
 * Login Page - User authentication with JWT
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { FiLogIn, FiAlertCircle } from "react-icons/fi";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to manage complaints</p>
        {error && <div className="alert alert-error"><FiAlertCircle size={16} /><span>{error}</span></div>}
        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading} id="login-btn">
            {loading ? <span className="spinner"></span> : <><FiLogIn size={16} /><span>Login</span></>}
          </button>
        </form>
        <p className="auth-link">Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
