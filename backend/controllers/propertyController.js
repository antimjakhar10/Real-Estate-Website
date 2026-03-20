const Property = require("../models/Property");

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

exports.createProperty = async (req, res) => {
  try {
    let amenities = [];
    let nearbyLocations = [];

    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities;
      } else {
        amenities = JSON.parse(req.body.amenities);
      }
    }

    if (req.body.nearbyLocations) {
      if (Array.isArray(req.body.nearbyLocations)) {
        nearbyLocations = req.body.nearbyLocations.map((item) => {
          try {
            return JSON.parse(item);
          } catch {
            return { name: item, dist: "" };
          }
        });
      } else {
        try {
          nearbyLocations = [JSON.parse(req.body.nearbyLocations)];
        } catch {
          nearbyLocations = [{ name: req.body.nearbyLocations, dist: "" }];
        }
      }
    }

    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    }

    let baseSlug = generateSlug(req.body.title);
    let slug = baseSlug;
    let count = 1;

    // duplicate slug avoid
    while (await Property.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const newProperty = new Property({
      title: req.body.title,
      slug,
      location: req.body.location,
      price: req.body.price,
      priceValue: Number(req.body.price),
      type: req.body.type,
      bedrooms: req.body.bedrooms || 0,
      bathrooms: req.body.bathrooms || 0,
      sqft: req.body.sqft || 0,
      parking: req.body.parking || 0,
      description: req.body.description,
      amenities,
      nearbyLocations,
      images: imagePaths,

      createdBy: req.body.createdBy || null,
createdByRole: req.body.createdByRole || "customer",
      approvalStatus: "Pending",
    });

    await newProperty.save();

    res.status(201).json({ message: "Property Created Successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Creating Property ❌" });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filter = {
      approvalStatus: "Approved",
    };

    if (req.query.featured === "true") {
      filter.featured = true;
    }

    if (req.query.location) {
      filter.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    if (req.query.type) {
      filter.type = req.query.type;
    }

    if (req.query.range && !isNaN(req.query.range)) {
      filter.price = { $lte: Number(req.query.range) };
    }

    const total = await Property.countDocuments(filter);

    // ✅ SINGLE QUERY (premium first)
    const properties = await Property.find(filter)
      .sort({ premium: -1, createdAt: -1 }) // premium on top
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Properties ❌" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    console.log("BODY 👉", req.body);

    let amenities = [];
    let nearbyLocations = [];

    // ✅ amenities fix
    if (req.body.amenities) {
      amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : [req.body.amenities];
    }

    // ✅ nearby safe parse
    if (req.body.nearbyLocations) {
      if (Array.isArray(req.body.nearbyLocations)) {
        nearbyLocations = req.body.nearbyLocations.map((item) => {
          try {
            return typeof item === "string" ? JSON.parse(item) : item;
          } catch {
            return { name: item, dist: "" };
          }
        });
      } else {
        try {
          nearbyLocations = [
            typeof req.body.nearbyLocations === "string"
              ? JSON.parse(req.body.nearbyLocations)
              : req.body.nearbyLocations,
          ];
        } catch {
          nearbyLocations = [
            { name: req.body.nearbyLocations, dist: "" },
          ];
        }
      }
    }

    // ✅ images
    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    }

    // ✅ 🔥 ONLY SAFE FIELDS
    const updateData = {
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      priceValue: Number(req.body.price),
      type: req.body.type,
      bedrooms: Number(req.body.bedrooms) || 0,
      bathrooms: Number(req.body.bathrooms) || 0,
      sqft: Number(req.body.sqft) || 0,
      parking: Number(req.body.parking) || 0,
      description: req.body.description,
      amenities,
      nearbyLocations,
    };

    // ✅ images only if uploaded
    if (imagePaths.length > 0) {
      updateData.images = imagePaths;
    }

    await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ message: "Property Updated Successfully ✅" });
  } catch (error) {
    console.log("UPDATE ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ ADMIN ONLY - NO PAGINATION
exports.getAllPropertiesAdmin = async (req, res) => {
  try {
   const properties = await Property.find({
  createdByRole: "admin",
}).sort({ createdAt: -1 });

    res.json({ properties });
  } catch (error) {
    console.log("FETCH ADMIN ERROR 👉", error); // 🔥 ADD THIS
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCustomerProperties = async (req, res) => {
  try {
    const properties = await Property.find({
  createdByRole: "customer",
}).sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateApprovalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await Property.findByIdAndUpdate(req.params.id, {
      approvalStatus: status,
    });

    res.json({ message: "Status Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update Failed" });
  }
};

exports.togglePremium = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!property.premium) {
      const premiumCount = await Property.countDocuments({ premium: true });

      if (premiumCount >= 3) {
        return res.status(400).json({
          message: "Only 3 premium properties allowed",
        });
      }
    }

    property.premium = !property.premium;
    await property.save();

    res.json({ message: "Premium status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createPropertyAdmin = async (req, res) => {
  try {
    let amenities = [];

    if (req.body.amenities) {
      amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : [req.body.amenities];
    }

    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    }

    let baseSlug = generateSlug(req.body.title);
    let slug = baseSlug;
    let count = 1;

    while (await Property.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const newProperty = new Property({
      ...req.body,
      slug,
      amenities,
      images: imagePaths,
      approvalStatus: "Approved",

      createdBy: null,
      createdByRole: "admin",
    });

    await newProperty.save();

    res.status(201).json({ message: "Admin Property Created ✅" });
  } catch (error) {
    console.log("ADMIN CREATE ERROR 👉", error); // 🔥 ADD THIS
    res.status(500).json({ error: "Error Creating Property ❌" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully ✅" });
  } catch (error) {
    console.error("Delete Property Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting property ❌" });
  }
};

exports.getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      approvalStatus: "Pending",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const userId = req.params.userId;

    const properties = await Property.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserProperties = async (req, res) => {
  const properties = await Property.find({
    createdBy: req.params.userId,
  }).sort({ createdAt: -1 });

  res.json(properties);
};

exports.getUserSubmittedProperties = async (req, res) => {
  try {
    const properties = await Property.find({
  createdByRole: "user",
}).sort({ createdAt: -1 });

    res.json({ properties });
  } catch (error) {
    console.log("USER PROPERTY ERROR 👉", error);
    res.status(500).json({ message: "Server Error" });
  }
};
