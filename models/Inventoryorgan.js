// models/BloodInventory.js
const mongoose = require('mongoose');

const BloodInventorySchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BloodInventory', BloodInventorySchema);
