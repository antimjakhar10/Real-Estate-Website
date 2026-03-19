import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AdminEditBlog.css";

const AdminEditBlog = () => {

  const { id } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    alert("Blog Updated");
  };

  return (
    <div className="admin-edit-blog-container">
<h2 className="admin-edit-blog-title">Edit Blog</h2>
<form className="admin-edit-blog-form" onSubmit={handleSubmit}>

        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
        />

        <input
          name="image"
          value={blog.image}
          onChange={handleChange}
        />

        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
        />

        <button className="blog-update-btn" type="submit">
  Update Blog
</button>

      </form>
    </div>
  );
};

export default AdminEditBlog;