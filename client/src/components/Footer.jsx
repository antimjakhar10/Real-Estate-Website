import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const galleryImages = [
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400",
  ];

  return (
    <footer className="footer-container">
      {/* --- TOP SECTION: INFO COLUMNS --- */}
      <div className="footer-top">
        <div className="footer-col about">
          <h4>
            <a href="/about">About R3 Developers</a>
          </h4>
          <p className="about-text">
            R3 developer is a luxury to the resilience, adaptability, Spacious
            modern villa living room with centrally placed swimming pool
            blending indooroutdoor.
          </p>
          <div className="contact-details">
            <p>
              <span>📞</span> +91 8684031003
            </p>
            <p>
              <span>✉</span> r3developers@gmail.com
            </p>
            <p>
              <span>📍</span> Dwarka, Delhi
            </p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Featured Houses</h4>
          <ul>
            <li>
              <span className="red-icon">🏠</span> #Villa
            </li>
            <li>
              <span className="red-icon">🏠</span> #Commercial
            </li>
            <li>
              <span className="red-icon">🏠</span> #Farm Houses
            </li>
            <li>
              <span className="red-icon">🏠</span> #Apartments
            </li>
            <li>
              <span className="red-icon">🏠</span> #Apartments
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <span className="red-icon">🏠</span> Strategy Services
            </li>
            <li>
              <span className="red-icon">🏠</span> Management
            </li>
            <li>
              <span className="red-icon">🏠</span> Privacy & Policy
            </li>
            <li>
              <span className="red-icon">🏠</span> Sitemap
            </li>
            <li>
              <span className="red-icon">🏠</span> Term & Conditions
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <span className="red-icon">🏠</span> Help Center
            </li>
            <li>
              <span className="red-icon">🏠</span> FAQs
            </li>
            <li>
              <span className="red-icon">🏠</span> Contact Us
            </li>
            <li>
              <span className="red-icon">🏠</span> Ticket Support
            </li>
            <li>
              <span className="red-icon">🏠</span> Live Chat
            </li>
          </ul>
        </div>

        <div className="footer-col map-col">
          <h4>R3 Developers Location</h4>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps?q=Dwarka+Delhi&output=embed"
              width="100%"
              height="120"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: COPYRIGHT & SOCIALS --- */}
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

      {/* --- FIXED CORNER SCROLL BUTTON --- */}
      <motion.div
        className="fixed-scroll-btn"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span>↑</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
