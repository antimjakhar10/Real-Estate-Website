import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bed, Bath, Maximize2 } from "lucide-react";
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
        "https://real-estate-website-ai2s.onrender.com/api/properties/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API DATA:", res.data);

      if (Array.isArray(res.data)) {
        setProperties(res.data);
      } else if (Array.isArray(res.data.properties)) {
        setProperties(res.data.properties);
      } else {
        setProperties([]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getImageUrl = (images, image) => {
    let finalImage = null;

    if (images && images.length > 0) {
      finalImage = images[0];
    } else if (image) {
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

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="grid-container">
      {properties.map((p) => (
        <div key={p._id} className="grid-card">

          <img
            src={getImageUrl(p.images, p.image)}
            alt={p.title}
            className="grid-image"
            onError={(e) => {
              e.target.src =
                "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
            }}
          />

          <div className="grid-card-body">
            <h3 className="grid-price">
              ₹ {p.price ? Number(p.price).toLocaleString("en-IN") : "0"}
            </h3>

            <h4 className="grid-title">{p.title}</h4>

            <p className="grid-location">{p.location}</p>

            <div className="grid-meta">
              <span>
                <Bed size={16} /> {p.bedrooms || 0}
              </span>

              <span>
                <Bath size={16} /> {p.bathrooms || 0}
              </span>

              <span>
                <Maximize2 size={16} /> {p.sqft || 0} sqft
              </span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}