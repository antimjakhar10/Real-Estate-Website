import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserLayout.css";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/user/login");
  };
    
  return (
    <div className="user-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>User Panel</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/user/add-property">Add Property</Link>
        <Link to="/my-properties">My Properties</Link>
        <Link to="/user-add-blog">Add Blog</Link>
        <Link to="/my-blogs">My Blogs</Link>
        <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
      </div>

      {/* CONTENT */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;