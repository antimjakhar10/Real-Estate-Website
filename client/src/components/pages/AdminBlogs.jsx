import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlogs.css";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // ✅ FIXED API
  const fetchBlogs = async () => {
    const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/blogs/admin/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="admin-blogs-container">
      <h2 className="admin-blogs-title">All Blogs</h2>

      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="admin-blogs-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img src={blog.image} alt="blog" className="blog-image" />
                </td>

                <td>{blog.title}</td>

                <td>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <select
                    value={blog.approvalStatus}
                    onChange={(e) => updateStatus(blog._id, e.target.value)}
                    className={`status-select ${blog.approvalStatus.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
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

export default AdminBlogs;