const User = require("../models/userModel");

// Update Profile Controller
const updateProfile = async (req, res) => {
  const { userId, name, email, phone, website, address } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.website = website || user.website;
    user.address = address || user.address;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateProfile };
