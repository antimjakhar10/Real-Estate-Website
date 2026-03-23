import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";   // 👈 ADD THIS
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">

      {/* --- TOP SECTION --- */}
      <div className="footer-top">

        {/* ABOUT */}
        <div className="footer-col about">
          <h4><Link to="/about">About R3 Developers</Link></h4>

          <p className="about-text">
            R3 developer is a luxury to the resilience, adaptability, Spacious
            modern villa living room with centrally placed swimming pool
            blending indooroutdoor.
          </p>

          <div className="contact-details">
            <p><span>✉</span> r3capitaldevelopers@gmail.com</p>
            <p><span>📍</span> Dwarka, Delhi</p>
          </div>
        </div>

        {/* FEATURED HOUSES */}
        <div className="footer-col">
          <h4>Featured Houses</h4>
          <ul>
            <li><Link to="/property?type=villa"><span className="red-icon">🏠</span> Villa</Link></li>
            <li><Link to="/property?type=commercial"><span className="red-icon">🏠</span> Commercial</Link></li>
            <li><Link to="/property?type=farmhouse"><span className="red-icon">🏠</span> Farm Houses</Link></li>
            <li><Link to="/property?type=apartment"><span className="red-icon">🏠</span> Apartments</Link></li>
             <li><Link to="/property?type=land"><span className="red-icon">🏠</span> Land / Plots</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/"><span className="red-icon">🏠</span> Home</Link></li>
            <li><Link to="/property"><span className="red-icon">🏠</span> Property</Link></li>
            <li><Link to="/blog"><span className="red-icon">🏠</span> Blog</Link></li>
            <li><Link to="/contact"><span className="red-icon">🏠</span> Contact Us</Link></li>
            <li><Link to="/location/delhi"><span className="red-icon">🏠</span> Location</Link></li>
          </ul>
        </div>

        {/* MAP */}
        <div className="footer-col map-col">
          <h4>R3 Developers Location</h4>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps?q=Dwarka+Delhi&output=embed"
              width="100%"
              height="150"
              style={{ border: 0, borderRadius: "10px" }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>

      {/* --- BOTTOM --- */}
      <div className="footer-copyright-row">
        <p className="copy-text">
          Copyright © 2026 R3Developers. All Rights Reserved.
        </p>

        <div className="social-links-flex">
          {["f", "t", "in", "w"].map((social) => (
            <motion.span
              key={social}
              className="social-circle"
              whileHover={{ backgroundColor: "#ff4d4d", color: "#fff" }}
            >
              {social}
            </motion.span>
          ))}
        </div>
      </div>

      {/* SCROLL BUTTON */}
      <motion.div
        className="fixed-scroll-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </motion.div>
    </footer>
  );
};

export default Footer;