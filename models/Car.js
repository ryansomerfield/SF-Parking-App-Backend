const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const CarSchema = new mongoose.Schema({
  //Name of the Street Segment
  owner: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  //Name of the cross street that provides 1 endpoint to the street segment
  make: {
    type: String,
  },
  //Name of the cross street that provides the other endpoint to the street segment
  model: {
    type: String,
  },
  //Side of the street that the segment area is on (in cardinal directions)
  year: {
    type: Number,
    min: 1900,
  },
  color: {
    type: String,
  },
  licensePlate: {
    type: String,
  },
  isParked: {
    type: Boolean,
    required: true,
  },

  //The street segment area
  location: pointSchema,
  street: {
    type: mongoose.ObjectId,
    ref: "Street",
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
module.exports = {
  Car: mongoose.model("Car", CarSchema),
  CarSchema: CarSchema,
};
