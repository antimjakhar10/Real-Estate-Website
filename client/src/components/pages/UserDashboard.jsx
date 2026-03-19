import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [properties, setProperties] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`https://real-estate-website-ai2s.onrender.com/api/properties/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setProperties(data));

    fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
  <div className="dashboard-main">
    <h2 className="dashboard-title">User Dashboard</h2>

    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-info">
          <p>Total Properties</p>
          <h3>{properties.length}</h3>
        </div>
        <div className="stat-icon">🏠</div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <p>Total Blogs</p>
          <h3>{blogs.length}</h3>
        </div>
        <div className="stat-icon">📝</div>
      </div>
    </div>
  </div>
);
};

export default UserDashboard;