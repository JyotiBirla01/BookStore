const express=require("express");
const { addToCart, getCart, removeCart, getCartById, updateCart } = require("../controllers/cart.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { validateAddToCart, validateRemoveCart, validateGetCartById, validateUpdateCart } = require("../validators/auth.validator");
const router=express.Router();
router.post("/",requireAuth,validateAddToCart,addToCart);
router.get("/",requireAuth,getCart)
router.get("/:id",requireAuth,validateGetCartById,getCartById) 
router.delete("/:id",requireAuth,validateRemoveCart,removeCart)
router.put("/:id",requireAuth,validateUpdateCart,updateCart)
module.exports=router;