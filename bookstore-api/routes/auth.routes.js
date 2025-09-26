const express = require("express");
const { validateSendOtp, validateVerifyOtp } = require("../validators/auth.validator");
const { sendOtp, verifyOtp, logout } = require("../controllers/auth.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const router = express.Router();


router.post("/send-otp", validateSendOtp, sendOtp);
router.post("/verify-otp", validateVerifyOtp, verifyOtp);
router.post("/logout",requireAuth,logout)
module.exports = router;

