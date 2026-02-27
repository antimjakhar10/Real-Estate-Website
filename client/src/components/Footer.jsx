import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const galleryImages = [
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];

  return (
    <footer className="footer-container">
      {/* --- TOP SECTION: INFO COLUMNS --- */}
      <div className="footer-top">
        <div className="footer-col about">
          <h4><a href="/about">About Pillar</a></h4>
          <p className="about-text">
            Pillar is a luxury to the resilience, adaptability, Spacious modern villa living room with centrally placed swimming pool blending indooroutdoor.
          </p>
          <div className="contact-details">
            <p><span>📞</span> +00 (123) 456 789 012</p>
            <p><span>✉</span> Infomail123@domain.com</p>
            <p><span>📍</span> West 2nd lane, Inner circular road, New York City</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Featured Houses</h4>
          <ul>
            <li><span className="red-icon">🏠</span> #Villa</li>
            <li><span className="red-icon">🏠</span> #Commercial</li>
            <li><span className="red-icon">🏠</span> #Farm Houses</li>
            <li><span className="red-icon">🏠</span> #Apartments</li>
            <li><span className="red-icon">🏠</span> #Apartments</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><span className="red-icon">🏠</span> Strategy Services</li>
            <li><span className="red-icon">🏠</span> Management</li>
            <li><span className="red-icon">🏠</span> Privacy & Policy</li>
            <li><span className="red-icon">🏠</span> Sitemap</li>
            <li><span className="red-icon">🏠</span> Term & Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><span className="red-icon">🏠</span> Help Center</li>
            <li><span className="red-icon">🏠</span> FAQs</li>
            <li><span className="red-icon">🏠</span> Contact Us</li>
            <li><span className="red-icon">🏠</span> Ticket Support</li>
            <li><span className="red-icon">🏠</span> Live Chat</li>
          </ul>
        </div>

        <div className="footer-col map-col">
          <h4>Pillar Location</h4>
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" height="130" style={{border:0, borderRadius: '8px'}} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* --- MIDDLE SECTION: LOGO + GALLERY --- */}
      <div className="footer-middle-row">
        <div className="brand-branding">
          <div className="logo-main-flex">
            <span className="logo-icon-red">📊</span>
            <div className="logo-titles">
              <h2>PILLER</h2>
              <p>Real Estate Solution</p>
            </div>
          </div>
        </div>

        <div className="insta-branding">
          <p className="insta-user-tag">@pillar on Instagram</p>
          <h3 className="gallery-title-main">Nice Gallery</h3>
        </div>

        <div className="gallery-flex-row">
          {galleryImages.map((img, index) => (
            <motion.div 
              key={index} 
              className="gallery-thumb"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <img src={img} alt="Property Gallery" />
              <div className="gallery-overlay-plus">+</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM SECTION: COPYRIGHT & SOCIALS --- */}
      <div className="footer-copyright-row">
        <p className="copy-text">Copyright © 2025 Piller. All Rights Reserved.</p>
        <div className="social-links-flex">
          {['f', 't', 'in', 'w'].map((social) => (
            <motion.span 
              key={social} 
              className="social-circle"
              whileHover={{ backgroundColor: '#ff4d4d', color: '#fff' }}
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
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <span>↑</span>
      </motion.div>
    </footer>
  );
};

export default Footer;