const { body } = require("express-validator");
const db = require("../models");
const { validateCartItem } = require("../validators/auth.validator");
const { getPagination } = require("../utils/paginate");
const { sendOrderStatusEmail } = require("../utils/emailSender");

// exports.placeOrder = async (req, res) => {
//   try {
//     const cartItems = await db.Cart.findAll({
//       where: { userId: req.user.id },
//       include: db.Book,
//     });

//     if (!cartItems.length) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let total = 0;

//     for (const item of cartItems) {
//       const error = validateCartItem(item);
//       if (error) return res.status(400).json({ message: error });

//       total += item.quantity * item.Book.price;
//     }

//     const order = await db.Order.create({
//       userId: req.user.id,
//       amount: total,
//     });

//     const orderItems = cartItems.map(item => ({
//       orderId: order.id,
//       bookId: item.bookId,
//       quantity: item.quantity,
//     }));
//     await db.OrderItem.bulkCreate(orderItems);

//     await db.Cart.destroy({ where: { userId: req.user.id } });

//     res.status(201).json({ message: "Order placed", orderId: order.id });
//   } catch (err) {
//     console.error("Place Order Error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.placeOrder = async (req, res) => {
//   try {
//     const { couponCode } = req.body; // Step 1: Receive couponCode from client

//     const cartItems = await db.Cart.findAll({
//       where: { userId: req.user.id },
//       include: db.Book,
//     });

//     if (!cartItems.length) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let total = 0;

//     for (const item of cartItems) {
//       const error = validateCartItem(item);
//       if (error) return res.status(400).json({ message: error });

//       total += item.quantity * item.Book.price;
//     }

//     let finalAmount = total;
//     let coupon = null;

//     // Step 2: Validate and apply coupon if provided
//     if (couponCode) {
//       coupon = await db.Coupon.findOne({ where: { code: couponCode } });

//       if (!coupon) {
//         return res.status(400).json({ message: "Coupon not found" });
//       }

//       const isExpired = new Date(coupon.expiresAt) < new Date();
//       const isLimitReached =
//         coupon.usageLimit && coupon.usedCount >= coupon.usageLimit;

//       if (isExpired || isLimitReached) {
//         return res.status(400).json({ message: "Invalid or expired coupon" });
//       }

//       const discount = (total * coupon.discountPercent) / 100;
//       finalAmount -= discount;

//       // Step 3: Update usage count
//       coupon.usedCount = (coupon.usedCount || 0) + 1;
//       await coupon.save();
//     }

//     // Step 4: Create order
//     const order = await db.Order.create({
//       userId: req.user.id,
//       amount: finalAmount,
//       couponId: coupon ? coupon.id : null, // if coupon applied
//     });

//     // Step 5: Add order items
//     const orderItems = cartItems.map((item) => ({
//       orderId: order.id,
//       bookId: item.bookId,
//       quantity: item.quantity,
//     }));
//     await db.OrderItem.bulkCreate(orderItems);

//     // Step 6: Clear cart
//     await db.Cart.destroy({ where: { userId: req.user.id } });

//     res.status(201).json({ message: "Order placed", orderId: order.id ,data:orderItems});
//   } catch (err) {
//     console.error("Place Order Error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// exports.placeOrder = async (req, res) => {
//   try {
//     const { couponCode, addressId } = req.body;

//     if (!addressId) {
//       return res.status(400).json({ message: "Delivery address is required" });
//     }

//     const address = await db.Address.findOne({
//       where: { id: addressId, userId: req.user.id },
//     });

//     if (!address) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     const cartItems = await db.Cart.findAll({
//       where: { userId: req.user.id },
//       include: db.Book,
//     });

//     if (!cartItems.length) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let total = 0;

//     for (const item of cartItems) {
//       const error = validateCartItem(item);
//       if (error) return res.status(400).json({ message: error });

//       total += item.quantity * item.Book.price;
//     }

//     let finalAmount = total;
//     let coupon = null;

//     if (couponCode) {
//       coupon = await db.Coupon.findOne({ where: { code: couponCode } });

//       if (!coupon) return res.status(400).json({ message: "Coupon not found" });

//       const isExpired = new Date(coupon.expiresAt) < new Date();
//       const isLimitReached = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit;

//       if (isExpired || isLimitReached) {
//         return res.status(400).json({ message: "Invalid or expired coupon" });
//       }

//       const discount = (total * coupon.discountPercent) / 100;
//       finalAmount -= discount;

//       coupon.usedCount = (coupon.usedCount || 0) + 1;
//       await coupon.save();
//     }

//     // ✅ Step 4: Create order with address
//     const order = await db.Order.create({
//       userId: req.user.id,
//       amount: finalAmount,
//       addressId: address.id,
//       couponId: coupon ? coupon.id : null,
//     });

//     const orderItems = cartItems.map((item) => ({
//       orderId: order.id,
//       bookId: item.bookId,
//       quantity: item.quantity,
//     }));
//     await db.OrderItem.bulkCreate(orderItems);

//     await db.Cart.destroy({ where: { userId: req.user.id } });

//     res.status(201).json({
//       message: "Order placed successfully",
//       orderId: order.id,
//       deliveryAddress: address,
//       items: orderItems,
//     });
//   } catch (err) {
//     console.error("Place Order Error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// controllers/orderController.js
exports.placeOrder = async (req, res) => {
  try {
    const { addressId, cartItems, paymentId } = req.body;
    const userId = req.user.id;

    // Save order with status "Paid"
    const newOrder = await db.Order.create({
      userId,
      addressId,
      paymentId,
      status: "Paid",
    });

    for (let item of cartItems) {
      await db.OrderItem.create({
        orderId: newOrder.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const data = await db.Order.findAndCountAll({
      where: { userId: req.user.id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Address,
          as: "address", // ✅ match the alias in association
        },
        {
          model: db.Book,
          as: "items", // ✅ match the alias in association
          attributes: ["id", "title", "author"],
          through: {
            attributes: ["quantity", "price"], // from OrderItem
          },
        },
      ],
    });

    res.status(200).json({
      message: "Orders fetched successfully",
      totalItems: data.count,
      orders: data.rows,
      totalPages: Math.ceil(data.count / limit),
      currentPage: +page,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await db.Order.findOne({
    where: { id, userId: req.user.id },
    include: {
      model: db.Book,
      through: { attributes: ["quantity"] },
    },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};
exports.cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await db.Order.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    if (order.status === "completed") {
      return res.status(400).json({ message: "Completed orders cannot be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Cancel Order Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, remark } = req.body;

  const order = await db.Order.findByPk(orderId, {
    include: { model: db.User, attributes: ["email"] },
  });
  if (!order) return res.status(404).json({ message: "Order not found" });

  // Update status in main order table
  order.status = status;
  await order.save();

  // Push to timeline
  await db.OrderStatus.create({
    orderId: order.id,
    status,
    remark,
  });
  try {
    await sendOrderStatusEmail(order.User.email, orderId, status, remark);
  } catch (err) {
    console.error("Failed to send status email:", err.message);
  }

  res.json({ message: "Order status updated and email sent" });
};

exports.getOrderTimeline = async (req, res) => {
  const { orderId } = req.params;

  const timeline = await db.OrderStatus.findAll({
    where: { orderId },
    order: [["createdAt", "ASC"]],
  });

  res.json(timeline);
};
