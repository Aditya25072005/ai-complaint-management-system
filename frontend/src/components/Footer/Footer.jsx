/**
 * Footer Component
 * ------------------
 * Reusable footer displayed at the bottom of every page.
 * Includes project info and tech stack badges.
 */

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} <strong>SmartComplaint</strong> — AI-Based Smart Complaint Management System
        </p>
        <div className="footer-badges">
          <span className="badge">React</span>
          <span className="badge">Express</span>
          <span className="badge">MongoDB</span>
          <span className="badge">Node.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
