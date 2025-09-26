const express=require("express");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");
const { placeOrder, getOrders, getOrderById, cancelOrder, updateOrderStatus, getOrderTimeline } = require("../controllers/order.controller");
const { validatePlaceOrder, validateGetOrderById, validateCancelOrder, validateUpdateOrderStatus } = require("../validators/auth.validator");
const router=express.Router();
router.post("/",requireAuth,validatePlaceOrder,placeOrder)
router.get("/",requireAuth,getOrders)
router.get("/:id",requireAuth,validateGetOrderById,getOrderById)
router.patch("/:id/cancel",requireAuth,validateCancelOrder,cancelOrder)
router.patch(
  "/:orderId/status",
  requireAuth,
  requireRole("admin"),
  validateUpdateOrderStatus,
  updateOrderStatus
);
router.get(
  "/:orderId/timeline",
  requireAuth,
  getOrderTimeline
);
module.exports=router;