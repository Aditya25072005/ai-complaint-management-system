/**
 * AI Analysis Page - Analyze complaints using AI endpoint
 */
import { useState } from "react";
import { analyzeComplaint } from "../../services/api";
import { FiCpu, FiZap, FiHome, FiFileText, FiMessageSquare } from "react-icons/fi";
import "./AIAnalysis.css";

const CATEGORIES = ["Water Supply","Electricity","Garbage","Road Maintenance","Public Safety","Sanitation","Other"];

const AIAnalysis = () => {
  const [formData, setFormData] = useState({ title: "", description: "", category: "", location: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await analyzeComplaint(formData);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="ai-page" id="ai-analysis-page">
      <div className="ai-container">
        <div className="page-header">
          <div className="ai-icon-wrapper"><FiCpu size={32} /></div>
          <h1>AI Complaint Analyzer</h1>
          <p>Enter complaint details to get AI-powered analysis</p>
        </div>

        <form onSubmit={handleAnalyze} className="ai-form" id="ai-form">
          <div className="form-group">
            <label htmlFor="ai-title">Complaint Title</label>
            <input type="text" id="ai-title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Water Leakage Issue" required />
          </div>
          <div className="form-group">
            <label htmlFor="ai-description">Description</label>
            <textarea id="ai-description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the complaint..." rows="4" required></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ai-category">Category</label>
              <select id="ai-category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ai-location">Location</label>
              <input type="text" id="ai-location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Ghaziabad" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary analyze-btn" disabled={loading} id="analyze-btn">
            {loading ? <span className="spinner"></span> : <><FiCpu size={16} /><span>Analyze Complaint</span></>}
          </button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}

        {result && (
          <div className="ai-results" id="ai-results">
            <h2 className="results-title">🤖 Analysis Results</h2>
            <div className="result-cards">
              <div className="result-card">
                <div className="result-icon"><FiZap size={22} /></div>
                <div className="result-content">
                  <span className="result-label">Priority Level</span>
                  <span className={`result-value priority-${result.priority?.toLowerCase()}`}>{result.priority}</span>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon"><FiHome size={22} /></div>
                <div className="result-content">
                  <span className="result-label">Recommended Department</span>
                  <span className="result-value">{result.department}</span>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon"><FiFileText size={22} /></div>
                <div className="result-content">
                  <span className="result-label">Complaint Summary</span>
                  <p className="result-text">{result.summary}</p>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon"><FiMessageSquare size={22} /></div>
                <div className="result-content">
                  <span className="result-label">Auto-Generated Response</span>
                  <p className="result-text">{result.response}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
