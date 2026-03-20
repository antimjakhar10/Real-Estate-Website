import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://real-estate-website-ai2s.onrender.com/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`https://real-estate-website-ai2s.onrender.com/api/users/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 All Users</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
      }}>
        <thead>
          <tr style={{ background: "#0f172a", color: "#fff" }}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Role</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.email}</td>
              <td style={td}>{u.role}</td>

              <td style={td}>
                <button style={btnDelete} onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = { padding: "12px", textAlign: "left" };
const td = { padding: "10px" };

const btnDelete = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default AdminUsers;