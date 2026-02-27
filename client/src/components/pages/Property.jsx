import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Bed, Bath, Maximize, Search } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Property.css";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Property = () => {
  const location = useLocation();

  const { locationName } = useParams();

  const formattedLocation = locationName
    ? locationName
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ")
    : "";

  const queryParams = new URLSearchParams(location.search);

  const filters = {
    type: queryParams.get("type") || "",
    location: queryParams.get("location") || "",
    range: queryParams.get("range") || "",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allProperties, setAllProperties] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [featuredProperties, setFeaturedProperties] = useState([]);

  // ✅ Price Format Function
  const formatPrice = (value) => {
    if (!value) return "";

    const number =
      typeof value === "number"
        ? value
        : Number(value.toString().replace(/,/g, ""));

    return "₹ " + number.toLocaleString("en-IN");
  };

 const getImageUrl = (image) => {
  if (!image || image.trim() === "") {
    return "http://localhost:5000/uploads/no-image.jpg";
  }

  // Agar already full URL hai
  if (image.startsWith("http")) {
    return image;
  }

  // Agar path me uploads/ already hai
  if (image.includes("uploads/")) {
    return `http://localhost:5000/${image.replace(/\\/g, "/")}`;
  }

  // Default case (sirf filename stored hai)
  return `http://localhost:5000/uploads/${image}`;
};

  useEffect(() => {
   fetch(
  `http://localhost:5000/api/properties?page=${currentPage}&limit=6${
    locationName
      ? `&location=${locationName}`
      : filters.location
        ? `&location=${filters.location}`
        : ""
  }${
    filters.type ? `&type=${filters.type}` : ""
  }${
    filters.range ? `&range=${filters.range}` : ""
  }`
)
      .then((res) => res.json())
      .then((data) => {
        setAllProperties(data.properties);
        setTotalPages(data.totalPages);
      });
  }, [currentPage, locationName, filters.type, filters.range]);

  useEffect(() => {
    setCurrentPage(1);
  }, [locationName]);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties?featured=true&limit=4")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProperties(data.properties);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          propertyId: "",
        }),
      });

      if (response.ok) {
        alert("Enquiry Sent Successfully ✅");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Something went wrong ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }

    setSubmitting(false);
  };

  const filteredProperties = allProperties;

  // Premium ko upar shift karo (same card use hoga)
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (a.premium) return -1;
    if (b.premium) return 1;
    return 0;
  });

  return (
    <div className="property-page-main">
      <Navbar />

      {/* Hero Section */}
      <section className="property-hero-section">
        <div className="property-hero-overlay">
          <motion.div
            className="property-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="property-main-title">
              {locationName
                ? `Properties in ${formattedLocation}`
                : "Properties"}
            </h1>
            <nav className="property-breadcrumb-nav">
              <Link to="/">Home</Link>
              <span className="separator">›</span>
              <span>Properties</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Listing Section */}
      <section className="property-list-container">
        <div className="property-content-wrapper">
          {/* LEFT SIDE */}
          <div className="property-left">
            {console.log(allProperties)}

            {/* Show Remaining Normal Properties */}
            {sortedProperties.map((property) => (
              <div key={property._id} className="property-card">
                <div className="property-card-image">
                  {property.premium && (
                    <span className="premium-badge">⭐ Premium</span>
                  )}
                  <img
                    src={getImageUrl(property.image)}
                    alt={property.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "http://localhost:5000/uploads/no-image.jpg";
                    }}
                  />
                </div>

                <div className="property-card-content">
                  <h3>{property.title}</h3>
                  <p className="location">📍 {property.location}</p>

                  <div className="property-features">
                    <span>
                      <Bed size={16} /> {property.bedrooms || 4} Bed
                    </span>
                    <span>
                      <Bath size={16} /> {property.bathrooms || 2} Bath
                    </span>
                    <span>
                      <Maximize size={16} /> {property.sqft || 1500} sqft
                    </span>
                  </div>

                  <div className="property-bottom">
                    <h4 className="property-price">
                      {formatPrice(property.priceValue || property.price)}
                    </h4>
                    <div className="property-buttons">
                      <button className="enquiry-btn">Enquiry</button>
                      <Link
                        to={`/property-details/${property._id}`}
                        className="view-more-btn"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <motion.div className="property-right" variants={fadeUp}>
            <motion.div className="search-box" variants={fadeUp}>
              <h3>Search</h3>
              <div className="search-input">
                <input type="text" placeholder="Enter Keyword" />
                <button>
                  <Search size={18} />
                </button>
              </div>
            </motion.div>

            <motion.div className="featured-box" variants={fadeUp}>
              <h3>Featured Listings</h3>
              {featuredProperties.map((property) => (
                <Link
                  key={property._id}
                  to={`/property-details/${property._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <motion.div className="featured-item" whileHover={{ x: 5 }}>
                    <img
                      src={getImageUrl(property.image)}
                      onError={(e) => (e.target.src = "/no-image.jpg")}
                      alt={property.title}
                    />
                    <div>
                      <h4>{property.title}</h4>
                      <p>
                        {property.bedrooms || 4} Bed • {property.bathrooms || 2}{" "}
                        Bath • {property.sqft || 1500} sqft
                      </p>
                      <span className="featured-price">
                        {formatPrice(property.priceValue || property.price)}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            <motion.div className="contact-form-box" variants={fadeUp}>
              <h3>Contact Us</h3>
              <form>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                />

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {submitting ? "Sending..." : "Send Us"}
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              className="sidebar-cta-box"
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
            >
              <div className="sidebar-cta-overlay">
                <h3>We can help you to find real estate agency</h3>
                <motion.button
                  className="cta-btn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact With Agent
                </motion.button>
              </div>
            </motion.div>

            {/* Social Connection Box */}
            <div className="social-box">
              <h3 className="social-title">Social Connections</h3>

              <div className="sidebar-social-no-gap">
                <div className="social-mini-row">
                  {[
                    { icon: "fa-whatsapp", class: "wa", link: "#" },
                    { icon: "fa-instagram", class: "ig", link: "#" },
                    { icon: "fa-facebook-f", class: "fb", link: "#" },
                    { icon: "fa-x-twitter", class: "tw", link: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      className={`mini-s-btn ${social.class}`}
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <i className={`fa-brands ${social.icon}`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Property;
