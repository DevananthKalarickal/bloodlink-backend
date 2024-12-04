// controllers/bloodInventoryController.js
const BloodInventory = require('../models/Inventoryorgan');

// Get all blood types
exports.getAllBloodTypes = async (req, res) => {
  try {
    const inventory = await BloodInventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
};

// Add new blood type
exports.addBloodType = async (req, res) => {
  const { bloodType, quantity } = req.body;

  try {
    const existing = await BloodInventory.findOne({ bloodType });
    if (existing) {
      return res.status(400).json({ message: 'Blood type already exists' });
    }

    const newBlood = new BloodInventory({ bloodType, quantity });
    await newBlood.save();
    res.status(201).json({ message: 'Blood type added successfully', newBlood });
  } catch (error) {
    res.status(500).json({ message: 'Error adding blood type', error });
  }
};

// Update blood quantity
exports.updateBloodQuantity = async (req, res) => {
  const { bloodType } = req.params;
  const { quantity } = req.body;

  try {
    const blood = await BloodInventory.findOne({ bloodType });
    if (!blood) {
      return res.status(404).json({ message: 'Blood type not found' });
    }

    blood.quantity = quantity;
    blood.lastUpdated = Date.now();
    await blood.save();

    res.status(200).json({ message: 'Blood quantity updated', blood });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blood quantity', error });
  }
};
