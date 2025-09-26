const express = require("express");
const { createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const validators = require("../validators/auth.validator");

const router = express.Router();

// Dynamic role-based validation middleware
const roleBasedValidation = (req, res, next) => {
  const { role } = req.user;
  
  const validatorMiddleware = role === "admin" 
    ? validators.validateAdminProfile 
    : role === "user" 
      ? validators.validateUserProfile 
      : null;

  if (!validatorMiddleware) {
    return res.status(400).json({ message: "Invalid role for profile creation" });
  }

  // Execute all middleware functions in the array
  const executeMiddleware = (index) => {
    if (index >= validatorMiddleware.length) return next();
    validatorMiddleware[index](req, res, (err) => {
      if (err) return next(err);
      executeMiddleware(index + 1);
    });
  };

  executeMiddleware(0);
};

router.post("/", requireAuth, roleBasedValidation, createProfile);
router.get("/", requireAuth, getProfile);
router.put("/", requireAuth,  roleBasedValidation,updateProfile);
router.delete("/", requireAuth,  roleBasedValidation,deleteProfile);

module.exports = router;