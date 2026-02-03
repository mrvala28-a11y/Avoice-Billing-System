import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import { addNotification } from "../utils/notifications"; // ✅ import
import "./Login.css";
import logo from "../assets/download (3).png";
import bgImg from "../assets/download (4).png";

const Login = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Add notification for login
      addNotification("Login", `User ${res.data.user.name} logged in successfully`);

      showSuccess("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      showError(err.response?.data?.message || "Invalid credentials");
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

          <Link to="/signup" className="signup-btn">Sign Up</Link>

          <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </div>
      </nav>

      {/* LOGIN */}
      <section className="login-section">
        <div className="login-bg">
          <img src={bgImg} alt="background" />
        </div>

        <div className="login-card">
          <h2>Log In</h2>

          <form onSubmit={handleLogin}>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </i>
            </div>

            <button type="submit">Log In</button>

            <p className="signup-text">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
