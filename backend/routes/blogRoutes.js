const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");


// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// GET single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ CREATE BLOG
router.post("/", upload.single("image"), async (req, res) => {
  try {

    const { title, content } = req.body;

    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    const newBlog = new Blog({
      title,
      content,
      image,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);

  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
});


// ✅ DELETE BLOG
router.delete("/:id", async (req, res) => {
  try {

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});


// ✅ UPDATE BLOG
router.put("/:id", async (req, res) => {
  try {

    const { title, image, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, image, content },
      { new: true }
    );

    res.json(updatedBlog);

  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

module.exports = router;