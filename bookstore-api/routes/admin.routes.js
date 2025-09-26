const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");
const { getDashboardStats, getMonthlyRevenue } = require("../controllers/admin.controller");

router.get("/stats", requireAuth, requireRole("admin"), getDashboardStats);
router.get("/monthly-revenue", requireAuth, requireRole("admin"), getMonthlyRevenue);

module.exports = router;
