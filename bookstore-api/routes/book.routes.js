const express = require("express");
const { requireRole, requireAuth } = require("../middlewares/auth.middleware");
const { createBook, getAllBooks, getByBookId, updateBook, deleteBook, bulkUploadBooks, searchBooks, getBooksByCategory, bulkUpdateOriginalPrice } = require("../controllers/book.controller");
const { validateCreateBook, validateGetBookById, validateUpdateBook, validateDeleteBook } = require("../validators/auth.validator");
const upload = require("../middlewares/multer.middleware");
const router = express.Router();


router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  upload.single("image"), // Use multer middleware to handle file upload AND IT IS ALWYAS BEFORE THE VALIDATORS
  validateCreateBook,
  createBook
);
router.post('/bulk-original-price', requireAuth,bulkUpdateOriginalPrice);

router.get("/", requireAuth, getAllBooks);
router.get("/search", requireAuth,searchBooks);
router.get("/:id", requireAuth, validateGetBookById, getByBookId);
router.get("/category/:categoryId", requireAuth, getBooksByCategory);

router.put("/:id", requireAuth, requireRole("admin"), updateBook)
router.delete("/:id", requireAuth, requireRole("admin"), validateDeleteBook, deleteBook)
router.post(
  "/bulk",
  requireAuth,
  requireRole("admin"),
  bulkUploadBooks
);

module.exports = router;


// exports.bulkUploadBooks = async (req, res) => {
//   try {
//     const books = req.body.books;

//     if (!Array.isArray(books) || books.length === 0) {
//       return res.status(400).json({ message: "Books array is required and cannot be empty." });
//     }

//     const createdBooks = [];
//     const skippedBooks = [];

//     for (let book of books) {
//       const { title, author, price, description, categoryId, imageUrl } = book;

//       if (!title || !author || !categoryId) {
//         skippedBooks.push({ title, reason: "Missing required fields" });
//         continue;
//       }

//       const category = await db.Category.findByPk(categoryId);
//       if (!category) {
//         skippedBooks.push({ title, reason: "Invalid categoryId" });
//         continue;
//       }

//       const existingBook = await db.Book.findOne({
//         where: {
//           title,
//           author,
//         },
//       });

//       if (existingBook) {
//         skippedBooks.push({ title, reason: "Duplicate title and author" });
//         continue;
//       }

//       const newBook = await db.Book.create({
//         title,
//         author,
//         price,
//         description,
//         categoryId,
//         imageUrl, // Optional: you can later extend to support image uploads
//       });

//       createdBooks.push(newBook);
//     }

//     return res.status(201).json({
//       message: "Bulk upload completed",
//       created: createdBooks.length,
//       skipped: skippedBooks.length,
//       createdBooks,
//       skippedBooks,
//     });
//   } catch (error) {
//     console.error("Bulk Upload Books Error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
