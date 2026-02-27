import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Home,
  PlusSquare,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openProperty, setOpenProperty] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "show" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
        <h2 className="admin-logo">🏢 RealEstate Admin</h2>

        <div
          className={`admin-menu-item ${
            isActive("/admin-dashboard") ? "active" : ""
          }`}
          onClick={() => navigate("/admin-dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div
          className={`admin-menu-item ${
            isActive("/admin-enquiries") ? "active" : ""
          }`}
          onClick={() => navigate("/admin-enquiries")}
        >
          <Mail size={18} />
          Enquiries
        </div>

        <div
          className={`admin-menu-item ${
            isActive("/admin-contacts") ? "active" : ""
          }`}
          onClick={() => navigate("/admin-contacts")}
        >
          <Mail size={18} />
          Contact Messages
        </div>

        {/* Property */}
        <div className="admin-section">
          <div
            className="admin-section-header"
            onClick={() => setOpenProperty(!openProperty)}
          >
            <span>
              <Home size={18} /> Property
            </span>
            <ChevronDown size={16} />
          </div>

          {openProperty && (
            <div className="admin-submenu">
              <div
                className={`admin-menu-item ${
                  isActive("/admin-properties") ? "active" : ""
                }`}
                onClick={() => navigate("/admin-properties")}
              >
                • List View
              </div>

              <div
                className={`admin-menu-item ${
                  isActive("/admin-property-grid") ? "active" : ""
                }`}
                onClick={() => navigate("/admin-property-grid")}
              >
                • Grid View
              </div>

              <div
                className={`admin-menu-item ${
                  isActive("/admin-add-property") ? "active" : ""
                }`}
                onClick={() => navigate("/admin-add-property")}
              >
                <PlusSquare size={16} />
                Add Property
              </div>
            </div>
          )}
        </div>

        {/* Customers */}
        <div className="admin-section">
          <div
            className="admin-section-header"
            onClick={() => setOpenCustomers(!openCustomers)}
          >
            <span>👥 Customers</span>
            <ChevronDown size={16} className={openCustomers ? "rotate" : ""} />
          </div>

          {openCustomers && (
            <div className="admin-submenu">
              <div
                className={`admin-menu-item ${
                  isActive("/admin-customers-list") ? "active" : ""
                }`}
                onClick={() => navigate("/admin-customers-list")}
              >
                • List View
              </div>

              <div
                className={`admin-menu-item ${
                  isActive("/admin-customers-grid") ? "active" : ""
                }`}
                onClick={() => navigate("/admin-customers-grid")}
              >
                • Grid View
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <div
          className="admin-logout"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin-login");
          }}
        >
          <LogOut size={18} />
          Logout
        </div>
      </div>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-header">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h3>Admin Dashboard</h3>
          <div className="admin-welcome">Welcome, Admin 👋</div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
