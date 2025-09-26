/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/send-otp:
 *   post:
 *     summary: Send OTP to a mobile number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *                 mobile:
 *                   type: string
 *                   example: "9876543210"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and log the user in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     mobile:
 *                       type: string
 *                       example: "9876543210"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout the authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized – token missing or invalid
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category management (Admin only for create/update/delete)
 */
/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fiction"
 *     responses:
 *       200:
 *         description: Category created
 *       400:
 *         description: Validation error or already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/category/bulk:
 *   post:
 *     tags:
 *       - Category
 *     summary: Bulk upload categories
 *     description: Creates non-duplicate and valid categories from an array of names.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categories
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fiction", "Biography", "Science", "Fiction", "", null]
 *     responses:
 *       201:
 *         description: Bulk category upload completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk category upload completed
 *                 created:
 *                   type: integer
 *                   example: 3
 *                 skipped:
 *                   type: integer
 *                   example: 2
 *                 createdCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Fiction
 *                 skippedCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Fiction
 *                       reason:
 *                         type: string
 *                         example: Already exists in database
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categories array is required and must not be empty.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories with pagination
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Items per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Update category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *   - name: Book
 *     description: Book management APIs
 */

/**
 * @swagger
 * /api/v1/book:
 *   post:
 *     summary: Create a new book (Admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *               - originalPrice
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Alchemist"
 *               author:
 *                 type: string
 *                 example: "Paulo Coelho"
 *               price:
 *                 type: number
 *                 example: 299.99
 *               originaPrice:
 *                 type: number
 *                 example: 299.99
 *               description:
 *                 type: string
 *                 example: "A story about dreams and destiny."
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Book cover image file
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book created successfully
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     price:
 *                       type: number
 *                     originalPrice:
 *                       type: number
 *                     description:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     categoryId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid categoryId. Category does not exist.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/book/bulk:
 *   post:
 *     summary: Bulk upload books (Admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - books
 *             properties:
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - author
 *                     - categoryId
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "The Alchemist"
 *                     author:
 *                       type: string
 *                       example: "Paulo Coelho"
 *                     price:
 *                       type: number
 *                       example: 299.99
 *                     originalPrice:
 *                       type: number
 *                       example: 299.99
 *                     description:
 *                       type: string
 *                       example: "A journey of self-discovery."
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     imageUrl:
 *                       type: string
 *                       example: "/uploads/the-alchemist.jpg"
 *     responses:
 *       201:
 *         description: Bulk upload completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk upload completed
 *                 created:
 *                   type: integer
 *                   example: 3
 *                 skipped:
 *                   type: integer
 *                   example: 1
 *                 createdBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       categoryId:
 *                         type: integer
 *                 skippedBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       reason:
 *                         type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Books fetched successfully
 */

/**
 * @swagger
 * /api/v1/book/bulk-original-price:
 *   post:
 *     tags: [Book]
 *     summary: Bulk update originalPrice for books
 *     description: Update originalPrice for multiple books by providing an array of { id, originalPrice }.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - books
 *             properties:
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - originalPrice
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 67
 *                     originalPrice:
 *                       type: number
 *                       example: 399.99
 *     responses:
 *       200:
 *         description: Original prices updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/book/category/{categoryId}:
 *   get:
 *     summary: Get books by category ID
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID to filter books
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of books per page (default: 10)"
 *     responses:
 *       200:
 *         description: Books by category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books by category fetched successfully
 *                 totalItems:
 *                   type: integer
 *                   example: 12
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       title:
 *                         type: string
 *                         example: "The Alchemist"
 *                       author:
 *                         type: string
 *                         example: "Paulo Coelho"
 *                       price:
 *                         type: number
 *                         example: 299.99
 *                       originalPrice:
 *                         type: number
 *                         example: 299.99
 *                       description:
 *                         type: string
 *                         example: "A story about dreams and destiny."
 *                       imageUrl:
 *                         type: string
 *                         example: "/uploads/the-alchemist.jpg"
 *                       categoryId:
 *                         type: integer
 *                         example: 1
 *                       Category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Fiction"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/book/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book fetched successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/v1/book/search:
 *   get:
 *     summary: Search books by title, author, or category name
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: "Search keyword (matches title, author, or category name)"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of books per page (default: 10)"
 *     responses:
 *       200:
 *         description: Search results fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Search results fetched successfully
 *                 totalItems:
 *                   type: integer
 *                   example: 20
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       price:
 *                         type: number
 *                       originalPrice:
 *                         type: number
 *                       description:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       categoryId:
 *                         type: integer
 *                       Category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *       400:
 *         description: Search query 'q' is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Search query 'q' is required.
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/book/{id}:
 *   put:
 *     summary: Update a book by ID (Admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               originalPrice:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/v1/book/{id}:
 *   delete:
 *     summary: Delete a book by ID (Admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */


/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: User cart management APIs
 */
/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add a book to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - quantity
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       200:
 *         description: Cart updated successfully (if book already in cart)
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get all cart items for the logged-in user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       404:
 *         description: Cart is empty
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/cart/{id}:
 *   get:
 *     summary: Get a specific cart item by ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Cart item ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item fetched successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/cart/{id}:
 *   put:
 *     summary: Update the quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Cart item ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/cart/{id}:
 *   delete:
 *     summary: Remove a cart item by ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Cart item ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: User order operations (place, view, detail)
 */

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Place a new order from cart
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed
 *                 orderId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Validation error or cart is empty
 *       500:
 *         description: Internal server error
 *//**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get paginated orders of the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of orders per page
 *     responses:
 *       200:
 *         description: Paginated list of user orders with books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orders fetched successfully
 *                 totalItems:
 *                   type: integer
 *                   example: 5
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 3
 *                       amount:
 *                         type: number
 *                         example: 349.99
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       Books:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 12
 *                             title:
 *                               type: string
 *                               example: "Clean Code"
 *                             author:
 *                               type: string
 *                               example: "Robert C. Martin"
 *                             price:
 *                               type: number
 *                               example: 299.99
 *                             originalPrice:
 *                               type: number
 *                               example: 299.99
 *                             OrderItem:
 *                               type: object
 *                               properties:
 *                                 quantity:
 *                                   type: integer
 *                                   example: 2
 *       401:
 *         description: Unauthorized – user not logged in
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 amount:
 *                   type: number
 *                 Books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       OrderItem:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/order/{id}/cancel:
 *   patch:
 *     summary: Cancel an order by ID (if not completed)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order cancelled successfully
 *       400:
 *         description: Order already cancelled or completed
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/order/{orderId}/status:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *               remark:
 *                 type: string
 *                 example: "Dispatched from warehouse"
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order status updated
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/order/{orderId}/timeline:
 *   get:
 *     summary: Get the status timeline of an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: List of all status updates (timeline)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   orderId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                     example: shipped
 *                   remark:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin dashboard and analytics
 */

/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get dashboard statistics (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns stats like total users, orders, and revenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: integer
 *                   example: 120
 *                 orders:
 *                   type: integer
 *                   example: 80
 *                 revenue:
 *                   type: number
 *                   example: 56789.99
 *                 breakdown:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         example: placed
 *                       count:
 *                         type: string
 *                         example: "32"
 *       401:
 *         description: Unauthorized or not an admin
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/monthly-revenue:
 *   get:
 *     summary: Get monthly revenue chart data (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly revenue data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: "2025-06-01T00:00:00.000Z"
 *                   revenue:
 *                     type: string
 *                     example: "2340.50"
 *       401:
 *         description: Unauthorized or not an admin
 *       500:
 *         description: Failed to load revenue
 */

/**
 * @swagger
 * /api/v1/profile:
 *   post:
 *     summary: Create a user or admin profile based on role
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - fullName
 *                   - email
 *                   - address
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "john@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, Springfield"
 *                   gender:
 *                     type: string
 *                     example: "male"
 *                 description: For role "user"
 *               - type: object
 *                 required:
 *                   - fullName
 *                   - email
 *                   - department
 *                   - designation
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "Admin User"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "admin@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   department:
 *                     type: string
 *                     example: "IT"
 *                   designation:
 *                     type: string
 *                     example: "Technical Lead"
 *                 description: For role "admin"
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile created
 *                 profile:
 *                   type: object
 *                   example:
 *                     id: 1
 *                     userId: 4
 *                     fullName: "John Doe"
 *                     email: "john@example.com"
 *                     phone: "+1234567890"
 *                     address: "123 Main St, Springfield"
 *                     gender: "male"
 *       400:
 *         description: Validation error, profile already exists, or invalid role
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update the profile of the authenticated user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/UserProfile'
 *               - $ref: '#/components/schemas/AdminProfile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/profile:
 *   delete:
 *     summary: Delete the profile of the authenticated user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         address:
 *           type: string
 *         gender:
 *           type: string
 *     AdminProfile:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         department:
 *           type: string
 *         designation:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Wishlist
 *     description: User wishlist management
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   post:
 *     summary: Toggle a book in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Successfully toggled wishlist status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Added to wishlist
 *       400:
 *         description: Validation error or invalid request
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: Get all books in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlisted books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 5
 *                   title:
 *                     type: string
 *                     example: "The Alchemist"
 *                   author:
 *                     type: string
 *                     example: "Paulo Coelho"
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Fiction"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: Book review APIs
 */

/**
 * @swagger
 * /api/v1/review:
 *   post:
 *     summary: Add a review to a book
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - rating
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 3
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 maxLength: 500
 *                 example: "A very insightful and well-written book."
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review added successfully
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 5
 *                     bookId:
 *                       type: integer
 *                       example: 3
 *                     rating:
 *                       type: integer
 *                       example: 4
 *                     comment:
 *                       type: string
 *                       example: "Great book!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation failed or review already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You have already reviewed this book
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: Book reviews management
 */

/**
 * @swagger
 * /api/v1/review:
 *   post:
 *     summary: Add a review for a book
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - rating
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Very informative book."
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Validation error or already reviewed
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reviews
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/review/book/{id}:
 *   get:
 *     summary: Get all reviews for a specific book
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       404:
 *         description: Book not found or no reviews
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   get:
 *     summary: Get reviews by the authenticated user
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dummy path param (not used but kept for route match)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       404:
 *         description: No reviews found for this user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Updated my opinion after a second read."
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/review/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Razorpay payment APIs
 */

/**
 * @swagger
 * /api/v1/payment/create-order:
 *   post:
 *     summary: Create a new Razorpay order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount in rupees
 *               currency:
 *                 type: string
 *                 default: INR
 *               receipt:
 *                 type: string
 *                 description: Optional receipt ID
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order:
 *                   type: object
 *       500:
 *         description: Razorpay order creation failed
 */

/**
 * @swagger
 * /api/v1/payment/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Error verifying signature
 */

/**
 * @swagger
 * /api/v1/payment/refund/{orderId}:
 *   post:
 *     summary: Refund a Razorpay payment (admin only)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to be refunded
 *     responses:
 *       200:
 *         description: Refund initiated successfully
 *       400:
 *         description: Invalid order or payment details
 *       500:
 *         description: Refund failed
 */

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Download invoice PDF for an order
 */

/**
 * @swagger
 * /api/v1/invoice/{orderId}:
 *   get:
 *     summary: Download invoice for a placed order
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to generate the invoice for
 *     responses:
 *       200:
 *         description: Invoice PDF download started
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid or unpaid order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or unpaid order
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: APIs for managing and validating discount coupons
 */

/**
 * @swagger
 * /api/v1/coupon:
 *   post:
 *     summary: Create a new coupon (Admin only)
 *     tags: [Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountPercent
 *               - expiresAt
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE10
 *               discountPercent:
 *                 type: number
 *                 example: 10
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-31T23:59:59.000Z
 *               usageLimit:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon created successfully
 *                 coupon:
 *                   type: object
 *       400:
 *         description: Coupon already exists or validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/coupon/validate:
 *   post:
 *     summary: Validate a coupon code
 *     tags: [Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE10
 *     responses:
 *       200:
 *         description: Coupon is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 discountPercent:
 *                   type: number
 *                   example: 10
 *                 coupon:
 *                   type: object
 *       400:
 *         description: Invalid or expired coupon
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Admin reports and analytics
 */

/**
 * @swagger
 * /api/v1/report/sales:
 *   get:
 *     summary: Download sales report as CSV (Admin only)
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSV file download with sales report
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - user not logged in
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Failed to export report
 */
