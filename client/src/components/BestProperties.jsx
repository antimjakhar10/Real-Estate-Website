import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./BestProperties.css";

const BestProperties = () => {
  const [activeTab, setActiveTab] = useState("View All");

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties?featured=true&limit=8")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperties(data.properties);
      })
      .catch((err) => console.log(err));
  }, []);

  const categories = [
    "View All",
    "Apartment",
    "Commercial",
    "Land Or Plot",
    "Farm",
  ];

  const filteredProperties =
    activeTab === "View All"
      ? properties
      : properties.filter((property) => property.category === activeTab);

  return (
    <section className="best-properties">
      <div className="container">
        <p className="subtitle">— Popular Properties —</p>
        <h2 className="section-title">Best Properties Sale</h2>

        <div className="filter-buttons-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="property-grid">
          {filteredProperties.map((property, index) => {
            return (
              <motion.div
                className="property-card"
                key={property._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/property-details/${property._id}`}
                  className="image-wrapper"
                >
                  <img src={property.image} alt={property.title} />
                  <span className="badge">For Sale</span>
                </Link>

                <div className="card-content">
                  <Link
                    to={`/property-details/${property._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h3>{property.title}</h3>
                  </Link>

                  <p className="location">{property.location}</p>

                  <div className="card-bottom">
                    <span className="price">₹{property.price}</span>

                    <div className="btn-group">
                      <a
                        href={`https://wa.me/919999999999?text=Hello I am interested in ${property.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="query-btn"
                      >
                        <FaWhatsapp />
                      </a>

                      <Link
                        to={`/property-details/${property._id}`}
                        className="view-btn-link"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestProperties;
