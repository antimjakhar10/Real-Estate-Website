const Property = require("../models/Property");

// 🔥 Helpers
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const toNumber = (val) => {
  if (val === undefined || val === null || val === "") return 0;
  const num = Number(val);
  return isNaN(num) ? 0 : num;
};

const parseAmenities = (data) => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

const parseNearby = (data) => {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data.map((item) => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch {
        return { name: item, dist: "" };
      }
    });
  }

  try {
    return [typeof data === "string" ? JSON.parse(data) : data];
  } catch {
    return [{ name: data, dist: "" }];
  }
};

// ================= CREATE =================
exports.createProperty = async (req, res) => {
  try {
    const amenities = parseAmenities(req.body.amenities);
    const nearbyLocations = parseNearby(req.body.nearbyLocations);

    const imagePaths = req.files?.map((f) => f.filename) || [];

    let baseSlug = generateSlug(req.body.title);
    let slug = baseSlug;
    let count = 1;

    while (await Property.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const newProperty = new Property({
      ...req.body,
      slug,
      priceValue: toNumber(req.body.price),
      bedrooms: toNumber(req.body.bedrooms),
      bathrooms: toNumber(req.body.bathrooms),
      sqft: toNumber(req.body.sqft),
      parking: toNumber(req.body.parking),
      amenities,
      nearbyLocations,
      images: imagePaths,
      approvalStatus: "Pending",
    });

    await newProperty.save();

    res.status(201).json({ message: "Property Created ✅" });
  } catch (error) {
    console.log("CREATE ERROR 👉", error);
    res.status(500).json({ error: "Create failed ❌" });
  }
};

// ================= UPDATE =================
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const amenities = parseAmenities(req.body.amenities);
    const nearbyLocations = parseNearby(req.body.nearbyLocations);

    const imagePaths = req.files?.map((f) => f.filename) || [];

    const updateData = {
      title: req.body.title || property.title,
      location: req.body.location || property.location,
      price: req.body.price || property.price,
      priceValue: toNumber(req.body.price),
      type: req.body.type || property.type,
      description: req.body.description || property.description,

      bedrooms: toNumber(req.body.bedrooms),
      bathrooms: toNumber(req.body.bathrooms),
      sqft: toNumber(req.body.sqft),
      parking: toNumber(req.body.parking),

      amenities: amenities.length ? amenities : property.amenities,
      nearbyLocations:
        nearbyLocations.length ? nearbyLocations : property.nearbyLocations,

      images: imagePaths.length ? imagePaths : property.images,
    };

    await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ message: "Property Updated Successfully ✅" });
  } catch (error) {
    console.log("UPDATE ERROR 👉", error);
    res.status(500).json({ error: "Update failed ❌" });
  }
};

// ================= OTHER =================
exports.getAllPropertiesAdmin = async (req, res) => {
  const properties = await Property.find({ createdByRole: "admin" }).sort({
    createdAt: -1,
  });
  res.json({ properties });
};

exports.getCustomerProperties = async (req, res) => {
  const properties = await Property.find({
    createdByRole: "customer",
  }).sort({ createdAt: -1 });
  res.json({ properties });
};

exports.getUserSubmittedProperties = async (req, res) => {
  const properties = await Property.find({
    createdByRole: "user",
  }).sort({ createdAt: -1 });
  res.json({ properties });
};

exports.updateApprovalStatus = async (req, res) => {
  await Property.findByIdAndUpdate(req.params.id, {
    approvalStatus: req.body.status,
  });
  res.json({ message: "Status Updated" });
};

exports.togglePremium = async (req, res) => {
  const property = await Property.findById(req.params.id);
  property.premium = !property.premium;
  await property.save();
  res.json({ message: "Premium toggled" });
};

exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};