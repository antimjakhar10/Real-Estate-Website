import React from "react";
import "./PropertyGridLayout.css";

const PropertyGridLayout = ({ properties }) => {
   return (
    <div className="property-grid">
      {properties.map((p) => (
        <div key={p._id} className="property-card">
          <h4 className="property-title">{p.title}</h4>
          <p className="property-location">{p.location}</p>
          <p className="property-price">{p.price}</p>
          <p className="property-status">
            Status: {p.approvalStatus || "Approved"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PropertyGridLayout;