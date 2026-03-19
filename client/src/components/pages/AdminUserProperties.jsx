import React, { useEffect, useState } from "react";
import PropertyListLayout from "./PropertyListLayout";

const AdminUserProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/properties/admin/user-properties");
    const data = await res.json();
    setProperties(data.properties || []);
  };

  const updateApproval = async (id, status) => {
    await fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/approve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 User Properties</h2>

      <PropertyListLayout
        properties={properties}
        showActions={false}
        showApproval={true}
        onUpdateApproval={updateApproval}
      />
    </div>
  );
};

export default AdminUserProperties;