const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");

router.get("/me", requireAuth, (req, res) => {
  res.json({
    message: "Welcome!",
    user: {
      id: req.user.id,
      mobile: req.user.mobile,
      role: req.user.role,
    },
  });
});

router.get("/admin", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
