import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  {
    text: "Amazing service! Highly recommend. The team was very professional and efficient.",
    name: "Julia Era",
    role: "Property Owner",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100",
    rating: 5
  },
  {
    text: "Very satisfied with the quality and speed of work. Great experience overall.",
    name: "Michael Brown",
    role: "Investor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5
  },
  {
    text: "Exceeded my expectations. Friendly and efficient service, highly recommend Pillar.",
    name: "Sophia Lee",
    role: "Home Buyer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
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
