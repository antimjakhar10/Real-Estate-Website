import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    enquiries: 0,
    newEnquiries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const propRes = await fetch("http://localhost:5000/api/properties");
    const props = await propRes.json();

    const enqRes = await fetch("http://localhost:5000/api/enquiry");
    const enqs = await enqRes.json();

    setStats({
      properties: props.length || 0,
      enquiries: enqs.length || 0,
      newEnquiries: enqs.filter((e) => e.status === "New").length,
    });
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card purple">
          <h3>Total Properties</h3>
          <p>{stats.properties}</p>
        </div>

        <div className="dashboard-card green">
          <h3>Total Enquiries</h3>
          <p>{stats.enquiries}</p>
        </div>

        <div className="dashboard-card red">
          <h3>New Enquiries</h3>
          <p>{stats.newEnquiries}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;