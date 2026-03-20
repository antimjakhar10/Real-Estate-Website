import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  {
    text: "R3 Developers helped me find the perfect home in Dwarka. The entire process was smooth, transparent, and hassle-free.",
    name: "Rahul Sharma",
    role: "Home Buyer, Dwarka",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    text: "I sold my property in Janakpuri through R3 Developers and got an excellent deal. Their team is professional and very supportive.",
    name: "Neha Verma",
    role: "Property Seller, Janakpuri",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    text: "I found a great rental option in Uttam Nagar within my budget. The team guided me at every step. Highly recommended service.",
    name: "Amit Yadav",
    role: "Tenant, Uttam Nagar",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Testimonials = () => {
  return (
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

        <div className="testimonial-cards">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              whileHover={{ scale: 1.05 }}
              variants={fadeInUp}
            >
              <div className="client-img-circle">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="testimonial-rating">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} color="#FBBF24" size={20} />
                ))}
              </div>
              <p className="quote-text">“{item.text}”</p>
              <h3 className="client-name">{item.name}</h3>
              <p className="client-role">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
