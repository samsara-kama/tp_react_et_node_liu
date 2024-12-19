const mongoose = require("mongoose");
const User = require("./userModel");

const annonceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Real Estate",
      "Vehicles",
      "Electronics",
      "Furniture",
      "Jobs",
      "Clothing",
      "Services",
      "Others",
    ], // Predefined categories
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

module.exports = mongoose.model("Annonce", annonceSchema);
