import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AdminEditBlog.css";

const AdminEditBlog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ FETCH BLOG
  useEffect(() => {
    fetch(`https://real-estate-website-ai2s.onrender.com/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog({
          title: data.title || "",
          content: data.content || "",
        });

        // 🔥 show existing image
        if (data.image) {
          setPreview(data.image);
        }
      });
  }, [id]);

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ❌ REMOVE IMAGE
  const removeImage = () => {
    setImageFile(null);
    setPreview("");
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", blog.title);
    formData.append("content", blog.content);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch(
      `https://real-estate-website-ai2s.onrender.com/api/blogs/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    alert("Blog Updated ✅");
  };

  return (
    <div className="admin-edit-blog-container">
      <h2 className="admin-edit-blog-title">Edit Blog</h2>

      <form className="admin-edit-blog-form" onSubmit={handleSubmit}>
        {/* TITLE */}
        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Enter blog title"
        />

        {/* IMAGE SECTION */}
        <div
          className="upload-box"
          onClick={() => document.getElementById("blogImage").click()}
        >
          <input
            id="blogImage"
            type="file"
            hidden
            onChange={handleImage}
          />

          {preview ? (
            <div className="preview-wrapper">
              <img src={preview} alt="preview" className="preview-img" />

              <span className="remove-btn" onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}>
                ❌
              </span>
            </div>
          ) : (
            <>
              <p>Click to Upload Blog Image</p>
              <small>PNG, JPG up to 5MB</small>
            </>
          )}
        </div>

        {/* CONTENT */}
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Enter blog content"
        />

        <button className="blog-update-btn" type="submit">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default AdminEditBlog;