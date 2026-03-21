const { togglePremium } = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const { createPropertyAdmin } = require("../controllers/propertyController");
const { getMyProperties } = require("../controllers/propertyController");
const { getUserProperties } = require("../controllers/propertyController");
const { getUserSubmittedProperties } = require("../controllers/propertyController");
const fs = require("fs");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProperties,
  getAllPropertiesAdmin,
  createProperty,
  getCustomerProperties,
  updateApprovalStatus,
  updateProperty
} = require("../controllers/propertyController");


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// 🔥 Proper Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes

router.post("/", upload.array("images", 10), createProperty);

router.post(
  "/admin",
  upload.array("images", 10),
  createPropertyAdmin
);


router.get("/admin/all", getAllPropertiesAdmin);

router.get("/customer", getCustomerProperties);
router.put("/approve/:id", updateApprovalStatus);
router.put("/toggle-premium/:id", togglePremium);



router.get("/", getProperties);

const { deleteProperty, getPendingProperties } = require("../controllers/propertyController");
router.delete("/:id", deleteProperty);
router.get("/pending", getPendingProperties);

router.get("/my/:userId", getMyProperties);
router.get("/user/:userId", getUserProperties);
router.get("/admin/user-properties", getUserSubmittedProperties);

router.get("/:idOrSlug", async (req, res) => {
  try {
    const Property = require("../models/Property");

    let property;

    // check if MongoDB ObjectId
    if (req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      property = await Property.findById(req.params.idOrSlug);
    } else {
      property = await Property.findOne({ slug: req.params.idOrSlug });
    }

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", upload.array("images", 10), updateProperty);



module.exports = router;
