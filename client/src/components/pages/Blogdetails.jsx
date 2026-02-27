import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { blogData } from "./Blogdata"
import "./BlogDetails.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};



const BlogDetails = () => {
  const { id } = useParams();
const blog = blogData.find((item) => item.id === parseInt(id));

if (!blog) {
  return <h2 style={{ textAlign: "center" }}>Blog Not Found</h2>;
}
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="blogdetails-hero">
        <div className="blogdetails-overlay"></div>

        <motion.div
          className="blogdetails-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Blog Details</h1>

          <div className="blogdetails-breadcrumb">
            <Link to="/">Home</Link>
            <span className="arrow"> &gt; </span>
            <span className="active">Blog Details</span>
          </div>
        </motion.div>
      </section>

      {/* Blog Content Section */}
      <section className="blogdetails-container">
        <motion.div
          className="blogdetails-wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >

          {/* Main Featured Image */}
          <motion.img
            variants={fadeUp}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Blog"
            className="blogdetails-main-image"
          />

          {/* Meta Info */}
          <motion.div variants={fadeUp} className="blogdetails-meta">
            <span>By Admin</span>
            <span>•</span>
            <span>February 18, 2026</span>
            <span>•</span>
            <span>3 Comments</span>
          </motion.div>

          {/* Title */}
          <motion.h2 variants={fadeUp} className="blogdetails-title">
            Modern Luxury Villa in the Heart of the City
          </motion.h2>

          {/* Paragraphs */}
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
            neque at volutpat cursus, nisl erat viverra elit, quis bibendum massa
            urna at dolor. Integer sit amet odio nec justo efficitur bibendum.
          </motion.p>

          <motion.p variants={fadeUp}>
            Donec facilisis velit vel est lacinia, vitae placerat risus interdum.
            Nulla facilisi. Cras malesuada urna at mauris convallis, nec ultricies
            libero facilisis.
          </motion.p>

          {/* Quote */}
          <motion.blockquote variants={fadeUp}>
            Real estate cannot be lost or stolen, nor can it be carried away.
            Purchased with common sense and managed with care, it is one of the
            safest investments.
          </motion.blockquote>

          <motion.p variants={fadeUp}>
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vivamus dignissim arcu non lorem tincidunt,
            sed facilisis tortor fermentum.
          </motion.p>

          {/* Image Gallery */}
          <motion.div variants={fadeUp} className="blogdetails-gallery">
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" alt="Gallery 1" />
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156" alt="Gallery 2" />
            <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994" alt="Gallery 3" />
          </motion.div>

          {/* Conclusion */}
          <motion.p variants={fadeUp}>
            Investing in premium real estate not only ensures financial growth
            but also provides long-term security and lifestyle benefits. Choosing
            the right property in the right location makes all the difference.
          </motion.p>

          {/* Tags Section */}
          <motion.div variants={fadeUp} className="blogdetails-tags">
            <span>Tags:</span>
            <a href="#">Real Estate</a>
            <a href="#">Investment</a>
            <a href="#">Luxury Living</a>
          </motion.div>

        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetails;