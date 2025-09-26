// controllers/profile.controller.js
const db = require("../models");

exports.createProfile = async (req, res) => {
  const { role, id: userId } = req.user;
    if (!role || !userId) {
        return res.status(400).json({ message: "Invalid user data" });
    }
  try {
    if (role === "user") {
      const existing = await db.UserProfile.findOne({ where: { userId } });
      if (existing) return res.status(400).json({ message: "User profile already exists" });

      const profile = await db.UserProfile.create({
        userId,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,  
        address: req.body.address,
        gender: req.body.gender,
      });

      return res.status(201).json({ message: "User profile created", profile });

    } else if (role === "admin") {
      const existing = await db.AdminProfile.findOne({ where: { userId } });
      if (existing) return res.status(400).json({ message: "Admin profile already exists" });

      const profile = await db.AdminProfile.create({
        userId,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department,
        designation: req.body.designation,
      });
      console.log("profile>>>>",profile);
      

      return res.status(201).json({ message: "Admin profile created", profile });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("Create Profile Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { role, id: userId } = req.user;
  try {
    let profile;
    if (role === "user") {
      profile = await db.UserProfile.findOne({ where: { userId } });
      if (!profile) return res.status(404).json({ message: "User profile not found" });

      await profile.update(req.body);
      return res.json({ message: "User profile updated", profile });

    } else if (role === "admin") {
      profile = await db.AdminProfile.findOne({ where: { userId } });
      if (!profile) return res.status(404).json({ message: "Admin profile not found" });

      await profile.update(req.body);
      return res.json({ message: "Admin profile updated", profile });
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user's profile
exports.getProfile = async (req, res) => {
  const { role, id: userId } = req.user;
  try {
    let profile;
    if (role === "user") {
      profile = await db.UserProfile.findOne({ where: { userId } });
    } else if (role === "admin") {
      profile = await db.AdminProfile.findOne({ where: { userId } });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  const { role, id: userId } = req.user;
  try {
    let deleted;
    if (role === "user") {
      deleted = await db.UserProfile.destroy({ where: { userId } });
    } else if (role === "admin") {
      deleted = await db.AdminProfile.destroy({ where: { userId } });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!deleted) return res.status(404).json({ message: "Profile not found" });

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
