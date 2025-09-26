const db = require("../models");
const generateToken = require("../utils/generateToken");

// Send OTP
exports.sendOtp = async (req, res) => {
  const { mobile,role} = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await db.User.findOne({ where: { mobile } });

    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      user = await db.User.create({ mobile, otp ,role});
    }

    console.log(`OTP for ${mobile}: ${otp} (send via SMS gateway in production)`);

    return res.status(200).json({ message: "OTP sent successfully", mobile ,otp});
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await db.User.findOne({ where: { mobile, otp } });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified - clear it
    user.otp = null;
    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      message: "OTP verified successfully",
      user: {
        id: user.id,
        mobile: user.mobile,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.logout = async (req, res) => {
  try {
    // Invalidate the token by removing it from the client side
    // This is a placeholder as actual token invalidation logic depends on your auth strategy
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}