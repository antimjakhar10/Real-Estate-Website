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

    const res = await fetch(
      "http://localhost:5000/api/properties/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

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
          showActions={false}
          showApproval={true}
        />
      </div>
    </div>
  );
};

export default AdminCustomersList;