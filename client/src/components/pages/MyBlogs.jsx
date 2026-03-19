import React, { useEffect, useState } from "react";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/user/${user._id}`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <h2>My Blogs</h2>

      {blogs.map((b) => (
        <div key={b._id} style={card}>
          <h3>{b.title}</h3>

          <span style={status(b.approvalStatus)}>
            {b.approvalStatus}
          </span>
        </div>
      ))}
    </div>
  );
};

const card = {
  padding: "15px",
  margin: "10px 0",
  background: "#fff",
};

const status = (s) => ({
  background:
    s === "Approved" ? "green" :
    s === "Rejected" ? "red" : "orange",
  color: "#fff",
  padding: "4px 8px",
});

export default MyBlogs;