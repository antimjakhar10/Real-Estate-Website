const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    image: String,
    author: String,
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);