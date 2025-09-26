const db = require("../models");

exports.toggleWishlist = async (req, res) => {
  const { bookId } = req.body;

  const book = await db.Book.findByPk(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const user = await db.User.findByPk(req.user.id);
  const alreadyWishlisted = await user.hasWishlistedBook(book);

  if (alreadyWishlisted) {
    await user.removeWishlistedBook(book);
    return res.json({ message: "Removed from wishlist" });
  } else {
    await user.addWishlistedBook(book);
    return res.json({ message: "Added to wishlist" });
  }
};

exports.getWishlist = async (req, res) => {
  const user = await db.User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
  const books = await user.getWishlistedBooks({ include: [db.Category] });
    if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books in wishlist" });
    }
  res.json(books);
  
};

