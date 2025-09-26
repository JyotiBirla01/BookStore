const { body, param, validationResult } = require("express-validator");

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateSendOtp = validate([
  body("mobile")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit Indian mobile number"),
]);

exports.validateVerifyOtp = validate([
  body("mobile")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit Indian mobile number"),
  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
]);


exports.validateUserRole = (req, res, next) => {
  const { role } = req.body;
  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }
  next();
};

exports.validateCreateCategory = validate([
  body("name").notEmpty()
    .withMessage("Name is required")
])


exports.validateGetCategoryById = validate([
  param("id").isInt()
    .withMessage("ID must be an integer")
])
exports.validateUpdateCategory = validate([
  body("name").notEmpty()
    .withMessage("Name is required"),
  param("id").isInt()
    .withMessage("ID must be an integer")
])

exports.validateDeleteCategory = validate([
  param("id").isInt()
    .withMessage("ID must be an integer")
])

exports.validateCreateBook = validate([
  body("title").notEmpty()
    .withMessage("Title is required"),
  body("author").notEmpty()
    .withMessage("Author is required"),
  body("categoryId").isInt().toInt()
    .withMessage("Category ID must be an integer"),
  body("price").isFloat({ gt: 0 }).toFloat()
    .withMessage("Price must be a positive number"),
      body("oiginalprice").isFloat({ gt: 0 }).toFloat()
    .withMessage("Original Price must be a positive number"),
  body("description").optional().isString()
    .withMessage("Description must be a string"),

]);
exports.validateGetBookById = validate([
  param("id").isInt()
    .withMessage("ID must be an integer")
])


exports.validateUpdateBook = validate([
  body("title").notEmpty()
    .withMessage("Title is required"),
  body("author").notEmpty()
    .withMessage("Author is required"),
  body("categoryId").isInt()
    .withMessage("Category ID must be an integer"),
  body("price").isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("originalprice").isFloat({ gt: 0 })
    .withMessage("Original Price must be a positive number"),
  body("description").optional().isString()
    .withMessage("Description must be a string"),
  body("imageUrl").optional().isURL()
    .withMessage("Image URL must be a valid URL"),
  param("id").isInt()
    .withMessage("ID must be an integer")
])

exports.validateDeleteBook = validate([
  param("id").isInt()
    .withMessage("ID must be an integer")
])

exports.validateAddToCart = validate([
  body("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),

  body("quantity")
    .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer and greater than 0")
    .notEmpty().withMessage("Quantity is required")
  // body("userId").isInt()      
  // .withMessage("User ID must be an integer")
])
exports.validateGetCartById = validate([
  param("id").isInt()
    .withMessage("User ID must be an integer")
])

exports.validateRemoveCart = validate([
  param("id").isInt()
    .withMessage("Cart ID must be an integer")
])

exports.validateUpdateCart = validate([
  body("quantity")
    .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer and greater than 0")
    .notEmpty().withMessage("Quantity is required"),
  param("id").isInt()
    .withMessage("Cart ID must be an integer")
])
exports.validatePlaceOrder = validate([
  body("cartId").isInt()
    .withMessage("Cart ID must be an integer"),
  body("address").notEmpty()
    .withMessage("Address is required"),
  body("paymentMethod").notEmpty()
    .withMessage("Payment method is required")
])

exports.validateCartItem = (item) => {
  const book = item.Book;

  if (!book || typeof item.quantity !== "number" || typeof book.price !== "number") {
    return "Invalid book or quantity data in cart";
  }

  if (item.quantity <= 0 || book.price <= 0 || book.stock < 0) {
    return "Invalid quantity, price, or stock value";
  }

  if (item.quantity > 10) {
    return "Cannot order more than 10 copies of a book";
  }

  if (book.stock < item.quantity) {
    return "Not enough stock for book";
  }

  return null;
}



exports.validatePlaceOrder = validate([
  body("cartId")
    .optional()
    .isInt().withMessage("Cart ID must be an integer"),
  body("address")
    .notEmpty().withMessage("Address is required"),
  body("paymentMethod")
    .notEmpty().withMessage("Payment method is required"),
]);

exports.validateGetOrderById = validate([
  param("id")
    .isInt().withMessage("Order ID must be an integer"),
]);
exports.validateCancelOrder = validate([
  param("id")
    .isInt().withMessage("Order ID must be an integer"),
]);

exports.validateUpdateOrderStatus = validate([
  param("orderId")
    .isInt().withMessage("Order ID must be an integer"),
  body("status")
    .isIn(["pending", "placed", "shipped", "delivered", "cancelled"])
        .withMessage("Status must be one of: pending, placed, shipped, delivered,cancelled"),
            body("remark").optional().isString(),
]);

exports.validateUserProfile = validate([
  body("fullName")
    .notEmpty().withMessage("fullName is required"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("address")
    .optional()
    .notEmpty().withMessage("Address is required")
    .isString().withMessage("Address must be a string"),
  body("dateOfBirth")
    .optional()
    .isDate().withMessage("Invalid date format"),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number format"),


]);
exports.validateAdminProfile = validate([
  body("fullName")
    .notEmpty().withMessage("Full name is required"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("department")
    .notEmpty().withMessage("Department is required")
    .isString().withMessage("Department must be a string"),
  body("designation")
    .notEmpty().withMessage("Designation is required")
    .isString().withMessage("Designation must be a string"),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number format"),

]);

exports.toggleWishlistValidator = validate([
  body("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
]);

exports.validateAddReview = validate([
  body("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5")
    .notEmpty().withMessage("Rating is required"),
  body("comment")
    .optional()
    .isString().withMessage("Comment must be a string")
    .isLength({ max: 500 }).withMessage("Comment cannot exceed 500 characters"),
]);

exports.validateGetReviewsByBook = validate([
  param("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
]);

exports.validateGetReviewsByUser = validate([
  param("userId")
    .isInt().withMessage("User ID must be an integer")
    .notEmpty().withMessage("User ID is required"),
]);
exports.validateDeleteReview = validate([
  param("reviewId")
    .isInt().withMessage("Review ID must be an integer")
    .notEmpty().withMessage("Review ID is required"),
]);
exports.validateUpdateReview = validate([
  param("reviewId")
    .isInt().withMessage("Review ID must be an integer")
    .notEmpty().withMessage("Review ID is required"),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5"),
  body("comment")
    .optional()
    .isString().withMessage("Comment must be a string")
    .isLength({ max: 500 }).withMessage("Comment cannot exceed 500 characters"),
]);
exports.validateGetWishlist = validate([
  param("userId")
    .isInt().withMessage("User ID must be an integer")
    .notEmpty().withMessage("User ID is required"),
]);
exports.validateAddToWishlist = validate([
  body("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
]);
exports.validateRemoveFromWishlist = validate([
  param("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
  param("userId")
    .isInt().withMessage("User ID must be an integer")
    .notEmpty().withMessage("User ID is required"),
]);

exports.validateGetWishlistByUser = validate([
  param("userId")
    .isInt().withMessage("User ID must be an integer")
    .notEmpty().withMessage("User ID is required"),
]);

exports.validateGetWishlistByBook = validate([
  param("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
]);

exports.validateGetWishlistByUserAndBook = validate([
  param("userId")
    .isInt().withMessage("User ID must be an integer")
    .notEmpty().withMessage("User ID is required"),
  param("bookId")
    .isInt().withMessage("Book ID must be an integer")
    .notEmpty().withMessage("Book ID is required"),
]);

exports.validateInvoice= validate([
  param("orderId").isInt(),
])

exports.validateCreateCoupon=validate([
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Coupon code must be between 3 and 20 characters"),

  body("discountPercent")
    .notEmpty()
    .withMessage("Discount percent is required")
    .isFloat({ gt: 0, lt: 100 })
    .withMessage("Discount must be between 1 and 99 percent"),

  body("expiresAt")
    .notEmpty()
    .withMessage("Expiration date is required")
    .isISO8601()
    .toDate()
    .withMessage("Expiration date must be a valid ISO8601 date"),

  body("usageLimit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Usage limit must be a positive integer"),
])