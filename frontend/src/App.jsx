/**
 * App Component - Main Application Router
 * Configures all routes and wraps pages with Navbar and Footer.
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import RegisterComplaint from "./pages/RegisterComplaint/RegisterComplaint";
import ComplaintList from "./pages/ComplaintList/ComplaintList";
import AIAnalysis from "./pages/AIAnalysis/AIAnalysis";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-complaint" element={<RegisterComplaint />} />
            <Route path="/complaints" element={<ComplaintList />} />
            <Route path="/ai-analysis" element={<AIAnalysis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
