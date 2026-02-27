import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { FaUser, FaComments } from "react-icons/fa";
import {blogData} from "./Blogdata";
import "./Blog.css";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};



const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(blogData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = blogData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />

      <section className="blog-hero">
        <div className="blog-overlay"></div>

        <motion.div
          className="blog-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Blog Grid</h1>

          <div className="blog-breadcrumb">
            <Link to="/">Home</Link>
            <span className="arrow"> &gt; </span>
            <span className="active">Blog Grid</span>
          </div>
        </motion.div>
      </section>

      <section className="blog-grid-section">
        <motion.div
          className="blog-container"
          variants={containerVariant}
          initial="hidden"
          animate="show"
          key={currentPage}
        >
          {currentBlogs.map((blog) => (
            <Link
  to={`/blog-details/${blog.id}`}
  style={{ textDecoration: "none", color: "inherit" }}
>
  <motion.div
    className="blog-card"
    variants={fadeUp}
    whileHover={{ y: -8 }}
  >
    <div className="blog-img">
      <img src={blog.image} alt={blog.title} />
      <span className="date-badge">{blog.date}</span>
    </div>

    <div className="blog-card-content">
      <div className="blog-meta">
        <span>
          <FaUser /> {blog.author}
        </span>
        <span>
          <FaComments /> {blog.comments}
        </span>
      </div>

      <h3>{blog.title}</h3>

      <button className="read-btn">
        Read More
      </button>
    </div>
  </motion.div>
</Link>
          ))}
        </motion.div>
      </section>

      {/* ===== Pagination ===== */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          ›
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
