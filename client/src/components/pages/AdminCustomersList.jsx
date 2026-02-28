import React, { useEffect, useState } from "react";
import PropertyListLayout from "./PropertyListLayout";
import "./AdminCustomersList.css";

const AdminCustomersList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch("http://localhost:5000/api/properties/customer", {
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
          <p>Pending approval properties</p>
        </div>

        <PropertyListLayout
          properties={properties}
          showActions={true}
          showApproval={true}
          onEdit={(id) => (window.location.href = `/admin-edit-property/${id}`)}
          onDelete={async (id) => {
            const token = localStorage.getItem("adminToken");

            await fetch(`http://localhost:5000/api/properties/${id}`, {
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
              `http://localhost:5000/api/properties/toggle-premium/${id}`,
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

            await fetch(`http://localhost:5000/api/properties/approve/${id}`, {
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
