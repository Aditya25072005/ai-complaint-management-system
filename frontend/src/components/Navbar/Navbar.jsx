/**
 * Navbar Component
 * ------------------
 * Reusable navigation bar with responsive design.
 * Shows different navigation options based on authentication state.
 * Features: logo, nav links, login/logout button, mobile hamburger menu.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!localStorage.getItem("token");

  /** Handle user logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMenuOpen(false);
  };

  /** Toggle mobile menu */
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /** Close mobile menu on link click */
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">SmartComplaint</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={toggleMenu} id="nav-toggle">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/register-complaint" className="nav-link" onClick={closeMenu}>
              Register Complaint
            </Link>
          </li>
          <li>
            <Link to="/complaints" className="nav-link" onClick={closeMenu}>
              All Complaints
            </Link>
          </li>
          <li>
            <Link to="/ai-analysis" className="nav-link" onClick={closeMenu}>
              AI Analysis
            </Link>
          </li>

          {/* Auth Links */}
          {isLoggedIn ? (
            <>
              <li className="nav-user">
                <FiUser size={16} />
                <span>{user?.name || "User"}</span>
              </li>
              <li>
                <button className="nav-btn logout-btn" onClick={handleLogout} id="logout-btn">
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="nav-btn signup-btn" onClick={closeMenu} id="signup-nav-btn">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
