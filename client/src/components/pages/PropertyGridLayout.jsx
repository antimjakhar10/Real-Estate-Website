import React from "react";
import "./PropertyGridLayout.css";

const PropertyGridLayout = ({ properties = [] }) => {

  const getImageUrl = (images, image) => {
    let finalImage = null;

    // priority: images array
    if (images && images.length > 0) {
      finalImage = images[0];
    }
    // fallback: single image field
    else if (image) {
      finalImage = image;
    }

    if (!finalImage) {
      return "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
    }

    if (finalImage.startsWith("http")) return finalImage;

    if (finalImage.includes("uploads")) {
      return `https://real-estate-website-ai2s.onrender.com/${finalImage.replace(/^\/+/, "")}`;
    }

    return `https://real-estate-website-ai2s.onrender.com/uploads/${finalImage}`;
  };

  return (
    <div className="property-grid">
      {properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        properties.map((p) => (
          <div key={p._id} className="property-card">

            {/* IMAGE */}
            <div className="property-image-container">
              <img
                src={getImageUrl(p.images, p.image)}
                alt={p.title}
                className="property-thumbnail"
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
                }}
              />
            </div>

            {/* DETAILS */}
            <div className="property-details">
              <h4 className="property-title">{p.title}</h4>
              <p className="property-location">{p.location}</p>

              <p className="property-price">
                ₹ {p.price ? Number(p.price).toLocaleString("en-IN") : "0"}
              </p>

              <p className="property-status">
                Status:{" "}
                <span
                  className={`status-text ${p.approvalStatus?.toLowerCase()}`}
                >
                  {p.approvalStatus || "Pending"}
                </span>
              </p>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default PropertyGridLayout;