import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAddBlog.css";

const UserAddBlog = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("image", form.image);
    data.append("userId", user._id); // 🔥 important

    const res = await fetch("https://real-estate-website-ai2s.onrender.com/api/blogs", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("Blog submitted for approval ✅");
      navigate("/dashboard");
    } else {
      alert("Error ❌");
    }
  };

  return (
    <div className="user-blog-container">
      <div className="user-blog-card">
        <h2>Add Blog</h2>

        <input
          placeholder="Blog Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Blog Content"
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button onClick={handleSubmit}>Submit Blog</button>
      </div>
    </div>
  );
};

export default UserAddBlog;