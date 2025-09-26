// const razorpay = require("../utils/razorpay");
// const crypto = require("crypto");

// exports.createRazorpayOrder = async (req, res) => {
//   try {
//     const { amount, currency = "INR", receipt } = req.body;

//     const options = {
//       amount: amount * 100, // Razorpay uses paisa
//       currency,
//       receipt: receipt || `rcpt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ success: false, message: "Razorpay order creation failed", error: error.message });
//   }
// };


// exports.verifyRazorpaySignature = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       // You can save order details in DB here
//       return res.status(200).json({ success: true, message: "Payment verified" });
//     } else {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("Error verifying signature:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
// ✅ FINAL FLOW: Flipkart/Amazon style payment & order system using Razorpay

// 1️⃣ Backend Changes (controllers/orderController.js)

const db = require("../models");
const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

// ✅ CREATE Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
};

// ✅ VERIFY Razorpay Payment
// const db = require("../models");

exports.verifyRazorpaySignature = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    addressId,
    currentLocationAddress,
    mode,
    bookId,
    couponCode,
  } = req.body;

  const userId = req.user.id;

  try {
    // ✅ 1. If addressId is 'current-location', save to DB
    let resolvedAddressId = addressId;

    if (addressId === "current-location") {
      const addressPayload = {
        userId,
        fullName: currentLocationAddress?.fullName || "Current Location",
        phone: currentLocationAddress?.phone || "9999999999",
        addressLine: currentLocationAddress?.addressLine,
        city: currentLocationAddress?.city,
        state: currentLocationAddress?.state,
        pincode: currentLocationAddress?.pincode,
        landmark: currentLocationAddress?.landmark,
        isDefault: false,
        isTemporary: true, // optional field to track temp addresses
      };

      const saved = await db.Address.create(addressPayload);
      resolvedAddressId = saved.id;
    }

    // ✅ 2. Fetch the saved address (whether normal or just created)
    const address = await db.Address.findOne({
      where: {
        id: resolvedAddressId,
        userId,
      },
    });

    if (!address) {
      return res.status(400).json({ success: false, message: "Invalid address" });
    }

    // ✅ 3. Validate and verify payment (simplified)
    const crypto = require("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ 4. Place order based on mode (buy/cart)
    const order = await db.Order.create({
      userId,
      addressId: resolvedAddressId,
      status: "placed",
      amount: 999, // Replace with real total logic
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      mode,
      bookId: mode === "buy" ? bookId : null,
      couponCode,
    });

    return res.json({ success: true, order });
  } catch (error) {
    console.error("Payment verify error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// exports.verifyRazorpaySignature = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, addressId, couponCode, mode, bookId } = req.body;
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // Signature verified ✅ — Now place order
//     const userId = req.user.id;
//     const address = await db.Address.findOne({ where: { id: addressId, userId } });
//     if (!address) return res.status(404).json({ message: "Address not found" });

//     let items = [], total = 0;
//     if (mode === "buy-now") {
//       const book = await db.Book.findByPk(bookId);
//       if (!book) return res.status(404).json({ message: "Book not found" });
//       items.push({ bookId, quantity: 1 });
//       total = book.price;
//     } else {
//       const cartItems = await db.Cart.findAll({ where: { userId }, include: db.Book });
//       if (!cartItems.length) return res.status(400).json({ message: "Cart is empty" });
//       items = cartItems.map((item) => ({ bookId: item.bookId, quantity: item.quantity }));
//       total = cartItems.reduce((sum, item) => sum + item.quantity * item.Book.price, 0);
//     }

//     let finalAmount = total, coupon = null;
//     if (couponCode) {
//       coupon = await db.Coupon.findOne({ where: { code: couponCode } });
//       if (coupon && new Date(coupon.expiresAt) > new Date() && (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit)) {
//         const discount = (total * coupon.discountPercent) / 100;
//         finalAmount -= discount;
//         coupon.usedCount = (coupon.usedCount || 0) + 1;
//         await coupon.save();
//       }
//     }

//     const order = await db.Order.create({
//       userId,
//       amount: finalAmount,
//       addressId,
//       couponId: coupon?.id || null,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpayOrderId: razorpay_order_id,
//       status: 'placed',
//     });

//     const orderItems = items.map((item) => ({ orderId: order.id, ...item }));
//     await db.OrderItem.bulkCreate(orderItems);

//     if (mode === 'cart') {
//       await db.Cart.destroy({ where: { userId } });
//     }

//     res.status(200).json({ success: true, message: "Payment successful & order placed", orderId: order.id });
//   } catch (error) {
//     console.error("Verify Payment Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// exports.verifyRazorpaySignature = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       addressId,
//       mode, // 'buy' or 'cart'
//       bookId,
//       couponCode = ""
//     } = req.body;

//     const userId = req.user?.id;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !addressId || !mode) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid payment signature" });
//     }

//     let order;
//     if (mode === "buy") {
//       order = await db.Order.create({
//         userId,
//         addressId,
//         status: "CONFIRMED",
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//         mode,
//         couponCode,
//       });

//       await db.OrderItem.create({
//         orderId: order.id,
//         bookId,
//         quantity: 1,
//       });
//     } else {
//       const cartItems = await db.CartItem.findAll({ where: { userId }, include: db.Book });

//       if (!cartItems.length) {
//         return res.status(400).json({ success: false, message: "Cart is empty" });
//       }

//       order = await db.Order.create({
//         userId,
//         addressId,
//         status: "CONFIRMED",
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//         mode,
//         couponCode,
//       });

//       const orderItems = cartItems.map((item) => ({
//         orderId: order.id,
//         bookId: item.bookId,
//         quantity: item.quantity,
//       }));

//       await db.OrderItem.bulkCreate(orderItems);
//       await db.CartItem.destroy({ where: { userId } });
//     }

//     return res.status(200).json({ success: true, message: "Payment verified and order placed", order });
//   } catch (error) {
//     console.error("Payment verification failed:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.refundOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await db.Order.findByPk(orderId);

  if (!order || order.status !== "placed") {
    return res.status(400).json({ message: "Only placed orders can be refunded" });
  }

  if (!order.razorpayPaymentId) {
    return res.status(400).json({ message: "No payment ID available for refund" });
  }

  try {
    const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
      amount: order.totalAmount * 100, // paise
    });

    // update order
    order.status = "refunded";
    await order.save();

    // log to timeline
    await db.OrderStatus.create({
      orderId: order.id,
      status: "refunded",
      remark: `Refund processed. Refund ID: ${refund.id}`,
    });

    res.json({
      message: "Refund initiated successfully",
      refund,
    });
  } catch (err) {
    res.status(500).json({
      message: "Refund failed",
      error: err.message,
    });
  }
};
