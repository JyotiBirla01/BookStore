const express=require("express");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");
const { createCoupon, validateCoupon } = require("../controllers/coupon.controller");
const { validateCreateCoupon } = require("../validators/auth.validator");
const router=express.Router();
router.post("/",requireAuth,requireRole("admin"),validateCreateCoupon,createCoupon)
router.post("/validate",requireAuth,validateCoupon)
module.exports=router;
