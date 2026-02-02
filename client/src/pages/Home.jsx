import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "../assets/download (3).png";
import heroImg from "../assets/download (4).png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Simple scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".fade-in");
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <span>SwiftBill</span>
          </div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><a href="#" onClick={() => setMenuOpen(false)}>Pricing</a></li>
            <li><a href="#" onClick={() => setMenuOpen(false)}>Contact</a></li>
            
            {/* Mobile-only buttons inside menu */}
            <div className="mobile-btns">
              <a href="/login" className="btn login">Log In</a>
              <a href="/signup" className="btn signup">Sign Up</a>
            </div>
          </ul>

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero fade-in">
        <div className="hero-container">
          <div className="hero-text">
            <span className="badge">New: Automated Reminders</span>
            <h1>Simplify Your Billing <span className="highlight">with Ease</span></h1>
            <p>
              Effortlessly manage invoices, track payments, and organize
              client records all in one place. Designed for modern teams.
            </p>
            <div className="hero-buttons">
              <a href="/signup" className="btn primary-btn">Get Started Free</a>
              <a href="#" className="btn secondary-btn">Watch Demo</a>
            </div>
            <small className="trial-text">Free 14-day trial — No credit card required</small>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Billing Dashboard" />
            <div className="floating-card">
              <p>+ $4,250.00</p>
              <span>Received Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features fade-in">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything you need to get paid faster.</p>
        </div>

        <div className="feature-cards">
          <div className="card">
            <div className="icon-box blue">
              <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Invoice" />
            </div>
            <h3>Invoice Generator</h3>
            <p>Create professional, branded invoices in under 60 seconds.</p>
          </div>

          <div className="card">
            <div className="icon-box orange">
              <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Client" />
            </div>
            <h3>Client Management</h3>
            <p>A centralized hub for all your client data and history.</p>
          </div>

          <div className="card">
            <div className="icon-box purple">
              <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="Payment" />
            </div>
            <h3>Payment Tracking</h3>
            <p>Real-time notifications when your clients view and pay.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-in">
        <div className="cta-card">
          <h2>Ready to transform your business?</h2>
          <p>Join over 10,000+ freelancers managing their business with SwiftBill.</p>
          <a href="/signup" className="cta-btn">Create Your Free Account</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">SwiftBill</div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Help</a>
          </div>
          <div className="copyright">© 2026 SwiftBill Inc.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;