import React, { useEffect, useState } from "react";
import PropertyGridLayout from "./PropertyGridLayout";
import "./AdminCustomersGrid.css";

const AdminCustomersGrid = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCustomerProperties();
  }, []);

  const fetchCustomerProperties = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch("http://localhost:5000/api/properties/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("CUSTOMER GRID DATA:", data);

    if (data.properties) {
      setProperties(data.properties);
    }
  };

  return (
    <div className="admin-customers-grid-wrapper">
      <div className="admin-customers-grid-header">
        <h2>👥 Customer Properties (Grid)</h2>
        <p>Customer Post Properties</p>
      </div>

      <div className="admin-customers-grid-card">
        <PropertyGridLayout properties={properties} />
      </div>
    </div>
  );
};

export default AdminCustomersGrid;