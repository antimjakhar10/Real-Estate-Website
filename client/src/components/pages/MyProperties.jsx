import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/user/${user._id}`)
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div>
      <h2>My Properties</h2>

      {properties.map((p) => (
        <div key={p._id} style={card}>
          <h3>{p.title}</h3>
          <p>{p.location}</p>

          <span style={status(p.approvalStatus)}>
            {p.approvalStatus}
          </span>

          <div>
            <button onClick={() => navigate(`/edit-property/${p._id}`)}>
              Edit
            </button>

            <button onClick={() => navigate(`/property-details/${p.slug || p._id}`)}>
              View
            </button>
          </div>
        </div>
      ))}
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