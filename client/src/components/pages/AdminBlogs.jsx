import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlogs.css";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const updateStatus = async (id, status) => {
  await fetch(`http://localhost:5000/api/blogs/approve/${id}`, {
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
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
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
        <table className="admin-blogs-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
              <th>Status</th>
              <th>Approval</th>
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
                    onClick={() => navigate(`/admin-edit-blog/${blog._id}`)}
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
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      color: "#fff",
                      background:
                        blog.approvalStatus === "Approved"
                          ? "green"
                          : blog.approvalStatus === "Rejected"
                            ? "red"
                            : "orange",
                    }}
                  >
                    {blog.approvalStatus}
                  </span>
                </td>

                <td>
                  <button
                    style={{
                      background: "green",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: "none",
                    }}
                    onClick={() => updateStatus(blog._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    style={{
                      background: "red",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: "none",
                      marginLeft: "5px",
                    }}
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

export default AdminBlogs;
