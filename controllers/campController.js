const mongoose = require('mongoose');
const Camp = require('../models/Camp');

// Add a new camp
exports.addCamp = async (req, res) => {
  try {
    // Validate incoming data
    const { organization, place, date, time, contact, details } = req.body;

    if (!organization || !place || !date || !time || !contact) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const camp = new Camp({
      organisation: new mongoose.Types.ObjectId(req.body.userId), // Ensure userId is set correctly
      organization,
      place,
      date,
      time,
      contact,
      details,
    });

    // Save the camp
    const savedCamp = await camp.save();
    res.status(201).json({ success: true, data: savedCamp });
  } catch (error) {
    console.error("Error adding camp:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get recent camps
exports.getRecentCamps = async (req, res) => {
  try {
    const recentCamps = await Camp.find().sort({ date: -1 }).limit(5);
    res.status(200).json({ success: true, data: recentCamps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get camp history
exports.getCampHistory = async (req, res) => {
  try {
    const campHistory = await Camp.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: campHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
