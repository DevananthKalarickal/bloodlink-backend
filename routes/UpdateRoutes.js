const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/UpdateProfile");

// Update Profile Route
router.put("/donor/update-profile", updateProfile);

module.exports = router;
