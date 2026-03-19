import React, { useState } from "react";
import "./AdminAddBlog.css";

const AdminAddBlog = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {

      const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/blogs", {
        method: "POST",
        body: formData
      });

      if (res.ok) {

        alert("Blog Added Successfully ✅");

        setTitle("");
        setContent("");
        setImage(null);

      }

    } catch (error) {

      console.error("Error:", error);

    }

  };

  return (
    <div className="admin-add-blog-container">
      <h2>Add Blog</h2>

      <form className="admin-blog-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        />

        <button className="blog-submit-btn" type="submit">
          Add Blog
        </button>

      </form>
    </div>
  );
};

export default AdminAddBlog;