const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");


// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ approvalStatus: "Approved" }).sort({ createdAt: -1 });
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
    const { title, content, userId } = req.body;

    const image = req.file
      ? `https://real-estate-website-ai2s.onrender.com/uploads/${req.file.filename}`
      : "";

    const newBlog = new Blog({
      title,
      content,
      image,
      createdBy: userId,       // 🔥 NEW
      approvalStatus: "Pending" // 🔥 NEW
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

router.put("/approve/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Blog.findByIdAndUpdate(req.params.id, {
      approvalStatus: status,
    });

    res.json({ message: "Blog status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.get("/user/:userId", async (req, res) => {
  const blogs = await Blog.find({
    createdBy: req.params.userId
  }).sort({ createdAt: -1 });

  res.json(blogs);
});

router.get("/admin/user-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({
      createdBy: { $ne: null },
    }).sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.log("BLOG ERROR 👉", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

