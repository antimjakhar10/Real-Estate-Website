import React, { useEffect, useState } from "react";
import "./AdminUserBlogs.css";

const AdminUserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/blogs/admin/user-blogs");
    const data = await res.json();
    setBlogs(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/approve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchBlogs();
  };

  return (
    <div className="admin-blogs-container">
      <h2 className="admin-blogs-title">User Blogs Approval</h2>

      <div className="table-wrapper">
        <table className="admin-blogs-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                
                {/* IMAGE */}
                <td>
                  <img
                    src={blog.image}
                    alt="blog"
                    className="blog-image"
                  />
                </td>

                {/* TITLE */}
                <td>{blog.title}</td>

                {/* DATE */}
                <td>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`status-badge ${blog.approvalStatus.toLowerCase()}`}
                  >
                    {blog.approvalStatus}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(blog._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(blog._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserBlogs;