const db = require("../models");

exports.addReview=async(req,res)=>{
    try {
        const {bookId,rating,comment}=req.body;
        const userId=req.user.id;
        const book = await db.Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        // Check if user has already reviewed this book
        const existingReview = await db.Review.findOne({
            where: { userId, bookId }
        });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this book" });
        }   
        // Create new review
        const review = await db.Review.create({
            userId,
            bookId,
            rating,
            comment
        });
        res.status(201).json({ message: "Review added successfully", review });


    } catch (error) {
        res.status(500).json({ message: "Internal server error",error: error.message });
    }
}

exports.getReviewsByBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await db.Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const reviews = await db.Review.findAll({
            where: { bookId },
            include: [{ model: db.User, attributes: ['id', 'mobile'] }]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book" });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getReviewsByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const reviews = await db.Review.findAll({
            where: { userId },
            include: [{ model: db.Book, attributes: ['id', 'title'] }]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user" });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  

exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

    try {
        const review = await db.Review.findOne({ where: { id: reviewId, userId } });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.destroy();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  

exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const review = await db.Review.findOne({ where: { id: reviewId, userId } });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.json({ message: "Review updated successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await db.Review.findAll({
            include: [
                { model: db.User, attributes: ['id', 'mobile'] },
                { model: db.Book, attributes: ['id', 'title'] }
            ]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.getReviewById = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await db.Review.findByPk(reviewId, {
            include: [
                { model: db.User, attributes: ['id', 'mobile'] },
                { model: db.Book, attributes: ['id', 'title'] }
            ]
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}   
