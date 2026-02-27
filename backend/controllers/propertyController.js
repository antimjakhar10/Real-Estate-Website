const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    let amenities = [];

    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities;
      } else if (typeof req.body.amenities === "string") {
        const parsed = JSON.parse(req.body.amenities);

        if (Array.isArray(parsed)) {
          amenities = parsed;
        }
      }
    }

    const newProperty = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      priceValue: req.body.priceValue,
      type: req.body.type,
      category: req.body.category,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      sqft: req.body.sqft,
      yearBuilt: req.body.yearBuilt,
      parking: req.body.parking,
      elevator: req.body.elevator,
      wifi: req.body.wifi,
      pool: req.body.pool,
      description: req.body.description,
      featured: req.body.featured,
      amenities: amenities,
      image: req.file ? req.file.filename : "",
      approvalStatus: "Pending",
      createdBy: "Customer",
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

    const filter = {};

    filter.approvalStatus = "Approved";

    // ✅ Featured filter
    if (req.query.featured === "true") {
      filter.featured = true;
    }

    // ✅ Location filter (case insensitive)
    if (req.query.location) {
      filter.location = {
        $regex: req.query.location,
        $options: "i",
      };
    }

    // ✅ Type filter
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // ✅ Price range filter
    if (req.query.range) {
      filter.priceValue = { $lte: Number(req.query.range) };
    }

    const total = await Property.countDocuments(filter);

    // Step 1: Get top 3 premium properties
    const premiumProperties = await Property.find({
      ...filter,
      premium: true,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    // Step 2: Get normal properties
    const normalProperties = await Property.find({
      ...filter,
      premium: { $ne: true },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Step 3: Combine them
    const properties = [...premiumProperties, ...normalProperties];

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
      amenities
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
    const properties = await Property.find().sort({
      premium: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
