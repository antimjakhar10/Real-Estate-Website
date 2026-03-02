import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bed, Bath, Maximize2, Star } from "lucide-react";
import axios from "axios";
import "./PropertyGrid.css";

export default function PropertyGrid() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:5000/api/properties/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setProperties(res.data);
      } else if (Array.isArray(res.data.properties)) {
        setProperties(res.data.properties);
      } else if (Array.isArray(res.data.data)) {
        setProperties(res.data.data);
      } else {
        setProperties([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const getImageUrl = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0 || !images[0]) {
      return "http://localhost:5000/uploads/no-image.jpg";
    }

    const image = images[0];

    if (typeof image !== 'string' || image.trim() === "") {
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

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="admin-property-grid">
      {/* Header */}
      <div className="grid-header">
        <h2>Property Grid</h2>

        <button
          onClick={() => navigate("/admin-add-property")}
          className="add-property-btn"
        >
          + Add Property
        </button>
      </div>

      {/* Grid */}
      <div className="grid-container">
        {properties.map((property) => (
          <div key={property._id} className="grid-card">
            <img
              src={getImageUrl(property.images)}
              alt={property.title}
              className="grid-image"
              onError={(e) => {
                if (!e.target.src.includes("no-image.jpg")) {
                  e.target.src = "http://localhost:5000/uploads/no-image.jpg";
                }
              }}
            />

            <div className="grid-card-body">
              <h3 className="grid-price">
                ₹{property.price?.toLocaleString("en-IN")}
              </h3>

              <h4 className="grid-title">{property.title}</h4>

              <p className="grid-location">{property.location}</p>

              <div className="grid-meta">
                <span>
                  <Bed size={16} /> {property.bedrooms}
                </span>

                <span>
                  <Bath size={16} /> {property.bathrooms}
                </span>

                <span>
                  <Maximize2 size={16} /> {property.sqft} sqft
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
