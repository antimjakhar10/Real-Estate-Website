const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,
    slug: {
      type: String,
      unique: true,
    },
    location: String,
    price: String,
    priceValue: Number,
    type: String,
    category: String,
    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    sqft: {
      type: Number,
      default: 0,
    },

    parking: {
      type: Number,
      default: 0,
    },
    elevator: Boolean,
    wifi: Boolean,
    pool: Boolean,
    images: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    premium: {
      type: Boolean,
      default: false,
    },

    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    highlights: [
      {
        icon: String,
        label: String,
        value: String,
      },
    ],

    amenities: {
      type: [String],
      default: [],
    },

    nearbyLocations: [
      {
        name: String,
        dist: String,
        icon: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Property", propertySchema);
