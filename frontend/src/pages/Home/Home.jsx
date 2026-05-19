/**
 * Home Page Component
 * ---------------------
 * Landing page for the complaint management system.
 * Features hero section, feature cards, and call-to-action.
 */

import { Link } from "react-router-dom";
import { FiFileText, FiSearch, FiCpu, FiShield } from "react-icons/fi";
import "./Home.css";

/** Feature data for the home page cards */
const features = [
  {
    icon: <FiFileText size={28} />,
    title: "Register Complaints",
    desc: "Submit complaints with detailed information including category, location, and description.",
  },
  {
    icon: <FiSearch size={28} />,
    title: "Track & Search",
    desc: "View all complaints, filter by category, search by location, and track status updates.",
  },
  {
    icon: <FiCpu size={28} />,
    title: "AI Analysis",
    desc: "Get AI-powered priority detection, department recommendations, and auto-generated responses.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure Access",
    desc: "JWT authentication with bcrypt password hashing ensures secure user access.",
  },
];

const Home = () => {
  return (
    <div className="home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <span className="hero-badge">🤖 AI-Powered Platform</span>
          <h1 className="hero-title">
            Smart Complaint <br />
            <span className="gradient-text">Management System</span>
          </h1>
          <p className="hero-subtitle">
            Register, track, and resolve complaints efficiently with AI-driven
            categorization, priority detection, and automated response generation.
          </p>
          <div className="hero-actions">
            <Link to="/register-complaint" className="btn btn-primary" id="hero-register-btn">
              Register Complaint
            </Link>
            <Link to="/complaints" className="btn btn-secondary" id="hero-view-btn">
              View Complaints
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
