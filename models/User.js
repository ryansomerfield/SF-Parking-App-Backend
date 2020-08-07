const mongoose = require("mongoose");
const CarSchema = require("../models/Car");

const UserSchema = new mongoose.Schema({
  loginMethod: {
    type: String,
    required: true,
  },
  profileId: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  cars: {
    type: CarSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
