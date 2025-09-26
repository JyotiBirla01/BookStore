const db = require("../models");
const { getPagingData, getPagination } = require("../utils/paginate");
const { Op } = require("sequelize"); //op object, which gives access to operators like LIKE, OR, AND, etc.

exports.createBook = async (req, res) => {
  try {
    const { title, author, price, description, originalPrice,categoryId } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if category exists
    const category = await db.Category.findByPk(categoryId);
    console.log("Category ID:", category);
    console.log("File:", req.file);
console.log("Uploaded file path:", req.file?.path);
console.log("Accessible at:", imagePath);


    if (!category) {
      return res.status(400).json({ message: "Invalid categoryId. Category does not exist." });
    }

    // Create the book
    const book = await db.Book.create({
      title,
      author,
      price,
      originalPrice,
      description,
      categoryId,
      imageUrl:imagePath,
    });
    console.log("book>>>>>>>>>>>>>>>>>>>>>>>>>>>>",book);
    

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });

  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// exports.getAllBooks = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 1000; // default to 1000 to return all if not paginated
//     const { offset, limit: pageLimit } = getPagination(page, limit);
// // const data = await db.Book.findAndCountAll({
// //   limit: pageLimit,
// //   offset,
// //   order: [["createdAt", "DESC"]],
// //   include: [
// //     {
// //       model: db.Category,
// //       as: "Category",
// //       attributes: ["id", "name", "createdAt", "updatedAt"],
// //     },
// //     {
// //       model: db.Review,
// //       attributes: [],
// //     },
// //   ],
// //   attributes: {
// //     include: [
// //       [db.Sequelize.fn("AVG", db.Sequelize.col("Reviews.rating")), "averageRating"],
// //       [db.Sequelize.fn("COUNT", db.Sequelize.col("Reviews.id")), "reviewCount"],
// //     ],
// //   },
// //   group: ['Book.id', 'Category.id'],
// //   subQuery: false,
// // });

//     const data = await db.Book.findAndCountAll({
//       limit: pageLimit,
//       offset,
//       order: [["createdAt", "DESC"]],
//       include: [
//         {
//           model: db.Category,
//           as: "Category",
//           attributes: ["id", "name", "createdAt", "updatedAt"],
//         },
        
//       ],
//     });

//     const response = getPagingData(data, page, pageLimit);
//     return res.status(200).json({
//       message: "Books fetched successfully",
//       ...response,
//     });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
exports.getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { offset, limit: pageLimit } = getPagination(page, limit);

    // Step 1: Total count WITHOUT group
    const totalBooks = await db.Book.count();

    // Step 2: Paginated books WITH review aggregates
    const books = await db.Book.findAll({
      include: [
        {
          model: db.Category,
          as: "Category",
          attributes: ["id", "name"],
        },
        {
          model: db.Review,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [db.Sequelize.fn("AVG", db.Sequelize.col("Reviews.rating")), "averageRating"],
          [db.Sequelize.fn("COUNT", db.Sequelize.col("Reviews.id")), "reviewCount"],
        ],
      },
      group: ["Book.id", "Category.id"],
      order: [["createdAt", "DESC"]],
      limit: pageLimit,
      offset,
      subQuery: false,
    });

    // Step 3: Format books with fixed values
    const formattedBooks = books.map((book) => {
      const b = book.toJSON();
      return {
        ...b,
        averageRating: parseFloat(b.averageRating || 0).toFixed(1),
        reviewCount: parseInt(b.reviewCount || 0),
      };
    });

    return res.status(200).json({
      message: "Books fetched successfully",
      totalItems: totalBooks,
      totalPages: Math.ceil(totalBooks / pageLimit),
      currentPage: page,
      books: formattedBooks,
    });

  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getByBookId=async(req,res)=>{
  try {
    const {id}=req.params;
    const book = await db.Book.findByPk(id, {
      include: [{ model: db.Category, as: "Category" }],
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book fetched successfully",
      book,
    });


    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// exports.getBooksByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const { offset, limit: pageLimit } = getPagination(page, limit);

//     // Check if the category exists
//     const category = await db.Category.findByPk(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     const data = await db.Book.findAndCountAll({
//       where: {
//         categoryId: categoryId,
//       },
//       include: [
//         {
//           model: db.Category,
//           as: "Category",
//           attributes: ["id", "name"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//       limit: pageLimit,
//       offset,
//     });

//     const response = getPagingData(data, page, pageLimit);

//     return res.status(200).json({
//       message: "Books by category fetched successfully",
//       ...response,
//     });
//   } catch (error) {
//     console.error("Error fetching books by category:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

exports.getBooksByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { offset, limit: pageLimit } = getPagination(page, limit);

    // Validate category
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Step 1: Total count WITHOUT grouping
    const totalBooks = await db.Book.count({ where: { categoryId } });

    // Step 2: Paginated books WITH group, avg, and count
    const books = await db.Book.findAll({
      where: { categoryId },
      include: [
        {
          model: db.Category,
          as: "Category",
          attributes: ["id", "name"],
        },
        {
          model: db.Review,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [db.Sequelize.fn("AVG", db.Sequelize.col("Reviews.rating")), "averageRating"],
          [db.Sequelize.fn("COUNT", db.Sequelize.col("Reviews.id")), "reviewCount"],
        ],
      },
      group: ["Book.id", "Category.id"],
      order: [["createdAt", "DESC"]],
      limit: pageLimit,
      offset,
      subQuery: false,
    });

    // Step 3: Format data
    const formattedBooks = books.map((book) => {
      const b = book.toJSON();
      return {
        ...b,
        averageRating: parseFloat(b.averageRating || 0).toFixed(1),
        reviewCount: parseInt(b.reviewCount || 0),
      };
    });

    return res.status(200).json({
      message: "Books by category fetched successfully",
      totalItems: totalBooks,
      totalPages: Math.ceil(totalBooks / pageLimit),
      currentPage: page,
      books: formattedBooks,
    });

  } catch (error) {
    console.error("Error fetching books by category:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.updateBook=async(req,res)=>{
  try {
    const { id } = req.params;
    const { title, author, price,originalPrice, description, categoryId, imageUrl } = req.body;

    // Check if book exists
    const book = await db.Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if category exists
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid categoryId. Category does not exist." });
    }

    // Update the book
    await book.update({
      title,
      author,
      price,
      originalPrice,
      description,
      categoryId,
      imageUrl,
    });

    return res.status(200).json({
      message: "Book updated successfully",
      book,
    });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

exports. deleteBook=async(req,res)=>{
  try {
    const {id}=req.params;
    const book = await db.Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }   
    await book.destroy();
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message});
    
  }
}

exports.bulkUploadBooks = async (req, res) => {
  try {
    const books = req.body.books;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "Books array is required and cannot be empty." });
    }

    const createdBooks = [];
    const skippedBooks = [];

    for (let book of books) {
      const { title, author, price,originalPrice, description, categoryId, imageUrl } = book;

      if (!title || !author || !categoryId) {
        skippedBooks.push({ title, reason: "Missing required fields" });
        continue;
      }

      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        skippedBooks.push({ title, reason: "Invalid categoryId" });
        continue;
      }

      const existingBook = await db.Book.findOne({
        where: {
          title,
          author,
        },
      });

      if (existingBook) {
        skippedBooks.push({ title, reason: "Duplicate title and author" });
        continue;
      }

      const newBook = await db.Book.create({
        title,
        author,
        price,
        originalPrice,
        description,
        categoryId,
        imageUrl, // Optional: you can later extend to support image uploads
      });

      createdBooks.push(newBook);
    }

    return res.status(201).json({
      message: "Bulk upload completed",
      created: createdBooks.length,
      skipped: skippedBooks.length,
      createdBooks,
      skippedBooks,
    });
  } catch (error) {
    console.error("Bulk Upload Books Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query; // search term
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { offset, limit: pageLimit } = getPagination(page, limit);

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query 'q' is required." });
    }

    const data = await db.Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { author: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: [
        {
          model: db.Category,
          as: "Category",
          attributes: ["id", "name"],
          where: {
            name: { [Op.iLike]: `%${q}%` }, // also check in category name
          },
          required: false, // if false, include books even if category doesn't match
        },
      ],
      order: [["createdAt", "DESC"]],
      offset,
      limit: pageLimit,
    });

    const response = getPagingData(data, page, pageLimit);

    return res.status(200).json({
      message: "Search results fetched successfully",
      ...response,
    });

  } catch (error) {
    console.error("Error searching books:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller method
exports.bulkUpdateOriginalPrice = async (req, res) => {
  try {
    const updates = req.body.books; // [{ id: 67, originalPrice: 300 }, ...]

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: "Provide books with id and originalPrice" });
    }

    const updatedBooks = [];

    for (const update of updates) {
      const book = await db.Book.findByPk(update.id);
      if (book) {
        await book.update({ originalPrice: update.originalPrice });
        updatedBooks.push(book);
      }
    }

    return res.status(200).json({
      message: "Books original prices updated successfully",
      updatedBooks,
    });
  } catch (error) {
    console.error("Bulk update error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
