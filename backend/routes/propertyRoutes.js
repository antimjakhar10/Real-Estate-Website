const { togglePremium } = require("../controllers/propertyController");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProperties,
  getAllPropertiesAdmin,
  createProperty,
  getPendingProperties,
  updateApprovalStatus,
} = require("../controllers/propertyController");

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
router.post("/", upload.single("image"), createProperty);

router.get("/admin/all", getAllPropertiesAdmin);

router.get("/pending", getPendingProperties);
router.put("/approve/:id", updateApprovalStatus);



router.get("/", getProperties);

router.get("/:id", async (req, res) => {
  try {
    const Property = require("../models/Property");
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Property not found" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const Property = require("../models/Property");

    const updateData = {
      ...req.body,
    };

    // amenities JSON parse
    if (req.body.amenities) {
      updateData.amenities = JSON.parse(req.body.amenities);
    }

    // image update only if new image uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Property.findByIdAndUpdate(req.params.id, updateData);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.put("/toggle-premium/:id", togglePremium);


module.exports = router;
