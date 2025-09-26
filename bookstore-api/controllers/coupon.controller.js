
const db = require("../models");

exports.createCoupon=async(req,res)=>{
    try {
        const { code, discountPercent, expiresAt, usageLimit } = req.body;
        const existingCoupon=await db.Coupon.findOne({where:{code}})
        if(existingCoupon)
            return res.status(400).json({message:"Coupon already exists"})
        const coupon=await db.Coupon.create({
            code, discountPercent, expiresAt, usageLimit 
        })
         res.status(201).json({message:"Coupon creatd successfully",coupon})

        
    } catch (error) {
res.status(500).json({message:"Internal server error ",error:error.message})
    }
}

exports.validateCoupon=async(req,res)=>{
    try {
          const { code } = req.body;

  const coupon = await db.Coupon.findOne({ where: { code } });
  if (
    !coupon ||
    new Date(coupon.expiresAt) < new Date() ||
    (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)
  ) {
    return res.status(400).json({ message: "Invalid or expired coupon" });
  }

  res.json({ valid: true, discountPercent: coupon.discountPercent, coupon });
        
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}