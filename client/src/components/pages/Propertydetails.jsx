import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./PropertyDetails.css";

const PropertyDetails = () => {
  // Find property by ID - convert id to number since URL params are strings
  const { id } = useParams();

   const getImageUrl = (image) => {
    if (!image || image.trim() === "") {
      return "http://localhost:5000/uploads/no-image.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (!image.includes("/")) {
      return `http://localhost:5000/uploads/${image}`;
    }

    return `http://localhost:5000/${image.replace(/\\/g, "/")}`;
  };

  const [propertyData, setPropertyData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const imageUrl = propertyData
  ? getImageUrl(propertyData.image)
  : null;


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setPropertyData(data); // backend direct object bhej raha hai
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);


  useEffect(() => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  }, [imageUrl]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!propertyData) {
    return <h2 style={{ textAlign: "center" }}>Property Not Found</h2>;
  }

  // Media items using property image
 const mediaItems = [
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4", // demo video
  },
  {
    type: "image",
    src: imageUrl,
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
];

  // Use highlights from property data or default
  const highlights =
    propertyData.highlights?.length > 0
      ? propertyData.highlights
      : [
          { icon: "fa-tag", label: "ID NO.", value: "#N/A" },
          { icon: "fa-house", label: "Type", value: "N/A" },
          { icon: "fa-door-open", label: "Room", value: "0" },
          { icon: "fa-bed", label: "Bedroom", value: "0" },
          { icon: "fa-bath", label: "Bath", value: "0" },
          { icon: "fa-seedling", label: "Big Yard", value: "0" },
          {
            icon: "fa-house-circle-check",
            label: "Purpose",
            value: "For Sale",
          },
          { icon: "fa-ruler-combined", label: "Sqft", value: "0" },
          { icon: "fa-car", label: "Parking", value: propertyData.parking },
          { icon: "fa-elevator", label: "Elevator", value: "No" },
          { icon: "fa-wifi", label: "Wifi", value: "No" },
          { icon: "fa-calendar-days", label: "Built in", value: "N/A" },
        ];

  // Use amenities from property data or default
  let amenities = [];

  if (propertyData.amenities) {
    if (Array.isArray(propertyData.amenities)) {
      amenities = propertyData.amenities;
    } else if (typeof propertyData.amenities === "string") {
      try {
        const cleaned = propertyData.amenities.trim();
        amenities = JSON.parse(cleaned);
      } catch (error) {
        // agar JSON.parse fail ho jaye
        amenities = propertyData.amenities
          .replace(/[\[\]"]/g, "")
          .split(",")
          .map((item) => item.trim());
      }
    }
  }

  // Use nearby locations from property data or default
  const nearbyLocations =
    propertyData.nearbyLocations?.length > 0
      ? propertyData.nearbyLocations
      : [
          {
            name: "HDFC Bank",
            dist: "500m",
            icon: "fa-building-columns",
            color: "#3b82f6",
          },
          {
            name: "City Hospital",
            dist: "1.2km",
            icon: "fa-hospital",
            color: "#ef4444",
          },
          {
            name: "Green Park",
            dist: "300m",
            icon: "fa-tree",
            color: "#22c55e",
          },
          {
            name: "St. Xavier School",
            dist: "800m",
            icon: "fa-school",
            color: "#f59e0b",
          },
        ];

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
          propertyId: propertyData._id,
        }),
      });

      const data = await response.json();

      if (data.success) {
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

  return (
    <div className="property-details-page">
      <Navbar />

      {/* Hero Section */}
      <section className="pd-hero-section">
        <div className="pd-hero-overlay">
          <motion.div
            className="pd-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{propertyData.title}</h1>

            <div className="pd-breadcrumb">
              <Link to="/">Home</Link>
              <span className="separator">›</span>
              <span className="active-page">{propertyData.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pd-view-section">
        <div className="container">
          <div className="pd-view-grid">
            {/* LEFT SIDE: 360 View, Thumbnails & Details */}
            <div className="pd-view-left">
              {/* Main Image Container */}
              <div className="pd-main-display">
               {selectedImage && (
  selectedImage.endsWith(".mp4") ? (
    <video
      src={selectedImage}
      controls
      className="pd-featured-img"
    />
  ) : (
    <img
      src={selectedImage}
      alt="Property"
      className="pd-featured-img"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "http://localhost:5000/uploads/no-image.jpg";
      }}
    />
  )
)}
              </div>
              {/* Thumbnails Row */}
              <div className="pd-thumbnails-row">
                {mediaItems.map((item, index) => (
                  <div
                    key={index}
                    className={`pd-thumb ${
                      item.src === selectedImage ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(item.src)}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt="thumb"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "http://localhost:5000/uploads/no-image.jpg";
                        }}
                      />
                    ) : (
                      <div className="video-thumb">
                        <video src={item.src} />
                        <div className="play-icon">▶</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* About Property Content */}
              <div className="pd-about-property-info">
                <div className="pd-info-top-tags">
                  <div className="pd-left-tags">
                    <span className="featured-badge">Featured</span>
                    <span className="info-tag">
                      <i className="fa-regular fa-calendar"></i>{" "}
                      {propertyData.yearBuilt || "2024"}
                    </span>
                    <span className="info-tag">
                      <i className="fa-regular fa-comment"></i> No Comments
                    </span>
                  </div>
                  <div className="pd-wishlist-icon">
                    <i className="fa-regular fa-heart"></i>
                  </div>
                </div>

                <div className="pd-title-price-row">
                  <h2>About This Property</h2>
                  <span className="pd-price-val">₹{propertyData.price}</span>
                </div>

                <div className="pd-location-specs-bar">
                  <div className="pd-loc">
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {propertyData.location}
                  </div>
                  <div className="pd-specs">
                    <span>
                      <i className="fa-solid fa-bed"></i> Bed{" "}
                      {propertyData.bedrooms || 0}
                    </span>
                    <span className="spec-sep">|</span>
                    <span>
                      <i className="fa-solid fa-bath"></i> Bath{" "}
                      {propertyData.bathrooms || 0}
                    </span>
                    <span className="spec-sep">|</span>
                    <span>
                      <i className="fa-solid fa-vector-square"></i>{" "}
                      {propertyData.sqft || 0} sqft
                    </span>
                  </div>
                </div>

                <div className="pd-main-desc">
                  <p>{propertyData.description}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Sidebar Widgets */}
            <div className="pd-contact-sidebar">
              <div className="custom-contact-card">
                <h2>Contact Us</h2>
                <form className="custom-form">
                  <div className="custom-input-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="custom-input-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="custom-input-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      required
                    />
                  </div>
                  <div className="custom-input-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="custom-send-btn"
                    disabled={submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? "Sending..." : "Send Us"}
                  </button>
                </form>
              </div>

              <motion.div
                className="sidebar-agency-banner"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="agency-banner-overlay">
                  <h3>We can help you to find real estate agency</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="agency-contact-btn"
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
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <i className={`fa-brands ${social.icon}`}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Highlights Section */}
      <section className="pd-highlights-section">
        <div className="pd-highlights-header-new">
          <h2 className="pd-main-heading">Property Highlights</h2>
        </div>

        <div className="pd-highlights-wrapper">
          {/* LEFT SIDE */}
          <div className="pd-highlights-card">
            <div className="sale-status-new">
              <span className="dot"></span> {propertyData.type} for sale
            </div>

            <div className="pd-highlights-grid">
              {highlights.map((item, index) => (
                <div className="highlight-item" key={index}>
                  <div className="highlight-icon">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="highlight-text">
                    <span>{item.label}</span>
                    <h4>{item.value}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="pd-nearby-card-new">
            <h3>Nearby Locations</h3>

            <div className="nearby-list-new">
              {nearbyLocations.map((loc, i) => (
                <div className="nearby-item-new" key={i}>
                  <div className="nearby-icon">
                    <i className={`fa-solid ${loc.icon}`}></i>
                  </div>
                  <div>
                    <h5>{loc.name}</h5>
                    <p>{loc.dist} away</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="pd-modern-gallery-container">
        <div className="pd-gallery-title-row">
          <h2>From Amazing Gallery</h2>
        </div>

        <div className="pd-asymmetric-grid">
          <div className="pg-tile-new span-2">
            <img
              src={
                propertyData.image
                  ? imageUrl
                  : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
              }
              alt="G4"
              onClick={() =>
                setPreviewImage(
                  propertyData.image
                    ? imageUrl
                    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
                )
              }
            />
            <div className="pg-badge">Main View</div>
          </div>

          <div className="pg-tile-new row-2">
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="G2"
              onClick={() =>
                setPreviewImage(
                  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
                )
              }
            />
          </div>

          <div className="pg-tile-new active-highlight">
            <img
              src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="G3"
              onClick={() =>
                setPreviewImage(
                  "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
                )
              }
            />
          </div>

          <div className="pg-tile-new span-2">
            <img
              src={
                propertyData.image
                  ? imageUrl
                  : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
              }
              alt="G4"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
                )
              }
            />
          </div>

          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400"
              alt="G5"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400",
                )
              }
            />
          </div>
          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400"
              alt="G6"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400",
                )
              }
            />
          </div>
          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400"
              alt="G7"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
                )
              }
            />
          </div>

          <div className="pg-tile-new row-2">
            <img
              src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="G8"
              onClick={() =>
                setPreviewImage(
                  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
                )
              }
            />
          </div>

          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
              alt="G9"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
                )
              }
            />
          </div>
          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400"
              alt="G10"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
                )
              }
            />
          </div>

          <div className="pg-tile-new pg-more-dark">
            <img
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400"
              alt="G11"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400",
                )
              }
            />
          </div>
          <div className="pg-tile-new">
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400"
              alt="G12"
              onClick={() =>
                setPreviewImage(
                  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Features & Amenities Section */}
      <div className="pd-amenities-card-wrapper">
        <div className="pd-amenities-content">
          <h2 className="section-title-main">Features & amenities</h2>

          <div className="pd-amenities-list-grid">
            {amenities.map((item, index) => (
              <div key={index} className="amenity-list-item">
                <div className="custom-checkbox-box">
                  <i className="fa-solid fa-check"></i>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="pd-location-card-wrapper">
        <div className="pd-location-content">
          <h2 className="section-title-main">Location</h2>

          <div className="pd-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <div className="map-info-floating-card">
              <div className="info-card-img">
                <img
                  src={imageUrl}
                  alt="Prop"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "http://localhost:5000/uploads/no-image.jpg";
                  }}
                />
              </div>
              <div className="info-card-details">
                <p>
                  <strong>Address:</strong>
                  <br />
                  {propertyData.location}
                </p>
              </div>
            </div>

            <div className="map-zoom-controls">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyData.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-larger-btn"
                style={{ textDecoration: "none" }}
              >
                View larger map
              </a>
            </div>
          </div>
        </div>
      </div>

      {previewImage && (
        <div className="lightbox-overlay" onClick={() => setPreviewImage(null)}>
          <div className="lightbox-content">
            <img src={previewImage} alt="Preview" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetails;
