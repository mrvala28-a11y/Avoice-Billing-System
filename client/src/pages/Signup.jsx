import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";

import "./Signup.css";
import logo from "../assets/download (3).png";
import bgImg from "../assets/download (4).png";

const Signup = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      showSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      showError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="logo" />
            <span>Invoice & Billing System</span>
          </div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Feature</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Content</a></li>
          </ul>

          <Link to="/login" className="login-btn">Log In</Link>

          <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </div>
      </nav>

      {/* SIGNUP */}
      <section className="signup-section">
        <div className="signup-bg">
          <img src={bgImg} alt="background" />
        </div>

        <div className="signup-card">
          <h2>Sign Up</h2>

          <form onSubmit={handleSignup}>
            <div className="input-box">
              <span>👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <span>✉</span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <span>🔒</span>
              <input
                type={showPass1 ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="eye" onClick={() => setShowPass1(!showPass1)}>
                {showPass1 ? "🙈" : "👁️"}
              </i>
            </div>

            <div className="input-box">
              <span>🔒</span>
              <input
                type={showPass2 ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="eye" onClick={() => setShowPass2(!showPass2)}>
                {showPass2 ? "🙈" : "👁️"}
              </i>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
