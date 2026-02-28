const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  priceValue: Number,
  type: String,
  category: String,
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  description: String,
  yearBuilt: Number,
  parking: Number,
  elevator: Boolean,
  wifi: Boolean,
  pool: Boolean,
  images: [String],
  nearby: [String],

  featured: {
  type: Boolean,
  default: false
},

premium: {
  type: Boolean,
  default: false
},

approvalStatus: {
  type: String,
  enum: ["Pending", "Approved", "Rejected"],
  default: "Pending",
},

createdBy: {
  type: String,
  enum: ["Admin", "Customer"],
  default: "Customer",
},


  highlights: [
    {
      icon: String,
      label: String,
      value: String
    }
  ],

  amenities: {
  type: [String],
  default: []
},

  nearbyLocations: [
    {
      name: String,
      dist: String,
      icon: String
    }
  ]
},
{ timestamps: true }
  );

module.exports = mongoose.model("Property", propertySchema);