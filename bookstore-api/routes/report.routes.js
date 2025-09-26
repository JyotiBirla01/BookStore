const express = require("express");
const router = express.Router();
const { downloadSalesReport } = require("../controllers/report.controller");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");

router.get("/sales", requireAuth, requireRole("admin"), downloadSalesReport);

module.exports = router;
