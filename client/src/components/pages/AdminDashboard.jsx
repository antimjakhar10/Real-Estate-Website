import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
const navigate = useNavigate();

  const [stats, setStats] = useState({
    properties: 0,
    enquiries: 0,
    newEnquiries: 0,
  });

  useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin-login");
  } else {
    fetchStats();
  }
}, [navigate]);

 const fetchStats = async () => {
  const token = localStorage.getItem("adminToken");

  try {
    const propRes = await fetch(
      "http://localhost:5000/api/properties/admin/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const props = await propRes.json();

    const enqRes = await fetch(
      "http://localhost:5000/api/enquiry",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const enqs = await enqRes.json();

    setStats({
      properties: Array.isArray(props) ? props.length : 0,
      enquiries: Array.isArray(enqs) ? enqs.length : 0,
      newEnquiries: Array.isArray(enqs)
        ? enqs.filter((e) => e.status === "New").length
        : 0,
    });

  } catch (error) {
    console.error(error);
  }
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