import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProperties.css";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
  if (!user || !user._id) {
    console.log("User not found ❌");
    return;
  }

  fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/user/${user._id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("API failed");
      }
      return res.json();
    })
    .then(data => {
      console.log("DATA:", data);
      setProperties(data.properties || []);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });

}, []);


  return (
  <div className="my-properties">
    <h2>My Properties</h2>

    <div className="property-list">
      {properties.map((p) => (
        <div key={p._id} className="property-row">
          
          <div className="col title">
            <h4>{p.title}</h4>
            <p>{p.location}</p>
          </div>

          <div className="col">
            ₹ {p.price || "N/A"}
          </div>

          <div className="col">
            {p.type}
          </div>

          <div className="col">
            <span
              className={`status-badge ${
                p.approvalStatus === "Approved"
                  ? "status-approved"
                  : p.approvalStatus === "Rejected"
                  ? "status-rejected"
                  : "status-pending"
              }`}
            >
              {p.approvalStatus}
            </span>
          </div>

          <div className="col actions">
            <button
              className="btn btn-edit"
              onClick={() => navigate(`/user/edit-property/${p._id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-view"
              onClick={() =>
                navigate(`/property-details/${p.slug || p._id}`)
              }
            >
              View
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
);
};

const card = {
  padding: "15px",
  margin: "10px 0",
  background: "#fff",
  borderRadius: "8px",
};

const status = (s) => ({
  background:
    s === "Approved" ? "green" :
    s === "Rejected" ? "red" : "orange",
  color: "#fff",
  padding: "4px 8px",
  borderRadius: "6px"
});

export default MyProperties;