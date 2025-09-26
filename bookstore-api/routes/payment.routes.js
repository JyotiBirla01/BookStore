const express = require("express");
const router = express.Router();
const {
  createRazorpayOrder,
  verifyRazorpaySignature,
  refundOrder,
} = require("../controllers/payment.controller");
const { requireRole, requireAuth } = require("../middlewares/auth.middleware");

router.post("/create-order", requireAuth,createRazorpayOrder);
router.post("/verify", requireAuth,verifyRazorpaySignature);
router.post(
  "/refund/:orderId",
  requireAuth,
  requireRole("admin"),
  refundOrder
);


module.exports = router;
