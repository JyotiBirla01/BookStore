const express = require("express");
const router = express.Router();
// const { requireAuth } = require("../middlewares/auth.middleware");
const { downloadInvoice } = require("../controllers/invoice.controller");
const { param } = require("express-validator");
const { requireAuth } = require("../middlewares/auth.middleware");
const { validateInvoice } = require("../validators/auth.validator");

router.get("/:orderId", requireAuth,validateInvoice, downloadInvoice);

module.exports = router;
