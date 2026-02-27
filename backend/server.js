const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const path = require("path");

const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin/auth", adminAuthRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    console.log("SERVER Connected DB:", mongoose.connection.name);
  })
  .catch((err) => console.log("MongoDB Error ❌", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Working 🚀");
});

const propertyRoutes = require("./routes/propertyRoutes");
const enquiryRoutes = require("./routes/enquiry");

app.use("/api/properties", propertyRoutes);
app.use("/api/enquiry", enquiryRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});