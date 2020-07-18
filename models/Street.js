const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true,
  },
});

const restrictionsSchema = new mongoose.Schema({
  permitZone: {
    type: String,
  },
  maxHours: {
    type: Number,
    min: 0,
  },
  sweepingDays: {
    type: [Number],
  },
  sweepingStartHour: {
    type: Number,
    min: 0,
    max: 24,
  },
  sweepingEndHour: {
    type: Number,
    min: 0,
    max: 24,
  },
});

const StreetSchema = new mongoose.Schema({
  //Name of the Street Segment
  streetName: {
    type: String,
    required: true,
  },
  //Name of the cross street that provides 1 endpoint to the street segment
  crossStreet1: {
    type: String,
  },
  //Name of the cross street that provides the other endpoint to the street segment
  crossStreet2: {
    type: String,
  },
  //Side of the street that the segment area is on (in cardinal directions)
  streetSide: {
    type: String,
  },
  numberOfSpots: {
    type: Number,
  },
  //The street segment area
  polygon: polygonSchema,
  //An object of the parking restrictions information
  restrictions: {
    type: restrictionsSchema,
    default: {},
    required: true,
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

module.exports = mongoose.model("Street", StreetSchema);
