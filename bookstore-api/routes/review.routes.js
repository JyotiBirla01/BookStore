const express= require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const { addReview, getReviewsByBook, getReviewsByUser, getAllReviews, updateReview, deleteReview } = require("../controllers/review.controller");
const { validateAddReview, validateGetReviewsByBook, validateGetReviewsByUser, validateUpdateReview, validateDeleteReview } = require("../validators/auth.validator");
const router = express.Router();
router.post("/",requireAuth,validateAddReview,addReview);
router.get("/book/:bookId",requireAuth,validateGetReviewsByBook,getReviewsByBook)
router.get("/:userId",requireAuth,validateGetReviewsByUser,getReviewsByUser) 
router.get("/",requireAuth,getAllReviews)
router.put("/:reviewId",requireAuth,validateUpdateReview,updateReview)
router.delete("/:reviewId",requireAuth,validateDeleteReview,deleteReview)

module.exports = router;
