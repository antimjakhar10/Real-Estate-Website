import React, { useEffect, useState } from "react";

const AdminUserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs/admin/user-blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/blogs/approve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchBlogs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 User Blogs</h2>

      <table style={{ width: "100%", background: "#fff" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>

              <td>{b.approvalStatus}</td>

              <td>
                <button onClick={() => updateStatus(b._id, "Approved")}>
                  Approve
                </button>

                <button onClick={() => updateStatus(b._id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserBlogs;