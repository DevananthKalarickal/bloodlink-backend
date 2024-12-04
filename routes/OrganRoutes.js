// routes/bloodInventoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBloodTypes,
  addBloodType,
  updateBloodQuantity,
} = require('../controllers/Organinventory');

router.get('/', getAllBloodTypes);
router.post('/', addBloodType);
router.put('/:bloodType', updateBloodQuantity);

module.exports = router;
