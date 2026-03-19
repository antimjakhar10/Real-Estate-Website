const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://real-estate-website-ai2s.onrender.com"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

const path = require("path");

const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin/auth", adminAuthRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/blogs", require("./routes/blogRoutes"));

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
const userRoutes = require("./routes/userRoutes");

app.use("/api/properties", propertyRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.use("/api/users", userRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});