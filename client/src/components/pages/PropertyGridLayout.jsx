import React from "react";
import "./PropertyGridLayout.css";

const PropertyGridLayout = ({ properties }) => {
  const getImageUrl = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0 || !images[0]) {
      return "https://real-estate-website-ai2s.onrender.com/uploads/no-image.jpg";
    }
    const image = images[0];
    if (typeof image !== 'string' || image.trim() === "") return "https://real-estate-website-ai2s.onrender.com/uploads/no-image.jpg";
    if (image.startsWith("http")) return image;
    return image.includes("/") 
      ? `https://real-estate-website-ai2s.onrender.com/${image.replace(/\\/g, "/")}`
      : `https://real-estate-website-ai2s.onrender.com/uploads/${image}`;
  };

  return (
    <div className="property-grid">
      {properties.map((p) => (
        <div key={p._id} className="property-card">
          <div className="property-image-container">
            <img src={getImageUrl(p.images)} alt={p.title} className="property-thumbnail" />
          </div>
          <div className="property-details">
            <h4 className="property-title">{p.title}</h4>
            <p className="property-location">{p.location}</p>
            <p className="property-price">₹ {p.price}</p>
            <p className="property-status">
              Status: <span className={`status-text ${p.approvalStatus?.toLowerCase()}`}>{p.approvalStatus || "Pending"}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyGridLayout;