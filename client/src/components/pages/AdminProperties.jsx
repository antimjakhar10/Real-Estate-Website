 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyListLayout from "./PropertyListLayout";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch("http://localhost:5000/api/properties/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (Array.isArray(data)) {
      setProperties(data);
    } else if (Array.isArray(data.properties)) {
      setProperties(data.properties);
    } else if (Array.isArray(data.data)) {
      setProperties(data.data);
    } else {
      setProperties([]);
    }
  };

  

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");

    await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProperties((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (id) => {
  navigate(`/admin-edit-property/${id}`);
};

  const handleTogglePremium = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/toggle-premium/${id}`,
        {
          method: "PUT",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Premium status updated ✅");

      // Reload list
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

 const handleUpdateApproval = async (id, status) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(
    `http://localhost:5000/api/properties/approve/${id}`, // 👈 CHANGE HERE
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Update failed");
    return;
  }

  fetchProperties();
};

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "600" }}>🏠 Properties</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Manage all listed properties
          </p>
        </div>

        <button
          onClick={() => navigate("/admin-add-property")}
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}
        >
          + Add Property
        </button>
      </div>

      {/* Table Card */}
      <PropertyListLayout
        properties={properties}
        showActions={true}
        showApproval={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePremium={handleTogglePremium}
        onUpdateApproval={handleUpdateApproval}
      />
    </div>
  );
};
export default AdminProperties;