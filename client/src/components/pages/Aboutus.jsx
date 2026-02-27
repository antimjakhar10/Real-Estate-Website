import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar'; 
import Footer from '../Footer';
import { motion, useInView, animate } from 'framer-motion';

// Testimonial Carousel ke liye imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import './AboutUs.css';

const featureData = [
  { id: "01", icon: "🏠", title: "Easy To Rent", desc: "Velox surgo clarus confido carus video lumen virtus spes decerno...", btnText: "Find A Home" },
  { id: "02", icon: "🤝", title: "Carefully Crafted", desc: "Altus cedo tantillus video patrocinor valeo vestrum credo virtus.", btnText: "Sell A Home" },
  { id: "03", icon: "🌱", title: "Eco-Friendly & Green", desc: "Technology is revolutionizing the other legal Technology the legal", btnText: "Rent A Home" },
  { id: "04", icon: "💰", title: "Lavish Greenary", desc: "Confido carus video lumen Velox surgo ok virtus spes decerno.", btnText: "Find A Home" },
  { id: "05", icon: "🧥", title: "In-built Wardrobe", desc: "Velox surgo clarus home of other the cedo virtus spes decerno.", btnText: "Sell A Home" },
  { id: "06", icon: "🏗️", title: "Planned Construction", desc: "Altus cedo tantillus video patrocinor subseco vestrum credo virtus.", btnText: "Rent A Home" },
  { id: "07", icon: "👨‍👩‍👧‍👦", title: "Family & Community", desc: "Technology is revolutionizing the legal tantillus Technology the legal", btnText: "Find A Home" },
  { id: "08", icon: "🔐", title: "Tech & Security", desc: "Confido carus video lumen Velox clarus tantillus virtus spes decerno.", btnText: "Rent A Home" },
];

const Counter = ({ from, to, title, icon, suffix = "+" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, from, to]);

  return (
    <div className="counter-item" ref={ref}>
      <div className="counter-icon">{icon}</div>
      <div className="counter-text">
        <h3>{count}{suffix}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

const Aboutus = () => {
  // Common Animation Settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="about-page-wrapper">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>About Us</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link> <span> &gt; </span> <span className="active-page">About Us</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* 2. Discover Luxury Property Section */}
      <motion.section className="luxury-discovery" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container discovery-grid">
          <div className="discovery-images">
            <div className="img-column side-column">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" alt="villa" className="small-img" />
              <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400" alt="home" className="small-img" />
              <img src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400" alt="luxury" className="small-img" />
            </div>
            <div className="img-column main-column">
              <div className="main-img-wrapper">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600" alt="main villa" className="large-img" />
              </div>
            </div>
            <div className="img-column side-column">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400" alt="property" className="small-img" />
              <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400" alt="farm" className="small-img" />
            </div>
          </div>
          <div className="discovery-content">
            <p className="subtitle">— About Us —</p>
            <h2 className="main-title">Discover Our Luxury Property, with Full Amenities</h2>
            <p className="desc-text">Simply scan the QR code on the right with your phone's camera, then click the prompt to open the app download page.</p>
            <div className="features-grid">
              <div className="feature-item"><div className="icon-box red-icon">📋</div><div><h3>Quality Services</h3><p>Deals with issues in the exhaust system, ensuring</p></div></div>
              <div className="feature-item"><div className="icon-box red-icon">💬</div><div><h3>Clients Feedback</h3><p>Ensuring the exhaust system deals issues properly.</p></div></div>
              <div className="feature-item"><div className="icon-box red-icon">🏠</div><div><h3>Space Belongings</h3><p>Ensuring that issues in the system are dealt with.</p></div></div>
              <div className="feature-item"><div className="icon-box red-icon">🛡️</div><div><h3>Personal Liability</h3><p>Exhaust system deals with all issues efficiency.</p></div></div>
            </div>
            <div className="discovery-footer">
              <button className="more-btn"><a href="/about">More About Us</a></button>
              <div className="consulting"><div className="phone-icon">📞</div><div><span>Free Consulting</span><strong>+00 (123) 456789 00</strong></div></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Signature Features */}
<motion.section className="signature-features" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
  <div className="container">
    <div className="features-header">
      <div><p className="subtitle">— Signature Features —</p><h2 className="main-title">See how Pillar can Help</h2></div>
      <button className="view-all-btn">View All Services</button>
    </div>
    <div className="features-container">
      {featureData.map((item, idx) => (
        <motion.div className="feature-card" key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
          {/* Top Section: Icon and Number */}
          <div className="feature-card-content">
            <div className="card-top">
              <div className="f-icon">{item.icon}</div>
              <span className="f-num">{item.id}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>

          {/* Bottom Section: Button Locked at Bottom */}
          <div className="feature-card-footer">
            <button className="action-btn">
              <Link to="/property">{item.btnText}</Link>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

      {/* 4. Team Members Section (Original Struct Restored) */}
      <section className="team-section">
        <div className="container">
          <motion.div className="team-header text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="subtitle">— Team Members —</p>
            <h2 className="main-title">Meet Our Pillar Agents</h2>
          </motion.div>
          <div className="agents-grid">
            {/* Agent Card 1 */}
            <motion.div className="agent-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="pentagon-container">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Thomas" className="agent-img" />
                <div className="agent-socials">
                  <span className="s-icon">in</span>
                  <span className="s-icon">✉</span>
                </div>
              </div>
              <div className="agent-details">
                <h3>Thomas Kirlin</h3>
                <p>Listing Coordinator</p>
              </div>
            </motion.div>
            {/* ... Agent 2, 3, 4 (Same pattern) */}
            <motion.div className="agent-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="pentagon-container">
                <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Vickie" className="agent-img" />
                <div className="agent-socials"><span className="s-icon">in</span><span className="s-icon">✉</span></div>
              </div>
              <div className="agent-details"><h3>Vickie Wisozk</h3><p>Real Estate Manager</p></div>
            </motion.div>
            <motion.div className="agent-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="pentagon-container">
                <img src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Renee" className="agent-img" />
                <div className="agent-socials"><span className="s-icon">in</span><span className="s-icon">✉</span></div>
              </div>
              <div className="agent-details"><h3>Renee Strosin</h3><p>Property Developer</p></div>
            </motion.div>
            <motion.div className="agent-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="pentagon-container">
                <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Zulia" className="agent-img" />
                <div className="agent-socials"><span className="s-icon">in</span><span className="s-icon">✉</span></div>
              </div>
              <div className="agent-details"><h3>Zulia Era</h3><p>Listing Coordinator</p></div>
            </motion.div>
          </div>
          <div className="team-footer">
            <p>
              Explore Property agents are here to help with all your buying, renting and selling goals. 
              Find the home of your dreams with an expert you can trust. <span className="chat-link">Let's chat</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Stats Section */}
      <section className="stats-section">
        <div className="stats-overlay">
          <div className="container stats-grid">
            <Counter from={0} to={1950} title="Project Handover" icon="🏢" />
            <div className="stats-divider"></div>
            <Counter from={0} to={2} title="Monthly Visitors" icon="🏢" suffix="m" />
            <div className="stats-divider"></div>
            <Counter from={0} to={850} title="Property Ready" icon="🏢" />
            <div className="stats-divider"></div>
            <Counter from={0} to={98} title="Happy Customers" icon="🏢" suffix="%" />
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
<motion.section
  className="testimonials-section"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
>
  <div className="container">
    <div className="testimonial-header text-center">
      <p className="subtitle-red"><span>—</span> Testimonials <span>—</span></p>
      <h2 className="main-heading">What Clients Say About Pillar</h2>
    </div>

    <div className="quote-wrapper text-center">
      <span className="big-quote">“</span>
    </div>

    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation={{ nextEl: '.btn-next', prevEl: '.btn-prev' }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="testimonial-main-swiper"
    >

      {/* Slide 1 */}
      <SwiperSlide>
        <div className="testimonial-body text-center">
          <p className="quote-text">
            “Tenax comitatus ambulo regnum eligo, conturbo vis caelum cohors.
            Infit ustulo adoptio collum, speciosus lumen soluta.”
          </p>
          <div className="stars-row">⭐⭐⭐⭐⭐</div>
          <div className="client-info-centered">
            <div className="client-img-circle">
              <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100" alt="Julia" />
            </div>
            <h3 className="client-name">Julia Era</h3>
            <p className="client-role">Property Owner</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="testimonial-body text-center">
          <p className="quote-text">
            “Pellentesque habitant morbi tristique senectus et netus.
            Nulla facilisi donec vulputate sapien nec.”
          </p>
          <div className="stars-row">⭐⭐⭐⭐⭐</div>
          <div className="client-info-centered">
            <div className="client-img-circle">
              <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100" alt="Vickie" />
            </div>
            <h3 className="client-name">Vickie Wisozk</h3>
            <p className="client-role">Real Estate Manager</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="testimonial-body text-center">
          <p className="quote-text">
            “Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum.
            Integer posuere erat a ante venenatis.”
          </p>
          <div className="stars-row">⭐⭐⭐⭐⭐</div>
          <div className="client-info-centered">
            <div className="client-img-circle">
              <img src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=100" alt="Renee" />
            </div>
            <h3 className="client-name">Renee Strosin</h3>
            <p className="client-role">Property Developer</p>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>

    <div className="nav-line-container">
      <button className="nav-round-btn btn-prev">←</button>
      <motion.div
        className="horizontal-red-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <button className="nav-round-btn btn-next">→</button>
    </div>

    <div className="trust-footer-row">
      <div className="trust-item">
        <div className="brand-group">
          <span className="trust-green">★</span>
          <span className="brand-name">Trustpilot</span>
        </div>
        <div className="avatar-group">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
          <span className="count-tag">+59K</span>
        </div>
        <div className="rating-info">
          <div className="mini-stars">⭐⭐⭐⭐⭐</div>
          <p>19k+ clients</p>
        </div>
      </div>

      <div className="vertical-divider">|</div>

      <div className="trust-item">
        <div className="brand-group">
          <span className="google-blue">G</span>
          <span className="brand-name">Google</span>
        </div>
        <div className="avatar-group">
          <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="" />
          <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="" />
          <span className="count-tag">+29K</span>
        </div>
        <div className="rating-info">
          <div className="mini-stars">⭐⭐⭐⭐⭐</div>
          <p>25k+ clients</p>
        </div>
      </div>
    </div>
  </div>
</motion.section>


      {/* 7. Contact CTA Section  */}
      <section className="contact-cta-section">
        <div className="cta-container">
          <div className="cta-bg-image">
            <div className="cta-overlay">
              <motion.div className="cta-map-wrapper" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Link to="/property" className="map-circle-link">
                  <div className="map-ripple"></div>
                  <div className="map-circle">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=300" alt="Property Map" />
                    <div className="map-marker">📍</div>
                  </div>
                </Link>
                <div className="map-label">
                  <div className="arrow-svg">
                    <svg width="60" height="40" viewBox="0 0 60 40">
                      <path d="M10 10 Q 30 5 50 30" stroke="white" fill="transparent" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="white" /></marker></defs>
                    </svg>
                  </div>
                  <p>Find Fast Our Latest Properties</p>
                </div>
              </motion.div>
              <motion.div className="cta-form-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="subtitle red-text">— Get In Touch —</p>
                <h2 className="form-title">Let's Talk Your Property Goal</h2>
                <form className="cta-form">
                  <div className="form-row">
                    <div className="form-group"><label>Name*</label><input type="text" placeholder="Your Name" required /></div>
                    <div className="form-group"><label>Email*</label><input type="email" placeholder="Email Address" required /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Desired Date*</label><input type="date" required /></div>
                    <div className="form-group"><label>Desired Time*</label><input type="text" placeholder="Desired Time" required /></div>
                  </div>
                  <div className="form-group"><label>Additional Message</label><textarea placeholder="Please write any note here..."></textarea></div>
                  <button type="submit" className="submit-btn">Submit Now</button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="moving-text-banner">
          <div className="scrolling-text">
            <span>🏠 Luxury Home Available - Explore Now!</span>
            <span>🏠 Deluxe Cottages</span>
            <span>🏠 Rental Houses</span>
            <span>🏠 Luxury Home Available - Explore Now!</span>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default Aboutus;