const express = require("express");

const { createCategory, getAllCategories, getCategoryByName, getCategoryById, updateCategory, deleteCategory, bulkUploadCategories } = require("../controllers/category.controller");
const { validateCreateCategory, validateGetCategoryById, validateUpdateCategory, validateDeleteCategory } = require("../validators/auth.validator");
const { requireRole, requireAuth } = require("../middlewares/auth.middleware");
const router = express.Router();


// Create Category - Admin Only
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  validateCreateCategory,
  createCategory
);
router.get("/",requireAuth,getAllCategories)
router.get("/:id",requireAuth,validateGetCategoryById,getCategoryById)
router.put("/:id",requireAuth,validateUpdateCategory,requireRole("admin"),updateCategory)
router.delete("/:id",requireAuth,validateDeleteCategory,requireRole("admin"),deleteCategory)
router.post("/bulk",requireAuth,requireRole("admin"),bulkUploadCategories)
module.exports = router;
