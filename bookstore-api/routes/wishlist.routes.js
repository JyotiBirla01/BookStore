const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const { toggleWishlist, getWishlist } = require("../controllers/wishlist.controller");
const { toggleWishlistValidator } = require("../validators/auth.validator");
const router= express.Router();
router.post("/",requireAuth,toggleWishlistValidator,toggleWishlist);
router.get("/", requireAuth, getWishlist);
module.exports = router;