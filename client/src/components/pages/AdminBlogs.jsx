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
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={blog.image}
                    alt="blog"
                    className="blog-image"
                  />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;