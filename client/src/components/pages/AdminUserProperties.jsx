import React, { useEffect, useState } from "react";
import "./AdminUserProperties.css";

const AdminUserProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      "https://real-estate-website-ai2s.onrender.com/api/properties/admin/user-properties"
    );
    const data = await res.json();
    setProperties(data.properties || []);
  };

  const updateApproval = async (id, status) => {
    await fetch(
      `https://real-estate-website-ai2s.onrender.com/api/properties/approve/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    fetchData();
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete property?")) return;

    await fetch(
      `https://real-estate-website-ai2s.onrender.com/api/properties/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchData();
  };

  const togglePremium = async (id) => {
    await fetch(
      `https://real-estate-website-ai2s.onrender.com/api/properties/premium/${id}`,
      {
        method: "PUT",
      }
    );

    fetchData();
  };

 return (
  <div className="admin-user-properties">
    <div className="header">
      <div>
        <h2>👤 User Properties</h2>
        <p>Users Post Properties</p>
      </div>
      <div className="count">
        Showing {properties.length} properties
      </div>
    </div>

    <div className="table-container">
      <table className="property-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Type</th>
            <th>Price</th>
            <th>Area</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((p) => (
            <tr key={p._id}>
              <td className="id">
                {p.propertyId || "PR-" + p._id.slice(-4)}
              </td>

              <td className="title">{p.title}</td>

              <td className="location">{p.location}</td>

              <td>
                <span className="type">{p.type}</span>
              </td>

              <td className="price">
                ₹ {p.price?.toLocaleString("en-IN") || 0}
              </td>

              <td>{p.sqft} sqft</td>

              <td>
                <span className={`status ${p.approvalStatus?.toLowerCase()}`}>
                  {p.approvalStatus}
                </span>
              </td>

              <td>
                {new Date(p.createdAt).toLocaleDateString("en-IN")}
              </td>

              <td>
                <div className="actions">

                  {/* EDIT */}
                  <button
                    className="edit-btn"
                    onClick={() =>
                      window.location.href = `/admin/edit-property/${p._id}`
                    }
                  >
                    ✏️
                  </button>

                  {/* DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteProperty(p._id)}
                  >
                    🗑
                  </button>

                  {/* APPROVAL */}
                  <select
                    className="approval-select"
                    value={p.approvalStatus}
                    onChange={(e) =>
                      updateApproval(p._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {/* PREMIUM */}
                  <button
                    className={`star-btn ${p.isPremium ? "active" : ""}`}
                    onClick={() => togglePremium(p._id)}
                  >
                    ⭐
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default AdminUserProperties;