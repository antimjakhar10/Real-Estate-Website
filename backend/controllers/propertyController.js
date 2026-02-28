const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    let amenities = [];

    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities;
      } else {
        amenities = JSON.parse(req.body.amenities);
      }
    }

    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    }

    const newProperty = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      priceValue: Number(req.body.price),
      type: req.body.type,
      category: req.body.category,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      sqft: req.body.sqft,
      description: req.body.description,
      amenities,
      images: imagePaths,

      createdBy: "Customer",
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
    let amenities = [];

    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities;
      } else if (typeof req.body.amenities === "string") {
        amenities = JSON.parse(req.body.amenities);
      }
    }

    // ⚠️ IMPORTANT: image ko body se hata do
    const { image, ...rest } = req.body;

    const updateData = {
      ...rest,
      amenities,
    };

    // Agar new image upload hui ho tabhi update karo
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Property.findByIdAndUpdate(req.params.id, updateData);

    res.json({ message: "Property Updated Successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Update Failed ❌" });
  }
};

// ✅ ADMIN ONLY - NO PAGINATION
exports.getAllPropertiesAdmin = async (req, res) => {
  try {
    const properties = await Property.find({
      createdBy: "Admin",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCustomerProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      createdBy: "Customer",
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
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities;
      } else {
        amenities = [req.body.amenities];
      }
    }

    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    }

    const newProperty = new Property({
      ...req.body,
      amenities,
      images: imagePaths,
      approvalStatus: "Approved", // admin auto approve
      createdBy: "Admin", // 🔥 force admin
    });

    await newProperty.save();

    res.status(201).json({ message: "Admin Property Created ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error Creating Property ❌" });
  }
};
