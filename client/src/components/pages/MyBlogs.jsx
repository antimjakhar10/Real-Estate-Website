import React, { useEffect, useState } from "react";
import "./MyBlogs.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  

  useEffect(() => {
    fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/user/${user._id}`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="myblogs-container">
      <h2 className="myblogs-title">My Blogs</h2>

      <div className="myblogs-table-wrapper">
        <div className="table-scroll">
          <table className="myblogs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td className="blog-title">{b.title}</td>

                <td>
                  <span className={`status-badge ${b.approvalStatus.toLowerCase()}`}>
                    {b.approvalStatus}
                  </span>
                </td>

                <td>
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "-"}
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

export default MyBlogs;