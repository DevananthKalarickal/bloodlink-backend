const express = require('express');
const authMiddleware = require("../middlewares/authMiddelware");
const { addCamp, getRecentCamps, getCampHistory } = require('../controllers/campController');

const router = express.Router();

// Add new camp (requires authentication)
router.post('/camps', authMiddleware, addCamp);

// Get recent camps (requires authentication)
router.get('/camps/recent', authMiddleware, getRecentCamps);

// Get camp history (requires authentication)
router.get('/camps/history', authMiddleware, getCampHistory);

module.exports = router;
