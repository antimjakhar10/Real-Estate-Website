import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyListLayout from "./PropertyListLayout";
import "./AdminCustomersList.css";

const AdminCustomersList = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/properties/customer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log("CUSTOMER API DATA:", data);
  if (data.properties) {
    setProperties(data.properties);
  }
};

  return (
    <div className="admin-customers-wrapper">
      <div className="admin-customers-container">
        <div className="admin-customers-header">
          <h2>👥 Customer Submitted Properties</h2>
          <p>Customers Post Properties</p>
        </div>

        <PropertyListLayout
          properties={properties}
          showActions={true}
          showApproval={true}
         onEdit={(id) =>
  navigate(`/admin/edit-property/${id}`, {
    state: { from: "customer" }
  })
}
          onDelete={async (id) => {
            const token = localStorage.getItem("adminToken");

            await fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            fetchPending();
          }}
          onTogglePremium={async (id) => {
            const token = localStorage.getItem("adminToken");

            await fetch(
              `https://real-estate-website-ai2s.onrender.com/api/properties/toggle-premium/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            fetchPending();
          }}
          onUpdateApproval={async (id, status) => {
            const token = localStorage.getItem("adminToken");

            await fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/approve/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status }),
            });

            fetchPending();
          }}
        />
      </div>
    </div>
  );
};

export default AdminCustomersList;
