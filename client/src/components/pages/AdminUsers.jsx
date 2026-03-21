import React, { useEffect, useState } from "react";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://real-estate-website-ai2s.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(
      `https://real-estate-website-ai2s.onrender.com/api/users/${id}`,
      {
        method: "DELETE",
      }
    );

    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="admin-users-container">
      <h2>👤 All Users</h2>

      {/* 🔥 TABLE WRAPPER */}
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;