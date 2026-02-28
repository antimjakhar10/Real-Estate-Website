import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ variant }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== TOPBAR ===== */}
      <div className={`topbar ${scrolled ? "hide" : ""}`}>
        <div className="top-left">
          <span>✉ info@mail@example.com</span>
          <span>📞 +00 (123) 456 789 00</span>
        </div>
        <div className="top-right">
          <FaFacebookF /> <FaTwitter /> <FaLinkedinIn /> <FaWhatsapp />
          <span className="language">English</span>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav
        className={`navbar 
  ${scrolled ? "scrolled" : ""} 
  ${variant === "solid" ? "solid-nav" : ""}
`}
      >
        <div className="logo">
          <h2>PILLER</h2>
          <p>Real Estate Solution</p>
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Main nav links */}
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/property" onClick={handleLinkClick}>
              Property
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={handleLinkClick}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              Contact Us
            </Link>
          </li>
          <li className="nav-item dropdown-item">
            <span className="location-trigger">
              Location <i className="fa-solid fa-chevron-down"></i>
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/location/rohtak">Rohtak</Link>
              </li>
              <li>
                <Link to="/location/sonipat">Sonipat</Link>
              </li>
              <li>
                <Link to="/location/delhi">Delhi</Link>
              </li>
              <li>
                <Link to="/location/gurgaon">Gurgaon</Link>
              </li>
            </ul>
          </li>
          <li className="mobile-buttons">
  <button
    className="btn enquiry"
    onClick={() => {
      setMenuOpen(false);
      navigate("/contact");
    }}
  >
    Enquiry
  </button>

  <button
    className="btn post-property"
    onClick={() => {
      setMenuOpen(false);
      navigate("/post-property");
    }}
  >
    Post Free Property
  </button>

  <button
    className="btn login"
    onClick={() => {
      setMenuOpen(false);
      const token = localStorage.getItem("adminToken");

      if (token) {
        navigate("/admin-enquiries");
      } else {
        navigate("/admin-login");
      }
    }}
  >
    Login
  </button>
</li>
        </ul>

        {/* Right buttons */}
        <div className="nav-buttons">
          <button className="btn enquiry">Enquiry</button>
          <Link to="/post-property">
            <button className="btn post-property">Post Property</button>
          </Link>

          <button
            className="btn login"
            onClick={() => {
              const token = localStorage.getItem("adminToken");

              if (token) {
                navigate("/admin-enquiries"); // already logged in
              } else {
                navigate("/admin-login"); // login page
              }
            }}
          >
            Login
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
