// import React, { useState, useEffect } from "react";
// import "./Home.css";
// import logo from "../assets/download (3).png";
// import heroImg from "../assets/download (4).png";

// const Home = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Simple scroll animation trigger
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         }
//       });
//     });

//     const hiddenElements = document.querySelectorAll(".fade-in");
//     hiddenElements.forEach((el) => observer.observe(el));
//   }, []);

//   return (
//     <div className="home-wrapper">
//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="nav-container">
//           <div className="logo">
//             <img src={logo} alt="Logo" />
//             <span>SwiftBill</span>
//           </div>

//           <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//             <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
//             <li><a href="#" onClick={() => setMenuOpen(false)}>Features</a></li>
//             <li><a href="#" onClick={() => setMenuOpen(false)}>Pricing</a></li>
//             <li><a href="#" onClick={() => setMenuOpen(false)}>Contact</a></li>
            
//             {/* Mobile-only buttons inside menu */}
//             <div className="mobile-btns">
//               <a href="/login" className="btn login">Log In</a>
//               <a href="/signup" className="btn signup">Sign Up</a>
//             </div>
//           </ul>

//           <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? "✕" : "☰"}
//           </div>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="hero fade-in">
//         <div className="hero-container">
//           <div className="hero-text">
//             <span className="badge">New: Automated Reminders</span>
//             <h1>Simplify Your Billing <span className="highlight">with Ease</span></h1>
//             <p>
//               Effortlessly manage invoices, track payments, and organize
//               client records all in one place. Designed for modern teams.
//             </p>
//             <div className="hero-buttons">
//               <a href="/signup" className="btn primary-btn">Get Started Free</a>
//               <a href="#" className="btn secondary-btn">Watch Demo</a>
//             </div>
//             <small className="trial-text">Free 14-day trial — No credit card required</small>
//           </div>

//           <div className="hero-image">
//             <img src={heroImg} alt="Billing Dashboard" />
//             <div className="floating-card">
//               <p>+ $4,250.00</p>
//               <span>Received Today</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="features fade-in">
//         <div className="section-header">
//           <h2>Key Features</h2>
//           <p>Everything you need to get paid faster.</p>
//         </div>

//         <div className="feature-cards">
//           <div className="card">
//             <div className="icon-box blue">
//               <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Invoice" />
//             </div>
//             <h3>Invoice Generator</h3>
//             <p>Create professional, branded invoices in under 60 seconds.</p>
//           </div>

//           <div className="card">
//             <div className="icon-box orange">
//               <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Client" />
//             </div>
//             <h3>Client Management</h3>
//             <p>A centralized hub for all your client data and history.</p>
//           </div>

//           <div className="card">
//             <div className="icon-box purple">
//               <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="Payment" />
//             </div>
//             <h3>Payment Tracking</h3>
//             <p>Real-time notifications when your clients view and pay.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta-section fade-in">
//         <div className="cta-card">
//           <h2>Ready to transform your business?</h2>
//           <p>Join over 10,000+ freelancers managing their business with SwiftBill.</p>
//           <a href="/signup" className="cta-btn">Create Your Free Account</a>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="footer">
//         <div className="footer-content">
//           <div className="footer-logo">SwiftBill</div>
//           <div className="footer-links">
//             <a href="#">Privacy</a>
//             <a href="#">Terms</a>
//             <a href="#">Help</a>
//           </div>
//           <div className="copyright">© 2026 SwiftBill Inc.</div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Home.css"; // Your CSS file
import logo from "../assets/download (3).png";
import heroImg from "../assets/download (4).png";

function Home() {
  const [navActive, setNavActive] = useState(false);

  const toggleMenu = () => {
    setNavActive(!navActive);
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Vivek Vala",
      role: "Freelancer",
      img: "https://i.pravatar.cc/80?img=12",
      msg: "This system has revolutionized how I manage my invoices. It’s fast, efficient, and easy to use."
    },
    {
      name: "Gautam M",
      role: "Small Business Owner",
      img: "https://i.pravatar.cc/80?img=32",
      msg: "This has saved me so much time. I can create and send invoices in minutes."
    },
    {
      name: "Viki R",
      role: "Agency Owner",
      img: "https://i.pravatar.cc/80?img=56",
      msg: "A must-have tool for managing multiple clients. Billing and payments are super easy."
    }
  ];

  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="Logo" />
            <span>Invoice & Billing System</span>
          </div>

          {/* Links */}
          <ul className={`nav-links ${navActive ? "active" : ""}`}>
            <li><a href="#">Home</a></li>
            <li><a href="#">Feature</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Content</a></li>

            {/* Mobile Buttons */}
            <div className="nav-buttons mobile-btns">
              <Link to="/login" className="btn login">Login In</Link>
              <Link to="/signup" className="btn signup">Sign Up</Link>
            </div>
          </ul>

          {/* Desktop Buttons */}
          <div className="nav-buttons desktop-btns">
            <Link to="/login" className="btn login">Login In</Link>
            <Link to="/signup" className="btn signup">Sign Up</Link>
          </div>

          {/* Toggle */}
          <div className="menu-toggle" onClick={toggleMenu}>☰</div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>Simplify Your Billing<br />with Ease</h1>
            <p>
              Effortlessly manage invoices, track payments, and organize
              client records all in one place. Perfect for freelancers and SMEs.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn primary">Get Started</Link>
              <a href="#" className="btn secondary">Watch Demo</a>
            </div>
            <small>Free 14-day trial — No credit card required</small>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Billing Illustration" />
          </div>
        </div>
      </section>
      <hr />

      {/* FEATURES */}
      <section className="features">
        <h2>Key Feature</h2>
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Invoice Generator" />
            <h3>Invoice Generator</h3>
            <p>Create professional invoices quickly and easily.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Client Management" />
            <h3>Client Management</h3>
            <p>Keep track of all your clients and their billing history.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="Payment Tracking" />
            <h3>Payment Tracking</h3>
            <p>Monitor payment status and get paid faster.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="subtitle">Create and send invoices in just a few simple steps:</p>
        <div className="steps">
          <div className="step-card">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Create Invoice" />
            <h3>Create Invoice</h3>
            <p>Enter client details, add items, and generate a professional invoice with ease.</p>
          </div>
          <div className="step-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2989/2989993.png" alt="Send & Track" />
            <h3>Send & Track</h3>
            <p>Send the invoice directly to your client and track its status in real-time.</p>
          </div>
          <div className="step-card">
            <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Get Paid Faster" />
            <h3>Get Paid Faster</h3>
            <p>Track payments and get notified when invoices are paid.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Users Are Saying</h2>
        <div className="testimonial-cards">
          {testimonials.map((user, idx) => (
            <div key={idx} className="testimonial">
              <div className="stars">★★★★★</div>
              <div className="user">
                <img src={user.img} alt={user.name} />
                <div>
                  <h4>{user.name}</h4>
                  <span>{user.role}</span>
                </div>
              </div>
              <p>{user.msg}</p>
              <div className="socials">
                <i>in</i><i>ig</i><i>gh</i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Get Started Today!</h2>
        <p>Join thousands of freelancers and SMEs who have streamlined their billing with ease.</p>
        <Link to="/signup" className="cta-btn">Sign Up for Free</Link>
        <small>Free 14-day trial — No credit card required</small>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand">
              <img src={logo} alt="Logo" />
              <span>Invoice & Billing System</span>
            </div>
            <p>Empowering freelancers and SMEs to manage finances with ease.</p>
            <div className="social-icons">
              <a href="#">in</a><a href="#">ig</a><a href="#">gh</a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Watch Demo</a></li>
                <li><a href="#">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4>Support & Resources</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal & Security</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 SwiftBill. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Home;


